'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useTheme } from 'next-themes'
import {
  FS_ROOT,
  FsDir,
  resolvePath,
  cwdString,
  lsLines,
  fsCompletions,
} from '@/lib/terminalFs'

type Segment = {
  text: string
  color?: 'dim' | 'green' | 'blue' | 'purple' | 'orange' | 'red' | 'teal' | 'yellow'
}

type OutputLine = {
  id: number
  text: string
  type?: 'cmd' | 'error' | 'system' | 'dir' | 'file' | 'link' | 'success'
  href?: string
  segments?: Segment[]  // if set, render instead of text
  instant?: boolean     // if set, appear whole (skip char-by-char) — e.g. ASCII art
}

// Guestbook multi-step state
type GuestbookState =
  | { step: 'idle' }
  | { step: 'name' }
  | { step: 'message'; name: string }

// neofetch rendered as segments at call time (needs lineId)
function makeNeofetch(): OutputLine[] {
  const art = [
    '     /\\    ',
    '    /  \\   ',
    '   / /\\ \\  ',
    '  / /  \\ \\ ',
    ' /_/    \\_\\',
    ' \\_\\    /_/',
    '           ',
    '  ▲ SnowCat',
  ]
  const info: Segment[][] = [
    [{ text: 'snowcat', color: 'teal' }, { text: ' @ ' }, { text: 'panmingh.dev', color: 'blue' }],
    [{ text: '────────────────────────', color: 'dim' }],
    [{ text: 'OS     : ', color: 'blue' }, { text: 'SnowCatWeb 2.0' }],
    [{ text: 'Host   : ', color: 'blue' }, { text: 'BUPT, Beijing' }],
    [{ text: 'Shell  : ', color: 'blue' }, { text: 'zsh (simulated)' }],
    [{ text: 'Papers : ', color: 'blue' }, { text: 'ACL · CVPR · Arxiv · ICASSP', color: 'teal' }],
    [{ text: 'Focus  : ', color: 'blue' }, { text: 'LLM Safety & Interpretability' }],
    [{ text: 'Mail   : ', color: 'blue' }, { text: 'panmingh@outlook.com', color: 'dim' }],
  ]
  return art.map((a, i) => ({
    id: lineId++,
    text: '',
    type: 'system' as const,
    segments: [{ text: a, color: 'purple' as const }, ...(info[i] ?? [])],
    instant: true,  // ASCII art — reveal whole, not char-by-char
  }))
}

const STATIC_COMMANDS = [
  'help', 'whoami', 'neofetch', 'pwd', 'clear',
  'ls', 'ls papers', 'ls projects', 'ls blog',
  'cd papers', 'cd projects', 'cd blog', 'cd ..',
  'git log --oneline', 'rm -rf phd', 'sudo make coffee',
  'sign',
]

const WELCOME: OutputLine[] = [
  { id: 0, text: '', type: 'cmd', segments: [
    { text: 'visitor@snowcat.dev:~$ ', color: 'green' },
    { text: 'curl ', color: 'blue' },
    { text: 'https://panmingh.com', color: 'teal' },
  ]},
  { id: 1, text: '' },
  { id: 2, text: '', type: 'system', segments: [
    { text: '  Name     : ' }, { text: 'Minghui Pan (潘明辉)', color: 'teal' },
  ]},
  { id: 3, text: '', type: 'system', segments: [
    { text: '  Alias    : ' }, { text: 'SnowCat', color: 'teal' },
  ]},
  { id: 4, text: '', type: 'system', segments: [
    { text: '  Role     : Researcher / Undergrad @ ' }, { text: 'BUPT', color: 'blue' },
  ]},
  { id: 5, text: '', type: 'system', segments: [
    { text: '  Focus    : ' }, { text: 'LLM Safety & Interpretability', color: 'purple' },
  ]},
  { id: 6, text: '' },
  { id: 7, text: '', type: 'system', segments: [
    { text: "  Type " }, { text: "'help'", color: 'yellow' },
    { text: " to explore, " }, { text: "'ls'", color: 'yellow' },
    { text: " to browse files." },
  ]},
  { id: 8, text: '' },
]

let lineId = 200

// number of visible characters in a line (segments count as their combined text)
function lineLength(line: OutputLine): number {
  if (line.segments) return line.segments.reduce((n, s) => n + s.text.length, 0)
  return line.text.length
}

