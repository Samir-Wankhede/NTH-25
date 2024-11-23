"use client"
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AllUsers = () => {
  const [data, setData] = useState([]);
  const [searchBox, setSearchBox] = useState('');

  useEffect(()=>{
    async function getData() {
      // Fetch data from your API here.
      try{
        const response = await fetch('/api/user/getall',{
          method: "GET",
        });
        const resp = await response.json();
        setData(resp.data)
      }
      catch(err){
        console.log(err);
      }
      return null;
    }

    getData();
  
  },[])
  
  return (
    <div className="flex flex-col justify-start items-center pt-20 w-screen">
      <div className='flex flex-wrap w-screen justify-center gap-4'>
      <Input
        type=""
        placeholder="Search Username"
        value={searchBox}
        onChange={(e) => setSearchBox(e.target.value)}
        className="w-[80%] lg:w-[30%]"
      />
      <form className="flex w-full max-w-sm items-center space-x-2">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Delete Selected users</SelectItem>
            <SelectItem value="dark">Convert all to CSV</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" className="">Go</Button>
      </form>
      </div>
      <Table className="w-screen m-4">
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead><Checkbox className="mr-2"/> Select </TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Hidden on Leaderboard</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.filter((user)=>{
            return user.username.toLowerCase().includes(searchBox.toLowerCase())
          }).map((user) => (
            <TableRow key={user.id}>
              <TableCell><Checkbox/></TableCell>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.curr_level}</TableCell>
              <TableCell>{true}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {/* <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow> */}
        </TableFooter>
      </Table>
    </div>
  )
}

export default AllUsers
