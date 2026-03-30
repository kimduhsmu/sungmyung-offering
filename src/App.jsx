import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useOffering } from './context/OfferingContext';
import SelectType from './pages/SelectType';
import SubCategory from './pages/SubCategory';
import EnterAmount from './pages/EnterAmount';
import SelectPayment from './pages/SelectPayment';

function RouteGuard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { offeringType } = useOffering();

  useEffect(() => {
    const protectedRoutes = ['/amount', '/payment'];

    if (protectedRoutes.includes(location.pathname) && !offeringType) {
      navigate('/', { replace: true });
    }
  }, [location.pathname, navigate, offeringType]);

  return null;
}

export default function App() {
  return (
    <>
      <RouteGuard />
      <Routes>
        <Route path="/" element={<SelectType />} />
        <Route path="/sub-category" element={<SubCategory />} />
        <Route path="/amount" element={<EnterAmount />} />
        <Route path="/payment" element={<SelectPayment />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
