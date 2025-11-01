import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DurumYoneticisi } from './DurumYoneticisi';
import Anasayfa from './Anasayfa';
import DiziDetay from './DiziDetay';
import Altbilgi from './Altbilgi';

const App = () => {
  return (
    <DurumYoneticisi>
      <Router>
        <Routes>
          <Route path="/" element={<Anasayfa />} /> 
          <Route path="/detay/:id" element={<DiziDetay />} /> 
        </Routes>
      ---  //FOOTER ALANINDA BURASI VAR BU SATIRA GEREK YOK <Altbilgi olusturanAd="[ENES KARATAŞ-2321032069]" /> ----
      </Router>
    </DurumYoneticisi>
  );
};

export default App;
