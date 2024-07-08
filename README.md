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


## Modeling

![image](https://github.com/giliard1984/xplora/assets/22618819/059cd224-5c41-44a7-baab-548771254afb)

## Setting Up & starting the backend application

To be able to start this application, you should have docker and docker-compose on your machine. This will help us a lot!

That's it! You just need to access the backend folder and run `docker-compose up -d` , and check everything is up :)

You should be able to access the API Gateway on `http://localhost:4000/graphql`, which is the port expressed in the Dockerfile for this application.

![image](https://github.com/giliard1984/xplora/assets/22618819/183e28b5-269d-49b8-9ecf-6cf45f58e562)


## Setting Up & starting the frontend application

For the frontend, please guarantee you have node 20 installed on your machine.
Run `yarn install`
Run `yarn run dev`

You should be able to access the application on `http://localhost:5173`, which is the port Vite starts the application (by default).

![image](https://github.com/giliard1984/xplora/assets/22618819/aace907a-f844-4593-9411-ab6d6c99eb04)

![image](https://github.com/giliard1984/xplora/assets/22618819/c774420c-d3d7-4f8b-8d0a-d476b33b6e82)


## Next steps

This section aims to express the points that are either missing, or should be implemented, for this project to function better.


