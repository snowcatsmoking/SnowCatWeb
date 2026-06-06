import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_GUESTBOOK_REPO ?? 'snowcatsmoking/SnowCatWeb'

  if (!token) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }

  let body: { name?: string; message?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim().slice(0, 100)
  const message = String(body.message ?? '').trim().slice(0, 1000)

  if (!name || !message) {
    return NextResponse.json({ error: 'name and message are required' }, { status: 400 })
  }

  const issueBody = [
    `**From:** ${name}`,
    `**Message:** ${message}`,
    `**Time:** ${new Date().toISOString()}`,
    `**Via:** snowcat.dev terminal`,
  ].join('\n')

  const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: `💌 Guestbook: ${name}`,
      body: issueBody,
      labels: ['guestbook'],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('GitHub Issues API error:', err)
    return NextResponse.json({ error: 'Failed to create issue' }, { status: 502 })
  }

  const issue = await res.json()
  return NextResponse.json({ url: issue.html_url }, { status: 201 })
}
