import React, { useState } from 'react';

function App() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('');
  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.text();
      setStatus(result);

      // Add new form data to submittedData array
      setSubmittedData((prevData) => [...prevData, form]);

      // Reset form
      setForm({ name: '', email: '' });
    } catch (error) {
      setStatus('Error submitting form');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Submit</button>
      </form>

      <p>{status}</p>

      <div style={{ marginTop: '2rem', maxWidth: '400px' }}>
        <h2>Submitted Data:</h2>
        <ul style={{ backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
          {submittedData.length > 0 ? (
            submittedData.map((item, index) => (
              <li key={index} style={{ borderBottom: '1px solid #ccc', padding: '0.5rem 0' }}>
                <strong>Name:</strong> {item.name} <br />
                <strong>Email:</strong> {item.email}
              </li>
            ))
          ) : (
            <p>No data submitted yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
