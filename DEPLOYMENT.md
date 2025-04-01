# Deployment

## Prerequisites
- [Docker](https://docs.docker.com/install/)
- [Turso](https://turso.tech/)
- [FlyCTL](https://fly.io/docs/flyctl/installing/)
- [Fly.io account](https://fly.io/docs/flyctl/auth/)

## Deploying
1. Clone the repository
2. `cd` into the repository
3. Configure a Turso database [here](https://turso.tech/)
4. Add the Turso URL to `/server/server.js`
5. Execute `database.sql` in your Turso database
6. Generate a Turso database token and set is as a secret environment variable called `DB_TOKEN`
7. Run `flyctl deploy`
8. Run `flyctl apps open` to open the app in your browser

NOTE: Vercel CI did not work, so we resulted to using Fly.io manual deployment.

## Updating
1. Make changes to the code
2. Run `flyctl deploy`
3. Run `flyctl apps open` to open the app in your browser

Deployment: https://bimk.fly.dev
