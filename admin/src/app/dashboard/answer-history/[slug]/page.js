"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.slug;
  const [log, setLog] = useState({
    id: "",
    username: "",
    level: "",
    answers: "",
    timestamp: "",
  });

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`/superusers-admin/api/answer-history?id=${id}`, {
          method: "GET",
        });
        const resp = await response.json();
        if (!response.ok) {
          if (response.status === 404) {
            router.push(`/dashboard/answer-history`);
            return;
          }
          throw new Error(resp.error);
        }
        setLog(resp.data[0]);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    getData();
  }, [id, router]);

  return (
    <div className="container px-4 mx-auto py-20 md:max-w-[40vw]">
      <h1 className="text-2xl font-bold mb-6">Answer History Details</h1>
      { log &&
        <form className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="id">ID</Label>
          <Input
            id="id"
            value={log.id}
            disabled={true}
            className="cursor-not-allowed"
            placeholder="ID"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={log.username}
            disabled={true}
            className="cursor-not-allowed"
            placeholder="Username"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="level">Level</Label>
          <Input
            id="level"
            value={log.level}
            disabled={true}
            className="cursor-not-allowed"
            placeholder="Level"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="answers">Answers</Label>
          <Textarea
            id="answers"
            value={log.answers.split('|').map((answer) => answer.trim()).join('\n\n')}
            disabled={true}
            className="cursor-not-allowed min-h-72"
            placeholder="Answers"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="timestamp">Timestamp</Label>
          <Input
            id="timestamp"
            value={new Date(log.timestamp).toLocaleString()}
            disabled={true}
            className="cursor-not-allowed"
            placeholder="Timestamp"
          />
        </div>
        <Button type="button" onClick={() => router.back()}>
          Back
        </Button>
      </form>
      }
    </div>
  );
};

export default Page;
