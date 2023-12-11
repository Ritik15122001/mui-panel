import React from 'react';

import { Grid } from '@mui/material';
import ParentCard from '../../../components/shared/ParentCard';

import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';

import AddWorkForm from '../../../components/apps/work/addWorkForm';
import AddTestimonialForm from '../../../components/apps/testimonial/AddTestimonialForm';

const AddTestimonial = () => {
  return (
    <PageContainer title="Testimonial" description="Add your Review">
      <Breadcrumb title="Testimonial" />
      <Grid item xs={12} lg={6}>
        <ParentCard title="Add your Review">
          <AddTestimonialForm />
        </ParentCard>
      </Grid>
    </PageContainer>
  );
};

export default AddTestimonial;
