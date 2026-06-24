import React from 'react';
import { Shield, Brain, Layers } from 'lucide-react';

interface SlideProps {
  active: boolean;
}

export const Slide1Title: React.FC<SlideProps> = ({ active }) => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        padding: '2rem',
      }}
    >
      {/* Decorative Top Glowing Element */}
      <div 
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, rgba(0,0,0,0) 70%)',
          position: 'absolute',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: -1,
          opacity: 0.8,
          pointerEvents: 'none',
        }}
      />

      {/* Floating Diplomatic Rings */}
      <div 
        className="animate-spin-slow hide-on-mobile"
        style={{
          width: '560px',
          height: '560px',
          border: '1px dashed var(--card-border)',
          borderRadius: '50%',
          position: 'absolute',
          zIndex: -2,
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />
      <div 
        className="animate-spin-slow hide-on-mobile"
        style={{
          width: '400px',
          height: '400px',
          border: '1px solid var(--card-border)',
          borderRadius: '50%',
          position: 'absolute',
          zIndex: -2,
          opacity: 0.15,
          animationDirection: 'reverse',
          pointerEvents: 'none',
        }}
      />

      {/* Elegant Main Branding */}
      <div 
        className="badge"
        style={{
          fontSize: '1rem',
          letterSpacing: '0.2em',
          padding: '0.6rem 1.4rem',
          marginBottom: '2rem',
        }}
      >
        Sovereign Intelligence
      </div>

      <h1 
        className="animate-glow"
        style={{
          fontFamily: 'var(--display-font)',
          fontSize: 'var(--fs-title-main)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
          lineHeight: '1',
          marginBottom: '1rem',
          position: 'relative',
        }}
      >
        DIPLO<span style={{ color: 'var(--accent)' }}>.AI</span>
      </h1>

      <p 
        style={{
          fontFamily: 'var(--serif-font)',
          fontSize: 'var(--fs-subtitle)',
          fontStyle: 'italic',
          color: 'var(--text-secondary)',
          maxWidth: '1200px',
          margin: '0 auto 3rem auto',
          lineHeight: '1.3',
        }}
      >
        The Agentic Operating System for Diplomacy
      </p>

      {/* Columns describing Core Strengths */}
      <div className="strengths-container">
        {[
          { icon: <Layers size={24} />, title: "Institutional Memory", desc: "Consolidates decades of complex treaties, records, and protocols into an active fabric." },
          { icon: <Brain size={24} />, title: "Intelligence", desc: "Real-time updates, cross-lingual monitoring, and entity extraction to filter noise." },
          { icon: <Shield size={24} />, title: "Negotiation Support", desc: "Simulates counter-arguments, reviews risk factors, and scans historical precedents." }
        ].map((item, idx) => (
          <div 
            key={idx}
            className="glass-card"
            style={{
              flex: 1,
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.8rem',
              transform: active ? 'translateY(0)' : 'translateY(20px)',
              opacity: active ? 1 : 0,
              transition: `all 0.5s ease-out ${0.2 + idx * 0.15}s`,
            }}
          >
            <div 
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'var(--btn-bg)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px var(--accent-glow)',
                border: '1px solid var(--card-border)'
              }}
            >
              {item.icon}
            </div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontFamily: 'var(--display-font)' }}>{item.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
