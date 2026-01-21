let currentPage = 1;
const rowsPerPage = 12; // change this to 5, 10, 20 as you want

let allEmployees = [];

// Load when page opens
window.onload = loadEmployees;

// ================= LOAD FROM SUPABASE =================
async function loadEmployees() {
  const { data, error } = await db
    .from("employee_master")
    .select("*")
    .order("employee_id", { ascending: true });

  if (error) {
    alert("Error loading employees: " + error.message);
    console.error(error);
    return;
  }

  allEmployees = data;
  renderTable(data);
}

// ================= RENDER TABLE =================
function renderTable(data) {
  const tbody = document.getElementById("employeeTableBody");
  tbody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = data.slice(start, end);

  pageData.forEach(emp => {
    tbody.innerHTML += `
      <tr>
        <td>
          <input type="checkbox" class="rowCheckbox" data-id="${emp.employee_id}">
        </td>
        <td>${emp.employee_id}</td>
        <td>${emp.first_name} ${emp.last_name}</td>
        <td>${emp.gender}</td>
        <td>${emp.email}</td>
        <td>${emp.phone_number}</td>
        <td>${emp.department}</td>
        <td>${emp.designation}</td>
        <td>${emp.salary}</td>
        <td>${emp.status}</td>
        <td>
          <button class="btn-edit" onclick="editEmployee(${emp.employee_id})">Edit</button>
          <button class="btn-delete" onclick="deleteEmployee(${emp.employee_id})">Delete</button>
        </td>
      </tr>
    `;
  });

  renderPagination(data.length);
}


// ================= DELETE =================
async function deleteEmployee(id) {
  if (!confirm("Delete this employee?")) return;

  const { error } = await db
    .from("employee_master")
    .delete()
    .eq("employee_id", id);

  if (error) {
    alert("Delete failed: " + error.message);
    return;
  }

  alert("Deleted successfully");
  loadEmployees();
}

// ================= EDIT =================
function editEmployee(id) {
  window.location.href = `form page.html?id=${id}`;
}

// ================= SEARCH + FILTER =================
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const statusFilter = document.getElementById("statusFilter");

  function applyFilters() {
    currentPage = 1;

    const searchValue = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;

    const filtered = allEmployees.filter(emp => {
      const rowText = Object.values(emp).join(" ").toLowerCase();
      const matchesSearch = rowText.includes(searchValue);
      const matchesStatus = statusValue === "all" || emp.status.toLowerCase() === statusValue;
      return matchesSearch && matchesStatus;
    });

    renderTable(filtered);
  }

  searchInput?.addEventListener("keyup", applyFilters);
  statusFilter?.addEventListener("change", applyFilters);
});

// ================= SELECT ALL =================
document.getElementById("selectAll")?.addEventListener("change", function () {
  document.querySelectorAll(".rowCheckbox").forEach(cb => {
    cb.checked = this.checked;
  });
});

// ================= GET SELECTED =================
function getSelectedEmployees() {
  const checkedBoxes = document.querySelectorAll(".rowCheckbox:checked");

  if (!checkedBoxes.length) return [];

  const selected = [];

  checkedBoxes.forEach(cb => {
    const id = Number(cb.dataset.id);
    const emp = allEmployees.find(e => e.employee_id === id);
    if (emp) selected.push(emp);
  });

  return selected;
}


// ================= EXPORT CSV =================
function exportCSV() {
  const selectedData = getSelectedEmployees();
  if (!selectedData.length) return alert("Select at least one employee");

  const headers = [
    "Employee ID","First Name","Last Name","Gender","Email","Phone",
    "Department","Designation","Salary","Status","DOB","DOJ","Address"
  ];

  let csv = headers.join(",") + "\n";

  selectedData.forEach(emp => {
    csv += [
      emp.employee_id, emp.first_name, emp.last_name, emp.gender,
      emp.email, emp.phone_number, emp.department, emp.designation,
      emp.salary, emp.status, emp.date_of_birth, emp.date_of_joining, emp.address
    ].map(v => `"${v ?? ""}"`).join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "employee_full_details.csv";
  link.click();
  console.log("Selected:", selectedData);

}

// ================= EXPORT EXCEL =================
function exportExcel() {
  const selectedData = getSelectedEmployees();
  if (!selectedData.length) return alert("Select at least one employee");

  const worksheet = XLSX.utils.json_to_sheet(selectedData.map(emp => ({
  "Employee ID": emp.employee_id,
  "First Name": emp.first_name,
  "Last Name": emp.last_name,
  "Gender": emp.gender,
  "Email": emp.email,
  "Phone": emp.phone_number,
  "Department": emp.department,
  "Designation": emp.designation,
  "Salary": emp.salary,
  "Status": emp.status,
  "DOB": emp.date_of_birth,
  "DOJ": emp.date_of_joining,
  "Address": emp.address
})));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
  XLSX.writeFile(workbook, "employee_full_details.xlsx");
}

// ================= EXPORT PDF =================
function exportPDF() {
  const selectedData = getSelectedEmployees();
  if (!selectedData.length) return alert("Select at least one employee");

  const { jsPDF } = window.jspdf;
 const doc = new jsPDF("l", "mm", "a3");


  const tableData = selectedData.map(emp => [
    emp.employee_id,
    emp.first_name + " " + emp.last_name,
    emp.gender,
    emp.email,
    emp.phone_number,
    emp.department,
    emp.designation,
    emp.salary,
    emp.status,
    emp.date_of_birth,
    emp.date_of_joining,
    emp.address
  ]);

  doc.text("Employee Full Details", 14, 10);
  doc.autoTable({
    head: [[
      "ID","Name","Gender","Email","Phone","Department","Designation",
      "Salary","Status","DOB","DOJ","Address"
    ]],
    body: tableData,
    startY: 15
  });

  doc.save("employee_full_details.pdf");
}

// ================= PRINT =================
function printTable() {
  const printContent = document.querySelector(".table-container").innerHTML;
  const win = window.open("", "", "width=1200,height=800");

  win.document.write(`
    <html>
      <head>
        <title>Print Employee List</title>
        <link rel="stylesheet" href="employee-list.css">
      </head>
      <body>
        <h2>Employee List</h2>
        ${printContent}
      </body>
    </html>
  `);

  win.document.close();
  win.print();
}
//Dropdown is fix
function toggleExportMenu() {
  const menu = document.getElementById("exportMenu");
  menu.classList.toggle("show");
}


function renderPagination(totalRows) {
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Prev button
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;
    renderTable(allEmployees);
  };
  container.appendChild(prevBtn);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");

    btn.onclick = () => {
      currentPage = i;
      renderTable(allEmployees);
    };

    container.appendChild(btn);
  }

  // Next button
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    currentPage++;
    renderTable(allEmployees);
  };
  container.appendChild(nextBtn);
}












