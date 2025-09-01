'use client'
import { useRouter, usePathname } from "next/navigation";
export default function Header (){
    const router = useRouter();
    const path = usePathname().split('/').filter(element => element !== '');
    
    return (
        <header>
            <h1>Appointment Planner</h1>
            {path.length > 0 && <button onClick={() => router.back()}>Go Back</button>}       
        </header>
    );
}