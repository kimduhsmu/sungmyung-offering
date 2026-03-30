export default function OfferingButton({ children, fullWidth = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-2xl border border-primary/20 bg-white px-4 py-5 text-base font-semibold text-primary shadow-sm transition active:scale-[0.99] hover:border-primary hover:shadow-card',
        fullWidth ? 'col-span-2' : '',
      ].join(' ')}
    >
      {children}
    </button>
  );
}
