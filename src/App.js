
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/home';
import Detail from './pages/detail';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home />}></Route>
            <Route path='/:id' element={<Detail/>}></Route>
          </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false}/>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
