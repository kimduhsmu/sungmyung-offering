export default function Toast({ message, visible }) {
  return (
    <div
      className={[
        'pointer-events-none fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[448px] -translate-x-1/2 rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white shadow-lg transition-all duration-300',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
      ].join(' ')}
      aria-live="polite"
    >
      {message}
    </div>
  );
}
