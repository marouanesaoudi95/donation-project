import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { usePosts } from '../hooks/usePosts'
import PostCard from '../components/posts/PostCard'
import { DONATION_TYPES, STATS } from '../utils/constants'
import { FadeContent, ScrollReveal, BlurText, CountUp, GlowCard, TextShimmer } from '../components/animations'

const CAUSE_IMAGES = {
  food:'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80',
  clothes:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  toys:'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80',
  books:'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80',
  electronics:'https://images.unsplash.com/photo-1593344484962-796055d4a3a4?w=400&q=80',
  other:'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=80',
}

const STAT_NUMS = [2400, 340, 12000, 98]
const STAT_SUFFIX = ['+', '+', '+', '%']

const HomePage = () => {
  const { isAuthenticated, isDonor } = useAuth()
  const { posts, fetchPosts, loading } = usePosts()
  useEffect(() => { fetchPosts({ status:'available', limit:6 }) }, [])

  return (
    <div style={{minHeight:'100vh'}}>

      {/* ── HERO ── */}
      <section style={{
        position:'relative', minHeight:'100vh', display:'flex', alignItems:'center',
        overflow:'hidden', background:'linear-gradient(135deg,#f97316 0%,#ea6c10 55%,#c2570c 100%)'
      }}>
        {/* Animated bg blobs */}
        <motion.div animate={{ scale:[1,1.15,1], opacity:[0.5,0.8,0.5] }}
          transition={{ duration:7, repeat:Infinity, ease:'easeInOut' }}
          style={{position:'absolute',top:'10%',right:'5%',width:'28rem',height:'28rem',borderRadius:'50%',background:'rgba(255,255,255,0.07)',filter:'blur(40px)'}}
        />
        <motion.div animate={{ scale:[1.1,1,1.1], opacity:[0.4,0.7,0.4] }}
          transition={{ duration:9, repeat:Infinity, ease:'easeInOut', delay:1 }}
          style={{position:'absolute',bottom:'5%',left:'5%',width:'20rem',height:'20rem',borderRadius:'50%',background:'rgba(251,191,36,0.12)',filter:'blur(30px)'}}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{position:'relative',zIndex:1,paddingTop:'5rem',paddingBottom:'5rem',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'4rem',alignItems:'center',width:'100%'}}>
          {/* Text */}
          <div style={{color:'white'}}>
            <motion.div
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.5 }}
              style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'rgba(255,255,255,0.2)',backdropFilter:'blur(8px)',padding:'0.375rem 1rem',borderRadius:'9999px',fontSize:'0.85rem',fontWeight:600,marginBottom:'1.5rem'}}
            >
              <motion.span animate={{ scale:[1,1.3,1] }} transition={{ duration:1.5,repeat:Infinity }}
                style={{width:'0.5rem',height:'0.5rem',borderRadius:'50%',background:'#4ade80',display:'inline-block'}}
              />
              340+ charities connected
            </motion.div>

            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(2.5rem,5vw,4rem)',fontWeight:700,lineHeight:1.15,marginBottom:'1.5rem'}}>
              <BlurText text="Give Hope," delay={0.2} /><br />
              <BlurText text="Change Lives" delay={0.5} style={{color:'#fde68a'}} />
            </h1>

            <FadeContent delay={0.7} direction="up">
              <p style={{color:'rgba(255,255,255,0.85)',fontSize:'1.2rem',lineHeight:1.7,marginBottom:'2.5rem',maxWidth:'32rem'}}>
                HopeLink connects generous donors with trusted charities — making giving simple, transparent, and impactful.
              </p>
              <div style={{display:'flex',flexWrap:'wrap',gap:'1rem'}}>
                {isAuthenticated ? (
                  isDonor ? (
                    <motion.div whileHover={{scale:1.04}} whileTap={{scale:0.97}}>
                      <Link to="/posts/create" className="btn-primary" style={{background:'white',color:'#ea6c10',boxShadow:'0 8px 30px rgba(0,0,0,0.2)',textDecoration:'none'}}>🎁 Create Donation</Link>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={{scale:1.04}} whileTap={{scale:0.97}}>
                      <Link to="/posts" className="btn-primary" style={{background:'white',color:'#ea6c10',textDecoration:'none'}}>🔍 Browse Donations</Link>
                    </motion.div>
                  )
                ) : (
                  <>
                    <motion.div whileHover={{scale:1.04}} whileTap={{scale:0.97}}>
                      <Link to="/register" className="btn-primary" style={{background:'white',color:'#ea6c10',boxShadow:'0 8px 30px rgba(0,0,0,0.2)',textDecoration:'none'}}>Get Started Free</Link>
                    </motion.div>
                    <motion.div whileHover={{scale:1.04}} whileTap={{scale:0.97}}>
                      <Link to="/posts" className="btn-outline" style={{borderColor:'rgba(255,255,255,0.5)',color:'white',textDecoration:'none'}}>Browse Donations</Link>
                    </motion.div>
                  </>
                )}
              </div>
            </FadeContent>
          </div>

          {/* Stats grid */}
          <FadeContent delay={0.4} direction="left">
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
              {STATS.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, scale:0.85 }}
                  animate={{ opacity:1, scale:1 }}
                  transition={{ delay: 0.6 + i*0.1, duration:0.4, type:'spring' }}
                  whileHover={{ scale:1.05, background:'rgba(255,255,255,0.25)' }}
                  style={{background:'rgba(255,255,255,0.15)',backdropFilter:'blur(8px)',borderRadius:'1.25rem',padding:'1.5rem',border:'1px solid rgba(255,255,255,0.2)',cursor:'default'}}
                >
                  <p style={{fontSize:'1.75rem',marginBottom:'0.25rem'}}>{s.icon}</p>
                  <p style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',fontWeight:700,color:'white'}}>
                    <CountUp end={STAT_NUMS[i]} suffix={STAT_SUFFIX[i]} duration={2000} />
                  </p>
                  <p style={{color:'rgba(255,255,255,0.75)',fontSize:'0.85rem',marginTop:'0.25rem'}}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </FadeContent>
        </div>

        {/* Wave bottom */}
        <div style={{position:'absolute',bottom:0,left:0,right:0}}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fef9f0"/>
          </svg>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{background:'#fef9f0',padding:'5rem 0'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeContent direction="up">
            <div style={{textAlign:'center',marginBottom:'3.5rem'}}>
              <span style={{display:'inline-block',fontSize:'0.8rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'#f97316',marginBottom:'0.75rem'}}>Simple Process</span>
              <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.75rem,4vw,2.75rem)',fontWeight:700,color:'#1c1917',marginBottom:'1rem'}}>
                How <TextShimmer text="HopeLink" /> Works
              </h2>
              <p style={{color:'#78716c',fontSize:'1.05rem',lineHeight:1.7,maxWidth:'36rem',margin:'0 auto'}}>
                Three simple steps to connect donors with charities and make a lasting difference.
              </p>
            </div>
          </FadeContent>

          <ScrollReveal stagger={0.15} direction="up">
            {[
              { step:'01', icon:'📝', title:'Post a Donation', desc:'Donors list available items — food, clothes, toys, and more — in minutes.' },
              { step:'02', icon:'🔍', title:'Charities Discover', desc:'Registered charities browse and filter donations matching their community needs.' },
              { step:'03', icon:'🤝', title:'Connect & Collect', desc:'Charities claim donations and coordinate pickup directly with donors.' },
            ].map((s, i) => (
              <GlowCard key={i} style={{padding:'2rem',textAlign:'center'}}>
                <div style={{width:'4rem',height:'4rem',background:'#fff7ed',borderRadius:'1rem',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2rem',margin:'0 auto 1rem'}}>
                  {s.icon}
                </div>
                <span style={{display:'inline-block',fontSize:'0.75rem',fontWeight:700,color:'#f97316',background:'#fff7ed',padding:'0.2rem 0.625rem',borderRadius:'9999px',marginBottom:'0.75rem'}}>{s.step}</span>
                <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.2rem',fontWeight:700,color:'#1c1917',marginBottom:'0.625rem'}}>{s.title}</h3>
                <p style={{color:'#78716c',fontSize:'0.9rem',lineHeight:1.7}}>{s.desc}</p>
              </GlowCard>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section style={{background:'white',padding:'5rem 0'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeContent direction="up">
            <div style={{textAlign:'center',marginBottom:'3rem'}}>
              <span style={{display:'inline-block',fontSize:'0.8rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'#f97316',marginBottom:'0.75rem'}}>What We Collect</span>
              <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:700,color:'#1c1917'}}>Donation Categories</h2>
            </div>
          </FadeContent>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'1.25rem'}}>
            {DONATION_TYPES.map((type, i) => (
              <FadeContent key={type.value} delay={i * 0.08} direction="up">
                <Link to={`/posts?type=${type.value}`} style={{textDecoration:'none',display:'block'}}>
                  <motion.div
                    whileHover={{ scale:1.04, y:-4 }}
                    transition={{ type:'spring', stiffness:300, damping:20 }}
                    style={{position:'relative',borderRadius:'1.25rem',overflow:'hidden',aspectRatio:'4/3',boxShadow:'0 4px 20px rgba(0,0,0,0.08)',cursor:'pointer'}}
                  >
                    <img src={CAUSE_IMAGES[type.value]} alt={type.label} style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.4s'}} />
                    <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.1) 60%,transparent 100%)'}} />
                    <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'1.25rem',color:'white'}}>
                      <p style={{fontSize:'1.75rem',marginBottom:'0.25rem'}}>{type.icon}</p>
                      <p style={{fontFamily:'Playfair Display,serif',fontWeight:700,fontSize:'1.1rem'}}>{type.label}</p>
                    </div>
                  </motion.div>
                </Link>
              </FadeContent>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT DONATIONS ── */}
      <section style={{background:'#fef9f0',padding:'5rem 0'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeContent direction="up">
            <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'3rem',flexWrap:'wrap',gap:'1rem'}}>
              <div>
                <span style={{display:'inline-block',fontSize:'0.8rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'#f97316',marginBottom:'0.5rem'}}>Live Feed</span>
                <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:700,color:'#1c1917'}}>Recent Donations</h2>
              </div>
              <Link to="/posts" className="btn-outline" style={{textDecoration:'none'}}>View All →</Link>
            </div>
          </FadeContent>

          {loading ? (
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1.5rem'}}>
              {[...Array(6)].map((_,i) => (
                <motion.div key={i} animate={{ opacity:[0.5,1,0.5] }} transition={{ duration:1.5,repeat:Infinity,delay:i*0.1 }}
                  style={{background:'white',borderRadius:'1rem',height:'220px',boxShadow:'0 4px 20px rgba(0,0,0,0.06)'}} />
              ))}
            </div>
          ) : (
            <ScrollReveal stagger={0.1} direction="up">
              {posts.slice(0,6).map(post => <PostCard key={post._id} post={post} />)}
            </ScrollReveal>
          )}

          <FadeContent delay={0.3} direction="up">
            <div style={{textAlign:'center',marginTop:'3rem'}}>
              <motion.div whileHover={{scale:1.04}} whileTap={{scale:0.97}} style={{display:'inline-block'}}>
                <Link to="/posts" className="btn-primary" style={{textDecoration:'none'}}>Browse All Donations →</Link>
              </motion.div>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{background:'linear-gradient(to right,#2d7a4f,#0d9488)',padding:'5rem 1rem',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <motion.div animate={{ rotate:[0,360] }} transition={{ duration:60,repeat:Infinity,ease:'linear' }}
          style={{position:'absolute',top:'-5rem',right:'-5rem',width:'20rem',height:'20rem',borderRadius:'50%',border:'2px solid rgba(255,255,255,0.06)'}}
        />
        <motion.div animate={{ rotate:[360,0] }} transition={{ duration:45,repeat:Infinity,ease:'linear' }}
          style={{position:'absolute',bottom:'-3rem',left:'-3rem',width:'14rem',height:'14rem',borderRadius:'50%',border:'2px solid rgba(255,255,255,0.06)'}}
        />
        <FadeContent direction="up" style={{position:'relative',zIndex:1,maxWidth:'40rem',margin:'0 auto'}}>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.75rem,4vw,3rem)',fontWeight:700,color:'white',marginBottom:'1rem'}}>
            Ready to Make a Difference?
          </h2>
          <p style={{color:'rgba(255,255,255,0.8)',fontSize:'1.1rem',marginBottom:'2.5rem'}}>
            Join thousands of donors and charities already creating positive change.
          </p>
          {!isAuthenticated && (
            <div style={{display:'flex',flexWrap:'wrap',gap:'1rem',justifyContent:'center'}}>
              <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.97}}>
                <Link to="/register" className="btn-primary" style={{background:'white',color:'#2d7a4f',textDecoration:'none'}}>🎁 I Want to Donate</Link>
              </motion.div>
              <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.97}}>
                <Link to="/register" className="btn-outline" style={{borderColor:'rgba(255,255,255,0.5)',color:'white',textDecoration:'none'}}>🏛️ Register as Charity</Link>
              </motion.div>
            </div>
          )}
        </FadeContent>
      </section>
    </div>
  )
}

export default HomePage
