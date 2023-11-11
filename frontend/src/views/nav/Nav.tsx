import { CalendarDays } from "lucide-react"
import { ModeToggle } from '@/components/theme-toggle';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import './Nav.scss';
import { Button } from "@/components/ui/button";

const Nav = () => {
    return (
        <nav className="flex items-center justify-between align-center p-4">
            <div className="flex items-center">
                <h3 className="m-0 pl-2">TRST</h3>
            </div>
            <div className="flex items-center">
                <ModeToggle />
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Avatar className='ml-3 cursor-pointer'>
                            <AvatarImage src="https://github.com/nybbbbe.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/nybbbbe.png" />
                                <AvatarFallback>VC</AvatarFallback>
                            </Avatar>
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold">Nybbbbe</h4>
                                <Button className="w-[100%] mt-5 mb-5">Edit</Button>
                                <Button className="w-[100%] mt-5 mb-5">Sign Out</Button>
                                <div className="flex items-center pt-2">
                                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                                    <span className="text-xs text-muted-foreground">
                                        Joined November 2023
                                    </span>
                                </div>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>

            </div>
        </nav>
    );
};

export default Nav;
