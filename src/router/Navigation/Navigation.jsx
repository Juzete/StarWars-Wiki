import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

export default React.memo(function Navigation() {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <li>
          <Link to="/info/people" className={styles.item}>
            People
          </Link>
        </li>
        <li>
          <Link to="/info/planets" className={styles.item}>
            Planets
          </Link>
        </li>
        <li>
          <Link to="/info/films" className={styles.item}>
            Films
          </Link>
        </li>
        <li>
          <Link to="/info/species" className={styles.item}>
            Species
          </Link>
        </li>
        <li>
          <Link to="/info/vehicles" className={styles.item}>
            Vehicles
          </Link>
        </li>
        <li>
          <Link to="/info/starships" className={styles.item}>
            Starships
          </Link>
        </li>
      </ul>
    </div>
  );
});
