# Incentro assessment

This is my submission for the backend assessment. The app was developed using TypeScript and ExpressJS for exposing the API. For unit testing jest was used.

To solve the problem I've took the following approach:

First step was to setup the dev environment with TypeScript and Express and create the requested endpoint that would return a dummy response.

Second step was to create the ```DataProvider``` class that handles the reading of the json file and loads the data for the salary calculator. This implied also making sure that data has the correct format so types were added.

Third step was to create the ```SalaryService``` class that retrieves the player and calculates the salary by playerId. For testing purposes I've simplified the data and created test cases for each step.

Finally I've exposed the service in the API and did some logic refactoring.

For simplicity, one tradeoff I've made was that data is being loaded with the initial request adding an overhead for the first request.

## Run dev mode

1. Clone repo
2. Install dependencies

```
npm install
```

3. Run dev mode

```
npm run start:dev
```

## Run tests

Test were written using jest.

```
npm test
```

## Building

To build the app and run the sources execute the following commands

```
npm run build
```

```
node dist/index.js
```