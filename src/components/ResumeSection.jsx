import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, GraduationCap, Briefcase, Award, X, Printer } from 'lucide-react';
import { resumeData } from '../data/portfolioData';
import { sound } from '../utils/sound';
import Reveal from './motion/Reveal';

export default function ResumeSection() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDownloadPDF = () => {
    sound.playSuccess();
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resumeData.fullName} - Resume</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111827; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
            .header { border-bottom: 2px solid #e8672c; padding-bottom: 20px; margin-bottom: 25px; }
            .name { font-size: 28px; font-weight: bold; color: #111827; }
            .title { font-size: 16px; color: #4b5563; margin-top: 4px; }
            .contact { font-size: 13px; color: #6b7280; margin-top: 10px; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 16px; font-weight: bold; color: #b34f21; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
            .item { margin-bottom: 12px; }
            .item-header { display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; }
            .item-sub { font-size: 13px; color: #4b5563; font-style: italic; }
            .item-desc { font-size: 13px; color: #374151; margin-top: 3px; }
            .skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
            .skill-tag { background: #fdf1ea; color: #b34f21; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="name">${resumeData.fullName}</div>
            <div class="title">${resumeData.roleTitle}</div>
            <div class="contact">
              ${resumeData.location} | ${resumeData.phone} | ${resumeData.primaryEmail}<br/>
              GitHub: ${resumeData.github} | LinkedIn: ${resumeData.linkedin}
            </div>
          </div>
          <div class="section">
            <div class="section-title">About Me</div>
            <p class="item-desc">${resumeData.aboutMe}</p>
          </div>
          <div class="section">
            <div class="section-title">Education</div>
            ${resumeData.education.map(edu => `
              <div class="item">
                <div class="item-header"><span>${edu.institution}</span><span>(${edu.period})</span></div>
                <div class="item-sub">${edu.degree} — <strong>${edu.grade}</strong></div>
              </div>
            `).join('')}
          </div>
          <div class="section">
            <div class="section-title">Experience</div>
            ${resumeData.experience.map(exp => `
              <div class="item">
                <div class="item-header"><span>${exp.role} @ ${exp.company}</span><span>(${exp.period})</span></div>
                <div class="item-desc">${exp.description}</div>
              </div>
            `).join('')}
          </div>
          <div class="section">
            <div class="section-title">Key Achievements</div>
            ${resumeData.achievements.map(ach => `
              <div class="item">
                <div class="item-header"><span>${ach.title}</span><span>(${ach.date})</span></div>
                <div class="item-desc">${ach.details}</div>
              </div>
            `).join('')}
          </div>
          <div class="section">
            <div class="section-title">Technical & Core Skills</div>
            <div class="skills-list">${resumeData.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <section id="resume" className="relative py-20 border-t border-[var(--color-line)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 lab-panel rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-[var(--color-canvas-deep)] border border-[var(--color-line)] text-[var(--color-accent)]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg text-[var(--color-ink)]">Formal credentials</h3>
                <p className="text-xs text-[var(--color-ink-faint)]">{resumeData.roleTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { sound.playClick(); setIsPreviewOpen(true); }}
                className="px-4 py-2.5 rounded-full border border-[var(--color-line-strong)] text-xs font-mono text-[var(--color-ink-dim)] hover:text-[var(--color-ink)] transition-colors"
              >
                View full résumé
              </button>
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2.5 rounded-full bg-[var(--color-accent)] text-[#0a0a0a] text-xs font-medium flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-overlay max-w-2xl w-full p-6 sm:p-8 rounded-3xl relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsPreviewOpen(false)}
                aria-label="Close résumé preview"
                className="absolute top-5 right-5 p-2 rounded-full border border-[var(--color-line)] text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-heading text-2xl text-[var(--color-ink)] mb-1">{resumeData.fullName}</h3>
              <p className="text-xs font-mono text-[var(--color-accent)] mb-6">{resumeData.roleTitle}</p>
              <p className="text-xs text-[var(--color-ink-dim)] leading-relaxed mb-8">{resumeData.aboutMe}</p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-ink-faint)] mb-3 flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5" /> Education
                  </h4>
                  <div className="space-y-3">
                    {resumeData.education.map((edu) => (
                      <div key={edu.institution} className="border-l border-[var(--color-line)] pl-4">
                        <div className="text-xs font-mono text-[var(--color-accent)]">{edu.period}</div>
                        <div className="text-sm text-[var(--color-ink)] font-medium">{edu.institution}</div>
                        <div className="text-xs text-[var(--color-ink-faint)]">{edu.degree} — {edu.grade}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-ink-faint)] mb-3 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5" /> Experience
                  </h4>
                  <div className="space-y-3">
                    {resumeData.experience.map((exp) => (
                      <div key={exp.role} className="border-l border-[var(--color-line)] pl-4">
                        <div className="text-xs font-mono text-[var(--color-ink-faint)]">{exp.period}</div>
                        <div className="text-sm text-[var(--color-ink)] font-medium">{exp.role} — {exp.company}</div>
                        <div className="text-xs text-[var(--color-ink-faint)]">{exp.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-ink-faint)] mb-3 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5" /> Achievements
                  </h4>
                  <div className="space-y-3">
                    {resumeData.achievements.map((ach) => (
                      <div key={ach.title} className="border-l border-[var(--color-line)] pl-4">
                        <div className="text-xs font-mono text-[var(--color-ink-faint)]">{ach.date}</div>
                        <div className="text-sm text-[var(--color-ink)] font-medium">{ach.title}</div>
                        <div className="text-xs text-[var(--color-ink-faint)]">{ach.details}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownloadPDF}
                className="mt-8 w-full py-3 rounded-full bg-[var(--color-accent)] text-[#0a0a0a] text-xs font-medium flex items-center justify-center gap-2"
              >
                <Printer className="w-3.5 h-3.5" /> Print / Save PDF
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
