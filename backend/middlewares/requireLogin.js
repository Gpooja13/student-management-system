const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const USER = mongoose.model("USER");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  jwtSecret = process.env.JWT_SECRET;

  if (!authorization) {
    return res.status(401).json({ error: "Login first" });
  } else {
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, jwtSecret, (error, payload) => {
     
      if (error) {
        return res.status(401).json({ error: "Login first" });
      }
      const { id } = payload;
      USER.findById(id).then((userData) => {
        req.user = userData;
        next();
      });
    });
  }
};

// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1]; // Extract token from 'Authorization' header
//     if (!token) {
//       return res.status(401).json({ error: "No token provided, access denied" });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(403).json({ error: "Invalid or expired token" });
//       }

//       req.user = decoded; // Attach decoded token payload to request object
//       next(); // Proceed to the next middleware or route handler
//     });
//   } catch (error) {
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };
// module.exports = router;