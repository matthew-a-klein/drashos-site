import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ViewDrashos from './pages/ViewDrashos'
import Home from './pages/Home';



export default function App() {
  return (<Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/viewdrashos/' element={<ViewDrashos/>}/>
    </Routes>

  </Router>)
}
