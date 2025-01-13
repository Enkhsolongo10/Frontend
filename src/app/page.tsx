'use client';

import { useEffect, useState } from "react";

type  Movie = {
  id:number,
  name:string
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]); // --> add, create 
  const [movie, setMovie] = useState<Movie[]>([]); // --> find 
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<number>(0);
 
  //READ FETCH DONE 
  async function getMovies() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL}/movies`);
    const data = await res.json();
    setMovies(data);
  };

  //CREATE FETCH DONE
  async function addMovie() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL}/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, 
      }),
    });
    const data = await res.json();
    setMovie(data);
  };

  //DELETE FETCH DONE
  async function deleteMovie() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL}/delete`, {
      method: "DELETE",
      headers: {
        Accept: "appliacation.json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
      }),
    });
    const data = await res.json();
    setMovie(data);
  }

  useEffect(() => {
    getMovies();
    console.log(movies);
  }, []);
 
  return (
   <div>
    <div className="w-[300px]">
      <div className="flex gap-1">
        <input 
          className="border border-blue-400 rounded pl-1"
          onChange={(e)=>{
            setName(e.target.value);
            console.log(name); 
          }} 
        />
        <button onClick={()=>{
          addMovie();
        }} className="border rounded w-[90px] bg-blue-300 border-blue-400">Movie Add</button>
      </div>

      <div className="">
       {movies.map((movie)=>(
         <div key={movie.id} className="flex justify-between">
          <div>{movie.name}</div> 
          <div>
          <button className="border rounded">Edit</button>
          <button onClick={()=>{
            deleteMovie();
          }} className=" border rounded">Delete</button>
          </div>

        </div>
        ) 
       )}
      </div>
    </div>

   </div>
  );
};

