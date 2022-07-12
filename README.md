# Unwind-time - Remove yourself from the keyboard
The app itself let's you find people that need a break (a unwind) and want to do this with someone else.



The app that helped me understand some of the uses of firebase. My role was refactoring it to TypeScript, fixing CSS and Bugs and also implementing end-to-end testing.



## Tech Stack
### JavaScript, TypeScript, React, Redux, Firebase, Cypress.io



<img src="https://res.cloudinary.com/brnl/image/upload/v1657621675/brnl/unwind_curxbv.jpg"></img>

# Getting Started with Unwind

## Firebase Setup

1. Go to Firebase console at https://firebase.google.com and create a new project.\
2. In the project overview, add a web app.\
3. Create a .env file and fill it with your Firebase keys.\
4. Setup authentication on Firebase, enabling email/password and Google as providers.\
5. Setup Firestore database.\
6. Create a folder in the Storage with the name 'profilePics'. Under Rules, set ' read , write ' to true.

## Google Map Setup

Get a Google API key and add it to the .env file.

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all dependencies or devDependencies from a package. json file to run the project.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches Cypress end-to-end testing.
