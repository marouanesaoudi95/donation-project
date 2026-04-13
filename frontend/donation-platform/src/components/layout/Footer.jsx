import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Mail, MapPin } from 'lucide-react'

const Footer = () => (
  <footer style={{ background: '#1c1917', color: '#a8a29e' }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          {/* Logo avec Heart de Lucide */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white" style={{ background: '#f97316' }}>
              <Heart size={18} fill="white" />
            </div>
            <span className="text-xl font-bold text-white" style={{ fontFamily: 'Playfair Display,serif' }}>
              Hope<span style={{ color: '#fb923c' }}>Link</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#a8a29e' }}>
            Connecting generous donors with charitable organizations to make a real difference in communities.
          </p>
          
          {/* Boutons sociaux originaux (T, F, I) */}
          <div className="flex gap-3 mt-6">
            {['T', 'F', 'I'].map(s => (
              <a key={s} href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#a8a29e', textDecoration: 'none' }}
                onMouseOver={e => e.currentTarget.style.background = '#f97316'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >{s}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display,serif' }}>Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {[['Home', '/'], ['Browse Donations', '/posts'], ['About Us', '/about'], ['Sign In', '/login'], ['Register', '/register']].map(([l, p]) => (
              <li key={p}>
                <Link to={p} className="transition-colors hover:text-orange-400" style={{ color: '#a8a29e', textDecoration: 'none' }}>{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display,serif' }}>Contact</h4>
          <ul className="space-y-3 text-sm" style={{ color: '#a8a29e' }}>
            <li className="flex items-center gap-2">
              <Mail size={16} /> hello@hopelink.org
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Algiers, ALGERIA
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm"
        style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: '#78716c' }}>
        <p>© 2026 HopeLink. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Built with <Heart size={14} fill="#ef4444" color="#ef4444" /> for a better world
        </p>
      </div>
    </div>
  </footer>
)

export default Footer