import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Grid, 
  FileText, 
  Settings, 
  Pointer, 
  Palette, 
  Clock,
  Sun,
  Moon
} from 'lucide-react';

interface SlideControllerProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onJumpTo: (index: number) => void;
  isOverview: boolean;
  onToggleOverview: () => void;
  theme: string;
  onChangeTheme: (theme: string) => void;
  laserPointerActive: boolean;
  onToggleLaser: () => void;
  showNotes: boolean;
  onToggleNotes: () => void;
  notes: string;
}

export const SlideController: React.FC<SlideControllerProps> = ({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onJumpTo,
  isOverview,
  onToggleOverview,
  theme,
  onChangeTheme,
  laserPointerActive,
  onToggleLaser,
  showNotes,
  onToggleNotes,
  notes,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playInterval, setPlayInterval] = useState(7000); // 7 seconds default
  const [showSettings, setShowSettings] = useState(false);

  // Autoplay Logic
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      onNext();
    }, playInterval);

    return () => clearInterval(timer);
  }, [isPlaying, playInterval, currentSlide, onNext]);

  return (
    <div 
      className="slide-controller-bar"
      style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        padding: '1.5rem 3rem',
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        zIndex: 50,
        pointerEvents: 'auto',
      }}
    >
      {/* Slide Progress Line */}
      <div 
        style={{
          width: '100%',
          height: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const percentage = clickX / rect.width;
          const jumpIndex = Math.min(
            Math.floor(percentage * totalSlides),
            totalSlides - 1
          );
          onJumpTo(jumpIndex);
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${((currentSlide + 1) / totalSlides) * 100}%`,
            backgroundColor: 'var(--accent)',
            boxShadow: '0 0 8px var(--accent)',
            borderRadius: '2px',
            transition: 'width 0.3s ease-out',
          }}
        />
      </div>

      {/* Control Actions Bar */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Left Side: Overview, Notes & Quick Theme Toggle */}
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          <button 
            className="nav-btn" 
            title="Slide Grid Overview [O]"
            onClick={onToggleOverview}
            style={{ 
              backgroundColor: isOverview ? 'var(--accent)' : 'var(--btn-bg)',
              borderColor: isOverview ? 'var(--accent)' : 'var(--card-border)',
            }}
          >
            <Grid size={18} />
            <span style={{ fontSize: '0.9rem' }}>Overview</span>
          </button>
          
          <button 
            className="nav-btn" 
            title="Presenter Notes [N]"
            onClick={onToggleNotes}
            style={{ 
              backgroundColor: showNotes ? 'var(--accent)' : 'var(--btn-bg)',
              borderColor: showNotes ? 'var(--accent)' : 'var(--card-border)',
            }}
          >
            <FileText size={18} />
            <span style={{ fontSize: '0.9rem' }}>Notes</span>
          </button>

          {/* Quick Light/Dark Toggle */}
          <button 
            className="nav-btn"
            title="Toggle Light / Dark Mode"
            onClick={() => onChangeTheme(theme === 'nordic-slate' ? 'midnight-gold' : 'nordic-slate')}
            style={{ 
              backgroundColor: theme === 'nordic-slate' ? 'rgba(59, 130, 246, 0.15)' : 'var(--btn-bg)',
              borderColor: theme === 'nordic-slate' ? 'var(--accent)' : 'var(--card-border)',
            }}
          >
            {theme === 'nordic-slate' ? <Sun size={18} style={{ color: 'var(--accent)' }} /> : <Moon size={18} style={{ color: 'var(--accent)' }} />}
            <span style={{ fontSize: '0.9rem' }}>
              {theme === 'nordic-slate' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>

        {/* Center: Slide Numbers & Direction Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button 
            className="nav-btn" 
            onClick={onPrev} 
            disabled={currentSlide === 0}
            title="Previous [Left Arrow / Backspace]"
          >
            <ChevronLeft size={20} />
          </button>

          <span 
            style={{ 
              fontFamily: 'var(--display-font)', 
              fontSize: '1.2rem', 
              fontWeight: 600,
              minWidth: '90px',
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            {currentSlide + 1} <span style={{ opacity: 0.5, fontSize: '0.95rem' }}>/</span> {totalSlides}
          </span>

          <button 
            className="nav-btn" 
            onClick={onNext} 
            disabled={currentSlide === totalSlides - 1}
            title="Next [Right Arrow / Space]"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Right Side: Laser, Autoplay & Settings */}
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', position: 'relative' }}>
          {/* Laser Pointer */}
          <button 
            className="nav-btn"
            title="Toggle Laser Pointer [L]"
            onClick={onToggleLaser}
            style={{ 
              backgroundColor: laserPointerActive ? 'var(--danger)' : 'var(--btn-bg)',
              borderColor: laserPointerActive ? 'var(--danger)' : 'var(--card-border)',
            }}
          >
            <Pointer size={18} />
            <span style={{ fontSize: '0.9rem' }}>Laser</span>
          </button>

          {/* Autoplay Play/Pause */}
          <button 
            className="nav-btn"
            title="Auto Play Presentation"
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ 
              backgroundColor: isPlaying ? 'var(--success)' : 'var(--btn-bg)',
              borderColor: isPlaying ? 'var(--success)' : 'var(--card-border)',
            }}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            <span style={{ fontSize: '0.9rem' }}>{isPlaying ? 'Pause' : 'Autoplay'}</span>
          </button>

          {/* Settings Trigger */}
          <button 
            className="nav-btn"
            title="Settings Panel"
            onClick={() => setShowSettings(!showSettings)}
            style={{ 
              backgroundColor: showSettings ? 'var(--accent)' : 'var(--btn-bg)',
              borderColor: showSettings ? 'var(--accent)' : 'var(--card-border)',
            }}
          >
            <Settings size={18} />
          </button>

          {/* Settings Floating Box */}
          {showSettings && (
            <div 
              style={{
                position: 'absolute',
                bottom: '100%',
                right: 0,
                marginBottom: '1rem',
                width: '320px',
                background: 'var(--bg-secondary)',
                border: '2px solid var(--card-border)',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                pointerEvents: 'auto',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h4 style={{ fontFamily: 'var(--display-font)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
                <Settings size={16} /> Presentation Settings
              </h4>
              
              {/* Theme Settings */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Palette size={14} /> Color Palette Theme:
                </span>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button 
                    onClick={() => onChangeTheme('midnight-gold')}
                    style={{
                      flex: 1, padding: '0.4rem', fontSize: '0.75rem', borderRadius: '6px', cursor: 'pointer',
                      border: theme === 'midnight-gold' ? '1px solid var(--accent)' : '1px solid transparent',
                      background: theme === 'midnight-gold' ? 'var(--accent)' : 'rgba(255, 255, 255, 0.05)',
                      color: '#fff', fontWeight: 600
                    }}
                  >
                    Midnight Gold
                  </button>
                  <button 
                    onClick={() => onChangeTheme('obsidian-emerald')}
                    style={{
                      flex: 1, padding: '0.4rem', fontSize: '0.75rem', borderRadius: '6px', cursor: 'pointer',
                      border: theme === 'obsidian-emerald' ? '1px solid var(--accent)' : '1px solid transparent',
                      background: theme === 'obsidian-emerald' ? 'var(--accent)' : 'rgba(255, 255, 255, 0.05)',
                      color: '#fff', fontWeight: 600
                    }}
                  >
                    Obsidian Emerald
                  </button>
                  <button 
                    onClick={() => onChangeTheme('nordic-slate')}
                    style={{
                      flex: 1, padding: '0.4rem', fontSize: '0.75rem', borderRadius: '6px', cursor: 'pointer',
                      border: theme === 'nordic-slate' ? '1px solid var(--accent)' : '1px solid rgba(0, 0, 0, 0.1)',
                      background: theme === 'nordic-slate' ? 'var(--accent)' : 'rgba(0, 0, 0, 0.05)',
                      color: theme === 'nordic-slate' ? '#fff' : '#000', fontWeight: 600
                    }}
                  >
                    Nordic Slate
                  </button>
                </div>
              </div>

              {/* Autoplay Speed Settings */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={14} /> Autoplay Slide Duration:
                </span>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {[5000, 7000, 10000, 15000].map((ms) => (
                    <button 
                      key={ms}
                      onClick={() => setPlayInterval(ms)}
                      style={{
                        flex: 1, padding: '0.4rem', fontSize: '0.75rem', borderRadius: '6px', cursor: 'pointer',
                        border: playInterval === ms ? '1px solid var(--accent)' : '1px solid transparent',
                        background: playInterval === ms ? 'var(--btn-hover)' : 'rgba(255, 255, 255, 0.03)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {ms / 1000}s
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Presenter Notes side panel overlay */}
      {showNotes && (
        <div 
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '3rem',
            width: '400px',
            background: 'var(--bg-secondary)',
            border: '2px solid var(--card-border)',
            borderRadius: '16px 16px 0 16px',
            padding: '1.5rem',
            boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.4)',
            maxHeight: '350px',
            overflowY: 'auto',
            pointerEvents: 'auto',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
            <h4 style={{ fontFamily: 'var(--display-font)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={16} /> Presenter Notes (Slide {currentSlide + 1})
            </h4>
            <button 
              onClick={onToggleNotes}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              Close
            </button>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', whiteSpace: 'pre-line', lineHeight: '1.5' }}>
            {notes}
          </p>
        </div>
      )}
    </div>
  );
};
