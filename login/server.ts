const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

app.use('/login', (req: any, res: any) => {
  res.send('test123');
});

app.listen(8080, () => console.log('API is running on http://192.168.0.139:8080/login'));