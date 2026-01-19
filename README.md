Employee Management System (Supabase)

A modern web-based Employee Management System built using HTML, CSS, JavaScript, and Supabase (PostgreSQL).

This project allows managing employee records with full CRUD operations, validations, and export features using a cloud database.

🚀Features:

✅ Add, Edit, Delete Employees

🔍 Employee List with Search & Status Filter

📞 Phone Number with Country Code & Flag (intl-tel-input)

🛡️ Field Validations (Name, Salary, Phone Number, etc.)

📤 Export Employee Data:

CSV

Excel (XLSX)

PDF

Print

☑️ Select & Export Individual Employee Records

📱 Fully Responsive Admin Dashboard

☁️ Cloud Database using Supabase (PostgreSQL)

🔐 Ready for Auth & Role-based access (can be extended)

🛠️ Technologies Used:

Frontend:

HTML5

CSS3

JavaScript

Backend / Database:

Supabase (PostgreSQL, REST API)

Libraries:

intl-tel-input

SheetJS (xlsx)

jsPDF & jsPDF-AutoTable

📂 Project Structure:

employee-management-system/
│
├── index.html
├── style.css
├── script.js
│
├── employee-list.html
├── employee-list.css
├── employee-list.js
│
├── dashboard.html
├── dashboard.css
├── dashboard.js
│
├── supabase.js
└── README.md

⚙️ Setup & Run the Project:

1️⃣ Clone the repository
git clone https://github.com/Arief-1203/employee-management-system.git

cd employee-management-system

2️⃣ Create Supabase Project

Go to https://supabase.com

Create a new project

Create an employees table

Get:

Project URL

Anon Public Key

3️⃣ Configure Supabase

Create a file called:

supabase.js


Add:

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";


⚠️ Do NOT commit real keys to GitHub
Use .env or placeholders if public.

4️⃣ Run the Project

Just open:

index.html


in your browser ✅

(No server required)

Database Table Structure :
Screenshots:
<img width="1920" height="993" alt="image" src="https://github.com/user-attachments/assets/3cbec0fc-7972-4e8b-8d70-aacce4f8f28c" />


Author:
Mohamed Arief
Intern | Web Development | Full Stack Project

📧 Email: mohamedarief1203@gmail.com
🔗 GitHub: https://github.com/Arief-1203
