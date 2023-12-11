import {
  Grid,
  InputAdornment,
  Button,
  MenuItem,
  Paper,
  Autocomplete,
  TextField,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import { addToFirebase, updateInFirebase, uploadImageToFirebase } from '../../../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Quill.css';
// import './Quill.css';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import ParentCard from '../../shared/ParentCard';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateContact = () => {
  // const titleRef = useRef();
  const location = useLocation();
  const rows = location.state.row;
  const navigate = useNavigate();
  const [title, setTitle] = useState(rows.title);

  const [quillText, setQuillText] = useState(rows.description);

  // console.log('rows-->', rows);
  const handleChooseImage = async (e) => {};

  const handleSubmit = () => {
    // const title = titleRef.current.value;
    // const accordionTitle = accordionTitleRef.current.value;
    // const accordionDescription = accordionDescriptionRef.current.value;

    // if (!title) {
    //   alert('fill required fields');
    //   return;
    // }

    try {
      const data = {
        title,
        description: quillText,
      };

      // console.log(data);

      updateInFirebase(`contact/${rows.key}`, data).then((res) => {
        alert('Contact updated successfully');
        navigate('/apps/contacts/view');
      });
    } catch (err) {
      alert('Error');
    }
  };
  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Layout */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <Grid container>
        {/* 1 */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-title" sx={{ mt: 0 }}>
            Title
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
            // inputRef={titleRef}
            value={title}
          />
        </Grid>

        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-description">Description</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <ReactQuill
              value={quillText}
              onChange={(value) => setQuillText(value)}
              placeholder="Description"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update Contact
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdateContact;
