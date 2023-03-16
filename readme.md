# **14 Model-Videw-Controller (MVC): Tech Blog

## **Project Description**
    

---
## **URLs**
- [Deployed Application](https://tech-blog-999.herokuapp.com/)
- [GitHub Repository URL](https://github.com/jouriena11/tech-blog-mvc)

---
## **Table of Contents**
- <a href="#installation">Installation</a>
- <a href="#technologies-used">Technologies Used</a>
- <a href="#usage">Usage</a>
- <a href="#future-development">Future Developments</a>

---
## **Installation**
The following npm libraries must be installed to run this application:
- bcrypt v5.0.0
- dotenv v8.2.0
- Express v4.17.1
- mysql2 v2.2.5
- sequelize v6.3.5
- connect-session-sequelize v7.0.4
- handlebars v4.7.7
- express-handlebars v5.2.0
- express-session v1.17.1
- dayjs

The installations can be done conveniently by the running the following command line at the root directory: 
```
npm i
```

---
## **Technologies Used**
- HTML
- Bootstrap / CSS
- JavaScript
- Node.js
- MySQL
- Express.js
- Handlebars
- axios

---
## **Usage**
Before running this application, make sure to do the following first
- change `.env.EXAMPLE` file name to `.env` 
- update your DB_USERNAME, DB_PASSWORD, and SESSION_SECRET in the .env file

---
## **Future Development**
- to include forgot password functionality
- to include last_update on blog rendering on homepage
- when clicking on a username on homepage, the user would be redirected to another view that displays only blogs created by that particular user
- to add text-decoration functionality to blog content creation
- comment upvote to determine sort order
