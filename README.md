# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

# Vessel Tracking Application

This is a simple web application that tracks the movement of a vessel from a starting point to an ending point on a map. It utilizes React with Leaflet for mapping functionality.

## Deployed link

https://vessel-navigation.netlify.app/

## Features

- Real-time tracking of vessel position on the map
- Display of starting and ending points
- Information display about vessel coordinates and speed
- Smooth transition of vessel icon between points

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/vessel-tracking-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd vessel-tracking-app
   ```

3. Install dependencies using npm:

   ```bash
   npm install
   ```

## Usage

1. Start the development server: (refer to _Available Scripts_)

3. The map will display the vessel's current position as it moves from the starting point to the ending point. Information about the vessel's coordinates and speed will be displayed in the readings section above the map. To see information dynamically click on the icons.

## File Structure

- **src/**
  - **assets/**: Contains image assets for icons used on the map.
  - **components/**:
    - **Map.js**: Main component responsible for rendering the map and tracking the vessel's movement.
    - **Readings.js**: Component for displaying vessel coordinates and speed information.
  - **App.js**: Main application component that combines the Map and Readings components.
  - **App.css**: CSS file containing styling for the application components.

## Technologies Used

- React JS
- React Leaflet
