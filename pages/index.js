import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError('Please enter some text.');
      return;
    }
    
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data.predicted_label);
      setError(null);
    } catch (error) {
      setError('An error occurred while making the request.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Text Classification</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!error && result !== null && (
        <div>
          <h2>Predicted Label: {result}</h2>
        </div>
      )}
    </div>
  );
}
