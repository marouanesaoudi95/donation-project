import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import { validatePostForm } from '../../utils/validators'
import { DONATION_TYPES } from '../../utils/constants'

const PostForm = ({ initialData = {}, onSubmit, loading, submitLabel = 'Create Post' }) => {
  const [form, setForm] = useState({
    donationType: '', quantity: '', description: '',
    contactPhone: '', contactEmail: '',
    ...initialData,
  })
  const [errors, setErrors] = useState({})

  useEffect(() => { if (initialData._id) setForm(f => ({ ...f, ...initialData })) }, [initialData._id])

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validatePostForm(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Donation type */}
      <div>
        <label className="block text-sm font-semibold text-stone-900 mb-2 ">Donation Type *</label>
        <div className="grid grid-cols-3 gap-2">
          {DONATION_TYPES.map(t => (
            <button
              type="button" key={t.value}
              onClick={() => setForm(f => ({ ...f, donationType: t.value }))}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-200  text-sm ${
                form.donationType === t.value
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-stone-200 hover:border-stone-300 text-stone-500'
              }`}
            >
              <span className="text-xl">{t.icon}</span>
              <span className="text-xs font-medium truncate w-full text-center">{t.label}</span>
            </button>
          ))}
        </div>
        {errors.donationType && <p className="mt-1.5 text-sm text-red-500">{errors.donationType}</p>}
      </div>

      <Input label="Quantity *" type="number" min="1"
        value={form.quantity} onChange={set('quantity')}
        error={errors.quantity} placeholder="e.g. 50"
        hint="Number of units available for donation"
      />

      <Input label="Description *" as="textarea" rows={4}
        value={form.description} onChange={set('description')}
        error={errors.description}
        placeholder="Describe the items: condition, size, special notes…"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input label="Contact Phone" type="tel"
          value={form.contactPhone} onChange={set('contactPhone')}
          placeholder="+1 (555) 000-0000"
        />
        <Input label="Contact Email" type="email"
          value={form.contactEmail} onChange={set('contactEmail')}
          placeholder="pickup@email.com"
        />
      </div>

      <Button type="submit" loading={loading} className="w-full" size="lg">
        {submitLabel}
      </Button>
    </form>
  )
}

export default PostForm
