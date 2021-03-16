This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## ToDo Application

This is a basic CRUD [CRA](https://create-react-app.dev/)-based [Redux Toolkit](https://redux-toolkit.js.org/) application styled with [Material-UI](https://material-ui.com/).

It demonstrates the React Router usage along with the complete set of RESTful actions.

With a ToDo resource as an example, you can create, list, update and delete ToDo entities.

Note that you might use only English characters for a ToDo's memo field and their max limit is 140 letters.

For the sake of simplicity this app contains only 10 read-only predefined User IDs.

The main table (list of ToDo) supports pagination.

The HTML/CSS layout is mobile-ready.

The application demonstrates a thourough success-error processing system.

The minimalistic design of this app was inspired by the Ruby on Rails default scaffolding.

Since this is a SPA-application it is protected against occational page reloads.

The fetch wrapper is [taken from the official Redux Toolkit manual](https://github.com/reduxjs/redux-essentials-example-app/blob/checkpoint-4-entitySlices/src/api/client.js).

## Technical details

#### Prerequisites:

You MUST install the [JSON Server](https://github.com/typicode/json-server) locally to make this app work (as it relies on the JSON Server fake API).

#### How to launch:

AFTER you installed JSON Server open the Terminal, navigate to the project folder and run:

### `yarn start`

This runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

IMPORTANT: Now open another Terminal tab (Ctrl + Shift + T) and run:

### `json-server --watch db.json`

This will start your local copy of the JSON Server (configured on http://localhost:3001).
