// src/app/api/users/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// 查询全部用户 GET /api/users
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// 创建用户 POST /api/users
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password } = body;
  const user = await prisma.user.create({
    data: { name, email, password }
  });
  return NextResponse.json(user);
}
