import express from 'express';
import logger from 'morgan';

const app = express();

/* eslint no-undef:0 */
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));

// setup routes here

app.all('*', (request, response) => response.send({
  message: 'Welcome to the API!!!!',
}));

/* eslint no-console:0 */
app.listen(port, () => console.log(`Server is live on port ${port}`));
