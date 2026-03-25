import { useEffect, useRef, useState } from 'react'

export default function IntroAnimation() {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem('intro-seen')) {
      setVisible(false)
      return
    }

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; speed: number; size: number; opacity: number }[] = []
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        speed: 0.5 + Math.random() * 1.5,
        size: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.7,
      })
    }

    let animFrame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.y -= p.speed
        if (p.y < -10) p.y = canvas.height + 10
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(168, 255, 0, ${p.opacity})`
        ctx.fill()
      })
      animFrame = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const timer = setTimeout(() => exit(), 4200)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const exit = () => {
    sessionStorage.setItem('intro-seen', '1')
    setExiting(true)
    setTimeout(() => setVisible(false), 800)
  }

  if (!visible) return null

  return (
    <div
      onClick={exit}
      style={{
        position: 'fixed', inset: 0, background: '#000', zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', cursor: 'pointer',
        opacity: exiting ? 0 : 1,
        transition: 'opacity 0.8s ease',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />

      <div style={{
        position: 'absolute', width: 340, height: 340, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,255,0,0.07) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
          <span style={{
            color: '#A8FF00', fontSize: 32, fontFamily: 'monospace',
            animation: 'fadeIn 0.4s ease 0.3s both',
          }}>{'>'}</span>
          <span style={{
            color: '#fff', fontSize: 52, fontWeight: 900, letterSpacing: 6,
            animation: 'typeIn 1s steps(9,end) 0.7s both',
            overflow: 'hidden', whiteSpace: 'nowrap',
            display: 'inline-block',
          }}>inside.ai</span>
          <span style={{
            display: 'inline-block', width: 3, height: 52,
            background: '#A8FF00', verticalAlign: 'middle',
            animation: 'blink 0.7s step-end infinite',
          }} />
        </div>
        <p style={{
          color: '#555', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase',
          marginTop: 16, animation: 'fadeIn 0.6s ease 2s both',
        }}>AI, as I actually use it.</p>
      </div>

      <p style={{
        position: 'absolute', bottom: 48, color: '#444',
        fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
        animation: 'fadeIn 0.6s ease 2.6s both',
      }}>Click anywhere to enter ↓</p>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes typeIn { from { width:0; } to { width:9ch; } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
      `}</style>
    </div>
  )
}
