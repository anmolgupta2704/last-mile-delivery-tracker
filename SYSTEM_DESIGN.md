# System Design Document

# Last Mile Delivery Tracker

---

# Overview

The Last Mile Delivery Tracker is a full-stack MERN application designed to automate last-mile logistics operations. It enables customers to create delivery orders, administrators to manage deliveries and assign agents, and delivery agents to update delivery status in real time. The application uses JWT authentication, REST APIs, MongoDB Atlas, and Socket.IO to provide a secure and scalable delivery management platform.

---

# High Level Architecture

```
                Customer
                    │
                    ▼
             React Frontend
                    │
        REST API (Axios + JWT)
                    │
              Express Server
                    │
       ┌────────────┴────────────┐
       │                         │
 MongoDB Atlas             Socket.IO
       │                         │
       └────────────┬────────────┘
                    │
             Delivery Agents
```

---

# Architecture Style

- Client-Server Architecture
- RESTful APIs
- JWT Authentication
- Role-Based Access Control (RBAC)
- Real-Time Communication using Socket.IO

---

# System Components

## Frontend

- User Authentication
- Customer Dashboard
- Admin Dashboard
- Agent Dashboard
- Order Management
- Order Tracking
- Analytics Dashboard

## Backend

### Controllers

- Authentication Controller
- Order Controller
- Admin Controller
- Agent Controller

### Middleware

- JWT Authentication
- Role Authorization
- Request Validation
- Global Error Handler

### Database

MongoDB Atlas stores all application data.

Collections:

- Users
- Orders
- Zones
- RateCards
- CODCharges

---

# User Roles

## Customer

- Register/Login
- Create Delivery Orders
- View Order History
- Track Orders
- Reschedule Failed Orders

## Admin

- Monitor Dashboard
- View Analytics
- Manage Orders
- Auto Assign Agents
- View Revenue Reports

## Agent

- Login
- View Assigned Orders
- Update Delivery Status
- Complete Deliveries

---

# Database Design

## User

```
name
email
password
phone
role
zone
location
isAvailable
```

## Order

```
customer
agent
pickupAddress
dropAddress
pickupZone
dropZone
deliveryCharge
status
trackingHistory
```

## Zone

```
name
areas
center
```

## Rate Card

```
pickupZone
dropZone
orderType
ratePerKg
```

## COD Charge

```
orderType
charge
```

---

# API Flow

Customer Login

↓

JWT Token Generated

↓

Create Order

↓

Zone Detection

↓

Rate Calculation

↓

Order Stored

↓

Admin Assigns Agent

↓

Agent Updates Status

↓

Customer Tracks Order

---

# Authentication Flow

```
User

↓

Login

↓

JWT Token

↓

Authorization Header

↓

Verify Token Middleware

↓

Protected API Access
```

---

# Rate Calculation Engine

The delivery charge is calculated automatically whenever a customer creates a new order.

1. The system calculates the volumetric weight using:

```
Volumetric Weight = (Length × Breadth × Height) / 5000
```

2. The chargeable weight is the maximum of Actual Weight and Volumetric Weight.

3. The application searches the Rate Card collection using Pickup Zone, Drop Zone, and Order Type (B2B/B2C).

4. Delivery Charge is calculated as:

```
Chargeable Weight × Rate Per Kg
```

5. If the payment method is Cash on Delivery (COD), an additional COD charge is added.

6. The final delivery charge is stored in the order and displayed to the customer.

---

# Zone Detection Approach

The application determines pickup and drop zones from the addresses entered by the customer.

Initially, the entered address is compared with predefined service areas stored in the Zone collection.

If a matching area is found, the corresponding zone is assigned automatically.

If no predefined service area matches the address, the application assigns a default zone to ensure that orders from any location can still be created successfully. This improves usability and avoids unnecessary order rejection.

---

# Auto Assignment Logic

The administrator assigns delivery agents using the following process:

1. Find available delivery agents.
2. Match the pickup zone.
3. Calculate the nearest available agent.
4. Assign the order to that agent.
5. Update the order status to **Assigned**.
6. Notify the assigned agent through Socket.IO in real time.

---

# Failed Delivery Handling

If a delivery cannot be completed, the delivery agent marks the order as **Failed**.

The customer can request rescheduling from the dashboard.

The system changes the order status to **Rescheduled**, removes the previous agent assignment, records the action in the tracking history, and makes the order available for reassignment.

The administrator can then assign another available delivery agent to complete the delivery.

---

# Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Helmet Security Headers
- CORS Protection
- Input Validation
- Express Validator
- Protected REST APIs

---

# Deployment

Frontend

- Vercel

Backend

- Render

Database

- MongoDB Atlas

---

# Future Scope

- Google Maps Integration
- AI Route Optimization
- Payment Gateway Integration
- Push Notifications
- SMS & Email Notifications
- Mobile Application
- Multi-Warehouse Support
- Advanced Analytics Dashboard
- Route Prediction using Machine Learning

---

# Conclusion

The Last Mile Delivery Tracker provides a secure, scalable, and modular logistics management solution. The application automates delivery charge calculation, zone detection, agent assignment, order tracking, and failed delivery management while maintaining a clean architecture. Its modular design allows future enhancements such as AI-based route optimization, live map tracking, and payment integration without major architectural changes.