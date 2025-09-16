import styles from './loadingskeleton.module.css';

export default function LoadingSkeleton({ type = 'card' }) {
  if (type === 'card') {
    return (
      <div className={styles.cardSkeleton}>
        <div className={styles.imageSkeleton} />
        <div className={styles.contentSkeleton}>
          <div className={styles.titleSkeleton} />
          <div className={styles.textSkeleton} />
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className={styles.listSkeleton}>
        {[1, 2, 3].map((item) => (
          <div key={item} className={styles.listItemSkeleton}>
            <div className={styles.listImageSkeleton} />
            <div className={styles.listContentSkeleton}>
              <div className={styles.listTitleSkeleton} />
              <div className={styles.listTextSkeleton} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
