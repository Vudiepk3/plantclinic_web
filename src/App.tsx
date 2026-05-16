/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Diseases from './pages/Diseases';
import DiseaseDetail from './pages/DiseaseDetail';
import Shopping from './pages/Shopping';
import About from './pages/About';
import { ScrollToTop } from './components/ScrollToTop';
import { DonationProvider } from './context/DonationContext';
import { DiseaseProvider } from './context/DiseaseContext';

export default function App() {
  return (
    <DiseaseProvider>
      <DonationProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diseases" element={<Diseases />} />
            <Route path="/disease/:id" element={<DiseaseDetail />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </DonationProvider>
    </DiseaseProvider>
  );
}
