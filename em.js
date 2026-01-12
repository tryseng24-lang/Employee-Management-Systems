let employees = [];
let editId = null;

const employeeForm = document.getElementById('employeeForm');
const employeeTable = document.getElementById('employeeTable');
const submitBtn = document.getElementById('submitBtn');

employeeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const position = document.getElementById('position').value.trim();
  const salary = document.getElementById('salary').value.trim();

  if (!name || !position || !salary) return;

  if (editId !== null) {
    // Update employee
    employees = employees.map(emp => emp.id === editId ? { id: emp.id, name, position, salary } : emp);
    editId = null;
    submitBtn.textContent = "Add Employee";
  } else {
    // Add new employee
    const id = employees.length ? employees[employees.length - 1].id + 1 : 1;
    employees.push({ id, name, position, salary });
  }

  employeeForm.reset();
  renderTable();
});

function renderTable() {
  employeeTable.innerHTML = '';
  employees.forEach(emp => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${emp.id}</td>
      <td>${emp.name}</td>
      <td>${emp.position}</td>
      <td>${emp.salary}</td>
      <td>
        <button class="edit" onclick="editEmployee(${emp.id})">Edit</button>
        <button class="delete" onclick="deleteEmployee(${emp.id})">Delete</button>
      </td>
    `;
    employeeTable.appendChild(row);
  });
}

function editEmployee(id) {
  const emp = employees.find(emp => emp.id === id);
  document.getElementById('name').value = emp.name;
  document.getElementById('position').value = emp.position;
  document.getElementById('salary').value = emp.salary;
  editId = id;
  submitBtn.textContent = "Update Employee";
}

function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees = employees.filter(emp => emp.id !== id);
    renderTable();
  }
}