import { NextRequest, NextResponse } from 'next/server'
import { MOCK_EXPENSES } from '@/lib/mock-data'
import { calculateSplit, aiCategorize } from '@/lib/split'
import type { Category, SplitMethod } from '@/types'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const groupId = searchParams.get('groupId')
  const userId = searchParams.get('userId')
  const category = searchParams.get('category') as Category | null
  const limit = parseInt(searchParams.get('limit') ?? '50')
  const offset = parseInt(searchParams.get('offset') ?? '0')

  let expenses = MOCK_EXPENSES

  if (groupId) {
    expenses = expenses.filter(e => e.groupId === groupId)
  }

  if (userId) {
    expenses = expenses.filter(e =>
      e.payerId === userId || e.shares.some(s => s.userId === userId)
    )
  }

  if (category) {
    expenses = expenses.filter(e => e.category === category)
  }

  const total = expenses.length
  expenses = expenses.slice(offset, offset + limit)

  return NextResponse.json({ data: expenses, total, limit, offset })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, amount, category, splitMethod, date, notes, payerId, groupId, participants } = body

  if (!title || !amount || !payerId || !groupId || !participants?.length) {
    return NextResponse.json(
      { error: 'title, amount, payerId, groupId, and participants are required' },
      { status: 400 }
    )
  }

  if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
  }

  // AI categorize
  const aiResult = category ? null : aiCategorize(title)
  const resolvedCategory: Category = category ?? (aiResult?.category as Category) ?? 'OTHER'
  const resolvedMethod: SplitMethod = splitMethod ?? 'EQUAL'

  // Calculate splits
  const splits = calculateSplit(
    parseFloat(amount),
    participants.map((id: string) => ({ userId: id, name: id })),
    resolvedMethod
  )

  const newExpense = {
    id: `exp-${Date.now()}`,
    title,
    amount: parseFloat(amount),
    currency: 'USD',
    category: resolvedCategory,
    splitMethod: resolvedMethod,
    date: date ?? new Date().toISOString(),
    notes: notes ?? null,
    receiptUrl: null,
    isSettled: false,
    aiCategory: aiResult?.category ?? null,
    aiConfidence: aiResult?.confidence ?? null,
    payerId,
    groupId,
    shares: splits.map(s => ({
      id: `sh-${Date.now()}-${s.userId}`,
      expenseId: `exp-${Date.now()}`,
      userId: s.userId,
      amount: s.amount,
      percent: s.percent,
      isPaid: s.userId === payerId,
    })),
    createdAt: new Date().toISOString(),
  }

  return NextResponse.json(
    { data: newExpense, message: 'Expense created successfully' },
    { status: 201 }
  )
}
