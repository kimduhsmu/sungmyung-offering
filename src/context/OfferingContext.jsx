import { createContext, useContext, useMemo, useState } from 'react';

const OfferingContext = createContext(null);

export function OfferingProvider({ children }) {
  const [offeringType, setOfferingType] = useState('');
  const [amount, setAmount] = useState(0);

  const value = useMemo(
    () => ({
      offeringType,
      setOfferingType,
      amount,
      setAmount,
      resetOffering: () => {
        setOfferingType('');
        setAmount(0);
      },
    }),
    [amount, offeringType],
  );

  return <OfferingContext.Provider value={value}>{children}</OfferingContext.Provider>;
}

export function useOffering() {
  const context = useContext(OfferingContext);

  if (!context) {
    throw new Error('OfferingContext를 찾을 수 없습니다.');
  }

  return context;
}
