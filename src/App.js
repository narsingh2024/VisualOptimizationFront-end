import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import PrivateRoute from './components/auth/PrivateRoute';
import ClientDashboard from './pages/ClientDashboard';
import VotingPage from './pages/VotingPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/ui/Navbar';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* <SocketProvider> */}
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/vote/:testId" element={<VotingPage />} />
              
              {/* Protected routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<ClientDashboard />} />
                <Route path="/dashboard" element={<ClientDashboard />} />
              </Route>
            </Routes>
          </div>
        {/* </SocketProvider> */}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;