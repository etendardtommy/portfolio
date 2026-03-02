import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Journey } from './pages/Journey';
import { Portfolio } from './pages/Portfolio';
import { Procedures } from './pages/Procedures';
import { ProcedureDetail } from './pages/ProcedureDetail';
import { Contact } from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="journey" element={<Journey />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="procedures" element={<Procedures />} />
          <Route path="procedures/:id" element={<ProcedureDetail />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

