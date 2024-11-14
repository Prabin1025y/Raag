import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'

export const LoginPrompt = () => {
    return (
        <div className='absolute top-0 left-0 h-screen w-screen bg-black/80 flex justify-center items-center'>
            <div className='relative w-[400px] bg-[#160b1f] h-fit border rounded-2xl p-6 flex flex-col gap-4'>
                <X className='absolute top-6 right-6 cursor-pointer ' />
                <h2 className='text-3xl font-medium font-[Roboto]'>Create an account</h2>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input type="text" id="fullName" name='email' placeholder="Full Name" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name='email' placeholder="Email" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" name='password' placeholder="Password" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input type="password" id="confirmPassword" name='confirmPassword' placeholder="Confirm Password" />
                </div>
                <div className="items-top flex space-x-2">
                    <Checkbox className='border-white' id="terms1" />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Accept terms and conditions
                        </label>
                        <p className="text-sm text-muted-foreground">
                            You agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
                <Button className='bg-violet-700 hover:bg-violet-800 transition duration-200'>Create Account</Button>
            </div>
        </div>
    )
}
