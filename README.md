# Application Outline

## Purpose

The main purpose of our application is to measure certain cognitive and physical
abilities of different people. By offering several different tests and challenges, people
are able to determine how they fare compared to others in terms of proficiency in
various cognitive and physical tasks.

## Features

- User Dashboard
- Leaderboard
- User login/logout
- Stat/graphs for logged in users
- Aim Trainer
- Reaction Test
- Number Memory Test
- Visual Memory Test
- Typing Test

## Target Users

There isn’t a certain demographic of users that we are targeting, rather people from any
demographic are encouraged to use the application.Our web application appeals to
users of all ages ranging from children all the way to the elderly.

Children can use our application to not only test their cognitive skills, but also work to
improve these skills as well, serving as an effective learning tool. By developing
cognitive abilities from childhood, fundamental skills key to success in various
endeavors of life, such as problem solving, learning, information retention and decision
making are improved and enhanced.

On the contrary, the same can be said for the elderly or those who have impairments in
brain function. Unfortunately as people age, cognitive impairments such as dementia,
can be detrimental in both their quality of life and the lives of those around them.
The services our application can offer include testing for cognitive decline or impairment, as well as to improve those deficiencies.
Cognitive challenges can serve as a means to maintain and improve one’s cognitive
ability and brain function.

## Achievements

- Designed and completed Database w/ SQLite and Turso
- Completed Aim Trainer
- Completed Typing Test
- Completed Reaction Test
- Completed Number Memory
- Completed Visual Memory
- Completed Stats and Graphs
- Completed User Dashboard
- Completed Leaderboard
- Completed User authentication
- Used Auth0
- Completed Testing
- Majority of testing was manual, with some being automatic
- Deployed Application

We successfully achieved all of our goals for MVP including our stretch goals (stats and graphs).

## Project Source code guide

### Aim Trainer (/aim)

- src/components/aimTrainer/\*
- src/components/AimTrainer.css
- src/components/AimTrainer.tsx
- src/components/AimTrainerCountdown.tsx

### Typing Test (/typing)

- src/components/TypingTest/\*
- src/components/Typing.tsx

### Reaction Test (/reactiontest)

- src/components/reactiontime/\*
- src/components/ReactionTest.tsx
- src/components/ReactionTest.css

### Number Memory (/numbermemory)

- src/components/memoryTest/\*
- src/components/NumberMemory.tsx
- src/components/NumberMemory.css

### Visual Memory (/visual)

- src/components/visualtest/\*
- src/components/VisualTest.tsx
- src/components/VisualTest.css

### Testing

- src/components/Home.test.tsx

### Database

- database.sql
- server/server.js

### API

- server/server.js

### Home Page

- src/components/Home.tsx

### Dashboard

- src/components/Dashboard.tsx

## Next steps

- Make the application mobile friendly
- Implement AI stats analysis, so that users can get more accurate insights into their performance, even against large volumes of datasets
- Multiplayer mode against other players. Implementing P2P server development as well as netcode requirements

## Main roles and contributions of each team member

### Ian

- Created and tested the Aim Trainer
- Created and tested the Typing Test
- Helped Maxim in designing the UI/UX of dashboard and homepage
- Wrote majority of README.md file

### Dong Hyun Lee (Ben)

- Created and tested the Reaction Test
- Created and tested the Visual Memory Test
- Unified the style of Games
- Helped take screenshots of pages

### Maxim

- Designed and created the majority of UI/UX
  - Homepage and Dashboard
- Auth0 implementation
- Created Number Memory Test
- Added basic automated tests

### Kabir

- Created leaderboards
- Designed deployment process (DEPLOYMENT.md)
- Created database infrastructure
- Wrote backend API
- Created stats and graphs
- Created underlying framework for user dashboard
- Integrated Auth0 with backend

### Interactions and Communications

Our team was able to manage interaction and communication throughout the project by meeting up in our practicals and communicating consistently via a discord server. During our practicals we would discuss what we needed to work on for that specific week as well as iron out any important or pressing issues. Throughout the week if we needed to inform another team-member of a certain change or if we needed to discuss a certain aspect of our application, we would either call or message each other in the server.

## Technologies

- Auth0 for authentication
- Turso + SQLite for database
- Fly for deployment
- React for frontend
- Bun for backend
- TypeScript for improving code quality (not strict)
- Vite for frontend bundling
- Docker for containerization
