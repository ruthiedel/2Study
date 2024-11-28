import React, { useState } from 'react';
import styles from './FilterComponent.module.css';

const FilterComponent: React.FC = () => {
  const [bookName, setBookName] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const availableCategories = [
    "הלכה",
    "מוסר",
    "שמירת הלשון",
    "לימוד",
    "הוראה"
  ];

  const handleCategorySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
      setSelectedCategory('');
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
        placeholder="מצא לפי שם ספר"
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
        <label className={styles.title}>קטגוריה:</label>
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
        value={selectedCategory}
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

export default FilterComponent;
