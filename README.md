# Coffee_Shop
## Introduction

This project is a full-stack web application designed to provide users with an exceptional coffee shop experience online. It features a modern frontend built with React and a robust backend powered by Spring Boot.

## Technologies Used

- **Frontend**: React, TypeScript, HTML, CSS, JavaScript
- **Backend**: Java, Spring Boot
- **Build Tools**: npm, Maven

## Getting Started

Follow the steps below to set up and run the project on your local machine.

### Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later)
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) (v11 or later)
- [Apache Maven](https://maven.apache.org/) (v3.6.x or later)
- [Git](https://git-scm.com/)

### Installation and Setup

1. **Clone the repository**

   Open a terminal and run the following command to clone the project repository:

   ```bash
   git clone https://github.com/william2271/Coffee_Shop.git
   cd coffee-shop-app

2. **Set up the backend and the frontend**

   Navigate to the backend directory:

    ```bash
    cd coffee
    ```

   Build the backend application using Maven, and run the application:

    ```bash
    mvn clean install
    mvn spring-boot:run
    ```

    The backend server will start running on http://localhost:8081. 


3. **Set up the frontend**


   Open a new terminal and navigate to the frontend directory

   ```bash
   cd coffee-shop-app
   ```

   Install vite:
   ```bash
   npm install -g create-vite
   ```

    Install the required npm packages, and start the front end application:
    ```bash
    npm install
    npm run dev
    ```

    The terminal should tell you which port the application will be hosted on, depending on which ports are already in use. Enjoy!
