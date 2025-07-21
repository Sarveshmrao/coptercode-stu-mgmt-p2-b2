import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import StudentForm from "../components/StudentForm";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/students/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch student data");
        return res.json();
      })
      .then((data) => {
        setStudent(data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
        alert("Failed to fetch student data. Please try again.");
      });
  }, [id]);

  const handleUpdate = (updatedStudent) => {
    const stored = JSON.parse(localStorage.getItem("students")) || [];
    const updatedList = stored.map((s) =>
      s._id === parseInt(id) ? updatedStudent : s
    );
    localStorage.setItem("students", JSON.stringify(updatedList));
    navigate("/");
  };
  return (
    <div>
      {student && <StudentForm onSubmit={handleUpdate} initialData={student} />}
    </div>
  );
}

export default EditStudent;
