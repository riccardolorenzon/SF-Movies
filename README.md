# SF-Movies
List of movies shot in SFO displayed on a dynamic map

## Instructions
To compile the SPA:

`NODE_ENV=production node_modules/.bin/webpack -p`

To run a local http server(on http://localhost:8080) serving the SPA:

`node_modules/.bin/http-server src/static`

To run the isomorphic React App - DEVELOPMENT(http://localhost:3000/), run the following commands in two separate terminal windows:

`npm run start`

`npm run server`

To run the isomorphic React App - PRODUCTION:

`NODE_ENV=production node_modules/.bin/webpack -p`

`NODE_ENV=production node_modules/.bin/babel-node --presets 'react,es2015' src/server.js`
