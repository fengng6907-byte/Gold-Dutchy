'use client'
import { useState } from 'react'
import { TrendingUp, TrendingDown, Minus, ArrowRight, Plus, Users, Receipt, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarGroup } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { ExpenseModal } from '@/components/expenses/ExpenseModal'
import { MiniSpendingChart } from '@/components/dashboard/MiniSpendingChart'
import { DebtGraph } from '@/components/dashboard/DebtGraph'
import {
  CURRENT_USER,
  MOCK_GROUPS,
  MOCK_EXPENSES,
  MOCK_NOTIFICATIONS,
  MOCK_BADGES,
  MOCK_MONTHLY_SPENDING,
} from '@/lib/mock-data'
import { CATEGORY_META } from '@/types'
import { formatCurrency } from '@/lib/balance'

const STATS = [
  {
    label: 'You\'re owed',
    value: '$284.33',
    change: '+$52.63 this week',
    trend: 'up',
    color: 'bg-emerald-500/10 text-emerald-600',
    icon: TrendingUp,
  },
  {
    label: 'You owe',
    value: '$199.76',
    change: '-$30 from last week',
    trend: 'down',
    color: 'bg-rose-500/10 text-rose-500',
    icon: TrendingDown,
  },
  {
    label: 'Net balance',
    value: '+$84.57',
    change: 'Across 4 groups',
    trend: 'neutral',
    color: 'bg-gold-500/10 text-gold-700',
    icon: Minus,
  },
  {
    label: 'Monthly spend',
    value: '$980',
    change: '↑ 12% vs last month',
    trend: 'up',
    color: 'bg-navy-500/10 text-navy-700',
    icon: Receipt,
  },
]

