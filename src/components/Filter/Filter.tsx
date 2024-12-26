import React from 'react';
import styles from './filter.module.css';

interface FilterComponentProps {
  bookName: string;
  setBookName: React.Dispatch<React.SetStateAction<string>>;
  authorName: string;
  setAuthorName: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  dropDownCategories: string[];
}

const Filter: React.FC<FilterComponentProps> = ({
  bookName,
  setBookName,
  authorName,
  setAuthorName,
  categories,
  setCategories,
  dropDownCategories,
}) => {
  const availableCategories = dropDownCategories;

  const handleCategorySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const handleCategoryRemove = (category: string) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  return (
    <div className={styles.filterContainer}>
      <strong>
        <label className={styles.bigTitle}>מיין לפי:</label>
      </strong>
      <label className={styles.title}>שם ספר:</label>
      <input
        type="text"
        placeholder=" מצא לפי שם ספר"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
        className={styles.input}
      />

      <label className={styles.title}>שם מחבר:</label>
      <input
        type="text"
        placeholder="מצא לפי שם מחבר"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        className={styles.input}
      />

      <div className={styles.flexDiv}>
        <label className={styles.title}>   קטגוריה:</label>
        <span className={styles.categoryCount}>{categories.length}</span>
      </div>

      <div className={styles.chipContainer}>
        {categories.map((category) => (
          <div key={category} className={styles.chip}>
            {category}
            <button onClick={() => handleCategoryRemove(category)} className={styles.xbutton}>
              ×
            </button>
          </div>
        ))}
      </div>

      <select
        value=""
        onChange={handleCategorySelect}
        className={styles.select}
      >
        <option value="" disabled>
          בחר קטגוריה
        </option>
        {availableCategories
          .filter((cat) => !categories.includes(cat))
          .map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Filter;
