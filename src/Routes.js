import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Requests from './components/Requests';
import TelaLogin from './components/TelaLogin';
import React ,{ useState } from 'react';
import { useEffect } from 'react';

const Rotas = () =>{
  const [logado,setLogado] = useState(true)

return(
    <BrowserRouter>
    <div className="ecommerce"> MERCEARIA SERRANA</div>
      <Routes>
        <Route path='/' element={<TelaLogin/>}/>
        <Route path='/login' element={<TelaLogin/>} />
        <Route path='/requests' element={logado ? <Requests/> : <Navigate to='/' />}/>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Rotas;