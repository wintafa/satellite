import styles from "./styles.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>САТЕЛЛИТ</h1>
        <p className={styles.subtitle}>
          ФУТБОЛЬНАЯ КОМАНДА <br /> ИЗ ГОРОДА ОРЕХОВО-ЗУЕВО
        </p>
        <button className={styles.heroBtn}> 
          Поддержать команду
        </button>
      </div>
    </section>
  );
}
