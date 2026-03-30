const appUrl = import.meta.env.VITE_APP_URL || '';

export default function Footer() {
  return (
    <footer className="mt-6 border-t border-slate-100 pt-3 text-center text-xs text-slate-500">
      <img
        src="/logo_main.png"
        alt="교회 로고"
        className="mx-auto mb-1 h-28 w-auto object-contain"
      />
      공식 URL {appUrl}
    </footer>
  );
}
