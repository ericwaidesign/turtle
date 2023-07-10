import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req: Request, res: Response) => {
  res.send(chalk.green('TEST'));
});

app.listen(PORT, () => {
  console.log(chalk.green(`[TURTLE]: Running on ${PORT}`));
});