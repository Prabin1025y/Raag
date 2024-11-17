import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '../ui/dialog'
import { KeyRound } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const ChangePassword = () => {
    return (
        <Dialog>
            <DialogTrigger><div className="flex justify-start bg-transparent  shadow-none cursor-pointer hover:bg-[#5e3385] transition duration-200 px-4 py-2 rounded-md items-center gap-1"><KeyRound size={20} />Change Password</div></DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#160b1f] text-white">
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className=" items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Current Password
                        </Label>
                        <Input name="password" type='password' className="col-span-3" />
                    </div>
                    <div className=" items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Previous Password
                        </Label>
                        <Input id="username" type='password' className="col-span-3" />
                    </div>
                    <div className=" items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Confirm Password
                        </Label>
                        <Input id="username" type='password' className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className='bg-[#3e2057] hover:bg-[#5a2f7e] transition duration-200'>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default ChangePassword