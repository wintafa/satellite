// app/news/page.js
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./newsCard.module.scss";
import newsData from "../../data/newsData.json"
import "../globals.scss";

// Компонент карточки новости
function NewsCard({ title, description, category, date, readTime, imageUrl, slug }) {
  return (
    <Link href={`/news/${slug}`} className={styles.newsCard}>
      <div className={styles.imageWrapper}>
        <img 
          src={imageUrl} 
          alt={title} 
          className={styles.newsImage}
          loading="lazy"
        />
        <div className={styles.categoryBadge}>{category}</div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.date}>📅 {date}</span>
          <span className={styles.readTime}>⏱️ {readTime}</span>
        </div>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{description}</p>

        <div className={styles.footer}>
          <span className={styles.readMore}>Читать далее →</span>
        </div>
      </div>
    </Link>
  );
}

// Компонент пагинации
function Pagination({ currentPage, totalPages, basePath = "/news" }) {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const getPageHref = (page) => {
    if (page === 1) return basePath;
    return `${basePath}?page=${page}`;
  };

  return (
    <div className={styles.pagination}>
      <Link
        href={currentPage > 1 ? getPageHref(currentPage - 1) : "#"}
        className={`${styles.paginationButton} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        aria-label="Предыдущая страница"
      >
        ← Назад
      </Link>

      <div className={styles.pageNumbers}>
        {startPage > 1 && (
          <>
            <Link
              href={getPageHref(1)}
              className={`${styles.pageButton} ${
                currentPage === 1 ? styles.active : ""
              }`}
            >
              1
            </Link>
            {startPage > 2 && <span className={styles.ellipsis}>...</span>}
          </>
        )}

        {pages.map((page) => (
          <Link
            key={page}
            href={getPageHref(page)}
            className={`${styles.pageButton} ${
              currentPage === page ? styles.active : ""
            }`}
            aria-label={`Страница ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </Link>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className={styles.ellipsis}>...</span>
            )}
            <Link
              href={getPageHref(totalPages)}
              className={`${styles.pageButton} ${
                currentPage === totalPages ? styles.active : ""
              }`}
            >
              {totalPages}
            </Link>
          </>
        )}
      </div>

      <Link
        href={currentPage < totalPages ? getPageHref(currentPage + 1) : "#"}
        className={`${styles.paginationButton} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
        aria-label="Следующая страница"
      >
        Вперед →
      </Link>
    </div>
  );
}

// Основная страница
export default function NewsPage({ searchParams }) {
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Получаем параметр страницы из URL
    const getPageFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return parseInt(urlParams.get("page") || "1");
    };

    const page = getPageFromUrl();
    const validatedPage = Math.max(1, page);
    const totalPagesCalc = Math.ceil(newsData.length / ITEMS_PER_PAGE);
    
    setCurrentPage(Math.min(validatedPage, totalPagesCalc));
    setTotalPages(totalPagesCalc);
  }, [searchParams]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = newsData.slice(startIndex, endIndex);

  if (!newsData || newsData.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.noArticles}>Нет новостей для отображения</div>
      </div>
    );
  }

  return (
    <section className={styles.newsSection}>
      <div className={styles.container}>
        <h1 className={styles.news_title}>НОВОСТИ КЛУБА</h1>
        
        <div className={styles.grid}>
          {currentPosts.map((post) => (
            <NewsCard key={post.id} {...post} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/news"
          />
        )}
      </div>
    </section>
  );
}