import React from 'react';

import { Grid } from '@mui/material';
import ParentCard from '../../../components/shared/ParentCard';

import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';

import AddWorkForm from '../../../components/apps/work/addWorkForm';

const AddWork = () => {
  return (
    <PageContainer title="Work" description="Add your Work">
      <Breadcrumb title="Work" />
      <Grid item xs={12} lg={6}>
        <ParentCard title="Add your work">
          <AddWorkForm />
        </ParentCard>
      </Grid>
    </PageContainer>
  );
};

export default AddWork;
