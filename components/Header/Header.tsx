export default function Header (){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const dayIndex = today.getDay();
    const dayName = days[dayIndex];
    console.log('today is' + today.getDay());
    return (
        <header>
        <h1>Welcome to My Website</h1>
        <p>Today is {dayName}</p>
        </header>
    );
}