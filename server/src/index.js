import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { getAll, setFlag } from './store.js';
import { requireJWT } from './auth.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 60_000, max: 120 }));

app.get('/flags', (req,res)=> res.json(getAll()));
app.put('/flags/:key', requireJWT, (req,res)=>{
  const out = setFlag(req.params.key, req.body.enabled);
  res.json(out);
});

app.listen(3001, ()=> console.log('flags on http://localhost:3001'));
