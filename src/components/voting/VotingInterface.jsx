// components/voting/VotingInterface.js
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../context/SocketContext';

export default function VotingInterface() {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [voteCounts, setVoteCounts] = useState({});
  const socket = useContext(SocketContext);

  useEffect(() => {
    const fetchTest = async () => {
      const response = await axios.get(`/api/tests/${testId}`);
      setTest(response.data);
    };
    fetchTest();

    socket.emit('subscribeToTest', testId);
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
    await axios.post(`/api/tests/${testId}/vote`, { variantId: selectedVariant });
    // Local UI update
  };

  return (
    <div>
      <h2>{test?.title}</h2>
      <div className="flex">
        {test?.variants.map(variant => (
          <div 
            key={variant._id} 
            onClick={() => setSelectedVariant(variant._id)}
            className={selectedVariant === variant._id ? 'border-2 border-blue-500' : ''}
          >
            <img src={variant.imageUrl} alt={variant.name} />
            <p>{variant.name}</p>
            <p>Votes: {voteCounts[variant._id] || 0}</p>
          </div>
        ))}
      </div>
      <button onClick={handleVote} disabled={!selectedVariant}>
        Submit Vote
      </button>
    </div>
  );
}