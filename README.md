# ideally

## Overview

"ideally" is an idea generator to inspire software engineering projects, providing random or custom project ideas and a starter pack including a project descriptions, and project requirements.

### Problem

Software engineers who seek to learn a new language or improve their programming skills often do side projects, and student developers need to come up with projects that implement the skills they have learned in the course. This app will generate ideas based on the intersection of the users' interests and the programming skill they want to implement, and provide the basics so that they can start building.

### User Profile

Software developers:

-    looking to upskill, needing to apply their knowledge
-    looking to create side projects
-    who need a spark to inspire their own creativity

### Features

**Generate idea:** Take user inputs of interests and skills to generate a custom idea with a title, description, and requirements. If the user provides no input, generates a random idea.

**User login:** User login to access further features

**Save idea:** Logged in user saves desirable ideas to their profile

**View idea:** Logged in user can click on one of their saved ideas to view details

## Implementation

### Tech Stack

-    React
-    Sass
-    Typescript
-    Client libraries:
     -    react
     -    react-router-dom
     -    axios
     -    typewriter
-    Server libraries:
     -    knex
     -    express
     -    jsonwebtoken

### APIs

OpenAi API GPT-3.5-turbo:
Prompt to generate a random software engineering project brief using user input to inform the idea generated.

### Sitemap

**HOMEPAGE**
A visual
Can navigate to User Login or Idea Page.

**IDEA PAGE**

User enters information on their interests and skill to apply, and clicks to generate a custom idea. They can save idea if they are logged in.

**IDEA DETAILS PAGE**

Displays idea details, navigated to automatically after idea is generated

Includes: Project title, project description, project requirements.

**USER LOGIN**

Form to sign up or log in.

"Log In" takes user to their saved ideas.

**PROFILE PAGE**

Accessed via Nav, this component lists the user's saved ideas.

### Mockups

Minimalist, bold, fun, easy & familiar user navigation
![Wireframe of the home screen, custom idea page, and menu page](./src/assets/images/wireframe.png)

### Data

The ideas generated will not be stored unless the user logs in and saves them.

_USER TABLE_ stores username & password

_IDEAS TABLE_ stores project title, description, requirements, and mockup image

_PROMPTS TABLE_ stores user inputs of interests and skills so they don't have to redo the custom idea form

![Three sample tables showing users, ideas, and prompts](./src/assets/images/database-tables.png)

### Endpoints

**GET /openai** - to openAI API

Get random idea.

     Response:
     ```
     {
          "title": "Project Title",
          "description": "Build a website that generates software engineering project briefs for software engineering students",
          "requirements": [
               "Generate new idea when button is pressed",
               "Use an API"
          ]
     }
     ```

**POST /user/signup** - to SERVER

Add a user account

     Parameters:
     - name: User's name
     - username: User's username
     - password: User's provided password

     Response:

     ```
     {
          "token":
               "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.
               eyJ2ZXJzaW9uIjoxNiwibmFtZSI6IkRhbmllbGxlIExldW..."
     }
     ```

**POST /user/login** - to SERVER - Login a user

     Parameters:
     - username: User's username,
     - password: user's password

     Response:

      ```
     {
          "token":
               "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.
               eyJ2ZXJzaW9uIjoxNiwibmFtZSI6IkRhbmllbGxlIExldW..."
     }
     ```

**POST /user/ideas** - to SERVER - User saves an idea

     Parameters:
     token: JWT of logged in user
     idea: Idea that user wants to save

     Response:
     ```
     {
          "id": 1,
          "idea": "Some idea that is just magnificent"
     }
     ```

### Auth

The function of the random idea and custom idea generation is accessible by any user.
JWT auth only required for saving ideas.

## Roadmap

_Sprint 1: Set foundation_

-    Create & finesse chatGPT prompt
-    Connect OpenAI API
-    Connect
-    Create basic react app
-    Create a database to hold user info & preferences
-    Create API to access user idea database

_Sprint 2: Test API & database_

     - Test prompt generation with React app

_Feature: Home page_

     - GET request to chatGPT

_Feature: Custom Idea page_

     - GET request to chatGPT

_Feature: Menu page_

_Feature: User sign up_

-    POST request for new user
-    Implement auth with JWT tokens
-    Test edge cases
-    Create sign up page & form

_Feature: User log in_

-    POST request with user information
-    Create auth token
-    Create log in page & form

_Feature: Save idea_

-    POST request to server
-    Create "My Ideas" page

## Nice-to-haves

**Future features:**
**Generate mockup:** Use current idea to generate a desktop mockup, eliminating visual design paralysis
**Edit idea:** Logged in user can edit saved ideas

**Add idea:** Logged in user can add their own idea to the list

As a logged in user, I want to be able to add an additional challenge to my project idea

As a logged in user, I want to be able to save my "word cloud" so that I don't have to re-input them

As a logged in user, I want to be able to generate a basic Readme file for my project

As a logged in user, I want to be able to generate seed data for my project, defining the tables
that I want to create

As a logged in user, I want to check off my project ideas when I've done them

As a logged in user, I want to be able to upload screenshots of completed projects