export default function DashboardPage() {
  const [expenseModalOpen, setExpenseModalOpen] = useState(false)

  return (
    <>
      <Header
        title={`Good morning, ${CURRENT_USER.name.split(' ')[0]} 👋`}
        subtitle="Here's your expense overview for today."
        onAddExpense={() => setExpenseModalOpen(true)}
      />

      <div className="px-4 sm:px-6 py-6 space-y-6 max-w-7xl mx-auto">

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map(({ label, value, change, trend, color, icon: Icon }) => (
            <Card key={label} padding="md" className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400">{label}</span>
                <div className={`p-1.5 rounded-lg ${color}`}>
                  <Icon size={14} />
                </div>
              </div>
              <div>
                <div className={`text-2xl font-black ${
                  trend === 'up' && label.includes('owed') ? 'text-emerald-600' :
                  trend === 'up' && label.includes('spend') ? 'text-navy-800' :
                  trend === 'down' ? 'text-rose-500' :
                  'text-gold-700'
                }`}>
                  {value}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{change}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Spending chart */}
          <Card className="lg:col-span-2" padding="md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-navy-800">Spending Overview</h2>
                <p className="text-xs text-gray-400 mt-0.5">Last 6 months</p>
              </div>
              <Badge variant="gold">Apr 2024</Badge>
            </div>
            <MiniSpendingChart data={MOCK_MONTHLY_SPENDING} />
          </Card>

          {/* Quick actions + streak */}
          <div className="flex flex-col gap-4">
            {/* Streak card */}
            <Card navy padding="md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/50 font-medium uppercase tracking-wider">Settling Streak</span>
                <span className="text-2xl duck-bob">🦆</span>
              </div>
              <div className="text-5xl font-black text-gold-400 mb-1">{CURRENT_USER.streakDays}</div>
              <p className="text-white/50 text-sm mb-3">days in a row</p>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-gradient rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, (CURRENT_USER.streakDays / 30) * 100)}%` }}
                />
              </div>
              <p className="text-white/30 text-xs mt-2">{30 - CURRENT_USER.streakDays} days to Golden Duck badge</p>
            </Card>

            {/* Quick actions */}
            <Card padding="md">
              <h3 className="font-semibold text-navy-800 mb-3 text-sm">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: 'Add expense', icon: Plus, color: 'text-gold-600 bg-gold-50', action: () => setExpenseModalOpen(true) },
                  { label: 'Create group', icon: Users, color: 'text-navy-600 bg-navy-50', href: '/groups' },
                  { label: 'Settle up', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50', href: '/settle' },
                ].map(({ label, icon: Icon, color, action, href }) => (
                  href ? (
                    <Link
                      key={label}
                      href={href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cream-100 transition-all group"
                    >
                      <div className={`p-2 rounded-lg ${color}`}><Icon size={15} /></div>
                      <span className="text-sm font-medium text-navy-800">{label}</span>
                      <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </Link>
                  ) : (
                    <button
                      key={label}
                      onClick={action}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cream-100 transition-all group"
                    >
                      <div className={`p-2 rounded-lg ${color}`}><Icon size={15} /></div>
                      <span className="text-sm font-medium text-navy-800">{label}</span>
                      <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </button>
                  )
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Groups and Debts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Groups */}
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-navy-800">Your Groups</h2>
              <Link href="/groups" className="text-xs text-gold-600 font-medium hover:text-gold-700 flex items-center gap-1">
                View all <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {MOCK_GROUPS.slice(0, 4).map(group => (
                <Link
                  key={group.id}
                  href={`/groups/${group.id}`}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-cream-100 transition-all group"
                >
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${group.color}18`, border: `1px solid ${group.color}30` }}
                  >
                    {group.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy-800 truncate">{group.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <AvatarGroup users={group.members.map(m => ({ name: m.user.name }))} max={3} size="xs" />
                      <span className="text-xs text-gray-400">{group.members.length} members</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`text-sm font-bold ${group.yourBalance >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {group.yourBalance >= 0 ? '+' : ''}{formatCurrency(group.yourBalance)}
                    </div>
                    <div className="text-xs text-gray-400">{group.yourBalance >= 0 ? 'owed to you' : 'you owe'}</div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Debt graph */}
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-navy-800">Who Owes Who</h2>
              <Badge variant="blue" size="sm">Simplified</Badge>
            </div>
            <DebtGraph />
          </Card>
        </div>

        {/* Recent expenses */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-navy-800">Recent Expenses</h2>
            <Link href="/expenses" className="text-xs text-gold-600 font-medium hover:text-gold-700 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-1">
            {MOCK_EXPENSES.slice(0, 5).map(expense => {
              const myShare = expense.shares.find(s => s.userId === CURRENT_USER.id)
              const isPayer = expense.payerId === CURRENT_USER.id
              const meta = CATEGORY_META[expense.category]

              return (
                <div
                  key={expense.id}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-cream-100 transition-all cursor-pointer"
                >
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}25` }}
                  >
                    {meta.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy-800 truncate">{expense.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">
                        {isPayer ? 'You paid' : `${expense.payer.name.split(' ')[0]} paid`}
                      </span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{meta.label}</span>
                      {expense.aiCategory && (
                        <span className="text-[10px] badge-blue px-1.5 py-0 rounded font-medium">AI</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-navy-800">{formatCurrency(expense.amount)}</div>
                    {myShare && (
                      <div className={`text-xs font-medium ${
                        isPayer ? 'text-emerald-600' : myShare.isPaid ? 'text-gray-400' : 'text-rose-500'
                      }`}>
                        {isPayer
                          ? `+${formatCurrency(expense.amount - myShare.amount)}`
                          : myShare.isPaid
                          ? 'settled'
                          : `-${formatCurrency(myShare.amount)}`
                        }
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Badges */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-navy-800">Achievements</h2>
            <span className="text-xs text-gray-400">{MOCK_BADGES.filter(b => b.earnedAt).length}/{MOCK_BADGES.length} earned</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {MOCK_BADGES.map(badge => (
              <div
                key={badge.id}
                className={`flex flex-col items-center p-3 rounded-2xl text-center transition-all ${
                  badge.earnedAt
                    ? 'bg-gold-50 border border-gold-500/20'
                    : 'bg-gray-50 border border-gray-100 opacity-40 grayscale'
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <p className="text-xs font-semibold text-navy-800">{badge.name}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{badge.points} pts</p>
                {badge.earnedAt && (
                  <span className="mt-1 text-[10px] badge-gold px-1.5 py-0.5 rounded font-medium">Earned</span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <ExpenseModal
        open={expenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
      />
    </>
  )
}
