## Component Hierarchy

**Bolded** components are associated with routes.

* **App**
  * Navbar
    * Search
  * CheckinForm
  * FeedIndex
    * FeedIndexItem
      * Likes
      * CommentIndex
        * CommentIndexItem
  * **UserInfoProfile**
    * FriendProfile
        * FriendProfileItem
  * **FriendIndex**
    * FriendIndexItem
  * **Drink Info**
    * Recipe
  * **VenueInfo**
  * MapVenue
  * UserInfo
  * Badges
  * MapIndex
    * VenueIndex
      * VenueIndexItem
  * TopDrinkIndex
    * TopDrinkIndexItem
  * TopVenueIndex
    * TopVenueIndexItem


## Routes

* **component:** `App` **path:** `/`
  * **component:** `UserInfoProfile` **path:** `users/:userId`
    * **component:** `FriendIndex` **path:** `friends`
  * **component:** `DrinkInfo` **path:** `drinks/:drinkId`
  * **component:** `VenueInfo` **path:** `venues/:venueId`