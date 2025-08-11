import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import api from '../../services/api';

export default function CreateTest() {
  const [testData, setTestData] = useState({
    title: '',
    description: '',
    variants: [
      { name: 'Variant A', image: null },
      { name: 'Variant B', image: null }
    ]
  });

  const onDrop = (acceptedFiles, variantIndex) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      const updatedVariants = [...testData.variants];
      updatedVariants[variantIndex].image = reader.result;
      setTestData({ ...testData, variants: updatedVariants });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', testData.title);
      formData.append('description', testData.description);
      
      testData.variants.forEach((variant, index) => {
        formData.append(`variants[${index}][name]`, variant.name);
        if (variant.image) {
          const blob = dataURLtoBlob(variant.image);
          formData.append(`variants[${index}][image]`, blob, `variant-${index}.jpg`);
        }
      });
      
      await api.post('/tests', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Test created successfully!');
    } catch (error) {
      console.error('Error creating test:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New A/B Test</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Test Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={testData.title}
            onChange={(e) => setTestData({...testData, title: e.target.value})}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={testData.description}
            onChange={(e) => setTestData({...testData, description: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {testData.variants.map((variant, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">{variant.name}</h3>
              <div 
                {...useDropzone({
                  onDrop: (files) => onDrop(files, index),
                  accept: 'image/*',
                  maxFiles: 1
                })}
                className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
              >
                {variant.image ? (
                  <img 
                    src={variant.image} 
                    alt={`Variant ${index + 1}`} 
                    className="max-h-40 mx-auto mb-2"
                  />
                ) : (
                  <p>Drag & drop an image here, or click to select</p>
                )}
              </div>
              <input
                type="text"
                className="w-full p-2 border rounded mt-2"
                value={variant.name}
                onChange={(e) => {
                  const updatedVariants = [...testData.variants];
                  updatedVariants[index].name = e.target.value;
                  setTestData({...testData, variants: updatedVariants});
                }}
                required
              />
            </div>
          ))}
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Test
        </button>
      </form>
    </div>
  );
}