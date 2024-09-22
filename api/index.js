module.exports = function (req, res) {
    var _a = req.body, data = _a.data, file_b64 = _a.file_b64;
    // Simulating user ID and roll number
    var user_id = "john_doe_17091999";
    var email = "john@xyz.com";
    var roll_number = "ABCD123";
    // Extract numbers and alphabets from the input data
    var numbers = data.filter(function (item) { return !isNaN(item); });
    var alphabets = data.filter(function (item) { return isNaN(item); });
    var highestLowerCase = alphabets
        .filter(function (char) { return char === char.toLowerCase(); })
        .sort(function (a, b) { return a.localeCompare(b); })
        .slice(-1);
    // Respond with JSON
    res.json({
        is_success: true,
        user_id: user_id,
        email: email,
        roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowerCase.length > 0 ? highestLowerCase[0] : null,
    });
};
