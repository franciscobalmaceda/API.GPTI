import 'dotenv/config';
import express from 'express';
import router from './Router.js';
import cors from 'cors';

const app = express()
const PORT = 3000;
app.use(cors())


app.use(express.json())

app.use('/', router);

app.listen(
    PORT,
    () => console.log(`alive on http://localhost:${PORT}`)
)
