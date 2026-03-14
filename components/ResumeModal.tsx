import { motion, AnimatePresence } from "framer-motion";

interface ResumeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResumeModal({ open, onOpenChange }: ResumeModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="relative mx-4 h-[80vh] w-full max-w-3xl rounded-2xl border border-gray-800 bg-accent/90 p-4 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-3 rounded-full border border-gray-700 px-2 py-1 text-xs text-gray-300 hover:border-primary hover:text-primary"
            >
              Close
            </button>
            <h2 className="mb-3 text-sm font-semibold text-primary">
              Resume
            </h2>
            <div className="h-[calc(100%-3rem)] overflow-hidden rounded-lg border border-gray-800 bg-black/50">
              {typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent) ? (
                <div className="flex h-full flex-col items-center justify-center p-4 text-center">
                  <p className="mb-4 text-sm text-gray-300">
                    Tap below to view or download the resume
                  </p>
                  <a
                    href="/resume.pdf"
                    className="rounded-full border border-primary bg-primary/90 px-6 py-2 text-sm font-semibold text-black"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Resume
                  </a>
                </div>
              ) : (
                <iframe
                  src="/resume.pdf"
                  className="h-full w-full"
                  title="Resume PDF"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

