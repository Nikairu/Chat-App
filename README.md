# Chat-App

Chat-App is a cloud-enabled, mobile-ready, offline-storage compatible, React-Native-powered chat application.

## Features

- Anonymous login
- Cloud storage for your messages and images
- ✨ Can view your messages offline ✨

## Tech

Chat-App uses a number of open source projects to work properly:

- [React-Native] - HTML enhanced for mobile apps!
- [Gifted-chat] - Awesome React-Native chat
- [expo] - Open-source platform for making universal native apps
- [Firebase] - Reaat-time update cloud storage for your messages

And of course Dillinger itself is open source with a [public repository][dill]
on GitHub.

## Installation

This project is a React-Native project
To run, you must first install expo. You can do this by running:

```sh
npm install expo-cli -g
```

After downloading the project you can install by typing the following:

```sh
cd Chat-App
npm i
```

And to run:

```sh
expo start
```

## Setup your own firebase account

You should also set up firebase account for your own use. To do this follow these steps:

- go [here](https://firebase.google.com/?hl=en)
- sign into your google account
- click on "Go to console"
- click "add project"
- follow onscreen instructions until it says "creating your project"
- click on "database" on the Develop tab
- click on "Create Database" and select "start in test mode"
- click on "start collection" and name it "messages" and then press "auto id" and confirm on the following screen
- click on "Authentication", "set up sign-in method" and enable anonymous authentication
- click on "storage" to set up cloud storage
- finally, click on the gear just above the Develop tab, and select "project settings". Click on the button that will add Firebase to a web app, name it, and copy everything in the firebaseConfig and paste into the Chat.js file.

Kanban Board: https://trello.com/b/EOPzaZfL/chat-app
