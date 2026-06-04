import React, { useState } from 'react'

const FormValidation = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
       [e.target.password]: e.target.value,
    });
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
    }

     if (!formData.password.trim()) {
      tempErrors.password= 'Password is required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      alert('Form submitted successfully!');
      console.log(formData);
      setFormData({ name: ''});
      setFormData({ password: ''});
      setErrors({});
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Form Validation</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            <label>Password:</label>
           <input
            type="password"
            value={formData.password}
            onChange={handleChange}
          />


          
          {errors.password && <p style={{ color: 'green' }}>{errors.password}</p>}
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormValidation;



