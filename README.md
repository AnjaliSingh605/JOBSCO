💼 JOBSCO – Full Stack Job Board Platform
JOBSCO is a full-stack job board web application where recruiters can post jobs and manage applicants, while candidates can browse opportunities, apply, and track their application status — all in one place.

✨ Features

🧭 Dual Role Onboarding – Sign up as a Candidate or Recruiter with a tailored onboarding flow
📋 Job Listings – Recruiters can post, manage, and monitor all their job openings
🔍 Smart Filters – Candidates can filter jobs by location and type with URL-synced filters
🚀 One-Click Apply – Candidates apply instantly and never see the same job twice as "applied"
📊 Activity Tracker – Candidates track application status (Applied / Selected / Rejected) in one place
👥 Applicant Management – Recruiters view all applicants per job and select or reject candidates
📄 Resume Viewer – Recruiters can preview or download candidate resumes directly
🔐 Authentication – Secure login and session management via Clerk
📁 File Uploads – Resume PDF upload and storage via Supabase Storage
📱 Responsive Design – Fully responsive across mobile and desktop


🛠️ Tech Stack
Frontend
ToolPurposeNext.js 14Full-stack React framework (App Router + Server Actions)ReactUI components and client-side interactivityTailwind CSSUtility-first stylingShadcn UIAccessible component libraryClerkAuthentication and user session management
Backend
ToolPurposeMongoDBPrimary database for profiles, jobs, and applicationsMongooseODM for MongoDB schema and queriesNext.js Server ActionsServerless backend logic (no separate Express server)
Storage & External
ServicePurposeSupabase StorageResume PDF uploads and public URL generation

Collections: Profile, Job, Application


🚀 Run Locally
Prerequisites

Node.js 18+
npm or yarn
A MongoDB connection string (MongoDB Atlas works out of the box)

1. Clone the Repository
bashgit clone https://github.com/AnjaliSingh605/jobsco.git
cd jobsco
2. Install Dependencies
bashnpm install
3. Setup Environment Variables
Create a .env.local file in the root directory:
envNEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboard

MONGODB_URL=your_mongodb_connection_string

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
4. Run the Development Server
bashnpm run dev
Open http://localhost:3000 in your browser.

🔄 How It Works
User signs up via Clerk
        ↓
Redirected to Onboarding → selects Candidate or Recruiter role
        ↓
Profile saved to MongoDB with role attached

── Candidate Flow ──────────────────────────
Browses jobs with location & type filters (URL-synced)
        ↓
Opens job drawer → clicks Apply
        ↓
Application saved to MongoDB (status: ['Applied'])
        ↓
Tracks application status on Activity page

── Recruiter Flow ──────────────────────────
Posts a new job → saved to MongoDB
        ↓
Views all applicants per job in a side drawer
        ↓
Opens candidate detail → previews resume from Supabase
        ↓
Selects or Rejects candidate → status updated in DB

🔑 Environment Variables
VariableDescriptionNEXT_PUBLIC_CLERK_PUBLISHABLE_KEYPublishable key from Clerk DashboardCLERK_SECRET_KEYSecret key from Clerk DashboardMONGODB_URLMongoDB connection string from MongoDB AtlasNEXT_PUBLIC_SUPABASE_URLProject URL from Supabase DashboardNEXT_PUBLIC_SUPABASE_ANON_KEYAnon/public key from Supabase Dashboard

👩‍💻 Author
Anjali Singh

GitHub: @AnjaliSingh605
