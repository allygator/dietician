# Diet Life
Diet Life is a project for Processes of Object Oriented Software Development (COP 4331) at the University of Central Florida, being developed by Group 21.

## Development
This project uses `yarn`.

To run just the react app, use `yarn start`.

To run the lambda functions, you will need a Netlify account setup and connected to your fork of this repo, along with Netlify-CLI installed on your machine. Installation instructions for this are available at the [Netlify Website](https://docs.netlify.com/cli/get-started/#installation). After these steps are complete, run `netlify dev` to run both the react app and lambda functions. Functions can be accessed at `localhost:34567/.netlify/functions/(functionNameHere)`

## Page Descriptions

### Home
Short description of the app, there is room to play with the design here.

### Login
Input boxes
* Email address
* Password

Submit button

Form validation (the response back from Firebase) will need to display to the user

### Profile
Input boxes
* Height (separated as feet & inches)
* Weight (in pounds)
* Gender
* Target Weight (in pounds)
* Life Schedule
    *  Separated by day of week
    * "+" Button to add additional blocks for a specific day of the week
    * Remind the user to include preferred sleep time
* Current lifestyle (radial selection)

Will call Schedule generator function

### Calendar

Get schedule blocks from Firebase.

Display User defined blocks (#2C698D), Exercise Blocks (#E3F6F5), Food Blocks (#BAE8E8)

## Other Functionality

### Schedule generator

Get user schedule, send recommended exercise/food schedule to database
