const { default: mongoose } = require("mongoose");


const applicationSchema = new mongoose.Schema({
   recruiterUserId : String,
   name : String, // candidate
   email : String,
   candidateUserId : String,
   status : Array,
   jobID : String,
   jobAppliedDated : String
});

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);
export default Application