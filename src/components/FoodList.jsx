import FoodItem from './FoodItem';
import styles from './foodlist.module.css';

export default function FoodList({ foodData, setFoodId }) {
  if (!foodData || foodData.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No recipes found. Try searching for something else!</p>
      </div>
    );
  }

  return (
    <div className={styles.foodList}>
      {foodData.map((food) => (
        <div key={food.id} className={styles.foodItemWrapper}>
          <FoodItem food={food} setFoodId={setFoodId} />
        </div>
      ))}
    </div>
  );
}
