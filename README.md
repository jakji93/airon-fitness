<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/d-x-s/airon-fitness">
    <img src="assets/logo.png" alt="Logo" width="150" height="150">
  </a>

  <h3 align="center">AIRON Fitness</h3>

  <p align="center">
    AI-powered fitness app to help you kickstart your training journey.
    <br />
    <a href="https://airon-fitness.onrender.com/"><strong>View Demo »</strong></a>
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#goals">Goals</a>
      <ul>
        <li><a href="#minimal-requirements">Minimal Requirements</a></li>
        <li><a href="#standard-requirements">Standard Requirements</a></li>
        <li><a href="#stretch-goals">Stretch Goals</a></li>
      </ul>
    </li>
    <li><a href="#utilized-technology">Utilized Technology</a></li>
    <li><a href="#above-and-beyond">Above and Beyond</a></li>
    <li><a href="#whats-next">What's Next</a></li>
    <li><a href="#group-contribution">Group Contribution</a></li>
    <li><a href="#the-team">The Team</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://github.com/d-x-s/airon-fitness)

Introducing AIron Fitness, an innovative fitness companion designed to support individuals on their personal fitness journey. AIron Fitness utilizes artificial intelligence to deliver customized fitness plans tailored to each user's goals and preferences. Whether you're a beginner looking to start a fitness routine or an experienced enthusiast aiming to level up, AIron Fitness has got you covered.

With AIron Fitness, users can create their profiles, input their fitness goals, and receive a comprehensive fitness plan perfectly suited to their needs, complete with guided workouts and a timer to track progress and stay motivated on their fitness journey. The platform also stores valuable user data, including personal profiles and fitness progress, allowing users to track their journey and witness their achievements over time.

AIron Fitness empowers individuals to take control of their fitness goals and enjoy a personalized fitness experience. Say goodbye to generic workouts and hello to a tailored fitness solution with AIron Fitness by your side.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Roadmap -->

## Goals

### Minimal Requirements

- [x] A user can create a profile that can be saved
  - [x] Basic frontend UI
  - [x] Fetch / Upload Profile Image
  - [x] Store input JSON (Name, Age, Email, Birthdate, Image) in database
  - [x] API Integration - Birthdate Entry
  - [x] Investigate Email Authentication
- [x] Form authentication
- [x] A user can update their profile with their own details such as diet, experience, etc.
- [x] A user can ask their personal trainer for a new fitness plan based on their profile and any additional information (e.g. workout frequency, experience, specific goals)
  - [x] Investigate OpenAI API
  - [x] Establish input prompt format
  - [x] Establish basic frontend UI
  - [x] Setup backend API calls to ChatGPT
  - [x] Parse output JSON to Fitness Plan
  - [x] Store output JSON in database

### Standard Requirements

- [x] Leverage ChatGPT AI to return a custom fitness plan
- [x] Dashboard view of meal plan user metrics and statistics
- [x] Account for user illness / physical constraints
- [x] Secure authentication system (JSON Web Token)
- [x] Login using Google Accounts
- [x] Establish product identity with consistent theme and assets 

### Stretch Goals

- [x] Chatbot personal trainer that allows for custom user inputs
- [x] Dynamic guided workouts with rep/set counters and rest timers
- [x] Voice recognition support in guided workouts
  - [ ] Speech polyfill for unsupported browsers
- [x] Responsive website layout and design
- [ ] Dynamically update fitness plans as users log their history
- [ ] Live audio feedback during a workout
- [ ] Computer vision support for exercise form analysis in guided workouts

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- UTILIZATION -->

## Utilized Technology

