import './App.css';
import { Store } from './store/Store';
import { Provider } from 'react-redux'
import Dashboard from './components/Dashboard';
import Overview from './components/Overview';
import {Route, Routes } from 'react-router-dom';


function App() {
  return (
   <Provider store={Store}>
        <Routes>
           <Route path='/' element={<Overview></Overview>}></Route>
            <Route path='dashboard' element={<Dashboard></Dashboard>}></Route>
        </Routes>
    </Provider>
  );
}

export default App;
