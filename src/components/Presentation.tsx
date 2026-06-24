import React, { useState, useEffect, useRef } from 'react';
import { BackgroundNetwork } from './BackgroundNetwork';
import { SlideController } from './SlideController';

// Import slide components
import { Slide1Title } from './slides/Slide1Title';
import { Slide2Problem } from './slides/Slide2Problem';
import { Slide3WhatIs } from './slides/Slide3WhatIs';
import { Slide4Acquisition } from './slides/Slide4Acquisition';
import { Slide5Fabric } from './slides/Slide5Fabric';
import { Slide6Ecosystem } from './slides/Slide6Ecosystem';
import { Slide7Orchestration } from './slides/Slide7Orchestration';
import { Slide8Human } from './slides/Slide8Human';
import { Slide9UX } from './slides/Slide9UX';
import { Slide10Security } from './slides/Slide10Security';
import { Slide11Architecture } from './slides/Slide11Architecture';
import { Slide12Vision } from './slides/Slide12Vision';

const PRESENTER_NOTES = [
  "Welcome to the presentation of DIPLO.AI, the first agentic operating system designed specifically for diplomacy. Today, we will discuss how multi-agent networks establish institutional memory and negotiation support for sovereign nations under strict human supervision.",
  "Modern diplomats are overwhelmed by an information explosion. Sifting through news, complex treaties, laws, and foreign publications manually takes days, leading to fragmented insights and delayed decision-making when timing is critical.",
  "DIPLO.AI is not a simple chatbot. It is a multi-agent ecosystem working collaboratively under human control. Specialized agents monitor streams, retrieve relevant sections, reason about precedents, and recommend options in real-time.",
  "Our Knowledge Acquisition agents act as the eyes and ears of the system. They continuously monitor global feeds, PDFs, websites, and scanned documents, funneling raw source files through OCR and ingestion systems into the platform.",
  "The Knowledge Fabric represents the system's database core. It links Postgres (metadata), vector search (semantics), and network graph databases (relations between nations and agreements) to construct an interactive, living institutional memory.",
  "The ecosystem houses highly specialized agents. The Monitoring Agent summarizes daily briefs, the Treaty Agent analyzes historical agreements, the Clause Agent isolates contracts, and the Red-Team Agent actively challenges our biases.",
  "Orchestration ensures clean collaboration. When a user submits an inquiry, the Planner Agent dissects the task, delegates subtasks to specialized agents in parallel, and routes their findings to a Synthesis Agent for human review.",
  "Security requires human-in-the-loop validation. DIPLO.AI does not execute policy autonomously. For every suggestion, it provides trace logic and source citations, enabling diplomats to verify, edit, and audit decisions easily.",
  "The User Experience utilizes natural language. Analysts can ask complex questions (e.g. digital trade precedents or semiconductor supply risk analyses), and explore interactive workspaces showing step-by-step reasoning logs.",
  "Security and sovereignty are first-class principles. Designed for government deployment, the platform can run in a secure sovereign cloud or a completely air-gapped server room, utilizing role-based access control and zero-trust policies.",
  "Our technical architecture stack bridges data ingestion and human approval. We orchestrate reliable workflows with frameworks like LangGraph and Temporal, storing data in scalable databases and exposing rich dashboard APIs.",
  "The long-term vision of DIPLO.AI is to transform diplomacy. By shifting from simple search engines to digital institutional memory and strategic negotiation support, we provide an advanced operating platform for modern statecraft."
];

