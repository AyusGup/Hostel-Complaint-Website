'use client'
import Header from "../../Header/page";
import Link from "next/link";
import Navbar from "../Navbar";
import { useAdmin } from "../../context/adminContext";
import { useEffect, useState } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { cat: string; dept: string; close: string };
}) {
  const [data, setData] = useState([]);
  const [report, setReport] = useAdmin() as any[];

  useEffect(()=>{
    let repo = []; 
    if(report.length){
      repo = report.filter((val:any)=> (val.status === "Closed"));
    }
    
    setData(repo);
  },[report])

  return (
    <>
      <div className="overflow-x-auto hidden md:block">
        <Navbar
          cat={searchParams.cat}
          dept={searchParams.dept}
          close={searchParams.close}
        />
        <table className="table table-xl">
          <Header />
          <tbody>
            {data.length>0 ? (data.map(
              (
                res: any,
                idx: number
              ) => {
                const [date, time] = new Date(res.createdAt)
                  .toISOString()
                  .split("T")
                  .map((value, index) =>
                    index === 0 ? value : value.split(".")[0]
                  );
                return (
                  <tr key={idx}>
                    <th>{idx + 1}</th>
                    <td>{date}</td>
                    <td>{time}</td>
                    <td>{res.sender?.tower || ""}</td>
                    <td>{res.sender?.hostel_room_no || ""}</td>
                    <td>{res.department}</td>
                    <td>{res.problem}</td>
                  <td>Closed</td>
                  <td>
                  <Link
                    href={{
                      pathname: "/Admin/complaint",
                      query: {
                        close: searchParams.close,
                        _id: res._id,
                      },
                    }}
                  >
                    <button className="px-4 py-2 bg-green-600 text-white text-lg rounded-md">
                      see
                    </button>
                  </Link>
                  </td>
                </tr>
                );
              }
            )) : <tr></tr>}
          </tbody>
        </table>
      </div>
      <div className="block md:hidden">
        <Navbar
          cat={searchParams.cat}
          dept={searchParams.dept}
          close={searchParams.close}
        />
        <h1 className="w-full text-center font-bold mt-5">LIST OF REPORTS</h1>
        {data.length>0 ? (data.map(
          (
            res: any,
            idx: number
          ) => {
            const [date, time] = new Date(res.createdAt)
              .toISOString()
              .split("T")
              .map((value, index) =>
                index === 0 ? value : value.split(".")[0]
              );
            return (
            <div className="card w-90% m-5 bg-base-100 shadow-xl" key={idx}>
              <div className="card-body">
                <div className="flex flex-wrap">
                  <div className="flex flex-wrap">
                    <div className="mr-1 font-bold">Date:</div>
                    <div className="mr-10">{date}</div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="mr-1 font-bold">Time:</div>
                    <div className="mr-0">{time}</div>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="mr-1 font-bold">Tower:</div>
                  <div className="mr-0">{res.sender?.tower || ""}</div>
                </div>
                <div className="flex flex-wrap">
                  <div className="mr-1 font-bold">Hostel Room No:</div>
                  <div className="mr-0">{res.sender?.hostel_room_no || ""}</div>
                </div>
                <div className="flex flex-wrap">
                  <div className="mr-1 font-bold">Department:</div>
                  <div className="mr-0">{res.department}</div>
                </div>
                <div className="flex flex-wrap">
                  <div className="mr-1 font-bold">Title:</div>
                  <div className="mr-0">{res.title}</div>
                </div>
                <div className="flex flex-wrap">
                  <div className="mr-1 font-bold">Status:</div>
                  <div className="mr-0">Closed</div>
                </div>
                <div className="w-full flex justify-end">
                <Link
                  href={{
                    pathname: "/Admin/complaint",
                    query: {
                      close: searchParams.close,
                      _id: res._id,
                    },
                  }}
                >
                  <button className="px-4 py-2 bg-green-600 text-white text-lg rounded-md">
                    see
                  </button>
                </Link>
                </div>
              </div>
            </div>
          );
        }
      )) : <></>}
      </div>
    </>
  );
}
