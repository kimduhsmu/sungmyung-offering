export default function KakaoPayQRModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[320px] rounded-3xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-1 text-center text-lg font-bold text-slate-900">카카오페이 송금</p>
        <p className="mb-4 text-center text-sm text-slate-500">
          카카오페이 앱에서 QR을 스캔해주세요
        </p>
        <img
          src="/kakaopay-qr.png"
          alt="카카오페이 QR 코드"
          className="mx-auto w-full rounded-2xl"
        />
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-2xl bg-slate-100 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
