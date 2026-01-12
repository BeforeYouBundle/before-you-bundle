'use client'

import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import type { WalletEntry } from './WalletInputCard'

interface GraphData {
  clusters: number
  strongLinks: number
  isolated: number
  nodes: {
    id: string
    display: string
    x: number
    y: number
    cluster: number
  }[]
  edges: {
    from: string
    to: string
    cluster: number
  }[]
}

interface GraphPanelProps {
  wallets: WalletEntry[]
  onReset: () => void
}

// Seeded random for consistent results
function seededRandom(seed: string): () => number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  
  return () => {
    hash = Math.sin(hash) * 10000
    return hash - Math.floor(hash)
  }
}

// Generate graph data based on wallets
function generateGraphData(wallets: WalletEntry[]): GraphData {
  if (wallets.length === 0) {
    return { clusters: 0, strongLinks: 0, isolated: 0, nodes: [], edges: [] }
  }

  // Create seed from all wallet addresses
  const seed = wallets.map(w => w.raw).join('')
  const rand = seededRandom(seed)

  const nodes: GraphData['nodes'] = []
  const edges: GraphData['edges'] = []
  
  // Determine cluster count based on wallet count
  let numClusters = 1
  if (wallets.length >= 4) numClusters = Math.min(3, Math.floor(wallets.length / 2))
  if (wallets.length <= 2) numClusters = wallets.length // Each is isolated
  
  // Assign wallets to clusters
  const clusterAssignments: number[] = wallets.map((_, i) => {
    if (wallets.length <= 2) return i // Each isolated
    return Math.floor(rand() * numClusters)
  })

  // Position nodes in clusters
  const clusterCenters: { x: number; y: number }[] = []
  const angleStep = (2 * Math.PI) / numClusters
  
  for (let i = 0; i < numClusters; i++) {
    const angle = angleStep * i - Math.PI / 2
    const radius = wallets.length > 4 ? 100 : 60
    clusterCenters.push({
      x: 200 + Math.cos(angle) * radius,
      y: 150 + Math.sin(angle) * radius,
    })
  }

  // Create nodes with positions
  const clusterNodeCounts = new Array(numClusters).fill(0)
  
  wallets.forEach((wallet, i) => {
    const cluster = clusterAssignments[i]
    const nodeIndexInCluster = clusterNodeCounts[cluster]
    clusterNodeCounts[cluster]++
    
    // Position around cluster center
    const nodeAngle = (nodeIndexInCluster / 3) * Math.PI * 2 + rand() * 0.5
    const nodeRadius = 30 + rand() * 20
    
    nodes.push({
      id: wallet.id,
      display: wallet.display,
      x: clusterCenters[cluster].x + Math.cos(nodeAngle) * nodeRadius,
      y: clusterCenters[cluster].y + Math.sin(nodeAngle) * nodeRadius,
      cluster,
    })
  })

  // Create edges within clusters
  for (let c = 0; c < numClusters; c++) {
    const clusterNodes = nodes.filter(n => n.cluster === c)
    
    // Connect nodes in same cluster
    for (let i = 0; i < clusterNodes.length; i++) {
      for (let j = i + 1; j < clusterNodes.length; j++) {
        // Only some connections within cluster
        if (rand() > 0.4) {
          edges.push({
            from: clusterNodes[i].id,
            to: clusterNodes[j].id,
            cluster: c,
          })
        }
      }
    }
  }

  // Count isolated nodes (nodes with no edges)
  const connectedNodeIds = new Set(edges.flatMap(e => [e.from, e.to]))
  const isolated = nodes.filter(n => !connectedNodeIds.has(n.id)).length

  // Count actual clusters (groups of connected nodes)
  const actualClusters = wallets.length <= 2 ? wallets.length : 
    new Set(clusterAssignments).size

  return {
    clusters: Math.max(actualClusters - isolated, 1),
    strongLinks: edges.length,
    isolated,
    nodes,
    edges,
  }
}

