import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Code2, 
  GitBranch, 
  Play, 
  Server, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  RefreshCw, 
  FileCode, 
  GitPullRequest, 
  Database, 
  Zap, 
  Sparkles,
  ArrowRight,
  User,
  MessageSquare
} from 'lucide-react';
import { 
  sprintTasks as initialTasks, 
  ideFiles, 
  gitBranchHistory, 
  prReviewSnippet, 
  cicdPipelineSteps, 
  systemArchitectureNodes,
  incidentDashboardData 
} from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function SoftwareGuyLife() {
  const [activeTab, setActiveTab] = useState('kanban'); // 'kanban' | 'ide' | 'git' | 'cicd' | 'architecture' | 'incident'

  // Module 1: Kanban State
  const [tasks, setTasks] = useState(initialTasks);

  const moveTask = (taskId, newStatus) => {
    sound.playClick();
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  // Module 2: IDE State
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [isExecutingCode, setIsExecutingCode] = useState(false);
  const [codeRunOutput, setCodeRunOutput] = useState(null);

  const handleRunCode = () => {
    sound.playClick();
    setIsExecutingCode(true);
    setCodeRunOutput(null);
    setTimeout(() => {
      setIsExecutingCode(false);
      setCodeRunOutput(ideFiles[activeFileIndex].output);
      sound.playSuccess();
    }, 800);
  };

  // Module 3: Git PR State
  const [prApproved, setPrApproved] = useState(false);

  const handleApprovePR = () => {
    sound.playSuccess();
    setPrApproved(true);
  };

  // Module 4: CI/CD Pipeline State
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineStepIndex, setPipelineStepIndex] = useState(-1);
  const [pipelineLog, setPipelineLog] = useState([]);

  const handleTriggerPipeline = () => {
    sound.playClick();
    setPipelineRunning(true);
    setPipelineStepIndex(0);
    setPipelineLog(["[CI/CD ENGINE] Starting build pipeline trigger on branch 'main'..."]);

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < cicdPipelineSteps.length) {
        const step = cicdPipelineSteps[currentStep];
        setPipelineStepIndex(currentStep);
        setPipelineLog(prev => [
          ...prev, 
          `[STEP ${step.id}] Running '${step.cmd}'...`, 
          `✓ ${step.name} finished in ${step.duration}: ${step.detail}`
        ]);
        sound.playHover();
        currentStep++;
      } else {
        clearInterval(interval);
        setPipelineRunning(false);
        setPipelineLog(prev => [...prev, "🎉 [PIPELINE SUCCESS] All checks passed cleanly! Container deployed to Kubernetes."]);
        sound.playSuccess();
      }
    }, 1200);
  };

  // Module 5: Architecture Traffic Simulator State
  const [selectedArchNode, setSelectedArchNode] = useState(systemArchitectureNodes[0]);
  const [packetSimActive, setPacketSimActive] = useState(true);

  // Module 6: Production Incident State
  const [incidentResolved, setIncidentResolved] = useState(false);
  const [isPatching, setIsPatching] = useState(false);

  const handleDeployPatch = () => {
    sound.playClick();
    setIsPatching(true);
    setTimeout(() => {
      setIsPatching(false);
      setIncidentResolved(true);
      sound.playSuccess();
    }, 1500);
  };

  return (
    <section id="engineer-life" className="relative py-24 bg-[#030712] overflow-hidden border-t border-slate-800/80">
      
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>REAL DEVELOPER WORKFLOW SUITE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            What a <span className="text-gradient-cyan">Software Engineer</span> Actually Does
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Software engineering is far more than typing code! Experience real-time sprint planning, live code execution, code reviews, automated CI/CD deployments, cloud packet architecture, and live incident response.
          </p>
        </div>

        {/* Interactive Module Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 bg-slate-900/90 p-2 rounded-2xl border border-slate-800 backdrop-blur-md shadow-xl">
          {[
            { id: 'kanban', label: '1. Sprint Board', icon: Layers },
            { id: 'ide', label: '2. Live IDE Sandbox', icon: Code2 },
            { id: 'git', label: '3. Git & Code Review', icon: GitPullRequest },
            { id: 'cicd', label: '4. CI/CD Pipeline', icon: RefreshCw },
            { id: 'architecture', label: '5. Cloud Architecture', icon: Server },
            { id: 'incident', label: '6. Incident Monitor', icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { sound.playClick(); setActiveTab(tab.id); }}
                onMouseEnter={() => sound.playHover()}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* MODULE 1: Agile Kanban Sprint Board */}
        {activeTab === 'kanban' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 animate-in fade-in">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" /> Agile Sprint Board (Sprint #42)
                </h3>
                <p className="text-xs text-slate-400 font-mono">Click task status buttons to move items across sprint columns</p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Active Sprint
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { status: 'BACKLOG', title: 'Backlog', color: 'border-slate-700 bg-slate-900/40' },
                { status: 'IN_PROGRESS', title: 'In Progress ⚡', color: 'border-amber-500/40 bg-amber-950/20' },
                { status: 'IN_REVIEW', title: 'In Code Review', color: 'border-purple-500/40 bg-purple-950/20' },
                { status: 'DONE', title: 'Deployed (Done) ✅', color: 'border-emerald-500/40 bg-emerald-950/20' },
              ].map((col) => {
                const columnTasks = tasks.filter(t => t.status === col.status);
                return (
                  <div key={col.status} className={`p-4 rounded-2xl border ${col.color} flex flex-col justify-between min-h-[320px]`}>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-slate-200 uppercase font-mono">{col.title}</span>
                        <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">{columnTasks.length}</span>
                      </div>

                      <div className="space-y-3">
                        {columnTasks.map((t) => (
                          <div key={t.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-mono text-cyan-400">{t.id}</span>
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{t.priority}</span>
                            </div>
                            <h4 className="text-xs font-medium text-slate-200 mb-3">{t.title}</h4>
                            
                            {/* Workflow progression buttons */}
                            <div className="flex items-center gap-1 pt-2 border-t border-slate-800">
                              {col.status !== 'BACKLOG' && (
                                <button
                                  onClick={() => moveTask(t.id, col.status === 'DONE' ? 'IN_REVIEW' : col.status === 'IN_REVIEW' ? 'IN_PROGRESS' : 'BACKLOG')}
                                  className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                                >
                                  ← Back
                                </button>
                              )}
                              {col.status !== 'DONE' && (
                                <button
                                  onClick={() => moveTask(t.id, col.status === 'BACKLOG' ? 'IN_PROGRESS' : col.status === 'IN_PROGRESS' ? 'IN_REVIEW' : 'DONE')}
                                  className="text-[10px] font-mono px-2 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900 ml-auto"
                                >
                                  Advance →
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MODULE 2: Interactive IDE Sandbox */}
        {activeTab === 'ide' && (
          <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden animate-in fade-in shadow-2xl">
            {/* Editor Top Bar */}
            <div className="bg-[#0b0f19] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span className="ml-4 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-cyan-400" /> Sujal IDE Workspace v2.4
                </span>
              </div>

              <button
                onClick={handleRunCode}
                disabled={isExecutingCode}
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-mono text-xs font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                <Play className={`w-3.5 h-3.5 ${isExecutingCode ? 'animate-spin' : ''}`} />
                <span>{isExecutingCode ? 'Executing Code...' : 'Run Code'}</span>
              </button>
            </div>

            {/* File Tabs */}
            <div className="bg-[#090d16] border-b border-slate-800 flex items-center overflow-x-auto">
              {ideFiles.map((file, idx) => (
                <button
                  key={file.name}
                  onClick={() => { sound.playClick(); setActiveFileIndex(idx); setCodeRunOutput(null); }}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono border-r border-slate-800 transition-colors ${
                    activeFileIndex === idx
                      ? 'bg-slate-900 text-cyan-400 border-t-2 border-t-cyan-400 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>{file.name}</span>
                </button>
              ))}
            </div>

            {/* Code Body & Output Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[380px]">
              {/* Code Editor Screen */}
              <div className="lg:col-span-2 p-4 bg-[#050811] font-mono text-xs text-slate-200 overflow-x-auto border-r border-slate-800/80 leading-relaxed">
                <pre className="whitespace-pre">
                  {ideFiles[activeFileIndex].code.split('\n').map((line, lineIdx) => (
                    <div key={lineIdx} className="flex hover:bg-slate-900/60 px-2 rounded">
                      <span className="w-8 shrink-0 text-slate-600 select-none text-right mr-4">{lineIdx + 1}</span>
                      <span className="text-slate-300">{line}</span>
                    </div>
                  ))}
                </pre>
              </div>

              {/* Terminal Execution Console */}
              <div className="p-4 bg-[#090d16] font-mono text-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-slate-400 mb-3 pb-2 border-b border-slate-800">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>Terminal Console Stream</span>
                  </div>

                  {isExecutingCode ? (
                    <div className="flex items-center gap-2 text-cyan-400 py-4 animate-pulse">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Compiling AST & executing binary...</span>
                    </div>
                  ) : codeRunOutput ? (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 space-y-1.5 animate-in fade-in">
                      {codeRunOutput.split('\n').map((outLine, oIdx) => (
                        <div key={oIdx} className="flex items-start gap-2">
                          <span className="text-slate-600 select-none">&gt;</span>
                          <span>{outLine}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-slate-500 py-6 text-center italic">
                      Click "Run Code" above to execute this script in real time.
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Language: {ideFiles[activeFileIndex].language.toUpperCase()}</span>
                  <span>V8 Node / Go Runtime Ready</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 3: Git Branch Graph & Code Review */}
        {activeTab === 'git' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 animate-in fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Git Commit Tree */}
              <div>
                <h3 className="text-xl font-bold text-white font-heading mb-4 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-purple-400" /> Git Commit Log (`git log --graph`)
                </h3>
                <div className="space-y-3">
                  {gitBranchHistory.map((commit, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-cyan-400 font-bold">{commit.hash}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-purple-300">{commit.branch}</span>
                        </div>
                        <p className="text-xs text-slate-200 truncate">{commit.msg}</p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">{commit.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PR Code Review Tool */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <h4 className="text-sm font-bold text-white font-heading">{prReviewSnippet.title}</h4>
                    <span className={`text-xs font-mono px-2.5 py-1 rounded-full ${
                      prApproved ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                    }`}>
                      {prApproved ? 'MERGED ✅' : 'NEEDS REVIEW'}
                    </span>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs mb-4 p-3 rounded-xl bg-slate-950 border border-slate-800">
                    {prReviewSnippet.diff.map((diffLine, dIdx) => (
                      <div key={dIdx} className={diffLine.type === 'removed' ? 'text-red-400 bg-red-950/30 px-1' : 'text-emerald-400 bg-emerald-950/30 px-1'}>
                        {diffLine.text}
                      </div>
                    ))}
                  </div>

                  {/* Review Comments */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 mb-4 flex items-start gap-2.5">
                    <MessageSquare className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-cyan-300 font-mono block mb-1">TechLead Review:</span>
                      {prReviewSnippet.comments[0].comment}
                    </div>
                  </div>
                </div>

                {!prApproved ? (
                  <button
                    onClick={handleApprovePR}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve Pull Request & Trigger Merge
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-mono text-center">
                    🎉 PR Approved & Branch Merged to `main`! Automated CI/CD build started.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* MODULE 4: CI/CD Deployment Pipeline Simulator */}
        {activeTab === 'cicd' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-cyan-400" /> Automated CI/CD Pipeline Simulator
                </h3>
                <p className="text-xs text-slate-400 font-mono">GitHub Actions + Docker + Kubernetes Deployment Pipeline</p>
              </div>

              <button
                onClick={handleTriggerPipeline}
                disabled={pipelineRunning}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-mono text-xs font-bold shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-2 self-start sm:self-auto"
              >
                <Play className={`w-4 h-4 ${pipelineRunning ? 'animate-spin' : ''}`} />
                <span>{pipelineRunning ? 'Pipeline Executing...' : 'Trigger Pipeline Run'}</span>
              </button>
            </div>

            {/* Pipeline Step Visualizer */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-8">
              {cicdPipelineSteps.map((step, sIdx) => {
                const isCurrent = pipelineStepIndex === sIdx;
                const isPassed = pipelineStepIndex > sIdx;
                return (
                  <div 
                    key={step.id} 
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'border-cyan-500 bg-cyan-950/40 glow-cyan animate-pulse'
                        : isPassed
                        ? 'border-emerald-500/40 bg-emerald-950/20'
                        : 'border-slate-800 bg-slate-900/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-slate-400">Step 0{step.id}</span>
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                      ) : (
                        <Clock className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-200 mb-1">{step.name}</h4>
                    <span className="text-[10px] font-mono text-slate-400">{step.duration}</span>
                  </div>
                );
              })}
            </div>

            {/* Real-time Pipeline Log Window */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 min-h-[160px] max-h-[220px] overflow-y-auto space-y-1.5">
              {pipelineLog.length === 0 ? (
                <div className="text-slate-500 py-6 text-center italic">
                  Click "Trigger Pipeline Run" to watch live automated testing, container builds, and deployment.
                </div>
              ) : (
                pipelineLog.map((logMsg, lIdx) => (
                  <div key={lIdx} className="flex items-start gap-2">
                    <span className="text-cyan-400">&gt;</span>
                    <span>{logMsg}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* MODULE 5: Cloud Architecture Traffic Simulator */}
        {activeTab === 'architecture' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 animate-in fade-in">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                  <Server className="w-5 h-5 text-emerald-400" /> System Architecture & Traffic Packet Flow
                </h3>
                <p className="text-xs text-slate-400 font-mono">Click architecture nodes to inspect latency and payload specs</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live Packet Flow
              </span>
            </div>

            {/* Architecture Node Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {systemArchitectureNodes.map((node) => {
                const isSelected = selectedArchNode.id === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => { sound.playClick(); setSelectedArchNode(node); }}
                    onMouseEnter={() => sound.playHover()}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-950/40 glow-cyan scale-[1.02]'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {node.type}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-bold">{node.latency}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100">{node.label}</h4>
                  </div>
                );
              })}
            </div>

            {/* Selected Node Details Box */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-slate-400 block mb-1">Selected Node Inspector:</span>
                <div className="text-lg font-bold text-cyan-300 font-heading">{selectedArchNode.label}</div>
                <div className="text-slate-400 text-xs mt-1">Status: {selectedArchNode.status} • Average Latency: {selectedArchNode.latency}</div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs">
                ⚡ Protocol: HTTP/2 gRPC Stream • TLS 1.3 Encrypted
              </div>
            </div>
          </div>
        )}

        {/* MODULE 6: Production Incident Monitoring */}
        {activeTab === 'incident' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 animate-in fade-in">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                  <Activity className="w-5 h-5 text-amber-400" /> Production Telemetry & Incident Response
                </h3>
                <p className="text-xs text-slate-400 font-mono">Real-time health monitoring & automated hotfix patch trigger</p>
              </div>

              {!incidentResolved ? (
                <button
                  onClick={handleDeployPatch}
                  disabled={isPatching}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 text-white font-mono text-xs font-bold shadow-lg shadow-amber-500/25 hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <AlertTriangle className={`w-4 h-4 ${isPatching ? 'animate-spin' : ''}`} />
                  <span>{isPatching ? 'Deploying Hotfix Patch...' : 'Deploy Emergency Hotfix'}</span>
                </button>
              ) : (
                <span className="px-4 py-2 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> INCIDENT RESOLVED 100%
                </span>
              )}
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-1">CPU Usage Rate</span>
                <div className="text-2xl font-extrabold text-cyan-400 font-heading">{incidentDashboardData.cpuUsage}</div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: incidentDashboardData.cpuUsage }} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-1">Memory Heap Load</span>
                <div className="text-2xl font-extrabold text-purple-400 font-heading">{incidentDashboardData.memoryUsage}</div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full" style={{ width: incidentDashboardData.memoryUsage }} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-1">HTTP Error Rate</span>
                <div className="text-2xl font-extrabold text-emerald-400 font-heading">{incidentDashboardData.errorRate}</div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '1%' }} />
                </div>
              </div>
            </div>

            {/* Incident Log Stream */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <span className="text-slate-500 font-bold block mb-2">TELEMETRY INCIDENT LOG:</span>
              {incidentDashboardData.logs.map((log, idx) => (
                <div key={idx} className="flex items-center gap-3 text-slate-300">
                  <span className="text-slate-500">{log.time}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    log.level === 'WARN' ? 'bg-amber-950 text-amber-300' : log.level === 'ACTION' ? 'bg-purple-950 text-purple-300' : 'bg-emerald-950 text-emerald-300'
                  }`}>{log.level}</span>
                  <span>{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
