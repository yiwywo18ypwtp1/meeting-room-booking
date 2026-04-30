import { CalendarCheck } from "lucide-react";
import UserBar from "./UserBar";

const Header = () => {
    return <header className="h-16 border-b border-zinc-200 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
            <CalendarCheck className="text-blue-500" size={32} />

            <h1 className="text-zinc-900 text-2xl">Meeting Rooms</h1>
        </div>

        <UserBar />
    </header>
}

export default Header;