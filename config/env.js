import { config } from 'dotenv';

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});
//explain this
//this is a config function that loads the environment variables from the .env.development.local file
//if the NODE_ENV is not set, it will use the development environment
//if the NODE_ENV is set to production, it will use the .env.production.local file
//if the NODE_ENV is set to test, it will use the .env.test.local file
//if the NODE_ENV is not set, it will use the .env.development file


export const {PORT, NODE_ENV, DB_URI } = process.env;

