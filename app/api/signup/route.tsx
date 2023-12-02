import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
    await dbConnect();

    const { firstName, lastName, email, password } = await req.json()
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: 'User already exists' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        await user.save();

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '12h' });

        const cookieOptions = {
            // httpOnly: true,
            // secure: process.env.NODE_ENV !== 'development',
            maxAge: 12 * 60 * 60, // 12 hours
            // sameSite: 'strict' as 'strict', // Explicitly setting as 'strict'
            path: '/',
        };
        
        
        const serializedToken = serialize('token', token, cookieOptions);
        
        const headers = {
            'Content-Type': 'application/json',
            'Set-Cookie': serializedToken,
        };
        
        const userResponse = { success: true, user };
        
        return new Response(JSON.stringify(userResponse), {
            status: 201,
            headers: headers,
        });
          } catch (error) {
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
