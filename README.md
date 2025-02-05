# admin dashboard

This is the react-based admin dashboard for the [ION Workout App](https://workout.ion606.com). It provides a clean and modern interface for admin tasks such as user management, workouts, export requests, audit logs, and system health monitoring.

---

## features

- **responsive design:** modules are arranged in a responsive grid layout.
- **theming support:** easily switch between light and dark modes using styled-components.
- **react router integration:** seamless navigation between login, dashboard, and other pages.
- **modern login page:** a login page that features a centered, card-like design with error handling.
- **context-based theme management:** persist theme preference using localStorage.

---

## installation

NOTE: This should be auto-installed by the [installers](https://github.com/ION-WorkoutApp/installers?tab=readme-ov-file#ion-workout-app-installers)

### prerequisites

- node.js (>= 14)
- npm or yarn

### steps

1. clone the repository:

   ```bash
   git clone https://github.com/your-username/admin-dashboard.git
   ```

2. navigate to the project directory:

   ```bash
   cd admin-dashboard
   ```

3. install dependencies:

   ```bash
   npm install
   ```

4. start the development server:

   ```bash
   npm start
   ```

---

## Structure

```
admin-dashboard/
├── public/
│   └── index.html
└── src/
    ├── api/
    │   └── authApi.js        // authentication API utilities
    ├── components/
    │   ├── AdminDashboard.jsx  // main dashboard page with modules
    │   ├── Login.jsx           // login page component
    │   ├── Navbar.jsx          // navigation bar component
    │   └── theme-context.jsx   // theme context and provider for theming
    ├── App.jsx               // main application component with routing
    └── index.js              // entry point of the application
```

---

## contributing

Contributions are welcome! feel free to fork the repository, make improvements, and submit a pull request with your changes. Please make sure your contributions adhere to the established code style and project guidelines.

---

## license

this project is licensed under the [Apache 2.0 Lisence](LICENSE).
