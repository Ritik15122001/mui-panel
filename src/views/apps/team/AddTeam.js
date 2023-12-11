import React from 'react';

import { Grid } from '@mui/material';
import ParentCard from '../../../components/shared/ParentCard';

import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';

import AddWorkForm from '../../../components/apps/work/addWorkForm';
import AddTeamForm from '../../../components/apps/team/AddTeamForm';

const AddTeam = () => {
  return (
    <PageContainer title="Team" description="Add your Team">
      <Breadcrumb title="Team" />
      <Grid item xs={12} lg={6}>
        <ParentCard title="Add your Team">
          <AddTeamForm />
        </ParentCard>
      </Grid>
    </PageContainer>
  );
};

export default AddTeam;
