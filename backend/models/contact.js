import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"], 
    minlength: [2, "Name must be at least 2 characters"], 
    maxlength: [50, "Name can be max 50 characters"] 
  },
  company: { 
    type: String, 
    required: [true, "Company name is required"], 
    minlength: [2, "Company name must be at least 2 characters"], 
    maxlength: [100, "Company name can be max 100 characters"] 
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    match: [ /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email" ]
  },
  country: { 
    type: String, 
    required: [true, "Country is required"], 
    minlength: [2, "Country must be at least 2 characters"], 
    maxlength: [50, "Country can be max 50 characters"] 
  },
  message: { 
    type: String, 
    required: [true, "Message is required"], 
    minlength: [10, "Message must be at least 10 characters"], 
    maxlength: [1000, "Message can be max 1000 characters"] 
  },
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
