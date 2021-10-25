import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';

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

var server = app.listen(8080, () =>  {
  console.log(`API is running on ${server.address().address}:${server.address().port}`)
});