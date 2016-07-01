# Distillr

[Heroku link][heroku]

[heroku]: http://distillr-app.herokuapp.com

## Minimum Viable Product

Distillr is a web application inspired by Untappd that will be built using Ruby on Rails and React.js. By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [x] Hosting on Heroku
- [x] New account creation, login, and guest/demo login
- [ ] A production README, replacing this README
- [ ] Checkins
  - [x] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [x] Adequate CSS styling
- [ ] Feed
  - [x] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [x] Adequate CSS styling
- [ ] Friends
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Profile
  - [x] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [x] Adequate CSS styling

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

- [x] create new project
- [x] create models: `User`
- [x] create controllers: `Users`, `Session`
- [x] authentication
- [x] user sign in/sign up pages
- [x] guest sign in
- [x] splash page
- [x] landing page after sign in with basic navbar

### Phase 2: Flux architecture for drinks, checkins (1 day, W1D3)

**Objective:** Checkins can be created, deleted, and displayed. Drinks exist.

- [x] create models: `Checkin`, `Comment`, `Like`
- [x] create controllers: `Checkins`, `Comments`, `Likes`
- [x] create models: `Drink`
- [x] create controllers: `Drinks`
- [x] setup API/flux for drinks cycle
- [x] add interactive search functionality to checkin form
- [x] setup API and flux loop for checkin cycle
- [x] make sure checkin form works

### Phase 3: Comments, likes, and profile (1 day, W1D4)

**Objective:** Users have profile pages and can comment on or like checkins.

- [x] setup API/flux loop for like and comment cycles
- [x] make profile page
- [x] add feed to drink page
- [x] add feed to profile page
- [x] feeds are selective based on page you're on
- [x] style feed
- [x] style profile page
- [x] style drink page

### Phase 4: Friends and styling (1 day, W1D5)

**Objective:** Users can have friends and follow only their feeds on their main page

- [ ] style checkin form
- [ ] create models: `Friend`
- [ ] create controllers: `Friends`
- [ ] setup API/flux for friends cycle
- [ ] add ability to friend/unfriend users
- [ ] main feed only displays friends
- [ ] style friends page
- [ ] MVP (hopefully) functional! spend the rest of the day refining styling on all pages so far

### Phase 5: Venues (1 day, W2D1)

**Objective:** Add venues! With pages, ability to include them in checkins, and location searching

- [ ] create models: `Venue`, `VenueLike`
- [ ] create controllers: `Venues`, `VenueLikes`
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
- [ ] infinite scroll for feeds
- [ ] top rated drinks on more pages
- [ ] user info pane with drinks consumed, unique consumed, number of friends
- [ ] checkin from drink page with drink already filled in
- [ ] badges
- [ ] each checkin has it's own page with details about who liked it/all comments
- [ ] profile pictures
- [ ] tags with type of alcohol, flavor profile(e.g., sweet, sour, etc)
- [ ] search by tag
