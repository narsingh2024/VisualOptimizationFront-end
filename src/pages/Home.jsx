export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-6">Welcome to our A/B Testing Platform</h1>
      <p className="text-xl mb-8">Create, manage, and analyze your A/B tests</p>
      <div className="flex justify-center space-x-4">
        <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Get Started
        </a>
        <a href="/dashboard" className="bg-gray-200 px-6 py-3 rounded-lg">
          View Demo
        </a>
      </div>
    </div>
  );
}