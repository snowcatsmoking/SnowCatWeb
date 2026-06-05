'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useTheme } from 'next-themes'

type OutputLine = {
  id: number
  text: string
  isCommand?: boolean
  isError?: boolean
  isSystem?: boolean
}

const COMMAND_LIST = [
  'help',
  'whoami',
  'ls papers',
  'git log --oneline',
  'rm -rf phd',
  'sudo make coffee',
  'clear',
]

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    'Available commands:',
    '',
    '  help              show this help message',
    '  whoami            who is SnowCat?',
    '  ls papers         list publications',
    '  git log --oneline show commit history',
    '  rm -rf phd        try to delete the PhD',
    '  sudo make coffee  brew something hot',
    '  clear             clear the terminal',
  ],
  whoami: () => [
    'SnowCat',
    'Researcher / Builder / Undergrad @ BUPT',
  ],
  'ls papers': () => [
    "[ACL'26 Findings]  agent-safety-formatting.pdf      ✓ published",
    '[AAAI\'26]          hallucination-detection.pdf       ✓ published',
    '[WIP]              self-judge.pdf                    ~ in progress',
  ],
  'git log --oneline': () => [
    'a3f9c12 init: born in Yangzhou, Jiangsu, curious about everything👶',
    '7b2e841 feat: first encounter with LLMs via Innovation Competition🤖',
    'c91d3f7 feat: add research mode, drop sleep schedule😴',
    'e4a8b20 publish: ACL 2026 Findings (co-first author)📄',
    '* HEAD: building something new',
  ],
  'rm -rf phd': () => [
    "rm: Permission denied: You can't delete what hasn't started yet.",
  ],
  'sudo make coffee': () => [
    '    ( (',
    '     ) )',
    '  ........',
    '  |      |]',
    '  \\      /',
    "   `----'",
    'Brewing... done. Back to work.',
  ],
}

const WELCOME: OutputLine[] = [
  { id: 0, text: "visitor@snowcat.dev:~$  curl https://panmingh.com", isSystem: true },
  { id: 1, text: '' },
  { id: 2, text: '  Name     : Minghui Pan (潘明辉)', isSystem: true },
  { id: 3, text: '  Alias    : SnowCat', isSystem: true },
  { id: 4, text: '  Role     : Researcher / Undergrad @ BUPT', isSystem: true },
  { id: 5, text: '  Focus    : LLM Safety & Interpretability', isSystem: true },
  { id: 6, text: '' },
  { id: 7, text: "Type 'help' to explore.", isSystem: true },
  { id: 8, text: '' },
]

let lineIdCounter = 100

// returns all commands that start with the prefix
function getCompletions(prefix: string): string[] {
  if (!prefix) return []
  return COMMAND_LIST.filter((c) => c.startsWith(prefix))
}

