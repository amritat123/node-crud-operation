// Employee controller ------------------
const EmployeeModel = require("../model/employee-model");
const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const niv = require("node-input-validator");
const jwt = require("jsonwebtoken");

// Register Employee -----------------------
exports.registerEmployee = async (req, res) => {
  let objValidation = new niv.Validator(req.body, {
    name: "required|maxLength:60",
    email: "required",
    password: "required|maxLength:60",
  });
  const match = await objValidation.check();
  console.log(match);
  if (!match) {
    return res.status(404).send({
      message: "validation error",
      success: false,
    });
  }
  if (match) {
    // confirm the password
    // const password = req.body.password;
    // const confirmPassword = req.body.confirmPassword;
    // if (password !== confirmPassword) {
    //   return res.status(404).send({
    //     message: "password does not match please re-enter password",
    //     success: false
    //   });
    // }
    try {
      let employee = new EmployeeModel(req.body);
      await employee.save();
      return res.status(200).send({
        message: "Employee registered successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Failed to register please try again later",
        success: false,
      });
    }
  }
};

// Login Employee -----------------------
exports.loginEmployee = async (req, res) => {
  let objValidation = new niv.Validator({
    email: "required|email",
    password: "required",
  });
  const match = await objValidation.check();
  if (!match) {
    return res.status(404).send({
      message: "validation error",
      success: false,
    });
  }
  if (match) {
    try {
      // check if the employee exists
      const user = EmployeeModel.findOne({ email: req.body.email });
      if (!user[0]) {
        return res.status(404).send({
          message: "user not found",
          success: false,
        });
      }
      if (user[0]) {
        // check if the password is correct
        const checkPassword = await bcrypt.compare(
          req.body.password,
          user[0].password
        );
        if (!checkPassword) {
          return res.status(401).send({
            message: "Invalid password",
          });
        }
        // Generating the user with  token
        const token = jwt.sign(
          {
            email: user[0].email,
            id: user[0]._id,
          },
          // process.env.JWT_SECRET,
          {
            expiresIn: "10d",
          }
        );
        return res.status(200).send({
          message: "login successful",
          success: true,
          token: token,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: " internal server error",
        success: false,
      });
    }
  }
};
