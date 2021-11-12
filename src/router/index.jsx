import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../constants';
import styles from './index.module.css';

const Navigation = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <li>
          <Link to={AppRoutes.people} className={styles.item}>
            People
          </Link>
        </li>
        <li>
          <Link to={AppRoutes.planets} className={styles.item}>
            Planets
          </Link>
        </li>
        <li>
          <Link to={AppRoutes.films} className={styles.item}>
            Films
          </Link>
        </li>
        <li>
          <Link to={AppRoutes.species} className={styles.item}>
            Species
          </Link>
        </li>
        <li>
          <Link to={AppRoutes.vehicles} className={styles.item}>
            Vehicles
          </Link>
        </li>
        <li>
          <Link to={AppRoutes.starships} className={styles.item}>
            Starships
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
