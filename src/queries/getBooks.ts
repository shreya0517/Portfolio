import { ClientError } from 'graphql-request';
import atomicHabitsCover from '../images/portfolio/reading/atomic-habits.jpg';
import eatThatFrogCover from '../images/portfolio/reading/eat-that-frog.jpg';
import richDadPoorDadCover from '../images/portfolio/reading/rich-dad-poor-dad.jpg';
import theAlchemistCover from '../images/portfolio/reading/the-alchemist.jpg';
import datoCMSClient from './datoCMSClient';
import { BookItem } from '../types';
import { DATO_SCHEMA, RawBookItem } from './schemaMap';
import { normalizeUrl } from '../utils/normalizeUrl';

const GET_BOOKS = `
  query GetAllBooks {
    ${DATO_SCHEMA.roots.books} {
      id
      title
      author
      description
      image {
        url
      }
    }
  }
`;

const FALLBACK_BOOKS: BookItem[] = [
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    description:
      'A practical guide on building systems, improving consistency, and making small habits compound over time.',
    coverImage: atomicHabitsCover,
  },
  {
    id: 'eat-that-frog',
    title: 'Eat That Frog!',
    author: 'Brian Tracy',
    description:
      'A straightforward take on beating procrastination by prioritizing important tasks and acting on them early.',
    coverImage: eatThatFrogCover,
  },
  {
    id: 'rich-dad-poor-dad',
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    description:
      'A mindset-focused introduction to financial literacy, ownership, and how different people think about money.',
    coverImage: richDadPoorDadCover,
  },
  {
    id: 'the-alchemist',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description:
      'A reflective story about purpose, courage, and trusting the journey toward personal dreams.',
    coverImage: theAlchemistCover,
  },
];

export async function getBooks(): Promise<BookItem[]> {
  try {
    const data = await datoCMSClient.request<{ allReadingItems: RawBookItem[] }>(GET_BOOKS);

    const books = (data?.allReadingItems ?? []).map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      coverImage: normalizeUrl(book.image?.url),
    }));

    return books.filter((book) => Boolean(book.coverImage));
  } catch (error) {
    if (error instanceof ClientError) {
      const missingBooksField = error.response.errors?.some(
        (issue) =>
          issue.extensions?.code === 'undefinedField' &&
          issue.extensions?.fieldName === 'allReadingItems'
      );

      if (missingBooksField) {
        console.warn(
          'DatoCMS query field "allReadingItems" is not available for this project/token. Falling back to local reading data.'
        );
        return FALLBACK_BOOKS;
      }
    }

    console.error('Error fetching books from CMS:', error);
    return FALLBACK_BOOKS;
  }
}
