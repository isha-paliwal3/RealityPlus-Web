import dbConnect from '../../lib/mongodb';

import User from '../../models/User';


export async function POST(req: Request) {
  await dbConnect();

  const { user, name, specialSkills, backStory, assistant_id } = await req.json();

  const userData = await User.findById(user);
  if (!userData) {
    return new Response('User not found', { status: 404 });
  }

  userData.assistants.push({ name, specialSkills, backStory, assistant_id });

  await userData.save();

  return new Response(JSON.stringify(userData), {
    headers: { 'Content-Type': 'application/json' },
  });
}