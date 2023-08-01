<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url] -->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/d-x-s/airon-fitness">
    <img src="assets/logo.png" alt="Logo" width="150" height="150">
  </a>

  <h3 align="center">AIron Fitness</h3>

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
    - [x] Develop Frontend UI
    - [x] Fetch/Upload Profile Image
    - [x] Store input JSON (Name, Age, Email, Birthdate, Image) in database
    - [x] API Integration - Birthdate Entry
    - [x] Investigate Email Authentication
- [x] Form authentication
- [x] A user can update their profile with their own details such as diet, experience, etc.
- [x] A user can ask their personal trainer for a new fitness plan based on their profile and any additional information (e.g. workout frequency,  experience, specific goals)
    - [x] Investigate OpenAI API
    - [x] Setup input prompt format
    - [x] Setup initial frontend UI
    - [x] Setup backend API calls to ChatGPT
    - [x] Parse output JSON to Fitness Plan
    - [x] Store output JSON in datebase

### Standard Requirements
- [x] Leverage ChatGPT AI to return a custom fitness plan
- [x] View meal plan user metrics and statistics
- [x] Account for user illness / physical constraints
- [x] Secure authentication system
- [x] Login using Google Accounts
- [ ] Allow users to log their workout history

### Stretch Goals
- [x] Chatbot personal trainer that allows for custom user inputs
- [x] User can start a guided workout with timers tracking rest period and workout length (hands-free implementation) 
- [ ] Dynamically update fitness plans as users log their history (user review and feedback in fitness plans) 
- [ ] Live audio feedback during a workout

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- WHATS NEXT -->
## What's Next

In our next steps to further improve the app, we plan to dynamically update fitness plans based on users' logged history, incorporating user reviews and feedback to provide personalized and evolving workout routines. Additionally, we aim to implement a Computer Vision feature that analyzes users' posture, offering real-time feedback to ensure proper form during exercises. Furthermore, we plan to introduce live audio feedback during workouts, creating an immersive and interactive fitness experience for our users. These additions will enhance the app's usability and help users achieve their fitness goals more effectively.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTION -->
## Group Contribution
### Davis Song
Davis Song made valuable contributions to our MERN project, taking the lead in designing and implementing the eye-catching landing page with meticulous theming and styling. He adeptly set up the MUI global navigation bar and introduced routing to enhance the application's user experience. Davis played a significant role in setting up the Express.js backend, ensuring seamless server-side functionality. He also implemented the UserProfile route and handled mock data setup for efficient Postman testing. Davis's technical expertise shone through as he integrated the controller connection with OpenAI and the database, performing thorough reliability testing to ensure optimal performance. Additionally, his creative talents extended to brand design, including the creation of a captivating logo and brand assets. Finally, he spearheaded the implementation of the guided workouts feature, delivering a holistic and dynamic user experience.

### Jack Ji
Jack Ji made substantial contributions to our MERN project, playing a crucial role in finalizing the API prompt and documenting the ChatGPT API format in JavaScript. He was instrumental in the initial database design, establishing the database connection, and implementing the backend routers. Additionally, Jack completed the backend implementation for profile creation and image upload to MongoDB, ensuring seamless functionality. His efforts extended to designing and testing the updated GPT prompt, enabling an improved user experience. Furthermore, Jack initiated the backend implementation for schedule history and actively conducted live service testing, ensuring a reliable and efficient application. His dedication to real user API testing and general debugging significantly contributed to the app's robustness and overall success.

### Kenny Cheng
Kenny contributed to the project by configuring the project with ESLint, a custom pre-commit hook for linting the monorepo project and designing numerous reusable form components with Formik + yup validation for login, signup, and updating user profiles. He also worked heavily on end-to-end integration across the entire app through setting up Redux with Thunks, JWT authentication, Google account login, and profile picture uploading. He enhanced UI/UX of the app by implementing the view for workout and meal schedules based on Figma designs, testing and fixing edge case bugs, and adjusting workflows to prevent user errors.

### Kevin Chung
Kevin Chung made significant contributions to the project, especially in the areas of front-end development and styling of the application. He initiated the front-end implementation of the home page that consists of essential components of the application, including fitness and meal plans, user statistics, and chat area. He then skillfully developed code for the meal plan and the statistics components, bringing his Figma sketches to life. In detail, Kevin integrated MUI Charts to improve the visualization of user metrics and statistics and incorporated Collapse API in displaying the meal plans, significantly improving the user experience and providing valuable insights. His contributions to the styling also enhanced the design and usability while ensuring a coherent theme throughout the application.

### Kevin Wu
Kevin Wu has been instrumental in various aspects of our MERN project. He was responsible for creating the user sign-up frontend components, skillfully setting up UI themes, and implementing fixes for the create profile UI. Additionally, Kevin played a vital role in setting up the Express backend and conducting investigations to integrate OpenAI API requests for generating user workout and meal schedules. Furthermore, Kevin showcased his ingenuity by creating a chatbot for customizing schedules and editing user profiles, enhancing the app's functionality and user experience.

<!-- GROUP -->
## The Team

[@Davis Song](https://www.linkedin.com/in/davissong/)<br>
[@Jack Ji](https://www.linkedin.com/in/jack-ji-5643a011a/)<br>
[@Kenny Cheng](https://www.linkedin.com/in/kennyjhcheng/)<br>
[@Kevin Chung](https://www.linkedin.com/in/kevin-chung07/)<br>
[@Kevin Wu](https://www.linkedin.com/in/kevin-wu1/)<br>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Built With
* [![NPM][NPM]][NPM-url]
* [![Node.js][Node.js]][Node-url]
* [![React][React.js]][React-url]
* [![MaterialUI][MaterialUI]][MaterialUI-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![Express][Express.js]][Express-url]
* [![Redux][Redux]][Redux-url]
* [![OpenAI][OpenAI]][OpenAI-url]
* [![JWT][JWT]][JWT-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DEVELOPMENT -->
## Development Tools
### Prototyping (Figma)
[![Prototyping with Figma][Figma]][Figma-url]

### Agile Development
[![Planning with Jira][Jira]][Jira-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Resources we found helpful along the way! 

* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [React Icons](https://react-icons.github.io/react-icons/search)
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

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