export const Presentation: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isOverview, setIsOverview] = useState(false);
  const [theme, setTheme] = useState('midnight-gold');
  const [laserPointer, setLaserPointer] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: 0, y: 0 });
  const [showNotes, setShowNotes] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Viewport scale to fit 1920x1080
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const wrapper = wrapperRef.current;
      if (!container || !wrapper) return;

      const w = container.clientWidth;
      const h = container.clientHeight;
      const targetW = 1920;
      const targetH = 1080;

      const scaleX = w / targetW;
      const scaleY = h / targetH;
      const scale = Math.min(scaleX, scaleY);

      wrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // trigger initial layout

    // Debounce to ensure it sizes correctly after render
    const timeout = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in slides (e.g. playground Slide 9)
      if (
        document.activeElement?.tagName === 'INPUT' || 
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault();
        prevSlide();
      } else if (e.key.toLowerCase() === 'o') {
        e.preventDefault();
        setIsOverview((prev) => !prev);
      } else if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setLaserPointer((prev) => !prev);
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setShowNotes((prev) => !prev);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsOverview(false);
        setLaserPointer(false);
        setShowNotes(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isOverview]);

  // Touch Swipe navigation
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const minSwipe = 50;

    if (diffX > minSwipe) {
      nextSlide();
    } else if (diffX < -minSwipe) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  // Tracking mouse for laser pointer
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!laserPointer || !wrapperRef.current) return;
    
    // Calculate position relative to the 1920x1080 wrapper
    const rect = wrapperRef.current.getBoundingClientRect();
    
    // We need to account for scale factor
    const scale = rect.width / 1920;
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    
    setLaserPos({ x, y });
  };

  const nextSlide = () => {
    if (currentSlide < 11) {
      setDirection('right');
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection('left');
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const jumpToSlide = (index: number) => {
    setDirection(index > currentSlide ? 'right' : 'left');
    setCurrentSlide(index);
    setIsOverview(false);
  };

  // Render Slide Component
  const renderSlide = () => {
    const props = { active: !isOverview };
    switch (currentSlide) {
      case 0: return <Slide1Title {...props} />;
      case 1: return <Slide2Problem {...props} />;
      case 2: return <Slide3WhatIs {...props} />;
      case 3: return <Slide4Acquisition {...props} />;
      case 4: return <Slide5Fabric {...props} />;
      case 5: return <Slide6Ecosystem {...props} />;
      case 6: return <Slide7Orchestration {...props} />;
      case 7: return <Slide8Human {...props} />;
      case 8: return <Slide9UX {...props} />;
      case 9: return <Slide10Security {...props} />;
      case 10: return <Slide11Architecture {...props} />;
      case 11: return <Slide12Vision {...props} />;
      default: return <Slide1Title {...props} />;
    }
  };

  const slideTitles = [
    "DIPLO.AI Overview",
    "The Problem: Diplomats Overwhelmed",
    "What is DIPLO.AI?",
    "Knowledge Acquisition",
    "Knowledge Fabric Ingest",
    "Agent Ecosystem Grid",
    "Multi-Agent Orchestration",
    "Human-in-the-Loop Model",
    "Natural Language Playground",
    "Security & Sovereignty Stack",
    "Technical Architecture",
    "The Future of Diplomacy"
  ];

  return (
    <div 
      ref={containerRef}
      className={`presentation-container theme-${theme}`}
      style={{ 
        cursor: laserPointer ? 'none' : 'default',
        width: '100vw',
        height: '100vh',
        position: 'relative'
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background animated network nodes */}
      {!isOverview && <BackgroundNetwork />}

      {/* Scaled 16:9 presentation workspace wrapper */}
      <div 
        ref={wrapperRef}
        className="scaling-wrapper"
        onMouseMove={handleMouseMove}
      >
        {isOverview ? (
          /* Slides Grid Overview Mode */
          <div style={{ flex: 1, padding: '4rem 6rem', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'var(--display-font)' }}>
              Presentation Slides Overview
            </h2>
            <div className="overview-grid">
              {slideTitles.map((title, i) => (
                <div 
                  key={i} 
                  className={`overview-card ${currentSlide === i ? 'active' : ''}`}
                  onClick={() => jumpToSlide(i)}
                >
                  <span className="overview-card-num">{(i + 1).toString().padStart(2, '0')}</span>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Slide {i + 1}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, fontFamily: 'var(--display-font)', color: 'var(--text-primary)' }}>
                    {title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Single Slide View Mode with transition keys */
          <div 
            key={currentSlide} 
            className={`slide-content ${direction === 'right' ? 'slide-enter-right' : 'slide-enter-left'}`}
            style={{ width: '100%', height: '100%' }}
          >
            {renderSlide()}
          </div>
        )}

        {/* Custom Laser Pointer Render */}
        {laserPointer && !isOverview && (
          <div 
            style={{
              position: 'absolute',
              left: `${laserPos.x}px`,
              top: `${laserPos.y}px`,
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.95)',
              boxShadow: '0 0 16px 8px rgba(239, 68, 68, 0.7), inset 0 0 4px #fff',
              zIndex: 9999,
            }}
          />
        )}

        {/* Slide Controller & Options Bar */}
        <SlideController 
          currentSlide={currentSlide}
          totalSlides={12}
          onNext={nextSlide}
          onPrev={prevSlide}
          onJumpTo={jumpToSlide}
          isOverview={isOverview}
          onToggleOverview={() => setIsOverview(!isOverview)}
          theme={theme}
          onChangeTheme={(newTheme) => setTheme(newTheme)}
          laserPointerActive={laserPointer}
          onToggleLaser={() => setLaserPointer(!laserPointer)}
          showNotes={showNotes}
          onToggleNotes={() => setShowNotes(!showNotes)}
          notes={PRESENTER_NOTES[currentSlide]}
        />
      </div>
    </div>
  );
};
