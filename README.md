# Project-2
**YourStats**


## Description
---
YourStats is a soccer based stats website that allows you to retrive statistics on your favorite soccer teams and countries. Using the livescore-api you are able to retrieve data on any team. YourStats will allow you to sign up and leave comments with other soccer-lovers discussing upcoming matches! With the World cup starting in November now is the perfect time to get you ready for the "beautiful" games most important competition. Imagine it like a social media to talk about upcoming matches.
Example of API data


## API
---
Here is an example of data the API shows us:

<img width="504" alt="API Data" src="https://user-images.githubusercontent.com/108231637/189979623-aa86a87b-04ae-4aeb-85ac-7251f74e718c.png">

We can see the specifc match id
- Which player scored the goal --> in this case Troy Deeney
- What minute the goal was scored --> 5 minutes into the game
- What event occured --> A goal
- Which side scored the goal --> The home side


## Database diagram
---
<img width="530" alt="Database diagram" src="https://user-images.githubusercontent.com/108231637/189981958-11a593c3-ec49-4f04-b0bc-a9f5b1487169.png">


## Wireframe
---
![Screen Shot 2022-09-13 at 1 34 08 PM](https://user-images.githubusercontent.com/108231637/189982819-ab0770ab-35d2-4155-ae12-a397761ced00.png)


## Routes
--
### Users
- GET -> /users/new -> Display a sign up form
- POST -> /users/ -> Add the user to the database
- GET -> /users/login -> Login page
- POST -> /users/login -> Log the user in, and add a cookie to the browser
- GET -> /users/logout -> log the user out
### Players
- GET -> /players/:id -> show a detailed page of a specific player
- POST -> /players/:id -> add comments to a specific player
### Matches
- GET -> /match/:id -> show detailed page of a specific page
- POST -> /match/:id -> add comments to a specific match
### Comments
- POST -> users/:id -> add comment to users database
- PUT -> comment/:id -> all the user to edit their comment
- DELETE -> comment/:id -> allow the users to delete their comment


## User Stories
---
- As a life-long Chelsea and Soccer fan, I want a place where I can discuss upcoming matches with other fans where stats are easily visible for everyone so that every commentor has accurate information to debate topics.
- As a soccer fan I would love an easy way to search information about my favorite players or teams.
- As a fan of the "beautiful game" I want a website that is focused on my favorite sport.

## MVP
---
- Use of Livescore-API
- at least 2 models (users, matches, players, comments)

## stretch goals
---
- Incorporate more then 1 sport (long-range and unlikely. Leaving as a note for my future self to come back to)
- Allow users to add their own profile pictures / pick a player as their profile picture
