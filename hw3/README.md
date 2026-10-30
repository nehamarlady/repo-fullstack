# Full Stack Homework 3

## Overview

This homework includes two tutorials and one application exercise:

1. **React Tic-Tac-Toe** – Followed the React tutorial and practiced creating components, passing props, and organizing the game board.
2. **Socket.IO Chat** – Followed the Socket.IO tutorial to create a real-time chat application using Express and Socket.IO.
3. **REST Countries Application** – Built an Express application using Pug templates and the REST Countries API to display country information.


## Prerequisites

- Node.js
- npm
- REST Countries API key for the Country application

Download Node.js from [nodejs.org](https://nodejs.org/).

## 1. React Tic-Tac-Toe Tutorial

**Folder:** `react/`

Followed the React Tic-Tac-Toe tutorial to practice React components, JSX, props, and component composition.

### Run the application

```bash
cd react
npm install
npm start
```

Open the local URL displayed in the terminal.

### Issues and fixes

- Encountered an installation issue with the React version. Resolved it by updating the version specification in `package.json`.
- The tutorial was not following the airbnb style, so followed that in the code


## 2. Socket.IO Chat Tutorial

**Folder:** `socketio/`

Followed the [Socket.IO Chat tutorial](https://socket.io/get-started/chat) to build a real-time chat application using Express and Socket.IO.

### Run the application

```bash
mkdir socketio
cd socketio
npm install express@4
npm install socket.io
node index.js
```

Open the local URL configured by the application in your browser.

## 3. REST Countries Application

**Folder:** `country/`

Built an Express application using Pug as the template engine and the REST Countries API to retrieve and display country information.

### Features

- **Home (`/home`):** Landing page for the application.
- **Countries (`/countries`):** Displays all countries in alphabetical order, including available capital and leader information.
- **Populous (`/populous`):** Displays countries with populations of at least 50 million, sorted from highest to lowest population. Includes population and flag information.
- **Regions (`/regions`):** Groups countries by region and displays the number and names of countries in each region. Handles missing region and country-name information.

### Environment setup

Create a `.env` file inside the `country/` folder:

```env
COUNTRY_API_KEY=your_api_key_here
```

Replace the placeholder with your API key. Do not commit the `.env` file.

### Run the application

```bash
cd country
npm init -y 
npm install express pug
npm start
```

Open:

```text
http://localhost:5001/home
```

### Known limitation

The API plan used for this application does not provide country leader information. Therefore, the application displays a fallback value when leader information is unavailable.

## Dependencies and Git

Each application has its own `package.json` and `package-lock.json` to manage its dependencies.

The root `.gitignore` excludes:

- `node_modules/`
- `.env` files
- Log files
- macOS `.DS_Store` files
- Editor configuration folders

Do not commit API keys or `node_modules/` to the repository.
