import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '../ui/dialog'
import { KeyRound, UserPen } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const ChangeName = () => {
    return (
        <Dialog>
            <DialogTrigger><div className="flex justify-start bg-transparent  shadow-none cursor-pointer hover:bg-[#5e3385] transition duration-200 px-4 py-2 rounded-md items-center gap-1"><UserPen size={20} />Change Name</div></DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#160b1f] text-white">
                <DialogHeader>
                    <DialogTitle>Change Name</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className=" items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            New Name
                        </Label>
                        <Input name="password" type='password' className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className='bg-[#3e2057] hover:bg-[#5a2f7e] transition duration-200'>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default ChangeName