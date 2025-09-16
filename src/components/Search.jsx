import { useEffect, useState, useCallback } from 'react';
import styles from './search.module.css';

const URL = 'https://api.spoonacular.com/recipes/complexSearch';
const API_KEY = 'fd175e20c1f7414895750381928b76bd';
const DEBOUNCE_DELAY = 500; // 500ms delay

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState('pizza');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFood = useCallback(
    async (searchQuery) => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          `${URL}?query=${searchQuery}&apiKey=${API_KEY}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await res.json();
        setFoodData(data.results);
      } catch (err) {
        setError(err.message);
        setFoodData([]);
      } finally {
        setIsLoading(false);
      }
    },
    [setFoodData]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchFood(query);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [query, fetchFood]);

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search for recipes...'
        aria-label='Search recipes'
      />
      {isLoading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
    </div>
  );
}
