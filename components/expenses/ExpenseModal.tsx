'use client'
import { useState, useEffect } from 'react'
import { Sparkles, DollarSign, Users, Calendar, StickyNote, Equal, Percent, Hash, Sliders } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { MOCK_GROUPS, CURRENT_USER } from '@/lib/mock-data'
import { CATEGORY_META } from '@/types'
import type { SplitMethod, Category } from '@/types'
import { calculateSplit, aiCategorize } from '@/lib/split'
import { formatCurrency } from '@/lib/balance'

interface Props {
  open: boolean
  onClose: () => void
  groupId?: string
}

type Step = 'details' | 'split' | 'confirm'

const SPLIT_METHODS: { value: SplitMethod; label: string; icon: React.ReactNode; desc: string }[] = [
  { value: 'EQUAL',      label: 'Equal',       icon: <Equal size={16} />,   desc: 'Everyone pays the same amount' },
  { value: 'PERCENTAGE', label: 'Percentage',  icon: <Percent size={16} />, desc: 'Split by custom percentages' },
  { value: 'EXACT',      label: 'Exact',        icon: <DollarSign size={14} />, desc: 'Specify exact amounts' },
  { value: 'SHARES',     label: 'Shares',       icon: <Hash size={16} />,   desc: 'Split by weighted shares' },
]