1. In our project, the use of HTML provides the foundation of the web page structures. JS, within React components, adds dynamic functionality, surpassing other similar technologies in responsiveness. Instead of CSS, we utilized Material-UI (MUI) which has significantly improved the app's user interface and design. MUI's pre-built components and theming capabilities enable the team for the rapid development of a visually appealing and consistent user experience.
2. React and Redux play critical roles in enhancing the application's front-end development and state management. React's component-based architecture enables modular and reusable UI elements, resulting in improved maintainability and scalability. The most noticeable usage of React components would be in our Profile Form, where we reuse multiple Input components developed by one of the team member. With Redux, we efficiently manage the application's state, providing a centralized data store and allow our generated schedules to seamlessly flow across multiple components without refetching from our database.
3. Express plays a pivotal role as the backend framework, enabling the implementation of multiple API functionalities such as GET, POST, PUT, and DELETE. Each API efficiently returns the result of its respective operation or throws the appropriate error if the operation is unsuccessful, ensuring smooth communication between the front-end and back-end through the use of Redux thunks. Moreover, we prioritize security by introducing user authentication via JWT tokens, safeguarding sensitive data with an added layer of protection.
4. MongoDB serves as our primary database, offering a flexible and scalable solution for storing and managing user data and generated schedules. Its NoSQL nature allows us to store complex data structures with ease, improving data retrieval performance and enhancing the app's overall efficiency. To improve security, we separated user login verification and the rest of the user data. The combination of JWT Token and model design ensures a secure and reliable access to sensitive information.
5. Our current application is deployed on Render. Render's seamless integration with GitHub enables automatic builds and deployments, ensuring continuous deployment and reducing manual intervention. Its user-friendly interface and scalability provide a reliable and efficient platform for hosting our production-level web application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ABOVE AND BEYOND -->

## Above and Beyond

In our MERN web application, we went above and beyond the standard requirements by incorporating advanced functionalities that elevate user experience and personalization. First, we integrated Google Login, streamlining the authentication process and ensuring a seamless user journey. Leveraging JWT token authentication, we further enforced the app's security, safeguarding any sensitive user data. Additionally, we crafted custom reusable form components using Formik and yup validation, streamlining user interactions for login, signup, and profile updates. These meticulously designed components enhance usability while maintaining robust data integrity.

Our main focus is to utilize the capability of ChatGPT, engineering prompts to generate personalized workout and meal schedules based on the user profile while minimize the cost of requesting from OpenAI. This feature customized a users' fitness experience, providing users with intelligent and adaptive recommendations. With the data from a user’s workout schedule, we provide a data-rich, voice controlled workout flow that acts as a personal trainer, guiding the user through their exercises and rest timing. We also introduced a chat-bot system that enables fine-tuning of base schedules, tailoring fitness and meal plans to individual preferences and restriction.

By implementing Google Login, JWT authentication, a powerful chatbot, guided workouts, and ChatGPT integration, we have crafted an innovative fitness platform that redefines the way users interact with their workout and meal plans. The application's user-friendly experience, coupled with personalized features, ensures that each individual's fitness journey is tailored just for them.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- WHATS NEXT -->

## What's Next

In our next steps to further improve the app, we plan to dynamically update fitness plans based on users' logged progress history, incorporating user reviews and feedback to provide personalized and evolving workout routines. Additionally, we aim to implement a Computer Vision feature that analyzes users' posture, offering real-time feedback to ensure proper form during exercises. These additions will enhance the app's usability and help users achieve their fitness goals more effectively.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTION -->

## Team Member Contributions

### Davis Song

Davis worked as a full stack engineer on AIRON, having significant responsibility in both the frontend and backend. He lead AIRON's product design and branding, where his contributions can be seen in the landing page implementation and guided workouts feature. He set up the global navigation bar, introduced routing, and designed a complex component flow simulating a personal trainer's workout instructions. On the backend side, he layed out and implemented essential Express.js data generation routes, ensuring seamless server-side functionality with a thorough POSTMAN test suite. These routes interacted directly with the OpenAI API and required dedicated effort to engineer and fine-tune the generation prompts. His leadership roles involved managing the team's Agile development process in Jira, creating documentation throughout development, and writing down meeting notes. 

### Jack Ji

Jack Ji made substantial contributions to our MERN project, playing a crucial role in finalizing the API prompt and documenting the ChatGPT API format in JavaScript. He was instrumental in the initial database design, establishing the database connection, and implementing the backend routers. Additionally, Jack completed the backend implementation for profile creation and image upload to MongoDB, ensuring seamless functionality. His efforts extended to designing and testing the updated GPT prompt, enabling an improved user experience. Furthermore, Jack initiated the backend implementation for schedule history and actively conducted live service testing, ensuring a reliable and efficient application. His dedication to real user API testing and general debugging significantly contributed to the app's robustness and overall success.

