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
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [questions,setQuestions] = useState([]);
  const router = useRouter();
  const endpoint = usePathname();

  useEffect(()=>{
    async function getData() {
      // Fetch data from your API here.
      try {
        const response = await fetch("/api/questions?id=all", {
          method: "GET",
        });
        const resp = await response.json();
        const questionData = resp.data;
        setQuestions(questionData);
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  },[])

  const handleDelete = async(level) => {
    try{
      const response = await fetch(`/api/questions?level=${level}`,{
        method:"DELETE",
      });
      if(!response.ok){
        const data = response.json();
        throw new Error(data.error);
      }
      alert("Question deleted!");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col justify-start items-center pt-20 w-screen pb-20">
      <div className="flex flex-wrap w-screen justify-center gap-4">
        <Button onClick={()=>{
          router.push(`${endpoint}/add-question`);
        }}>
          Add Question
        </Button>
      </div>
      <Table className="w-screen m-4">
        <TableCaption>Total questions: {questions.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions?.map((question) => (
            <TableRow key={question.id}>
              <TableCell className="font-medium cursor-pointer text-blue-300" onClick={()=>{
                router.push(`${endpoint}/${question.id}`);
              }}>{question.name}</TableCell>
              <TableCell>{question.level}</TableCell>
              <TableCell>
              <Button onClick={()=>handleDelete(question.level)}>
                Delete
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Page
