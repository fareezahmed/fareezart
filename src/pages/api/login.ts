// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';

const KEY = 'secret';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  if(!req.body) return res.status(400).json({ message: 'No body' })

  const {username, password} = req.body;
  
  res.json({
    token: jwt.sign({
      username,
      login: username === 'admin' && password === 'admin'
    }, KEY)
  })
}
