import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../../services/api';

export default function AnalyticsDashboard() {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const { data } = await api.get('/tests');
        setTests(data);
        if (data.length > 0) setSelectedTest(data[0]._id);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };
    fetchTests();
  }, []);

  useEffect(() => {
    if (!selectedTest) return;
    
    const fetchAnalytics = async () => {
      try {
        const { data } = await api.get(`/tests/${selectedTest}/analytics`);
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };
    fetchAnalytics();
  }, [selectedTest]);

  if (!tests.length) return <div>Loading tests...</div>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Select Test</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedTest}
          onChange={(e) => setSelectedTest(e.target.value)}
        >
          {tests.map(test => (
            <option key={test._id} value={test._id}>
              {test.title} {test.isActive ? '(Active)' : '(Inactive)'}
            </option>
          ))}
        </select>
      </div>
      
      {analytics && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Vote Distribution</h2>
          <div className="h-64">
            <Bar
              data={{
                labels: analytics.variants.map(v => v.name),
                datasets: [{
                  label: 'Votes',
                  data: analytics.variants.map(v => v.voteCount),
                  backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)'
                  ],
                  borderColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(16, 185, 129, 1)'
                  ],
                  borderWidth: 1
                }]
              }}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Total Votes</h3>
              <p className="text-2xl font-bold">{analytics.totalVotes}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Leading Variant</h3>
              <p className="text-2xl font-bold">{analytics.leadingVariant.name}</p>
              <p>{analytics.leadingVariant.voteCount} votes</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">Conversion Rate</h3>
              <p className="text-2xl font-bold">
                {analytics.conversionRate}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}