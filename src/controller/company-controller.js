// Company controller
const CompanyModel = require(".././model/company-model");
const mongoose = require("mongoose");
const niv = require("node-input-validator");

// add company--------------------------
exports.add_company = async (req, res) => {
  const objValidation = new niv.Validator(req.body, {
    company_name: "required|maxLength:45",
    company_email: "required",
    company_phone: "required",
    company_employee: "required",
    company_website: "required",
    company_description: "required",
    // company_place: "required"
  });
  const match = await objValidation.check();
  if (!match) {
    return res.status(400).send({
      message: "Please fill all the required fields",
      data: null,
      status: 400,
      success: false,
    });
  }
  if (match) {
try {
      const company =  new CompanyModel({
        company_name: req.body.company_name,
        company_email: req.body.company_email,
        company_phone: req.body.company_phone,
        company_employee: req.body.company_employee,
        company_website: req.body.company_website,
        company_description: req.body.company_description,
      });
      await company.save();
      return res.status(200).send({
        message: "Company added successfully",
        success: true
      });
    } catch (error) {
      return res.status(500).send({
        message: "sorry! Company not added",
        success: false,
      });
    }
  }
};

// Get company----------------------
exports.get_company = async (req, res) => {
  try {
    const get_company = await CompanyModel.find();
    return res.status(200).send({
      message: "company data fetched successfully",
      data: get_company,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "sorry! Company not fetched",
      success: false
    });
  }
};

// get company by id ----------------------------
exports.get_company_by_id = async (req, res) => {
  try {
    const get_company_by_id = await CompanyModel.findById(req.params.id);
    return res.status(200).send({
      message: "company data fetched by id successfully",
      data: get_company_by_id,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "sorry! Company not fetched by id",
      data: null,
      success: false,
    });
  }
};

// update company--------------------------
exports.update_company_by_id= async (req, res) => {
  // const objValidation =  new niv.Validator(req.body,{
  //     companyId:"required",
  // });
  // const match = await objValidation.check();

  // if(!match){
  //   return res.status(400).send({
  //     message: "Validation failed",
  //     success: false
  //   });
  // }
  try {
    const update_company= await CompanyModel.findByIdAndUpdate(
      req.params.id, req.body,
      { new: true }
    );
    return res.status(200).send({
      message: "company data updated successfully",
      data: update_company,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "sorry! Company data not updated successfully",
      success: false,
    });
  };
};

// Delete company by id --------------------------
exports.delete_company_by_id = async (req, res) => {
    try {
      const _id = req.params.id;
      await CompanyModel.findByIdAndDelete(req.params.id)
  
      res.status(200).send({
        message: "company data deleted successfully",
        success: true
      });
  
    } catch (error) {
      return res.status(400).json({ 
        message:"company data not deleted",
        success: false,
      });
    }
  };