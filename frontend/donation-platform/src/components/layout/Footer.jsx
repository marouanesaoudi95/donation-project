import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer style={{background:'#1c1917', color:'#a8a29e'}}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white" style={{background:'#f97316'}}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-white" style={{fontFamily:'Playfair Display,serif'}}>
              Hope<span style={{color:'#fb923c'}}>Link</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs" style={{color:'#a8a29e'}}>
            Connecting generous donors with charitable organizations to make a real difference in communities.
          </p>
          <div className="flex gap-3 mt-6">
            {['T','F','I'].map(s => (
              <a key={s} href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                style={{background:'rgba(255,255,255,0.1)'}}
                onMouseOver={e => e.currentTarget.style.background='#f97316'}
                onMouseOut={e => e.currentTarget.style.background='rgba(255,255,255,0.1)'}
              >{s}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4" style={{fontFamily:'Playfair Display,serif'}}>Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {[['Home','/'],['Browse Donations','/posts'],['About Us','/about'],['Sign In','/login'],['Register','/register']].map(([l,p]) => (
              <li key={p}>
                <Link to={p} className="transition-colors hover:text-orange-400" style={{color:'#a8a29e'}}>{l}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4" style={{fontFamily:'Playfair Display,serif'}}>Contact</h4>
          <ul className="space-y-2.5 text-sm" style={{color:'#a8a29e'}}>
            <li>📧 hello@hopelink.org</li>

            <li>📍 Boumerdes , ALGERIA </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm"
        style={{borderTop:'1px solid rgba(255,255,255,0.1)', color:'#78716c'}}>
        <p>© 2026 HopeLink. All rights reserved.</p>
        <p>Built with ❤️ for a better world</p>
      </div>
    </div>
  </footer>
)

export default Footer
