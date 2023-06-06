const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports.signup = async function(request, response) {
    const { name, email, password } = request.body;
  
    try {
      // Check if the email already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return response.status(409).json({ error: 'Email already exists' });
      }
  
      // Create a new user
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      response.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.signin = async function(request, response) {
  const { email, password } = request.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify the password
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return response.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'amanpatel', { expiresIn: '1h' });

    response.status(200).json({ token, name: user.name });
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
}