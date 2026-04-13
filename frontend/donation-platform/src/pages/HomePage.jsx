import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { usePosts } from '../hooks/usePosts'
import PostCard from '../components/posts/PostCard'
import { DONATION_TYPES } from '../utils/constants'
import { FadeContent, ScrollReveal, BlurText, TextShimmer } from '../components/animations'

const CAUSE_IMAGES = {

  food:        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80',
  clothes:     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  toys:        'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80',
  books:       'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80',
  electronics: 'https://images.unsplash.com/photo-1593344484962-796055d4a3a4?w=400&q=80',
  other:       'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=80',
}

const HOW_IT_WORKS = [
 { step:'01', tag:'DONORS',    title:'Post a Donation',    desc:'Donors list available items — food, clothes, toys, and more — in minutes.' },
  { step:'02', tag:'CHARITIES', title:'Charities Discover', desc:'Registered charities browse and filter donations matching their community needs.' },
  { step:'03', tag:'IMPACT',    title:'Connect & Collect',  desc:'Charities claim donations and coordinate pickup directly with donors.' },
]

const HomePage = () => {
  const { isAuthenticated, isDonor } = useAuth()
  const { posts, fetchPosts, loading } = usePosts()
  useEffect(() => { fetchPosts({ status: 'available', limit: 6 }) }, [])
  return (
    <div style={{ minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{
        position:   'relative',
        minHeight:  '100vh',
        display:    'flex',
        alignItems: 'center',
        overflow:   'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=90"
            alt="Children receiving donations"
            style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }}

          />
          <div style={{ position:'absolute', inset:0, background:'rgba(15,10,5,0.55)' }} />

        </div>

        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ position:'relative', zIndex:2, paddingTop:'8rem', paddingBottom:'5rem', width:'100%' }}
        >
          <div style={{ maxWidth: '38rem', color: 'white' }}>

            {/* Heading */}
            <h1 style={{

              fontFamily:   'Playfair Display,serif',
              fontSize:     'clamp(2.8rem,6vw,4.5rem)',
              fontWeight:    700,
              lineHeight:    1.1,
              marginBottom: '1.5rem',
            }}>
              <BlurText text="Give Hope," delay={0.2} /><br />
              <BlurText text="Change Lives" delay={0.5} style={{ color:'#f97316' }} />
            </h1>

            {/* Description */}
            <FadeContent delay={0.6} direction="up">
              <p style={{
                color:        'rgba(255,255,255,0.85)',
                fontSize:     '1.05rem',
                lineHeight:    1.75,
                marginBottom: '2.5rem',
                maxWidth:     '30rem',
              }}>
                HopeLink connects generous donors with verified charities. Post your donations,

                discover what's available, and make a real impact in your community.

              </p>

              {/* Buttons */}

              <div style={{ display:'flex', flexWrap:'wrap', gap:'1rem' }}>

                {isAuthenticated ? (

                  isDonor ? (
                    <>
                      <motion.div

                        whileHover={{ scale:1.05 }}

                        whileTap={{ scale:0.97 }}

                        transition={{ type:'spring', stiffness:300, damping:20 }}

                      >

                        <Link to="/posts/create" style={{

                          display:'inline-block', padding:'0.9rem 2.2rem', borderRadius:'0.4rem',

                          fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.12em',

                          textTransform:'uppercase', textDecoration:'none',

                          background:'#f97316', color:'white', border:'2px solid #f97316',

                        }}>🎁 Create Donation</Link>

                      </motion.div>

                      <motion.div

                        whileHover={{ scale:1.05, backgroundColor:'rgba(255,255,255,0.15)' }}

                        whileTap={{ scale:0.97 }}

                        transition={{ type:'spring', stiffness:300, damping:20 }}

                        style={{ borderRadius:'0.4rem' }}

                      >

                        <Link to="/posts" style={{

                          display:'inline-block', padding:'0.9rem 2.2rem', borderRadius:'0.4rem',

                          fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.12em',

                          textTransform:'uppercase', textDecoration:'none',

                          background:'transparent', color:'white',

                          border:'2px solid rgba(255,255,255,0.6)',

                        }}>Browse Donations</Link>

                      </motion.div>

                    </>

                  ) : (

                    <>

                      <motion.div

                        whileHover={{ scale:1.05 }}

                        whileTap={{ scale:0.97 }}

                        transition={{ type:'spring', stiffness:300, damping:20 }}

                      >

                        <Link to="/posts" style={{

                          display:'inline-block', padding:'0.9rem 2.2rem', borderRadius:'0.4rem',

                          fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.12em',

                          textTransform:'uppercase', textDecoration:'none',

                          background:'#f97316', color:'white', border:'2px solid #f97316',

                        }}>🔍 Browse Donations</Link>

                      </motion.div>

                    </>

                  )

                ) : (

                  <>

                    {/* Get Started Free */}

                    <motion.div

                      whileHover={{ scale:1.05 }}

                      whileTap={{ scale:0.97 }}

                      transition={{ type:'spring', stiffness:300, damping:20 }}

                    >

                      <Link to="/register" style={{

                        display:        'inline-block',

                        padding:        '0.85rem 2rem',

                        borderRadius:   '0.4rem',

                        fontWeight:      700,

                        fontSize:       '0.82rem',

                        letterSpacing:  '0.12em',

                        textTransform:  'uppercase',

                        textDecoration: 'none',

                        background:     '#f97316',

                        color:          'white',

                        border:         '2px solid #f97316',

                        boxShadow:      '0 8px 30px rgba(249,115,22,0.35)',

                      }}>

                        Get Started Free

                      </Link>

                    </motion.div>



                    {/* Browse Donations avec animation */}

                    <motion.div

                      whileHover={{ scale:1.05, backgroundColor:'rgba(255,255,255,0.12)' }}

                      whileTap={{ scale:0.97 }}

                      transition={{ type:'spring', stiffness:300, damping:20 }}

                      style={{ borderRadius:'0.4rem' }}

                    >

                      <Link to="/posts" style={{

                        display:        'inline-block',

                        padding:        '0.85rem 2rem',

                        borderRadius:   '0.4rem',

                        fontWeight:      700,

                        fontSize:       '0.82rem',

                        letterSpacing:  '0.12em',

                        textTransform:  'uppercase',

                        textDecoration: 'none',

                        background:     'transparent',

                        color:          'white',

                        border:         '2px solid rgba(255,255,255,0.6)',

                      }}>

                        Browse Donations

                      </Link>

                    </motion.div>

                  </>

                )}

              </div>

            </FadeContent>

          </div>

        </div>



        {/* Pas de wave — transition directe */}

      </section>



      {/* ── HOW IT WORKS ── */}

      <section style={{ background:'#fef9f0', padding:'5rem 0' }}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeContent direction="up">

            <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>

              <span style={{ display:'inline-block', fontSize:'0.8rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#f97316', marginBottom:'0.75rem' }}>

                Simple Process

              </span>

              <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(1.75rem,4vw,2.75rem)', fontWeight:700, color:'#1c1917', marginBottom:'1rem' }}>

                How <TextShimmer text="HopeLink" /> Works

              </h2>

              <p style={{ color:'#78716c', fontSize:'1.05rem', lineHeight:1.7, maxWidth:'36rem', margin:'0 auto' }}>

                Three simple steps to connect donors with charities and make a lasting difference.

              </p>

            </div>

          </FadeContent>



          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.5rem' }}>

            {HOW_IT_WORKS.map((s, i) => (

              <motion.div

                key={i}

                initial={{ opacity:0, y:30 }}

                whileInView={{ opacity:1, y:0 }}

                viewport={{ once:true }}

                transition={{ delay:i*0.15, duration:0.5, type:'spring' }}

                whileHover={{ y:-6, boxShadow:'0 16px 40px rgba(249,115,22,0.15)' }}

                style={{ position:'relative', background:'#fff8f3', borderRadius:'1.25rem', border:'1px solid #ffe4cc', padding:'2rem', overflow:'hidden', cursor:'default' }}

              >

                <span style={{ position:'absolute', top:'-0.75rem', right:'0.75rem', fontFamily:'Playfair Display,serif', fontSize:'7rem', fontWeight:900, color:'#f97316', opacity:0.07, lineHeight:1, userSelect:'none', pointerEvents:'none' }}>

                  {s.step}

                </span>

                <div style={{ position:'relative', zIndex:1 }}>

                  <span style={{ display:'inline-block', fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'#f97316', marginBottom:'1rem' }}>

                    {s.tag}

                  </span>

                  <p style={{ fontFamily:'Playfair Display,serif', fontSize:'2.5rem', fontWeight:900, color:'#f97316', lineHeight:1, marginBottom:'1.25rem' }}>

                    {s.step}

                  </p>

                  <div style={{ width:'2.5rem', height:'2px', background:'#fdba74', marginBottom:'1.25rem' }} />

                  <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.2rem', fontWeight:700, color:'#1c1917', marginBottom:'0.75rem' }}>

                    {s.title}

                  </h3>

                  <p style={{ color:'#78716c', fontSize:'0.9rem', lineHeight:1.7 }}>

                    {s.desc}

                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>
{/* ── SECTION CATEGORIES (RÉPLICATION EXACTE HAHAHAHAH.JPG) ── */}
{/* ── SECTION CATEGORIES CORRIGÉE ── */}
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <p className="text-[#b8935a] font-bold tracking-[0.25em] uppercase text-[11px] mb-2">
    
    </p>
    <h2 className="text-5xl font-bold text-[#1a1a1a] mb-12">
      Donation Categories
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
      {[
        {
          id: 'food',
          title: "FOOD & NUTRITION",
          desc: "Canned goods, dry staples, fresh produce and packaged meals for families in need.",
          img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=900"
        },
        {
          id: 'clothes',
          title: "CLOTHES & TEXTILES",
          desc: "All sizes and all seasons — adult, children, winter gear and everyday clothing.",
          img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=900"
        },
        {
          id: 'toys',
          title: "TOYS & EDUCATION",
          desc: "Learning tools, books, board games and school supplies for children of all ages.",
           img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=900"
        },
        {
          id: 'electronics',
          title: "ELECTRONICS",
          desc: "Refurbished phones, laptops, tablets and accessories for students and families.",
          img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=900"
        },
        {
          id: 'medical',
          title: "MEDICAL SUPPLIES",
          desc: "Wheelchairs, crutches, hygiene kits and over-the-counter medicines.",
          img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=900"
        },
        {
          id: 'other',
          title: "OTHER ESSENTIALS",
          desc: "Furniture, bedding, kitchen items and anything your household can spare.",
          img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=900"
        }
      ].map((item) => (
        <div key={item.id} className="relative group aspect-[3/2] rounded-[14px] overflow-hidden cursor-pointer">
          <img
            src={item.img}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 p-5 flex flex-col justify-end">
            <h3 className="text-white text-[13px] font-bold tracking-[0.1em] uppercase mb-2">
              {item.title}
            </h3>
            <p className="text-white/75 text-[12px] leading-relaxed mb-3 line-clamp-2">
              {item.desc}
            </p>
            <div className="flex items-center gap-2 text-[#c4a05a] text-[10px] font-bold tracking-[0.18em] uppercase">
             
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
     
      {/* ── RECENT DONATIONS ── */}

      <section style={{ background:'#fef9f0', padding:'5rem 0' }}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeContent direction="up">

            <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'3rem', flexWrap:'wrap', gap:'1rem' }}>

              <div>

                <span style={{ display:'inline-block', fontSize:'0.8rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#f97316', marginBottom:'0.5rem' }}>Live Feed</span>

                <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(1.75rem,4vw,2.5rem)', fontWeight:700, color:'#1c1917' }}>Recent Donations</h2>

              </div>

              <Link to="/posts" className="btn-outline" style={{ textDecoration:'none' }}>View All →</Link>

            </div>

          </FadeContent>



          {loading ? (

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1.5rem' }}>

              {[...Array(6)].map((_, i) => (

                <motion.div key={i} animate={{ opacity:[0.5,1,0.5] }} transition={{ duration:1.5, repeat:Infinity, delay:i*0.1 }}

                  style={{ background:'white', borderRadius:'1rem', height:'220px', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }} />

              ))}

            </div>

          ) : (

            <ScrollReveal stagger={0.1} direction="up">

              {posts.slice(0,6).map(post => <PostCard key={post._id} post={post} />)}

            </ScrollReveal>

          )}



          <FadeContent delay={0.3} direction="up">

            <div style={{ textAlign:'center', marginTop:'3rem' }}>

              <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }} style={{ display:'inline-block' }}>

                <Link to="/posts" className="btn-primary" style={{ textDecoration:'none' }}>Browse All Donations →</Link>

              </motion.div>

            </div>

          </FadeContent>

        </div>

      </section>



      {/* ── CTA ── */}

      <section style={{ position:'relative', minHeight:'560px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', textAlign:'center' }}>

        <div style={{ position:'absolute', inset:0 }}>

          <img

            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&q=80"

            alt="Hands giving donation"

            style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}

          />

          <div style={{ position:'absolute', inset:0, background:'rgba(15,10,5,0.72)' }} />

        </div>



        <div style={{ position:'relative', zIndex:1, maxWidth:'44rem', margin:'0 auto', padding:'4rem 1.5rem' }}>

          <motion.p

            initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}

            style={{ fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'#fb923c', marginBottom:'1.5rem' }}

          >

            JOIN THE MOVEMENT

          </motion.p>



          <motion.h2

            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}

            style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2.2rem,5vw,3.8rem)', fontWeight:700, color:'white', lineHeight:1.15, marginBottom:'1.25rem' }}

          >

            Ready to Make a<br />

            <span style={{ color:'#fb923c' }}>Difference?</span>

          </motion.h2>



          <motion.p

            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.2 }}

            style={{ color:'rgba(255,255,255,0.65)', fontSize:'1.05rem', lineHeight:1.75, maxWidth:'32rem', margin:'0 auto 2.5rem' }}

          >

            Every action counts. Whether you're a donor with goods to share or a charity serving your community — HopeLink is your platform.

          </motion.p>



          {!isAuthenticated && (

            <motion.div

              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.3 }}

              style={{ display:'flex', flexWrap:'wrap', gap:'1rem', justifyContent:'center' }}

            >

              <motion.div

                whileHover={{ scale:1.05 }}

                whileTap={{ scale:0.97 }}

                transition={{ type:'spring', stiffness:300, damping:20 }}

              >

                <Link to="/register?role=donor" style={{

                  display:'inline-block', padding:'0.85rem 2rem', borderRadius:'0.4rem',

                  fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.12em',

                  textTransform:'uppercase', textDecoration:'none',

                  background:'#f97316', color:'white', border:'2px solid #f97316',

                  boxShadow:'0 8px 30px rgba(249,115,22,0.35)',

                }}>Start Donating</Link>

              </motion.div>



              <motion.div

                whileHover={{ scale:1.05, backgroundColor:'rgba(255,255,255,0.12)' }}

                whileTap={{ scale:0.97 }}

                transition={{ type:'spring', stiffness:300, damping:20 }}

                style={{ borderRadius:'0.4rem' }}

              >

                <Link to="/register?role=charity" style={{

                  display:'inline-block', padding:'0.85rem 2rem', borderRadius:'0.4rem',

                  fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.12em',

                  textTransform:'uppercase', textDecoration:'none',

                  background:'transparent', color:'white',

                  border:'2px solid rgba(255,255,255,0.5)',

                }}>Register as Charity</Link>

              </motion.div>

            </motion.div>

          )}

        </div>

      </section>

    </div>
  )

}
export default HomePage;