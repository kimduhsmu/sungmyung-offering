const bankName = import.meta.env.VITE_BANK_NAME || '';
const accountNumber = import.meta.env.VITE_ACCOUNT_NUMBER || '';

function isAndroid() {
  return /Android/i.test(window.navigator.userAgent);
}

function isIOS() {
  return /iPhone|iPad|iPod/i.test(window.navigator.userAgent);
}

export function buildTossLink(amount, message) {
  const params = new URLSearchParams({
    bank: bankName,
    accountNo: accountNumber,
    amount: String(amount),
    message,
  });

  return `supertoss://send?${params.toString()}`;
}

export function buildTossIntentLink(amount, message) {
  const params = new URLSearchParams({
    bank: bankName,
    accountNo: accountNumber,
    amount: String(amount),
    message,
  });

  return `intent://send?${params.toString()}#Intent;scheme=supertoss;package=viva.republica.toss;end`;
}

export function openAppLink(appUrl, fallbackUrl) {
  let isPageHidden = false;

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      isPageHidden = true;
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  window.location.href = appUrl;

  const timer = window.setTimeout(() => {
    if (!isPageHidden) {
      window.location.href = fallbackUrl;
    }
  }, 1600);

  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.clearTimeout(timer);
  };
}

export function openToss(amount, message) {
  if (isAndroid()) {
    return openAppLink(
      buildTossIntentLink(amount, message),
      'https://play.google.com/store/apps/details?id=viva.republica.toss',
    );
  }

  if (isIOS()) {
    return openAppLink(
      buildTossLink(amount, message),
      'https://apps.apple.com/kr/app/%ED%86%A0%EC%8A%A4/id839333328',
    );
  }

  return openAppLink(
    buildTossLink(amount, message),
    'https://toss.im',
  );
}

export function openKakaoPay() {
  return openAppLink(
    'kakaotalk://',
    'https://apps.apple.com/kr/app/kakaotalk/id362057947',
  );
}

export function openNaverPay() {
  return openAppLink(
    'naversearchapp://',
    'https://apps.apple.com/kr/app/naver/id393499958',
  );
}
