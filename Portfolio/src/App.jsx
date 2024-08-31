import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminView from './adminView/AdminView';
import ClientView from './clientView/ClientView';
import SignIn from './adminView/SignIn';
import ReqAuth from './adminView/authHelper/ReqAuth';
import Loader from './components/clientViewCompomemts/Loader';
import { useEffect, useState } from 'react';
//import { PersistGate } from 'redux-persist/integration/react';
//import store, { persistor } from './Redux/store'; // Import your store and persistor

function App() {
  const [loding, setLoging] = useState(true)
   
    useEffect(()=>{
      window.addEventListener('load', ()=>{
        setLoging(false) // once the app is fully loaded, set loading to false to hide the loader component  // replace 'false' with your own condition to hide the loader component when the app is fully loaded  // replace 'Loader' with your own component name or path to your loading component when the app is fully loaded  // replace 'ClientView' with your own component or path to your client view when the app is fully loaded  // replace 'SignIn' with your own component or path to your sign in page when the app is fully loaded  // replace 'AdminView' with your own component or path to your admin view when the app is fully loaded  // replace 'allowedRoles' with your own array of roles you want to protect your routes with  // replace 'ADMIN' with your own role when you want to protect your routes with  // replace 'ReqAuth' with your own component name or path to your authentication helper component when you want to protect your routes
      })
    })

    if(loding) {
      return <Loader />  // show loading component while app is loading  // replace with your own loading component here when needed  // replace 'Loader' with your own component name or path to your loading component
    }
   
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
