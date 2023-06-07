const User = require('../../models/user');
const Album = require('../../models/album');
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
    const token = jwt.sign({ userId: user._id }, 'amanpatel', { expiresIn: '10h' });

    response.status(200).json({ token, name: user.name });
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
}

module.exports.addAlbum = async function(request, response) {
  try {
    const { albumName } = request.body;
    const userId = request.userId;

    const newAlbum = await Album.create({ albumName });

    const user = await User.findById(userId);
    user.albums.push(newAlbum);
    await user.save();

    return response.status(200).json({ 
      album: { albumName, albumId: newAlbum._id }
    });

  }catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
}

module.exports.albums = async function(request, response) {
  try {
    const userId = request.userId;

    const user = await User.findById(userId).populate({
      path: 'albums', 
      options: {
        sort: { createdAt: -1 }
      }
    });

    const albums = user.albums.map((album) => ({
      albumName: album.albumName,
      albumId: album._id
    }))
    
    return response.status(200).json({ albums });
  }catch(error) {
    console.log(error);
  }
}

module.exports.uploadImage = async function(request, response) {
  try {

    const file = request.file;
    console.log(file);
    if (!file) {
      return response.status(400).json({ message: 'Upload Images Only!' });
    }

    response.status(200).json({ message: 'Image Uploaded!' });
  }catch(error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
}