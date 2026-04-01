import React, { useEffect, useState } from 'react';
import './Reading.css';
import { BookItem } from '../types';
import { getBooks } from '../queries/getBooks';
import atomicHabitsCover from '../images/portfolio/reading/atomic-habits.jpg';

const fallbackBookCover = atomicHabitsCover;

const Reading: React.FC = () => {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadBooks() {
      try {
        const data = await getBooks();

        if (!isMounted) {
          return;
        }

        setBooks(data);
        setError(null);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError('Unable to load books right now.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadBooks();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) return <p className="reading-loading">Loading books...</p>;
  if (error) return <p className="reading-error">{error}</p>;

  return (
    <div className="reading-container">
      <h2 className="reading-title">Books That Break Illusions</h2>
      <p className="reading-intro">
        Stories that reshaped how I think, question, and see the world.
      </p>

      <div className="books-grid">
        {books.length === 0 && <p className="reading-loading">No books available yet.</p>}

        {books.map((book, index) => (
          <div
            key={book.id}
            className="book-card"
            style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
          >
            <img
              src={book.coverImage || fallbackBookCover}
              alt={book.title}
              className="book-cover"
              onError={(event) => {
                event.currentTarget.src = fallbackBookCover;
              }}
            />

            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <h4 className="book-author">{book.author}</h4>
              <p className="book-description">{book.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reading;
