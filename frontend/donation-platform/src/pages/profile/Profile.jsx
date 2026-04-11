import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

const Profile = () => {
  const { user, updateUser, logout } = useAuth()
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', organization: user?.organization || '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError(''); setSuccess(false)
    try {
      await updateUser(form)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-amber-50 pt-16">
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 py-10">
        <div className="max-w-2xl mx-auto px-4 text-white flex items-center gap-5">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-bold backdrop-blur-sm">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold">{user?.name}</h1>
            <p className=" text-white/80 capitalize">{user?.role} · {user?.email}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="card p-8">
          <h2 className="font-serif text-xl font-bold text-stone-900 mb-6">Edit Profile</h2>

          {success && <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm ">✅ Profile updated successfully!</div>}
          {error && <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm ">⚠️ {error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="Full Name" value={form.name} onChange={set('name')} />
            <Input label="Email (cannot be changed)" value={user?.email || ''} disabled className="opacity-60 cursor-not-allowed" />
            <Input label="Phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 555 000 0000" />
            {user?.role === 'charity' && (
              <Input label="Organization Name" value={form.organization} onChange={set('organization')} />
            )}
            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={loading} className="flex-1">Save Changes</Button>
              <Button variant="danger" onClick={logout} type="button">Sign Out</Button>
            </div>
          </form>
        </div>

        {/* Account info card */}
        <div className="card p-6 mt-5">
          <h3 className="font-serif text-lg font-bold text-stone-900 mb-4">Account Information</h3>
          <div className="space-y-3 text-sm ">
            <div className="flex justify-between py-2 border-b border-stone-100">
              <span className="text-stone-500">Role</span>
              <span className="font-semibold capitalize text-stone-900">{user?.role}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100">
              <span className="text-stone-500">Email</span>
              <span className="font-semibold text-stone-900">{user?.email}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-stone-500">Member since</span>
              <span className="font-semibold text-stone-900">{new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
