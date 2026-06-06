// Virtual filesystem for the terminal component.
// Each node is either a dir (children) or a file (content + optional link).

export type FsFile = {
  kind: 'file'
  name: string
  content: string[]  // lines shown by `cat`
  link?: string      // opened by `open`
}

export type FsDir = {
  kind: 'dir'
  name: string
  children: Record<string, FsNode>
}

export type FsNode = FsFile | FsDir

export const FS_ROOT: FsDir = {
  kind: 'dir',
  name: '~',
  children: {
    'readme.md': {
      kind: 'file',
      name: 'readme.md',
      content: [
        '  Name     : Minghui Pan (潘明辉)',
        '  Alias    : SnowCat',
        '  Role     : Researcher / Undergrad @ BUPT',
        '  Focus    : LLM Safety & Interpretability',
        '',
        '  I build things that actually work.',
        '  ACL · CVPR · AAAI · ICASSP',
        '',
        "  → run 'ls' to explore, 'neofetch' for the full card.",
      ],
    },
    papers: {
      kind: 'dir',
      name: 'papers',
      children: {
        'streaming-hallucination.pdf': {
          kind: 'file',
          name: 'streaming-hallucination.pdf',
          link: 'https://arxiv.org/abs/2601.02170v1',
          content: [
            '  Title   : Streaming Hallucination Detection in Long Chain-of-Thought Reasoning',
            '  Venue   : ACL 2026 Findings  (co-first author *)',
            '  Authors : Haolang Lu*, Minghui Pan*, Ripeng Li*, Guoshun Nan†, ..., Kun Wang, Yang Liu',
            '',
            '  Abstract:',
            '  Long chain-of-thought (CoT) reasoning improves the performance of large',
            '  language models, yet hallucinations in such settings often emerge subtly',
            '  and propagate across reasoning steps. We propose viewing hallucinations',
            '  in extended reasoning as an evolving state rather than isolated errors.',
            '  Individual step-level evaluations are treated as observations, and a',
            '  cumulative prefix-level signal monitors how the reasoning state changes',
            '  throughout the entire sequence — enabling real-time detection with',
            '  interpretable explanations.',
            '',
            '  [arxiv]  https://arxiv.org/abs/2601.02170v1',
            '  [code]   https://github.com/snowcatsmoking/StreamingHallucination',
            '',
            "  run 'open streaming-hallucination.pdf' to open in browser.",
          ],
        },
        'one-eval.pdf': {
          kind: 'file',
          name: 'one-eval.pdf',
          link: 'https://arxiv.org/abs/2603.09821',
          content: [
            '  Title   : One-Eval: An Agentic System for Automated and Traceable LLM Evaluation',
            '  Venue   : Arxiv 2026 Preprint  (co-first author *)',
            '  Authors : Chengyu Shen*, Yanheng Hou*, Minghui Pan*, ..., Wentao Zhang†',
            '',
            '  Abstract:',
            '  Reliable evaluation is essential for developing and deploying large language',
            '  models, yet in practice it often requires substantial manual effort.',
            '  One-Eval converts natural-language evaluation requests into executable',
            '  workflows via three components: NL2Bench (intent structuring & benchmark',
            '  planning), BenchResolve (benchmark resolution & dataset normalization),',
            '  and Metrics & Reporting (metric selection & reporting). The framework',
            '  incorporates human oversight checkpoints and evidence trails for debugging.',
            '',
            '  [arxiv]  https://arxiv.org/abs/2603.09821',
            '  [code]   https://github.com/OpenDCAI/One-Eval',
            '',
            "  run 'open one-eval.pdf' to open in browser.",
          ],
        },
        'reallocating-attention.pdf': {
          kind: 'file',
          name: 'reallocating-attention.pdf',
          link: 'https://arxiv.org/abs/2510.10285',
          content: [
            '  Title   : Reallocating Attention Across Layers to Reduce Multimodal Hallucination',
            '  Venue   : CVPR 2026 Poster',
            '  Authors : Haolang Lu*, Bolun Chu*, Weiye Fu, Guoshun Nan†, ..., Minghui Pan, ..., Kun Wang',
            '',
            '  Abstract:',
            '  Multimodal large reasoning models (MLRMs) often suffer from hallucinations',
            '  that stem not only from insufficient visual grounding but also from imbalanced',
            '  allocation between perception and reasoning processes. We identify two key',
            '  failure modes: perception issues in earlier layers and reasoning problems in',
            '  deeper layers. A lightweight, training-free method — Functional Head',
            '  Identification and Class-Conditioned Rescaling — rebalances how different',
            '  layer components contribute, achieving ~4.2pp accuracy gains with minimal',
            '  computational overhead and no retraining.',
            '',
            '  [arxiv]  https://arxiv.org/abs/2510.10285',
            '',
            "  run 'open reallocating-attention.pdf' to open in browser.",
          ],
        },
        'corrector.pdf': {
          kind: 'file',
          name: 'corrector.pdf',
          link: 'https://cmsworkshops.com/ICASSP2026/papers/accepted_papers.php',
          content: [
            '  Title   : Corrector: An Execute-to-Correct Paradigm for Efficient LLM Secure Inference',
            '  Venue   : ICASSP 2026 Poster',
            '  Authors : Dong Liu, Bingzheng Wang, Yifan Zeng, Minghui Pan, ..., Xiaoyan Gu†',
            '',
            '  [proceedings]  https://cmsworkshops.com/ICASSP2026/papers/accepted_papers.php',
            '',
            "  run 'open corrector.pdf' to open in browser.",
          ],
        },
      },
    },
    projects: {
      kind: 'dir',
      name: 'projects',
      children: {
        'one-eval': {
          kind: 'dir',
          name: 'one-eval',
          children: {
            'README.md': {
              kind: 'file',
              name: 'README.md',
              link: 'https://github.com/OpenDCAI/One-Eval',
              content: [
                '  One-Eval',
                '  --------',
                '  An agentic system for automated and traceable LLM evaluation,',
                '  built on top of DataFlow.',
                '',
                '  Tags: DCAI · Benchmark · Agentic',
                '',
                '  [github]  https://github.com/OpenDCAI/One-Eval',
                '',
                "  run 'open README.md' to open on GitHub.",
              ],
            },
          },
        },
        'looplm': {
          kind: 'dir',
          name: 'looplm',
          children: {
            'README.md': {
              kind: 'file',
              name: 'README.md',
              link: 'https://huggingface.co/datasets/miletcxl/looplm',
              content: [
                '  LoopLM',
                '  ------',
                '  A Self-Iterative Reasoning Framework for Large Language Models.',
                '',
                '  Tags: On Working Yet',
                '',
                '  [huggingface]  https://huggingface.co/datasets/miletcxl/looplm',
                '',
                "  run 'open README.md' to open on HuggingFace.",
              ],
            },
          },
        },
      },
    },
    blog: {
      kind: 'dir',
      name: 'blog',
      children: {
        '20250814.md': {
          kind: 'file',
          name: '20250814.md',
          link: '/blogs/20250814',
          content: [
            '  Title : 暑假工作简述',
            '  Date  : 2025-08-14',
            '  Tags  : Deception · TEE · Hallucination · NMI',
            '',
            '  暑假即将结束，简单介绍一下暑假接触的项目以及相关的方向。',
            '',
            "  run 'open 20250814.md' to read the full post.",
          ],
        },
        'friberg.md': {
          kind: 'file',
          name: 'friberg.md',
          link: '/blogs/friberg',
          content: [
            '  Title : BLAST弗一把速通脚本的算法实现',
            '  Date  : 2025-03-29',
            '  Tags  : 算法 · 信息论 · CSGO · Python · 游戏',
            '',
            '  用信息熵速通CSGO弗一把。核心思想：最大化信息获取，最小化无意义试探。',
            '',
            "  run 'open friberg.md' to read the full post.",
          ],
        },
      },
    },
  },
}

