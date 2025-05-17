import { useEffect, useState } from "react";
import styles from "./search.module.css";
const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "fd175e20c1f7414895750381928b76bd";

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("pizza"); // state Hook (only inside component)
  // syntax of the useEffect hook ** every time load
  useEffect(() => {
    async function fethFood() {
      const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data.results);
      setFoodData(data.results);
    }
    fethFood();
  }, [query]); // dependency
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
