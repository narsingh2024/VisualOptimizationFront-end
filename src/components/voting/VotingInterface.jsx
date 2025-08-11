import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../context/SocketContext';
import api from '../../services/api';

export default function VotingInterface() {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [voteCounts, setVoteCounts] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const { data } = await api.get(`/tests/${testId}`);
        setTest(data);
        
        // Initialize vote counts
        const counts = {};
        data.variants.forEach(v => counts[v._id] = 0);
        setVoteCounts(counts);
        
        // Subscribe to test updates
        socket.emit('subscribeToTest', testId);
      } catch (error) {
        console.error('Error fetching test:', error);
      }
    };

    fetchTest();

    socket.on('voteUpdate', (data) => {
      setVoteCounts(prev => ({
        ...prev,
        [data.variantId]: data.newVoteCount
      }));
    });

    return () => {
      socket.off('voteUpdate');
    };
  }, [testId, socket]);

  const handleVote = async () => {
    if (!selectedVariant) return;
    
    try {
      await api.post(`/tests/${testId}/vote`, { variantId: selectedVariant });
      setHasVoted(true);
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  if (!test) return <div>Loading test...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">{test.title}</h1>
      
      {hasVoted ? (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-4">Thank you for voting!</h2>
          <div className="max-w-md mx-auto">
            {test.variants.map(variant => (
              <div key={variant._id} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{variant.name}</span>
                  <span>{voteCounts[variant._id] || 0} votes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-blue-600 h-4 rounded-full" 
                    style={{ width: `${(voteCounts[variant._id] || 0) * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {test.variants.map(variant => (
            <div 
              key={variant._id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedVariant === variant._id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedVariant(variant._id)}
            >
              <img 
                src={variant.imageUrl} 
                alt={variant.name} 
                className="w-full h-64 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-center">{variant.name}</h3>
            </div>
          ))}
        </div>
      )}
      
      {!hasVoted && (
        <div className="mt-8 text-center">
          <button
            onClick={handleVote}
            disabled={!selectedVariant}
            className={`px-6 py-3 rounded-lg text-white font-medium ${
              !selectedVariant 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            Submit Vote
          </button>
        </div>
      )}
    </div>
  );
}