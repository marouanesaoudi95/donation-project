import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { usePosts } from '../hooks/usePosts'
import PostCard from '../components/posts/PostCard'
import { DONATION_TYPES, STATS } from '../utils/constants'

const CAUSE_IMAGES = {
  food: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80',
  clothes: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  toys: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80',
  books: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80',
  electronics: 'https://images.unsplash.com/photo-1593344484962-796055d4a3a4?w=400&q=80',
  other: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=80',
}

const HomePage = () => {
  const { isAuthenticated, isDonor } = useAuth()
  const { posts, fetchPosts, loading } = usePosts()

  useEffect(() => { fetchPosts({ status: 'available', limit: 6 }) }, [])

  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400">
        <div className="absolute inset-0 [background-image:none] opacity-20" />
        {/* Floating blobs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-orange-300/20 rounded-full blur-2xl animate-pulse-soft" style={{animationDelay:'1s'}} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm  font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              340+ charities connected across the country
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Give Hope,<br />
              <span className="text-orange-200">Change Lives</span>
            </h1>
            <p className=" text-white/85 text-xl leading-relaxed mb-10 max-w-lg">
              HopeLink connects generous donors with trusted charitable organizations — making giving simple, transparent, and impactful.
            </p>
            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                isDonor ? (
                  <Link to="/posts/create" className="btn-primary bg-white !text-orange-600 hover:bg-orange-50 shadow-xl">
                    🎁 Create Donation
                  </Link>
                ) : (
                  <Link to="/posts" className="btn-primary bg-white !text-orange-600 hover:bg-orange-50 shadow-xl">
                    🔍 Browse Donations
                  </Link>
                )
              ) : (
                <>
                  <Link to="/register" className="btn-primary bg-white !text-orange-600 hover:bg-orange-50 shadow-xl">
                    Get Started Free
                  </Link>
                  <Link to="/posts" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-orange-600">
                    Browse Donations
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{animationDelay:'0.3s'}}>
            {STATS.map((s, i) => (
              <div key={i} className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                <p className="text-3xl mb-1">{s.icon}</p>
                <p className="font-serif text-3xl font-bold text-white">{s.value}</p>
                <p className=" text-white/70 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fef9f0"/>
          </svg>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-orange-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-orange-500 font-semibold  text-sm uppercase tracking-widest mb-3">Simple Process</span>
            <h2 className="text-4xl font-bold font-serif text-stone-900 mb-3">How HopeLink Works</h2>
            <p className="text-stone-500 text-lg leading-relaxed max-w-xl mx-auto">Three simple steps to connect donors with charities and make a lasting difference.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '📝', title: 'Post a Donation', desc: 'Donors list available items — food, clothes, toys, and more — in minutes.' },
              { step: '02', icon: '🔍', title: 'Charities Discover', desc: 'Registered charities browse and filter donations matching their community needs.' },
              { step: '03', icon: '🤝', title: 'Connect & Collect', desc: 'Charities claim donations and coordinate pickup directly with donors.' },
            ].map((step, i) => (
              <div key={i} className="card p-8 text-center group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:bg-orange-100 transition-colors">
                  {step.icon}
                </div>
                <div className="inline-block text-xs font-bold  text-orange-400 bg-orange-50 px-3 py-1 rounded-full mb-3">{step.step}</div>
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">{step.title}</h3>
                <p className=" text-stone-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cause Categories ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-orange-500 font-semibold  text-sm uppercase tracking-widest mb-3">What We Collect</span>
            <h2 className="text-4xl font-bold font-serif text-stone-900 mb-3">Donation Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {DONATION_TYPES.map(type => (
              <Link key={type.value} to={`/posts?type=${type.value}`}
                className="group relative rounded-2xl overflow-hidden aspect-video  hover: transition-all duration-300 hover:-translate-y-1">
                <img src={CAUSE_IMAGES[type.value]} alt={type.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-2xl mb-1">{type.icon}</p>
                  <p className="font-serif font-bold text-lg leading-tight">{type.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Donations ─────────────────────────────────────────────── */}
      <section className="py-20 bg-orange-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-block text-orange-500 font-semibold  text-sm uppercase tracking-widest mb-3">Live Feed</span>
              <h2 className="text-4xl font-bold font-serif text-stone-900">Recent Donations</h2>
            </div>
            <Link to="/posts" className="btn-outline hidden sm:flex items-center gap-2">
              View All <span>→</span>
            </Link>
          </div>
          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(6)].map((_,i) => (
                <div key={i} className="card p-5 animate-pulse">
                  <div className="h-2 bg-stone-200 rounded mb-4" />
                  <div className="h-4 bg-stone-200 rounded w-1/2 mb-3" />
                  <div className="h-3 bg-stone-100 rounded mb-2" />
                  <div className="h-3 bg-stone-100 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(0,6).map(post => <PostCard key={post._id} post={post} />)}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/posts" className="btn-primary">Browse All Donations →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 [background-image:none] opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-5">Ready to Make a Difference?</h2>
          <p className=" text-white/80 text-xl mb-10 max-w-xl mx-auto">
            Join thousands of donors and charities already creating positive change through HopeLink.
          </p>
          {!isAuthenticated && (
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/register?role=donor" className="btn-primary bg-white !text-green-700 hover:bg-stone-50 shadow-xl">
                🎁 I Want to Donate
              </Link>
              <Link to="/register?role=charity" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-green-700">
                🏛️ Register as Charity
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage
