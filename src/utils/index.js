export const recruiterOnboardFormControls = [
    {
      label : "Name",
      name : "name",
      placeholder : "Enter your Name",
      componentType : "input"
    },
    {
      label : "Company Name",
      name : "companyName",
      placeholder : "Enter your Company Name",
      componentType : "input"
    },
    {
      label : "Company Role",
      name : "companyRole",
      placeholder : "Enter your company role",
      componentType : "input"
    },
]

export const initialRecruiterFormData = {
    name : "",
    companyName : "",
    companyRole : ""
}

export const candidateOnBoardFormControls = [
  {
    label : "Resume",
    name : "resume",
    componentType : "file",
  },
  {
    label : "Name",
    name : "name",
    placeholder : "Enter your name",
    componentType : "input",
  },
  {
    label : "Current Company",
    name : "currenCompany",
    placeholder : "Enter your current company",
    componentType : "input",
  },
  {
    label : "Current Job Location",
    name : "currentJobLoaction",
    placeholder : "Enter your current job location",
    componentType : "input",
  },
  {
    label : "Prefered Job Location",
    name : "preferedJobLoaction",
    placeholder : "Enter your prefered job location",
    componentType : "input",
  },
  {
    label : "Current Salary",
    name : "currentSalary",
    placeholder : "Enter your current salary",
    componentType : "input",
  },
  {
    label : "Notice Period",
    name : "noticePeriod",
    placeholder : "Enter your notice period",
    componentType : "input",
  },
  {
    label : "Skills",
    name : "skills",
    placeholder : "Enter your skills",
    componentType : "input",
  },
  {
    label : "Current Company",
    name : "currentCompany",
    placeholder : "Enter your current company",
    componentType : "input",
  },
  {
    label : "Previous Companies",
    name : "previousCompanies",
    placeholder : "Enter your previous companies",
    componentType : "input",
  },
  {
    label : "Total Experience",
    name : "totalExperience",
    placeholder : "Enter your total experience",
    componentType : "input",
  },
  {
    label : "College",
    name : "college",
    placeholder : "Enter your college",
    componentType : "input",
  },
  {
    label : "College Locatiob",
    name : "collegeLocation",
    placeholder : "Enter your college location",
    componentType : "input",
  },
  {
    label : "Graduated Year",
    name : "graduatedYear",
    placeholder : "Enter your graduated year",
    componentType : "input",
  },
  {
    label : "LinkedIn Profile",
    name : "linkedinProfile",
    placeholder : "Enter your linkedin profile",
    componentType : "input",
  },
  {
    label : "Github Profile",
    name : "githubProfile",
    placeholder : "Enter your github profile",
    componentType : "input",
  },
]

export const initialCandidateFormData = {
  resume : "",
  name : "",
  currenCompany :"",
  currentJobLoaction : "",
  preferedJobLoaction : "",
  currentSalary : "",
  noticePeriod : "",
  skills : "",
  currentCompany : "",
  previousCompanies : "",
  totalExperience : "",
  college : "",
  collegeLocation : "",
  graduatedYear : "",
  linkedinProfile : "",
  githubProfile : ""
}

export const postNewJobFormControls = [
  {
     label : "Company Name",
     name : "companyName",
     placeholder : "Company Name",
     componentType : "input",
     disabled : true
  },
  {
     label : "Title",
     name : "title",
     placeholder : "Job Title",
     componentType : "input"
  },
  {
     label : "Type",
     name : "type",
     placeholder : "Job Type",
     componentType : "input"
  },
  {
     label : "Location",
     name : "location",
     placeholder : "Job Location",
     componentType : "input"
  },
  {
     label : "Experience",
     name : "experience",
     placeholder : "Job Experience",
     componentType : "input"
  },
  {
     label : "Description",
     name : "description",
     placeholder : "Job Description",
     componentType : "input"
  },
  {
     label : "Skills",
     name : "skills",
     placeholder : "Job Skills",
     componentType : ""
  },
]

export const initialpostNewJobFormData = {
   companyName : "",
   title : "",
   type : "",
   location : "",
   experience : "",
   description : "",
   skills : "",
}