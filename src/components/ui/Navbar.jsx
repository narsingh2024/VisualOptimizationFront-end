import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">AB Test Platform</Link>
        <div className="flex space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="px-3 py-2">Dashboard</Link>
              <button onClick={logout} className="px-3 py-2 text-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2">Login</Link>
              <Link to="/register" className="px-3 py-2">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}