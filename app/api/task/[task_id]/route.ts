import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: { task_id: string } }
) {
  const { task_id } = params;
  const task = await prisma.task.findUnique({
    where: {
      id: Number(task_id),
    },
  });
  return NextResponse.json(task);
}

export async function PUT(
  request: Request,
  { params }: { params: { task_id: string } }
) {
  const { task_id } = params;
  const data = await request.json();
  const updateTask = await prisma.task.update({
    where: {
      id: Number(task_id),
    },
    data: data,
  });
  return NextResponse.json(updateTask);
}

export async function DELETE(
  request: Request,
  { params }: { params: { task_id: string } }
) {
  try {
    const taskRemoved = await prisma.task.delete({
      where: {
        id: Number(params.task_id),
      },
    });
    return NextResponse.json(taskRemoved);
  } catch (error) {
    return NextResponse.json(error);
  }
}
