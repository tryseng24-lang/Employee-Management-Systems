import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Load data from localStorage if available
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem("employees");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, firstName: "Dhruvi", lastName: "Bhayani", email: "dhruvi@gmail.com" },
          { id: 2, firstName: "Mishva", lastName: "Prajapati", email: "mishva@gmail.com" },
          { id: 3, firstName: "Mansi", lastName: "Isamaliya", email: "mansi@gmail.com" },
          { id: 4, firstName: "Zeel", lastName: "Panchal", email: "zeel@gmail.com" },
        ];
  });

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "" });
  const [editId, setEditId] = useState(null);

  // Save to localStorage whenever employees change
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editId ? { ...emp, ...formData } : emp
        )
      );
      setEditId(null);
    } else {
      const newEmp = { id: Date.now(), ...formData };
      setEmployees([...employees, newEmp]);
    }
    setFormData({ firstName: "", lastName: "", email: "" });
    setShowForm(false);
  };

  const handleEdit = (id) => {
    const emp = employees.find((emp) => emp.id === id);
    setFormData({ firstName: emp.firstName, lastName: emp.lastName, email: emp.email });
    setEditId(id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Employee Management</h1>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "Add User"}
        </button>
      </header>

      {showForm && (
        <form className="employee-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button type="submit">{editId ? "Update" : "Add"}</button>
        </form>
      )}

      <table className="employee-table">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp.id}>
              <td>{index + 1}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.email}</td>
              <td>
                <button className="view">View</button>
                <button className="edit" onClick={() => handleEdit(emp.id)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
