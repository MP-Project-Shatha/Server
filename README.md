# Server

➤ Server side: https://github.com/MP-Project-Shatha

➤ Deployment: https://Deployment

➤ While running Frontend: http://localhost:3000

➤ While running locally: http://localhost:5000

➤ Trello: https://trello.com/b/H1Pu4xiD/master-piece-project

➤ Slides: https://Slides


## User Stories

- **Register:** Register for access to allow it to use the website.
- **Login:** As a `user` i can login to the website so i can see my calories and exercise.
- **Logout:** As a `user` i can logout from my page.
- **Add weight and height:** As a `user` can add weight and height to calculate the right calories  for `user`.
- **User Exercises:** As a `user` l can see exercies for weight and target.
- **User water requirment:** Calculation for the requirment for wieght and height.
- **Add Exercises:**  As a `admin` i can add exercises for users. 

 ### ■ Backend routes
 
| HTTP Method | URL            | Request Body                                                  | Success status | Error Status  | Permissions                |  Description                                                  |
| ----------- | -------------- | ---------------------------------------------------------- | -------------- | ------------ | --------------------------------|---------------------------- |
| GET         | `/login/:id`     | n/a                                                          | 200            | 404          |   public `<Route>`                |Check if user is logged in and return profile page           |
| POST        | `/register` | {username, email, password }                                    | 201            | 404          |  public `<Route>`               | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/login`  | {email, password}                                         | 200            | 401          |  public `<Route>`               | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/logout` | n/a                                                      | 204            | 400          |  user only `<PrivateRoute>`               | Logs out the user                                            |
| GET         | `/getexercises`        | n/a | 200               | 404   |  public `<Route>`          |Used to get medicl . |Show the user file
| PUT         | `/updateexercises`  | Exercises |  201           | 400      |  Admin only `<PrivateRoute>`    | Admin to update one          
| get         | `/readexercises`  | Exercises,user |  201           | 400      |  Admin only `<PrivateRoute>`    | Admin to get one    | 
| Post         | `/createexercises`  |Exercises |  201           | 400      |  Admin only `<PrivateRoute>`    | Admin to post one 
| Post         | `/ceratrole`  | {Role, Permossin |  201           | 400      |  Admin only `<PrivateRoute>`    | Admin to post one 

 

  ## UML Diagram
  ![UMLBacken-pm](https://user-images.githubusercontent.com/92248175/146688088-bd7f1f81-f868-44b9-b84f-60d3fd65e930.png)


### ■ Installing Dependencies

#### ▸ Node js

Follow instructions to install the latest version of Node js for your platform in the [Node js docs](https://nodejs.org/en/).

#### ▸ NPM Dependencies

Once you have the project in your local machine, install dependencies by running:

```bash
npm install
```

This will install all of the required packages.

#### ▸ Key Dependencies

- [Express](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- [mongoose](https://mongoosejs.com/) is an elegant mongodb object modeling for node.js.

- [morgan](https://www.npmjs.com/package/morgan) is a HTTP request logger middleware for node.js.

- [bcrypt](https://www.npmjs.com/package/bcrypt) is a A library to help you hash passwords.

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) is a JSON Web Token implementation (symmetric and asymmetric).

#### ▸ Setting up the variables

You have to set up some variables in the `.env` file, for the app to run properly.

```
PORT=5000
DB_URL=`Your MongoDB DB URL`
SALT=`Your SALT here`
SECRET_KEY=`Your SECRET KEY here`
```

## ⚪ Running the server

To run the server, execute:

```bash
npm run dev
```

For running the server in development mode, and execute:

```bash
npm run start
```

To run the server on production mode.
 
 ## ⚪ Models

### ▼ Users

| key          | type                | options          | default value    |
| ------------ | ------------------- | ---------------- | ---------------- |
| email        | String              | required, unique | N/A              |
| name         | String              | required         | N/A              |
| password     | String              | N/A              | N/A              |
| Role        | Schema <Roles>             | N/A              | N/A             |
| passwordCode | String              | N/A              | ''               |
| timestamp    | Date                | N/A              | Date now         |
 
 
  ### ▼ Exercises

| key          | type                | options          | default value    |
| ------------ | ------------------- | ---------------- | ---------------- |
| title       | String              | required,  | N/A              |
| username         | Schema <User>              | required         | N/A              |
| password     | String              | N/A              | N/A              |



 
 
 ### ▼ Roles

| key         | type   | options  | default value |
| ----------- | ------ | -------- | ------------- |
| role        | String | required | N/A           |
| permissions | Array  | required | N/A           |
| timestamp   | Date   | N/A      | Date now      |

 
 ### ▼ Like

| key          | type                | options          | default value    |
| ------------ | ------------------- | ---------------- | ---------------- |
| islike        | String              | required        | N/A              |
| Role         | Schema <Roles>               | N/A         | N/A              |
| Exercises     | String              | N/A              | N/A              |



 

  

 ## ER Diagram
 ![ER-PM](https://user-images.githubusercontent.com/92248175/146686855-b092a80e-d7f0-47fc-8db4-424de8e8a4e0.png)
  
 
