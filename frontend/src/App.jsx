import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminView from './adminView/AdminView';
import ClientView from './clientView/ClientView';
import SignIn from './adminView/SignIn';
import ReqAuth from './adminView/authHelper/ReqAuth';
import Loader from './components/clientViewCompomemts/Loader';
import { useEffect, useState } from 'react';
// import { PersistGate } from 'redux-persist/integration/react';
// import store, { persistor } from './Redux/store'; // Import your store and persistor if needed

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an async operation or data fetching
    const timer = setTimeout(() => {
      setLoading(false); // Hide loader after a delay (simulating loading complete)
    }, 3000); // Adjust the delay as needed

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />; // Show loading component while app is loading
  }

  return (
    <BrowserRouter>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Routes>
        <Route path="/" exact element={<ClientView />} />
        <Route path="/login" element={<SignIn />} />

        {/* Protected Routes */}
        <Route element={<ReqAuth allowedRoles={['ADMIN']} />}>
          <Route path="/admin" element={<AdminView />} />
          {/* Add more protected routes here */}
        </Route>
      </Routes>
      {/* </PersistGate> */}
    </BrowserRouter>
  );
}

export default App;
