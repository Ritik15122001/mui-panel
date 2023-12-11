import React from 'react';

import { Grid } from '@mui/material';
import ParentCard from '../../../components/shared/ParentCard';

import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import AddServicesForm from '../../../components/apps/services/AddServicesForm';

const AddServices = () => {
  return (
    <PageContainer title="Services" description="Add your Services">
      <Breadcrumb title="Services" />
      <Grid item xs={12} lg={6}>
        <ParentCard title="Add your service">
          <AddServicesForm />
        </ParentCard>
      </Grid>
    </PageContainer>
  );
};

export default AddServices;
