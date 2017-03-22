# womannjax-drills
CodeCore Group Project: CodeCore Drillz, a coding quiz app built using Node, Express, and React.js

This is a single page application that uses react.js on the front end, which interacts with the node.js 
backend via restful api calls. The React and Node projects are separate and run independently, and both
of them are in this git repository.

To Run:

- git Clone the project
- Navigate to the node folder (1 level down from the main directory) and run the command: yarn install
- Run the command: yarn start

Now the Node backend (or server) is running, and can make api calls to send data to your frontend.
By default the server runs on localhost:3000. check to see if it's running by navigating there with a web browser.
When it's running you should see the standard express page which says "Welcome to express"

Next up, we have to run the front end React.js component. To Run:

- open up a new terminal window (while the node server is still running)
- navigate to the react folder within the project, then navigate to the client folder within react.
- enter the command: yarn install
- enter the command: yarn start

React should automatically open up a window in your browser and navigate to localhost:3006 if it has started.
You can also navigate there manually in any web browser.

Happy coding!



