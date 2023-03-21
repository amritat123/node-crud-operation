// Employee controller ------------------
const EmployeeModel = require("../model/employee-model");
const mongoose = require("mongoose");
const niv = require("node-input-validator");

// Register Employee -----------------------
exports.registerEmployee = async (req, res) => {
  let objValidation =  new niv.Validator(req.body, {
    name: "required|maxLength:60",
    email: "required",
    password: "required|maxLength:60",
  });
  const match = await objValidation.check();
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
      return res.status(500).send({
        message: "Failed to register please try again later",
        success: false,
      });
    }
  }
};
