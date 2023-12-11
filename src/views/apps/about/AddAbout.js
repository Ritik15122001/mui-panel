import React from 'react';

import { Grid } from '@mui/material';
import ParentCard from '../../../components/shared/ParentCard';

import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';

import AddAboutForm from '../../../components/apps/about/AddAboutForm';

const AddAbout = () => {
  return (
    <PageContainer title="About" description="Add your About">
      <Breadcrumb title="About" />
      <Grid item xs={12} lg={6}>
        <ParentCard title="Add your about">
          <AddAboutForm />
        </ParentCard>
      </Grid>
    </PageContainer>
  );
};

export default AddAbout;
