import React, { useState } from 'react';
import { ShieldAlert, Server, Lock, Users, FileSpreadsheet, EyeOff, Radio } from 'lucide-react';

interface SlideProps {
  active: boolean;
}

export const Slide10Security: React.FC<SlideProps> = ({ active }) => {
  const [deployMode, setDeployMode] = useState<'cloud' | 'airgap'>('cloud');
  const [activeDetail, setActiveDetail] = useState<string>('enc');

  const securityDetails: Record<string, { title: string; desc: string; icon: React.ReactNode }> = {
    enc: {
      title: "🔒 TLS 1.3 & AES-256 Encryption",
      desc: "All database tables, vector indexes, and transient transit packets are encrypted at rest and in motion. System keys are rotated using hardware security modules (HSM).",
      icon: <Lock size={20} />
    },
    prem: {
      title: "🏛 On-Prem Hardware Support",
      desc: "Deployable directly on sovereign rack servers. Zero data packages leave the sovereign perimeter, eliminating external SaaS API vulnerabilities completely.",
      icon: <Server size={20} />
    },
    rbac: {
      title: "👥 Role-Based Access Control",
      desc: "Integrates with national directory standards (Active Directory / LDAP). Restricts agent outputs and document search indices based on security clearance levels.",
      icon: <Users size={20} />
    },
    audit: {
      title: "📋 Immutable Audit Trails",
      desc: "Cryptographically logs every prompt, agent call, and document read to an internal write-once read-many ledger, preventing tampering.",
      icon: <FileSpreadsheet size={20} />
    },
    zero: {
      title: "🛡 Zero Trust Identity Network",
      desc: "Every worker node must constantly authenticate credentials. Transient containers destroy memory buffers immediately upon query completion.",
      icon: <ShieldAlert size={20} />
    }
  };

  const activeSec = securityDetails[activeDetail];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div>
        <div className="badge">
          <ShieldAlert size={14} style={{ marginRight: '0.4rem' }} /> Geopolitical Security
        </div>
        <h2 className="slide-title">Security & <span>Sovereignty</span></h2>
        <p className="slide-subtitle">Architected for diplomatic grade confidentiality, with support for fully disconnected installations</p>
      </div>

      {/* Grid */}
      <div className="grid-2" style={{ flex: 1, maxHeight: '680px', alignItems: 'stretch' }}>
        
        {/* Left Side: Toggleable SVG Schematic */}
        <div 
          className="glass-card" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '1.5rem',
            background: 'rgba(10, 20, 36, 0.4)',
            position: 'relative'
          }}
        >
          {/* Toggle Switches */}
          <div style={{ display: 'flex', gap: '0.5rem', zIndex: 10, width: '100%', maxWidth: '380px' }}>
            <button
              onClick={() => setDeployMode('cloud')}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                fontSize: '0.8rem',
                borderRadius: '8px 0 0 8px',
                border: '1px solid var(--card-border)',
                cursor: 'pointer',
                background: deployMode === 'cloud' ? 'var(--accent)' : 'var(--btn-bg)',
                color: '#fff',
                fontWeight: 600,
                fontFamily: 'var(--display-font)',
              }}
            >
              Government Cloud
            </button>
            <button
              onClick={() => setDeployMode('airgap')}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                fontSize: '0.8rem',
                borderRadius: '0 8px 8px 0',
                border: '1px solid var(--card-border)',
                cursor: 'pointer',
                background: deployMode === 'airgap' ? 'var(--accent)' : 'var(--btn-bg)',
                color: '#fff',
                fontWeight: 600,
                fontFamily: 'var(--display-font)',
              }}
            >
              Air-Gapped Data Center
            </button>
          </div>

          {/* SVG Diagram */}
          <svg viewBox="0 0 450 320" style={{ width: '100%', height: '100%', maxWidth: '100%', flex: 1, marginTop: '1rem' }}>
            
            {/* Background Shield Outline in Air-Gapped Mode */}
            {deployMode === 'airgap' && (
              <rect
                x="80" y="80" width="290" height="210" rx="16"
                fill="none" stroke="var(--danger)" strokeWidth="2.5" strokeDasharray="6, 4"
                opacity="0.6"
              />
            )}

            {/* External Connections line (cloud has active, airgap has severed connection) */}
            <path
              d="M 225 10 L 225 100"
              stroke={deployMode === 'cloud' ? 'var(--accent)' : 'var(--danger)'}
              strokeWidth="2.5"
              strokeDasharray={deployMode === 'cloud' ? 'none' : '4, 4'}
              opacity={deployMode === 'cloud' ? 0.7 : 0.2}
            />
            
            {/* Deployment environment box */}
            <g>
              <rect
                x="120" y="80" width="210" height="50" rx="10"
                fill="var(--bg-secondary)"
                stroke={deployMode === 'cloud' ? 'var(--accent)' : 'var(--danger)'}
                strokeWidth="2"
              />
              <text x="225" y="105" textAnchor="middle" fill="var(--text-primary)" style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--display-font)' }}>
                {deployMode === 'cloud' ? '🏛 Govt Sovereign Cloud' : '🛡 Air-Gapped Data Center'}
              </text>
              <text x="225" y="122" textAnchor="middle" fill="var(--text-secondary)" style={{ fontSize: '0.62rem', fontFamily: 'var(--primary-font)' }}>
                {deployMode === 'cloud' ? 'Encrypted VPC Tunnels' : 'Physical Network Isolation'}
              </text>
            </g>

            {/* Flow to Platform */}
            <line
              x1="225" y1="130"
              x2="225" y2="180"
              stroke="var(--card-border)"
              strokeWidth="2"
            />

            {/* DIPLO.AI Box */}
            <g>
              <rect
                x="140" y="180" width="170" height="42" rx="8"
                fill="var(--btn-bg)"
                stroke="var(--card-border)"
                strokeWidth="1.5"
              />
              <text x="225" y="206" textAnchor="middle" fill="var(--text-primary)" style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--display-font)' }}>
                DIPLO.AI Platform
              </text>
            </g>

            {/* Flow to Access Level */}
            <line
              x1="225" y1="222"
              x2="225" y2="260"
              stroke="var(--card-border)"
              strokeWidth="2"
            />

            {/* Secure AI agents / RBAC */}
            <g>
              <rect
                x="110" y="260" width="230" height="40" rx="20"
                fill="var(--bg-secondary)"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <text x="225" y="284" textAnchor="middle" fill="var(--accent)" style={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--display-font)' }}>
                🔒 Secure Agents & RBAC Guard
              </text>
            </g>

            {/* Severed Signal Sign in Air-Gapped */}
            {deployMode === 'airgap' && (
              <g transform="translate(225, 30)">
                <circle r="18" fill="var(--danger)" opacity="0.15" />
                <path d="M -8 -8 L 8 8 M 8 -8 L -8 8" stroke="var(--danger)" strokeWidth="3" />
                <text x="32" y="5" fill="var(--danger)" style={{ fontSize: '0.6rem', fontWeight: 700 }}>ISOLATED</text>
              </g>
            )}
          </svg>

          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {deployMode === 'cloud' 
              ? "Sovereign Cloud: Shared VPC nodes run within secured domestic data centers." 
              : "Air-Gapped: Totally disconnected. No internet ports, updates via encrypted physical keys."}
          </span>
        </div>

        {/* Right Side: Interactive security icons & definitions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'center' }}>
          
          {/* Security feature list */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: 'var(--display-font)' }}>
              Core Infrastructure Audits
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { id: 'enc', label: 'Encryption', desc: 'TLS 1.3 & AES-256 parameters' },
                { id: 'prem', label: 'On-Premise', desc: 'Air-gap hardware installations' },
                { id: 'rbac', label: 'RBAC Access', desc: 'Directory permissions controls' },
                { id: 'audit', label: 'Audit Trails', desc: 'Cryptographically sealed ledgers' },
                { id: 'zero', label: 'Zero Trust', desc: 'Strict sandbox containment' }
              ].map((sec) => (
                <div
                  key={sec.id}
                  onClick={() => setActiveDetail(sec.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.8rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--card-border)',
                    background: activeDetail === sec.id ? 'var(--btn-hover)' : 'rgba(255, 255, 255, 0.01)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    flexWrap: 'wrap',
                    gap: '0.4rem'
                  }}
                  className="interactive-source-item"
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {sec.label}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {sec.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Details drawer box */}
          <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(217, 119, 6, 0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>
              {activeSec.icon}
              <h4 style={{ fontSize: '1.05rem', fontFamily: 'var(--display-font)', color: 'var(--text-primary)' }}>
                {activeSec.title.substring(2)}
              </h4>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {activeSec.desc}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
