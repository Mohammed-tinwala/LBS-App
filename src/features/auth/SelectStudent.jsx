import React from "react";
import { useNavigate } from "react-router-dom";

const SelectStudent = () => {

    const navigate = useNavigate();
    const students = JSON.parse(localStorage.getItem("students")) || [];

    const handleSelect = (student) => {
        localStorage.setItem("student", JSON.stringify(student));
        navigate("/");
    };

    const formatName = (name) =>
        name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

    return (
        <div className="h-screen flex flex-col items-center justify-center px-4">

            <h2 className="text-xl font-semibold mb-6">
                Select Student
            </h2>

            <div className="w-full max-w-md space-y-4">
                {students.map((std) => (
                    <div
                        key={std.id}
                        onClick={() => handleSelect(std)}
                        className="p-4 bg-white rounded-xl shadow cursor-pointer hover:bg-primary/10 transition"
                    >
                        <h3 className="font-semibold">
                            {formatName(std.name)}
                        </h3>
                        <p className="text-sm text-label">
                            Enrollment: {std.enrollment}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default SelectStudent;