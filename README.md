# Tindog
Tindog is a traveling/dating platform for both dogs and owners.
![Home](/screenshots/Home.png?raw=true "Optional Title")

## About
Sometimes, it’s hard to take your dog on travel, renting a car is expensive, and cleaning the car afterwards is super painful as well.

So I start building this project that could put these owners together and take them out, with their dogs.

However, I ended up with a dating website that target dog owners. But the business model is still based on taking these dog owners on travel with their dogs. 

## Initial Setup
To get started, first clone the repo

`git clone https://github.com/dindean/Tindog.git`

Install NPM packages:  

`npm install`

To start Tindog in development mode, run
`npm run dev-mac`

and visit localhost:8080.

## Front End
- [X] Create React App without using creat-react-app (set your own Webpack)
- [X] Dynamically populate user and dog information fetching from server
- [X] Compose React components on inputs/buttons and styling (Avoid using Bootstrap/Material UI)
- [X] Dynamically populate dropdown menu and properly use hook/Redux
 
## Server Infrastructure
- [X] Start localhost server, set up hot and historyApiFallBack in Webpack.config.
- [X] Serve root directory (start with static website)
- [X] Access information from Database
- [X] Authenticate user with Google firebase

## Stretch Features
More Features will be updated, such as 
- [X] Improve UX/UI with s?css styling
- [ ] Payment 
- [ ] Onine chatting
- [ ] Redux Saga 
- [ ] Transition from Mongo to Postgres
- [ ] Add favorites/watch list 
- [ ] Access server from devices not on the same network
- [ ] Connect to API for travel images and information
- [ ] Add authentication for storing favorites/'watch list' Database:

## Contributing
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. 
Any contributions you make are greatly appreciated.

- Fork the Project
- Create your Feature Branch (git checkout -b feature)
- Commit your Changes (git commit -m 'Add feature')
- Push to the Branch (git push origin feature)
- Open a Pull Request

## License 
This project is licensed under the MIT License.
