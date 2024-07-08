# Xplora (Technical Task)

Please write a simple web app and API to show your skills relevant to our job advert.
Some of the features & expectations:
• Database design and data modelling about availability of hotel rooms and bookings
• Feature to find available rooms by date range at least
• Feature to create a booking with basic details of customer for a hotel room

Bonus: automated testing
The idea of this task is to show off your skills related to our job spec. We know this leaves a
lot to your interpretation; we would like to see your approach.


## Technologies involved

For the backend, I've decided to use something slightly different.
• Docker
• Node.js
• Typescript
• ApolloServer (as subgraphs for the microservices and supergraph on the API-Gateway) - GraphQL
• MongoDB (2 main databases: user and generic databases)

For the frontend:
• React 18
• Typescript
• ApolloClient (acessing the API-Gateway, which is an ApolloFederation project) - GraphQL


## Archictecture

Bear in mind, that I drew what I had in mind, and highlighted only the microservices and/or containers I wanted to implemented (this means you will see more details than implemented).

![image](https://github.com/giliard1984/xplora/assets/22618819/d251b378-feef-44b3-a01a-8fd65d321d71)


## Modelling

![image](https://github.com/giliard1984/xplora/assets/22618819/2c61091c-7f7e-4aa4-9652-1be8f79b3118)


## Setting Up & starting the backend application

To be able to start this application, you should have docker and docker-compose on your machine. This will help us a lot!

That's it! You just need to access the backend folder and run `docker-compose up -d` , and check everything is up :)

Note: When starting the microservices, the inital data will be automatically added to the MongoDB collections, so you can start using the application straight away.

You should be able to access the API Gateway on `http://localhost:4000/graphql`, which is the port expressed in the `docker-compose.yml` for this application.

![image](https://github.com/giliard1984/xplora/assets/22618819/183e28b5-269d-49b8-9ecf-6cf45f58e562)


## Setting Up & starting the frontend application

For the frontend, please guarantee you have node 20 installed on your machine. Bear in mind, that I kept the UI/UX at minimum (which means I didn't focus on delivering a beautiful application, following the booking platforms out there).
Run `yarn install`
Run `yarn run dev`

You should be able to access the application on `http://localhost:5173`, which is the port Vite starts the application (by default).

![image](https://github.com/giliard1984/xplora/assets/22618819/aace907a-f844-4593-9411-ab6d6c99eb04)

![image](https://github.com/giliard1984/xplora/assets/22618819/c774420c-d3d7-4f8b-8d0a-d476b33b6e82)


## Next steps

This section aims to express the points that are either missing, or should be implemented, for this project to function better.

• There is a known issue within the users microservice, that is causing the seeds to be saved twice
• Improve the existing components
• Make use of alias within the microservices. There is an issue using some of the libraries with typscript within docker, that I didn't have time to resolve.
• Move types and interfaces into a .d.ts file or files
• Abstract all styling into its own .scss files
• Implement filters


