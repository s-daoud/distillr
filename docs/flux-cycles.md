# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.


## Checkin Cycles

### Checkin API Request Actions

* `createCheckin`
  0. invoked from submit check in button `onClick`
  0. `POST /api/checkins` is called.
  0. `receiveSingleCheckin` is set as the callback.

* `fetchAllCheckins`
  0. invoked from `FeedIndex` `didMount`
  0. `GET /api/checkins` is called with url params.
  0. `receiveAllCheckins` is set as the callback.

* `destroyCheckin`
  0. invoked from delete button `onClick`
  0. `DELETE /api/checkins/:id` is called.
  0. `removeCheckin` is set as the callback.

### Checkin API Response Actions

* `receiveSingleCheckin`
  0. invoked from an API callback.
  0. `Checkin` store updates `_checkins[id]` and emits change.

* `receiveAllCheckins`
  0. invoked from an API callback.
  0. `Checkin` store updates `_checkins` and emits change.

* `removeCheckin`
  0. invoked from an API callback.
  0. `Checkin` store removes `_checkins[id]` and emits change.

### Store Listeners

* `FeedIndex` component listens to `Checkin` store.
* `FeedIndexItem` component listens to `Checkin` store.
* `CheckinForm` component listens to `Checkin` store.


## Like Cycles

### Like API Request Actions

* `createLike`
  0. invoked from like button `onClick`
  0. `POST /api/likes` is called.
  0. `receiveSingleCheckin` is set as the callback.

* `destroyLike`
  0. invoked from unlike button `onClick`
  0. `DELETE /api/likes/:id` is called.
  0. `receiveSingleCheckin` is set as the callback.

### Store Listeners

* `Likes` component listens to `Checkin` store.


## Comment Cycles

### Comment API Request Actions

* `createComment`
  0. invoked from add comment button `onClick`
  0. `POST /api/comments` is called.
  0. `receiveSingleCheckin` is set as the callback.

* `destroyComment`
  0. invoked from delete button `onClick`
  0. `DELETE /api/comments/:id` is called.
  0. `receiveSingleCheckin` is set as the callback.

### Store Listeners

* `CommentIndex` component listens to `Checkin` store.
* `CommentIndexItem` component listens to `Checkin` store.


## User Cycles

### User API Request Actions

* `fetchSingleUser`
  0. invoked from sign in button `onClick`
  0. `GET /users/:id` is called.
  0. `receiveSingleUser` is set as the callback.

* `fetchFriends`
  0. invoked from `FriendIndex` `didMount`
  0. `GET /api/users/:user_id/friends` is called.
  0. `receiveAllFriends` is set as the callback.

* `createFriend`
  0. invoked from add friend button `onClick`
  0. `POST /api/friends` is called.
  0. `receiveSingleFriend` is set as the callback.

* `destroyFriend`
  0. invoked from delete friend button `onClick`
  0. `DELETE api/friends/:id` is called.
  0. `removeFriend` is set as the callback.

### User API Response Actions

* `receiveSingleUser`
  0. invoked from an API callback.
  0. `User` store updates `_current_user` and emits change.

* `receiveAllFriends`
  0. invoked from an API callback.
  0. `User` store updates `_friends` and emits change.

* `receiveSingleFriend`
  0. invoked from an API callback.
  0. `User` store updates `_friends[id]` and emits change.

* `removeFriend`
  0. invoked from an API callback.
  0. `User` store removes `_friends[id]` and emits change.

### Store Listeners

* `Navbar` component listens to `User` store.
* `UserInfo` component listens to `User` store.
* `UserInfoProfile` component listens to `User` store.
* `FriendIndex` component listens to `User` store.
* `FriendIndexItem` component listens to `User` store.
* `FriendProfile` component listens to `User` store.
* `FriendProfileItem` component listens to `User` store.


##Drink Cycles

###Drink API Request Actions

* `fetchSingleDrink`
  0. invoked from `DrinkInfo` `didMount`
  0. `GET /api/drinks/:id`
  0. `receiveSingleDrink` is set as callback

* `fetchAllDrinks`
  0. invoked from drink input field `onChange` when text is entered
  0. `GET /api/drinks` with text param
  0. `receiveAllDrinks` is set as callback

###Drink API Response Actions

* `receiveSingleDrink`
  0. invoked from API callback
  0. `Drink` Store updates `_drinks[:id]` and emits change

* `receiveAllDrinks`
  0. invoked from API callback
  0. `Drink` Store updates `_drinks` and emits change

### Store Listeners

* `CheckinForm` listens to `Drink` Store
* `DrinkInfo` listens to `Drink` Store
* `Recipe` listens to `Drink` Store
* `TopDrinkIndex` listens to `Drink` Store
* `TopDrinkIndexItem` listens to `Drink` Store


## Venue Cycles

### Venue API Request Actions

* `fetchSingleVenue`
  0. invoked from `VenueInfo` `didMount`
  0. `GET /api/venues/:id`
  0. `receiveSingleVenue` is set as callback

* `fetchAllVenues`
  0. invoked from drink input field `onChange` when text is entered
  0. also invoked from map `idle`
  0. `GET /api/venues` with text param or bounds params
  0. `receiveAllVenues` is set as callback

* `likeVenue`
  0. invoked from like button `onClick`
  0. `POST /api/venue_likes`
  0. `receiveSingleVenue` is set as callback

* `unlikeVenue`
  0. invoked from unlike button `onClick`
  0. `DELETE /api/venue_likes/:id`
  0. `receiveSingleVenue` is set as callback

### Venue API Response Actions

* `receiveSingleVenue`
  0. invoked from API callback
  0. `Venue` Store updates `_venues[:id]` and emits change

* `receiveAllVenues`
  0. invoked from API callback
  0. `Venue` Store updates `_venues` and emits change

### Store Listeners

* `CheckinForm` listens to `Venue` Store
* `VenueInfo` listens to `Venue` Store
* `MapVenue` listens to `Venue` Store
* `MapIndex` listens to `Venue` Store
* `VenueIndex` listens to `Venue` Store
* `VenueIndexItem` listens to `Venue` Store
* `TopVenueIndex` listens to `Venue` Store
* `TopVenueIndexItem` listens to `Venue` Store
