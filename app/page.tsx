import { getOrderedDays } from "@/lib/getOrderedDays";
import styles from "./page.module.css";

export default function Home() {
  const days = getOrderedDays();
  console.log(days);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {days.map((day, index) => (
            <div key={index} className="day">
                {day.dayString}
            </div>
        ))}
      </main>      
    </div>
  );
}
