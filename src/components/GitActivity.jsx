import React, { useState } from 'react';
import { GitCommit, Activity, Flame, Calendar } from 'lucide-react';
import { gitContributionData } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function GitActivity() {
  const [hoveredDay, setHoveredDay] = useState(null);

  const totalCommits = gitContributionData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <section id="git-activity" className="relative py-20 bg-[#030712] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
              <GitCommit className="w-3.5 h-3.5" />
              <span>365-DAY COMMIT HISTORY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              GitHub <span className="text-gradient-green">Contribution Heatmap</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Streak: <strong className="text-amber-300">42 Days</strong></span>
            </div>
            <div className="w-px h-4 bg-slate-800" />
            <div>Total: <strong className="text-emerald-400">{totalCommits} Commits</strong></div>
          </div>
        </div>

        {/* Heatmap Container */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <div className="overflow-x-auto pb-4">
            <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 min-w-[720px]">
              {gitContributionData.map((day, idx) => {
                let bgColor = 'bg-slate-900 border-slate-800/50';
                if (day.level === 1) bgColor = 'bg-emerald-950 border-emerald-800/40';
                if (day.level === 2) bgColor = 'bg-emerald-800 border-emerald-700/50';
                if (day.level === 3) bgColor = 'bg-emerald-600 border-emerald-500/60';
                if (day.level === 4) bgColor = 'bg-emerald-400 border-emerald-300 shadow-sm shadow-emerald-400/30';

                return (
                  <div
                    key={idx}
                    onMouseEnter={() => { sound.playHover(); setHoveredDay(day); }}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`w-3.5 h-3.5 rounded-[3px] border ${bgColor} transition-transform hover:scale-125 hover:z-10 cursor-pointer`}
                  />
                );
              })}
            </div>
          </div>

          {/* Hover Tooltip Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              {hoveredDay ? (
                <span>
                  <strong className="text-emerald-400">{hoveredDay.count} commits</strong> on {hoveredDay.date}
                </span>
              ) : (
                <span>Hover over any day square to see exact commit count</span>
              )}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 text-[11px]">
              <span>Less</span>
              <span className="w-3 h-3 rounded-[2px] bg-slate-900 border border-slate-800" />
              <span className="w-3 h-3 rounded-[2px] bg-emerald-950" />
              <span className="w-3 h-3 rounded-[2px] bg-emerald-800" />
              <span className="w-3 h-3 rounded-[2px] bg-emerald-600" />
              <span className="w-3 h-3 rounded-[2px] bg-emerald-400" />
              <span>More</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
