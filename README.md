# 📚 GyanSetu Platform

*A money-free micro-mentorship exchanging platform.*

The **GyanSetu Platform** is designed to **bridge the gap between learners and teachers** by providing a community-driven ecosystem where knowledge can be shared freely. Unlike traditional learning platforms, GyanSetu operates without monetary transactions. Instead, users earn and spend **Skill Credits** - you earn credits by teaching sessions and spend credits when learning.

This mechanism ensures a **fair, self-sustaining environment** where users are encouraged to both contribute and benefit. The platform is ideal for students, developers, creators, hobbyists, and local learning communities who value skill exchange over financial compensation.

By combining a modern **frontend stack (React + Vite + TailwindCSS)** with a robust **Django REST Framework backend**, GyanSetu delivers a seamless, secure, and scalable experience for micro-mentorship.

---

## 🔧 Tech Stack

**Frontend:**

* **React 19**: Component-based architecture for building interactive UIs
* **Vite**: Lightning-fast development server and optimized production build
* **TailwindCSS**: Utility-first CSS framework for rapid UI development
* **React Router v7**: Declarative routing for SPA navigation
* **React Query**: Data fetching, caching, and state synchronization

**Backend:**

* **Django 5.2**: High-level Python web framework for clean and maintainable code
* **Django REST Framework 3.16**: REST API support with serializers, viewsets, and authentication
* **Python-dotenv**: Environment variable management
* **django-cors-headers**: Cross-Origin Resource Sharing for frontend-backend integration

**Forms & State Management:**

* **React Hook Form**: Lightweight library for form validation and management

**Notifications:**

* Email alerts for session confirmations and password recovery

---

## 🚀 Key Features

### 👤 User & Profile System

GyanSetu provides a **clean, intuitive, and secure user profile experience**:

* **Registration & Login:** Users can create accounts securely and log in using robust authentication mechanisms.
* **Profile Customization:** Add bio, location, interests, and skill areas.
* **Skill Management:** Users can list the skills they can teach as well as the skills they want to learn.
* **Manage Learning Slots:** Users can set start/end times, specify the skill, and outline requirements for each slot.

This system ensures each user has a **unique, personalized presence** on the platform.

---

### 🎯 Smart Matching System

To help learners connect with the right mentors efficiently:

* **Tag-Based Recommendations:** Matches are generated based on skill tags, ensuring high relevance.
* **Location & Availability Boosts:** Optional relevance boosts allow users to prioritize nearby mentors or those available at compatible times.
* **Match Categories:**
  * People who can teach you
  * People you can teach

This intelligent matching encourages **active participation** and promotes skill-sharing within the community.

---

### 📅 Session(Slot) Booking & Scheduling

Scheduling learning sessions is **simple, seamless, and timezone-aware**:

* Learners can submit session requests, which are sent to available mentors in their area.
* Mentors can accept or ignore session (slot) requests.
* Timezone-aware scheduling ensures clarity for remote or international users.

This workflow keeps **mentorship interactions smooth and reliable**, reducing friction in organizing learning sessions.

---

### 💰 Skill Credit System

The platform’s unique incentive system ensures fairness and sustainability:

* **Teaching Reward:** +3 Skill Credits for conducting a session
* **Learning Cost:** –3 Skill Credits for attending a session
* **Balanced Ecosystem:** Users are encouraged to both contribute and benefit, discouraging freeloading while fostering collaboration.

Skill Credits create a **self-regulating economy** of knowledge exchange.

---

### 📧 Email Notifications

To facilitate smooth communication without building a separate in-app messaging system:

* Session acceptance alerts
* Password recovery and reset notifications
* Ensures users remain informed at all times

---

## 🖼️ Screenshots

Below are key screens to illustrate the user experience:

Home Page
<img width="2879" height="1347" alt="Home" src="https://github.com/user-attachments/assets/9e6d1137-a249-4fc6-8816-0240d9145154" />


Login Page
<img width="2879" height="1348" alt="Login" src="https://github.com/user-attachments/assets/f84f4610-63b5-4fd1-a677-6350f4127688" />


Dashboard Page
<img width="2879" height="1350" alt="Dashboard" src="https://github.com/user-attachments/assets/d4b31c56-584a-44b3-a288-943864c81458" />


Profile Page
<img width="2879" height="1348" alt="Profile" src="https://github.com/user-attachments/assets/3336c089-eb8d-4028-b9ea-78bc716ab477" />

---

## 🛠️ Installation & Setup

### Backend (Django REST Framework)

```bash
# Clone repository
git clone https://github.com/sidk-dev/GyanSetu.git
cd gyansetu/Backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Start the backend server
python manage.py runserver
```

### Frontend (React + Vite)

```bash
cd gyansetu/Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🔗 API Endpoints (Django REST Framework)

| Method | Endpoint                     | Description                  |
| ------ | ---------------------------- | ---------------------------- |
| POST   | `/accounts/register/`        | Create a new user            |
| POST   | `/accounts/login/`           | Login and receive auth token |
| GET    | `/accounts/`                 | Fetch current user profile   |
| PUT    | `/accounts/change-password/` | Update user password         |
| GET    | `/skills/`                   | Retrieve list of skills      |
| POST   | `/slots/`                    | Create a new learning session|
| GET    | `/slots/`                    | List all user sessions       |

> This table highlights the core API endpoints. Additional endpoints support authentication workflows, password recovery, skills, and slot scheduling.

The frontend interacts with these endpoints using **Axios** combined with **React Query** for caching and state management.

---

## 🖼️ Architecture Diagram

Sequence Diagram for Slot Creation Using a Database Token

<img width="741" height="581" alt="Slot Creation Sequence Diagram" src="https://github.com/user-attachments/assets/5b0094fd-edb6-47e4-9970-f257e92ea897" />

---

## 🤝 Contributing

We welcome contributions from the community!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

Your contributions can include **bug fixes, new features, UI enhancements, or documentation improvements**.

---

## 📝 License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.
