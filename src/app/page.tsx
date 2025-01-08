'use client';
import { useEffect, useState } from "react";
export default function Home() {
const[moviesa,setMovies]=useState<movies[]>([])
  async function getMovies(){
    const res = await fetch("http://localhost:4000/movies");
    const data = await res.json();
    setMovies(data)
    console.log(data)
  };

  useEffect(() => {
    getMovies(); 
  }, [moviesa]);
  type movies={
    id:number,
    name:string
  }
  return (
   <div>{moviesa.map((kanu)=>(
    <div key={kanu.id}>{kanu.name}</div>
   ))}</div>
  );
};  
