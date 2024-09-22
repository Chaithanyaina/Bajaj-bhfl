import { useState } from 'react';
import './App.css';
import axios from 'axios';  // Importing axios to handle HTTP requests

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jsonData = JSON.parse(input);  // Parse the input as JSON
      const res = await axios.post('http://localhost:3000/bfhl', jsonData);  // Make the API call to your backend

      setResponse(res.data);  // Update the state with the response data
      setError(null);  // Clear any previous error
    } catch (err) {
      setError("Invalid JSON input or API error");  // Set error message if API call fails
      setResponse(null);  // Clear previous response data
    }
  };

  return (
    <div className="App">
      <h1>BFHL Challenge</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows="5"
          cols="50"
          placeholder='Enter JSON data, e.g. { "data": ["A", "B", "c", "3"] }'
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
