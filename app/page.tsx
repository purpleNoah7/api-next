"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

export default function Home(): ReactElement {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/task");
        const data = await res.json();

        setTasks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []); // Empty dependency array to ensure useEffect runs only once on component mount

  return (
    <main className=" min-h-screen flex-col items-center justify-between p-24 w-full">
      <div className="bg-slate-700   p-5 rounded-md w-full flex items center justify-between font-black text-3xl">
        <h1 className="w-full flex items-center justify-center">Tareas</h1>
        <Link
          className=" bg-sky-600 p-3 hover:bg-sky-700 transition text-xl rounded-md"
          href={"/new"}
        >
          Agregar
        </Link>
      </div>

      <div className="grid grid-cols-1 md:flex p-3 flex-col gap-2 w-full">
        {tasks.map((task: any) => (
          <div
            key={task.id}
            className="bg-slate-700 hover:bg-slate-500 cursor-pointer flex md:grid grid-cols-3 flex-wrap gap-4 items-center justify-between p-5 rounded-md w-full"
            onClick={() => router.push(`/task/edit/${task.id}`)}
          >
            <div>
              <h2>Title:</h2>
              <h1 className="">{task.title}</h1>
            </div>
            <div>
              <h2>Description:</h2>
              <p>{task.description}</p>
            </div>
            <div>
              <h2>Created:</h2>
              <span>{task.createdAd}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
