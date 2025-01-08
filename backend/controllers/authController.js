const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER=require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");

const signUp = (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(422).json({ error: "Please send all the details" });
    }

    USER.findOne({  email: email }).then(
      (savedUser) => {
        if (savedUser) {
          return res
            .status(422)
            .json({ error: "User already exists with this email" });
        }
        bcrypt.hash(password, 12).then((hashedPassword) => {
          const user = new USER({
            name,
            email,
            password: hashedPassword,
          });
          user
            .save()
            .then((user) => {
              res.json({ message: "Saved successfully" });
            })
            .catch((error) => console.log(error));
        });
      }
    );
  } catch (error) {
    next(error);
  }
};

const signIn = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "Please send all the details" });
    }

    USER.findOne({ email: email }).then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid email" });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((match) => {
          if (match) {
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
            const { _id, name, email,rollno } = savedUser;
            // res.json({ token, user: { _id, name, email} });
            return res
              .status(200)
              .json({
                message: "Signed in successfully",
                token: token,
                user: { _id, name, email, rollno },
              });
          } else {
            return res.status(422).json({ error: "Invalid password" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (error) {
    next(error);
  }
};

// router.post("/forgot", async (req, res) => {
//   const { email } = req.body;
//   if (!email) {
//     return res.status(422).json({ error: "Please enter email" });
//   }
//   const savedUser = await USER.findOne({ email: email });
//   if (!savedUser) {
//     return res.status(422).json({ error: "Invalid email" });
//   }
//   var token = jwt.sign({ email: email }, jwtSecret, {
//     expiresIn: "1d",
//   });

//   var transporter = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "91a92acf060d12",
//       pass: "0a7517b0b5ee9b",
//     },
//   });

//   const info = await transporter.sendMail({
//     from: '"Insta-Clone 👻" <maddison53@ethereal.email>', // sender address
//     to: email, // list of receivers
//     subject: "Reset Password ✔", // Subject line
//     html: `<div><h2>Reset Password</h2><span>Generated URL :<a href="https://instagram-clone-app-mrhb.onrender.com/${token}">Click here to reset Password</a> </span></div>`, // html body
//   });
//   if (!info) {
//     return res.status(422).json({ error: "Error! Try Again." });
//   }
//   console.log("Message sent: %s", info.messageId);
//   return res.status(200).json({ res: "Email sent! Check your Email." });
// });

// router.patch("/changePassword", async (req, res) => {
//   try {
//     const { token, password } = req.body;
//     if (!token || !password) {
//       return res.status(422).json({ error: "Please enter Password" });
//     }

//     const payload = await jwt.verify(token, jwtSecret);
//     if (!payload) {
//       return res.status(422).json({ error: "User does not exist" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const updatedUser = await USER.findOneAndUpdate(
//       { email: payload.email },
//       { password: hashedPassword },
//       {
//         new: true, // return modified object
//       }
//     );

//     return res.json({ success: "Password updated successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = {
  signUp,
  signIn,
};