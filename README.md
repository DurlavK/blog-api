
<h1 align="center">
  <a href="https://nodejs.org/"><img src="https://nodejs.org/static/images/logo.svg" width="200"></a>
  <br>
  Blog-API
  <br>
</h1>

<h4 align="center">A REST api for blog built using <a href="https://nodejs.org/" target="_blank">Nodejs</a>.</h4>

<p align="center">
<img src="https://img.shields.io/badge/nodejs-v15.3.0-rgb(0, 153, 0)" alt="Laravel">
<img src="https://img.shields.io/badge/mongodb-v4.4-rgb(0,103, 0).svg" alt="Mysql">
<img src="https://img.shields.io/badge/expressjs-v4.17.1-rgb(0, 0, 255).svg" alt="Tailwind">
<img src="https://img.shields.io/badge/contributions-welcome-orange.svg" alt="Contributions">

</p>


<p align="center">
  <a href="#about">About</a> •
  <a href="#Installation">Installation</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#todo">Todo</a>
</p>


## About
This is a blog API made with REST method in mind. The API uses nodejs and expressjs for routing and backend processes. Mongodb atlas has been used for database models and storage.
This project does not render any view but exposes a json api for a blog. 
The api is live as a heroku [app](https://arcane-caverns-09297.herokuapp.com/).
This project is a part of [the odin project](https://www.theodinproject.com/courses/nodejs/lessons/blog-api) curriculam. Follow [them](https://www.theodinproject.com/) to learn web development in depth. 

## Installation

You need to have node and npm in your machine before installation. Follow along [this](https://github.com/nvm-sh/nvm#install-script) to install node in your machine.
```bash
# Clone this repository
$ git clone https://github.com/durlavk98/tweety

# Go into the repository
$ cd blog-api

# Install dependencies
$ npm install
```
Create a .env file with your [mongodb](https://www.mongodb.com/) atlas uri and port variable. 
```
MONGODB_URI= 'mongodb+srv://<username>:<password>@cluster0.zzzbk.mongodb.net/<project-name>?retryWrites=true&w=majority'
PORT=3000
```
Run the app
```bash
# Start node server
$ npm start

# Start nodemon server
$ npm run dev
```

## How To Use
```
# My App API-
https://arcane-caverns-09297.herokuapp.com/api/

# Your API-
http://localhost:3000/api
```
The REST api can be used as shown - 

### GET all posts
 Returns json data of all posts.
 - **URL**:
 /posts
 - **Method**:
 `GET`
 - **URL Params**:
  None
 - **Data Params**:
 None
 - **Success Response**:
    -  **Code:**  200  
    -  **Content:**  `{ id : 12 }`
-   **Error Response:**
    
    -   **Code:**  404 Page Not Found 
    -   **Content:**  `{ error : "No Posts found" }`
-   **Sample Call:**
	```
	curl http://localhost:3000/api/posts
	```
	OR
	```
	axios.get('http://localhost:3000/api/posts')
	.then(res=>{
	console.log(res.data);
	})
	```



## Credits

- [Nodejs](http://nodejs.org/)
- [Expressjs](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [The Odin Project](https://www.theodinproject.com/)

## Related

[Blog frontend](https://github.com/durlavk98/portfolio) - A blog that uses [this](https://github.com/durlavk98/blog-api) api


## Todo
- [ ] Configure jwt error.
- [ ] Upload cms to github.
- [ ] Add all use cases.

## Some of my other project on nodejs

[Express Library](https://github.com/durlavk98/express-locallibrary-tutorial) - Library app made using nodejs, expressjs and pugjs.
[Inventory App](https://github.com/durlavk98/inventory-application) - Store inventory app made using nodejs, expressjs and pugjs.


---

> [@durlav](https://durlavk98.github.io/portfolio/) &nbsp;&middot;&nbsp;
> GitHub [@durlavk98](https://github.com/durlavk98) &nbsp;&middot;&nbsp;
> Twitter [@durlavk98](https://twitter.com/durlavk98) &nbsp;&middot;&nbsp;
> Linkedin [@durlavk98](https://linkedin.com/in/durlavk98)
