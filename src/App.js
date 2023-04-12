import './App.css';
import { Store } from './store/Store';
import { Provider } from 'react-redux'
import Loginpage from './components/Loginpage';
import Dashboard from './components/Dashboard';
import Overview from './components/Overview';
import RequireAuth from './components/RequireAuth';
import {Route, Routes } from 'react-router-dom';


function App() {
  return (
   <Provider store={Store}>
        <Routes >
           <Route path="/" element={<Loginpage></Loginpage>}></Route>       
           <Route element={<RequireAuth />}>
                <Route path='/home' element={<Overview></Overview>}></Route>
                <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
           </Route>
        </Routes>
    </Provider>
  );
}

export default App;
