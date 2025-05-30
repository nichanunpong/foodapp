import styles from "./fooditem.module.css";
export default function FoodItem({ food, setFoodId }) {
  console.log(food);
  return (
    <div className={styles.itemContainer}>
      <img className={styles.itemImage} src={food.image} alt="" />
      <div className={styles.itemContent}>
        <p className={styles.itemName}>{food.title}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => setFoodId(food.id)}
          className={styles.itemButton}
        >
          Vuew Recipe
        </button>
      </div>
    </div>
  );
}
