"use client";

import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";

export default function NewTask(): ReactElement {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/task", {
      next: { revalidate: 10 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    const data = await res.json();
    router.push("/");
  };
  
  return (
    <div className="flex items-center justify-center  min-h-screen w-full bg-slate-950">
      <form
        onSubmit={onSubmit}
        className="flex flex-col h-screen md:h-auto justify-center shadow-xl   w-full md:w-auto  gap-1 bg-slate-700 p-10 "
        method="post"
        action=""
      >
        <h1 className="text-3xl  font-black uppercase text-blue-100 mb-5">
          New Task
        </h1>
        <label htmlFor="title">Title</label>
        <input
          placeholder="Add the title Task"
          id="title"
          className="p-2 border-gray-400 text-black mb-4 w-full"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <textarea
          placeholder="Add the description Task"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border-gray-400 text-black mb-4 w-full"
          rows={3}
        ></textarea>
        <button className="bg-blue-600 rounded-md p-3 hover:opacity-75 transition text-white">
          Crear
        </button>
      </form>
    </div>
  );
}
