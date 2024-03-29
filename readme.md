# **14 Model-Videw-Controller (MVC): Tech Blog

## **Project Description**
The Tech Blog is a CMS website designed for blogging. By signing up and logging in, users can view, publish, edit, and delete blog posts of their own creation as well as comment on other bloggers' posts.

---
## **URLs**
- [Deployed Application](http://3.26.27.221:4002/)
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
- axios v1.3.4
- bcrypt v5.1.0
- connect-session-sequelize v7.1.5
- dayjs v1.11.7
- dotenv v16.0.3
- Express v4.18.2
- express-handlebars v6.0.7
- express-session v1.17.3
- handlebars v4.7.7
- mysql2 v3.1.2
- sequelize v6.29.0

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
- Express.js
- MySQL
- Handlebars
- Axios
- Day.js

---
## **Usage**
Click on the deployed application link in URL section above, and you'll be taken to the deployed application page.

Sign up
Log in
Create a blog
Comment
Logout

---
## **Future Development**
- Bug Fix: to hide `edit` and `delete` button if a user is logged out AND not the creator of the blog
- Bug Fix: to redirect to dashboard after submitting a blog update
- to allow password update 
- to include forgot password functionality
- to include last_update on blog rendering on homepage
- to add text-decoration functionality to blog content creation (e.g. bold text, highlights, etc.)
- sorting blogs by chronological order
- comment upvote to determine sort order