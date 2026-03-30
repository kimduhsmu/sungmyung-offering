import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Toast from '../components/Toast';
import { useOffering } from '../context/OfferingContext';
import { openKakaoPay, openNaverPay, openToss } from '../utils/deeplinks';
import { formatCurrencyText, maskAccountNumber } from '../utils/format';

const bankName = import.meta.env.VITE_BANK_NAME || '';
const accountNumber = import.meta.env.VITE_ACCOUNT_NUMBER || '';

async function copyText(text) {
  await navigator.clipboard.writeText(text);
}

export default function SelectPayment() {
  const { amount, offeringType } = useOffering();
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    setIsToastVisible(true);

    const timer = window.setTimeout(() => {
      setIsToastVisible(false);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (message) => {
    setToastMessage(message);
  };

  const handleToss = () => {
    // 앱 열기는 제스처 컨텍스트 안에서 즉시 호출
    openToss(amount, offeringType);
    showToast('Toss 앱을 실행합니다.');
    // "- 헌금종류" 를 클립보드에 복사 (토스에서 이름 뒤에 붙여넣기 용)
    copyText(`- ${offeringType}`).catch(() => {});
  };

  const handleExternalPay = async (appType) => {
    await copyText(accountNumber);

    if (appType === 'kakao') {
      showToast('계좌번호가 복사되었습니다. 카카오페이에서 붙여넣기 해주세요');
      window.setTimeout(() => {
        openKakaoPay();
      }, 1000);
      return;
    }

    showToast('계좌번호가 복사되었습니다. 네이버페이에서 붙여넣기 해주세요');
    window.setTimeout(() => {
      openNaverPay();
    }, 1000);
  };

  const handleCopyAccount = async () => {
    await copyText(accountNumber);
    showToast('계좌번호가 복사되었습니다.');
  };

  const handleCopyOffering = async () => {
    await copyText(offeringType);
    showToast('헌금종류가 복사되었습니다.');
  };

  return (
    <main className="min-h-screen bg-white px-4 py-6">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[480px] flex-col rounded-[32px] bg-white p-6 shadow-card">
        <Header title="송금 앱을 선택해주세요" showBack />

        <div className="rounded-3xl bg-primary px-5 py-6 text-white">
          <p className="text-sm font-medium text-white/75">헌금 정보</p>
          <p className="mt-2 text-xl font-bold">
            {offeringType} · {formatCurrencyText(amount)}
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={handleToss}
            className="w-full rounded-2xl bg-primary px-4 py-4 text-base font-semibold text-white transition hover:bg-primary/95"
          >
            Toss로 송금
          </button>



          <button
            type="button"
            onClick={() => handleExternalPay('kakao')}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base font-semibold text-slate-800 transition hover:border-primary hover:text-primary"
          >
            카카오페이 송금
          </button>
          <button
            type="button"
            onClick={() => handleExternalPay('naver')}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base font-semibold text-slate-800 transition hover:border-primary hover:text-primary"
          >
            네이버페이 송금
          </button>
        </div>

        <div className="mt-8 border-t border-dashed border-slate-200 pt-6">
          <p className="text-sm font-semibold text-slate-500">직접 복사</p>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-sm text-slate-500">송금 계좌</p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              {bankName} {maskAccountNumber(accountNumber)}
            </p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleCopyAccount}
              className="rounded-2xl border border-primary/20 bg-white px-4 py-4 text-sm font-semibold text-primary transition hover:border-primary"
            >
              계좌번호 복사
            </button>
            <button
              type="button"
              onClick={handleCopyOffering}
              className="rounded-2xl border border-primary/20 bg-white px-4 py-4 text-sm font-semibold text-primary transition hover:border-primary"
            >
              헌금종류 복사
            </button>
          </div>
        </div>

        <div className="mt-auto">
          <Footer />
        </div>
      </section>
      <Toast message={toastMessage} visible={isToastVisible} />
    </main>
  );
}
