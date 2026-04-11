import React, { useState } from 'react'
import { Link } from 'react-router-dom'

/* ── Reusable section wrapper ─────────────────────────────── */
const Section = ({ id, children, bg = 'white', style = {} }) => (
  <section id={id} style={{background: bg, ...style}}>
    {children}
  </section>
)

const SectionHeader = ({ eyebrow, title, subtitle, light = false }) => (
  <div style={{textAlign:'center',marginBottom:'3.5rem'}}>
    {eyebrow && (
      <span style={{
        display:'inline-block',fontSize:'0.8rem',fontWeight:700,letterSpacing:'0.1em',
        textTransform:'uppercase',color: light ? 'rgba(255,255,255,0.7)' : '#f97316',marginBottom:'0.75rem'
      }}>{eyebrow}</span>
    )}
    <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.75rem,4vw,2.75rem)',fontWeight:700,color: light ? 'white' : '#1c1917',marginBottom:'1rem',lineHeight:1.2}}>
      {title}
    </h2>
    {subtitle && (
      <p style={{color: light ? 'rgba(255,255,255,0.8)' : '#78716c',fontSize:'1.1rem',lineHeight:1.7,maxWidth:'38rem',margin:'0 auto'}}>
        {subtitle}
      </p>
    )}
  </div>
)

