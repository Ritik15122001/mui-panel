import React from 'react';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import BlogListing from 'src/components/apps/blog/BlogListing';
import ViewBlog from './ViewBlog';

const Blog = () => {
  return (
    <>
      {/* <PageContainer title="Blog" description="this is Blog page"> */}
      {/* <Breadcrumb title="Blog app" subtitle="Get the latest news" /> */}
      {/* ------------------------------------------- */}
      {/* Blog Listing */}
      {/* ------------------------------------------- */}
      {/* <BlogListing /> */}
      <ViewBlog />
      {/* </PageContainer> */}
    </>
  );
};

export default Blog;
