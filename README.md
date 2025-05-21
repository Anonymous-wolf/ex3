To create a **React application that handles user form input submission** and **saves the data to a JSON file**, you'll need both a **React frontend** and a **Node.js/Express backend**. Here's a complete solution using `create-react-app` and Express.

---

## ✅ Features:

* User fills a form in React
* On form submission, data is sent to backend via `fetch`/`axios`
* Backend writes the data to a `data.json` file

---

## 🧩 Final Structure

```
project-folder/
│
├── client/            --> React frontend
│   ├── src/
│   └── ...
│
├── server/            --> Node.js backend
│   ├── server.js
│   └── data.json      --> Form submissions are saved here
│
└── package.json       --> Root package (optional)
```

---

## 🔧 Step-by-Step Guide

---

### ✨ Step 1: Create the Project

```bash
mkdir form-handler-app
cd form-handler-app
npx create-react-app client
mkdir server
cd server
npm init -y
npm install express cors body-parser fs
```

---

### 🧠 Step 2: Backend – `server/server.js`

```js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
  const formData = req.body;

  fs.readFile('data.json', (err, data) => {
    const json = data.length ? JSON.parse(data) : [];
    json.push(formData);

    fs.writeFile('data.json', JSON.stringify(json, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error saving data');
      } else {
        res.status(200).send('Data saved successfully');
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Also, create an empty file in the same folder:

```bash
echo "[]" > data.json
```

---

### 🎨 Step 3: Frontend – `client/src/App.js`

```jsx
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
```

---

### ⚙️ Step 4: Run Both Servers

#### Terminal 1 – Backend:

```bash
cd server
node server.js
```

#### Terminal 2 – Frontend:

```bash
cd client
npm start
```

---

### ✅ Result

* Open `http://localhost:3000`
* Fill in the form and click submit
* Check `server/data.json` for saved entries

---

### 📦 Optional: Combine with a proxy

Add this to `client/package.json`:

```json
"proxy": "http://localhost:5000",
```

Then change the fetch URL in `App.js` to:

```js
const response = await fetch('/submit', {
  ...
});
```

---

Would you like me to bundle this project as a downloadable ZIP?