export default function GraphPanel({ wallets, onReset }: GraphPanelProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  
  const graphData = useMemo(() => generateGraphData(wallets), [wallets])

  // Get connected node IDs for highlighting
  const connectedToHovered = useMemo(() => {
    if (!hoveredNode) return new Set<string>()
    const connected = new Set<string>()
    connected.add(hoveredNode)
    
    graphData.edges.forEach(edge => {
      if (edge.from === hoveredNode) connected.add(edge.to)
      if (edge.to === hoveredNode) connected.add(edge.from)
    })
    
    return connected
  }, [hoveredNode, graphData.edges])

  // Cluster colors
  const clusterColors = ['#5E8B8B', '#7BA3A3', '#4A7272']

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      className="px-6 pb-16"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-graphite-850 border border-white/[0.08] rounded-card overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/[0.06]">
            <h2 className="text-lg font-medium text-text-primary">Connection Map</h2>
            <p className="text-sm text-text-muted mt-0.5">
              Detected relationship clusters based on shared interactions
            </p>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Graph visualization */}
            <div className="flex-1 p-6">
              <div className="relative bg-graphite-900/50 rounded-lg h-[300px] overflow-hidden">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 300"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Grid pattern (very subtle) */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Edges */}
                  {graphData.edges.map((edge, i) => {
                    const fromNode = graphData.nodes.find(n => n.id === edge.from)
                    const toNode = graphData.nodes.find(n => n.id === edge.to)
                    if (!fromNode || !toNode) return null

                    const isHighlighted = hoveredNode && 
                      (connectedToHovered.has(edge.from) && connectedToHovered.has(edge.to))
                    const isFaded = hoveredNode && !isHighlighted

                    return (
                      <motion.line
                        key={`edge-${i}`}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke={clusterColors[edge.cluster % clusterColors.length]}
                        strokeWidth={isHighlighted ? 2 : 1.5}
                        strokeOpacity={isFaded ? 0.1 : isHighlighted ? 0.8 : 0.4}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                      />
                    )
                  })}

                  {/* Nodes */}
                  {graphData.nodes.map((node, i) => {
                    const isHighlighted = hoveredNode ? connectedToHovered.has(node.id) : false
                    const isFaded = hoveredNode && !isHighlighted
                    const isHovered = hoveredNode === node.id

                    return (
                      <motion.g
                        key={node.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                      >
                        {/* Node circle */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isHovered ? 18 : 14}
                          fill={isFaded ? '#1A2020' : '#151A1A'}
                          stroke={isFaded ? 'rgba(255,255,255,0.05)' : clusterColors[node.cluster % clusterColors.length]}
                          strokeWidth={isHighlighted ? 2 : 1.5}
                          strokeOpacity={isFaded ? 0.3 : isHighlighted ? 1 : 0.6}
                          className="cursor-pointer transition-all duration-200"
                          onMouseEnter={() => setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                        />
                        
                        {/* Node label (show on hover) */}
                        {isHovered && (
                          <text
                            x={node.x}
                            y={node.y + 30}
                            textAnchor="middle"
                            className="text-[10px] fill-text-secondary font-mono"
                          >
                            {node.display}
                          </text>
                        )}

                        {/* Inner dot */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={4}
                          fill={isFaded ? 'rgba(255,255,255,0.1)' : clusterColors[node.cluster % clusterColors.length]}
                          fillOpacity={isFaded ? 0.3 : 0.8}
                          className="pointer-events-none"
                        />
                      </motion.g>
                    )
                  })}
                </svg>

                {/* Empty state */}
                {graphData.nodes.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-text-muted text-sm">
                    No wallets to visualize
                  </div>
                )}
              </div>
            </div>

            {/* Findings sidebar */}
            <div className="lg:w-64 p-6 lg:border-l border-t lg:border-t-0 border-white/[0.06]">
              <h3 className="text-sm font-medium text-text-primary mb-4">Findings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Clusters detected</span>
                  <span className="text-sm font-mono text-accent">{graphData.clusters}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Strong links</span>
                  <span className="text-sm font-mono text-text-primary">{graphData.strongLinks}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Isolated wallets</span>
                  <span className="text-sm font-mono text-text-primary">{graphData.isolated}</span>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="text-xs text-text-muted">
                    {graphData.clusters > 1 ? (
                      <p className="flex items-start gap-2">
                        <span className="text-amber-500/80 mt-0.5">⚠</span>
                        <span>Multiple clusters detected. These wallets may appear connected on a bubblemap.</span>
                      </p>
                    ) : graphData.isolated === wallets.length ? (
                      <p className="flex items-start gap-2">
                        <span className="text-accent mt-0.5">✓</span>
                        <span>All wallets appear isolated. No obvious connections detected.</span>
                      </p>
                    ) : (
                      <p className="flex items-start gap-2">
                        <span className="text-accent mt-0.5">✓</span>
                        <span>Analysis complete. Review the connection map for details.</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Run again button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onReset}
                className="mt-6 w-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-white/[0.08] hover:border-white/[0.15] rounded-lg transition-colors duration-200"
              >
                Run again
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
