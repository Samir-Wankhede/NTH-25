"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const AddQuestionPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    hint: "",
    paid_hint: "",
    close_answers: "",
    tooltip: "",
    level: "",
    hint_cost: "",
    answer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const questionData = { ...formData, close_answers: formData.close_answers.split(","), hint: formData.hint.split(","), paid_hint: formData.paid_hint.split(",")};
      console.log(questionData);
      const response = await fetch('/api/questions',{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(questionData),
      })
      if(!response.ok){
        const data = await response.json();
        if(response.status===400){
            alert(data.error);
        }
        throw new Error(data.error);
      }
      alert("Question added successfully!");
      router.push('/dashboard/questions');
    } catch (error) {
      console.log("error during adding question: ",error);
    }
  };

  return (
    <div className="container px-4 mx-auto py-20 md:max-w-[40vw]">
      <h1 className="text-2xl font-bold mb-6">Add Question</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input name="name" id="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="img1">Image 1 URL</Label>
            <Input name="img1" id="img1" placeholder="Image 1 URL" value={formData.img1} onChange={handleChange} required />
            {formData.img1 && <a target="_blank" href={formData.img1}>View</a>}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="img2">Image 2 URL</Label>
            <Input name="img2" id="img2" placeholder="Image 2 URL" value={formData.img2} onChange={handleChange} />
            {formData.img2 && <a target="_blank" href={formData.img2}>View</a>}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="img3">Image 3 URL</Label>
            <Input name="img3" id="img3" placeholder="Image 3 URL" value={formData.img3} onChange={handleChange} />
            {formData.img3 && <a target="_blank" href={formData.img3}>View</a>}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="img4">Image 4 URL</Label>
            <Input name="img4" id="img4" placeholder="Image 4 URL" value={formData.img4} onChange={handleChange} />
            {formData.img4 && <a target="_blank" href={formData.img4}>View</a>}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="hint">Hint</Label>
            <Textarea name="hint" id="hint" placeholder="Hint (comma-separated)" value={formData.hint} onChange={handleChange} required />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="paid_hint">Paid Hint</Label>
            <Textarea name="paid_hint" id="paid_hint" placeholder="Paid Hint (comma-separated)" value={formData.paid_hint} onChange={handleChange} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="close_answers">Close Answers</Label>
            <Textarea name="close_answers" id="close_answers" placeholder="Close Answers (comma-separated)" value={formData.close_answers} onChange={handleChange} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="tooltip">Tooltip</Label>
            <Input name="tooltip" id="tooltip" placeholder="Tooltip" value={formData.tooltip} onChange={handleChange} required />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="level">Level</Label>
            <Input name="level" id="level" placeholder="Level" value={formData.level} onChange={handleChange} required />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="hint_cost">Hint Cost</Label>
            <Input name="hint_cost" id="hint_cost" placeholder="Hint Cost" value={formData.hint_cost} onChange={handleChange} required />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="answer">Answer</Label>
            <Input name="answer" id="answer" placeholder="Answer" value={formData.answer} onChange={handleChange} required />
          </div>
          <Button type="submit">Add Question</Button>
        </form>
    </div>
  );
};

export default AddQuestionPage;
