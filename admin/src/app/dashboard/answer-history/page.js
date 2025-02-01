"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";

const Page = () => {
    const [searchBox, setSearchBox] = useState("");
    const [logs, setLogs] = useState([]);
    const endpoint = usePathname();
    const router = useRouter();

    useEffect(()=>{
      async function getData() {
        // Fetch data from your API here.
        try {
          const response = await fetch("/superusers-admin/api/answer-history?id=all", {
            method: "GET",
          });
          const resp = await response.json();
          setLogs(resp.data);
        } catch (err) {
          console.error(err);
        }
      }
      getData();
    },[])

  return (
    <div className="flex flex-col justify-start items-center pt-20 w-screen pb-20">
      <div className="flex flex-wrap w-screen justify-center gap-4">
        <Input
          type="text"
          placeholder="Search Username"
          value={searchBox}
          onChange={(e) => {
            setSearchBox(e.target.value)
          }}
          className="w-[80%] lg:w-[30%]"
        />
      </div>
      <Table className="w-screen m-4">
        <TableCaption>Total entries: {logs.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length > 0 && logs?.filter((log)=>{
            return log.username.toLowerCase().includes(searchBox.toLowerCase());
          })
          .map((log) => (
            <TableRow key={log.id} onClick={()=>{
                router.push(`${endpoint}/${log.id}`);
              }}>
              <TableCell className="font-medium cursor-pointer text-blue-300">{log.username}</TableCell>
              <TableCell>{log.level}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Page
