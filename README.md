# shopping-cart

Small, Single Page Application, providing the functionality of a shopping cart of an online book store written in AngularJS.

Project uses simple JSON based server called json-server to serve the files as well as to provide the API endpoints

In order to run the application it is reqired to:

- have NodeJS installed on the machine
- have installed globally gulp and bower `npm install -g gulp bower`
- have installed globally json-server `npm install -g json-server`
- go to the project directory and run:
  * `npm install`
  * `bower install`
  * gulp
- go to the json-server directory within the project
- run the command `json-server --watch db.json --static ../app/`
- open your favourite browser and type `http://localhost:3000/`

Enjoy!

