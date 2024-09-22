module.exports = (req, res) => {
  const { data, file_b64 } = req.body;

  // Simulating user ID and roll number
  const user_id = "john_doe_17091999";
  const email = "john@xyz.com";
  const roll_number = "ABCD123";

  // Extract numbers and alphabets from the input data
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const highestLowerCase = alphabets
    .filter(char => char === char.toLowerCase())
    .sort((a, b) => a.localeCompare(b))
    .slice(-1);

  // Respond with JSON
  res.json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowerCase.length > 0 ? highestLowerCase[0] : null,
  });
};
