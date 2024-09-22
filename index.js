const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// POST route
app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  // Simulating user ID and roll number (these should be dynamic in real use cases)
  const user_id = "john_doe_17091999"; // This should be generated dynamically based on the user
  const email = "john@xyz.com";  // Mock email
  const roll_number = "ABCD123"; // Mock roll number

  // Extract numbers and alphabets from the input data
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const highestLowerCase = alphabets
    .filter(char => char === char.toLowerCase())
    .sort((a, b) => a.localeCompare(b))
    .slice(-1);

  // File validation logic (Mock for now)
  let file_valid = false;
  let file_mime_type = null;
  let file_size_kb = null;

  if (file_b64) {
    try {
      const fileBuffer = Buffer.from(file_b64, 'base64');
      file_size_kb = (fileBuffer.length / 1024).toFixed(2); // Convert bytes to KB

      // Simple mock MIME type detection based on file signature (for example, PNG)
      file_mime_type = "image/png";  // You can use a library like `mime-types` for real file types
      file_valid = true; // Assume the file is valid if Base64 string is provided
    } catch (err) {
      file_valid = false;
    }
  }

  // Respond with the required JSON structure
  res.json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowerCase.length > 0 ? highestLowerCase[0] : null,
    file_valid,
    file_mime_type,
    file_size_kb
  });
});

// GET route
app.get('/bfhl', (req, res) => {
  res.json({
    operation_code: 1
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
