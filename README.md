# Distillr

[Heroku link][heroku]

[heroku]: http://distillr-app.herokuapp.com

## Minimum Viable Product

Distillr is a web application inspired by Untappd that will be built using Ruby on Rails and React.js. By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] A production README, replacing this README
- [ ] Checkins
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Feed
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Friends
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Profile
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: docs/views.md
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Backend model/controller setup and front end user authentication (1 day, W1D2)

**Objective:** Functional project with authentication and associations

- [ ] create new project
- [ ] create models: `User`, `Friend`, `Drink`, `Checkin`, `Comment`, `Like`, `Venue`, `VenueLike`
- [ ] create controllers: `Users`, `Session`, `Friends`, `Drinks`, `Checkins`, `Comments`, `Likes`, `Venues`, `VenueLikes`
- [ ] authentication
- [ ] user sign in/sign up pages
- [ ] guest sign in
- [ ] splash page
- [ ] landing page after sign in with basic navbar

### Phase 2: Flux architecture for checkins (1 day, W1D3)

**Objective:** Checkins can be created, deleted, and displayed. They can be liked or commented on

- [ ] seed database
- [ ] jbuilder views
- [ ] setup API and flux loop for checkin cycle
- [ ] make sure checkin form works
- [ ] setup API/flux loop for like and comment cycles
- [ ] style feed

### Phase 3: Users and friends (1 day, W1D4)

**Objective:** Users have profile pages which display their activity and a page that lists all their friends

- [ ] setup react router
- [ ] setup API/flux for users cycle
- [ ] add ability to friend/unfriend users
- [ ] add user info pane to landing page - tracks total number of drinks, unique drinks, number of friends
- [ ] add user dropdown to navbar
- [ ] style profile page
- [ ] style friends page

### Phase 4: Drinks and styling (1 day, W1D5)

**Objective:** Drinks have their own pages with feed with people who have rated them

- [ ] setup API/flux for drinks cycle
- [ ] add interactive search functionality to checkin form
- [ ] style drink page
- [ ] MVP (hopefully) functional! spend the rest of the day refining styling on all pages so far

### Phase 5: Venues (1 day, W2D1)

**Objective:** Add venues! With pages, ability to include them in checkins, and location searching

- [ ] setup API/flux for venues cycle
- [ ] venue page with info, static map with location marker, and feed with checkins at that venue
- [ ] like/unlike button on the venue page
- [ ] nearby venues page, pulls in browser location and sets markers to venues in bounds of map with location at center
- [ ] lists venues whose markers are shown
- [ ] add nearby page to navbar
- [ ] style pages

### Phase 6: Top Rated Drinks/Venues and Averages (1 day, W2D2)

**Objective:** Page to look at top 10 rated drinks and venues and average data

- [ ] add average rating to drink page
- [ ] add average rating to venue page
- [ ] page with top drinks and venues (ordered by average rating, limited to 10)
- [ ] add top rated page to navbar
- [ ] style page

### Phase 7: Search and recipes (1 day, W2D3)

**Objective:** Allow searching for drinks/venues and have recipes on the drink pages

- [ ] interactive, dropdown search in nav bar, searches through both drinks and venues
- [ ] style navbar
- [ ] make sure clicking username in navbar makes dropdown with: feed, profile, friends, and log out
- [ ] research how to implement and create tables and models for recipes, ingredients, directions
- [ ] add recipe component to drink page

### Phase 8: Cleanup and seeding (1 day, W2D4)

**Objective:** Polish everything, make everything cohesive and pretty and functional

- [ ] add awesome seeds
- [ ] get feedback
- [ ] clean up CSS, refactor classes
- [ ] add hovers/other transitions/stylistic flourishes


### Bonus Features (TBD)
- [ ] create drinks/venues
- [ ] badges
- [ ] infinite scroll for feeds
- [ ] top rated drinks on more pages
- [ ] each checkin has it's own page with details about who liked it/all comments
- [ ] profile pictures
- [ ] tags with type of alcohol, flavor profile(e.g., sweet, sour, etc)
- [ ] search by tag