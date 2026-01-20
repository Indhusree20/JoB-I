# JoB-I - Job Portal Application

JoB-I is a full-stack job portal application designed to connect job seekers with recruiters. It features a modern user interface and a robust backend to handle job listings, user authentication, and application management.

## Features

-   **User Authentication**: Secure login and registration for both Job Seekers and Recruiters.
-   **Role-Based Dashboards**:
    -   **Job Seekers**: Browse jobs, apply for positions, and track applications.
    -   **Recruiters**: Post job listings, manage applications, and view candidate profiles.
-   **Job Listings**: View detailed job descriptions and requirements.
-   **Responsive Design**: Built with a mobile-first approach for use on any device.

## Tech Stack

### Frontend
-   **React**: UI Library
-   **Vite**: Build tool for fast development
-   **Tailwind CSS** (Assumed based on modern practices, or standard CSS)
-   **Context API**: For state management (AuthContext)

### Backend
-   **Node.js**: Runtime environment
-   **Express**: Web framework
-   **MongoDB**: Database (Assumed based on typical MERN stack usage with Mongoose models)

## Getting Started

### Prerequisites

-   Node.js installed on your machine.
-   MongoDB instance (local or Atlas) for the database.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Indhusree20/JoB-I.git
    cd JoB-I
    ```

2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    # Create a .env file locally with your credentials:
    # PORT=5000
    # MONGO_URI=your_mongodb_connection_string
    # JWT_SECRET=your_jwt_secret
    npm start
    ```

3.  **Setup Frontend:**
    Open a new terminal terminal:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4.  **Access the App:**
    Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
