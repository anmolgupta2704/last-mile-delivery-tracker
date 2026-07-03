# System Design Document

# Last Mile Delivery Tracker

---

# Overview

The Last Mile Delivery Tracker is a MERN Stack web application designed to automate delivery operations between customers, administrators, and delivery agents.

The system enables customers to create delivery orders while administrators monitor operations and assign available delivery agents. Agents update delivery status in real time.

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

- Client Server Architecture
- RESTful APIs
- JWT Authentication
- Role Based Access Control (RBAC)

---

# Components

## Frontend

- Authentication
- Customer Dashboard
- Admin Dashboard
- Agent Dashboard
- Orders Module
- Tracking Module
- Analytics

---

## Backend

### Controllers

- Authentication
- Orders
- Admin
- Agent

### Middleware

- JWT Authentication
- Authorization
- Validation
- Error Handling

### Database

MongoDB Atlas

Collections

- Users
- Orders
- Zones
- RateCards
- CODCharges

---

# User Roles

## Customer

- Register
- Login
- Create Order
- Track Order
- Reschedule Order

---

## Admin

- View Dashboard
- View Analytics
- Auto Assign Agent
- Manage Orders
- View Revenue

---

## Agent

- Login
- View Assigned Orders
- Update Delivery Status

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

---

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

---

## Zone

```
name

pincode
```

---

## Rate Card

```
pickupZone

dropZone

basePrice

pricePerKg
```

---

## COD Charge

```
minimum

maximum

charge
```

---

# API Flow

Customer Login

↓

JWT Generated

↓

Customer Creates Order

↓

Delivery Charges Calculated

↓

Order Stored

↓

Admin Dashboard

↓

Auto Assign Agent

↓

Agent Dashboard

↓

Update Delivery Status

↓

Customer Tracks Delivery

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

Protected Route
```

---

# Auto Assignment Logic

1. Find available agents.
2. Match pickup zone.
3. Calculate nearest distance.
4. Assign nearest agent.
5. Update order status.

---

# Security

- JWT Authentication
- Password Hashing (bcrypt)
- Helmet
- CORS
- Input Validation
- Express Validator

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

- AI Route Optimization
- Google Maps
- Payment Gateway
- Push Notifications
- SMS Alerts
- Mobile Application
- Multi Warehouse Support
- Route Prediction
- Admin Reports