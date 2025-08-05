import Header from "@/components/Header/Header";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
      </main>      
    </div>
  );
}
