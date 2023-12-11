import React from 'react';

import { Grid } from '@mui/material';
import ParentCard from '../../../components/shared/ParentCard';

import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import AddBlogForm from '../../../components/apps/blog/AddBlogForm';

const AddBlog = () => {
  return (
    <PageContainer title="Blog" description="Add your Blog">
      <Breadcrumb title="Blog app" />
      <Grid item xs={12} lg={6}>
        <ParentCard title="Post your blog">
          <AddBlogForm />
        </ParentCard>
      </Grid>
    </PageContainer>
  );
};

export default AddBlog;
