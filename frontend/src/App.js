import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ViewDrashos from './pages/ViewDrashos'
import Home from './pages/Home';
import PostDrashos from './pages/PostDrashos';



export default function App() {
  return (<Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/viewdrashos/' element={<ViewDrashos/>}/>
      <Route path='/postdrashos/' element={<PostDrashos/>}/>
    </Routes>

  </Router>)
}
