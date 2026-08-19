import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const LOAD_TIMEOUT_MS = 7000;

/**
 * An embedded live preview of a project, staged inside a draggable
 * macOS-style window (traffic-light close/minimize/maximize) instead of
 * just opening a new tab. Falls back to an "open in a new tab" prompt if
 * the target site blocks framing (X-Frame-Options / CSP) or doesn't load
 * in time — cross-origin iframes give no reliable error event for that.
 */
export default function LivePreviewWindow({ study, onClose }) {
  const [windowState, setWindowState] = useState('normal'); // normal | maximized | minimized
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const overlayRef = useRef(null);
  const lastStudyId = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!study) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [study]);

  // Reset load state for a genuinely new study, without remounting (a
  // remount-on-key-change would also fire on close, before the exit
  // animation gets a chance to play). This is React's documented
  // "adjust state during render" escape hatch, not a stray effect —
  // the ref read/write here is intentional and the linter's generic
  // "no refs during render" rule doesn't have an exception for it.
  if (study && study.id !== lastStudyId.current) {
    lastStudyId.current = study.id;
    if (loaded) setLoaded(false);
    if (failed) setFailed(false);
  }

  useEffect(() => {
    if (!study) return;
    const timer = setTimeout(() => {
      setLoaded((isLoaded) => {
        if (!isLoaded) setFailed(true);
        return isLoaded;
      });
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [study, reloadKey]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape' && study) onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [study, onClose]);

  if (!study) return null;

  const handleClose = () => { sound.playClick(); onClose(); };
  const handleMinimize = () => { sound.playClick(); setWindowState((s) => (s === 'minimized' ? 'normal' : 'minimized')); };
  const handleMaximize = () => { sound.playClick(); setWindowState((s) => (s === 'maximized' ? 'normal' : 'maximized')); };
  const handleReload = () => {
    setLoaded(false);
    setFailed(false);
    setReloadKey((k) => k + 1);
  };

  return (
    <AnimatePresence>
      {windowState !== 'minimized' && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            drag={windowState === 'normal' && !reducedMotion}
            dragMomentum={false}
            dragElastic={0.04}
            dragConstraints={overlayRef}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Live preview of ${study.title}`}
            className={`flex flex-col overflow-hidden rounded-xl border border-black/40 bg-[#1c1d1f] shadow-2xl ${
              windowState === 'maximized' ? 'fixed inset-4' : 'w-[min(1000px,90vw)] h-[min(640px,82vh)]'
            }`}
          >
            {/* Title bar — traffic lights */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#26272a] border-b border-black/40 cursor-grab active:cursor-grabbing shrink-0">
              <button
                onClick={handleClose}
                aria-label="Close preview"
                className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-[filter]"
              />
              <button
                onClick={handleMinimize}
                aria-label="Minimize preview"
                className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-[filter]"
              />
              <button
                onClick={handleMaximize}
                aria-label={windowState === 'maximized' ? 'Restore preview' : 'Maximize preview'}
                className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-[filter]"
              />

              <span className="ml-3 text-xs font-mono text-white/50 truncate">
                {study.title}
              </span>

              <div className="ml-auto flex items-center gap-1.5">
                <button
                  onClick={handleReload}
                  aria-label="Reload preview"
                  className="p-1.5 rounded-md text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <a
                  href={study.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open in a new tab"
                  className="p-1.5 rounded-md text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Content */}
            <div className="relative flex-1 bg-white">
              {!loaded && !failed && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#1c1d1f]">
                  <span className="w-5 h-5 rounded-full border-2 border-white/20 border-t-[var(--color-accent)] animate-spin" />
                </div>
              )}

              {failed && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#1c1d1f] text-center px-6">
                  <p className="text-sm text-white/70 max-w-xs">
                    This site is taking too long to load here — it may not allow embedding.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleReload}
                      className="px-4 py-2 rounded-full border border-white/20 text-white/80 text-xs font-mono hover:bg-white/5"
                    >
                      Try again
                    </button>
                    <a
                      href={study.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-full bg-[var(--color-accent)] text-[#0a0a0a] text-xs font-medium"
                    >
                      Open in a new tab
                    </a>
                  </div>
                </div>
              )}

              {!failed && (
                <iframe
                  key={reloadKey}
                  src={study.demoUrl}
                  title={`Live preview of ${study.title}`}
                  onLoad={() => setLoaded(true)}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {windowState === 'minimized' && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => { sound.playClick(); setWindowState('normal'); }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1c1d1f] border border-white/15 shadow-2xl text-xs font-mono text-white/80"
        >
          <span className="w-2 h-2 rounded-full bg-[#28c840]" />
          Restore {study.title}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
