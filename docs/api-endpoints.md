# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `GET /users/:id`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Checkins

- `GET /api/checkins`
- `POST /api/checkins`
- `DELETE /api/checkins/:id`

### Comments

- `POST /api/comments`
- `DELETE /api/comments/:id`

### Likes

- `POST /api/likes`
- `DELETE /api/likes/:id`

### Friends

- `GET /api/users/:user_id/friends`
- `POST /api/friends`
- `DELETE /api/friends/:id`

### Drinks

- `GET /api/drinks`
- `GET /api/drinks/:id`

### Venues

- `GET /api/venues`
- `GET /api/venues/:id`

### VenueLikes

- `POST /api/venue_likes`
- `DELETE /api/venue_likes/:id`

