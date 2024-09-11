import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminView from './adminView/AdminView';
import ClientView from './clientView/ClientView';
import SignIn from './adminView/SignIn';
import ReqAuth from './adminView/authHelper/ReqAuth';
import Loader from './components/clientViewCompomemts/Loader';
import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false); // Hide the loader
    }, 3000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  // If the app is still loading, show the Loader component
  if (loading) {
    return  <Loader />;
  }

  // Once loading is complete, render the main app
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<ClientView />} />
        <Route path="/login" element={<SignIn />} />

        {/* Protected routes for Admin access */}
        <Route element={<ReqAuth allowedRoles={['ADMIN']} />}>
          <Route path="/admin" element={<AdminView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
