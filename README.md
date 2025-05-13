# 🚨 Emergency Response System – Academic Project

## 📘 Overview

This repository contains the source code and documentation for an academic project titled **Intelligent Emergency Response Management System**, developed as part of the integrated project at **Esprit School of Engineering**.  
The system aims to optimize emergency department (ED) operations by improving resource allocation, patient flow, and real-time data exchange between healthcare professionals.  
It enhances **patient satisfaction**, reduces **waiting times**, and ensures **effective medical intervention** in critical scenarios.

## ✨ Features

- 🔐 **User Management** – Authentication, authorization, roles, and secure login with reCAPTCHA and OTP.
- 👨‍⚕️ **Personnel Management** – Manage information about medical and administrative staff.
- 🏥 **Patient Management** – Track patient records, history, and medical status.
- 🚑 **Ambulance Tracking** – Real-time ambulance tracking using live maps and route monitoring.
- 🤖 **AI Integration** – Face recognition for secure identification and a predictive model to detect diabetes.
- 📝 **Reclamation System** – Submit and manage complaints/feedback from users.
- 🧰 **Resource Depot** – Manage emergency equipment, beds, supplies, and tools.

## 🛠 Tech Stack

- **Frontend**: React.js, HTML, CSS
- **Backend**: Node.js, Express.js, Python (if needed)
- **Database**: MongoDB / PostgreSQL
- **API Design**: RESTful API
- **Authentication**: JWT / Sessions
- **CI/CD**: Jenkins
- **Containerization**: Docker & Docker Compose
- **Development Tools**: Git, GitHub, Postman, dotenv

## 🐳 Docker Setup

The project includes a `Dockerfile` and `docker-compose.yml` for containerization.

### Build & Run

```bash
# Build and start all containers
docker-compose up --build
```
📁 Directory Structure

📂 emergency-response-system/

├── 📁 backend/              # Backend source code

│   ├── controllers/

│   ├── models/

│   ├── routes/

│   ├── Dockerfile

│   └── app.js

├── 📁 frontend/             # React frontend

│   ├── components/

│   ├── pages/

│   ├── Dockerfile

│   └── App.jsx

├── 📁 jenkins/              # Jenkins config (optional)

│   └── Jenkinsfile

├── docker-compose.yml      # Multi-container config

├── 📁 docs/                 # Project documentation

├── 📁 tests/                # Unit & integration tests

└── README.md

🚀 Getting Started

Prerequisites

Node.js v14+
MongoDB or PostgreSQL
Docker & Docker Compose
Git
Jenkins (optional for CI/CD)

🚀 Local Installation (without Docker)

git clone https://github.com/Mahdi-Kalfat/EmergencySystem4Twin5.git

cd EmergencySystem4Twin5

cd backend |
npm install |
npm start |

cd ../frontend |
npm install |
npm run dev |

🙏 Acknowledgments

Thanks to our academic mentors for their valuable feedback.

Special thanks to all contributors for their effort and collaboration.

Project inspired by real-world emergency response protocols and open-source tools.