export default function Terminal() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const [output, setOutput] = useState<OutputLine[]>(WELCOME)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isActive, setIsActive] = useState(false)
  const [typingQueue, setTypingQueue] = useState<{ lines: string[]; isError: boolean } | null>(null)
  // tab completion cycling state
  const [completions, setCompletions] = useState<string[]>([])
  const [completionIndex, setCompletionIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = outputRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [output])

  // typewriter effect
  useEffect(() => {
    if (!typingQueue || typingQueue.lines.length === 0) {
      setTypingQueue(null)
      return
    }
    const [first, ...rest] = typingQueue.lines
    const delay = first === '' ? 40 : 28
    const timer = setTimeout(() => {
      const id = lineIdCounter++
      setOutput((prev) => [
        ...prev,
        { id, text: first, isError: typingQueue.isError },
      ])
      setTypingQueue(rest.length > 0 ? { lines: rest, isError: typingQueue.isError } : null)
    }, delay)
    return () => clearTimeout(timer)
  }, [typingQueue])

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim()
    if (!cmd) return

    const cmdId = lineIdCounter++
    setOutput((prev) => [...prev, { id: cmdId, text: `$ ${cmd}`, isCommand: true }])
    setHistory((prev) => [cmd, ...prev])
    setHistoryIndex(-1)
    setCompletions([])
    setCompletionIndex(-1)
    setInput('')

    if (cmd === 'clear') {
      setOutput([])
      return
    }

    const handler = COMMANDS[cmd]
    if (handler) {
      setTypingQueue({ lines: handler(), isError: false })
    } else {
      setTypingQueue({
        lines: [`bash: command not found: ${cmd}`],
        isError: true,
      })
    }
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        runCommand(input)
      } else if (e.key === 'Tab') {
        e.preventDefault()
        // cycle through completions on repeated Tab
        const matches = completions.length > 0 ? completions : getCompletions(input)
        if (matches.length === 0) return
        if (matches.length === 1) {
          setInput(matches[0])
          setCompletions([])
          setCompletionIndex(-1)
          return
        }
        // multiple matches: cycle
        const nextIndex = (completionIndex + 1) % matches.length
        setCompletions(matches)
        setCompletionIndex(nextIndex)
        setInput(matches[nextIndex])
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
        // Ctrl+C: cancel current input
        e.preventDefault()
        const id = lineIdCounter++
        setOutput((prev) => [...prev, { id, text: `$ ${input}^C`, isCommand: true }])
        setInput('')
        setTypingQueue(null)
        setCompletions([])
        setCompletionIndex(-1)
      } else if (e.key === 'l' && e.ctrlKey) {
        // Ctrl+L: clear
        e.preventDefault()
        setOutput([])
      } else if (e.key === 'u' && e.ctrlKey) {
        // Ctrl+U: clear line
        e.preventDefault()
        setInput('')
      } else if (e.key === 'a' && e.ctrlKey) {
        // Ctrl+A: move to start — browser handles caret but we nudge cursor
        // nothing to do visually since input is hidden; native handles it
      } else {
        // any other key resets tab cycle
        setCompletions([])
        setCompletionIndex(-1)
      }
    },
    [input, history, historyIndex, completions, completionIndex, runCommand],
  )

  const focusInput = () => {
    setIsActive(true)
    inputRef.current?.focus()
  }

  // theme-aware palette
  const palette = isDark
    ? {
        bg: 'bg-[#0d1117]',
        titleBg: 'bg-[#161b22]',
        border: 'border-[#30363d]',
        titleText: 'text-[#484f58]',
        promptColor: 'text-[#39d353]',
        cmdColor: 'text-[#79c0ff]',
        errColor: 'text-[#f85149]',
        sysColor: 'text-[#8b949e]',
        cursorBg: 'bg-[#39d353]',
      }
    : {
        bg: 'bg-[#f6f8fa]',
        titleBg: 'bg-[#eaeef2]',
        border: 'border-[#d0d7de]',
        titleText: 'text-[#87929d]',
        promptColor: 'text-[#1a7f37]',
        cmdColor: 'text-[#0550ae]',
        errColor: 'text-[#cf222e]',
        sysColor: 'text-[#57606a]',
        cursorBg: 'bg-[#1a7f37]',
      }

  return (
    <div
      onClick={focusInput}
      className={`flex flex-col rounded-xl overflow-hidden border ${palette.border} ${palette.bg} cursor-text select-none font-mono text-sm w-full`}
      style={{ height: '400px' }}
    >
      {/* title bar */}
      <div className={`flex items-center gap-2 px-4 py-3 ${palette.titleBg} border-b ${palette.border} shrink-0`}>
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className={`ml-2 text-xs ${palette.titleText}`}>snowcat — zsh</span>
      </div>

      {/* output area */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-0.5"
      >
        {output.map((line) => (
          <div
            key={line.id}
            className={
              line.isCommand
                ? palette.cmdColor
                : line.isError
                  ? palette.errColor
                  : line.isSystem
                    ? palette.sysColor
                    : palette.promptColor
            }
          >
            <pre className="whitespace-pre-wrap break-words font-mono leading-5">
              {line.text || ' '}
            </pre>
          </div>
        ))}

        {/* prompt line */}
        <div className={`flex items-center ${palette.promptColor}`}>
          <span className={`${palette.cmdColor} mr-2`}>$</span>
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
            <span className={palette.promptColor}>{input}</span>
            <span
              className={`inline-block w-[0.5ch] h-[1em] ${palette.cursorBg} align-middle ml-[1px] ${
                isActive ? 'animate-pulse' : 'opacity-30'
              }`}
            />
          </span>
        </div>

        {/* tab completions hint */}
        {completions.length > 1 && (
          <div className={`text-xs ${palette.sysColor} pl-4 pt-0.5`}>
            {completions.join('   ')}
          </div>
        )}
      </div>
    </div>
  )
}
