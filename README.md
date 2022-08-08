# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/tibank/nodejs2022Q2-service/pull/1
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:{PORT}/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.
You can change PORT in the .env file

## Tuning logging

You can set destination logging to console, file or both seeting variable 
### LOG_TARGET=ConsoleFile

You can set log level from next levels
  debug: 4,
  verbose: 3,
  log: 2,
  warn: 1,
  error: 0
### LOG_LEVEL=2

You can set size of log files in KB. If this size is exceeded file will be rotated
### LOG_MAX_SIZ=10

You can set prefix of log files
### LOG_FILE_PREFIX=log-nest

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
