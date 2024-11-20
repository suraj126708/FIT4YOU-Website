# Gym Management Website

A comprehensive Gym Management System built using the  (React, Node.js, Express.js) and **MySQL** for the backend database. This project provides a user-friendly interface for gym owners to manage users, trainers, memberships, and attendance seamlessly.

---

## 🚀 Features

- **User Management**: View and manage a list of gym users, including basic details like:
  - Name
  - Gender
  - Membership plan
  - Trainer assigned
  - Joining and ending dates of membership
- **Dynamic Listing**: 
  - Displays the top 5 recently joined users (default).
  - Allows toggling to view all users or filter as needed.
- **Custom Dashboard**:
  - Integrated charts and metrics for insights (e.g., user demographics, attendance stats).
  - Optimized interface for gym owners to access crucial data at a glance.
- **Scalable Database**: Uses MySQL for efficient data storage and retrieval.

---

## 🛠️ Technologies Used

### Frontend:
- **React JS**: For building the interactive user interface.
- **Tailwind CSS**: For responsive and modern styling.
- **React Chart Libraries**: For visualizing gym data (e.g., attendance, membership stats).

### Backend:
- **Node.js**: As the runtime environment.
- **Express.js**: For building the API endpoints and server logic.

### Database:
- **MySQL**: For structured data management with secure CRUD operations.

---

## 💻 Installation & Setup

Follow these steps to run the project locally:

### Prerequisites:
1. **Node.js** (v16 or later) installed.
2. **MySQL Server** installed and running.
3. **Git** for version control.

### 1. Clone the Repository:
```bash
git clone https://github.com/your-username/gym-management-website.git
cd gym-management-website
```

### 2. Backend Setup:
1. Navigate to the `backend` folder:
   ```bash
   cd server
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file for environment variables:
   ```plaintext
   DB_HOST=your-database-host
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_NAME=gym_database
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### 3. Frontend Setup:
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

---

## 📁 Project Structure

### Frontend:
- **/src**: Contains components, pages, and styles.
- **React Router**: For handling navigation between pages.

### Backend:
- **/routes**: Defines API endpoints.
- **/controllers**: Manages business logic for API routes.
- **/models**: Contains database models and queries.

### Database:
- Tables:
  - **users**: Stores user information.
  - **trainers**: Manages trainer data.
  - **memberships**: Tracks membership plans and durations.
  - and many more tables , use the given dbms_cp_final.sql file to create tables 

---

## 🔑 Key Features in Action

- **User Sorting**: Fetch and sort users by joining date.
- **Customizable Views**: Filter users based on membership plans or trainers.
- **Secure API**: Middleware for authentication and secure data handling.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## 👨‍💻 Author

Developed with ❤️ by **Suraj Gitte ☀**.  
If you have any suggestions or feedback, feel free to reach out!

[LinkedIn](https://www.linkedin.com/in/suraj-gitte-7b71a7288/) | [GitHub](https://github.com/suraj126708)

```

