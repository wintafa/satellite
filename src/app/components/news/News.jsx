"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules"; // Убрали Navigation
import Image from "next/image";
import Link from "next/link";

// Импорт стилей Swiper
import "swiper/css";
import "swiper/css/pagination"; // Убрали navigation.css
import styles from "./News.module.scss";
import newsData from "../../../data/newsData.json";

export default function News() {
  // Берем первые 6 новостей для главной страницы
  const latestNews = newsData.slice(0, 6);

  return (
    <section className={styles.newsSection} id="news">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>НОВОСТИ</h2>
          <Link href="/news" className={styles.allNewsBtn}>
            Все новости →
          </Link>
        </div>

        <Swiper
          modules={[Pagination]} // Убрали Navigation
          spaceBetween={30}
          slidesPerView={1}
          // navigation — убрали
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className={styles.swiperContainer}
        >
          {latestNews.map((item) => (
            <SwiperSlide key={item.id}>
              <article className={styles.newsCard}>
                <Link href={`/news/${item.slug}`} className={styles.cardLink}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.content}>
                    <span className={styles.date}>{item.date}</span>
                    <h3 className={styles.newsTitle}>{item.title}</h3>
                    <p className={styles.description}>{item.description}</p>
                    <span className={styles.moreBtn}>Подробнее →</span>
                  </div>
                </Link>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}