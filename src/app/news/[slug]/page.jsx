// app/news/[slug]/page.js
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./newsSlug.module.scss";
import newsData from "../../../data/newsData.json";

// Генерация статических путей для всех новостей
export async function generateStaticParams() {
  return newsData.map((post) => ({
    slug: post.slug,
  }));
}

// Поиск новости по slug
function getNewsData(slug) {
  return newsData.find((post) => post.slug === slug);
}

// Компонент карточки похожей новости
function RelatedNewsCard({ post }) {
  return (
    <Link href={`/news/${post.slug}`} className={styles.relatedCard}>
      <div className={styles.relatedImage}>
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={400}
          height={250}
          className={styles.relatedImg}
        />
      </div>
      <div className={styles.relatedContent}>
        <span className={styles.relatedCategory}>{post.category}</span>
        <h4 className={styles.relatedTitle}>{post.title}</h4>
        <span className={styles.relatedDate}>📅 {post.date}</span>
      </div>
    </Link>
  );
}

// Основная страница
export default async function NewsSlugPage({ params }) {
  const { slug } = await params;
  const article = getNewsData(slug);

  if (!article) {
    notFound();
  }

  // Находим похожие новости (той же категории)
  const relatedPosts = newsData
    .filter((p) => p.category === article.category && p.slug !== article.slug)
    .slice(0, 3);

  return (
    <section className={styles.newsSlugSection}>
      <article className={styles.article}>
        {/* Хлебные крошки */}
        <nav className={styles.breadcrumbs}>
          <Link href="/" className={styles.breadcrumbLink}>
            Главная
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href="/news" className={styles.breadcrumbLink}>
            Новости
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{article.title}</span>
        </nav>

        <div className={styles.articleHeader}>
          <div className={styles.meta}>
            <span className={styles.category}>{article.category}</span>
            <span className={styles.date}>
              📅 <time>{article.date}</time>
            </span>
            <span className={styles.readTime}>⏱️ {article.readTime}</span>
          </div>

          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.excerpt}>{article.description}</p>

          <div className={styles.author}>
            <div className={styles.avatar}></div>
            <span>Пресс-служба клуба</span>
          </div>
        </div>

        {/* Главное изображение */}
        <div className={styles.featuredImage}>
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={1200}
            height={600}
            className={styles.featuredImg}
            priority
          />
        </div>

        {/* Контент статьи */}
        <div className={styles.articleContent}>
          {typeof article.text === "string"
            ? article.text
                .split("\n\n")
                .map((para, idx) => {
                  if (para.startsWith("## ")) {
                    return (
                      <h2 key={idx} className={styles.contentHeading}>
                        {para.replace(/^##\s*/, "")}
                      </h2>
                    );
                  }
                  if (para.startsWith("### ")) {
                    return (
                      <h3 key={idx} className={styles.contentSubheading}>
                        {para.replace(/^###\s*/, "")}
                      </h3>
                    );
                  }
                  return <p key={idx}>{para.replace(/^#+\s*/, "")}</p>;
                })
            : null}
        </div>
      </article>

      {/* Похожие новости */}
      {relatedPosts.length > 0 && (
        <div className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>Читайте также</h2>
          <div className={styles.relatedGrid}>
            {relatedPosts.map((post) => (
              <RelatedNewsCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* Кнопка назад */}
      <div className={styles.backSection}>
        <Link href="/news" className={styles.backBtn}>
          ← Все новости
        </Link>
      </div>
    </section>
  );
}