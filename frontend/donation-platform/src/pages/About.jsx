import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Eye, Zap, ShieldCheck, Globe, BarChart2, Heart, Gift, Building2, Settings, CheckCircle2, User, Code2, Users, TrendingUp, Mail, Phone, MapPin, Clock } from 'lucide-react'

// ─── Shared helpers ───────────────────────────────────────────────────────────
const W = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
const pad = { paddingTop:'5rem', paddingBottom:'5rem' }
const serif = { fontFamily:'Playfair Display,serif' }
const orange = '#f97316'
const muted = '#78716c'

const FV = ({ children, ...p }) => <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.4}} {...p}>{children}</motion.div>

const Header = ({ eyebrow, title, subtitle, light }) => (
  <div style={{textAlign:'center',marginBottom:'3.5rem'}}>
    {eyebrow && <span style={{display:'block',fontSize:'0.8rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:light?'rgba(255,255,255,0.7)':orange,marginBottom:'0.75rem'}}>{eyebrow}</span>}
    <h2 style={{...serif,fontSize:'clamp(1.75rem,4vw,2.75rem)',fontWeight:700,color:light?'white':'#1c1917',marginBottom:'1rem',lineHeight:1.2}}>{title}</h2>
    {subtitle && <p style={{color:light?'rgba(255,255,255,0.8)':muted,fontSize:'1.1rem',lineHeight:1.7,maxWidth:'38rem',margin:'0 auto'}}>{subtitle}</p>}
  </div>
)

// ─── Sections ─────────────────────────────────────────────────────────────────
const WhoWeAre = () => (
  <section id="who-we-are" style={{background:'white'}}>
    <div className={W} style={pad}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'4rem',alignItems:'center'}}>
        <div>
          <span style={{fontSize:'0.8rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:orange}}>Who We Are</span>
          <FV style={{...serif,fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:700,color:'#1c1917',margin:'0.75rem 0 1.25rem',lineHeight:1.25}}>
            A Community Built on<br />Generosity & Trust
          </FV>
          <p style={{color:muted,lineHeight:1.8,marginBottom:'1rem'}}>HopeLink is a non-profit digital platform founded in 2023 by social entrepreneurs who witnessed firsthand the disconnect between willing donors and underfunded charities.</p>
          <p style={{color:muted,lineHeight:1.8,marginBottom:'2rem'}}>We bridge that gap by providing a transparent, easy-to-use system where donations reach those who need them most — efficiently, safely, and with full accountability.</p>
          <div style={{display:'flex',gap:'2rem',flexWrap:'wrap'}}>
            {[['2023','Founded'],['50+','Cities'],['340+','Charities'],['12K+','Lives']].map(([v,l]) => (
              <div key={l}>
                <p style={{...serif,fontSize:'1.75rem',fontWeight:700,color:orange}}>{v}</p>
                <p style={{fontSize:'0.8rem',color:muted,fontWeight:500}}>{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{position:'relative'}}>
          <div style={{borderRadius:'1.5rem',overflow:'hidden',aspectRatio:'4/3',boxShadow:'0 20px 60px rgba(0,0,0,0.12)'}}>
            <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=700&q=80" alt="Volunteers" style={{width:'100%',height:'100%',objectFit:'cover'}} />
          </div>
          <div style={{position:'absolute',bottom:'-1.5rem',left:'-1.5rem',background:'white',borderRadius:'1rem',padding:'1rem 1.25rem',boxShadow:'0 8px 30px rgba(0,0,0,0.12)',display:'flex',alignItems:'center',gap:'0.75rem'}}>
            <div style={{width:'2.5rem',height:'2.5rem',borderRadius:'0.625rem',background:'#fff7ed',display:'flex',alignItems:'center',justifyContent:'center'}}><Heart size={18} color={orange}/></div>
            <div><p style={{...serif,fontWeight:700,fontSize:'1.1rem',color:'#1c1917'}}>2,400+</p><p style={{fontSize:'0.75rem',color:muted}}>Donations completed</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const MISSION_CARDS = [
  { icon:<Eye size={22} color={orange}/>,         title:'Transparency',   desc:'Every donation tracked from post to claim. Donors see exactly who collected their items.' },
  { icon:<Zap size={22} color={orange}/>,         title:'Speed',          desc:'Streamlined process gets donations from listing to collection in as little as 24 hours.' },
  { icon:<ShieldCheck size={22} color={orange}/>, title:'Trust & Safety', desc:'All charities are verified before joining. Every transaction is logged and auditable.' },
  { icon:<Globe size={22} color={orange}/>,       title:'Accessibility',  desc:'Our platform works on any device, making giving accessible to everyone.' },
  { icon:<BarChart2 size={22} color={orange}/>,   title:'Data-Driven',    desc:'Real-time data connects the right donations with the communities that need them most.' },
  { icon:<Heart size={22} color={orange}/>,       title:'Zero Cost',      desc:'100% free for donors and charities. Barriers to giving should not exist.' },
]

const OurMission = () => (
  <section id="our-mission" style={{background:'#fef9f0'}}>
    <div className={W} style={pad}>
      <Header eyebrow="Our Mission" title="Making Giving Effortless & Impactful" subtitle="We exist to eliminate the friction between generosity and impact — so every donation reaches the right hands at the right time." />
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'1.5rem'}}>
        {MISSION_CARDS.map((c,i) => (
          <motion.div key={c.title} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.4,delay:i*0.08}} whileHover={{y:-6,boxShadow:'0 16px 40px rgba(0,0,0,0.12)'}} style={{background:'white',borderRadius:'1rem',padding:'1.75rem',boxShadow:'0 4px 20px rgba(0,0,0,0.06)'}}>
            <div style={{width:'2.75rem',height:'2.75rem',borderRadius:'0.75rem',background:'#fff7ed',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'1rem'}}>{c.icon}</div>
            <h3 style={{...serif,fontSize:'1.1rem',fontWeight:700,color:'#1c1917',marginBottom:'0.5rem'}}>{c.title}</h3>
            <p style={{color:muted,fontSize:'0.9rem',lineHeight:1.7}}>{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const STORY = [
  { year:'2022', color:'#f97316', title:'The Problem We Saw',   desc:'Co-founders Marouane and Lilia noticed perfectly good goods being thrown away while local shelters struggled.' },
  { year:'2023', color:'#fb923c', title:'HopeLink is Born',     desc:'Built in 3 months from a small apartment. On launch day, 12 charities and 40 donors signed up within 24 hours.' },
  { year:'2024', color:'#fbbf24', title:'Growing the Movement', desc:'50 cities, 1,000+ donations, first full-time team of 8.' },
  { year:'2025', color:'#4ade80', title:'National Recognition', desc:'Top 10 most impactful civic tech platforms by the National Philanthropy Foundation. 12,000+ lives impacted.' },
  { year:'2026', color:'#2d7a4f', title:'Where We Are Today',   desc:"340+ verified charities, 2,400+ completed donations, and a passionate community. The best is yet to come." },
]

const OurStory = () => (
  <section id="our-story" style={{background:'white'}}>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" style={pad}>
      <Header eyebrow="Our Story" title="From a Garage to a Movement" />
      <div style={{position:'relative',paddingLeft:'2rem'}}>
        <div style={{position:'absolute',left:'0.625rem',top:0,bottom:0,width:'2px',background:'linear-gradient(to bottom,#f97316,#fbbf24,#4ade80)'}} />
        {STORY.map((s,i) => (
          <motion.div key={i} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.4,delay:i*0.1}} style={{position:'relative',marginBottom:'2.5rem',paddingLeft:'2rem'}}>
            <div style={{position:'absolute',left:'-2.125rem',top:'0.375rem',width:'1rem',height:'1rem',borderRadius:'50%',background:s.color,border:'3px solid white',boxShadow:`0 0 0 2px ${s.color}`}} />
            <span style={{display:'inline-block',background:s.color+'22',color:s.color,fontWeight:700,fontSize:'0.8rem',padding:'0.2rem 0.625rem',borderRadius:'9999px',marginBottom:'0.5rem'}}>{s.year}</span>
            <h3 style={{...serif,fontSize:'1.2rem',fontWeight:700,color:'#1c1917',marginBottom:'0.5rem'}}>{s.title}</h3>
            <p style={{color:muted,lineHeight:1.7,fontSize:'0.95rem'}}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const WHAT_CARDS = [
  { icon:<Gift size={30} color="#ea580c"/>, title:'For Donors', points:['Create detailed donation posts in minutes','Track which charities claimed your items','Manage all posts from one dashboard','Get notified when items are fully claimed'] },
  { icon:<Building2 size={30} color="#ea580c"/>, title:'For Charities', points:['Browse donations filtered by type & location','Claim partial or full quantities','View donor contact for pickup coordination','Track claim history and statuses'] },
  { icon:<Settings size={30} color="#ea580c"/>, title:'For Admins', points:['Moderate all posts and claims on the platform','Verify and onboard new charity organizations','Access real-time analytics and reports','Manage user roles and permissions'] },
]

const WhatWeDo = () => (
  <section id="what-we-do" style={{background:'linear-gradient(135deg,#fb923c 0%,#fdba74 45%,#fed7aa 70%,#fb923c 100%)',paddingTop:'5rem',paddingBottom:'5rem',position:'relative',overflow:'hidden'}}>
    {[{top:'-8rem',right:'-8rem',w:'30rem',d:6,op:[0.22,0.38]},{bottom:'-5rem',left:'-5rem',w:'24rem',d:8,op:[0.15,0.28],delay:2}].map((b,i) => (
      <motion.div key={i} animate={{scale:[1,1.2,1],opacity:[b.op[0],b.op[1],b.op[0]]}} transition={{duration:b.d,repeat:Infinity,ease:'easeInOut',delay:b.delay||0}}
        style={{position:'absolute',...b,width:b.w,height:b.w,borderRadius:'50%',background:'rgba(255,255,255,0.25)',pointerEvents:'none'}} />
    ))}
    <div style={{position:'absolute',inset:0,opacity:0.1,backgroundImage:`url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1.5' fill='%23fff'/%3E%3C/svg%3E")`,pointerEvents:'none'}} />
    <div className={W} style={{position:'relative',zIndex:1}}>
      <div style={{textAlign:'center',marginBottom:'3.5rem'}}>
        <motion.span initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{display:'block',fontSize:'0.8rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.9)',marginBottom:'0.75rem'}}>What We Do</motion.span>
        <div>{"A Full Ecosystem for Giving".split(' ').map((w,i) => (
          <motion.span key={i} initial={{opacity:0,y:45}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55,delay:i*0.11,ease:[0.22,1,0.36,1]}}
            style={{display:'inline-block',...serif,fontSize:'clamp(1.75rem,4vw,2.75rem)',fontWeight:700,color:'white',lineHeight:1.2,marginRight:'0.4em'}}>{w}</motion.span>
        ))}</div>
        <motion.div initial={{scaleX:0}} whileInView={{scaleX:1}} viewport={{once:true}} transition={{duration:0.7,delay:0.65}} style={{height:'3px',width:'6rem',background:'rgba(255,255,255,0.65)',borderRadius:'9999px',margin:'1rem auto 1.25rem',transformOrigin:'left'}} />
        <motion.p initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.75}} style={{color:'rgba(255,255,255,0.88)',fontSize:'1.1rem',lineHeight:1.7,maxWidth:'38rem',margin:'0 auto'}}>
          HopeLink is more than a listing site — it's a complete donation management ecosystem designed for both donors and charities.
        </motion.p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1.5rem'}}>
        {WHAT_CARDS.map((c,i) => (
          <motion.div key={c.title} initial={{opacity:0,y:50,scale:0.95}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true}} transition={{duration:0.55,delay:i*0.15,ease:[0.22,1,0.36,1]}} whileHover={{y:-10,scale:1.02,boxShadow:'0 24px 50px rgba(154,52,18,0.22)',borderColor:'rgba(255,255,255,0.75)'}}
            style={{background:'rgba(255,255,255,0.22)',backdropFilter:'blur(12px)',borderRadius:'1.25rem',padding:'2rem',border:'1px solid rgba(255,255,255,0.45)',transition:'all 0.35s'}}>
            <motion.div whileHover={{rotate:[0,-8,8,-4,0],scale:1.1}} transition={{duration:0.5}} style={{width:'3.5rem',height:'3.5rem',borderRadius:'1rem',background:'rgba(255,255,255,0.42)',border:'1px solid rgba(255,255,255,0.65)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'1.25rem'}}>{c.icon}</motion.div>
            <div style={{display:'flex',alignItems:'center',gap:'0.625rem',marginBottom:'1.25rem'}}>
              <div style={{width:'3px',height:'1.4rem',borderRadius:'9999px',background:'white'}} />
              <h3 style={{...serif,fontSize:'1.25rem',fontWeight:700,color:'white'}}>{c.title}</h3>
            </div>
            <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:'0.75rem'}}>
              {c.points.map((p,j) => (
                <motion.li key={p} initial={{opacity:0,x:-12}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.3,delay:i*0.15+j*0.07+0.2}} style={{display:'flex',alignItems:'flex-start',gap:'0.625rem',fontSize:'0.9rem',lineHeight:1.5}}>
                  <CheckCircle2 size={15} color="white" style={{flexShrink:0,marginTop:'0.15rem',opacity:0.9}} />
                  <span style={{color:'rgba(255,255,255,0.88)'}}>{p}</span>
                </motion.li>
              ))}
            </ul>
            <motion.div initial={{scaleX:0}} whileInView={{scaleX:1}} viewport={{once:true}} transition={{duration:0.6,delay:i*0.15+0.4}} style={{marginTop:'1.75rem',height:'2px',borderRadius:'9999px',background:'linear-gradient(to right,rgba(255,255,255,0.7),transparent)',transformOrigin:'left'}} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const TEAM = [
  { name:'MAROUANE SAOUDI', role:'Co-Founder & CEO',  icon:<User size={24} color={orange}/>,        bg:'rgba(249,115,22,0.1)',  bio:'Former NGO director with 10 years in humanitarian aid. Drives our mission and strategy.' },
  { name:'LILIA HARACHE',   role:'Co-Founder & CTO',  icon:<Code2 size={24} color="#3b82f6"/>,      bg:'rgba(59,130,246,0.1)',  bio:'Full-stack engineer and open-source contributor. Built the entire HopeLink platform.' },
  { name:'MEHDI DENBRI',    role:'Community Manager', icon:<Users size={24} color="#10b981"/>,      bg:'rgba(16,185,129,0.1)',  bio:'Connects donors and charities daily. Mehdi is the heart of the HopeLink community.' },
  { name:'YACINE DJOUAHER', role:'Data & Analytics',  icon:<TrendingUp size={24} color="#8b5cf6"/>, bg:'rgba(139,92,246,0.1)',  bio:'Uses data science to match donations with the highest-impact charities in real time.' },
]

const MeetTheTeam = () => (
  <section id="meet-the-team" style={{background:'#fef9f0'}}>
    <div className={W} style={pad}>
      <Header eyebrow="Meet the Team" title="The People Behind HopeLink" subtitle="A small, passionate team united by one belief: that technology can make generosity more powerful." />
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1.25rem'}}>
        {TEAM.map((m,i) => (
          <motion.div key={m.name} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.4,delay:i*0.1}} whileHover={{y:-6,boxShadow:'0 16px 40px rgba(0,0,0,0.12)'}} style={{background:'white',borderRadius:'1.25rem',padding:'1.75rem',boxShadow:'0 4px 20px rgba(0,0,0,0.06)'}}>
            <div style={{width:'3.5rem',height:'3.5rem',borderRadius:'1rem',background:m.bg,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'1rem'}}>{m.icon}</div>
            <h3 style={{...serif,fontSize:'1.1rem',fontWeight:700,color:'#1c1917',marginBottom:'0.25rem'}}>{m.name}</h3>
            <p style={{fontSize:'0.8rem',fontWeight:600,color:orange,marginBottom:'0.75rem'}}>{m.role}</p>
            <p style={{fontSize:'0.875rem',color:muted,lineHeight:1.6}}>{m.bio}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const ContactUs = () => {
  const [form, setForm] = useState({ name:'',email:'',subject:'',message:'' })
  const [sent, setSent] = useState(false)
  const set = f => e => setForm(p=>({...p,[f]:e.target.value}))

  const INFO = [
    { icon:<Mail size={18} color={orange}/>,   label:'Email Us',     value:'contact@hopelink.org',   href:'mailto:contact@hopelink.org' },
    { icon:<Phone size={18} color={orange}/>,  label:'Call Us',      value:'+213 (0) 555 000 123',   href:'tel:+2130555000123' },
    { icon:<MapPin size={18} color={orange}/>, label:'Visit Us',     value:'Algiers, Algeria',        href:'#' },
    { icon:<Clock size={18} color={orange}/>,  label:'Office Hours', value:'Dim – Jeu, 9h – 17h',    href:null },
  ]

  return (
    <section id="contact-us" style={{background:'white'}}>
      <div className={W} style={pad}>
        <Header eyebrow="Contact Us" title="Get in Touch" subtitle="Have a question, suggestion, or want to partner with us? We'd love to hear from you." />
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'3rem',alignItems:'start'}}>
          <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
            {INFO.map(item => (
              <motion.div key={item.label} whileHover={{x:4}} style={{display:'flex',alignItems:'center',gap:'1rem',padding:'1.25rem',background:'#fafaf9',borderRadius:'0.875rem'}}>
                <div style={{width:'2.5rem',height:'2.5rem',borderRadius:'0.625rem',background:'#fff7ed',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{item.icon}</div>
                <div>
                  <p style={{fontSize:'0.75rem',fontWeight:600,color:muted,marginBottom:'0.15rem'}}>{item.label}</p>
                  {item.href ? <a href={item.href} style={{color:'#1c1917',fontWeight:500,textDecoration:'none',fontSize:'0.95rem'}}>{item.value}</a> : <p style={{color:'#1c1917',fontWeight:500,fontSize:'0.95rem'}}>{item.value}</p>}
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{background:'#fafaf9',borderRadius:'1.25rem',padding:'2rem'}}>
            {sent ? (
              <div style={{textAlign:'center',padding:'2rem'}}>
                <div style={{width:'4rem',height:'4rem',borderRadius:'50%',background:'#dcfce7',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1rem'}}><CheckCircle2 size={32} color="#16a34a"/></div>
                <h3 style={{...serif,fontSize:'1.25rem',fontWeight:700,color:'#1c1917',marginBottom:'0.5rem'}}>Message Sent!</h3>
                <p style={{color:muted,fontSize:'0.95rem'}}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={()=>{setSent(false);setForm({name:'',email:'',subject:'',message:''})}} style={{marginTop:'1.5rem',padding:'0.625rem 1.5rem',borderRadius:'9999px',border:`2px solid ${orange}`,background:'transparent',color:orange,fontWeight:600,cursor:'pointer',fontSize:'0.875rem'}}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={e=>{e.preventDefault();setSent(true)}} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                  {[['name','Name *','Your Name','text'],['email','Email *','Your Email','email']].map(([f,l,ph,t]) => (
                    <div key={f}><label style={{display:'block',fontSize:'0.8rem',fontWeight:600,color:'#1c1917',marginBottom:'0.375rem'}}>{l}</label><input required type={t} value={form[f]} onChange={set(f)} placeholder={ph} className="input-field" style={{width:'100%'}}/></div>
                  ))}
                </div>
                <div>
                  <label style={{display:'block',fontSize:'0.8rem',fontWeight:600,color:'#1c1917',marginBottom:'0.375rem'}}>Subject *</label>
                  <select required value={form.subject} onChange={set('subject')} className="input-field" style={{width:'100%'}}>
                    <option value="">Select a topic…</option>
                    {['General Inquiry','Charity Registration','Donation Question','Technical Support','Partnership','Media & Press'].map(o=><option key={o} value={o.toLowerCase().replace(/ /g,'-')}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{display:'block',fontSize:'0.8rem',fontWeight:600,color:'#1c1917',marginBottom:'0.375rem'}}>Message *</label>
                  <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="Tell us how we can help…" className="input-field" style={{width:'100%',resize:'none'}}/>
                </div>
                <button type="submit" className="btn-primary" style={{width:'100%',justifyContent:'center',display:'flex',alignItems:'center',gap:'0.5rem'}}>Send Message <Mail size={16}/></button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Nav config ───────────────────────────────────────────────────────────────
const SECTIONS = [
  {id:'who-we-are',label:'Who We Are'},{id:'our-mission',label:'Our Mission'},
  {id:'our-story',label:'Our Story'},{id:'what-we-do',label:'What We Do'},
  {id:'meet-the-team',label:'Meet the Team'},{id:'contact-us',label:'Contact Us'},
]

// ─── Page ─────────────────────────────────────────────────────────────────────
const About = () => {
  const [active, setActive] = useState('who-we-are')
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'})

  React.useEffect(() => {
    const fn = () => {
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= 120 && r.bottom > 120) { setActive(s.id); break }
      }
    }
    window.addEventListener('scroll', fn, {passive:true})
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div style={{paddingTop:'4rem'}}>
      {/* Hero */}
      <div style={{background:'linear-gradient(135deg,#1c1917 0%,#292524 60%,#1c1917 100%)',padding:'6rem 1rem',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-5rem',right:'-5rem',width:'24rem',height:'24rem',borderRadius:'50%',background:'rgba(249,115,22,0.08)'}} />
        <div style={{position:'absolute',bottom:'-3rem',left:'5%',width:'16rem',height:'16rem',borderRadius:'50%',background:'rgba(249,115,22,0.06)'}} />
        <div style={{position:'relative',zIndex:1,maxWidth:'48rem',margin:'0 auto'}}>
          <motion.span initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.4}} style={{display:'inline-block',fontSize:'0.8rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'#fb923c',marginBottom:'1rem'}}>About HopeLink</motion.span>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.1}} style={{...serif,fontSize:'clamp(2.5rem,6vw,4rem)',fontWeight:700,color:'white',lineHeight:1.15,marginBottom:'1.5rem'}}>
            We Connect Hearts,<br /><span style={{color:orange}}>One Donation at a Time</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.25}} style={{color:'rgba(255,255,255,0.7)',fontSize:'1.2rem',lineHeight:1.7,marginBottom:'2.5rem'}}>
            HopeLink is a non-profit platform that makes donating simple, transparent, and impactful — turning everyday generosity into life-changing support.
          </motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.4}} style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <button onClick={()=>scrollTo('our-mission')} className="btn-primary">Discover Our Mission</button>
            <button onClick={()=>scrollTo('contact-us')} className="btn-outline" style={{borderColor:'rgba(255,255,255,0.3)',color:'white'}}>Contact Us</button>
          </motion.div>
        </div>
        <div style={{position:'absolute',bottom:0,left:0,right:0}}>
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white"/></svg>
        </div>
      </div>

      {/* Side dots */}
      <div style={{position:'fixed',right:'1.5rem',top:'50%',transform:'translateY(-50%)',zIndex:30,display:'flex',flexDirection:'column',gap:'0.75rem'}} className="hidden lg:flex">
        {SECTIONS.map(s => (
          <button key={s.id} onClick={()=>scrollTo(s.id)} title={s.label} style={{width:active===s.id?'0.875rem':'0.5rem',height:active===s.id?'0.875rem':'0.5rem',borderRadius:'50%',border:`2px solid ${orange}`,background:active===s.id?orange:'transparent',cursor:'pointer',transition:'all 0.25s',padding:0}} />
        ))}
      </div>

      {/* Sticky tabs */}
      <div style={{background:'white',borderBottom:'1px solid #f5f5f4',position:'sticky',top:'4rem',zIndex:20,overflowX:'auto'}}>
        <div style={{display:'flex',padding:'0 1rem'}}>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={()=>scrollTo(s.id)} style={{padding:'0.875rem 1rem',border:'none',background:'none',cursor:'pointer',whiteSpace:'nowrap',fontSize:'0.8rem',fontWeight:600,transition:'all 0.2s',color:active===s.id?orange:muted,borderBottom:active===s.id?`2px solid ${orange}`:'2px solid transparent'}}>{s.label}</button>
          ))}
        </div>
      </div>

      <WhoWeAre />
      <OurMission />
      <OurStory />
      <WhatWeDo />
      <MeetTheTeam />
      <ContactUs />

      {/* CTA */}
      <section style={{position:'relative',overflow:'hidden',minHeight:'420px',display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:"url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1400&q=80')",backgroundSize:'cover',backgroundPosition:'center'}} />
        <div style={{position:'absolute',inset:0,background:'rgba(15,15,15,0.72)'}} />
        <div style={{position:'relative',zIndex:1,maxWidth:'42rem',margin:'0 auto',padding:'5rem 1.5rem'}}>
          <motion.span initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{display:'block',fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',color:'#fb923c',marginBottom:'1rem'}}>Join the Movement</motion.span>
          <motion.h2 initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}} style={{...serif,fontSize:'clamp(2rem,5vw,3.25rem)',fontWeight:700,lineHeight:1.15,marginBottom:'1.25rem'}}>
            <span style={{color:'white'}}>Ready to Make a </span><span style={{color:orange}}>Difference?</span>
          </motion.h2>
          <motion.p initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.2}} style={{color:'rgba(255,255,255,0.75)',fontSize:'1.05rem',lineHeight:1.75,maxWidth:'34rem',margin:'0 auto 2.5rem'}}>
            Every action counts. Whether you're a donor with goods to share or a charity serving your community — HopeLink is your platform.
          </motion.p>
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.35}} style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <Link to="/register" style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',padding:'0.875rem 2rem',borderRadius:'9999px',background:orange,color:'white',fontWeight:700,fontSize:'0.875rem',letterSpacing:'0.05em',textTransform:'uppercase',textDecoration:'none',boxShadow:'0 4px 20px rgba(249,115,22,0.45)'}}>↑ Start Donating</Link>
            <Link to="/register?type=charity" style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',padding:'0.875rem 2rem',borderRadius:'9999px',background:'transparent',color:'white',fontWeight:700,fontSize:'0.875rem',letterSpacing:'0.05em',textTransform:'uppercase',textDecoration:'none',border:'2px solid rgba(255,255,255,0.45)'}}>🏛 Register as Charity</Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About