const params = new URLSearchParams(window.location.search);
const editId = params.get("id");


// ================= PAGE LOAD =================
window.onload = () => {
  if (editId) loadEmployeeForEdit(editId);
};


// ================= SAVE EMPLOYEE =================
async function saveEmployee() {
 const id = editId;

  // ================= PHONE VALIDATION =================
  if (!iti) {
    alert("Phone input not initialized");
    return;
  }

  if (phoneInput.value.trim() === "") {
    alert("Phone number is required");
    return;
  }

  if (typeof intlTelInputUtils === "undefined") {
    alert("Phone validation library not loaded. Please refresh.");
    return;
  }

  if (!iti.isValidNumber()) {
    alert("Please enter a valid phone number");
    return;
  }

  const fullPhoneNumber = iti.getNumber();

  // ================= SALARY VALIDATION =================
  const salary = getValue("salary");

  if (salary === "" || isNaN(salary)) {
    alert("Salary must contain only numbers");
    return;
  }

  if (salary.length > 7) {
    alert("Salary must be within 7 digits");
    return;
  }

  // ================= CREATE EMP OBJECT =================
  const emp = {
    first_name: getValue("first_name"),
    last_name: getValue("last_name"),
    gender: getValue("gender"),
    email: getValue("email"),
    date_of_birth: getValue("date_of_birth"),
    date_of_joining: getValue("date_of_joining"),
    phone_number: fullPhoneNumber,
    address: getValue("address"),
    salary: salary,
    department: getValue("department"),
    designation: getValue("designation"),
    status: getValue("status")
  };

  let result;

  if (id) {
    // ================= UPDATE =================
    result = await db
      .from("employee_master")
      .update(emp)
      .eq("employee_id", id);
  } else {
    // ================= INSERT =================
    result = await db
      .from("employee_master")
      .insert([emp]);
  }

  if (result.error) {
    console.error(result.error);
    alert("Failed to save employee");
    return;
  }

  alert("Employee saved successfully");
  window.location.href = "employee-list.html";
}


// ================= LOAD EMPLOYEE FOR EDIT =================
async function loadEmployeeForEdit(id) {
  const { data, error } = await db
    .from("employee_master")
    .select("*")
    .eq("employee_id", id)
    .single();

  if (error) {
    console.error(error);
    alert("Failed to load employee");
    return;
  }
  document.getElementById("employee_id").value = data.employee_id;

  document.getElementById("formTitle").innerText = "Edit Employee";

  document.getElementById("first_name").value = data.first_name || "";
  document.getElementById("last_name").value = data.last_name || "";
  document.getElementById("gender").value = data.gender || "";
  document.getElementById("email").value = data.email || "";
  document.getElementById("date_of_birth").value = data.date_of_birth || "";
  document.getElementById("date_of_joining").value = data.date_of_joining || "";
  document.getElementById("address").value = data.address || "";
  document.getElementById("salary").value = data.salary || "";
  document.getElementById("department").value = data.department || "";
  document.getElementById("designation").value = data.designation || "";
  document.getElementById("status").value = data.status || "";

  if (iti && data.phone_number) {
    iti.setNumber(data.phone_number);
  }
}


// ================= FORM HELPERS =================
function resetForm() {
  document.getElementById("employeeForm").reset();
  document.getElementById("employee_id").value = "";
  document.getElementById("formTitle").innerText = "Add Employee";

  if (iti) iti.setNumber("");
}

function goToList() {
  window.open("employee-list.html", "_blank");
}

function goToDashboard() {
  window.location.href = "index.html";
}

function getValue(id) {
  return document.getElementById(id).value.trim();
}

// ================= INPUT VALIDATIONS =================
function validateTextOnly(input) {
  input.value = input.value.replace(/[^a-zA-Z\s]/g, "");
}

function validateNumberOnly(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
}

// ================= RESET CONFIRMATION =================
const resetBtn = document.getElementById("resetBtn");
if (resetBtn) {
  resetBtn.addEventListener("click", function (event) {
    const confirmReset = confirm("Are you sure you want to reset all form fields?");
    if (!confirmReset) event.preventDefault();
  });
}

// ================= INTERNATIONAL PHONE INPUT =================

const phoneInput = document.querySelector("#phone_number");
let iti;

if (phoneInput) {
  iti = window.intlTelInput(phoneInput, {
    initialCountry: "in",
    separateDialCode: true,
    preferredCountries: ["in", "us", "gb", "ae"],
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
  });
}
// ================= PHONE INPUT RESTRICTIONS =================
if (phoneInput) {

  // Prevent letters and special characters
  phoneInput.addEventListener("keydown", function (e) {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab"
    ];

    if (allowedKeys.includes(e.key)) return;

    // Allow only numbers
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  });

  // Enforce max length based on country
  phoneInput.addEventListener("input", function () {
    if (!iti) return;

    const countryData = iti.getSelectedCountryData();
    if (!countryData || !countryData.dialCode) return;

    // Approx max national number lengths
    const maxLengths = {
      in: 10,
      us: 10,
      gb: 10,
      ae: 9
    };

    const countryCode = countryData.iso2;
    const maxLength = maxLengths[countryCode] || 15;

    if (phoneInput.value.length > maxLength) {
      phoneInput.value = phoneInput.value.slice(0, maxLength);
    }
  });
}


