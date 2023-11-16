import React from 'react';

import { Grid } from '@mui/material';
import ParentCard from '../../../components/shared/ParentCard';

import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';

import AddHomeForm from '../../../components/apps/home/AddHomeForm';

const AddHome = () => {
  return (
    <PageContainer title="Home" description="Add home carousel">
      <Breadcrumb title="Home" subtitle="Add carousels on homepage" />
      <Grid item xs={12} lg={6}>
        <ParentCard title="Add a carousel">
          <AddHomeForm />
        </ParentCard>
      </Grid>
    </PageContainer>
  );
};

export default AddHome;
