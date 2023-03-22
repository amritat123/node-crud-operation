// Employee controller ------------------
const EmployeeModel = require("../model/employee-model");
const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const niv = require("node-input-validator");

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
    let objValidation  = niv.Validator({
        email: "required|email",
        password: "required",
    })
    const match = await objValidation.check();
    if (!match) {
        return res.status(404).send({
            message: "validation error",
            success: false,
        });
    }
    if (match) {
        try {
            let employee = await EmployeeModel.findOne({email: req.body.email});
        if (!employee) {
            return res.status(404).send({
                message: "Employee not found",
                success: false,
            });
        }
        
        } catch (error) {
            
        }
    }

};
