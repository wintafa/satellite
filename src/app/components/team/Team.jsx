"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Team.module.scss";

const players = [
  { 
    id: 1, 
    name: "НЕКРАСОВ АЛЕКСАНДР", 
    role: "ВРАТАРЬ", 
    img: "/players/alexander.png",
    number: "33",
    birthDate: "12.05.1995",
    games: 124,
    goals: 0,
    assists: 5
  },
  { 
    id: 2, 
    name: "ИВАНОВ ИВАН", 
    role: "ЗАЩИТНИК", 
    img: "/players/alexander.png",
    number: "4",
    birthDate: "23.08.1998",
    games: 98,
    goals: 12,
    assists: 24
  },
  { 
    id: 3, 
    name: "ПЕТРОВ ПЕТР", 
    role: "НАПАДАЮЩИЙ", 
    img: "/players/alexander.png",
    number: "10",
    birthDate: "01.01.2000",
    games: 150,
    goals: 85,
    assists: 40
  },
  { id: 4, name: "СИДОРОВ СИДОР", role: "ВРАТАРЬ", img: "/players/alexander.png", number: "1", birthDate: "10.10.1990", games: 50, goals: 0, assists: 0 },
  { id: 5, name: "КУЗНЕЦОВ КУЗЯ", role: "ЗАЩИТНИК", img: "/players/alexander.png", number: "5", birthDate: "15.05.1992", games: 110, goals: 5, assists: 15 },
  { id: 6, name: "СМИРНОВ СМИРН", role: "НАПАДАЮЩИЙ", img: "/players/alexander.png", number: "9", birthDate: "20.12.1996", games: 130, goals: 60, assists: 30 },
  { id: 7, name: "ПОПОВ ПОП", role: "ПОЛУЗАЩИТНИК", img: "/players/alexander.png", number: "8", birthDate: "05.03.1994", games: 140, goals: 25, assists: 55 },
];

export default function Team() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const updateRows = () => {
      if (window.innerWidth <= 768) {
        setItemsPerRow(1); // Мобильные
      } else if (window.innerWidth <= 1024) {
        setItemsPerRow(2); // Планшеты
      } else if (window.innerWidth <= 1450) {
        setItemsPerRow(3); // Ноутбуки
      } else {
        setItemsPerRow(3); // Десктопы (>1450px) - 3 игрока
      }
    };

    updateRows();
    window.addEventListener("resize", updateRows);
    return () => window.removeEventListener("resize", updateRows);
  }, []);

  const visiblePlayers = isExpanded ? players : players.slice(0, itemsPerRow);
  const closeModal = () => setSelectedPlayer(null);

  return (
    <section className={styles.teamSection} id="team">
      <h2 className={styles.title}>КОМАНДА</h2>
      
      <div className={styles.grid}>
        {visiblePlayers.map((player) => (
          <div 
            key={player.id} 
            className={styles.card}
            onClick={() => setSelectedPlayer(player)}
          >
            <div className={styles.imageWrapper}>
              <Image 
                src={player.img} 
                alt={player.name} 
                fill
                className={styles.playerImg}
              />
              <div className={styles.clickHint}>Подробнее</div>
            </div>
            <div className={styles.info}>
              <h3 className={styles.name}>{player.name}</h3>
              <p className={styles.role}>{player.role}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        {players.length > itemsPerRow && (
          <button 
            className={styles.showMoreBtn} 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Скрыть" : "Смотреть еще"}
          </button>
        )}
      </div>

      {selectedPlayer && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>
              &times;
            </button>
            
            <div className={styles.modalBody}>
              <div className={styles.modalImage}>
                <Image 
                  src={selectedPlayer.img} 
                  alt={selectedPlayer.name} 
                  fill
                  className={styles.modalPlayerImg}
                />
              </div>
              
              <div className={styles.modalInfo}>
                <h3 className={styles.modalName}>{selectedPlayer.name}</h3>
                <p className={styles.modalRole}>{selectedPlayer.role}</p>
                <p className={styles.modalNumber}>№ {selectedPlayer.number}</p>
                
                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Дата рождения</span>
                    <span className={styles.statValue}>{selectedPlayer.birthDate}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Игры</span>
                    <span className={styles.statValue}>{selectedPlayer.games}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Голы</span>
                    <span className={styles.statValue}>{selectedPlayer.goals}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Передачи</span>
                    <span className={styles.statValue}>{selectedPlayer.assists}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}