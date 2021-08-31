import React, { Suspense } from "react";
import styles from "./ScrollingText.module.css";

export default function ScrollingText() {
  return (
    <>
        <div className={styles.wrapper}>
          <div className={styles.scrollText}>
            <h1 className={styles.h1}>STAR WARS</h1>
            <p>
            It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire’s ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the Empire’s sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy….
            </p>
            <p>
            It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire’s ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the Empire’s sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy….
            </p>
          </div>
        </div>
    </>
  );
}
