Employee Management System

A production-style Employee Management System built using HTML, CSS, JavaScript, and Supabase (PostgreSQL).
The application provides a structured interface for managing employee records with persistent cloud storage, data validation, and export capabilities.

This project demonstrates practical implementation of CRUD operations, RESTful data access, and client-side data processing.

Overview

The system is designed to manage organizational employee records in a centralized database. It supports creation, modification, deletion, retrieval, and exporting of employee data through a clean web-based interface backed by Supabase.

Key Features

Full CRUD operations on employee records

Search and status-based filtering

Input validation for critical fields

International phone number input with country code support

Data export functionality:

CSV

Excel (XLSX)

PDF

Print

Selection and export of individual records

Responsive administrative interface

Cloud-hosted PostgreSQL database using Supabase

Technology Stack

Frontend

HTML5

CSS3

JavaScript (Vanilla)

Backend / Database

Supabase (PostgreSQL, REST API)

Third-party Libraries

intl-tel-input

SheetJS (xlsx)

jsPDF, jsPDF-AutoTable

Project Structure
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

Setup and Configuration
1. Clone the Repository
bash
git clone https://github.com/Arief-1203/employee-management-system.git
cd employee-management-system

3. Supabase Configuration

Create a project at https://supabase.com

Create a table named employees

Obtain the following from the Supabase dashboard:

Project URL

Anon Public Key

Create a file named supabase.js and configure:
js
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";


Do not commit real credentials to public repositories.

3. Run the Application

Open 
bash
index.html
directly in a web browser.

No local server is required.

Example Database Schema

Table: employees

Column	Type	Description
id	bigint	Primary key
name	text	Employee name
phone	text	Contact number
salary	numeric	Salary
department	text	Department name
status	text	Employment status
created_at	timestamp	Record creation time
Security Considerations

API keys should not be committed to the repository.

Row Level Security (RLS) should be enabled in Supabase for production use.

Authentication and role-based access control can be added as an extension.

Author

Mohamed Arief
Computer Science Engineering Student

Email: mohamedarief1203@gmail.com

GitHub: https://github.com/Arief-1203

License

This project is intended for educational and portfolio use.
