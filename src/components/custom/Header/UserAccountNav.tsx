'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger, } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { signOut } from "next-auth/react"

interface UserData {
  user: {
    user: {
      name: string | undefined;
      email: string;
      image: string | undefined;
    }
    
  };
}


const UserAccountNav = ({ user }: UserData) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='overflow-visible'>
        <Button
          variant='ghost'
          size='sm'
          className='relative'>
          My account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='bg-white w-60'
        align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            <p className='font-medium text-sm text-black'>
              {user.user.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href='/dashboard/products'>Admin Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => signOut()}
          className='cursor-pointer'>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav