'use client'
import { useState } from 'react'
import { Plus, Search, Filter, CheckCircle2 } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { ExpenseModal } from '@/components/expenses/ExpenseModal'
import { MOCK_EXPENSES, MOCK_GROUPS, CURRENT_USER } from '@/lib/mock-data'
import { CATEGORY_META } from '@/types'
import { formatCurrency } from '@/lib/balance'
import type { Category } from '@/types'

export default function ExpensesPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState<Category | 'ALL'>('ALL')
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'SETTLED' | 'OUTSTANDING'>('ALL')

  const filtered = MOCK_EXPENSES.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory = filterCategory === 'ALL' || e.category === filterCategory
    const myShare = e.shares.find(s => s.userId === CURRENT_USER.id)
    const isPayer = e.payerId === CURRENT_USER.id
    const isSettled = myShare?.isPaid || isPayer
    const matchStatus =
      filterStatus === 'ALL' ||
      (filterStatus === 'SETTLED' && isSettled) ||
      (filterStatus === 'OUTSTANDING' && !isSettled)
    return matchSearch && matchCategory && matchStatus
  })

  const totalAmount = filtered.reduce((s, e) => s + e.amount, 0)

  return (
    <>
      <Header
        title="Expenses"
        subtitle="All your shared expenses in one place"
        onAddExpense={() => setModalOpen(true)}
      />

      <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search expenses..."
              className="w-full bg-white border border-navy-800/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-navy-800 placeholder-gray-400 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
            />
          </div>

          {/* Status filter */}
          <div className="flex gap-1 bg-cream-200 rounded-xl p-1">
            {(['ALL', 'OUTSTANDING', 'SETTLED'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  filterStatus === status ? 'bg-white text-navy-800 shadow-card' : 'text-gray-400 hover:text-navy-800'
                }`}
              >
                {status.toLowerCase()}
              </button>
            ))}
          </div>

          <Button variant="gold" size="sm" icon={<Plus size={16} />} onClick={() => setModalOpen(true)}>
            Add Expense
          </Button>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setFilterCategory('ALL')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              filterCategory === 'ALL' ? 'bg-navy-800 text-white border-navy-800' : 'bg-white text-gray-400 border-navy-800/10 hover:border-navy-800/20'
            }`}
          >
            All
          </button>
          {Object.entries(CATEGORY_META).map(([key, meta]) => (
            <button
              key={key}
              onClick={() => setFilterCategory(key as Category)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                filterCategory === key ? 'bg-navy-800 text-white border-navy-800' : 'bg-white text-gray-400 border-navy-800/10 hover:border-navy-800/20'
              }`}
            >
              {meta.icon} {meta.label}
            </button>
          ))}
        </div>

        {/* Summary */}
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-navy-800">{filtered.length}</span> expenses ·{' '}
            <span className="font-semibold text-navy-800">{formatCurrency(totalAmount)}</span> total
          </p>
        </div>

        {/* Expense list */}
        <Card padding="none">
          <div className="divide-y divide-navy-800/4">
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <div className="text-5xl mb-3">💸</div>
                <p className="text-navy-800 font-semibold mb-1">No expenses found</p>
                <p className="text-sm text-gray-400">Try adjusting your filters or add a new expense</p>
              </div>
            ) : (
              filtered.map(expense => {
                const meta = CATEGORY_META[expense.category]
                const myShare = expense.shares.find(s => s.userId === CURRENT_USER.id)
                const isPayer = expense.payerId === CURRENT_USER.id
                const group = MOCK_GROUPS.find(g => g.id === expense.groupId)
                const isSettled = myShare?.isPaid || (isPayer && expense.shares.every(s => s.isPaid || s.userId === CURRENT_USER.id))

                return (
                  <div
                    key={expense.id}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-cream-50 transition-all cursor-pointer"
                  >
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}25` }}
                    >
                      {meta.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-semibold text-navy-800 truncate">{expense.title}</p>
                        {expense.aiCategory && (
                          <span className="text-[10px] badge-blue px-1.5 py-0 rounded font-medium shrink-0">AI</span>
                        )}
                        {myShare?.isPaid && (
                          <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-gray-400">
                          {isPayer ? 'You paid' : `${expense.payer.name.split(' ')[0]} paid`}
                        </span>
                        <span className="text-xs text-gray-200">·</span>
                        {group && (
                          <span className="text-xs text-gray-400">{group.emoji} {group.name}</span>
                        )}
                        <span className="text-xs text-gray-200">·</span>
                        <span className="text-xs text-gray-400">
                          {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-base font-bold text-navy-800">{formatCurrency(expense.amount)}</p>
                      {myShare && (
                        <p className={`text-xs font-medium ${
                          isPayer ? 'text-emerald-600' :
                          myShare.isPaid ? 'text-gray-400' : 'text-rose-500'
                        }`}>
                          {isPayer
                            ? `+${formatCurrency(expense.amount - myShare.amount)}`
                            : myShare.isPaid ? 'settled' : `-${formatCurrency(myShare.amount)}`
                          }
                        </p>
                      )}
                    </div>

                    <Badge
                      variant={myShare?.isPaid || isPayer ? 'green' : 'red'}
                      size="sm"
                      dot
                    >
                      {myShare?.isPaid || isPayer ? 'Settled' : 'Owed'}
                    </Badge>
                  </div>
                )
              })
            )}
          </div>
        </Card>
      </div>

      <ExpenseModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