// Resolve a path string from cwd array to a node, or null if not found.
export function resolvePath(cwd: string[], target: string): FsNode | null {
  const parts = target.startsWith('/')
    ? target.split('/').filter(Boolean)
    : [...cwd, ...target.split('/').filter(Boolean)]

  // handle '..' segments
  const resolved: string[] = []
  for (const part of parts) {
    if (part === '..') resolved.pop()
    else if (part !== '.') resolved.push(part)
  }

  let node: FsNode = FS_ROOT
  for (const seg of resolved) {
    if (node.kind !== 'dir') return null
    const child: FsNode | undefined = node.children[seg]
    if (!child) return null
    node = child
  }
  return node
}

export function cwdString(cwd: string[]): string {
  return cwd.length === 0 ? '~' : `~/${cwd.join('/')}`
}

// List directory contents, formatted like `ls -F`
export function lsLines(node: FsDir): string[] {
  const entries = Object.values(node.children)
  if (entries.length === 0) return ['(empty)']

  const dirs = entries.filter((e) => e.kind === 'dir')
  const files = entries.filter((e) => e.kind === 'file')

  const lines: string[] = []
  for (const d of dirs)  lines.push(`  \x1bdir  ${d.name}/`)
  for (const f of files) lines.push(`  \x1bfile ${f.name}`)
  return lines
}

// Tab completions for the current input token against a dir
export function fsCompletions(cwd: string[], input: string): string[] {
  const tokens = input.trimStart().split(/\s+/)
  if (tokens.length < 2) return []

  const cmd = tokens[0]
  if (!['cd', 'ls', 'cat', 'open'].includes(cmd)) return []

  const partial = tokens[tokens.length - 1]
  const slashIdx = partial.lastIndexOf('/')
  const dirPart = slashIdx >= 0 ? partial.slice(0, slashIdx + 1) : ''
  const namePart = slashIdx >= 0 ? partial.slice(slashIdx + 1) : partial

  const dirPath = dirPart ? [...cwd, ...dirPart.split('/').filter(Boolean)] : cwd
  let dirNode: FsNode = FS_ROOT
  for (const seg of dirPath) {
    if (dirNode.kind !== 'dir') return []
    dirNode = dirNode.children[seg]
    if (!dirNode) return []
  }
  if (dirNode.kind !== 'dir') return []

  return Object.keys(dirNode.children)
    .filter((k) => k.startsWith(namePart))
    .map((k) => {
      const child = (dirNode as FsDir).children[k]
      const suffix = child.kind === 'dir' ? '/' : ''
      return `${cmd} ${dirPart}${k}${suffix}`
    })
}
