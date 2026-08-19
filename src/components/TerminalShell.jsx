import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2, X, RefreshCw } from 'lucide-react';
import { terminalCommands } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function TerminalShell() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'SUJAL WARKE HACKER SHELL [Version 2.4.0-release]' },
    { type: 'system', content: 'Type "help" to see available developer commands or "sudo hire" for fast contact.' },
  ]);
  const [matrixActive, setMatrixActive] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e) => {
    sound.playKeypress();

    if (e.key === 'Enter') {
      const trimmed = inputVal.trim();
      if (!trimmed) return;

      const newHistory = [...history, { type: 'input', content: `sujal@portfolio:~$ ${trimmed}` }];
      const parts = trimmed.split(' ');
      const cmd = parts[0].toLowerCase();

      if (cmd === 'clear') {
        setHistory([]);
        setInputVal('');
        return;
      }

      if (cmd === 'matrix') {
        setMatrixActive(!matrixActive);
        newHistory.push({ type: 'output', content: matrixActive ? '[MATRIX] Digital rain disabled.' : '[MATRIX] Digital rain protocol initiated! 🟢' });
      } else if (trimmed === 'sudo hire') {
        sound.playSuccess();
        newHistory.push({ 
          type: 'output', 
          content: '🎉 ACCESS GRANTED! Opening fast track hire inquiry... Email: sujalwarke.dev@gmail.com | Phone: +1 (555) 019-2834' 
        });
      } else if (cmd.startsWith('echo')) {
        newHistory.push({ type: 'output', content: parts.slice(1).join(' ') });
      } else if (terminalCommands[cmd]) {
        newHistory.push({ type: 'output', content: terminalCommands[cmd] });
      } else {
        newHistory.push({ type: 'output', content: `zsh: command not found: ${trimmed}. Type "help" for command list.` });
      }

      setHistory(newHistory);
      setInputVal('');
    }
  };

  return (
    <section id="terminal" className="relative py-24 bg-[#050914] overflow-hidden border-t border-slate-800/80">
      
      {/* Background Matrix Glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>INTERACTIVE HACKER CLI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Developer <span className="text-gradient-green">Terminal Shell</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-mono mt-2">
            Execute terminal shell commands directly in your browser window
          </p>
        </div>

        {/* Terminal Window Frame */}
        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          
          {/* Top Bar */}
          <div className="bg-[#0b0f19] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="ml-4 text-xs font-mono text-slate-400">sujal@portfolio: ~ (zsh)</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <button 
                onClick={() => { sound.playClick(); setHistory([]); }}
                className="px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:text-white"
                title="Clear Terminal"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div className="p-6 bg-[#030712] font-mono text-xs sm:text-sm min-h-[360px] max-h-[460px] overflow-y-auto space-y-3 leading-relaxed">
            {history.map((item, idx) => (
              <div key={idx} className={item.type === 'input' ? 'text-cyan-400 font-bold' : item.type === 'system' ? 'text-emerald-400 font-semibold' : 'text-slate-300 whitespace-pre-wrap'}>
                {item.content}
              </div>
            ))}

            {/* Live Input Line */}
            <div className="flex items-center gap-2 pt-1 text-cyan-400 font-bold">
              <span>sujal@portfolio:~$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help' or 'sudo hire'..."
                className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-600 font-mono text-xs sm:text-sm"
                autoFocus
              />
            </div>

            <div ref={bottomRef} />
          </div>

        </div>

      </div>
    </section>
  );
}
