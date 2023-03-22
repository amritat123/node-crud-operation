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
  });
  const match = await objValidation.check();
  // console.log(match);
  if (!match) {
    return res.status(404).send({
      message: "validation error",
      success: false,
    });
  }
  if (match) {
    // confirm the password
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (password != confirmPassword ) {
      return res.status(404).send({
        message: "password does not match please re-enter password",
        success: false
      });
    }
  }
    try {
      let employee = await EmployeeModel.findOne({
        email: req.body.email
      });
      if (employee) {
        return res.status(404).send({
          message: "employee already exists",
          success: false,
        });
      }
      let hash = "";
      if(req.body.password){
        hash = await bcrypt.hash(req.body.password, 10);  
      }
      const newEmployee = new EmployeeModel({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        phone: req.body.phone,
        address: req.body.address,
        role: 'employee',
      });

      const result = await newEmployee.save();

      return res.status(200).send({
        message: "Employee registered successfully",
        success: true,
        data: result
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Failed to register please try again later",
        success: false,
      });
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
      const result = await EmployeeModel.findOne({ email: req.body.email });
      // console.log(employee);
      // if (!employee[0]) {
      //   return res.status(404).json({
      //     message: "employee not found",
      //     success: false,
      //   });
      // }
      if (result) {
        // check if the password is correct
        const checkPassword = await bcrypt.compare(
          req.body.password,
          result.password
        );
        console.log(checkPassword)
        if (!checkPassword) {
          return res.status(401).send({
            message: "Invalid password",
            success: false
          });
        }
      }
      // Generating the user with  token
              // const token = jwt.sign(
              //   {
              //     email: user[0].email,
              //     id: user[0]._id,
              //   },
              //   // process.env.JWT_SECRET,
              //   {
              //     expiresIn: "10d",
              //   }
              // );
              // return res.status(200).send({
              //   message: "login successful",
              //   success: true,
              //   token: token,
              // });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: " internal server error",
        success: false,
      });
    }
  }
};
