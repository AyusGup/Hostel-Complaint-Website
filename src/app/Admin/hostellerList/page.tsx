'use client'
import Delete from './clickDelete';
import Navbar from '../Navbar';
import axios from 'axios';
import { useAdmin } from "../../context/adminContext";
import { useEffect, useState } from "react";

export default function Page({ searchParams } : {
   searchParams: {cat:string, dept:string, close: string};
}){
   const [data, setData] = useState([]);
  
   useEffect(()=>{
      async function get(){
         const apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/getUser`,{
            validateStatus: (status) => status>= 200 && status<=500
         });
         setData(apiResponse.data);
      }

      get();
   },[])
   
   return(
      <>
        <div className="overflow-x-auto hidden md:block">
            <Navbar cat={searchParams.cat} dept={searchParams.dept} close={searchParams.close} />
            <table className="table table-xl">
               <thead>
                  <tr className="text-lg" >
                        <th>S.No</th>
                        <th>Image</th>
                        <th>Name</th> 
                        <th>Tower</th> 
                        <th>Hostel Room No</th> 
                        <th>Contact</th> 
                        <th>Email</th> 
                        <th></th>
                  </tr>
               </thead> 
               <tbody>
                  {data.length && data.map((res:{_id:string; username: string; email: string; tower:string; hostel_room_no:string; descritpion: string; contact: number; userImage: string},idx:number)=>(
                     <tr key={idx} >
                     <th>{idx+1}</th> 
                     <td><img className="w-10 h-10 rounded-lg border border-gray-300" src={res.userImage? res.userImage: "/avatar.png"} alt="User" /></td>
                     <td>{res.username}</td> 
                     <td>{res.tower}</td> 
                     <td>{res.hostel_room_no}</td>
                     <td>{res.contact}</td> 
                     <td>{res.email}</td>
                     <td><Delete data={res._id}/></td>
                     </tr>
                  ))}
               </tbody> 
            </table>
         </div>
         <div className="block md:hidden">
         <Navbar cat={searchParams.cat} dept={searchParams.dept} close={searchParams.close} />
         <h1 className='w-full text-center font-bold mt-5'>LIST OF HOSTELLERS</h1>
         {data.length && data.map((res: {_id: string; username: string;email: string;tower: string;hostel_room_no: string;descritpion: string;contact: number;userImage: string;}, idx: number) => (
            <div className="card w-90% m-5 bg-base-100 shadow-xl" key={idx}>
               <div className="card-body">
               <div className="flex-col flex-wrap">
                  <div className="flex flex-wrap">
                     <div className="mr-0"><img className="w-20 h-20 rounded-xl border border-gray-300" src={res.userImage? res.userImage: "/avatar.png"} alt="User" /></div>
                  </div>
                  <div className="flex flex-wrap">
                     <div className="mr-1 font-bold">Name:</div>
                     <div className="mr-10">{res.username}</div>
                  </div>
                  <div className="flex flex-wrap">
                     <div className="mr-1 font-bold">Tower:</div>
                     <div className="mr-0">{res.tower}</div>
                  </div>
                  <div className="flex flex-wrap">
                     <div className="mr-1 font-bold">Hostel Room No:</div>
                     <div className="mr-0">{res.hostel_room_no}</div>
                  </div>
                  <div className="flex flex-wrap">
                     <div className="mr-1 font-bold">Contact:</div>
                     <div className="mr-0">{res.contact}</div>
                  </div>
                  <div className="flex flex-wrap">
                     <div className="mr-1 font-bold">Email:</div>
                     <div className="mr-0">{res.email}</div>
                  </div>
                  <Delete data={res._id}/>
               </div>
               </div>
            </div>
         ))}
         </div>
      </>
   );
}
