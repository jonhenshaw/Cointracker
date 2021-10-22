const express = require('express');
const cors = require('cors')
const app = express();

const bcrypt = require('bcrypt')

app.use(express.json())

app.use(cors());

app.use('/login', (req: any, res: any) => {
  bcrypt.hash(req.body.password, 10, (err: Error, hash: string) => {
    console.log(hash)
  })
  res.send({token: 'test123'});
});

app.listen(8080, () => console.log('API is running on http://192.168.0.139:8080/login'));