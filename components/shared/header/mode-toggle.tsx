'use client'
import {useTheme} from "next-themes";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoonIcon, SunIcon, SunMoon} from "lucide-react";

const ModeToggle = () => {
    const {theme, setTheme} = useTheme();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='focus-visible:ring-0 focus-visible:ring-offset-0'>
                    {theme==='system'?(
                        <SunMoon/>
                    ):theme==='dark'?(
                        <MoonIcon />
                    ):(
                        <SunIcon/>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuCheckboxItem checked={theme==='system'} onClick={()=>setTheme('system')}>
                    System
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator/>
                <DropdownMenuCheckboxItem checked={theme==='dark'} onClick={()=>setTheme('system')}>
                    Dark
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={theme==='dark'} onClick={()=>setTheme('light')}>
                    Light
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default ModeToggle
