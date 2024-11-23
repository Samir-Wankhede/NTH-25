"use client";
import React, { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const AllUsers = () => {
  const [data, setData] = useState([]);
  const [searchBox, setSearchBox] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [chunkedData, setChunkedData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedAction, setSelectedAction] = useState("");
  const router = useRouter();
  const endpoint = usePathname();
  const itemsPerPage = 20;

  useEffect(() => {
    async function getData() {
      // Fetch data from your API here.
      try {
        const response = await fetch("/api/user/getall", {
          method: "GET",
        });
        const resp = await response.json();
        const userData = resp.data;
        setData(userData.reduce((acc, user) => {
          const localTime = new Date(user.created_at + 'Z').toLocaleString();
          acc.push({ ...user, created_at: localTime });
          return acc;
        }, []));
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    // Chunk data into pages of `itemsPerPage`
    const chunks = [];
    const filteredData = data.filter((user) =>
      user.username.toLowerCase().includes(searchBox.toLowerCase())
    );
    for (let i = 0; i < filteredData.length; i += itemsPerPage) {
      chunks.push(filteredData.slice(i, i + itemsPerPage));
    }
    setChunkedData(chunks);
    setCurrentPage(0); // Reset to first page on search
  }, [data, searchBox]);

  const toggleAll = (isChecked) => {
    if (isChecked && chunkedData.length>0) {
      const currentPageUsers = chunkedData[currentPage].map((user) => user.id);
      setSelectedUsers((prev) => Array.from(new Set([...prev, ...currentPageUsers])));
    } else if (chunkedData.length>0) {
      const currentPageUsers = chunkedData[currentPage].map((user) => user.id);
      setSelectedUsers((prev) => prev.filter((id) => !currentPageUsers.includes(id)));
    }
  };

  const toggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleActionChange = (value) => {
    setSelectedAction(value); // Update state with selected option
    // console.log("Selected action:", value); // For debugging
  };

  const handleConvertToCsv = async () => {
    try {
      const response = await fetch("/api/user/getall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const blob = await response.blob(); 
      const url = window.URL.createObjectURL(blob); 
      const a = document.createElement("a");
      a.href = url;
      a.download = "users.csv"; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error converting to CSV:", error);
      alert("Failed to download CSV");
    }
  };
  

  const handleAction = async(e) => {
    e.preventDefault();
    // console.log(selectedUsers);
    if(selectedAction==="delete"){
      try{
        const response = await fetch("/api/user/getall", {
          method: "DELETE",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify(selectedUsers),
        });
        if(!response.ok){
          throw new Error(response);
        }
        router.refresh();
        alert("Selected user have been permanently deleted.");
      }catch(err){
        console.log("error in delete: ",err);
        alert(err.message);
  
      }
    }else if(selectedAction==="csv"){
      handleConvertToCsv();
    }else{
      alert("select an action");
    }
  }

  return (
    <div className="flex flex-col justify-start items-center pt-20 w-screen pb-20">
      <div className="flex flex-wrap w-screen justify-center gap-4">
        <Input
          type="text"
          placeholder="Search Username"
          value={searchBox}
          onChange={(e) => {
            setSearchBox(e.target.value)
            setSelectedUsers([]);
          }}
          className="w-[80%] lg:w-[30%]"
        />
        <form className="flex w-full max-w-sm items-center space-x-2" onSubmit={handleAction}>
          <Select onValueChange={handleActionChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delete">Delete Selected Users</SelectItem>
              <SelectItem value="csv">Convert All to CSV</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="">
            Go
          </Button>
        </form>
      </div>
      <Table className="w-screen m-4">
        <TableCaption>Total users: {data.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                className="mr-2"
                onCheckedChange={toggleAll}
                checked={
                  chunkedData[currentPage]?.every((user) =>
                    selectedUsers.includes(user.id)
                  )
                }
              />
              Select
            </TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Hidden on Leaderboard</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chunkedData[currentPage]?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={() => toggleUser(user.id)}
                />
              </TableCell>
              <TableCell className="font-medium cursor-pointer text-blue-300" onClick={()=>{
                router.push(`${endpoint}/${user.id}`);
              }}>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.curr_level}</TableCell>
              <TableCell>
                {user.hidden === 0 ? <X color="#880808" /> : <Check color="#AFE1AF" />}
              </TableCell>
              <TableCell>{user.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button
          onClick={() => {
            setCurrentPage((prev) => Math.max(prev - 1, 0));
            setSelectedUsers([]);
          }}
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <span>
          Page {currentPage + 1} of {chunkedData.length}
        </span>
        <Button
          onClick={() =>{
            setCurrentPage((prev) => Math.min(prev + 1, chunkedData.length - 1));
            setSelectedUsers([]);
          }}
          disabled={currentPage === chunkedData.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AllUsers;
