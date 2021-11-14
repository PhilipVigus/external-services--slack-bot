# External services slack bot

![External services bot screenshot](/docs/main-screenshot.png "External services bot screenshot")

## Introduction

The external services slack bot was built to solve problem we were having at work. We rely on a number of services including Circle CI, Github and various Google applications. When our were breaking, it wasn't necessarily clear whether it was an issue with our code/infrastructure or because of issues with one of the external services we rely on.

The external services slack bot exposes a slack command that quickly summarises the health of the services we use.

## Core technologies

| Area               | Technologies                                                          |
| ------------------ | --------------------------------------------------------------------- |
| Language           | [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |
| Framework          | [Bolt](https://slack.dev/bolt-js/tutorial/getting-started)            |
| Testing            | [Jest](https://jestjs.io/)                                            |
| Static code checks | [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)       |

## Using the bot

The bot exposes a slash command available in all public slack channels `/external-services`. When used, the bot returns a summary of the external services' health and links to individual status pages.

## Setting up the bot

1. Clone this repository

2. Create a .env file, using .env.example as a template.

3. Follow the instructions [here](https://slack.dev/bolt-js/tutorial/getting-started) to add an app to the slack server you want the bot to be used in. Specifically, you will need:

    - the slack signing in secret
    - the slack app token
    - the slack bot token
    - to turn on socket mode
    - to add the `chat:write, chat:write.public` bot token scopes

4. Install the app in your chosen workspace

5. Start the bot server with the following command in the project root directory:

```
npm run start
```

6. You should now be able to use the slash command `/external-services` in your workspace

## Tests

Run the tests with the following command:

```bash
npm run test
```

## Development

Development was relatively straightforward with few problems. I initially ran through a couple of tutorials to understand the basics of how Slack Bolt is used, then it was simple to transfer that knowledge to the specifics of the app I wanted to create.

I am particularly happy with the way I've designed the individual services. It means that the only thing you need to do to add a new service to check is drop the file in the services directory, and it will automatically be used by the command.

## Adding additional services

To extend the bot to check additional services, create a file from the template file in the docs folder and add it to the services folder:

```javascript
// The title is printed as part of the message in Slack
const TITLE = "Service Title";

// A link to the service's public webpage showing its status
const STATUS_PAGE = "https://status-page.com/";

const getStatus = async () => {
    // must return one of the available statuses defined in ./support/statuses
};

module.exports = {
    getStatus,
    title: TITLE,
    statusPage: STATUS_PAGE,
};
```

The existing services show specific examples of how they are defined.

## Additions and improvements

-   Allow the bot to automatically check external service statuses at regular intervals, and send warning messages to a specified channel if any of the services are unhealthy
-   Allow the user to retrieve more detailed information on a specific service
