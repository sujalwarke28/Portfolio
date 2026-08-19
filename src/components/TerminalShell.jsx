import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { terminalCommands, resumeData } from '../data/portfolioData';
import { sound } from '../utils/sound';
import Reveal from './motion/Reveal';

export default function TerminalShell() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'sujal@portfolio — interactive shell' },
    { type: 'system', content: 'Type "help" to see available commands, or "sudo hire" for direct contact.' },
  ]);
  const bottomRef = useRef(null);
  const prevHistoryRef = useRef(history);

  useEffect(() => {
    if (prevHistoryRef.current !== history) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    prevHistoryRef.current = history;
  }, [history]);

  const handleKeyDown = (e) => {
    sound.playKeypress();
    if (e.key !== 'Enter') return;

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

    if (trimmed === 'sudo hire') {
      sound.playSuccess();
      newHistory.push({
        type: 'output',
        content: `Access granted — direct channels:\n  Email: ${resumeData.primaryEmail}\n  Phone: ${resumeData.phone}`
      });
    } else if (cmd.startsWith('echo')) {
      newHistory.push({ type: 'output', content: parts.slice(1).join(' ') });
    } else if (terminalCommands[cmd]) {
      newHistory.push({ type: 'output', content: terminalCommands[cmd] });
    } else {
      newHistory.push({ type: 'output', content: `command not found: ${trimmed}. Type "help" for the command list.` });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <section id="terminal" className="relative py-20 border-t border-[var(--color-line)]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[var(--color-ink-faint)] mb-6">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>A shell, if you'd rather explore that way</span>
          </div>

          <div className="rounded-2xl border border-[var(--color-line)] overflow-hidden">
            <div className="bg-[var(--color-canvas-raised)] px-4 py-2.5 border-b border-[var(--color-line)] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4a4a4a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#4a4a4a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#4a4a4a]" />
              <span className="ml-3 text-[11px] font-mono text-[var(--color-ink-faint)]">sujal@portfolio</span>
            </div>

            <div className="p-5 bg-[var(--color-canvas-deep)] font-mono text-xs min-h-[280px] max-h-[380px] overflow-y-auto space-y-2.5 leading-relaxed">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className={
                    item.type === 'input'
                      ? 'text-[var(--color-accent)]'
                      : item.type === 'system'
                      ? 'text-[var(--color-signal-soft)]'
                      : 'text-[var(--color-ink-dim)] whitespace-pre-wrap'
                  }
                >
                  {item.content}
                </div>
              ))}

              <div className="flex items-center gap-2 pt-1 text-[var(--color-accent)]">
                <span>$</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type 'help'..."
                  aria-label="Terminal command input"
                  className="flex-1 bg-transparent border-none outline-none text-[var(--color-ink)] placeholder-[var(--color-ink-faint)] font-mono text-xs"
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
