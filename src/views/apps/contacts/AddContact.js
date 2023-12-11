import React from 'react';

import { Grid } from '@mui/material';
import ParentCard from '../../../components/shared/ParentCard';

import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import AddBlogForm from '../../../components/apps/blog/AddBlogForm';
import AddContactForm from '../../../components/apps/contacts/AddContactForm';

const AddContact = () => {
  return (
    <PageContainer title="Contact" description="Add your Contact">
      <Breadcrumb title="Contact" />
      <Grid item xs={12} lg={6}>
        <ParentCard title="Add your Contact">
          <AddContactForm />
        </ParentCard>
      </Grid>
    </PageContainer>
  );
};

export default AddContact;
