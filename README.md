# AI Adaptive Cyber Honeypot - Online Banking System

## Overview
This project is a high-fidelity **Banking Honeypot Frontend** developed for the cybersecurity project *"AI Adaptive Cyber Honeypot for Online Banking Systems"*. 

It mimics a legitimate online banking application to attract and analyze malicious traffic. While it functions like a normal bank for regular users, it acts as a data collection tool for potential attackers, logging vectors like SQL Injection, XSS, and Credential Stuffing.

## 🚀 Capabilities

### 1. Realistic Banking UI
- **Professional Design**: Built with Next.js, TypeScript, and Tailwind CSS (v4) to look indistinguishable from a real banking portal.
- **Functional Pages**: Login, Dashboard, Fund Transfer, Transaction Search, and Support.

### 2. Live Traffic Classification
- **Routing Decision Badge**: Every API response includes a visual indicator showing how the AI backend classified the traffic:
  - 🟢 **REAL BACKEND**: Safe, legitimate traffic.
  - 🔴 **HONEYPOT TRAPPED**: Malicious or suspicious traffic routed to the containment environment.
- **Transparency**: A detailed JSON viewer under every form shows exactly what the backend returned.

### 3. Honeypot Vectors
The application is intentionally designed with specific "traps":
- **Login (`/login`)**: Captures brute-force and credential stuffing attempts.
- **Fund Transfer (`/transfer`)**: The "Remarks" field allows special characters to invite Command Injection payloads.
- **Search (`/search`)**: Vulnerable-looking search bar to attract SQL Injection attacks.
- **Support (`/support`)**: Message body field designed to capture Cross-Site Scripting (XSS) payloads.

### 4. Security Monitor (`/security`)
- A specialized dashboard for "Admins" (or the demo user) to view real-time logs of attacks captured by the honeypot.

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps
1.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd frontendanti
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Backend**:
    Open `src/config.ts` and update the `API_BASE_URL` to point to your live backend (e.g., your ngrok URL or python server).
    ```typescript
    // src/config.ts
    export const API_BASE_URL = "https://your-backend-url.ngrok-free.app";
    ```

4.  **Run the Application**:
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:3000`.

---

## 📂 Project Structure

- **`src/app`**: Next.js App Router pages (`login`, `dashboard`, `transfer`, `search`, `support`, `security`).
- **`src/components`**:
    - `ResponseViewer.tsx`: The core component that displays the "AI Routing Decision" and raw JSON response.
    - `Banner.tsx`: The "AI-Powered Banking Honeypot" fixed header.
    - `ui/`: Reusable UI components (Input, Button, Card).
- **`src/config.ts`**: Central configuration for API endpoints.

## ⚠️ Disclaimer
This application is for **educational and research purposes only**. It is designed to demonstrate honeypot mechanics and traffic analysis. Do not use this code for actual financial services.
