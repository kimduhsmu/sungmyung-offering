import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import OfferingButton from '../components/OfferingButton';
import { useOffering } from '../context/OfferingContext';

const categories = [
  '부활절',
  '성탄절',
  '맥추감사절',
  '추수감사절',
  '신년감사',
  '부흥회',
  '총회',
];

export default function SubCategory() {
  const navigate = useNavigate();
  const { setOfferingType, setAmount } = useOffering();

  const handleSelect = (category) => {
    setOfferingType(`기타헌금-${category}`);
    setAmount(0);
    navigate('/amount');
  };

  return (
    <main className="min-h-screen bg-white px-4 py-6">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[480px] flex-col rounded-[32px] bg-white p-6 shadow-card">
        <Header title="기타헌금" showBack />
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <OfferingButton key={category} onClick={() => handleSelect(category)}>
              {category}
            </OfferingButton>
          ))}
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </section>
    </main>
  );
}