export function ExpenseModal({ open, onClose, groupId }: Props) {
  const [step, setStep] = useState<Step>('details')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<Category>('OTHER')
  const [selectedGroup, setSelectedGroup] = useState(groupId ?? MOCK_GROUPS[0].id)
  const [payerId, setPayerId] = useState(CURRENT_USER.id)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [notes, setNotes] = useState('')
  const [splitMethod, setSplitMethod] = useState<SplitMethod>('EQUAL')
  const [loading, setLoading] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState<{ category: string; confidence: number } | null>(null)

  const group = MOCK_GROUPS.find(g => g.id === selectedGroup) ?? MOCK_GROUPS[0]
  const participants = group.members.map(m => m.user)

  const splits = calculateSplit(
    parseFloat(amount) || 0,
    participants.map(p => ({ userId: p.id, name: p.name })),
    splitMethod
  )

  // AI categorize on title change
  useEffect(() => {
    if (title.length > 3) {
      const suggestion = aiCategorize(title)
      setAiSuggestion(suggestion)
      if (suggestion.confidence > 0.7) {
        setCategory(suggestion.category as Category)
      }
    }
  }, [title])

  const handleClose = () => {
    setStep('details')
    setTitle('')
    setAmount('')
    setCategory('OTHER')
    setNotes('')
    onClose()
  }

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800)) // simulate API call
    setLoading(false)
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add Expense"
      description="Track a shared expense for your group"
      size="md"
    >
      {/* Step indicator */}
      <div className="px-6 pt-4 pb-2 flex gap-2">
        {(['details', 'split', 'confirm'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
              step === s ? 'bg-gold-500 text-navy-800' :
              (['split', 'confirm'].indexOf(s) < ['split', 'confirm'].indexOf(step) + (step === 'details' ? 0 : 1)) ? 'bg-emerald-500 text-white' :
              'bg-cream-200 text-gray-400'
            }`}>
              {i + 1}
            </div>
            <span className={`text-xs font-medium capitalize ${step === s ? 'text-navy-800' : 'text-gray-400'}`}>{s}</span>
            {i < 2 && <div className={`flex-1 h-px ${step !== 'details' && i === 0 ? 'bg-emerald-300' : 'bg-cream-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Details */}
      {step === 'details' && (
        <div className="px-6 pb-6 space-y-4">
          {/* Title with AI */}
          <div className="relative">
            <Input
              label="Expense title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Dinner at Nobu, Uber to airport..."
              required
            />
            {aiSuggestion && title.length > 3 && (
              <div className="mt-1.5 flex items-center gap-1.5">
                <Sparkles size={12} className="text-gold-500" />
                <span className="text-xs text-gray-400">
                  AI suggests:{' '}
                  <button
                    onClick={() => setCategory(aiSuggestion.category as Category)}
                    className="font-medium text-gold-600 hover:text-gold-700"
                  >
                    {CATEGORY_META[aiSuggestion.category as Category]?.label}
                  </button>
                  <span className="text-gray-300 ml-1">({Math.round(aiSuggestion.confidence * 100)}% confident)</span>
                </span>
              </div>
            )}
          </div>

          {/* Amount */}
          <Input
            label="Amount"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="0.00"
            required
            prefix={<DollarSign size={14} />}
          />

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-navy-800 block mb-1.5">Category</label>
            <div className="grid grid-cols-4 gap-1.5">
              {Object.entries(CATEGORY_META).slice(0, 8).map(([key, meta]) => (
                <button
                  key={key}
                  onClick={() => setCategory(key as Category)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-center transition-all ${
                    category === key
                      ? 'border-gold-500 bg-gold-50 shadow-gold'
                      : 'border-navy-800/8 hover:border-navy-800/20 hover:bg-cream-50'
                  }`}
                >
                  <span className="text-lg">{meta.icon}</span>
                  <span className="text-[10px] font-medium text-gray-500 leading-tight">{meta.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Group + Payer */}
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Group"
              value={selectedGroup}
              onChange={e => setSelectedGroup(e.target.value)}
              options={MOCK_GROUPS.map(g => ({ value: g.id, label: `${g.emoji} ${g.name}` }))}
            />
            <Select
              label="Paid by"
              value={payerId}
              onChange={e => setPayerId(e.target.value)}
              options={group.members.map(m => ({ value: m.userId, label: m.user.name }))}
            />
          </div>

          <Input
            label="Date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            prefix={<Calendar size={14} />}
          />

          <Textarea
            label="Notes (optional)"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Add any notes or context..."
            rows={2}
          />

          <Button
            variant="gold"
            fullWidth
            size="lg"
            disabled={!title || !amount || parseFloat(amount) <= 0}
            onClick={() => setStep('split')}
          >
            Choose split method →
          </Button>
        </div>
      )}

      {/* Step 2: Split */}
      {step === 'split' && (
        <div className="px-6 pb-6 space-y-4">
          {/* Amount display */}
          <div className="text-center py-3 bg-gold-50 rounded-2xl border border-gold-500/20">
            <p className="text-xs text-gray-400 mb-0.5">Total amount</p>
            <p className="text-3xl font-black text-navy-800">{formatCurrency(parseFloat(amount) || 0)}</p>
            <p className="text-xs text-gray-400 mt-0.5">{group.name} · {participants.length} participants</p>
          </div>

          {/* Split method selector */}
          <div>
            <label className="text-sm font-medium text-navy-800 block mb-2">Split method</label>
            <div className="grid grid-cols-2 gap-2">
              {SPLIT_METHODS.map(method => (
                <button
                  key={method.value}
                  onClick={() => setSplitMethod(method.value)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                    splitMethod === method.value
                      ? 'border-gold-500 bg-gold-50 shadow-gold'
                      : 'border-navy-800/8 hover:border-navy-800/20'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${splitMethod === method.value ? 'bg-gold-500 text-navy-800' : 'bg-cream-100 text-gray-500'}`}>
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-800">{method.label}</p>
                    <p className="text-[10px] text-gray-400">{method.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Split preview */}
          <div>
            <label className="text-sm font-medium text-navy-800 block mb-2">Split preview</label>
            <div className="space-y-2">
              {participants.map((person, i) => {
                const split = splits.find(s => s.userId === person.id)
                const isCurrentUser = person.id === CURRENT_USER.id
                return (
                  <div key={person.id} className="flex items-center gap-3 p-3 rounded-xl bg-cream-50 border border-cream-200">
                    <Avatar name={person.name} size="sm" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-navy-800">
                        {isCurrentUser ? 'You' : person.name.split(' ')[0]}
                        {person.id === payerId && (
                          <span className="ml-2 text-[10px] badge-gold px-1.5 py-0.5 rounded font-medium">payer</span>
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      {splitMethod === 'PERCENTAGE' ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            defaultValue={Math.round(100 / participants.length)}
                            className="w-12 text-right text-sm font-bold bg-white border border-gold-500/40 rounded-lg px-1.5 py-0.5 focus:outline-none focus:border-gold-500"
                          />
                          <span className="text-gray-400 text-sm">%</span>
                        </div>
                      ) : splitMethod === 'EXACT' ? (
                        <input
                          type="number"
                          defaultValue={split?.amount.toFixed(2)}
                          className="w-20 text-right text-sm font-bold bg-white border border-gold-500/40 rounded-lg px-1.5 py-0.5 focus:outline-none focus:border-gold-500"
                        />
                      ) : splitMethod === 'SHARES' ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            defaultValue={1}
                            min={0}
                            className="w-12 text-right text-sm font-bold bg-white border border-gold-500/40 rounded-lg px-1.5 py-0.5 focus:outline-none focus:border-gold-500"
                          />
                          <span className="text-gray-400 text-xs">shares</span>
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-navy-800">
                          {split ? formatCurrency(split.amount) : '—'}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Validation */}
            {splitMethod === 'EQUAL' && (
              <p className="text-xs text-gray-400 text-center mt-2">
                Each person pays {formatCurrency((parseFloat(amount) || 0) / participants.length)} (rounding adjusted)
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" size="lg" fullWidth onClick={() => setStep('details')}>
              ← Back
            </Button>
            <Button variant="gold" size="lg" fullWidth onClick={() => setStep('confirm')}>
              Review →
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 'confirm' && (
        <div className="px-6 pb-6 space-y-4">
          <div className="bg-navy-gradient rounded-2xl p-5 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">{CATEGORY_META[category]?.icon}</div>
              <div>
                <p className="font-bold text-lg">{title}</p>
                <p className="text-white/50 text-sm">{CATEGORY_META[category]?.label} · {group.name}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-3xl font-black text-gold-400">{formatCurrency(parseFloat(amount) || 0)}</p>
                <p className="text-white/40 text-xs">{splitMethod.toLowerCase()} split</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/8 rounded-xl p-3">
                <p className="text-white/40 text-xs">Paid by</p>
                <p className="font-semibold mt-0.5">
                  {group.members.find(m => m.userId === payerId)?.user.name}
                </p>
              </div>
              <div className="bg-white/8 rounded-xl p-3">
                <p className="text-white/40 text-xs">Date</p>
                <p className="font-semibold mt-0.5">
                  {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {/* Participants summary */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-navy-800">Split summary</p>
            {participants.map(person => {
              const split = splits.find(s => s.userId === person.id)
              return (
                <div key={person.id} className="flex items-center gap-3">
                  <Avatar name={person.name} size="sm" />
                  <span className="flex-1 text-sm text-navy-800">{person.name.split(' ')[0]}</span>
                  <span className="text-sm font-bold text-navy-800">{split ? formatCurrency(split.amount) : '—'}</span>
                </div>
              )
            })}
          </div>

          {notes && (
            <div className="p-3 bg-cream-100 rounded-xl border border-cream-200">
              <p className="text-xs text-gray-400 mb-0.5">Notes</p>
              <p className="text-sm text-navy-800">{notes}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="secondary" size="lg" fullWidth onClick={() => setStep('split')}>
              ← Back
            </Button>
            <Button
              variant="gold"
              size="lg"
              fullWidth
              loading={loading}
              onClick={handleSubmit}
            >
              Add Expense 🦆
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