### Kenny Cheng

Kenny contributed to the project by configuring the project with ESLint, a custom pre-commit hook for linting the monorepo project and designing numerous reusable form components with Formik + yup validation for login, signup, and updating user profiles. He also worked heavily on end-to-end integration across the entire app through setting up Redux with Thunks, JWT authentication, Google account login, and profile picture uploading. He enhanced UI/UX of the app by implementing the view for workout and meal schedules based on Figma designs, testing and fixing edge case bugs, and adjusting workflows to prevent user errors.

### Kevin Chung

Kevin Chung made significant contributions to the project, especially in the areas of front-end development and styling of the application. He skillfully developed code for the home page, specifically the meal plan and the statistics components, by incorporating Collapse API in displaying the fitness and meal plans and integrating MUI Charts in visualizing user metrics and statistics, ensuring a user-friendly and informative experience in line with customized fitness and meal plans. His contributions to the styling also enhanced the design and usability while ensuring a coherent theme throughout the application.

### Kevin Wu

Kevin Wu has been instrumental in various aspects of our MERN project. In the frontend, he was responsible for creating the user sign-up wizard and skillfully setting up UI themes using Material UI to standardize the look of the application. Additionally, Kevin played a vital role in setting up the Express backend and creating the endpoints for generating user workout and meal schedules using the OpenAI API. These endpoints can be seen powering the chat bot that Kevin also developed to enable users to customize their schedules and edit their profile. Lastly, he owned the development of the user schedule history which utilizes pagination for improved efficiency.

<!-- GROUP -->

## Connect with Us

[@Davis Song](https://www.linkedin.com/in/davissong/)<br>
[@Jack Ji](https://www.linkedin.com/in/jack-ji-5643a011a/)<br>
[@Kenny Cheng](https://www.linkedin.com/in/kennyjhcheng/)<br>
[@Kevin Chung](https://www.linkedin.com/in/kevin-chung07/)<br>
[@Kevin Wu](https://www.linkedin.com/in/kevin-wu1/)<br>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

- [![NPM][NPM]][NPM-url]
- [![Node.js][Node.js]][Node-url]
- [![React][React.js]][React-url]
- [![MaterialUI][MaterialUI]][MaterialUI-url]
- [![MongoDB][MongoDB]][MongoDB-url]
- [![Express][Express.js]][Express-url]
- [![Redux][Redux]][Redux-url]
- [![OpenAI][OpenAI]][OpenAI-url]
- [![JWT][JWT]][JWT-url]
- [![Google][Google]][Google-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DEVELOPMENT -->

## Development Tools

### Prototyping (Figma)
[![Prototyping with Figma][Figma]][Figma-url]
![image](https://github.com/jakji93/airon-fitness/assets/68035358/67b01668-4445-4216-a434-4f074d558ba4)


### Agile Development
[![Planning with Jira][Jira]][Jira-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License 
[![MIT][MIT]][MIT-url]
<br />
Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- EULA -->

## EULA
 See `LEGAL.txt` for more legal information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/d-x-s/airon-fitness/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/d-x-s/airon-fitness/forks
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/d-x-s/airon-fitness/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[product-screenshot]: assets/landing.gif
[NPM]: https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white
[NPM-url]: https://www.npmjs.com/
[Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[Nodemon]: https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD
[Nodemon-url]: https://www.npmjs.com/package/nodemon
[Redux]: https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
[MaterialUI]: https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white
[MaterialUI-url]: https://mui.com/
[OpenAI]: https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white
[OpenAI-url]: https://platform.openai.com/docs/guides/gpt
[JWT]: https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens
[JWT-url]: https://jwt.io/
[Jira]: https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white
[Jira-url]: https://www.atlassian.com/software/jira
[Figma]: https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white
[Figma-url]: https://www.figma.com/
[MIT]: https://img.shields.io/badge/License-MIT-blue.svg
[MIT-url]: https://github.com/jakji93/airon-fitness/blob/main/LICENSE.txt
[Google]: https://img.shields.io/badge/google-4285F4?style=for-the-badge&logo=google&logoColor=white
[Google-url]: https://developers.google.com/identity/sign-in/web/sign-in
