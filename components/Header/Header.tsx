import { getOrderedDays } from "@/lib/getOrderedDays";

export default function Header (){
    const days = getOrderedDays();
    console.log("Ordered days:", days);
    return (
        <header>
        <h1>Welcome to My Website</h1>
        {days.map((day, index) => (
            <div key={index} className="day">
                {day}
            </div>
        ))}
        </header>
    );
}