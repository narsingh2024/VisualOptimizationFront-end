// components/dashboard/CreateTest.js
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function CreateTest() {
  const [testData, setTestData] = useState({
    title: '',
    description: '',
    variants: [{ name: 'Variant A', image: null }, { name: 'Variant B', image: null }]
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
          formData.append(`variants[${index}][image]`, variant.image);
        }
      });
      
      await axios.post('/api/tests', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      {testData.variants.map((variant, index) => (
        <div key={index}>
          <h3>{variant.name}</h3>
          <div {...useDropzone({
            onDrop: (files) => onDrop(files, index),
            accept: 'image/*'
          })}>
            {variant.image ? (
              <img src={variant.image} alt={`Variant ${index + 1}`} />
            ) : (
              <p>Drag & drop an image here, or click to select</p>
            )}
          </div>
        </div>
      ))}
      <button type="submit">Create Test</button>
    </form>
  );
}