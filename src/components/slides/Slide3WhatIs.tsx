import React, { useState } from 'react';
import { Eye, Shield, Users, HelpCircle, Activity, Sparkles, CheckCircle } from 'lucide-react';

interface SlideProps {
  active: boolean;
}

interface AgentNode {
  id: string;
  name: string;
  icon: string;
  role: string;
  desc: string;
  angle: number; // For circular rendering coordinates
}

export const Slide3WhatIs: React.FC<SlideProps> = ({ active }) => {
  const [selectedAgent, setSelectedAgent] = useState<string>('supervisor');

  const agents: AgentNode[] = [
    { 
      id: 'monitoring', 
      name: 'Monitoring Agent', 
      icon: '👁️', 
      role: 'Continuous Observation', 
      desc: 'Monitors international news feeds, RSS feeds, and official government publications. Filters noise to focus on geopolitical events matching policy parameters.', 
      angle: 0 
    },
    { 
      id: 'treaty', 
      name: 'Treaty Agent', 
      icon: '📜', 
      role: 'Document Matching & Precedents', 
      desc: 'Indexes and compares thousands of historical treaties. Locates exact precedents, overlaps, or deviations in new draft agreements.', 
      angle: 60 
    },
    { 
      id: 'clause', 
      name: 'Clause Agent', 
      icon: '⚖️', 
      role: 'Granular Extraction', 
      desc: 'Parses legal files to analyze specific contract terms, definitions of jurisdiction, liabilities, and exceptions. Compares language variants.', 
      angle: 120 
    },
    { 
      id: 'scenario', 
      name: 'Scenario Agent', 
      icon: '🔮', 
      role: 'Impact & Game Theory Simulation', 
      desc: 'Simulates response vectors. Projects impact metrics when specific treaty terms are altered, running game-theory outcomes.', 
      angle: 180 
    },
    { 
      id: 'translation', 
      name: 'Translation Agent', 
      icon: '🌍', 
      role: 'Cross-Language Semantic Mapping', 
      desc: 'Translates high-stakes official documents in over 80 languages, preserving diplomatic nuance and legal definitions across jurisdictions.', 
      angle: 240 
    },
    { 
      id: 'redteam', 
      name: 'Red-Team Agent', 
      icon: '🛡️', 
      role: 'Bias & Vulnerability Testing', 
      desc: 'Challenges draft agreements by taking adversarial stances. Flags loop-holes, toxic clauses, and geopolitical risk factors before execution.', 
      angle: 300 
    },
  ];

  const agentMap: Record<string, { name: string; role: string; desc: string; icon: string }> = {
    human: {
      name: "Human Diplomat",
      role: "Strategic Approver & Auditor",
      desc: "Retains full sovereignty. Reviews reasoning chains, audits evidence sources, requests edits, and finalizes all agreements.",
      icon: "👤"
    },
    supervisor: {
      name: "Agent Supervisor",
      role: "Multi-Agent Coordinator",
      desc: "Orchestrates complex multi-agent inquiries. Divides general user queries into subtasks, triggers specialized agents in parallel, and merges outcomes.",
      icon: "🤖"
    }
  };

  const getAgentDetails = () => {
    if (selectedAgent === 'human' || selectedAgent === 'supervisor') {
      return agentMap[selectedAgent];
    }
    return agents.find(a => a.id === selectedAgent) || agentMap.supervisor;
  };

  // Coordinates on 500x500 svg box
  const getCoords = (angle: number, radius = 175) => {
    const radian = (angle * Math.PI) / 180;
    // Offset by 90deg to start top-right
    const x = 250 + radius * Math.cos(radian);
    const y = 260 + radius * Math.sin(radian);
    return { x, y };
  };

  const currentDetails = getAgentDetails();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div>
        <div className="badge">
          <Sparkles size={14} style={{ marginRight: '0.4rem' }} /> Operating Concept
        </div>
        <h2 className="slide-title">What is <span>DIPLO.AI</span>?</h2>
        <p className="slide-subtitle">A collaborative network of specialized AI agents working together under direct human command</p>
      </div>

      {/* Grid */}
      <div className="grid-2" style={{ flex: 1, maxHeight: '680px', alignItems: 'stretch' }}>
        
        {/* Left Side: Interactive SVG Hub-and-Spoke diagram */}
        <div 
          className="glass-card" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '1.5rem',
            position: 'relative',
            background: 'rgba(10, 20, 36, 0.4)'
          }}
        >
          <svg viewBox="0 0 500 500" style={{ width: '100%', height: '100%', maxWidth: '100%' }}>
            
            {/* SVG Path connections with active pulse */}
            {/* Human (250, 60) -> Supervisor (250, 260) */}
            <line 
              x1="250" y1="61" 
              x2="250" y2="260" 
              className={selectedAgent === 'human' || selectedAgent === 'supervisor' ? "flow-line-active" : "flow-line"} 
            />
            
            {/* Supervisor (250, 260) -> Spokes */}
            {agents.map((agent) => {
              const coords = getCoords(agent.angle);
              const isActive = selectedAgent === agent.id;
              return (
                <line 
                  key={`line-${agent.id}`}
                  x1="250" y1="260" 
                  x2={coords.x} y2={coords.y} 
                  className={isActive ? "flow-line-active" : "flow-line"} 
                />
              );
            })}

            {/* Render Spoke Node Circles */}
            {agents.map((agent) => {
              const coords = getCoords(agent.angle);
              const isActive = selectedAgent === agent.id;
              return (
                <g 
                  key={agent.id} 
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  <circle 
                    cx={coords.x} cy={coords.y} r="34" 
                    fill={isActive ? 'var(--accent)' : 'var(--bg-secondary)'} 
                    stroke={isActive ? '#fff' : 'var(--card-border)'} 
                    strokeWidth={isActive ? 3.5 : 1.5}
                    style={{ transition: 'all 0.3s' }}
                  />
                  <text 
                    x={coords.x} y={coords.y + 8} 
                    textAnchor="middle" 
                    style={{ fontSize: '1.7rem', userSelect: 'none' }}
                  >
                    {agent.icon}
                  </text>
                  <text 
                    x={coords.x} y={coords.y + 50} 
                    textAnchor="middle" 
                    fill={isActive ? 'var(--accent)' : 'var(--text-secondary)'}
                    style={{ fontSize: '0.85rem', fontWeight: isActive ? 700 : 500, fontFamily: 'var(--display-font)' }}
                  >
                    {agent.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}

            {/* Human Node (At the Top) */}
            <g style={{ cursor: 'pointer' }} onClick={() => setSelectedAgent('human')}>
              <rect 
                x="175" y="15" width="150" height="46" rx="23"
                fill={selectedAgent === 'human' ? 'var(--accent)' : 'var(--bg-secondary)'} 
                stroke={selectedAgent === 'human' ? '#fff' : 'var(--card-border)'}
                strokeWidth={selectedAgent === 'human' ? 3.5 : 1.5}
                style={{ transition: 'all 0.3s' }}
              />
              <text 
                x="250" y="44" textAnchor="middle" 
                fill={selectedAgent === 'human' ? '#fff' : 'var(--text-primary)'}
                style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--display-font)' }}
              >
                👤 Human
              </text>
            </g>

            {/* Central Supervisor Node */}
            <g style={{ cursor: 'pointer' }} onClick={() => setSelectedAgent('supervisor')}>
              <circle 
                cx="250" cy="260" r="54" 
                fill={selectedAgent === 'supervisor' ? 'var(--accent)' : 'var(--bg-secondary)'} 
                stroke={selectedAgent === 'supervisor' ? '#fff' : 'var(--card-border)'} 
                strokeWidth={selectedAgent === 'supervisor' ? 3.5 : 2}
                className="animate-pulse-node"
                style={{ transition: 'all 0.3s' }}
              />
              <text 
                x="250" y="268" textAnchor="middle" 
                style={{ fontSize: '2.5rem', userSelect: 'none' }}
              >
                🤖
              </text>
              <text 
                x="250" y="334" textAnchor="middle" 
                fill={selectedAgent === 'supervisor' ? 'var(--accent)' : 'var(--text-primary)'}
                style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'var(--display-font)' }}
              >
                Supervisor
              </text>
            </g>
          </svg>
        </div>

        {/* Right Side: Selected Node Feature Explanations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
          
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
              <div 
                style={{ 
                  fontSize: '2.5rem', 
                  background: 'var(--btn-bg)', 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--card-border)'
                }}
              >
                {currentDetails.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', fontFamily: 'var(--display-font)' }}>
                  {currentDetails.name}
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>
                  {currentDetails.role}
                </span>
              </div>
            </div>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {currentDetails.desc}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--success)', fontSize: '0.9rem', fontWeight: 600 }}>
              <CheckCircle size={16} /> Fully integrated in core multi-agent coordinator mesh.
            </div>
          </div>

          {/* System Taglines */}
          <div className="glass-card" style={{ padding: '1.2rem 1.8rem', background: 'rgba(16, 185, 129, 0.03)', borderColor: 'rgba(16, 185, 129, 0.15)' }}>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              💡 Not a simple Chatbot
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Unlike generic LLM chat windows, DIPLO.AI operates as a continuous background processor executing structured operations under human veto.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
