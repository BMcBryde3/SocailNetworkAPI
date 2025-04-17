# SocailMediaApi

This project provides backend API utilizing MongoDB for Users,Freinds,Thoughts and reactions.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Description

This project provides backend API utilizing MongoDB for Users,Freinds,Thoughts and reactions.

## Installation

Download the app at : https://github.com/BMcBryde3/SocailNetworkAPI via git clone or downloading the app zip file.

## Usage

To build and run the app, please run the following commands in the console: npm run build and npm run start.

## Contributing

Node.js, express.js

## Tests

Please see the following API calls and requirements:

      ** `API Routes` **

      **`/api/users`**

      * `GET` all users

      * `GET` a single user by its `_id` and populated thought and friend data

      * `POST` a new user (note that the examples below are just sample data):

        ```json
        {
          "username": "lernantino",
          "email": "lernantino@gmail.com"
        }
        ```

      * `PUT` to update a user by its `_id`

      * `DELETE` to remove user by its `_id`

      **BONUS**: Remove a user's associated thoughts when deleted.

      ---

      **`/api/users/:userId/friends/:friendId`**

      * `POST` to add a new friend to a user's friend list

      * `DELETE` to remove a friend from a user's friend list

      ---

      **`/api/thoughts`**

      * `GET` to get all thoughts

      * `GET` to get a single thought by its `_id`

      * `POST` to create a new thought. Don't forget to push the created thought's `_id` to the associated user's `thoughts` array field. (note that the examples below are just sample data):

        ```json
        // example data
        {
          "thoughtText": "Here's a cool thought...",
          "username": "lernantino",
          "userId": "5edff358a0fcb779aa7b118b"
        }
        ```

      * `PUT` to update a thought by its `_id`

      * `DELETE` to remove a thought by its `_id`

      ---

      **`/api/thoughts/:thoughtId/reactions`**

      * `POST` to create a reaction stored in a single thought's `reactions` array field

      * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

## License

None

## Questions

If you have any questions, please reach out to me at:[brett.mcbryde@yahoo.com](mailto:brett.mcbryde@yahoo.com) or visit my GitHub profile: [BMcBryde3](
