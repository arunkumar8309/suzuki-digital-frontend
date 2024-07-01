import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createData } from "./../Api/api";
import "./UserFormStyle.css";

const UserForm = () => {
  const [formData, setFormData] = useState({
    user: "",
    interest: "",
    age: "",
    mobile: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "user":
        if (!value) {
          error = "User name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "User name must contain only alphabetic characters";
        }
        break;
      case "interest":
        if (!value) {
          error = "Interest is required";
        } else if (!/^[a-zA-Z\s,]*$/.test(value)) {
          error = "Interest must be alphanumeric and can include commas";
        }
        break;
      case "age":
        if (!value) {
          error = "Age is required";
        } else if (isNaN(value)) {
          error = "Age must be a number";
        }
        break;
      case "mobile":
        if (!value) {
          error = "Mobile number is required";
        } else if (!/^\d+$/.test(value)) {
          error = "Mobile number must be numeric";
        }
        break;
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email format is invalid";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validate = () => {
    const newErrors = errors;

    // Validate each field in formData
    Object.keys(formData).forEach((field) => {
      const value = formData[field];
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
      }
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).some((key) => validationErrors[key])) {
      setErrors(validationErrors);
      return;
    }

    const dataToSubmit = {
      ...formData,
      interest: formData.interest.split(",").map((item) => item.trim()),
    };

    try {
      const result = await createData("create", dataToSubmit);
      setSubmissionMessage("Form submitted successfully!");
      const UseId = result.data._id;
      localStorage.setItem("use_id", UseId);
      setTimeout(() => {
        navigate("/userDetails");
      }, 1000);
    } catch (error) {
      setSubmissionMessage("Failed to submit form.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <section className="Form_main_section">
        <div className="form-container">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to="/userList">
              <button className="user-btn-form">User List</button>
            </Link>
          </div>
          <p className="title">User Created Form</p>
          {submissionMessage && (
            <p style={{ textAlign: "center", padding: "10px 0px" }}>
              {submissionMessage}
            </p>
          )}
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="user">User</label>
              <input
                type="text"
                name="user"
                id="user"
                placeholder="User Name"
                value={formData.user}
                onChange={handleChange}
              />
              {errors.user && <span className="error">{errors.user}</span>}
            </div>
            <div className="input-group">
              <label htmlFor="interest">Interest</label>
              <input
                type="text"
                name="interest"
                id="interest"
                placeholder="Comics, Sports"
                value={formData.interest}
                onChange={handleChange}
              />
              {errors.interest && (
                <span className="error">{errors.interest}</span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                name="age"
                id="age"
                placeholder="User Age"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <span className="error">{errors.age}</span>}
            </div>
            <div className="input-group">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="User Mobile No"
                maxLength="10"
                minLength="10"
                value={formData.mobile}
                onChange={handleChange}
              />
              {errors.mobile && <span className="error">{errors.mobile}</span>}
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="User Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <button className="submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UserForm;
