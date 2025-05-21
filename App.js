import React, { useState } from 'react';

function App() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const result = await response.text();
    setStatus(result);
    setForm({ name: '', email: '' });
  };

  return (
    <div style={{ padding: '2rem' }}>
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
    </div>
  );
}

export default App;
