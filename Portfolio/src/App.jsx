import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminView from './adminView/AdminView';
import ClientView from './clientView/ClientView';
import SignIn from './adminView/SignIn';
import ReqAuth from './adminView/authHelper/ReqAuth';
//import { PersistGate } from 'redux-persist/integration/react';
//import store, { persistor } from './Redux/store'; // Import your store and persistor

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
