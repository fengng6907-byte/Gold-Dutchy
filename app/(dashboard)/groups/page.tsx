'use client'
import { useState } from 'react'
import { Plus, Search, Users } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AvatarGroup } from '@/components/ui/Avatar'
import { Modal } from '@/components/ui/Modal'
import { Input, Select } from '@/components/ui/Input'
import { MOCK_GROUPS } from '@/lib/mock-data'
import { GROUP_TYPE_META } from '@/types'
import { formatCurrency } from '@/lib/balance'

const GROUP_COLORS = [
  '#F5B800', '#8B5CF6', '#EC4899', '#10B981',
  '#3B82F6', '#F97316', '#EF4444', '#06B6D4',
]

const EMOJI_OPTIONS = ['✈️', '🏠', '👥', '💼', '🎉', '🍔', '🏖️', '🎮', '⚽', '🎵']

export default function GroupsPage() {
  const [search, setSearch] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState(GROUP_COLORS[0])
  const [selectedEmoji, setSelectedEmoji] = useState('✈️')

  const filtered = MOCK_GROUPS.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.type.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Header
        title="Groups"
        subtitle="Manage your expense groups"
        onAddExpense={() => {}}
      />

      <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto space-y-6">
        {/* Toolbar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search groups..."
              className="w-full bg-white border border-navy-800/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-navy-800 placeholder-gray-400 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
            />
          </div>
          <Button variant="gold" size="sm" icon={<Plus size={16} />} onClick={() => setCreateOpen(true)}>
            New Group
          </Button>
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total groups', value: MOCK_GROUPS.length, color: 'text-navy-800' },
            { label: 'Total members', value: MOCK_GROUPS.reduce((s, g) => s + g.members.length, 0), color: 'text-navy-800' },
            { label: 'You\'re owed', value: `$${MOCK_GROUPS.filter(g => g.yourBalance > 0).reduce((s, g) => s + g.yourBalance, 0).toFixed(2)}`, color: 'text-emerald-600' },
            { label: 'You owe', value: `$${Math.abs(MOCK_GROUPS.filter(g => g.yourBalance < 0).reduce((s, g) => s + g.yourBalance, 0)).toFixed(2)}`, color: 'text-rose-500' },
          ].map(({ label, value, color }) => (
            <Card key={label} padding="md">
              <p className="text-xs text-gray-400 mb-1">{label}</p>
              <p className={`text-xl font-black ${color}`}>{value}</p>
            </Card>
          ))}
        </div>

        {/* Groups grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(group => {
            const typeMeta = GROUP_TYPE_META[group.type]
            const totalExpenses = group.totalExpenses

            return (
              <Link key={group.id} href={`/groups/${group.id}`}>
                <Card hover padding="none" className="overflow-hidden h-full">
                  {/* Color header */}
                  <div
                    className="h-24 flex items-center justify-center text-5xl relative"
                    style={{
                      background: `linear-gradient(135deg, ${group.color}30 0%, ${group.color}15 100%)`,
                      borderBottom: `1px solid ${group.color}20`,
                    }}
                  >
                    <span className="duck-bob" style={{ animationDelay: `${Math.random()}s` }}>
                      {group.emoji}
                    </span>
                    <div className="absolute top-3 right-3">
                      <Badge variant="gray" size="sm">{typeMeta.label}</Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-navy-800 mb-1 truncate">{group.name}</h3>
                    {group.description && (
                      <p className="text-xs text-gray-400 mb-3 line-clamp-1">{group.description}</p>
                    )}

                    <AvatarGroup users={group.members.map(m => ({ name: m.user.name }))} max={4} size="xs" />

                    <div className="mt-3 pt-3 border-t border-navy-800/5 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Total spent</p>
                        <p className="text-sm font-bold text-navy-800">{formatCurrency(totalExpenses)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Your balance</p>
                        <p className={`text-sm font-bold ${group.yourBalance >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                          {group.yourBalance >= 0 ? '+' : ''}{formatCurrency(group.yourBalance)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}

          {/* Create group card */}
          <button onClick={() => setCreateOpen(true)} className="h-full min-h-[200px]">
            <Card padding="none" className="h-full border-dashed border-2 border-navy-800/10 hover:border-gold-500/40 hover:bg-gold-50/30 transition-all flex flex-col items-center justify-center gap-3 p-8 cursor-pointer group">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-all">
                <Plus size={20} className="text-gold-600" />
              </div>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gold-700 transition-colors">Create new group</p>
            </Card>
          </button>
        </div>
      </div>

      {/* Create group modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create New Group" size="md">
        <div className="p-6 space-y-5">
          {/* Emoji + color */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl border-2 transition-all shadow-gold"
              style={{ background: `${selectedColor}20`, borderColor: `${selectedColor}40` }}
            >
              {selectedEmoji}
            </div>

            {/* Emoji picker */}
            <div className="flex flex-wrap gap-2 justify-center">
              {EMOJI_OPTIONS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`w-9 h-9 text-xl rounded-xl transition-all ${selectedEmoji === emoji ? 'bg-gold-100 ring-2 ring-gold-500' : 'hover:bg-cream-100'}`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Color picker */}
            <div className="flex gap-2">
              {GROUP_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full transition-all ${selectedColor === color ? 'ring-2 ring-offset-2 ring-navy-800 scale-110' : 'hover:scale-110'}`}
                  style={{ background: color }}
                />
              ))}
            </div>
          </div>

          <Input label="Group name" placeholder="e.g. Tokyo Trip 2024" required />

          <Input label="Description" placeholder="What's this group for? (optional)" />

          <Select
            label="Group type"
            options={Object.entries(GROUP_TYPE_META).map(([value, meta]) => ({
              value,
              label: `${meta.emoji} ${meta.label}`,
            }))}
          />

          <Select
            label="Default currency"
            options={[
              { value: 'USD', label: 'USD — US Dollar' },
              { value: 'EUR', label: 'EUR — Euro' },
              { value: 'GBP', label: 'GBP — British Pound' },
              { value: 'JPY', label: 'JPY — Japanese Yen' },
              { value: 'AUD', label: 'AUD — Australian Dollar' },
            ]}
          />

          <Input label="Invite members" placeholder="Enter email addresses..." hint="Separate multiple emails with commas" />

          <Button variant="gold" fullWidth size="lg">
            Create Group 🦆
          </Button>
        </div>
      </Modal>
    </>
  )
}
