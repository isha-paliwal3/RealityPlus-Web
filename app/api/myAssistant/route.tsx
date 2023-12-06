import dbConnect from '../../lib/mongodb';
import User from '../../models/User';

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('user')

  if (!id) {
    return new Response('User parameter is missing', { status: 400 });
  }

  const userData = await User.findById(id);

  if (!userData) {
    return new Response('User not found', { status: 404 });
  }

  return new Response(JSON.stringify({ userData }), { headers: { 'Content-Type': 'application/json' } });
}
