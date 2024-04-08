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
import { API_PATHS } from '../../../utils';
import { readFirebasebyId } from '../../../firebase';
import { API_URL } from '../../../utils';

const PreviewContact = () => {
  // const titleRef = useRef();
  const location = useLocation();
  // console.log('location-->', location);
  const navigate = useNavigate();
  const rows = location.state.row;
  const [title, setTitle] = useState(rows.title);
  const [quillText, setQuillText] = useState(rows.description);
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: ""
});

  const handleSubmit = () => {
    navigate('/apps/contacts/view');
  };

  const contactid = rows._id

  const handleData = async (contactid) => {
    // console.log("rowid---->"+contactid);

    try {
      const result = await readFirebasebyId(API_PATHS.ADD_Contact + "/" + contactid);
      setData({
        name: result.data.name,
        email: result.data.email,
        phoneNumber: result.data.phoneNumber,
        subject:result.data.subject,
        message:result.data.message
        // Set other fields as needed
    });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
   
  };


  useEffect(() => {
    handleData(contactid);
  }, []);



  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Layout */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <Grid container>
        {/* 1 */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-title" sx={{ mt: 0 }}>
            Name
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            disabled
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
            // inputRef={titleRef}
            value={data.name}
          />
        </Grid>

        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-title" sx={{ mt: 0 }}>
            email
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            disabled
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
            // inputRef={titleRef}
            value={data.email}
          />
        </Grid>

        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-title" sx={{ mt: 0 }}>
            PhoneNumber
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            disabled
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
            // inputRef={titleRef}
            value={data.phoneNumber}
          />
        </Grid>

        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-title" sx={{ mt: 0 }}>
            Subject
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            disabled
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
            // inputRef={titleRef}
            value={data.subject}
          />
        </Grid>

        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-title" sx={{ mt: 0 }}>
            Message
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            disabled
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
            // inputRef={titleRef}
            value={data.message}
          />
        </Grid>

        {/* <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-description">Description</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <ReactQuill
              readOnly
              value={data.subheading}
              onChange={(value) => setQuillText(value)}
              placeholder="Description"
            />
          </Paper>
        </Grid> */}

        <Grid item xs={12} mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Done
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PreviewContact;
