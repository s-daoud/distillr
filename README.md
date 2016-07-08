# Distillr

[Distillr live][heroku]

[heroku]: http://distillr-app.herokuapp.com

Distillr is a full-stack application inspired by Untappd. It uses Ruby on Rails on the backend, a PostgreSQL database, and React.js with a Flux architectural framework on the frontend.  

## Features & Implementation

### Single-Page App

Distillr is a single-page; all content is delivered on one static page. Upon load of the DOM, the app checks to see if a user is logged in with a call to `window.currentUser` -- which is set in the Rails view. Sensitive information is kept out of the frontend of the app by only allowing load of routes beyond the splash page with `SessionStore#isUserLoggedIn`.

```javascript
SessionStore.isUserLoggedIn = function(){
  return Boolean(Object.keys(_currentUser).length);
};
```

### Checkins

The checkins are stored in a table in the database, which contains columns for `id`, `user_id`, `drink_id`, `venue_id`, `rating`, and `review`. The front page contains a `CheckinForm` which makes an API call to the `CheckinController` to create a new checkin based on the values entered in the form. The checkins are held in the `CheckinStore`, and ultimately get displayed in four different places. The `Checkin` model contains the logic that determines which checkins are sent back in the API request.

```ruby
def self.all_profile(id)
  Checkin.where("user_id = ?", id)
end

def self.all_drink(id)
  Checkin.where("drink_id = ?", id)
end

def self.all_venue(id)
  Checkin.where("venue_id = ?", id)
end

def self.all_friends(id)
  user = User.find(id)
  reqs = user.friend_requests.where(status: "accepted")
  friends = [id]
  reqs.each do |req|
    friends << req.friend_id
  end
  Checkin.where("user_id IN (?)", friends)
end
```

Comments and likes on individual checkins are also stored within the `CheckinStore`, sent along as an association of their respective checkin with jbuilder. Because a checkin is always displayed with its comments and likes, pairing them was the most efficient way to ensure their presence.

Checkins are rendered in the `CheckinIndex`, which consists of many child `CheckinIndexItem` components. These in turn have a `CommentIndex`, which renders many `CommentIndexItems`. The `CheckinIndexItem` also contains a `CheckinLikes` component which simply allows for a cheers button and renders the number of likes a checkin has received.

### Drinks and Venues

Drinks and venues were handled very similarly, and implementing venues later in the project was very simple because the framework for drinks had already been established.

Both are created with an API call from `DrinkForm` and `VenueForm`, respectively. Drinks have a `Drink` model, with information about their `name`, an optional `description`, and an optional `image_url`. Images are uploaded through Cloudinary, and the url is retrieved through the callback function in the Cloudinary widget and added to the database.

Venues have a `Venue` model, which stores their `name`, `address`, and an optional `description`. Upon validation of the instance, addresses are geocoded and the `latitude` and `longitude` are also stored in the database. This made it trivial to use the Google Maps API to render a map of the venue on the venue's page.

They are stored in a `DrinkStore` and `VenueStore`.

Both drinks and venues are rendered in many places. In addition to being present in the search bars in the `CheckinForm`, each has its own page which displays its information and any related checkins. They are also rendered in the `TopRated` component, which contains up to 10 `DrinkRatingItem` components and `VenueRatingItem` components. Again, the work for which items to send back is done in the respective models.

```javascript
return (
  <div className="rating-flex">
    <div className="feed">
      <h3>Top Drinks</h3>
      <div className="friend-box">
        {
          drinkKeys.map (drinkId => {
            return <DrinkRatingItem drink={this.state.drinks[drinkId]} key={this.state.drinks[drinkId].id}/>;
          })
        }
      </div>
    </div>

    <div className="feed">
      <h3>Top Venues</h3>
      <div className="friend-box">
        {
          venueKeys.map (venueId => {
            return <VenueRatingItem venue={this.state.venues[venueId]} key={this.state.venues[venueId].id}/>;
          })
        }
      </div>
    </div>
  </div>
);
```

