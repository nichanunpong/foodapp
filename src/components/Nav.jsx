import { useState } from 'react';
import styles from './nav.module.css';

export default function Nav() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav
      className={styles.nav}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role='banner'>
      <div className={styles.navContent}>
        <span className={styles.logo}>🍔</span>
        <h1 className={styles.title}>Food App</h1>
        {isHovered && (
          <span className={styles.subtitle}>Discover delicious recipes</span>
        )}
      </div>
    </nav>
  );
}
