__*a work in progress*__

**Overview**
- A basic Node.js application which is using Passport as the authentication middleware for authenticating against a locally configured Mongo backend. Uses handlebars. Will allow for 'super' user accounts for user administration. Will allow connection to a postgres database for map and dashboard analyses.
- The server assumes that you have a local mongo instance and a local postgres db running.

**Installation**

- get node_modules with `npm install`
- install postgres and spin up a db
- install mongodb and spin up a db
- copy settings.js.example, remove the .example, adjust values as necessary
