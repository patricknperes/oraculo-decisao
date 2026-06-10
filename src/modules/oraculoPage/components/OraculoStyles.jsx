export default function OraculoStyles() {
  return (
    <style>{`
      @keyframes fade-in-up {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .animate-fade-up {
        animation: fade-in-up 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }

      @keyframes rotate-cw {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
      }

      @keyframes rotate-ccw {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(-360deg); }
      }

      .ring-cw-slow { animation: rotate-cw 20s linear infinite; }
      .ring-ccw-medium { animation: rotate-ccw 15s linear infinite; }
      .ring-cw-fast { animation: rotate-cw 8s linear infinite; }

      @keyframes scan-line {
        0% { top: 5%; opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { top: 95%; opacity: 0; }
      }

      .animate-scan { animation: scan-line 2s ease-in-out infinite; }

      @keyframes text-focus-in {
        0% {
          filter: blur(12px);
          transform: scale(1.1);
          opacity: 0;
          letter-spacing: 0.1em;
        }

        100% {
          filter: blur(0px);
          transform: scale(1);
          opacity: 1;
          letter-spacing: normal;
        }
      }

      .animate-text-focus {
        animation: text-focus-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      @keyframes shockwave {
        0% {
          transform: translate(-50%, -50%) scale(0.8);
          opacity: 1;
          border-width: 10px;
        }

        100% {
          transform: translate(-50%, -50%) scale(2.5);
          opacity: 0;
          border-width: 1px;
        }
      }

      .animate-shockwave {
        animation: shockwave 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      @keyframes sacrifice-pulse {
        0%, 100% { opacity: 0.35; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.05); }
      }

      .animate-sacrifice-pulse {
        animation: sacrifice-pulse 0.8s ease-in-out infinite;
      }

      .letter-spacing-widest { letter-spacing: 0.3em; }
      .letter-spacing-extreme { letter-spacing: 0.5em; }
    `}</style>
  );
}
