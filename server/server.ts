const express =require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

import { Request, Response } from 'express'

const app = express();

// hide X-Powered-By header
app.disable('x-powered-by');

app.use(express.json());
app.use(cors());

app.use('/login', (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    console.log('hash:', hash);
    res.status(200).json({ token: 'test123' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

var server = app.listen(8080, "192.168.0.3", () =>  {
  console.log(`API is running on ${server.address().address}:${server.address().port}`)
});