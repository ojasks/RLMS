// import { User } from "../models/user.model.js";
// import { generateTokens } from "../utils/jwt.js";
// import { ROLES } from "../constants.js";

// export const register = async (req, res) => {
//   const { username, email, password, role, groupHeadFormType } = req.body;

//   // Validate group head form type
//   if (role === ROLES.GROUP_HEAD && !groupHeadFormType) {
//     return res.status(400).json({ error: "Group heads must specify form type" });
//   }

//   try {
//     const user = await User.create({
//       username,
//       email,
//       password,
//       role,
//       groupHeadFormType: role === ROLES.GROUP_HEAD ? groupHeadFormType : undefined
//     });

//     const { accessToken, refreshToken } = generateTokens(user);
//     user.refreshToken = refreshToken;
//     await user.save();

//     res.status(201).json({
//       user: {
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//         groupHeadFormType: user.groupHeadFormType
//       },
//       accessToken,
//       refreshToken
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await user.isPasswordCorrect(password))) {
//       throw new Error("Invalid credentials");
//     }

//     const { accessToken, refreshToken } = generateTokens(user);
//     user.refreshToken = refreshToken;
//     await user.save();

//     res.json({
//       user: {
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//         groupHeadFormType: user.groupHeadFormType
//       },
//       accessToken,
//       refreshToken
//     });
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// };


// // // Add this at the top with other imports
// // import { registerValidator } from "../utils/validators.js";

// // // Update your existing register function to be more robust
// // export const register = async (req, res) => {
// //   const { username, email, password, role, groupHeadFormType } = req.body;

// //   try {
// //     // Additional validation
// //     if (role === ROLES.ADMIN) {
// //       return res.status(403).json({ error: "Admin registration requires special privileges" });
// //     }

// //     // Validate group head form type
// //     if (role === ROLES.GROUP_HEAD) {
// //       if (!groupHeadFormType) {
// //         return res.status(400).json({ error: "Group heads must specify form type" });
// //       }
// //       if (!FORM_TYPES.includes(Number(groupHeadFormType))) {
// //         return res.status(400).json({ error: "Form type must be between 1-9" });
// //       }
// //     }

// //     // Check if username or email already exists
// //     const existingUser = await User.findOne({ 
// //       $or: [{ username }, { email }] 
// //     });
    
// //     if (existingUser) {
// //       return res.status(409).json({ 
// //         error: "Username or email already exists" 
// //       });
// //     }

// //     // Create user (your existing code is good)
// //     const user = await User.create({
// //       username,
// //       email,
// //       password,
// //       role: role || ROLES.USER, // Default to normal user if not specified
// //       groupHeadFormType: role === ROLES.GROUP_HEAD ? Number(groupHeadFormType) : undefined
// //     });

// //     // Generate tokens (your existing code is good)
// //     const { accessToken, refreshToken } = generateTokens(user);
// //     user.refreshToken = refreshToken;
// //     await user.save();

// //     res.status(201).json({
// //       user: {
// //         _id: user._id,
// //         username: user.username,
// //         email: user.email,
// //         role: user.role,
// //         groupHeadFormType: user.groupHeadFormType
// //       },
// //       accessToken,
// //       refreshToken
// //     });

// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // };

// // export { 
// //   register, 
// //   login 
// // };


// import { User } from "../models/user.model.js";
// import { generateTokens } from "../utils/jwt.js";
// import { ROLES } from "../constants.js";
// import { registerValidator } from "../utils/validators.js";

// // Regular user registration
// export const register = async (req, res) => {
//   const { username, email, password, role, groupHeadFormType } = req.body;

//   // Block admin registration through this route
//   if (role === ROLES.ADMIN) {
//     return res.status(403).json({ error: "Admin registration requires special privileges" });
//   }

//   // Validate group head form type
//   if (role === ROLES.GROUP_HEAD && !groupHeadFormType) {
//     return res.status(400).json({ error: "Group heads must specify form type" });
//   }

//   try {
//     const user = await User.create({
//       username,
//       email,
//       password,
//       role: role || ROLES.USER,
//       groupHeadFormType: role === ROLES.GROUP_HEAD ? groupHeadFormType : undefined
//     });

//     const { accessToken, refreshToken } = generateTokens(user);
//     user.refreshToken = refreshToken;
//     await user.save();

//     res.status(201).json({
//       user: {
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//         groupHeadFormType: user.groupHeadFormType
//       },
//       accessToken,
//       refreshToken
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Admin-only registration
// export const registerAdmin = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const user = await User.create({
//       username,
//       email,
//       password,
//       role: ROLES.ADMIN // Force role to be ADMIN
//     });

//     const { accessToken, refreshToken } = generateTokens(user);
//     user.refreshToken = refreshToken;
//     await user.save();

//     res.status(201).json({
//       user: {
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//         role: user.role
//       },
//       accessToken,
//       refreshToken
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Login (common for all roles)
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await user.isPasswordCorrect(password))) {
//       throw new Error("Invalid credentials");
//     }

//     const { accessToken, refreshToken } = generateTokens(user);
//     user.refreshToken = refreshToken;
//     await user.save();

//     res.json({
//       user: {
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//         groupHeadFormType: user.groupHeadFormType
//       },
//       accessToken,
//       refreshToken
//     });
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// };



import { User } from "../models/user.model.js";
import { generateTokens } from "../utils/jwt.js";
import { ROLES, FORM_TYPES } from "../constants.js";
import { registerValidator } from "../utils/validators.js";

// Regular user registration
export const register = async (req, res) => {
  const { username, email, password, role, groupHeadFormType } = req.body;

  try {
    // Block admin registration through this route
    if (role === ROLES.ADMIN) {
      return res.status(403).json({ 
        error: "Admin registration requires special privileges. Use /api/admin/register-admin instead." 
      });
    }

    // Validate group head requirements
    if (role === ROLES.GROUP_HEAD) {
      if (!groupHeadFormType) {
        return res.status(400).json({ 
          error: "Group heads must specify a form type (1-9)" 
        });
      }
      if (!FORM_TYPES.includes(Number(groupHeadFormType))) {
        return res.status(400).json({ 
          error: `Invalid form type. Must be one of: ${FORM_TYPES.join(', ')}` 
        });
      }
    }

    // Check for existing user
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(409).json({
        error: existingUser.email === email 
          ? "Email already registered. Please use a different email." 
          : "Username already taken. Please choose another username."
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ 
        error: "Password must be at least 8 characters long" 
      });
    }

    // Create new user
    const user = await User.create({
      username: username.trim(),
      email: email.trim(),
      password,
      role: role || ROLES.USER,
      groupHeadFormType: role === ROLES.GROUP_HEAD ? Number(groupHeadFormType) : undefined
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        groupHeadFormType: user.groupHeadFormType
      },
      accessToken,
      refreshToken
    });

  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    
    // Handle duplicate key errors (should be caught earlier but just in case)
    if (error.code === 11000) {
      return res.status(409).json({ 
        error: "Username or email already exists" 
      });
    }

    // Generic error handler
    res.status(500).json({ 
      error: "Registration failed. Please try again.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Admin-only registration
export const registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verify admin privileges (you should add your admin auth logic here)
    if (!req.user || req.user.role !== ROLES.ADMIN) {
      return res.status(403).json({ 
        error: "Only existing admins can register new admin accounts" 
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({
        error: existingUser.email === email 
          ? "Email already registered" 
          : "Username already taken"
      });
    }

    // Create admin user
    const user = await User.create({
      username: username.trim(),
      email: email.trim(),
      password,
      role: ROLES.ADMIN
    });

    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    });

  } catch (error) {
    res.status(400).json({ 
      error: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

// Login (common for all roles)
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: "Both email and password are required" 
      });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ 
        error: "Invalid credentials. Please check your email and password." 
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: "Invalid credentials. Please check your email and password." 
      });
    }

    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        groupHeadFormType: user.groupHeadFormType
      },
      accessToken,
      refreshToken
    });

  } catch (error) {
    res.status(500).json({ 
      error: "Login failed. Please try again.",
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
};