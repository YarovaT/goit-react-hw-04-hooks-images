import { useState } from 'react';
import style from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const seachImagesByTags = imgTags => {
    setQuery(imgTags.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={style.searchbar}>
      <form className={style.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={style.searchFormButton}>
          <span className={style.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={style.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={seachImagesByTags}
        />
      </form>
    </header>
  );
}
