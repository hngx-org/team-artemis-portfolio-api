# team-artemis-portfolio-api

## Installation

Required: [Node](https://nodejs.org/) plus [npm](https://docs.npmjs.com/) and [Git](https://git-scm.com/downloads)

```text
Fork the repo https://github.com/hngx-org/team-artemis-portfolio-api
```

```bash
git clone https://github.com/<your_github_username>/team-artemis-portfolio-api

cd team-artemis-portfolio-api

git remote add upstream https://github.com/hngx-org/team-artemis-portfolio-api.git

git pull upstream dev

git checkout <your_branch_name>
```

## Running Locally

```bash

npm install

# Copy env.sample to .env and input your keys

npm run start:dev

```

## Pushing your code

```bash
# add and commit your changes

git pull upstream dev

git push origin <your_branch_name>

# go and make a pull request to the dev branch
```

## Folder Structure

```
team-artemis-portfolio-api/
│
├── src/
│   ├── controllers/
│   │   ├── greeting.controller.ts
│   │   └── ...
│   │
│   ├── models/
│   │   ├── greeting.model.ts
│   │   └── ...
│   │
│   ├── routes/
│   │   ├── greeting.route.ts
│   │   └── ...
│   │
│   ├── middlewares/
│   │   ├── index.ts
│   │   └── ...
│   │
│   ├── configs/
│   │   ├── database.config.ts
│   │   └── ...
│   │
│   ├── services/
│   │   ├── greeting.service.ts
│   │   └── ...
│   │
│   ├── utils/
│   │   ├── helpers.ts
│   │   └── ...
│   │
│   ├── app.ts
│   ├── server.ts
│   └── ...
│
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── ...
```

### Here's a brief explanation of each folder:

- `src/`: This folder contains your application's source code.

- - `controllers/`: Controllers handle the business logic of your application.
- - `models/`: Sequelize models represent your database tables.
- - `routes/`: Define your API routes using Express.
- - `middlewares/`: Custom middlewares for authentication, error handling, etc.
- - `configs/`: Configuration files like database configuration.
- - `services/`: Business logic that interfaces with your models.
- - `utils/`: Utility functions that can be reused across your application.
- - `app.ts`: Initialize and configure Express.
- - `server.ts`: Start your Express server.

- `.env`: Store environment variables such as database connection details and API keys.

- `.gitignore`: Ignore files and directories when using Git.

- `package.json`: Node.js project configuration.

- `tsconfig.json`: TypeScript configuration.
