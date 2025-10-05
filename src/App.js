
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/home';
import Detail from './pages/detail';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
           <Route index element={<Home />}></Route>
           <Route path='/:id' element={<Detail/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
