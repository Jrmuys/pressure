# Migraine Monitor

Migraine Monitor is a web application that helps people with weather-related migraines by tracking the barometric pressure and providing real-time weather data. It uses Angular and Firebase to collect data from OpenWeatherMap APIs and display it dynamically on the frontend.

## Features

- Daily and hourly pressure graphs that show the pressure data over the course of a few days and within a day, respectively.
- Real-time weather data that is updated automatically and displayed on the frontend.
- Firebase functions that collect data from OpenWeatherMap APIs and store it in the Firebase database.

## Why Angular and Firebase?

I chose to use Angular and Firebase for the following reasons:

- Angular is a powerful and popular front-end framework that allows me to build a dynamic and interactive user interface for the web application. It provides a component-based architecture, reactive programming, and a rich ecosystem of libraries and tools, which makes it easy to build and maintain the application. I also have lots of experience with Angular, so this is the natural choice for me (before I learn nextjs)

- Firebase is a comprehensive platform for building web and mobile applications that provides a wide range of services and features, including a real-time database, cloud functions, and hosting. It allows me to quickly and easily collect data from OpenWeatherMap APIs and store it in the Firebase database, and to display it dynamically on the frontend using Angular. Additionally, it provides automatic scaling and high availability, which ensures that the application can handle a large number of users and requests without downtime. The main reason for firebase, however, is the ease of setup. It only takes minutes to setup a project and be up and running, while also providing many of the services a full web app needs to run.

## Setup

To set up and run Migraine Monitor, follow these steps:

1. Install the latest version of Angular and Firebase on your computer.
2. Clone the Migraine Monitor repository and navigate to the project directory.
3. Install the required dependencies by running `npm install`.
4. Create a new Firebase project and enable the Cloud Functions and Firestore services.
5. Create a new OpenWeatherMap account and obtain an API key.
6. Create a new file called `.env` in the `functions` directory and add the following environment variables:
   - `OPEN_WEATHER_API_KEY`: Your open weather api key
7. Update the firebase details in the environment to reflect your project (It won't work if you leave mine in)
