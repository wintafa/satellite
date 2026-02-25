"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Games.module.scss";

const allGames = [
  { 
    id: 1, 
    team1: "/logo/satellite.svg", 
    team2: "/logo/satellite.svg", 
    score: "2:1",
    opponent: "ФК СПАРТА",
    date: "12.10.2023",
    stats: { goals: 2, assists: 1, yellowCards: 2, redCards: 0 }
  },
  { 
    id: 2, 
    team1: "/logo/satellite.svg", 
    team2: "/logo/satellite.svg", 
    score: "0:3",
    opponent: "ФК ЗЕНИТ",
    date: "18.10.2023",
    stats: { goals: 0, assists: 0, yellowCards: 4, redCards: 1 }
  },
  { 
    id: 3, 
    team1: "/logo/satellite.svg", 
    team2: "/logo/satellite.svg", 
    score: "1:1",
    opponent: "ФК ДИНАМО",
    date: "25.10.2023",
    stats: { goals: 1, assists: 1, yellowCards: 1, redCards: 0 }
  },
  { 
    id: 4, 
    team1: "/logo/satellite.svg", 
    team2: "/logo/satellite.svg", 
    score: "4:0",
    opponent: "ФК РОСТОВ",
    date: "01.11.2023",
    stats: { goals: 4, assists: 3, yellowCards: 0, redCards: 0 }
  },
  { 
    id: 5, 
    team1: "/logo/satellite.svg", 
    team2: "/logo/satellite.svg", 
    score: "2:2",
    opponent: "ФК ЛОКОМОТИВ",
    date: "05.11.2023",
    stats: { goals: 2, assists: 2, yellowCards: 3, redCards: 0 }
  },
  { 
    id: 6, 
    team1: "/logo/satellite.svg", 
    team2: "/logo/satellite.svg", 
    score: "1:0",
    opponent: "ФК ЦСКА",
    date: "12.11.2023",
    stats: { goals: 1, assists: 0, yellowCards: 2, redCards: 0 }
  },
];

export default function Games() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [itemsPerRow, setItemsPerRow] = useState(3);
  
  // Состояние для модального окна
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const updateRows = () => {
      if (window.innerWidth <= 768) setItemsPerRow(1);
      else if (window.innerWidth <= 1024) setItemsPerRow(2);
      else setItemsPerRow(3);
    };

    updateRows();
    window.addEventListener("resize", updateRows);
    return () => window.removeEventListener("resize", updateRows);
  }, []);

  const visibleGames = isExpanded ? allGames : allGames.slice(0, itemsPerRow);

  // Функция закрытия
  const closeModal = () => setSelectedGame(null);

  return (
    <section className={styles.gamesSection} id="games">
      <h2 className={styles.title}>ИГРЫ</h2>
      
      <div className={styles.grid}>
        {visibleGames.map((game) => (
          <div 
            key={game.id} 
            className={styles.card}
            onClick={() => setSelectedGame(game)} // Открываем модалку при клике
          >
            <div className={styles.matchInfo}>
              <Image src={game.team1} alt="Сателлит" width={80} height={80} className={styles.teamLogo} />
              <span className={styles.score}>{game.score}</span>
              <Image src={game.team2} alt="Соперник" width={80} height={80} className={styles.teamLogo} />
            </div>
            
            <div className={styles.cardFooter}>
              <span className={styles.opponentName}>{game.opponent}</span>
              <button className={styles.detailsBtn}>
                Подробнее об игре
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        {allGames.length > itemsPerRow && (
          <button 
            className={styles.showMoreBtn} 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Скрыть" : "Смотреть еще"}
          </button>
        )}
      </div>

      {/* Модальное окно */}
      {selectedGame && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>
              &times;
            </button>
            
            <div className={styles.modalHeader}>
              <div className={styles.modalTeams}>
                <Image src={selectedGame.team1} alt="Мы" width={60} height={60} />
                <span className={styles.modalScore}>{selectedGame.score}</span>
                <Image src={selectedGame.team2} alt="Они" width={60} height={60} />
              </div>
              <div className={styles.modalMeta}>
                <h3 className={styles.modalOpponent}>{selectedGame.opponent}</h3>
                <p className={styles.modalDate}>{selectedGame.date}</p>
              </div>
            </div>

            <div className={styles.modalStats}>
              <div className={styles.statBox}>
                <span className={styles.statIcon}>⚽</span>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{selectedGame.stats.goals}</span>
                  <span className={styles.statLabel}>Голы</span>
                </div>
              </div>

              <div className={styles.statBox}>
                <span className={styles.statIcon}>🎯</span>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{selectedGame.stats.assists}</span>
                  <span className={styles.statLabel}>Передачи</span>
                </div>
              </div>

              <div className={styles.statBox}>
                <span className={styles.statIcon}>🟨</span>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{selectedGame.stats.yellowCards}</span>
                  <span className={styles.statLabel}>Желтые</span>
                </div>
              </div>

              <div className={styles.statBox}>
                <span className={styles.statIcon}>🟥</span>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{selectedGame.stats.redCards}</span>
                  <span className={styles.statLabel}>Красные</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}