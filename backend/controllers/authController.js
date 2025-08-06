const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

// Create a new OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register function
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user object
    const userData = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'patient',
      isVerified: role === 'doctor' ? false : true // Set isVerified to false for doctors
    };

    // Create and save user
    const user = new User(userData);
    await user.save();

    // Return user data without password
    const userResponse = user.toJSON();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: userResponse
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email);

    // Find user by lowercase email
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log('User found:', user ? user.email : 'none');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE || '7d'
      }
    );

    // Return user data and token
    const userResponse = user.toJSON();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

// Google login function
const googleLogin = async (req, res) => {
  try {
    const { googleUser } = req.body;
    
    if (!googleUser || !googleUser.googleId || !googleUser.email) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Google user data'
      });
    }

    // Check if user exists with this Google ID
    let user = await User.findOne({ googleId: googleUser.googleId });
    
    if (!user) {
      // Check if user exists with this email
      user = await User.findOne({ email: googleUser.email.toLowerCase() });
      
      if (user) {
        // Update existing user with Google ID
        user.googleId = googleUser.googleId;
        await user.save();
      } else {
        // Create new user
        const userData = {
          name: googleUser.name,
          email: googleUser.email.toLowerCase(),
          googleId: googleUser.googleId,
          role: 'patient', // Default role for Google sign-in users
          isVerified: true, // Google users are verified by default
          // Generate a random password that won't be used
          password: await bcrypt.hash(Math.random().toString(36).slice(-8), 12)
        };
        
        user = new User(userData);
        await user.save();
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE || '7d'
      }
    );

    // Return user data and token
    const userResponse = user.toJSON();

    res.status(200).json({
      success: true,
      message: 'Google login successful',
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

module.exports = {
  register,
  login,
  googleLogin
};