import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Eye, ShieldAlert, Check, HelpCircle, FileText } from 'lucide-react';

interface SlideProps {
  active: boolean;
}

export const Slide8Human: React.FC<SlideProps> = ({ active }) => {
  const [approvedState, setApprovedState] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
  const [activeCitation, setActiveCitation] = useState<string>('gatt');

  const citations: Record<string, { title: string; text: string; source: string }> = {
    gatt: {
      title: "GATT 1994 Article III:2",
      text: "National Treatment on Internal Taxation and Regulation: Products of the territory of any contracting party imported into the territory of any other contracting party shall not be subject, directly or indirectly, to internal taxes of any kind in excess of those applied to domestic products.",
      source: "WTO Treaty Repository Database"
    },
    usjpn: {
      title: "US-Japan Semiconductor Accord, Art. 4",
      text: "Bilateral Market Access Provisions: Ensuring reciprocal access to semiconductor patents, standardizing tariff exemptions on silicon components, and coordinating technology safeguards.",
      source: "Sovereign Treaty Database Archives"
    },
    euus: {
      title: "EU-US Safe Harbor Clause 14",
      text: "Data Sovereignty Exceptions: Establishes that national security requirements and law enforcement overrides supersede general data transfer protocols in cases of critical infrastructure safeguards.",
      source: "Federal Register Vol 94"
    }
  };

  const principles = [
    { label: 'Explainable', desc: 'Every recommendation includes a clear, step-by-step logic chain showing how the LLM agent reached its conclusion.' },
    { label: 'Traceable', desc: 'Matches terms to exact document paragraphs, volume numbers, and dates. No hallucinated precedents allowed.' },
    { label: 'Auditable', desc: 'Maintains immutable, air-gapped system logs of all intermediate worker prompts for administrative reviews.' },
    { label: 'Human Controlled', desc: 'The AI cannot sign agreements, execute commands, or send messages. All actions require a physical human key authorization.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div>
        <div className="badge">
          <ShieldCheck size={14} style={{ marginRight: '0.4rem' }} /> Verification Protocol
        </div>
        <h2 className="slide-title">Human-in-the-<span>Loop</span></h2>
        <p className="slide-subtitle">AI Assists. Humans Decide. Retaining sovereign control over critical statecraft choices</p>
      </div>

      {/* Main Grid */}
      <div className="grid-2" style={{ flex: 1, maxHeight: '550px', alignItems: 'stretch' }}>
        
        {/* Left Side: Mock Workspace Reasoning Trace */}
        <div className="glass-card dark-terminal" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--grid-line)', paddingBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>AGENT WORKSPACE</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>★ CRITICAL ALERT HIGHLIGHT</span>
          </div>

          {/* Proposal Summary */}
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700 }}>PROPOSED DRAFT SECTION (DIGITAL TRADE ARTICLE 7)</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', background: 'rgba(255, 255, 255, 0.03)', padding: '0.6rem', borderRadius: '6px', borderLeft: '3px solid var(--accent)', marginTop: '0.3rem' }}>
              "Each party shall allow cross-border transfer of information by electronic means... subject to security exceptions outlined in <span onClick={() => setActiveCitation('euus')} style={{ color: 'var(--accent)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}>[Safe Harbor Cl. 14]</span> and local tax rules of <span onClick={() => setActiveCitation('gatt')} style={{ color: 'var(--accent)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}>[GATT Art III:2]</span>."
            </div>
          </div>

          {/* Reasoning trace logs */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem', paddingRight: '0.5rem' }}>
            <div style={{ color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--success)', fontWeight: 700 }}>✔ Precedent Match:</span> Clause matches standard bilateral trade frameworks.
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--danger)', fontWeight: 700 }}>⚠ Tax Deviation Risk:</span> Draft references tax exemptions which might contradict national treatment policies. Cross-referenced <span onClick={() => setActiveCitation('gatt')} style={{ color: 'var(--accent)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}>[GATT Art III:2]</span> for compliance analysis.
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--success)', fontWeight: 700 }}>🔍 Supply Chain Match:</span> Micro-component clauses align with regional alliances, supporting <span onClick={() => setActiveCitation('usjpn')} style={{ color: 'var(--accent)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}>[US-Japan Accord Art. 4]</span>.
            </div>
          </div>

          {/* Dynamic Citation Inspector */}
          <div style={{ background: 'rgba(217, 119, 6, 0.05)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <FileText size={14} style={{ color: 'var(--accent)' }} />
              <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{citations[activeCitation].title}</strong>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.4' }}>
              "{citations[activeCitation].text}"
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--accent)', marginTop: '0.4rem', textAlign: 'right', fontWeight: 600 }}>
              Verified: {citations[activeCitation].source}
            </div>
          </div>
        </div>

        {/* Right Side: Approval Panel & Core Principles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
          
          {/* Decision panel card */}
          <div className="glass-card" style={{ padding: '1.8rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', fontFamily: 'var(--display-font)' }}>
              Sovereign Approval Layer
            </h3>
            
            {approvedState === 'PENDING' ? (
              <div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
                  Please verify the automated treaty citations. To finalize this draft and export to the State Department registry, authorize below:
                </p>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  <button 
                    className="nav-btn" 
                    onClick={() => setApprovedState('APPROVED')} 
                    style={{ flex: '1 1 auto', background: 'var(--success)', color: '#fff', border: 'none', justifyContent: 'center', minWidth: '130px' }}
                  >
                    <Check size={16} /> Approve & Sign
                  </button>
                  <button 
                    className="nav-btn" 
                    onClick={() => setApprovedState('REJECTED')} 
                    style={{ flex: '1 1 auto', background: 'var(--btn-bg)', border: '1px solid var(--danger)', color: 'var(--danger)', justifyContent: 'center', minWidth: '130px' }}
                  >
                    <ShieldAlert size={16} /> Flag Deviations
                  </button>
                </div>
              </div>
            ) : approvedState === 'APPROVED' ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', color: 'var(--success)', marginBottom: '0.3rem' }}>✓ APPROVED</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Draft verified, signed with GPG Key: 0x82FA... and committed to government registry.</div>
                <button onClick={() => setApprovedState('PENDING')} style={{ marginTop: '0.8rem', padding: '0.3rem 0.6rem', fontSize: '0.7rem', cursor: 'pointer', background: 'none', border: '1px solid var(--card-border)', color: 'var(--text-secondary)', borderRadius: '4px' }}>Reset Decision</button>
              </div>
            ) : (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', color: 'var(--danger)', marginBottom: '0.3rem' }}>⚠ FLAGGED</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Rejection note sent to Agent supervisor. Rerouting digital trade draft for audit.</div>
                <button onClick={() => setApprovedState('PENDING')} style={{ marginTop: '0.8rem', padding: '0.3rem 0.6rem', fontSize: '0.7rem', cursor: 'pointer', background: 'none', border: '1px solid var(--card-border)', color: 'var(--text-secondary)', borderRadius: '4px' }}>Reset Decision</button>
              </div>
            )}
          </div>

          {/* Key Principles Grid */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontFamily: 'var(--display-font)', marginBottom: '0.8rem' }}>
              Guiding Principles
            </h4>
            <div className="sub-grid-2" style={{ gap: '0.8rem' }}>
              {principles.map((pr, idx) => (
                <div 
                  key={idx} 
                  style={{
                    background: 'rgba(255, 255, 255, 0.01)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '8px',
                    padding: '0.7rem',
                  }}
                  className="interactive-principle"
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--display-font)' }}>
                    ✓ {pr.label}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.2rem', lineHeight: '1.3' }}>
                    {pr.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
