import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import TestList from '../components/dashboard/TestList';
import AnalyticsSummary from '../components/dashboard/AnalyticsSummary';
// import CreateTestButton from '../components/dashboard/CreateTestButton';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [tests, setTests] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const [testsRes, analyticsRes] = await Promise.all([
          api.get('/tests'),
          api.get('/analytics/dashboard')
        ]);
        setTests(testsRes.data);
        setAnalytics(analyticsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {user?.role === 'client' ? 'Client Dashboard' : 'Analytics Dashboard'}
            </h1>
            {user?.role === 'client' && "Welcome "+ user.username}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <AnalyticsSummary data={analytics} />
        <TestList tests={tests} />
      </main>
    </div>
  );
}