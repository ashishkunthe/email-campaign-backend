# 📧 Email Campaign Backend

A backend service for managing and executing email campaign flows, built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.
Supports authentication, flow management, and flow execution.

---

## 🚀 Features

- **User Authentication** – Register and login with JWT-based auth
- **Flow Management** – Create, update, delete flows
- **Flow Execution** – Execute specific flows by ID
- **MongoDB Integration** – Store users and flows
- **Environment Config** – Secure `.env` setup

---

## 🛠 Tech Stack

- **Backend Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB + Mongoose
- **Auth:** JWT
- **Other Tools:** dotenv, ts-node-dev

---

## 📂 Project Structure

```
src/
├── config/          # Database and environment config
├── models/          # Mongoose schemas
├── routes/          # Express routes
├── controllers/     # Business logic
├── middlewares/     # Auth and other middlewares
└── index.ts        # Entry point
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/email-campaign-backend.git
cd email-campaign-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### 4️⃣ Run the Server (Dev Mode)

```bash
npm run dev
```

### 5️⃣ Build & Run (Prod Mode)

```bash
npm run build
npm start
```

---

## 📡 API Endpoints

### **Auth Routes**

| Method | Endpoint                                  | Description   | Auth Required |
| ------ | ----------------------------------------- | ------------- | ------------- |
| POST   | `http://localhost:5000/api/auth/register` | Register user | ❌            |
| POST   | `http://localhost:5000/api/auth/login`    | Login user    | ❌            |

### **Flow Routes**

| Method | Endpoint                                     | Description           | Auth Required |
| ------ | -------------------------------------------- | --------------------- | ------------- |
| POST   | `http://localhost:5000/api/flows`            | Create new flow       | ✅            |
| GET    | `http://localhost:5000/api/flows`            | Get all flows         | ✅            |
| POST   | `http://localhost:5000/api/flow/:id/execute` | Execute specific flow | ✅            |
| DELETE | `http://localhost:5000/api/flows/:id`        | Delete specific flow  | ✅            |
| PUT    | `http://localhost:5000/api/flows/:id`        | Update specific flow  | ✅            |

**Example IDs in use:**

- Execute flow:
  `http://localhost:5000/api/flow/689719b40fce30069a3abe8c/execute`
- Delete flow:
  `http://localhost:5000/api/flows/689714d70fce30069a3abe86`
- Update flow:
  `http://localhost:5000/api/flows/689719060fce30069a3abe89`

---

## 🧪 Testing

If you’ve set up tests:

```bash
npm run test
```

---

## 🤝 Contributing

1. Fork this repo
2. Create a feature branch:

   ```bash
   git checkout -b feature-name
   ```

3. Commit changes:

   ```bash
   git commit -m "Add feature-name"
   ```

4. Push branch:

   ```bash
   git push origin feature-name
   ```

5. Open a pull request

---

## 📜 License

Feel free to use and modify.

---

## 👤 Author

**Ashish Kunthe**
📧 [ashish@example.com](mailto:ashish@example.com)
🔗 [GitHub](https://github.com/<your-username>) | [LinkedIn](https://linkedin.com/in/<your-link>)
