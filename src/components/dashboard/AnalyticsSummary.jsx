export default function AnalyticsSummary({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8">
      <h2 className="text-lg font-medium mb-4">Analytics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          title="Total Tests" 
          value={data.totalTests} 
          change={data.testsChange} 
        />
        <StatCard 
          title="Active Tests" 
          value={data.activeTests} 
          change={data.activeChange} 
        />
        <StatCard 
          title="Total Votes" 
          value={data.totalVotes} 
          change={data.votesChange} 
        />
        <StatCard 
          title="Conversion Rate" 
          value={`${data.conversionRate}%`} 
          change={data.conversionChange} 
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, change }) {
  const isPositive = change >= 0;

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
      {change !== undefined && (
        <p className={`text-sm mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}% from last week
        </p>
      )}
    </div>
  );
}