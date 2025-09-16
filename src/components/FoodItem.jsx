import { useCallback } from 'react';
import styles from './fooditem.module.css';

export default function FoodItem({ food, setFoodId }) {
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setFoodId(food.id);
      }
    },
    [food.id, setFoodId]
  );

  return (
    <div
      className={styles.itemContainer}
      role='article'
      tabIndex={0}
      onKeyPress={handleKeyPress}>
      <img
        className={styles.itemImage}
        src={food.image}
        alt={`${food.title} recipe`}
        loading='lazy'
      />
      <div className={styles.itemContent}>
        <p className={styles.itemName}>{food.title}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => setFoodId(food.id)}
          className={styles.itemButton}
          aria-label={`View recipe for ${food.title}`}>
          View Recipe
        </button>
      </div>
    </div>
  );
}
