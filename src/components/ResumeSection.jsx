import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  GraduationCap, 
  Briefcase, 
  Award, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  X,
  ExternalLink,
  Printer
} from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import { resumeData } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function ResumeSection() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDownloadPDF = () => {
    sound.playSuccess();
    // Create a printable text/PDF document blob or print view
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resumeData.fullName} - Resume</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111827; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
            .header { border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 25px; }
            .name { font-size: 28px; font-weight: bold; color: #1e3a8a; }
            .title { font-size: 16px; color: #4b5563; margin-top: 4px; }
            .contact { font-size: 13px; color: #6b7280; margin-top: 10px; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 16px; font-weight: bold; color: #1e40af; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
            .item { margin-bottom: 12px; }
            .item-header { display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; }
            .item-sub { font-size: 13px; color: #4b5563; font-style: italic; }
            .item-desc { font-size: 13px; color: #374151; margin-top: 3px; }
            .skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
            .skill-tag { background: #eff6ff; color: #1e40af; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="name">${resumeData.fullName}</div>
            <div class="title">${resumeData.roleTitle}</div>
            <div class="contact">
              📍 ${resumeData.location} | 📞 ${resumeData.phone} | ✉️ ${resumeData.primaryEmail}<br/>
              🔗 GitHub: ${resumeData.github} | LinkedIn: ${resumeData.linkedin}
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
                <div class="item-header">
                  <span>${edu.institution}</span>
                  <span>(${edu.period})</span>
                </div>
                <div class="item-sub">${edu.degree} — <strong>${edu.grade}</strong></div>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">Experience</div>
            ${resumeData.experience.map(exp => `
              <div class="item">
                <div class="item-header">
                  <span>${exp.role} @ ${exp.company}</span>
                  <span>(${exp.period})</span>
                </div>
                <div class="item-desc">${exp.description}</div>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">Key Achievements</div>
            ${resumeData.achievements.map(ach => `
              <div class="item">
                <div class="item-header">
                  <span>🏆 ${ach.title}</span>
                  <span>(${ach.date})</span>
                </div>
                <div class="item-desc">${ach.details}</div>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">Technical & Core Skills</div>
            <div class="skills-list">
              ${resumeData.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
            </div>
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <section id="resume" className="relative py-24 bg-[#030712] overflow-hidden border-t border-slate-800/80">
      
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>CURRICULUM VITAE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Formal <span className="text-gradient-cyan">Resume & Credentials</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Verified academic background, technical competencies, open-source experience, and engineering achievements.
          </p>

          {/* Download & Fullscreen Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={handleDownloadPDF}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download / Print PDF Resume
            </button>

            <button
              onClick={() => { sound.playClick(); setIsPreviewOpen(true); }}
              onMouseEnter={() => sound.playHover()}
              className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-cyan-500/40 font-mono text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Eye className="w-4 h-4 text-cyan-400" /> Fullscreen Document Viewer
            </button>
          </div>
        </div>

        {/* Live Styled Resume Document Card */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
          
          {/* Top Resume Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <h3 className="text-3xl font-extrabold text-white font-heading">{resumeData.fullName}</h3>
              <p className="text-sm font-mono text-cyan-400 font-semibold mt-1">{resumeData.roleTitle}</p>
              <p className="text-xs text-slate-400 max-w-xl mt-3 leading-relaxed">{resumeData.aboutMe}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 space-y-2 shrink-0">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" /> {resumeData.location}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" /> {resumeData.phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400" /> {resumeData.primaryEmail}
              </div>
            </div>
          </div>

          {/* Content Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
            
            {/* Left Column: Education & Achievements */}
            <div className="space-y-8">
              
              {/* Education */}
              <div>
                <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-cyan-400" /> Education
                </h4>

                <div className="space-y-4 border-l-2 border-slate-800 pl-4">
                  {resumeData.education.map((edu, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-slate-950" />
                      <div className="text-xs font-mono text-cyan-400 font-bold">{edu.period}</div>
                      <h5 className="text-sm font-bold text-slate-100 mt-0.5">{edu.institution}</h5>
                      <p className="text-xs text-slate-300">{edu.degree}</p>
                      <span className="inline-block text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 mt-1">
                        {edu.grade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Achievements */}
              <div>
                <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" /> Key Achievements & Competitions
                </h4>

                <div className="space-y-4">
                  {resumeData.achievements.map((ach, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="text-xs font-bold text-slate-100 flex items-center gap-1.5 font-mono">
                          🏆 {ach.title}
                        </h5>
                        <span className="text-[10px] font-mono text-amber-400 font-bold">{ach.date}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{ach.details}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Experience & Technical Skills */}
            <div className="space-y-8">
              
              {/* Work & Community Experience */}
              <div>
                <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-purple-400" /> Experience & Open Source
                </h4>

                <div className="space-y-4 border-l-2 border-slate-800 pl-4">
                  {resumeData.experience.map((exp, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-400 border-2 border-slate-950" />
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-purple-300 font-bold">{exp.period}</span>
                        <span className="text-slate-400">{exp.company}</span>
                      </div>
                      <h5 className="text-sm font-bold text-slate-100 mt-0.5">{exp.role}</h5>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" /> Skills & Specializations
                </h4>

                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Document Viewer Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel max-w-3xl w-full p-6 sm:p-8 rounded-3xl border border-cyan-500/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">{resumeData.fullName} — Official Resume</h3>
                <p className="text-xs font-mono text-cyan-400">{resumeData.roleTitle}</p>
              </div>

              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print / Save PDF
              </button>
            </div>

            <div className="space-y-6 text-slate-200 text-xs font-sans">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-cyan-400 font-bold font-mono uppercase block mb-1">About Me</span>
                <p>{resumeData.aboutMe}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-cyan-400 font-bold font-mono uppercase block">Education</span>
                {resumeData.education.map((e, idx) => (
                  <div key={idx} className="border-b border-slate-800/80 pb-2 last:border-0 last:pb-0">
                    <div className="font-bold text-slate-100">{e.institution} ({e.period})</div>
                    <div className="text-slate-300">{e.degree} — <strong className="text-cyan-300">{e.grade}</strong></div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-purple-400 font-bold font-mono uppercase block">Experience</span>
                {resumeData.experience.map((ex, idx) => (
                  <div key={idx} className="border-b border-slate-800/80 pb-2 last:border-0 last:pb-0">
                    <div className="font-bold text-slate-100">{ex.role} @ {ex.company} ({ex.period})</div>
                    <div className="text-slate-300">{ex.description}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-amber-400 font-bold font-mono uppercase block">Achievements</span>
                {resumeData.achievements.map((a, idx) => (
                  <div key={idx} className="border-b border-slate-800/80 pb-2 last:border-0 last:pb-0">
                    <div className="font-bold text-slate-100">🏆 {a.title} ({a.date})</div>
                    <div className="text-slate-300">{a.details}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
