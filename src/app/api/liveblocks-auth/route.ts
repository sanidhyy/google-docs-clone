import { auth, currentUser } from '@clerk/nextjs/server';
import { Liveblocks } from '@liveblocks/node';
import { ConvexHttpClient } from 'convex/browser';
import { NextRequest, NextResponse } from 'next/server';

import { api } from '@/../convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY,
});

export async function POST(req: NextRequest) {
  const { sessionClaims } = await auth();
  const user = await currentUser();

  if (!sessionClaims || !user) return new NextResponse('Unauthorized!', { status: 401 });

  const { room } = await req.json();
  const document = await convex.query(api.documents.getById, { id: room });

  if (!document) return new NextResponse('Unauthorized!', { status: 401 });

  const isOwner = document.ownerId === user.id;
  const isOrganizationMember = !!(document.organizationId && document.organizationId === sessionClaims.org_id);

  if (!isOwner && !isOrganizationMember) return new NextResponse('Unauthorized!', { status: 401 });

  const name = user.fullName ?? user.primaryEmailAddress?.emailAddress ?? 'Anonymous';
  const nameToNumber = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = Math.abs(nameToNumber) % 360;
  const color = `hsl(${hue}, 80%, 60%)`;

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name,
      avatar: user.imageUrl,
      color,
    },
  });

  session.allow(room, session.FULL_ACCESS);

  const { body, status } = await session.authorize();

  return new NextResponse(body, { status });
}
