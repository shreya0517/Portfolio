import { ClientError } from 'graphql-request';
import datoCMSClient from './datoCMSClient';
import { BlogPost } from '../types';
import { DATO_SCHEMA, RawBlogPost } from './schemaMap';

const GET_BLOGS = `
  query GetAllBlogPosts {
    ${DATO_SCHEMA.roots.blog_post}(orderBy: _createdAt_DESC) {
      title
      description
      link
    }
  }
`;

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const data = await datoCMSClient.request<{ allBlogPosts: RawBlogPost[] }>(GET_BLOGS);

    if (!data?.allBlogPosts?.length) {
      console.warn('CMS returned empty blog posts.');
      return [];
    }

    return data.allBlogPosts;
  } catch (error) {
    if (error instanceof ClientError) {
      const issueList = error.response.errors?.map((issue) => ({
        code: issue.extensions?.code,
        fieldName: issue.extensions?.fieldName,
        message: issue.message,
      }));

      console.error('DatoCMS blogs query failed:', issueList);
    }

    console.error('Error fetching blog posts:', error);
    return [];
  }
}
