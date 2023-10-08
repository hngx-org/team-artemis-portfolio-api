# team-artemis-portfolio-api

## Installation

Required: [Node](https://nodejs.org/) plus [npm](https://docs.npmjs.com/) and [Git](https://git-scm.com/downloads)

1. Fork the repo

   ```bash
   https://github.com/hngx-org/team-artemis-portfolio-api
   ```

2. clone the repo

   ```bash
   git clone https://github.com/<your_github_username>/team-artemis-portfolio-api
   ```

3. Change directory

   ```bash
   cd team-artemis-portfolio-api
   ```

4. Set the 'upstream' remote repository to track changes from the original repository

    ```bash
    git remote add upstream https://github.com/hngx-org/team-artemis-portfolio-api.git
    ```

5. Pull the latest changes from the 'upstream' remote's 'dev' branch into your local branch

   ```bash
   git pull upstream dev
   ```

6. Create a new branch for the task you were assigned to, eg `TicketNumber/(Feat/Bug/Fix/Chore)/Ticket-title` :
   ```bash
   git checkout -b ZP-B01/Feat/swagger docs
   ```


## Running Locally

```bash

npm install

# Copy env.sample to .env and input your keys

npm run start:dev

```

## Pushing your code

1. Commit your changes with a descriptive commit message, run:
   ```bash
   git commit -m "your commit message"
   ```
2. To make sure there are no conflicts, run:
   ```bash
   git pull origin dev
   ```
3. Push changes to your new branch, e.g `git push origin <your_branch_name>
` run

   ```bash
   git push -u origin ZP-B01/Feat/swagger docs
   ```

4. Create a pull request to the `dev` branch and not `main`.

## Folder Structure

```
team-artemis-portfolio-api/
│
├── src/
│   ├── controllers/
│   │   ├── greeting.controller.ts
│   │   └── ...
│   │
│   ├── database/
│   │   ├── greeting.model.ts
│   │   └── ...
│   │
│   ├── interfaces/
│   │   ├── greeting.route.ts
│   │   └── ...
│   │
│   ├── middlewares/
│   │   ├── index.ts
│   │   └── ...
│   │
│   ├── routes/
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
│   ├── swagger.ts
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
