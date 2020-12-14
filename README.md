# Description
Framework: [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

Database: Sqlite3 with Sequelize
## Project Description
Rest API to do CRUD operations on the following resources:

- User
- Pictures
- Likes
- Tags

Detail:
* User has many pictures
* Resource Owner User can add many tags to a Picture, maximum 10.
* Non-Resource Owner user can like pictures, only one like per picture by same user.


This project includes:
- Passport Authentication with local strategy and jwt strategy
- S3 integration for photo upload


## Installation

```bash
$ npm install
```

## ENV files setup
Env files located in `config` folder. Check `.env.example` for required env values. Create {environtment}.env files based on your project environment.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
