"use client";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeftCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const id = useParams().slug;
  const [userData, setUserData] = useState(null); // State to hold user data
  const [editableData, setEditableData] = useState({
    id: 1,
    curr_level: 1,
    hint_taken: 0,
    curr_keys: 3,
    hidden: 0,
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/get-user?id=${id}`);
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data);
        }
        const temp = await response.json();
        const data = temp.data[0]
        console.log(data);
        setUserData(data);
        setEditableData({
          id: id,
          curr_level: data.curr_level,
          hint_taken: data.hint_taken,
          curr_keys: data.curr_keys,
          hidden: data.hidden,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes for editable fields
  const handleChange = (field, value) => {
    console.log(value);
    setEditableData((prev) => ({ ...prev, [field]: value }));
  };

  // Submit edited data
  const handleSubmit = async () => {
    console.log(editableData);
    try {
      const response = await fetch('/api/user/get-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editableData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data);
      }

      const updatedData = await response.json();
      setUserData(updatedData.data);
      alert('User data updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="relative flex flex-col mx-auto justify-center items-center max-w-xl flex-wrap h-screen gap-5 pt-[9vh] pb-[9vh]">
    <div className='flex w-full mx-auto justify-center gap-4'>
      <Link href={'/dashboard/users'}><ArrowLeftCircleIcon className=' w-10 h-10'/></Link>
      <p className='text-4xl'>Player Data</p>
    </div>
    
      {userData ? (
        <>
          <div className="w-full flex flex-col gap-2 px-4">
            <Label htmlFor="Username" className="">
              Username
            </Label>
            <Input disabled={true} id="Username" value={userData.username} placeholder="Username" />
          </div>
          <div className="w-full flex flex-col gap-2 px-4">
            <Label htmlFor="email" className="">
              Email
            </Label>
            <Input disabled={true} id="email" value={userData.email} placeholder="Email" />
          </div>
          <div className="w-full flex flex-col gap-2 px-4">
            <Label htmlFor="Phone" className="">
            Phone
            </Label>
            <Input disabled={true} id="Phone" value={parseInt(userData.phone_number)} placeholder="Phone" />
          </div>
          {/* Editable fields */}
          <div className="w-full flex flex-col gap-2 px-4">
            <Label htmlFor="curr_level" className="">
              Current Level
            </Label>
            <Input
              id="curr_level"
              type="number"
              value={editableData.curr_level}
              onChange={(e) => handleChange('curr_level', e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-2 px-4">
            <Label htmlFor="curr_keys" className="">
              Current Keys
            </Label>
            <Input
              id="curr_keys"
              type="number"
              value={editableData.curr_keys ?? ''} // Ensure a fallback value
              onChange={(e) => {
                const value = parseInt(e.target.value, 10); // Parse as integer
                handleChange('curr_keys', isNaN(value) ? 0 : value); // Handle NaN gracefully
              }}
            />
          </div>
          <div className="w-full flex flex-col gap-2 px-4">
            <Label htmlFor="hidden" className="">
              Hidden on Leaderboard
            </Label>
            <Checkbox
              id="hidden"
              checked={editableData.hidden === 1} // Compare against a defined value
              onCheckedChange={() => handleChange('hidden', editableData.hidden === 1 ? 0 : 1)}
            />
          </div>
          <div className="w-full flex flex-col gap-2 px-4">
            <Label htmlFor="hint_taken" className="">
              Hint Taken
            </Label>
            <Checkbox
              id="hint_taken"
              checked={editableData.hint_taken === 1} // Compare against a defined value
              onCheckedChange={() => handleChange('hint_taken', editableData.hint_taken === 1 ? 0 : 1)}
            />
          </div>
          <div className="w-full flex flex-col gap-2 px-4">
            <Label htmlFor="createdAt" className="">
              Created At: 
            </Label>
            <Input
              id="createdAt"
              type="text"
              value={new Date(userData.created_at + 'Z').toLocaleString()}
              disabled={true}
            />
          </div>
          <Button
            onClick={handleSubmit}
            className=""
          >
            Save Changes
          </Button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;
