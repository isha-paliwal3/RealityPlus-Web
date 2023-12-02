import { serialize } from 'cookie';

export async function POST(req: Request) {
    const serializedToken = serialize('token', '', {
        httpOnly: true,
        maxAge: -1, // Expire the cookie
        path: '/',
    });

    const headers = {
        'Content-Type': 'application/json',
        'Set-Cookie': serializedToken,
    };

    return new Response(JSON.stringify({ message: 'Logged out' }), {
        status: 200,
        headers: headers,
    });
}
