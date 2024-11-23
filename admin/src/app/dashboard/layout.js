"use client"
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { BookOpenText, CircleX, Menu, Package2, PlusCircle, NotebookPen, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function DashboardLayout({
    children, // will be a page or nested layout
  }) {
    const router = useRouter();
    const endpoint = usePathname();

  const handleLogout = async () => {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
    });
  
    if (response.ok) {
      alert('Logged out successfully');
      router.push('/'); // Redirect to login page
    } else {
      alert('Logout failed');
    }
  };
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 z-10 px-4 lg:h-[60px] lg:px-6 fixed w-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <SheetClose>
                <SheetTitle></SheetTitle>
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    {/* <Package2 className="h-6 w-6" /> */}
                    <img src='/nth-logo.png' alt='icon' className="h-6 w-6" /> 
                    <span className="">NTH</span>
                  </Link>
                </SheetClose>
                <SheetClose>
                  <Link
                    href={'/dashboard/users'}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl ${
                      endpoint === "/dashboard/users"
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    }px-3 p-2 hover:text-foreground`}
                  >
                    <User className="h-5 w-5" />
                    Users
                  </Link>
                </SheetClose>
                <SheetClose>
                <Link
                    href={'/dashboard/create'}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl ${
                      endpoint === "/dashboard/create"
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    }px-3 p-2 hover:text-foreground`}
                  >
                    <PlusCircle className="h-5 w-5" />
                    Create
                  </Link>
                </SheetClose>
                <SheetClose>
                <Link
                    href={'/dashboard/update'}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl ${
                      endpoint === "/dashboard/update"
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    }px-3 p-2 hover:text-foreground`}
                  >
                    <NotebookPen className="h-5 w-5" />
                    Update
                  </Link>
                </SheetClose>
                <SheetClose>
                <Link
                    href={'/dashboard/delete'}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl ${
                      endpoint === "/dashboard/delete"
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    }px-3 p-2 hover:text-foreground`}
                  >
                    <CircleX className="h-5 w-5" />
                    Delete
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <Button onClick={handleLogout}>Logout</Button>
        </header> 
        {children}
      </section>
    )
  }