function makeLines(lines: (string | { text: string; type?: OutputLine['type']; href?: string })[], defaultType?: OutputLine['type']): OutputLine[] {
  return lines.map((l) => {
    if (typeof l === 'string') return { id: lineId++, text: l, type: defaultType }
    return { id: lineId++, ...l }
  })
}

export default function Terminal() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const [output, setOutput] = useState<OutputLine[]>([])
  const [input, setInput] = useState('')
  const [booted, setBooted] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isActive, setIsActive] = useState(false)
  // 'char' = boot banner, revealed character-by-character; 'line' = command
  // output, revealed one whole line at a time (matches the original terminal feel)
  const [typingQueue, setTypingQueue] = useState<{ lines: OutputLine[]; mode: 'char' | 'line' } | null>(null)
  // the line currently being revealed character-by-character (char mode only)
  const [typingLine, setTypingLine] = useState<{ line: OutputLine; shown: number } | null>(null)

  // filesystem state
  const [cwd, setCwd] = useState<string[]>([])

  // tab completion
  const [completions, setCompletions] = useState<string[]>([])
  const [completionIndex, setCompletionIndex] = useState(-1)

  // guestbook multi-step
  const [guestbook, setGuestbook] = useState<GuestbookState>({ step: 'idle' })

  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = outputRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [output, typingLine])

  // typewriter effect — pull the next queued line and begin revealing it
  useEffect(() => {
    // wait for the active line to finish before pulling the next one
    if (typingLine) return
    if (!typingQueue || typingQueue.lines.length === 0) {
      if (typingQueue) setTypingQueue(null)
      return
    }
    const { mode } = typingQueue
    const [first, ...rest] = typingQueue.lines
    const advanceQueue = () => setTypingQueue(rest.length > 0 ? { lines: rest, mode } : null)

    // 'line' mode (command output): reveal one whole line at a time, ~22ms apart —
    // the original terminal cadence
    if (mode === 'line') {
      const delay = first.text === '' && !first.segments ? 30 : 22
      const timer = setTimeout(() => {
        setOutput((prev) => [...prev, first])
        advanceQueue()
      }, delay)
      return () => clearTimeout(timer)
    }

    // 'char' mode (boot banner): blank lines and `instant` lines (ASCII art) appear
    // whole — a char-by-char reveal on those looks broken; everything else types out
    if (first.instant || lineLength(first) === 0) {
      const delay = 20
      const timer = setTimeout(() => {
        setOutput((prev) => [...prev, first])
        advanceQueue()
      }, delay)
      return () => clearTimeout(timer)
    }

    // typed line: pause a beat before it starts (a touch longer for the command
    // line), then hand off to the per-character effect below. Timings are tuned so
    // the whole banner finishes ~1.8s — in step with the hero "I'm SnowCat" title.
    // Drop it from the queue now; the char effect owns committing it to output.
    const startDelay = first.type === 'cmd' ? 120 : 20
    const timer = setTimeout(() => {
      setTypingLine({ line: first, shown: 0 })
      advanceQueue()
    }, startDelay)
    return () => clearTimeout(timer)
  }, [typingQueue, typingLine])

  // reveal the active line one character at a time
  useEffect(() => {
    if (!typingLine) return
    const { line, shown } = typingLine
    if (shown >= lineLength(line)) {
      // done — commit the finished line; the queue effect pulls the next
      setOutput((prev) => [...prev, line])
      setTypingLine(null)
      return
    }
    // ~7ms/char — fast, so the banner finishes ~in step with the hero title
    const timer = setTimeout(() => setTypingLine({ line, shown: shown + 1 }), 7)
    return () => clearTimeout(timer)
  }, [typingLine])

  // command output streams one line at a time — the original terminal cadence.
  // (The character-by-character typewriter is reserved for the boot banner.)
  const pushLines = useCallback((lines: OutputLine[]) => {
    setTypingQueue({ lines, mode: 'line' })
  }, [])

  const pushImmediate = useCallback((lines: OutputLine[]) => {
    setOutput((prev) => [...prev, ...lines])
  }, [])

  // boot sequence — stream the welcome banner through the typewriter on mount
  useEffect(() => {
    if (booted) return
    setBooted(true)
    setTypingQueue({ lines: WELCOME, mode: 'char' })
  }, [booted])

  // ── command handlers ──────────────────────────────────────────────────────

  const handleNormalCommand = useCallback((cmd: string) => {
    if (cmd === 'clear') { setOutput([]); setTypingQueue(null); setTypingLine(null); return }

    // pwd
    if (cmd === 'pwd') {
      pushLines(makeLines([cwdString(cwd)]))
      return
    }

    // ls [path]
    if (cmd === 'ls' || cmd.startsWith('ls ')) {
      const arg = cmd.slice(3).trim()
      const node = arg
        ? resolvePath(cwd, arg)
        : (cwd.length === 0 ? FS_ROOT : resolvePath([], cwd.join('/')))
      if (!node) {
        pushLines(makeLines([`ls: ${arg}: No such file or directory`], 'error'))
        return
      }
      if (node.kind === 'file') {
        pushLines(makeLines([node.name], 'file'))
        return
      }
      const rawLines = lsLines(node as FsDir)
      const parsed: OutputLine[] = rawLines.map((l) => {
        if (l.startsWith('  \x1bdir  ')) return { id: lineId++, text: '  ' + l.slice(8), type: 'dir' as const }
        if (l.startsWith('  \x1bfile ')) return { id: lineId++, text: '  ' + l.slice(8), type: 'file' as const }
        return { id: lineId++, text: l }
      })
      pushLines(parsed)
      return
    }

    // cd
    if (cmd === 'cd' || cmd.startsWith('cd ')) {
      const arg = cmd.slice(3).trim() || '~'
      if (arg === '~' || arg === '') {
        setCwd([])
        return
      }
      const target = resolvePath(cwd, arg)
      if (!target) {
        pushLines(makeLines([`cd: ${arg}: No such file or directory`], 'error'))
      } else if (target.kind === 'file') {
        pushLines(makeLines([`cd: ${arg}: Not a directory`], 'error'))
      } else {
        const newParts = arg.startsWith('/')
          ? arg.split('/').filter(Boolean)
          : [...cwd, ...arg.split('/').filter(Boolean)]
        const resolved: string[] = []
        for (const p of newParts) {
          if (p === '..') resolved.pop()
          else if (p !== '.') resolved.push(p)
        }
        setCwd(resolved)
      }
      return
    }

    // cat
    if (cmd.startsWith('cat ')) {
      const arg = cmd.slice(4).trim()
      const node = resolvePath(cwd, arg)
      if (!node) {
        pushLines(makeLines([`cat: ${arg}: No such file or directory`], 'error'))
      } else if (node.kind === 'dir') {
        pushLines(makeLines([`cat: ${arg}: Is a directory`], 'error'))
      } else {
        const lines: OutputLine[] = node.content.map((text) => {
          if (text.startsWith('  [') && node.link) {
            return { id: lineId++, text, type: 'link' as const, href: node.link }
          }
          return { id: lineId++, text, type: 'system' as const }
        })
        pushLines(lines)
      }
      return
    }

    // open
    if (cmd.startsWith('open ')) {
      const arg = cmd.slice(5).trim()
      const node = resolvePath(cwd, arg)
      if (!node) {
        pushLines(makeLines([`open: ${arg}: No such file or directory`], 'error'))
      } else if (node.kind === 'dir') {
        pushLines(makeLines([`open: ${arg}: Is a directory — try 'cd ${arg}'`], 'error'))
      } else if (!node.link) {
        pushLines(makeLines([`open: ${arg}: No link available`], 'error'))
      } else {
        window.open(node.link.startsWith('/') ? node.link : node.link, '_blank')
        pushLines(makeLines([`Opening ${node.link} ...`], 'success'))
      }
      return
    }

    // help
    if (cmd === 'help') {
      const helpCmd = (name: string, desc: string): OutputLine => ({
        id: lineId++, text: '', type: 'system',
        segments: [{ text: `  ${name.padEnd(13)}`, color: 'blue' }, { text: desc }],
      })
      pushLines([
        { id: lineId++, text: 'commands:', type: 'system' },
        helpCmd('ls [path]',   'list directory'),
        helpCmd('cd <dir>',    'change dir  (cd ~ = home)'),
        helpCmd('cat <file>',  'show file contents'),
        helpCmd('open <file>', 'open link in browser'),
        helpCmd('pwd',         'current path'),
        helpCmd('whoami',      'who is SnowCat?'),
        helpCmd('neofetch',    'system info card'),
        helpCmd('git log',     'commit history'),
        helpCmd('sign',        'leave a message'),
        helpCmd('clear',       'clear screen'),
        { id: lineId++, text: '', type: 'system' },
        { id: lineId++, text: '', type: 'system', segments: [
          { text: 'keys: ' },
          { text: 'Tab', color: 'yellow' }, { text: '=complete  ' },
          { text: '↑↓', color: 'yellow' }, { text: '=history  ' },
          { text: 'Ctrl+C', color: 'yellow' }, { text: '=cancel  ' },
          { text: 'Ctrl+L', color: 'yellow' }, { text: '=clear' },
        ]},
      ])
      return
    }

    // whoami
    if (cmd === 'whoami') {
      pushLines([
        { id: lineId++, text: '', type: 'system', segments: [
          { text: 'SnowCat', color: 'teal' },
        ]},
        { id: lineId++, text: 'Minghui Pan (潘明辉)', type: 'system' },
        { id: lineId++, text: '', type: 'system', segments: [
          { text: 'Researcher / Builder / Undergrad @ ' },
          { text: 'BUPT', color: 'blue' },
        ]},
      ])
      return
    }

    // neofetch
    if (cmd === 'neofetch') {
      pushLines(makeNeofetch())
      return
    }

    // git log
    if (cmd === 'git log --oneline' || cmd === 'git log') {
      const gitLog: OutputLine[] = [
        { id: lineId++, text: '', type: 'system', segments: [
          { text: 'a3f9c12', color: 'yellow' },
          { text: ' init: born in Yangzhou, Jiangsu, curious about everything 👶' },
        ]},
        { id: lineId++, text: '', type: 'system', segments: [
          { text: '7b2e841', color: 'yellow' },
          { text: ' feat: first encounter with LLMs via Innovation Competition 🤖' },
        ]},
        { id: lineId++, text: '', type: 'system', segments: [
          { text: 'c91d3f7', color: 'yellow' },
          { text: ' feat: add research mode, drop sleep schedule 😴' },
        ]},
        { id: lineId++, text: '', type: 'system', segments: [
          { text: 'e4a8b20', color: 'yellow' },
          { text: ' publish: ' },
          { text: 'ACL 2026 Findings', color: 'teal' },
          { text: ' (co-first author) 📄' },
        ]},
        { id: lineId++, text: '', type: 'system', segments: [
          { text: '* ', color: 'green' },
          { text: 'HEAD', color: 'green' },
          { text: ': building something new' },
        ]},
      ]
      pushLines(gitLog)
      return
    }

    // rm -rf phd
    if (cmd === 'rm -rf phd') {
      pushLines(makeLines(["rm: Permission denied: You can't delete what hasn't started yet."], 'error'))
      return
    }

    // sudo make coffee
    if (cmd === 'sudo make coffee') {
      pushLines(makeLines([
        '    ( (',
        '     ) )',
        '  ........',
        '  |      |]',
        '  \\      /',
        "   `----'",
        'Brewing... done. Back to work.',
      ], 'system'))
      return
    }

    // sign / guestbook
    if (cmd === 'sign' || cmd === 'guestbook') {
      setGuestbook({ step: 'name' })
      pushImmediate(makeLines([
        '',
        '  ✉  Guestbook — leave a note for SnowCat',
        "  (type your answer and press Enter; Ctrl+C to cancel)",
        '',
        '  Who are you?',
      ], 'system'))
      return
    }

    pushLines(makeLines([`bash: command not found: ${cmd}`], 'error'))
  }, [cwd, pushLines, pushImmediate])

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim()

    // ── guestbook multi-step ──────────────────────────────────────────────
    if (guestbook.step === 'name') {
      pushImmediate([{ id: lineId++, text: `  > ${cmd}`, type: 'cmd' }])
      setInput('')
      if (!cmd) {
        pushImmediate(makeLines(['  (name cannot be empty, try again)', '  Who are you?'], 'system'))
        return
      }
      setGuestbook({ step: 'message', name: cmd })
      pushImmediate(makeLines(['', '  What do you want to say to SnowCat?'], 'system'))
      return
    }

    if (guestbook.step === 'message') {
      const name = (guestbook as { step: 'message'; name: string }).name
      pushImmediate([{ id: lineId++, text: `  > ${cmd}`, type: 'cmd' }])
      setInput('')
      if (!cmd) {
        pushImmediate(makeLines(['  (message cannot be empty, try again)', '  What do you want to say to SnowCat?'], 'system'))
        return
      }
      setGuestbook({ step: 'idle' })
      pushImmediate(makeLines(['', '  [saving...]'], 'system'))

      fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message: cmd }),
      })
        .then((r) => r.json())
        .then(() => {
          pushImmediate(makeLines([
            '  ✓ Message saved! SnowCat will read it on GitHub.',
            '',
          ], 'success'))
        })
        .catch(() => {
          pushImmediate(makeLines(['  ✗ Failed to save. Please try again.', ''], 'error'))
        })
      return
    }

    // ── normal command flow ───────────────────────────────────────────────
    if (!cmd) return

    setOutput((prev) => [...prev, { id: lineId++, text: `visitor@snowcat:${cwdString(cwd)}$ ${cmd}`, type: 'cmd' }])
    setHistory((prev) => [cmd, ...prev])
    setHistoryIndex(-1)
    setCompletions([])
    setCompletionIndex(-1)
    setInput('')

    handleNormalCommand(cmd)
  }, [guestbook, handleNormalCommand, pushImmediate])

  // ── tab completion ────────────────────────────────────────────────────────
  const getCompletions = useCallback((val: string): string[] => {
    // fs-aware completions for cd/ls/cat/open
    const fsc = fsCompletions(cwd, val)
    if (fsc.length > 0) return fsc
    // fallback to static list
    if (!val) return []
    return STATIC_COMMANDS.filter((c) => c.startsWith(val))
  }, [cwd])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      runCommand(input)
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const matches = completions.length > 0 ? completions : getCompletions(input)
      if (matches.length === 0) return
      if (matches.length === 1) {
        setInput(matches[0])
        setCompletions([])
        setCompletionIndex(-1)
        return
      }
      const next = (completionIndex + 1) % matches.length
      setCompletions(matches)
      setCompletionIndex(next)
      setInput(matches[next])
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(next)
      setInput(history[next] ?? '')
      setCompletions([])
      setCompletionIndex(-1)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(historyIndex - 1, -1)
      setHistoryIndex(next)
      setInput(next === -1 ? '' : (history[next] ?? ''))
      setCompletions([])
      setCompletionIndex(-1)
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault()
      setOutput((prev) => [...prev, { id: lineId++, text: `$ ${input}^C`, type: 'cmd' }])
      setInput('')
      setTypingQueue(null)
      setTypingLine(null)
      setGuestbook({ step: 'idle' })
      setCompletions([])
      setCompletionIndex(-1)
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setOutput([])
      setTypingQueue(null)
      setTypingLine(null)
    } else if (e.key === 'u' && e.ctrlKey) {
      e.preventDefault()
      setInput('')
    } else {
      setCompletions([])
      setCompletionIndex(-1)
    }
  }, [input, history, historyIndex, completions, completionIndex, runCommand, getCompletions])

  const focusInput = () => {
    setIsActive(true)
    inputRef.current?.focus()
  }

  // prompt string changes with cwd and guestbook step
  const promptStr = guestbook.step !== 'idle'
    ? ''
    : `visitor@snowcat:${cwdString(cwd)}$`

  // hide the input prompt only while the boot banner (char mode) is playing —
  // otherwise the prompt sits below and text appears to type above it. Command
  // output (line mode) keeps the prompt visible, matching the original behavior.
  const isBooting = typingLine !== null || typingQueue?.mode === 'char'

  // theme palette
  const p = isDark ? {
    bg: 'bg-[#0d1117]',
    titleBg: 'bg-[#161b22]',
    border: 'border-[#30363d]',
    titleText: 'text-[#484f58]',
    prompt: 'text-[#39d353]',
    cmd: 'text-[#79c0ff]',
    err: 'text-[#f85149]',
    sys: 'text-[#8b949e]',
    dir: 'text-[#d2a8ff]',
    file: 'text-[#ffa657]',
    link: 'text-[#58a6ff]',
    success: 'text-[#3fb950]',
    cursor: 'bg-[#39d353]',
  } : {
    bg: 'bg-[#f6f8fa]',
    titleBg: 'bg-[#eaeef2]',
    border: 'border-[#d0d7de]',
    titleText: 'text-[#87929d]',
    prompt: 'text-[#1a7f37]',
    cmd: 'text-[#0550ae]',
    err: 'text-[#cf222e]',
    sys: 'text-[#57606a]',
    dir: 'text-[#8250df]',
    file: 'text-[#953800]',
    link: 'text-[#0969da]',
    success: 'text-[#1a7f37]',
    cursor: 'bg-[#1a7f37]',
  }

  function lineClass(line: OutputLine): string {
    switch (line.type) {
      case 'cmd':     return p.cmd
      case 'error':   return p.err
      case 'system':  return p.sys
      case 'dir':     return p.dir
      case 'file':    return p.file
      case 'link':    return `${p.link} underline cursor-pointer`
      case 'success': return p.success
      default:        return p.prompt
    }
  }

  const segColor: Record<NonNullable<Segment['color']>, string> = isDark ? {
    dim:    'text-[#484f58]',
    green:  'text-[#39d353]',
    blue:   'text-[#79c0ff]',
    purple: 'text-[#d2a8ff]',
    orange: 'text-[#ffa657]',
    red:    'text-[#f85149]',
    teal:   'text-[#56d364]',
    yellow: 'text-[#e3b341]',
  } : {
    dim:    'text-[#87929d]',
    green:  'text-[#1a7f37]',
    blue:   'text-[#0550ae]',
    purple: 'text-[#8250df]',
    orange: 'text-[#953800]',
    red:    'text-[#cf222e]',
    teal:   'text-[#0e7a6e]',
    yellow: 'text-[#7d4e00]',
  }

  // `limit` (visible char count) truncates the line mid-reveal; undefined = full line
  function renderLine(line: OutputLine, limit?: number) {
    if (line.segments) {
      let remaining = limit ?? Infinity
      return (
        <pre className="whitespace-pre-wrap break-words font-mono leading-5">
          {line.segments.map((seg, i) => {
            const text = remaining >= seg.text.length ? seg.text : seg.text.slice(0, Math.max(0, remaining))
            remaining -= seg.text.length
            return <span key={i} className={seg.color ? segColor[seg.color] : undefined}>{text}</span>
          })}
        </pre>
      )
    }
    const text = limit === undefined ? line.text : line.text.slice(0, limit)
    return <pre className="whitespace-pre-wrap break-words font-mono leading-5">{text || ' '}</pre>
  }

  return (
    <div
      onClick={focusInput}
      className={`flex flex-col rounded-xl overflow-hidden border ${p.border} ${p.bg} cursor-text select-none font-mono text-sm w-full`}
      style={{ height: '400px' }}
    >
      {/* title bar */}
      <div className={`flex items-center gap-2 px-4 py-3 ${p.titleBg} border-b ${p.border} shrink-0`}>
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className={`ml-2 text-xs ${p.titleText}`}>snowcat — zsh</span>
      </div>

      {/* output area */}
      <div ref={outputRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-0.5">
        {output.map((line) => (
          <div key={line.id} className={lineClass(line)}>
            {line.href ? (
              <a
                href={line.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
                onClick={(e) => e.stopPropagation()}
              >
                {renderLine(line)}
              </a>
            ) : renderLine(line)}
          </div>
        ))}

        {/* line currently being typed out, character by character */}
        {typingLine && (
          <div className={lineClass(typingLine.line)}>
            {renderLine(typingLine.line, typingLine.shown)}
          </div>
        )}

        {/* prompt line — hidden while the boot banner is playing */}
        {!isBooting && (
        <div className={`flex items-center ${p.prompt}`}>
          {promptStr && <span className={`${p.cmd} mr-2`}>{promptStr}</span>}
          <span className="flex-1 relative">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                setCompletions([])
                setCompletionIndex(-1)
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
              className="absolute inset-0 w-full opacity-0 bg-transparent border-none outline-none"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="terminal input"
            />
            <span className={p.prompt}>{input}</span>
            <span className={`inline-block w-[0.5ch] h-[1em] ${p.cursor} align-middle ml-[1px] ${isActive ? 'animate-pulse' : 'opacity-30'}`} />
          </span>
        </div>
        )}

        {/* tab completions hint */}
        {completions.length > 1 && (
          <div className={`text-xs ${p.sys} pl-4 pt-0.5`}>
            {completions.join('   ')}
          </div>
        )}
      </div>
    </div>
  )
}
