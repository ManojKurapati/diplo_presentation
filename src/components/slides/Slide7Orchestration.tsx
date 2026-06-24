import React, { useState, useEffect } from 'react';
import { Network, Play, RotateCcw, Cpu, Shuffle, Layers, Eye } from 'lucide-react';

interface SlideProps {
  active: boolean;
}

export const Slide7Orchestration: React.FC<SlideProps> = ({ active }) => {
  const [step, setStep] = useState<number>(0); // 0: Idle, 1: Planning, 2: Parallel Agents, 3: Synthesis, 4: Human Review
  const [logs, setLogs] = useState<string[]>(['System idle. Ready for orchestration cycle.']);

  const runCycle = () => {
    setStep(1);
    setLogs(['User Query: Review Indo-Pacific Digital Trade Agreement draft.', 'Planner Agent: dissecting draft and mapping subtasks...']);

    // Step 2: Parallel Agents after 1.5s
    setTimeout(() => {
      setStep(2);
      setLogs((prev) => [
        ...prev,
        'Planner Agent: Dispatching subtasks to specialized nodes.',
        'Monitoring Agent: Scanning RSS for regional trade sentiment...',
        'Treaty Agent: Comparing clause drafts with 2018 Trans-Pacific agreements...',
        'Clause Agent: Extracting jurisdiction rules and exceptions...',
        'Scenario Agent: Modeling tariff changes on supply chains...',
        'Translation Agent: Analyzing Chinese and Japanese document variants...'
      ]);
    }, 2000);

    // Step 3: Synthesis after 5s
    setTimeout(() => {
      setStep(3);
      setLogs((prev) => [
        ...prev,
        'All agents completed tasks. Consolidating outputs.',
        'Synthesis Agent: Merging precedent matches, risks, and translations into single review file...'
      ]);
    }, 5500);

    // Step 4: Human review after 8s
    setTimeout(() => {
      setStep(4);
      setLogs((prev) => [
        ...prev,
        'Orchestration complete.',
        'System: Output locked, awaiting Human Diplomat approval...'
      ]);
    }, 8500);
  };

  const resetCycle = () => {
    setStep(0);
    setLogs(['System idle. Ready for orchestration cycle.']);
  };

  useEffect(() => {
    if (!active) {
      resetCycle();
    }
  }, [active]);

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return { title: 'Step 1: Planner Agent Analysis', desc: 'Dissects query parameters into discrete tasks and builds dependency graphs for worker execution.' };
      case 2:
        return { title: 'Step 2: Parallel Worker Agents', desc: 'Specialized agents process data streams, treaties, legal clauses, and foreign languages concurrently.' };
      case 3:
        return { title: 'Step 3: Synthesis Agent Compilation', desc: 'Combines findings, aggregates traceable citations, resolves conflicts, and structures a coherent summary.' };
      case 4:
        return { title: 'Step 4: Human Verification & Veto', desc: 'Diplomat reviews recommendations and raw evidence side-by-side, retains sovereignty, and commits decisions.' };
      default:
        return { title: 'Orchestration Cycle Stopped', desc: 'Click "Run Orchestration Cycle" to watch the multi-agent collaboration lifecycle in real-time.' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div>
        <div className="badge">
          <Network size={14} style={{ marginRight: '0.4rem' }} /> Multi-Agent Orchestration
        </div>
        <h2 className="slide-title">Multi-Agent <span>Orchestration</span></h2>
        <p className="slide-subtitle">Workflow control: How Planner, Worker, and Synthesis agents coordinate queries</p>
      </div>

      {/* Grid */}
      <div className="grid-2" style={{ flex: 1, maxHeight: '680px', alignItems: 'stretch' }}>
        
        {/* Left Side: The Flowchart Canvas */}
        <div 
          className="glass-card" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '1.5rem',
            background: 'rgba(10, 20, 36, 0.4)',
            position: 'relative'
          }}
        >
          <svg viewBox="0 0 500 480" style={{ width: '100%', height: '100%', maxWidth: '100%' }}>
            
            {/* CONNECTIONS (SVGs) */}
            {/* Planner to worker node channels */}
            {[80, 165, 250, 335, 420].map((x, idx) => (
              <g key={`path1-${idx}`}>
                <path
                  d={`M 250 80 Q 250 120 ${x} 120 L ${x} 190`}
                  className={step === 1 ? "flow-line-active" : step >= 2 ? "flow-line" : "flow-line"}
                  style={{ opacity: step >= 1 ? 0.8 : 0.15 }}
                />
                {step === 1 && (
                  <circle r="4" fill="var(--accent)">
                    <animateMotion
                      path={`M 250 80 Q 250 120 ${x} 120 L ${x} 190`}
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            ))}

            {/* Worker nodes to Synthesis */}
            {[80, 165, 250, 335, 420].map((x, idx) => (
              <g key={`path2-${idx}`}>
                <path
                  d={`M ${x} 240 L ${x} 290 Q 250 290 250 330`}
                  className={step === 2 ? "flow-line-active" : step >= 3 ? "flow-line" : "flow-line"}
                  style={{ opacity: step >= 2 ? 0.8 : 0.15 }}
                />
                {step === 2 && (
                  <circle r="4" fill="var(--accent)">
                    <animateMotion
                      path={`M ${x} 240 L ${x} 290 Q 250 290 250 330`}
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            ))}

            {/* Synthesis to Human */}
            <path
              d="M 250 370 L 250 410"
              className={step === 3 ? "flow-line-active" : step >= 4 ? "flow-line" : "flow-line"}
              style={{ opacity: step >= 3 ? 0.8 : 0.15 }}
            />
            {step === 3 && (
              <circle r="4" fill="var(--accent)">
                <animateMotion
                  path="M 250 370 L 250 410"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* NODES (Boxes) */}
            {/* Planner Agent */}
            <g>
              <rect
                x="170" y="40" width="160" height="40" rx="8"
                fill={step === 1 ? 'var(--accent)' : 'var(--bg-secondary)'}
                stroke={step === 1 ? '#fff' : 'var(--card-border)'}
                strokeWidth={step === 1 ? 2.5 : 1}
                style={{ transition: 'all 0.4s' }}
              />
              <text x="250" y="65" textAnchor="middle" fill={step === 1 ? '#fff' : 'var(--text-primary)'} style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--display-font)' }}>
                📋 Planner Agent
              </text>
            </g>

            {/* Worker Nodes (Parallel Row) */}
            {[
              { id: 'mon', name: 'Monitor', emoji: '👁️', x: 80 },
              { id: 'try', name: 'Treaty', emoji: '📜', x: 165 },
              { id: 'cls', name: 'Clause', emoji: '⚖️', x: 250 },
              { id: 'sce', name: 'Scenario', emoji: '🔮', x: 335 },
              { id: 'trn', name: 'Translation', emoji: '🌍', x: 420 }
            ].map((node) => {
              const isProcessing = step === 2;
              return (
                <g key={node.id}>
                  <rect
                    x={node.x - 38} y="190" width="76" height="50" rx="6"
                    fill={isProcessing ? 'var(--accent)' : 'var(--bg-secondary)'}
                    stroke={isProcessing ? '#fff' : 'var(--card-border)'}
                    strokeWidth={isProcessing ? 2 : 1}
                    style={{ transition: 'all 0.4s' }}
                  />
                  <text x={node.x} y="212" textAnchor="middle" style={{ fontSize: '1.2rem', userSelect: 'none' }}>
                    {node.emoji}
                  </text>
                  <text x={node.x} y="230" textAnchor="middle" fill={isProcessing ? '#fff' : 'var(--text-secondary)'} style={{ fontSize: '0.62rem', fontWeight: 600, fontFamily: 'var(--display-font)' }}>
                    {node.name}
                  </text>
                </g>
              );
            })}

            {/* Synthesis Agent */}
            <g>
              <rect
                x="170" y="330" width="160" height="40" rx="8"
                fill={step === 3 ? 'var(--accent)' : 'var(--bg-secondary)'}
                stroke={step === 3 ? '#fff' : 'var(--card-border)'}
                strokeWidth={step === 3 ? 2.5 : 1}
                style={{ transition: 'all 0.4s' }}
              />
              <text x="250" y="355" textAnchor="middle" fill={step === 3 ? '#fff' : 'var(--text-primary)'} style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--display-font)' }}>
                🧬 Synthesis Agent
              </text>
            </g>

            {/* Human Diplomat Box */}
            <g>
              <rect
                x="185" y="410" width="130" height="35" rx="18"
                fill={step === 4 ? 'var(--success)' : 'var(--bg-secondary)'}
                stroke={step === 4 ? '#fff' : 'var(--card-border)'}
                strokeWidth={step === 4 ? 2.5 : 1.5}
                className={step === 4 ? "animate-pulse-node" : ""}
                style={{ transition: 'all 0.4s' }}
              />
              <text x="250" y="432" textAnchor="middle" fill={step === 4 ? '#fff' : 'var(--text-primary)'} style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--display-font)' }}>
                👤 Human Veto
              </text>
            </g>
          </svg>
        </div>

        {/* Right Side: Step descriptions & In-memory log console */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'center' }}>
          
          {/* Dynamic description box */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--accent)', fontFamily: 'var(--display-font)', marginBottom: '0.5rem' }}>
              {getStepDescription().title}
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              {getStepDescription().desc}
            </p>
          </div>

          {/* Real-time system logs console */}
          <div className="glass-card console-card" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.4rem', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Orchestration Logs</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Cycle status: {step > 0 ? `${Math.round((step/4)*100)}%` : 'Idle'}</span>
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
              {logs.map((log, idx) => (
                <div key={idx} style={{ opacity: idx === logs.length - 1 ? 1 : 0.6, animation: 'slideEnterRight 0.2s forwards' }}>
                  ➔ {log}
                </div>
              ))}
            </div>
          </div>

          {/* Action triggers */}
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            {step === 0 || step === 4 ? (
              <button className="nav-btn" onClick={runCycle} style={{ flex: '1 1 auto', justifyContent: 'center', background: 'var(--accent)', color: '#fff', minWidth: '180px' }}>
                <Play size={16} /> Run Orchestration Cycle
              </button>
            ) : (
              <div 
                style={{ 
                  flex: '1 1 auto', 
                  justifyContent: 'center', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  background: 'var(--btn-bg)', 
                  border: '1px solid var(--card-border)',
                  color: 'var(--text-secondary)',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  minHeight: '42px',
                  minWidth: '180px'
                }}
              >
                <Cpu size={16} className="animate-spin-slow" /> Running agents... please wait
              </div>
            )}
            <button className="nav-btn" onClick={resetCycle} disabled={step === 0} style={{ flex: '1 1 auto', justifyContent: 'center' }}>
              <RotateCcw size={16} /> Reset
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
