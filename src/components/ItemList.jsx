import Item from './Item';
import LoadingSkeleton from './LoadingSkeleton';
import styles from './itemlist.module.css';

export default function ItemList({ food, isLoading, error, onRetry }) {
  if (isLoading) {
    return <LoadingSkeleton type='list' />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        {onRetry && (
          <button onClick={onRetry} className={styles.retryButton}>
            Try Again
          </button>
        )}
      </div>
    );
  }

  if (!food?.extendedIngredients?.length) {
    return (
      <div className={styles.emptyState}>
        <p>No ingredients found for this recipe.</p>
      </div>
    );
  }

  return (
    <div className={styles.itemList}>
      {food.extendedIngredients.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}