/* ── Who we are ───────────────────────────────────────────── */
const WhoWeAre = () => (
  <Section id="who-we-are" bg="white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{paddingTop:'5rem',paddingBottom:'5rem'}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'4rem',alignItems:'center'}}>
        {/* Text */}
        <div>
          <span style={{display:'inline-block',fontSize:'0.8rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'#f97316',marginBottom:'0.75rem'}}>
            Who We Are
          </span>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:700,color:'#1c1917',marginBottom:'1.25rem',lineHeight:1.25}}>
            A Community Built on<br />Generosity & Trust
          </h2>
          <p style={{color:'#78716c',lineHeight:1.8,marginBottom:'1rem',fontSize:'1rem'}}>
            HopeLink is a non-profit digital platform founded in 2023 by a group of social entrepreneurs who witnessed firsthand the disconnect between willing donors and underfunded charities.
          </p>
          <p style={{color:'#78716c',lineHeight:1.8,marginBottom:'2rem',fontSize:'1rem'}}>
            We bridge that gap by providing a transparent, easy-to-use system where donations find their way to those who need them most — efficiently, safely, and with full accountability.
          </p>
          <div style={{display:'flex',gap:'2rem',flexWrap:'wrap'}}>
            {[['2023','Founded'],['50+','Cities'],['340+','Charities'],['12K+','Lives']].map(([v,l]) => (
              <div key={l}>
                <p style={{fontFamily:'Playfair Display,serif',fontSize:'1.75rem',fontWeight:700,color:'#f97316'}}>{v}</p>
                <p style={{fontSize:'0.8rem',color:'#78716c',fontWeight:500}}>{l}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Visual */}
        <div style={{position:'relative'}}>
          <div style={{borderRadius:'1.5rem',overflow:'hidden',aspectRatio:'4/3',boxShadow:'0 20px 60px rgba(0,0,0,0.12)'}}>
            <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=700&q=80" alt="Volunteers packing donations" style={{width:'100%',height:'100%',objectFit:'cover'}} />
          </div>
          {/* Floating badge */}
          <div style={{
            position:'absolute',bottom:'-1.5rem',left:'-1.5rem',background:'white',
            borderRadius:'1rem',padding:'1rem 1.25rem',boxShadow:'0 8px 30px rgba(0,0,0,0.12)',
            display:'flex',alignItems:'center',gap:'0.75rem'
          }}>
            <div style={{width:'2.5rem',height:'2.5rem',borderRadius:'0.625rem',background:'#fff7ed',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.25rem'}}>❤️</div>
            <div>
              <p style={{fontFamily:'Playfair Display,serif',fontWeight:700,fontSize:'1.1rem',color:'#1c1917'}}>2,400+</p>
              <p style={{fontSize:'0.75rem',color:'#78716c'}}>Donations completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
)

/* ── Our Mission ──────────────────────────────────────────── */
const OurMission = () => (
  <Section id="our-mission" bg="#fef9f0">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{paddingTop:'5rem',paddingBottom:'5rem'}}>
      <SectionHeader
        eyebrow="Our Mission"
        title="Making Giving Effortless & Impactful"
        subtitle="We exist to eliminate the friction between generosity and impact — so every donation reaches the right hands at the right time."
      />
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'1.5rem'}}>
        {[
          { icon:'🎯', title:'Transparency',   desc:'Every donation is tracked from post to claim. Donors see exactly who collected their items and when.' },
          { icon:'⚡', title:'Speed',          desc:'Our streamlined process gets donations from listing to collection in as little as 24 hours.' },
          { icon:'🔒', title:'Trust & Safety', desc:'All charities are verified before joining. Every transaction is logged and auditable.' },
          { icon:'🌍', title:'Accessibility',  desc:'Our platform works on any device, in any browser, making giving accessible to everyone.' },
          { icon:'📊', title:'Data-Driven',    desc:'We use real-time data to connect the right donations with the communities that need them most.' },
          { icon:'💚', title:'Zero Cost',      desc:'HopeLink is 100% free for donors and charities. We believe barriers to giving should not exist.' },
        ].map(card => (
          <div key={card.title} style={{background:'white',borderRadius:'1rem',padding:'1.75rem',boxShadow:'0 4px 20px rgba(0,0,0,0.06)',transition:'transform 0.2s,box-shadow 0.2s'}}
            onMouseOver={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.12)' }}
            onMouseOut={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.06)' }}
          >
            <div style={{fontSize:'2rem',marginBottom:'0.875rem'}}>{card.icon}</div>
            <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.1rem',fontWeight:700,color:'#1c1917',marginBottom:'0.5rem'}}>{card.title}</h3>
            <p style={{color:'#78716c',fontSize:'0.9rem',lineHeight:1.7}}>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
)

/* ── Our Story ────────────────────────────────────────────── */
const OurStory = () => (
  <Section id="our-story" bg="white">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" style={{paddingTop:'5rem',paddingBottom:'5rem'}}>
      <SectionHeader eyebrow="Our Story" title="From a Garage to a Movement" />
      <div style={{position:'relative',paddingLeft:'2rem'}}>
        {/* Vertical line */}
        <div style={{position:'absolute',left:'0.625rem',top:0,bottom:0,width:'2px',background:'linear-gradient(to bottom,#f97316,#fbbf24,#4ade80)'}} />
        {[
          { year:'2022', title:'The Problem We Saw',     color:'#f97316', desc:'Co-founders MAROUANE and LILIA noticed boxes of perfectly good goods being thrown away while local shelters struggled. They knew there had to be a better way.' },
          { year:'2023', title:'HopeLink is Born',       color:'#fb923c', desc:'Working out of a small apartment, they built the first version of HopeLink in three months. On launch day, 12 charities and 40 donors signed up within 24 hours.' },
          { year:'2024', title:'Growing the Movement',   color:'#fbbf24', desc:'Word spread fast. By mid-2024 HopeLink had reached 50 cities and facilitated over 1,000 donations. We onboarded our first full-time team of 8.' },
          { year:'2025', title:'National Recognition',   color:'#4ade80', desc:'HopeLink was recognized by the National Philanthropy Foundation as one of the top 10 most impactful civic tech platforms. 12,000+ lives impacted.' },
          { year:'2026', title:'Where We Are Today',     color:'#2d7a4f', desc:'With 340+ verified charities, 2,400+ completed donations, and a passionate community, we\'re just getting started. The best is yet to come.' },
        ].map((item, i) => (
          <div key={i} style={{position:'relative',marginBottom:'2.5rem',paddingLeft:'2rem'}}>
            {/* Dot */}
            <div style={{position:'absolute',left:'-2.125rem',top:'0.375rem',width:'1rem',height:'1rem',borderRadius:'50%',background:item.color,border:'3px solid white',boxShadow:'0 0 0 2px '+item.color}} />
            <div style={{display:'inline-block',background:item.color+'22',color:item.color,fontWeight:700,fontSize:'0.8rem',padding:'0.2rem 0.625rem',borderRadius:'9999px',marginBottom:'0.5rem'}}>
              {item.year}
            </div>
            <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.2rem',fontWeight:700,color:'#1c1917',marginBottom:'0.5rem'}}>{item.title}</h3>
            <p style={{color:'#78716c',lineHeight:1.7,fontSize:'0.95rem'}}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
)

/* ── What We Do ───────────────────────────────────────────── */
const WhatWeDo = () => (
  <Section id="what-we-do" style={{background:'linear-gradient(135deg,#f97316 0%,#ea6c10 60%,#c2570c 100%)',paddingTop:'5rem',paddingBottom:'5rem',position:'relative',overflow:'hidden'}}>
    <div style={{position:'absolute',top:'-4rem',right:'-4rem',width:'20rem',height:'20rem',borderRadius:'50%',background:'rgba(255,255,255,0.05)'}} />
    <div style={{position:'absolute',bottom:'-3rem',left:'5%',width:'14rem',height:'14rem',borderRadius:'50%',background:'rgba(255,255,255,0.05)'}} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{position:'relative',zIndex:1}}>
      <SectionHeader eyebrow="What We Do" light
        title="A Full Ecosystem for Giving"
        subtitle="HopeLink is more than a listing site — it's a complete donation management ecosystem designed for both donors and charities."
      />
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1.5rem'}}>
        {[
          {
            icon:'🎁', title:'For Donors',
            points:['Create detailed donation posts in minutes','Track which charities claimed your items','Manage all posts from one dashboard','Get notified when items are fully claimed'],
            bg:'rgba(255,255,255,0.15)'
          },
          {
            icon:'🏛️', title:'For Charities',
            points:['Browse donations filtered by type & location','Claim partial or full quantities','View donor contact for pickup coordination','Track claim history and statuses'],
            bg:'rgba(255,255,255,0.2)'
          },
          {
            icon:'⚙️', title:'For Admins',
            points:['Moderate all posts and claims on the platform','Verify and onboard new charity organizations','Access real-time analytics and reports','Manage user roles and permissions'],
            bg:'rgba(255,255,255,0.15)'
          },
        ].map(card => (
          <div key={card.title} style={{background:card.bg,backdropFilter:'blur(8px)',borderRadius:'1.25rem',padding:'2rem',border:'1px solid rgba(255,255,255,0.2)'}}>
            <div style={{fontSize:'2.5rem',marginBottom:'1rem'}}>{card.icon}</div>
            <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.25rem',fontWeight:700,color:'white',marginBottom:'1.25rem'}}>{card.title}</h3>
            <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:'0.625rem'}}>
              {card.points.map(p => (
                <li key={p} style={{display:'flex',alignItems:'flex-start',gap:'0.625rem',color:'rgba(255,255,255,0.85)',fontSize:'0.9rem',lineHeight:1.5}}>
                  <span style={{color:'#fbbf24',flexShrink:0,marginTop:'0.1rem'}}>✓</span> {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </Section>
)

/* ── Meet the Team ────────────────────────────────────────── */
const TEAM = [
  { name:'MAROUANE SAOUDI',    role:'Co-Founder & CEO',        emoji:'👨‍💻', bio:'Former NGO director with 10 years in humanitarian aid. Marouane drives our mission and strategy.',        color:'#fff7ed' },
  { name:'LILIA HARACHE',  role:'Co-Founder & CTO',        emoji:'👩‍💼', bio:'Full-stack engineer and open-source contributor. Built the entire HopeLink platform from the ground up.',color:'#eff6ff' },
  { name:'MEHDI DENBRI',    role:'Community Manager',        emoji:'👨‍💻', bio:'Connects donors and charities daily. Nadia is the heart of the HopeLink community.',                   color:'#fff7ed' },
  { name:'YACINE DJOUAHER',     role:'Data & Analytics',        emoji:'👨‍💻', bio:'Uses data science to match donations with the highest-impact charities in real time.',                  color:'#f0f9ff' },
]

const MeetTheTeam = () => (
  <Section id="meet-the-team" bg="#fef9f0">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{paddingTop:'5rem',paddingBottom:'5rem'}}>
      <SectionHeader eyebrow="Meet the Team" title="The People Behind HopeLink" subtitle="A small, passionate team united by one belief: that technology can make generosity more powerful." />
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1.25rem'}}>
        {TEAM.map(member => (
          <div key={member.name} style={{background:'white',borderRadius:'1.25rem',padding:'1.75rem',boxShadow:'0 4px 20px rgba(0,0,0,0.06)',transition:'transform 0.2s,box-shadow 0.2s'}}
            onMouseOver={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.12)' }}
            onMouseOut={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.06)' }}
          >
            <div style={{width:'4.5rem',height:'4.5rem',borderRadius:'1.25rem',background:member.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2rem',marginBottom:'1rem'}}>
              {member.emoji}
            </div>
            <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.1rem',fontWeight:700,color:'#1c1917',marginBottom:'0.25rem'}}>{member.name}</h3>
            <p style={{fontSize:'0.8rem',fontWeight:600,color:'#f97316',marginBottom:'0.75rem'}}>{member.role}</p>
            <p style={{fontSize:'0.875rem',color:'#78716c',lineHeight:1.6}}>{member.bio}</p>
          </div>
        ))}
      </div>
      <div style={{textAlign:'center',marginTop:'3rem'}}>
        <p style={{color:'#78716c',marginBottom:'1rem',fontSize:'0.95rem'}}>Want to join our mission?</p>
        <a href="mailto:careers@hopelink.org" className="btn-outline" style={{display:'inline-flex'}}>
          View Open Roles →
        </a>
      </div>
    </div>
  </Section>
)

/* ── Contact Us ───────────────────────────────────────────── */
const ContactUs = () => {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [sent, setSent] = useState(false)
  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    // In real app, POST to contact API
    setSent(true)
  }

  return (
    <Section id="contact-us" bg="white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{paddingTop:'5rem',paddingBottom:'5rem'}}>
        <SectionHeader eyebrow="Contact Us" title="Get in Touch" subtitle="Have a question, suggestion, or want to partner with us? We'd love to hear from you." />
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'3rem',alignItems:'start'}}>

          {/* Contact info */}
          <div>
            <div style={{display:'flex',flexDirection:'column',gap:'1.25rem',marginBottom:'2.5rem'}}>
              {[
                { icon:'📧', label:'Email Us',    value:'hello@hopelink.org',    href:'mailto:hello@hopelink.org' },
                { icon:'📍', label:'Visit Us',    value:'Boumerdes , ALGERIA', href:'#' },
                { icon:'⏰', label:'Office Hours', value:'SUN – THU , 8am – 5pm', href:null },
              ].map(item => (
                <div key={item.label} style={{display:'flex',alignItems:'flex-start',gap:'1rem',padding:'1.25rem',background:'#fafaf9',borderRadius:'0.875rem'}}>
                  <div style={{width:'2.75rem',height:'2.75rem',borderRadius:'0.625rem',background:'#fff7ed',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.25rem',flexShrink:0}}>{item.icon}</div>
                  <div>
                    <p style={{fontSize:'0.8rem',fontWeight:600,color:'#78716c',marginBottom:'0.2rem'}}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} style={{color:'#1c1917',fontWeight:500,textDecoration:'none',fontSize:'0.95rem'}}>{item.value}</a>
                    ) : (
                      <p style={{color:'#1c1917',fontWeight:500,fontSize:'0.95rem'}}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <p style={{fontSize:'0.8rem',fontWeight:600,color:'#78716c',marginBottom:'0.75rem',textTransform:'uppercase',letterSpacing:'0.05em'}}>Follow Us</p>
              <div style={{display:'flex',gap:'0.75rem'}}>
                {[['𝕏','Twitter'],['f','Facebook'],['in','LinkedIn'],['📷','Instagram']].map(([icon,label]) => (
                  <a key={label} href="#" title={label} style={{width:'2.5rem',height:'2.5rem',borderRadius:'0.625rem',background:'#f5f5f4',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none',fontSize:'0.9rem',fontWeight:700,color:'#78716c',transition:'all 0.2s'}}
                    onMouseOver={e => { e.currentTarget.style.background='#f97316'; e.currentTarget.style.color='white' }}
                    onMouseOut={e => { e.currentTarget.style.background='#f5f5f4'; e.currentTarget.style.color='#78716c' }}
                  >{icon}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div style={{background:'#fafaf9',borderRadius:'1.25rem',padding:'2rem'}}>
            {sent ? (
              <div style={{textAlign:'center',padding:'2rem'}}>
                <div style={{fontSize:'3rem',marginBottom:'1rem'}}>✅</div>
                <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.25rem',fontWeight:700,color:'#1c1917',marginBottom:'0.5rem'}}>Message Sent!</h3>
                <p style={{color:'#78716c',fontSize:'0.95rem'}}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name:'',email:'',subject:'',message:'' }) }}
                  style={{marginTop:'1.5rem',padding:'0.625rem 1.5rem',borderRadius:'9999px',border:'2px solid #f97316',background:'transparent',color:'#f97316',fontWeight:600,cursor:'pointer',fontSize:'0.875rem'}}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                  <div>
                    <label style={{display:'block',fontSize:'0.8rem',fontWeight:600,color:'#1c1917',marginBottom:'0.375rem'}}>Name *</label>
                    <input required value={form.name} onChange={set('name')} placeholder="Full Name"
                      className="input-field" style={{width:'100%'}} />
                  </div>
                  <div>
                    <label style={{display:'block',fontSize:'0.8rem',fontWeight:600,color:'#1c1917',marginBottom:'0.375rem'}}>Email *</label>
                    <input required type="email" value={form.email} onChange={set('email')} placeholder="Youremail@gmail.com"
                      className="input-field" style={{width:'100%'}} />
                  </div>
                </div>
                <div>
                  <label style={{display:'block',fontSize:'0.8rem',fontWeight:600,color:'#1c1917',marginBottom:'0.375rem'}}>Subject *</label>
                  <select required value={form.subject} onChange={set('subject')} className="input-field" style={{width:'100%'}}>
                    <option value="">Select a topic…</option>
                    <option value="general">General Inquiry</option>
                    <option value="charity">Charity Registration</option>
                    <option value="donation">Donation Question</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="media">Media & Press</option>
                  </select>
                </div>
                <div>
                  <label style={{display:'block',fontSize:'0.8rem',fontWeight:600,color:'#1c1917',marginBottom:'0.375rem'}}>Message *</label>
                  <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="Tell us how we can help…"
                    className="input-field" style={{width:'100%',resize:'none'}} />
                </div>
                <button type="submit" className="btn-primary" style={{width:'100%',justifyContent:'center'}}>
                  Send Message 📨
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ── Page nav (sticky sidebar dots) ─────────────────────── */
const SECTIONS = [
  { id:'who-we-are',    label:'Who We Are' },
  { id:'our-mission',   label:'Our Mission' },
  { id:'our-story',     label:'Our Story' },
  { id:'what-we-do',    label:'What We Do' },
  { id:'meet-the-team', label:'Meet the Team' },
  { id:'contact-us',    label:'Contact Us' },
]

/* ── Main About Page ──────────────────────────────────────── */
const About = () => {
  const [active, setActive] = useState('who-we-are')

  // Track scroll to highlight nav dot
  React.useEffect(() => {
    const onScroll = () => {
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom > 120) { setActive(s.id); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' })
  }

  return (
    <div style={{paddingTop:'4rem'}}>
      {/* ── Hero ── */}
      <div style={{
        background:'linear-gradient(135deg,#1c1917 0%,#292524 60%,#1c1917 100%)',
        padding:'6rem 1rem',textAlign:'center',position:'relative',overflow:'hidden'
      }}>
        <div style={{position:'absolute',top:'-5rem',right:'-5rem',width:'24rem',height:'24rem',borderRadius:'50%',background:'rgba(249,115,22,0.08)'}} />
        <div style={{position:'absolute',bottom:'-3rem',left:'5%',width:'16rem',height:'16rem',borderRadius:'50%',background:'rgba(249,115,22,0.06)'}} />
        <div style={{position:'relative',zIndex:1,maxWidth:'48rem',margin:'0 auto'}}>
          <span style={{display:'inline-block',fontSize:'0.8rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'#fb923c',marginBottom:'1rem'}}>
            About HopeLink
          </span>
          <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(2.5rem,6vw,4rem)',fontWeight:700,color:'white',lineHeight:1.15,marginBottom:'1.5rem'}}>
            We Connect Hearts,<br /><span style={{color:'#f97316'}}>One Donation at a Time</span>
          </h1>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:'1.2rem',lineHeight:1.7,marginBottom:'2.5rem'}}>
            HopeLink is a non-profit platform that makes donating simple, transparent, and impactful — turning everyday generosity into life-changing support.
          </p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <button onClick={() => scrollTo('our-mission')} className="btn-primary">Discover Our Mission</button>
            <button onClick={() => scrollTo('contact-us')} className="btn-outline" style={{borderColor:'rgba(255,255,255,0.3)',color:'white'}}>Contact Us</button>
          </div>
        </div>
        {/* Wave */}
        <div style={{position:'absolute',bottom:0,left:0,right:0}}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Sticky side nav dots (desktop) */}
      <div style={{position:'fixed',right:'1.5rem',top:'50%',transform:'translateY(-50%)',zIndex:30,display:'flex',flexDirection:'column',gap:'0.75rem'}} className="hidden lg:flex">
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => scrollTo(s.id)} title={s.label}
            style={{
              width: active === s.id ? '0.875rem' : '0.5rem',
              height: active === s.id ? '0.875rem' : '0.5rem',
              borderRadius:'50%',border:'2px solid #f97316',
              background: active === s.id ? '#f97316' : 'transparent',
              cursor:'pointer',transition:'all 0.25s',padding:0
            }}
          />
        ))}
      </div>

      {/* Quick-jump nav (mobile) */}
      <div style={{background:'white',borderBottom:'1px solid #f5f5f4',position:'sticky',top:'4rem',zIndex:20,overflowX:'auto'}}>
        <div style={{display:'flex',padding:'0 1rem',maxWidth:'100%'}}>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)}
              style={{
                padding:'0.875rem 1rem',border:'none',background:'none',cursor:'pointer',whiteSpace:'nowrap',
                fontSize:'0.8rem',fontWeight:600,transition:'all 0.2s',
                color: active === s.id ? '#f97316' : '#78716c',
                borderBottom: active === s.id ? '2px solid #f97316' : '2px solid transparent'
              }}
            >{s.label}</button>
          ))}
        </div>
      </div>

      {/* ── Page sections ── */}
      <WhoWeAre />
      <OurMission />
      <OurStory />
      <WhatWeDo />
      <MeetTheTeam />
      <ContactUs />

      {/* ── Bottom CTA ── */}
      <section style={{background:'linear-gradient(to right,#2d7a4f,#0d9488)',padding:'5rem 1rem',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}} />
        <div style={{position:'relative',zIndex:1,maxWidth:'40rem',margin:'0 auto'}}>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.75rem,4vw,2.75rem)',fontWeight:700,color:'white',marginBottom:'1rem'}}>
            Ready to Make a Difference?
          </h2>
          <p style={{color:'rgba(255,255,255,0.8)',fontSize:'1.1rem',marginBottom:'2rem'}}>
            Join thousands of donors and charities already creating change through HopeLink.
          </p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <Link to="/register" className="btn-primary" style={{background:'white',color:'#2d7a4f'}}>Get Started Free</Link>
            <Link to="/posts" className="btn-outline" style={{borderColor:'rgba(255,255,255,0.4)',color:'white'}}>Browse Donations</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
