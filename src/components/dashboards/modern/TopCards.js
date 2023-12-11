import React, { useState, useEffect } from 'react';
import { Box, CardContent, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { readFirebase } from '../../../firebase';

import icon2 from '../../../assets/images/svgs/icon-user-male.svg';
import icon7 from '../../../assets/images/svgs/icon-pie.svg';
import icon4 from '../../../assets/images/svgs/icon-dd-chat.svg';
import icon5 from '../../../assets/images/svgs/icon-office-bag-2.svg';
import icon3 from '../../../assets/images/svgs/icon-master-card.svg';
import icon6 from '../../../assets/images/svgs/icon-speech-bubble.svg';

const topcards = [
  {
    icon: icon4,
    title: 'Blog',
    bgcolor: 'primary',
    link: '/apps/blog/posts',
    value: 'blogs',
    // color:''
  },
  {
    icon: icon7,
    title: 'Services',
    bgcolor: 'warning',
    link: '/apps/services/view',
    value: 'services',
  },
  {
    icon: icon5,
    title: 'Our Work',
    bgcolor: 'secondary',
    link: '/apps/work/view',
    value: 'works',
  },
  {
    icon: icon2,
    title: 'Team',
    bgcolor: 'error',
    link: '/apps/team/view',
    value: 'team',
  },
  {
    icon: icon6,
    title: 'Testimonial',
    bgcolor: 'success',
    link: '/apps/testimonial/view',
    value: 'testimonial',
  },
];

const TopCards = () => {
  const [rows, setRows] = useState({});

  const valueDataBase = async (value) => {
    try {
      const result = await readFirebase(value);
      setRows((prevRows) => ({ ...prevRows, [value]: result }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    topcards.forEach((topcard) => {
      valueDataBase(topcard.value);
    });
  }, []); // Fetch data when the component mounts

  return (
    <Grid container spacing={3} mt={3}>
      {topcards.map((topcard, i) => (
        <Grid
          item
          key={i}
          xs={12}
          sm={6}
          md={6}
          lg={6}
          style={{ maxWidth: '300px', margin: '20px' }}
        >
          <Link to={topcard.link} style={{ textDecoration: 'none' }}>
            <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center" height="100%">
              <CardContent>
                <img src={topcard.icon} alt={topcard.icon} width="50" />
                <Typography
                  color={topcard.bgcolor + '.main'}
                  mt={1}
                  variant="subtitle1"
                  fontWeight={600}
                >
                  {topcard.title}
                </Typography>
                <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                  {rows[topcard.value]?.length || 0}
                </Typography>
              </CardContent>
            </Box>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
