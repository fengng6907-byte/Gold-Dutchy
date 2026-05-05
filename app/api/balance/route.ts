import { NextRequest, NextResponse } from 'next/server'
import { MOCK_EXPENSES, MOCK_GROUPS, MOCK_USERS } from '@/lib/mock-data'
import { calculateDashboardStats, simplifyDebts } from '@/lib/balance'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId') ?? 'user-1'
  const groupId = searchParams.get('groupId')

  if (groupId) {
    // Group-specific balances
    const group = MOCK_GROUPS.find(g => g.id === groupId)
    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    }

    const groupExpenses = MOCK_EXPENSES.filter(e => e.groupId === groupId)
    const groupUsers = group.members.map(m => m.user)
    const simplifiedDebts = simplifyDebts(groupExpenses, groupUsers)

    return NextResponse.json({
      data: {
        groupId,
        simplifiedDebts,
        totalExpenses: groupExpenses.reduce((s, e) => s + e.amount, 0),
        expenseCount: groupExpenses.length,
      }
    })
  }

  // Dashboard balances
  const userExpenses = MOCK_EXPENSES.filter(e =>
    e.payerId === userId || e.shares.some(s => s.userId === userId)
  )

  const stats = calculateDashboardStats(userExpenses, userId)
  const allUsers = MOCK_USERS
  const allDebts = simplifyDebts(userExpenses, allUsers)
  const myDebts = allDebts.filter(d => d.fromUserId === userId || d.toUserId === userId)

  return NextResponse.json({
    data: {
      userId,
      ...stats,
      activeGroups: MOCK_GROUPS.filter(g => g.members.some(m => m.userId === userId)).length,
      simplifiedDebts: myDebts,
      expenseCount: userExpenses.length,
    }
  })
}
