import { useState, useEffect } from "react";

function StudentForm({ onSubmit, initialData }) {
    const [form , setForm] = useState({
        name: "",
        roll: "",
        department: "",
        email: ""
    });

    useEffect(() => {
       if (initialData) setForm(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!form.name || !form.roll) return alert("Name and Roll are required");
        onSubmit({ ...form, id: initialData?.id || Date.now() });
        setForm({
            name: "", roll: "", department: "", email: ""
        });
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 shadow-md rounded-xl max-w-md mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Student" : "Add New Student"}
        </h2>
        <input
          className="w-full p-2 mb-3 border"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 mb-3 border"
          type="text"
          name="roll"
          placeholder="Roll Number"
          value={form.roll}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 mb-3 border"
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-3 border"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          type="submit"
        >
          {initialData ? "Update Student" : "Add Student"}
        </button>
      </form>
    );
}

export default StudentForm;