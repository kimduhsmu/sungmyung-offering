export function formatAmount(value) {
  if (!value) {
    return '';
  }

  return new Intl.NumberFormat('ko-KR').format(value);
}

export function parseAmountInput(value) {
  return Number(value.replace(/[^\d]/g, '')) || 0;
}

export function formatCurrencyText(value) {
  return `${formatAmount(value)}원`;
}

export function maskAccountNumber(accountNumber) {
  const safeNumber = accountNumber || '';
  const tail = safeNumber.slice(-4);

  return `****${tail}`;
}
