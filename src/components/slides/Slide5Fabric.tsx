import React, { useState } from 'react';
import { Layers, Database, Compass, Award, ExternalLink, ShieldCheck } from 'lucide-react';

interface SlideProps {
  active: boolean;
}

interface Node {
  id: string;
  label: string;
  type: 'COUNTRY' | 'AGREEMENT';
  x: number;
  y: number;
  details: string;
}

interface Edge {
  source: string;
  target: string;
  label: string;
}

export const Slide5Fabric: React.FC<SlideProps> = ({ active }) => {
  const [selectedNode, setSelectedNode] = useState<string>('USA');
  const [dbLayer, setDbLayer] = useState<'all' | 'vector' | 'graph' | 'metadata'>('all');

  const nodes: Node[] = [
    { id: 'USA', label: '🇺🇸 United States', type: 'COUNTRY', x: 120, y: 150, details: 'Active in 24 Indo-Pacific pacts, Digital Trade alignments, and semiconductor alliances.' },
    { id: 'EU', label: '🇪🇺 European Union', type: 'COUNTRY', x: 280, y: 110, details: 'Pioneered General Data Protection regulations, actively drafting green tech hydrogen pacts.' },
    { id: 'JPN', label: '🇯🇵 Japan', type: 'COUNTRY', x: 420, y: 180, details: 'Key coordinator in regional semiconductor supply chain resiliency treaties.' },
    { id: 'CHN', label: '🇨🇳 China', type: 'COUNTRY', x: 380, y: 350, details: 'Signatory to regional economic coalitions and bilateral infrastructure accords.' },
    { id: 'IND', label: '🇮🇳 India', type: 'COUNTRY', x: 180, y: 360, details: 'Leading partner in multi-lateral South Asia digital connectivity corridors.' },
    
    // Agreements
    { id: 'STA', label: 'Semiconductor Alliance', type: 'AGREEMENT', x: 250, y: 220, details: 'Restricts supply vulnerabilities. Signed by USA, JPN, and EU.' },
    { id: 'DPA', label: 'Digital Trade Accord', type: 'AGREEMENT', x: 220, y: 280, details: 'Establishes cross-border data transfer policies between EU, USA, and IND.' },
    { id: 'GCT', label: 'Green Tech Treaty', type: 'AGREEMENT', x: 310, y: 260, details: 'Hydrogen energy partnerships and zero-emission goals. EU, JPN, CHN, IND participate.' },
  ];

  const edges: Edge[] = [
    { source: 'USA', target: 'STA', label: 'Founding Member' },
    { source: 'JPN', target: 'STA', label: 'Supply Partner' },
    { source: 'EU', target: 'STA', label: 'Equipment Partner' },
    
    { source: 'USA', target: 'DPA', label: 'Signatory' },
    { source: 'EU', target: 'DPA', label: 'Regulatory lead' },
    { source: 'IND', target: 'DPA', label: 'Observer status' },

    { source: 'EU', target: 'GCT', label: 'Lead architect' },
    { source: 'JPN', target: 'GCT', label: 'Technology partner' },
    { source: 'CHN', target: 'GCT', label: 'Signatory' },
    { source: 'IND', target: 'GCT', label: 'Co-sponsor' },
  ];

  const handleNodeClick = (id: string) => {
    setSelectedNode(id);
  };

  const getActiveEdges = () => {
    return edges.filter(e => e.source === selectedNode || e.target === selectedNode);
  };

  const selectedNodeData = nodes.find(n => n.id === selectedNode);
  const activeEdges = getActiveEdges();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div>
        <div className="badge">
          <Layers size={14} style={{ marginRight: '0.4rem' }} /> Geopolitical Memory Layers
        </div>
        <h2 className="slide-title">Knowledge <span>Fabric</span></h2>
        <p className="slide-subtitle">A multi-dimensional representation of sovereign relationships and legal terms</p>
      </div>

      {/* Grid */}
      <div className="grid-2" style={{ flex: 1, maxHeight: '550px', alignItems: 'stretch' }}>
        
        {/* Left: Network Graph Display */}
        <div 
          className="glass-card" 
          style={{ 
            position: 'relative', 
            background: 'rgba(10, 20, 36, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            overflow: 'hidden'
          }}
        >
          {/* Overlay DB layers indicator */}
          <div style={{ position: 'absolute', top: '1.2rem', left: '1.2rem', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
            {['all', 'vector', 'graph', 'metadata'].map((layer) => (
              <button
                key={layer}
                onClick={() => setDbLayer(layer as any)}
                style={{
                  padding: '0.3rem 0.7rem',
                  fontSize: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid var(--card-border)',
                  cursor: 'pointer',
                  background: dbLayer === layer ? 'var(--accent)' : 'var(--btn-bg)',
                  color: '#fff',
                  fontFamily: 'var(--display-font)',
                  textTransform: 'capitalize',
                }}
              >
                {layer}
              </button>
            ))}
          </div>

          <svg viewBox="0 0 500 450" style={{ width: '100%', height: '100%' }}>
            {/* Draw Links */}
            {edges.map((edge, idx) => {
              const srcNode = nodes.find(n => n.id === edge.source);
              const tgtNode = nodes.find(n => n.id === edge.target);
              if (!srcNode || !tgtNode) return null;

              const isActive = selectedNode === edge.source || selectedNode === edge.target;
              
              // Apply db layer visual filters
              let strokeOpacity = 0.2;
              let strokeColor = 'var(--text-secondary)';
              if (dbLayer === 'graph') {
                strokeColor = 'var(--accent)';
                strokeOpacity = isActive ? 0.9 : 0.4;
              } else if (dbLayer === 'vector') {
                strokeColor = 'var(--success)';
                strokeOpacity = isActive ? 0.8 : 0.2;
              } else if (dbLayer === 'metadata') {
                strokeColor = '#a855f7';
                strokeOpacity = isActive ? 0.8 : 0.2;
              } else {
                strokeOpacity = isActive ? 0.8 : 0.25;
                if (isActive) strokeColor = 'var(--accent)';
              }

              return (
                <g key={`edge-${idx}`}>
                  <line
                    x1={srcNode.x} y1={srcNode.y}
                    x2={tgtNode.x} y2={tgtNode.y}
                    stroke={strokeColor}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    opacity={strokeOpacity}
                    style={{ transition: 'all 0.4s' }}
                  />
                  {isActive && (
                    <text
                      x={(srcNode.x + tgtNode.x) / 2}
                      y={(srcNode.y + tgtNode.y) / 2 - 6}
                      fill="var(--text-secondary)"
                      textAnchor="middle"
                      style={{ fontSize: '0.62rem', fontFamily: 'var(--display-font)', background: 'var(--bg-primary)' }}
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Draw Nodes */}
            {nodes.map((node) => {
              const isSelected = selectedNode === node.id;
              const isLinked = edges.some(e => (e.source === selectedNode && e.target === node.id) || (e.target === selectedNode && e.source === node.id));
              
              let fill = 'var(--bg-secondary)';
              if (isSelected) fill = 'var(--accent)';
              else if (isLinked) fill = 'var(--btn-hover)';

              let stroke = 'var(--card-border)';
              if (isSelected) stroke = '#fff';
              else if (isLinked) stroke = 'var(--accent)';

              const r = node.type === 'COUNTRY' ? 22 : 18;

              return (
                <g 
                  key={node.id} 
                  transform={`translate(${node.x}, ${node.y})`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleNodeClick(node.id)}
                >
                  <circle
                    r={r}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isSelected ? 3 : 1.5}
                    style={{ transition: 'all 0.4s' }}
                    className={isSelected ? "animate-pulse-node" : "node-circle"}
                  />
                  <text
                    textAnchor="middle"
                    y={5}
                    style={{ 
                      fontSize: node.type === 'COUNTRY' ? '1.1rem' : '0.9rem',
                      userSelect: 'none'
                    }}
                  >
                    {node.type === 'COUNTRY' ? node.label.split(' ')[0] : '📜'}
                  </text>
                  <text
                    y={node.type === 'COUNTRY' ? 38 : 34}
                    textAnchor="middle"
                    fill={isSelected ? 'var(--accent)' : 'var(--text-primary)'}
                    style={{ 
                      fontSize: '0.68rem', 
                      fontWeight: isSelected ? 700 : 500,
                      fontFamily: 'var(--display-font)',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {node.type === 'COUNTRY' ? node.label.split(' ')[1] : node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right: Technical Database breakdown and Info box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
          
          {/* Selected entity detail */}
          {selectedNodeData && (
            <div className="glass-card" style={{ padding: '1.8rem' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.05em' }}>
                Geopolitical Node Inspector
              </span>
              <h3 style={{ fontSize: '1.5rem', marginTop: '0.4rem', marginBottom: '0.8rem', fontFamily: 'var(--display-font)' }}>
                {selectedNodeData.label}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.2rem' }}>
                {selectedNodeData.details}
              </p>

              {/* Connected pacts summary */}
              <div>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Compass size={14} /> Connected Relationships:
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {activeEdges.length === 0 ? (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>No connections active</span>
                  ) : (
                    activeEdges.map((edge, i) => {
                      const relativeNode = edge.source === selectedNode ? edge.target : edge.source;
                      const relLabel = nodes.find(n => n.id === relativeNode)?.label || relativeNode;
                      return (
                        <span 
                          key={i}
                          style={{
                            fontSize: '0.75rem', padding: '0.3rem 0.6rem', borderRadius: '4px',
                            background: 'var(--btn-bg)', border: '1px solid var(--card-border)', color: 'var(--accent)'
                          }}
                        >
                          {edge.label} ➔ {relLabel}
                        </span>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Database Layer Explanations */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <Database size={16} /> Memory Architecture Layers
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem', borderBottom: '1px solid var(--grid-line)', opacity: dbLayer === 'all' || dbLayer === 'metadata' ? 1 : 0.4 }}>
                <span style={{ fontWeight: 600, color: '#a855f7' }}>1. Metadata DB (Postgres)</span>
                <span style={{ color: 'var(--text-secondary)' }}>Tracks dates, citations, and signees</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem', borderBottom: '1px solid var(--grid-line)', opacity: dbLayer === 'all' || dbLayer === 'vector' ? 1 : 0.4 }}>
                <span style={{ fontWeight: 600, color: 'var(--success)' }}>2. Vector DB (pgvector)</span>
                <span style={{ color: 'var(--text-secondary)' }}>Compares semantic clause intents</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem', opacity: dbLayer === 'all' || dbLayer === 'graph' ? 1 : 0.4 }}>
                <span style={{ fontWeight: 600, color: 'var(--accent)' }}>3. Graph DB (Geopolitical relations)</span>
                <span style={{ color: 'var(--text-secondary)' }}>Maps alliance connections & countries</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
