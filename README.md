# Zeus Reviews

> A movie and TV review website focused around a social atmosphere. We encourage users to be positive within their reviews, and provide constructive feedback, rather than purely negative feedback. We would like to be able to contribute to the movie community, by providing helpful consumer insights on what is in demand. Our website allows users to write reviews, which can then be rated based on usefulness. Favortie and currently watching movies can be tracked for ease of use!

## Team

  - __Product Owner__: Nancy Du
  - __Scrum Master__: Alex Leo
  - __Development Team Members__: Mike Hughes, Luke Wilson

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
    a. [Installing Dependencies](#installing-dependencies)
    b. [Tasks](#tasks)
4. [Team](#team)
5. [Contributing](#contributing)

## Usage

> Create an account to get started. From there, you can link social media accounts for ease of access. Search for movies, find one you like, then go to the details page to leave a review. You may rate others' reviews from the details page as well. Share reviews with your friends using a direct link to the review itself. Want to check out some movie showtimes near you? Provide a zip code to get movie showtimes within 5 miles of the provided location.

## Requirements

- Node 6.8.0
- Express
- Body-Parser
- MongoDB
- Mongoose
- MLab
- Angular
- UI-Router
- Material CSS
- Underscore
- jQuery
- Moment

## Development

Developed using the MEAN stack, Zeus Reviews uses Node and Express on the backend to handle server requests. MongoDB and Mongoose power our database, where we store user profiles and information about movie reviews. The database is hosted on the Mlab service, a hosted database. The front-end is fueled by Angular, and displays data dynamically based on the data returned from the API calls. APIs and additional services currently in use include: TheMovieDB API for movie information, OMDB API to retrieve actor/cast info, OnConnect Data Delivery API for showtimes, and Auth0 for authentication.

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

View the project roadmap [here](https://github.com/Zeus-HatersGonaHate/Zeus-HatersGonaHate/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
