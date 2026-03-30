import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import OfferingButton from '../components/OfferingButton';
import { useOffering } from '../context/OfferingContext';

const offeringTypes = [
  '십일조',
  '감사헌금',
  '성전헌당헌금',
  '장학헌금',
  '선교헌금',
  '목적헌금',
];

export default function SelectType() {
  const navigate = useNavigate();
  const { resetOffering, setOfferingType, setAmount } = useOffering();

  const handleSelect = (type) => {
    setOfferingType(type);
    setAmount(0);
    navigate('/amount');
  };

  const handleSubCategory = () => {
    resetOffering();
    navigate('/sub-category');
  };

  return (
    <main className="min-h-screen bg-white px-4 py-6">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[480px] flex-col rounded-[32px] bg-white p-6 shadow-card">
        <Header title="헌금 종류를 선택해주세요" />
        <div className="grid grid-cols-2 gap-3">
          {offeringTypes.map((type) => (
            <OfferingButton key={type} onClick={() => handleSelect(type)}>
              {type}
            </OfferingButton>
          ))}
          <OfferingButton fullWidth onClick={handleSubCategory}>
            기타헌금
          </OfferingButton>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </section>
    </main>
  );
}
