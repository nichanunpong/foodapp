import { useEffect, useState, useCallback } from 'react';
import styles from './fooddetails.module.css';
import ItemList from './ItemList';
import LoadingSkeleton from './LoadingSkeleton';

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = 'fd175e20c1f7414895750381928b76bd';

  const fetchFood = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      if (!res.ok) {
        throw new Error('Failed to fetch recipe details');
      }
      const data = await res.json();
      setFood(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [URL, API_KEY]);

  useEffect(() => {
    fetchFood();
  }, [fetchFood]);

  if (isLoading) {
    return <LoadingSkeleton type='card' />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
        <button onClick={fetchFood} className={styles.retryButton}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.recipeCard}>
      <h1 className={styles.recipeName}>{food.title}</h1>
      <img
        className={styles.recipeImage}
        src={food.image}
        alt={food.title}
        loading='lazy'
      />
      <div className={styles.recipeDetails}>
        <span>
          <strong>⏰ {food.readyInMinutes} Minutes</strong>
        </span>
        <span>
          <strong> 👩🏻 Serves {food.servings}</strong>
        </span>
        <span>
          <strong>
            {food.vegetarian ? '🥕 Vegetarian' : '🍖 Non-Vegetarian'}
          </strong>
        </span>
        <span>
          <strong>{food.vegan ? '🐮 Vegan' : ''}</strong>
        </span>
      </div>
      <div className={styles.priceInfo}>
        <span>${(food.pricePerServing / 100).toFixed(2)} Per serving</span>
      </div>

      <h2>Ingredients</h2>
      <ItemList
        food={food}
        isLoading={isLoading}
        error={error}
        onRetry={fetchFood}
      />

      <h2>Instructions</h2>
      <div className={styles.recipeInstructions}>
        <ol>
          {food.analyzedInstructions?.[0]?.steps.map((step) => (
            <li key={step.number}>{step.step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
