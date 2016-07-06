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
  - [x] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [x] Adequate CSS styling
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

- [x] style checkin form
- [x] create models: `Friend`
- [x] create controllers: `Friends`
- [x] setup API/flux for friends cycle
- [x] add ability to friend/unfriend users
- [x] main feed only displays friends
- [x] style friends page
- [x] MVP (hopefully) functional! spend the rest of the day refining styling on all pages so far

### Phase 5: Venues (1 day, W2D1)

**Objective:** Add venues! With pages, ability to include them in checkins, and location searching

- [x] create model: `Venue`
- [x] create controller: `Venues`
- [x] setup API/flux for venues cycle
- [x] venue page with info, static map with location marker, and feed with checkins at that venue
- [x] nearby venues page, pulls in browser location and sets markers to venues in bounds of map with location at center
- [x] lists venues whose markers are shown
- [x] add nearby page to navbar
- [x] style pages

### Phase 6: Top Rated Drinks/Venues and Averages (1 day, W2D2)

**Objective:** Page to look at top 10 rated drinks and venues and average data

- [x] add average rating to drink page
- [x] add average rating to venue page
- [x] page with top drinks and venues (ordered by average rating, limited to 10)
- [x] add top rated page to navbar
- [x] style page

### Phase 7: CSS and misc bonuses (1 day, W2D3)

**Objective:** Style and add more bonus features

- [x] restyle splash page
- [x] restyle drinks
- [x] restyle venues
- [ ] restyle profile
- [ ] restyle feed
- [ ] user info pane with drinks consumed, unique consumed, number of friends

### Phase 8: Cleanup and seeding (1 day, W2D4)

**Objective:** Polish everything, make everything cohesive and pretty and functional

- [ ] add seeds
- [ ] implement a few more bonus features
- [ ] clean up CSS, refactor

### Phase 9: Make sure everything's complete! (1 day, W2D5)

**Objective:** More polish, make production README and any other final, non-technical touches

- [ ] make production README
- [ ] make sure dyno doesn't sleep
- [ ] buy domain name


### Bonus Features (TBD)
- [x] upload image when making new drink
- [ ] checkin from drink page with drink already filled in
- [ ] checkin from venue page with venue already filled in
- [ ] search for drinks/venues
- [ ] infinite scroll for feeds
- [ ] nearby venues only shows venues in bounds
- [ ] badges