Venues are also rendered in the `NearbyVenues` component. This uses a combination of the geocoder gem and the Google Maps Distance Matrix API to display venues within half a mile of the client browser location, and lists them in order of proximity as a `NearbyVenueItem`.

### Profile and Friends

Users are also stored in a `UserStore`. Each user has a `ProfilePage` component and a `UserInfoBox` component. The info box provided some interesting stats about the user, such as the number of friends and unique drinks consumed, and is rendered on both the main feed and individual profile pages. The profile contains all the user's checkins, as well as their friend status with the current user.

Friends are managed through the `Friend` join table, which consists of a `user_id` column for the requester, a `friend_id` column for the requested, and a `status` column that defaults to pending. If there is a pending request between two people, no matter who sent it, the friend button on both their pages when they view each other will be greyed out.

If there is no friendship between two users, clicking the button will initiate an API request to create this pending state. If rejected, the entry is destroyed from the database. Howeever, if accepted, the `status` changes to accepted and the reverse entry is automatically added to the database, resulting in a two way friendship. Similarly, if either friend chooses to end the friendship, both entries are destroyed.

```ruby
def update
  @friend = Friend.find(params[:id])
  @friend.status = "accepted"
  @friend.save
  Friend.create({user_id: @friend.friend_id, friend_id: @friend.user_id, status: "accepted" })
  render :edit
end

def destroy
  @friend = Friend.find(params[:id])
  opposite = Friend.where("user_id = ?", @friend.friend_id).where("friend_id = ?", @friend.user_id).first
  @friend.destroy!
  opposite.destroy! if opposite
  render :show
end
```

The `FriendRequestIndex` renders all received friend requests on both the main feed and on the `FriendIndex`, allowing a user to easily accept or reject a request. In addition, the `FriendIndex` contains a list of `FriendIndexItem` components which show a user all their current friends and easily gives them the ability to visit a friend's profile or remove them as a friend.

### Navbar

The `NavBar` component is part of the root route, and sits on every page that a user encounters while logged in. 

```javascript
const App = React.createClass({
  render(){
    let nav = (<div></div>);

    if(this.props.location.pathname !== "/"){
      nav = <NavBar />;
    }

    return (
      <div className="app-container">
        {nav}
        {this.props.children}
      </div>
    );
  }
});
```

The `NavBar` contains links to many of the other routes as described above, as well as a dropdown which lets the current user easily navigate around their information, linking to their feed, profile, and friends, as well as letting them log out.

It also contains a `Search` component, which listens to the `UserStore`, `DrinkStore`, and `VenueStore`. This component allows users to type a string and matches it to an item in any of those three stores. Upon either writing the entirety of the string and hitting enter, or simply clicking on one of the options that show up in a filtered dropdown, they will be redirected to the appropriate page. 

```javascript
autoUser(userId){
  hashHistory.push(`users/${userId}`);
},
autoDrink(drinkId){
  hashHistory.push(`drinks/${drinkId}`);
},
autoVenue(venueId){
  hashHistory.push(`venues/${venueId}`);
},
handleSubmit(){
  if (Object.keys(this.state.drinkList).length !== 0 && this.state.drinkList.constructor === Object) {
    hashHistory.push(`drinks/${this.state.drinkList[Object.keys(this.state.drinkList)[0]].id}`);
  } else if (Object.keys(this.state.venueList).length !== 0 && this.state.venueList.constructor === Object) {
    hashHistory.push(`venues/${this.state.venueList[Object.keys(this.state.venueList)[0]].id}`);
  } else if (Object.keys(this.state.userList).length !== 0 && this.state.userList.constructor === Object) {
    hashHistory.push(`users/${this.state.userList[Object.keys(this.state.userList)[0]].id}`);
  }
}
```

A user will be able to browse the site to discover new drinks, venues, and potential friends.

## Future Directions for the Project

In addition to the features already implemented, I plan to continue work on this project. The next steps for Distillr are outlined below.

### Badges

Earning badges is a standard feature of Untappd. Users can gain these badges based on the number and type of drinks they've consumed and venues they've visited, and they will be displayed on both their main feed and profile page.

### Easier checkins

Users will have the ability to check in directly from a drink or venue page with that form element already filled out.