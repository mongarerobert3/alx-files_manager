import express from 'express';
import { env } from 'process';

// Path: server.js

const mainRoute = require('./routes/index');

const app = express();
const port = env.PORT || 5000;
app.use(express.json());
app.use(mainRoute);
app.listen(port, '127.0.0.1');

export default app;
