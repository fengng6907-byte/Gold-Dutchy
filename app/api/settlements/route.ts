import { NextRequest, NextResponse } from 'next/server'
import { MOCK_SETTLEMENTS } from '@/lib/mock-data'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  const status = searchParams.get('status')

  let settlements = MOCK_SETTLEMENTS

  if (userId) {
    settlements = settlements.filter(s =>
      s.sender.id === userId || s.receiver.id === userId
    )
  }

  if (status) {
    settlements = settlements.filter(s => s.status === status)
  }

  return NextResponse.json({ data: settlements, total: settlements.length })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { senderId, receiverId, amount, method, notes, groupId } = body

  if (!senderId || !receiverId || !amount) {
    return NextResponse.json(
      { error: 'senderId, receiverId, and amount are required' },
      { status: 400 }
    )
  }

  if (senderId === receiverId) {
    return NextResponse.json(
      { error: 'Sender and receiver must be different users' },
      { status: 400 }
    )
  }

  if (parseFloat(amount) <= 0) {
    return NextResponse.json({ error: 'Amount must be positive' }, { status: 400 })
  }

  const newSettlement = {
    id: `set-${Date.now()}`,
    amount: parseFloat(amount),
    currency: 'USD',
    notes: notes ?? null,
    method: method ?? 'CASH',
    status: 'PENDING',
    senderId,
    receiverId,
    groupId: groupId ?? null,
    createdAt: new Date().toISOString(),
    settledAt: null,
  }

  return NextResponse.json(
    { data: newSettlement, message: 'Settlement request created' },
    { status: 201 }
  )
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const { id, status } = body

  if (!id || !status) {
    return NextResponse.json({ error: 'id and status are required' }, { status: 400 })
  }

  const settlement = MOCK_SETTLEMENTS.find(s => s.id === id)
  if (!settlement) {
    return NextResponse.json({ error: 'Settlement not found' }, { status: 404 })
  }

  const updated = {
    ...settlement,
    status,
    settledAt: status === 'COMPLETED' ? new Date().toISOString() : settlement.settledAt,
  }

  return NextResponse.json({ data: updated, message: `Settlement ${status.toLowerCase()}` })
}
