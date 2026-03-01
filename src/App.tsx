import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Journey } from './pages/Journey';
import { Portfolio } from './pages/Portfolio';
import { Procedures } from './pages/Procedures';
import { ProcedureDetail } from './pages/ProcedureDetail';
import { Contact } from './pages/Contact';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './admin/components/ProtectedRoute';
import { AdminLayout } from './admin/components/AdminLayout';
import { AdminLogin } from './admin/pages/AdminLogin';
import { AdminDashboard } from './admin/pages/AdminDashboard';
import { AdminCrud } from './admin/pages/AdminCrud';
import { AdminDatabase } from './admin/pages/AdminDatabase';

function App() {
  return (
    <AuthProvider>
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

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="database" element={<AdminDatabase />} />
            <Route path=":model" element={<AdminCrud />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

