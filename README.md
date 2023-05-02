# We Vibin'

We Vibin' is a web application written in ReactJS, which enables users to share music, listen to music, search for music on Spotify, save songs to playlists, and view other users' playlists. This application is designed to enhance the music sharing experience of Spotify Premium users.

## Technologies Used

We Vibin' uses the following technologies:

- ReactJS: A popular JavaScript library for building user interfaces.
- Tailwind CSS: A utility-first CSS framework for building responsive and modern web applications.
- OAuth: A protocol that allows secure authorization and authentication.
- react-spotify-web-playback: A React component that provides a Spotify playback widget.

## Installation

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/) (which comes with npm) installed on your computer.

### Clone the Repository

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/USERNAME/We-Vibin.git

# Go into the repository
$ cd We-Vibin
```

### Create a Spotify Developer Account

To use the Spotify API, you will need to create a Spotify Developer account and register a new app. Follow these steps:

1. Go to https://developer.spotify.com/dashboard and log in to your Spotify account.
2. Click "Create an App".
3. Give your app a name and description. It can be whatever you like.
4. Set the redirect URI to `http://localhost:3000` (or the server from which you will be serving).
5. Click "Create".
6. Copy the Client ID and Client Secret values.

### Set Up Access Tokens

Create a new file in the application called `AccessTokens.js`. Put the following code inside the file:

```javascript
export default {
	CLIENT_ID: "PUT YOUR CLIENT ID HERE",
	CLIENT_SECRET: "PUT YOUR CLIENT SECRET HERE",
};
```

Replace the `PUT YOUR CLIENT ID HERE` and `PUT YOUR CLIENT SECRET HERE` placeholders with the Client ID and Client Secret values you copied earlier.

**Note:** This file is in the `.gitignore` so as long as you have made `AccessTokens.js` exactly as instructed, it should not be pushed up to your GitHub account.

### Install Dependencies

```bash
# Install dependencies
$ npm install
```

### Start the Application

```bash
# Start the application
$ npm start
```

The application will be running on `http://localhost:3000`.

## Database

We Vibin' uses a JSON database to store user data. In order to use the application, you will need to clone the API repository as well, which contains the JSON database.

You can find the JSON database at this link: https://github.com/priteshzaver/We-Vibin-API

Clone the API repository and follow the instructions in the README to set up the database.

## Spotify Premium

To use We Vibin', you must have a Spotify Premium account. If you do not have one, you can sign up for a free trial on the Spotify website.

## Conclusion

We Vibin' is a fun and easy way to share and discover music with other Spotify Premium users. It's built with modern web technologies and provides a seamless experience for music lovers. We hope you enjoy using it!
