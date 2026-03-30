import { useNavigate } from 'react-router-dom';

export default function Header({ title, showBack = false }) {
  const navigate = useNavigate();

  return (
    <header className="mb-8 flex items-center gap-3">
      {showBack ? (
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary"
        >
          ← 뒤로
        </button>
      ) : null}
      <div>
        <p className="mb-2 text-sm font-medium text-primary/70">헌금 간편송금</p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
      </div>
    </header>
  );
}
