import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';

const KEY = 'secret';
export default function Secret(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { token } = req.body;

    const { login } = jwt.verify(token, KEY) as { [key: string]: boolean };

    if (login) {
        res.json({ secretAdminCode: 12345 });
    } else {
        res.status(401).json({ message: 'Not authorized' });
    }
}