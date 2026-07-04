# 🚚 Last Mile Delivery Tracker

A full-stack logistics management system that automates last-mile delivery operations. The application allows customers to create delivery orders, admins to manage and assign orders, and delivery agents to update delivery status in real time.
> **Hosting Notice:** This application is hosted on the Render free tier. The backend server automatically spins down after periods of inactivity. It may take **50 to 60 seconds** for the initial load/authentication request to process while the server wakes up.

---

## 🚀 Features

### Customer
- User Registration & Login
- Create Delivery Orders
- View Order History
- Track Order Status
- Reschedule Failed Orders
- Profile Management

### Admin
- Dashboard Analytics
- View All Orders
- Auto Assign Delivery Agent
- Manual Agent Assignment
- Revenue Analytics
- Delivery Status Management
- Zone & Rate Card Management

### Agent
- Assigned Orders Dashboard
- Update Delivery Status
- Real-time Tracking Updates

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Bootstrap 5
- Axios
- React Router
- React Hot Toast
- Chart.js

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Socket.IO

---

## Project Structure

```
LastMileDeliveryTracker/

│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   ├── docs/
│   ├── seed/
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/last-mile-delivery-tracker.git

cd last-mile-delivery-tracker
```

---

### Backend

```bash
cd backend

npm install

npm run dev
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Backend (.env)

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL_USER=your_email

EMAIL_PASS=your_email_password

CLIENT_URL=http://localhost:5173
```

Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
```

---

## Demo Accounts

### Admin

```
Email:
admin@gmail.com

Password:
admin123
```

### Agent

```
Email:
agent@gmail.com

Password:
agent123
```

### Customer

```
Register a new account
```

---

## Deployment

### Frontend

Vercel

### Backend

Render

### Database

MongoDB Atlas

---

## Future Enhancements

- Google Maps Integration
- OTP Authentication
- Push Notifications
- Payment Gateway
- AI Route Optimization
- Delivery Heat Maps
- Mobile Application

---

## License

This project is created for educational and assignment purposes.
