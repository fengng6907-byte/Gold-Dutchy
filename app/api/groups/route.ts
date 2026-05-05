import { NextRequest, NextResponse } from 'next/server'
import { MOCK_GROUPS } from '@/lib/mock-data'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  const search = searchParams.get('search')?.toLowerCase()

  let groups = MOCK_GROUPS

  if (userId) {
    groups = groups.filter(g => g.members.some(m => m.userId === userId))
  }

  if (search) {
    groups = groups.filter(g =>
      g.name.toLowerCase().includes(search) ||
      g.description?.toLowerCase().includes(search) ||
      g.type.toLowerCase().includes(search)
    )
  }

  return NextResponse.json({ data: groups, total: groups.length })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, description, emoji, type, color, currency, memberEmails } = body

  if (!name) {
    return NextResponse.json({ error: 'Group name is required' }, { status: 400 })
  }

  const newGroup = {
    id: `group-${Date.now()}`,
    name,
    description: description ?? null,
    emoji: emoji ?? '📁',
    type: type ?? 'OTHER',
    color: color ?? '#F5B800',
    currency: currency ?? 'USD',
    createdAt: new Date().toISOString(),
    members: [],
    expenses: [],
    totalExpenses: 0,
    yourBalance: 0,
  }

  return NextResponse.json({ data: newGroup, message: 'Group created successfully' }, { status: 201 })
}
