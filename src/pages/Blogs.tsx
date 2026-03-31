import React, { useEffect, useState } from 'react';
import './Blogs.css';
import { FaMedium, FaDev } from 'react-icons/fa';
import EmptyState from '../components/EmptyState';
import { BlogPost } from '../types';
import { getBlogs } from '../queries/getBlogs';

const getPlatformMeta = (link: string) => {
  if (link.includes('medium.com')) {
    return { platform: 'Medium', icon: <FaMedium /> };
  }

  if (link.includes('dev.to')) {
    return { platform: 'Dev.to', icon: <FaDev /> };
  }

  return { platform: 'Blog', icon: <FaMedium /> };
};

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchBlogs() {
      try {
        const items = await getBlogs();

        if (!isMounted) {
          return;
        }

        setBlogs(Array.isArray(items) ? items : []);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <div className="blogs-container">Loading blog posts...</div>;
  }

  if (!blogs.length) {
    return (
      <div className="blogs-container">
        <EmptyState
          title="Blogs"
          message="Blog posts coming soon."
          icon={<FaMedium />}
          className="blogs-empty-state"
        />
      </div>
    );
  }

  return (
    <div className="blogs-container">
      <h2 className="blogs-title">My Blog Posts</h2>
      <p className="blogs-intro">
        A collection of my thoughts and tutorials on software development.
      </p>
      <div className="blogs-grid">
        {blogs.map((blog, index) => {
          const { platform, icon } = getPlatformMeta(blog.link);

          return (
            <a
              href={blog.link}
              key={`${blog.title}-${index}`}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-card"
              style={{ '--delay': `${index * 0.2}s` } as React.CSSProperties}
            >
              <div className="blog-icon animated-icon">{icon}</div>
              <div className="blog-info animated-text">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-description">{blog.description}</p>
                <span className="blog-platform">{platform}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
