import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function TestList() {
  const { user } = useAuth();
  // Mock data - replace with real API calls
  const tests = [
    {
      id: '1',
      title: 'Homepage Button Color',
      description: 'Testing red vs green CTA buttons',
      variants: 2,
      votes: 142,
      isActive: true,
      createdAt: '2023-05-15'
    },
    {
      id: '2',
      title: 'Pricing Page Layout',
      description: 'Comparison between single-column and multi-column layouts',
      variants: 3,
      votes: 89,
      isActive: false,
      createdAt: '2023-06-02'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My A/B Tests</h1>
        {user?.role === 'client' && (
          <Link 
            to="/tests/create" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            + Create New Test
          </Link>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tests.map((test) => (
          <div 
            key={test.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className={`h-2 ${test.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{test.title}</h2>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  test.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {test.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{test.description}</p>
              
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>{test.variants} variants</span>
                <span>{test.votes} votes</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Created: {test.createdAt}</span>
                <Link 
                  to={`/tests/${test.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tests.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-500">No tests created yet</h3>
          <p className="text-gray-400 mt-2">Get started by creating your first A/B test</p>
        </div>
      )}
    </div>
  );
}