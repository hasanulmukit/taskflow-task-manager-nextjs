# TaskFlow – Kanban Style Task Manager

TaskFlow is a modern task manager built with Next.js (App Router), Tailwind CSS, and dnd kit for drag-and-drop functionality. The application allows you to manage tasks in a Kanban-style board, featuring functionalities such as:

- **Drag-and-Drop**: Reorder tasks within columns and move them between columns with smooth animations.
- **Dynamic Column Management**: Add, edit, and delete columns.
- **Task Management**: Create, edit, and delete tasks.
- **Persistent State**: The board state is saved in the browser's local storage so your tasks persist between sessions.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Light/Dark Mode**: Switch between light and dark themes easily.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)


## Features

- **Drag-and-Drop Kanban Board**: Move tasks effortlessly with dnd kit.
- **Reordering Tasks & Columns**: Change the order of tasks within a column or move them across columns.
- **Add/Edit/Delete Tasks and Columns**: Manage your workflow with a user-friendly interface.
- **Local Storage Persistence**: Your board data is automatically saved in the browser.
- **Responsive & Modern UI**: Built with Tailwind CSS for a sleek, modern look and optimized for all devices.
- **Light/Dark Mode**: Toggle between light and dark themes to suit your preference.

## Technologies Used

- **Next.js (App Router)** – Server and client-side rendering with a modern React framework.
- **Tailwind CSS** – Utility-first CSS framework for fast UI development.
- **dnd kit** – A modern drag-and-drop toolkit for React.
- **React Icons** – Icon library for React to enhance UI elements.
- **UUID** – For generating unique IDs for tasks and columns.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/taskflow.git
   cd taskflow
   ```

2. Install dependencies:

- Using npm:
  ```bash
  npm install
  ```
- Or using Yarn:
  ```bash
  yarn install
  ```
- Install additional packages (if not already installed):
  ```bash
  npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities uuid react-icons
  ```
- Running the Development Server
- Start the development server:
  ```bash
  npm run dev
  ```
- Then, open http://localhost:3000 in your browser to view the application.

### Project Structure

- Below is a suggested project structure:

- taskflow/
- ├─ app/
- │ ├─ layout.jsx // Global layout and style imports
- │ └─ page.jsx // Main page rendering the board
- ├─ components/
- │ ├─ Board.jsx // Main board component managing columns and tasks
- │ ├─ Column.jsx // Component for an individual column with task list
- │ ├─ SortableColumn.jsx // Wrapper to make columns draggable
- │ └─ Task.jsx // Individual task component with edit/delete actions
- ├─ app/globals.css // Global Tailwind CSS file
- ├─ package.json // Project configuration and scripts
- └─ tailwind.config.js // Tailwind CSS configuration

### Customization

- Styling:
  The application is styled with Tailwind CSS. You can adjust the color palette and design by modifying Tailwind classes in the components or updating the tailwind.config.js file.

- State Persistence:
  Data is stored in local storage. For a production environment, consider integrating a backend (e.g., Firebase, Node.js with a database) to persist data.

- Drag-and-Drop Behavior:
  The app uses dnd kit. For advanced behavior (e.g., reordering within columns, custom animations), refer to the dnd kit documentation.

- Light/Dark Mode:
  Toggling is implemented via a button in the header. Customize the themes by editing the corresponding Tailwind CSS classes and your Tailwind config.

### Contributing

Contributions are welcome! Please follow these steps:

### Fork the repository.

- Create your feature branch: git checkout -b feature/my-new-feature
- Commit your changes: git commit -am 'Add some feature'
- Push to the branch: git push origin feature/my-new-feature
- Open a Pull Request.

### License

This project is licensed under the MIT License.
