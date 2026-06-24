import React, { useState, useEffect } from 'react';
import { Search, Send, Cpu, Check, Layers, AlertCircle, HelpCircle } from 'lucide-react';

interface SlideProps {
  active: boolean;
}

interface StepLog {
  agent: string;
  msg: string;
  type: 'info' | 'warn' | 'success';
}

export const Slide9UX: React.FC<SlideProps> = ({ active }) => {
  const [queryInput, setQueryInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [stepLogs, setStepLogs] = useState<StepLog[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0); // 0: idle, 1: typing, 2: thinking, 3: recommendations
  const [recommendationResult, setRecommendationResult] = useState<{ title: string; desc: string; citation: string } | null>(null);

  const presets = [
    {
      query: "What clauses have countries used for digital trade?",
      recommendation: {
        title: "Cross-Border Data Flows standard provision",
        desc: "Requires parties to allow cross-border transfer of information by electronic means when it is for the conduct of business, prohibiting data localization requirements.",
        citation: "USMCA Article 19.11 / DEPA Module 2"
      },
      logs: [
        { agent: 'Planner', msg: 'Parsing query: Digital Trade / Cross-border data rules.', type: 'info' },
        { agent: 'Treaty Agent', msg: 'Searching indices. Cross-referencing USMCA, CPTPP, and Singapore-Australia DEA.', type: 'info' },
        { agent: 'Clause Agent', msg: 'Extracting Article 19.11 (USMCA) and Module 2 (DEPA). Standardizing wording.', type: 'success' },
        { agent: 'Red-Team', msg: 'Flagging differences: DEPA contains broader consumer data protection exclusions.', type: 'warn' }
      ]
    },
    {
      query: "What are the risks in a semiconductor agreement?",
      recommendation: {
        title: "Supply Chain Resilience and Export Control Clause",
        desc: "Coordinates early warning systems for raw material bottlenecks (Gallium/Germanium) and standardizes security reviews on manufacturing equipment exports.",
        citation: "EU-US TTC Semiconductor Agreement, Section 3"
      },
      logs: [
        { agent: 'Planner', msg: 'Parsing query: Semiconductor supply chain risk vectors.', type: 'info' },
        { agent: 'Scenario Agent', msg: 'Running supply disruption models on neon gas and wafer exports.', type: 'info' },
        { agent: 'Red-Team', msg: 'Alert: Section 3 poses trade dependency risks on sovereign manufacturing equipment.', type: 'warn' },
        { agent: 'Clause Agent', msg: 'Isolating bilateral dispute arbitration options.', type: 'success' }
      ]
    },
    {
      query: "Show precedents involving hydrogen partnerships.",
      recommendation: {
        title: "Bilateral Hydrogen Import/Export Framework",
        desc: "Defines standards for green hydrogen certification, guarantees zero-tariff maritime corridors for liquid carriers, and shares technology research costs.",
        citation: "Germany-Australia Hydrogen Accord (2021) / Japan-Australia Partnership"
      },
      logs: [
        { agent: 'Planner', msg: 'Parsing query: Green Hydrogen bilateral frameworks.', type: 'info' },
        { agent: 'Treaty Agent', msg: 'Retrieving Germany-Australia HyGate accord and Japan-Australia clean energy corridors.', type: 'info' },
        { agent: 'Translation Agent', msg: 'Analyzing German Gazette regulatory wording regarding subsidies.', type: 'success' },
        { agent: 'Scenario Agent', msg: 'Simulating tariff relief schedules. High probability of alignment.', type: 'success' }
      ]
    }
  ];

  const handlePresetClick = (presetIdx: number) => {
    const preset = presets[presetIdx];
    setQueryInput('');
    setIsTyping(true);
    setStepLogs([]);
    setRecommendationResult(null);
    setActiveStep(1);

    // Simulate typing
    let charIdx = 0;
    const txt = preset.query;
    const typingTimer = setInterval(() => {
      setQueryInput((prev) => prev + txt.charAt(charIdx));
      charIdx++;
      if (charIdx >= txt.length) {
        clearInterval(typingTimer);
        setIsTyping(false);
        setActiveStep(2);
        triggerThinking(preset);
      }
    }, 20);
  };

  const triggerThinking = (preset: typeof presets[0]) => {
    let logIdx = 0;
    const logTimer = setInterval(() => {
      setStepLogs((prev) => [...prev, preset.logs[logIdx] as StepLog]);
      logIdx++;
      if (logIdx >= preset.logs.length) {
        clearInterval(logTimer);
        setActiveStep(3);
        setRecommendationResult(preset.recommendation);
      }
    }, 1000);
  };

  const resetPlayground = () => {
    setQueryInput('');
    setStepLogs([]);
    setActiveStep(0);
    setRecommendationResult(null);
  };

  useEffect(() => {
    if (!active) {
      resetPlayground();
    }
  }, [active]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div>
        <div className="badge">
          <Search size={14} style={{ marginRight: '0.4rem' }} /> Natural Language Interface
        </div>
        <h2 className="slide-title">User <span>Experience</span></h2>
        <p className="slide-subtitle">Natural Language Workspace. Translate complex legal queries into organized multi-agent reports</p>
      </div>

      {/* Grid */}
      <div className="grid-2" style={{ flex: 1, maxHeight: '550px', alignItems: 'stretch' }}>
        
        {/* Left Side: Preset query selector & Input mockup */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'center' }}>
          
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', fontFamily: 'var(--display-font)' }}>
              Select Example Queries
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {presets.map((pr, idx) => (
                <button
                  key={idx}
                  onClick={() => !isTyping && handlePresetClick(idx)}
                  disabled={isTyping}
                  style={{
                    padding: '0.8rem 1rem',
                    textAlign: 'left',
                    borderRadius: '8px',
                    border: '1px solid var(--card-border)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: 'var(--text-primary)',
                    cursor: isTyping ? 'not-allowed' : 'pointer',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--primary-font)',
                    transition: 'all var(--transition-fast)',
                  }}
                  className="interactive-source-item"
                >
                  "{pr.query}"
                </button>
              ))}
            </div>
          </div>

          {/* Search box Mockup */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#020617',
              border: '2px solid var(--card-border)',
              borderRadius: '12px',
              padding: '0.6rem 1rem',
              gap: '0.8rem'
            }}
          >
            <Search size={18} style={{ color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              readOnly 
              value={queryInput} 
              placeholder="Select a preset query above to search..." 
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                flex: 1,
                fontFamily: 'var(--primary-font)'
              }}
            />
            <button 
              style={{
                background: 'var(--accent)',
                border: 'none',
                borderRadius: '8px',
                padding: '0.4rem 0.8rem',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={14} />
            </button>
          </div>

        </div>

        {/* Right Side: Agent Workspace Mockup Logs and Recommendation Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'center' }}>
          
          {/* Agent workspace status */}
          <div className="glass-card" style={{ padding: '1.5rem', flex: 1, maxHeight: '250px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.4rem', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Cpu size={14} /> Agent Workspace Logs
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {activeStep === 0 ? 'Ready' : activeStep === 1 ? 'Typing...' : activeStep === 2 ? 'Analyzing...' : 'Finished'}
              </span>
            </div>

            <div 
              className="dark-terminal"
              style={{
                fontFamily: 'Courier New, monospace',
                overflowY: 'auto',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                padding: '0.8rem',
                borderRadius: '8px'
              }}
            >
              {activeStep === 0 && (
                <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic', textAlign: 'center', marginTop: '2rem' }}>
                  Awaiting query search selection...
                </div>
              )}
              {activeStep === 1 && (
                <div style={{ color: 'var(--text-secondary)' }}>
                  ➔ Keyboard input triggered. Typing query...
                </div>
              )}
              {stepLogs.map((log, idx) => {
                let color = 'var(--text-primary)';
                if (log.type === 'success') color = '#10b981';
                else if (log.type === 'warn') color = 'var(--accent)';
                
                return (
                  <div key={idx} style={{ color, animation: 'slideEnterRight 0.2s forwards' }}>
                    <strong style={{ color: 'var(--text-secondary)' }}>[{log.agent}]:</strong> {log.msg}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Result card */}
          {recommendationResult ? (
            <div 
              className="glass-card" 
              style={{ 
                padding: '1.2rem', 
                border: '2px solid var(--success)', 
                background: 'rgba(16, 185, 129, 0.05)',
                animation: 'slideEnterRight 0.3s forwards'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--success)', textTransform: 'uppercase' }}>
                  Recommended Treaty Clause Precedent
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Citation: {recommendationResult.citation}
                </span>
              </div>
              <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.3rem', fontFamily: 'var(--display-font)' }}>
                {recommendationResult.title}
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                "{recommendationResult.desc}"
              </p>
            </div>
          ) : (
            <div style={{ height: '90px', border: '1px dashed var(--card-border)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic' }}>
              Select a preset to view recommendation recommendations...
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
