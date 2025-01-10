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
  async function deleteMovie(id:number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL}/delete/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    });
    const data = await res.json();
    setMovie(data);
  };

  useEffect(() => {
    getMovies();
  
  }, []);

  return (
   <div>
    <div className="m-10 w-[300px] bg-gray-100 text-gray-900 rounded border border-purple-200 ">

      <div className="flex gap-1 justify-center">
        <input 
          className="border border-purple-200 rounded pl-1  text-gray-900  mt-3"
          onChange={(e)=>{
            setName(e.target.value);
            console.log(name); 
          }} 
        />
        <button onClick={()=>{
          addMovie();
        }} className="border rounded w-[90px] bg-purple-100 border-purple-200  text-gray-900  mt-3">Movie Add</button>
      </div>

      <div className="px-4 flex flex-col justify-center mt-3">
        {movies.map((movie)=>(
        <div key={movie.id} className="flex justify-between mt-2">
          <div>{movie.name}</div>

          <div className="flex gap-2">
            <button className="border rounded  bg-purple-100 border-purple-200  text-gray-900 ">Edit</button>
            <button onClick={()=>{
              deleteMovie(movie.id);
            }} className=" border rounded  bg-purple-100 border-purple-200  text-gray-900 ">Delete</button>
          </div>
        </div>
        ))}
      </div>
    </div>

   </div>
  );
};

