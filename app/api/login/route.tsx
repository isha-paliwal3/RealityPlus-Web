import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
    await dbConnect();

    const { email, password } = await req.json();

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Compare submitted password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '12h' });

        const cookieOptions = {
            // httpOnly: true,
            // secure: process.env.NODE_ENV !== 'development',
            maxAge: 12 * 60 * 60, // 12 hours
            // sameSite: 'strict' as 'strict',
            path: '/',
        };

        const serializedToken = serialize('token', token, cookieOptions);

        const headers = {
            'Content-Type': 'application/json',
            'Set-Cookie': serializedToken,
        };

        return new Response(JSON.stringify({ success: true, user }), {
            status: 200,
            headers: headers,
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
