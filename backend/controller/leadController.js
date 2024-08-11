const sendResponse = require("../utils/sendResponse");
const httpStatus = require("http-status");
const messages = require("../utils/messages");
const { validateData } = require("../middleware/JOI/validateFunction");
const {
  leadSchema,
  leadUpdateSchema,
} = require("../middleware/JOI/schemaValidate");
const LeadModel = require("../models/leadsModel");

// Create a lead
const createLead = async (req, res) => {
  try {
    const { valid, errors, value } = validateData(leadSchema, req.body);

    if (!valid) {
      return sendResponse(res, httpStatus.BAD_REQUEST, false, errors);
    }

    const { number, email } = value;

    // Check if lead already exists
    const existingLead = await LeadModel.findOne({
      $or: [{ number: number }, { email: email }],
    });
    
 
    if (existingLead) {
      return sendResponse(
        res,
        httpStatus.CONFLICT,
        false,
        messages.LEAD_EXISTS
      );
    }

    const lead = await LeadModel.create(value);

    sendResponse(res, httpStatus.CREATED, true, messages.LEAD_CREATED, lead);
  } catch (error) {
    console.error("Error creating lead:", error);
    sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      messages.SERVER_ERROR,
      error
    );
  }
};


// Get all leads
const getLeads = async (req, res) => {
  try {
    const leads = await LeadModel.find();

    sendResponse(res, httpStatus.OK, true, messages.FETCH_LEAD, leads);
  } catch (error) {
    sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      messages.SERVER_ERROR,
      error
    );
  }
};

// Get a single lead by ID
const getLeadById = async (req, res) => {
  try {
    const lead = await LeadModel.findById(req.params.id);

    if (!lead) {
      return sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        messages.LEAD_NOT_FOUND
      );
    }

    sendResponse(res, httpStatus.OK, true, messages.FETCH_LEAD, lead);
  } catch (error) {
    sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      messages.SERVER_ERROR,
      error
    );
  }
};

// Update a lead
const updateLead = async (req, res) => {
  try {
    const { valid, errors, value } = validateData(leadUpdateSchema, req.body);

    if (!valid) {
      return sendResponse(res, httpStatus.BAD_REQUEST, false, errors);
    }

    const lead = await LeadModel.findByIdAndUpdate(req.params.id, value, {
      new: true,
      runValidators: true,
    });

    if (!lead) {
      return sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        messages.LEAD_NOT_FOUND
      );
    }

    sendResponse(res, httpStatus.OK, true, messages.LEAD_UPDATE_SUCCESS, lead);
  } catch (error) {
    sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      messages.SERVER_ERROR,
      error
    );
  }
};

// Delete a lead
const deleteLead = async (req, res) => {
  try {
    const lead = await LeadModel.findByIdAndDelete(req.params.id);

    if (!lead) {
      return sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        messages.LEAD_NOT_FOUND
      );
    }

    sendResponse(
      res,
      httpStatus.NO_CONTENT,
      true,
      messages.LEAD_DELETE_SUCCESS
    );
  } catch (error) {
    sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      messages.SERVER_ERROR,
      error
    );
  }
};

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
};
