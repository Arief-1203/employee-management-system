async function loadDashboard() {
  const { data, error } = await db.from("employee_master").select("*");

  if (error) {
    console.error(error);
    alert("Failed to load dashboard data");
    return;
  }

  const dataArr = data; // same as your old "data"

  document.getElementById("totalEmployees").innerText = dataArr.length;

  const active = dataArr.filter(e => e.status === "Active").length;
  const inactive = dataArr.filter(e => e.status === "Inactive").length;

  document.getElementById("activeEmployees").innerText = active;
  document.getElementById("inactiveEmployees").innerText = inactive;

  const departments = new Set(dataArr.map(e => e.department));
  document.getElementById("departmentCount").innerText = departments.size;

  buildStatusChart(dataArr);
  buildDepartmentChart(dataArr);
}

loadDashboard();




// ================= STATUS CHART =================
function buildStatusChart(data) {
  const activeCount = data.filter(e => e.status === "Active").length;
  const inactiveCount = data.filter(e => e.status === "Inactive").length;

  new Chart(document.getElementById("statusChart"), {
    type: "bar",
    data: {
      labels: ["Active", "Inactive"],
      datasets: [{
        label: "Employees",
        data: [activeCount, inactiveCount],
        backgroundColor: ["#2ecc71", "#e74c3c"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// ================= DEPARTMENT CHART =================
function buildDepartmentChart(data) {
  const deptMap = {};

  data.forEach(emp => {
    deptMap[emp.department] = (deptMap[emp.department] || 0) + 1;
  });

  new Chart(document.getElementById("departmentChart"), {
    type: "pie",
    data: {
      labels: Object.keys(deptMap),
      datasets: [{
        data: Object.values(deptMap),
        backgroundColor: [
          "#3498db",
          "#9b59b6",
          "#f1c40f",
          "#e67e22",
          "#1abc9c"
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}
