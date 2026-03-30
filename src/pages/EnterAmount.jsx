import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useOffering } from '../context/OfferingContext';
import { formatAmount, parseAmountInput } from '../utils/format';

const quickAmounts = [
  { label: '1만', value: 10000 },
  { label: '2만', value: 20000 },
  { label: '3만', value: 30000 },
  { label: '5만', value: 50000 },
  { label: '10만', value: 100000 },
];

export default function EnterAmount() {
  const navigate = useNavigate();
  const amountInputRef = useRef(null);
  const { amount, offeringType, setAmount } = useOffering();

  const handleChange = (event) => {
    setAmount(parseAmountInput(event.target.value));
  };

  const closeKeyboard = () => {
    amountInputRef.current?.blur();
  };

  const handleSubmitAmount = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      closeKeyboard();
    }
  };

  const handleNext = () => {
    closeKeyboard();
    navigate('/payment');
  };

  return (
    <main className="min-h-screen bg-white px-4 py-6">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[480px] flex-col rounded-[32px] bg-white p-6 shadow-card">
        <Header title={offeringType} showBack />

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <label htmlFor="amount" className="mb-3 block text-sm font-semibold text-slate-600">
            헌금 금액 입력
          </label>
          <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-4">
            <input
              ref={amountInputRef}
              id="amount"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              enterKeyHint="done"
              autoComplete="off"
              placeholder="0"
              value={formatAmount(amount)}
              onChange={handleChange}
              onKeyDown={handleSubmitAmount}
              className="w-full border-none bg-transparent text-3xl font-bold text-slate-900 outline-none"
            />
            <span className="text-lg font-semibold text-slate-500">원</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {quickAmounts.map((quickAmount) => (
            <button
              key={quickAmount.value}
              type="button"
              onClick={() => setAmount(quickAmount.value)}
              className="rounded-2xl border border-primary/20 bg-white px-2 py-4 text-sm font-semibold text-primary transition hover:border-primary"
            >
              {quickAmount.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => amountInputRef.current?.focus()}
            className="rounded-2xl border border-primary/20 bg-white px-2 py-4 text-sm font-semibold text-primary transition hover:border-primary"
          >
            직접입력
          </button>
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={amount === 0}
          className={[
            'mt-6 rounded-2xl px-4 py-4 text-base font-semibold text-white transition',
            amount === 0 ? 'cursor-not-allowed bg-slate-300' : 'bg-primary hover:bg-primary/95',
          ].join(' ')}
        >
          다음
        </button>

        <div className="mt-auto">
          <Footer />
        </div>
      </section>
    </main>
  );
}
