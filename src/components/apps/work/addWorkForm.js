import {
  Grid,
  InputAdornment,
  Button,
  MenuItem,
  Paper,
  Autocomplete,
  TextField,
} from '@mui/material';
import React, { useRef, useState } from 'react';

import { addToFirebase, uploadImageToFirebase } from '../../../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Quill.css';
// import './Quill.css';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import ParentCard from '../../shared/ParentCard';
import { API_PATHS } from '../../../utils';
import { array } from 'prop-types';

const AddWorkForm = () => {
  const headingRef = useRef();
  // const [category, setCategory] = useState(1);
  const [workImage, setWorkImage] = useState('');
  const [workDate, setWorkDate] = useState('');
  // const [icon, setIcon] = useState('');
  // const [description, setDescription] = useState('');
  const [quillText, setQuillText] = useState('');
  // const projectTitleRef = useRef();
  const authorRef = useRef();
  const placeRef = useRef();
  const clientNameRef = useRef();
  const projectCategoryRef = useRef();
  // const accordionDescriptionRef = useRef();

  // const getbase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fr = new FileReader();

  //     // console.log(file instanceof Blob); // should be true

  //     fr.readAsDataURL(file);
  //     fr.onerror = reject;
  //     fr.onload = function () {
  //       resolve(fr.result);
  //     };
  //   });
  // };




// console.log("services---->"+data[0])




  const handleChooseImage = (e) => {
    const file = e.target.files[0];
  console.log("image---->",file)
    setWorkImage(file);
  };


  const handleSubmit = () => {
    const heading = headingRef.current.value;


    if (!heading) {
      alert('fill required fields');
      return;
    }
   
   


    try {
     
      const formData = new FormData();

      formData.append('heading',heading);
      formData.append('subheading',quillText);
      formData.append('image',workImage)

      // console.log(data);

      addToFirebase(API_PATHS.ADD_work, formData).then((res) => {
        alert('Work added successfully');
        heading.current.value = '';
        setQuillText('');
        setWorkImage('');
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
            Heading
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField id="bl-title" placeholder="John Deo" fullWidth inputRef={headingRef} />
        </Grid>
        {/* 2 */}
        {/* <Grid item xs={12} alignItems="center">
          <CustomFormLabel htmlFor="demo-simple-select">Category</CustomFormLabel>
          <CustomSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            size="medium"
          >
            <MenuItem value={1}>Select Category</MenuItem>
            <MenuItem value={'Business'}>Business Analysis</MenuItem>
            <MenuItem value={'Development'}>Financial Advisory</MenuItem>
            <MenuItem value={'Consulting'}>Business Growth</MenuItem>
            <MenuItem value={'Corporate'}>Innovation Idea</MenuItem>
            <MenuItem value={'Design'}>Market Research</MenuItem>
          </CustomSelect>
        </Grid> */}

        {/* 5 */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message">Image</CustomFormLabel>
        </Grid>

        <Grid item xs={12}>
          <CustomTextField id="bl-image" type="file" fullWidth onChange={handleChooseImage} />
          {/* <Button onClick={async () => console.log(await uploadImageToFirebase(blogImage))}>
              Upload
            </Button> */}
        </Grid>
        <Grid item xs={12}>
          {workImage && workImage.url && (
            <img src={workImage.url} width={200} height={200} style={{ objectFit: 'contain' }} />
          )}
        </Grid>
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-description">Subheading</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <ReactQuill
              value={quillText}
              onChange={(value) => setQuillText(value)}
              placeholder="SubHeading"
            />
          </Paper>
        </Grid>

        {/* <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-accordion"></CustomFormLabel>
        </Grid>

        <Grid item xs={12} display="flex" alignItems="center">
          <ParentCard title="Project Information">
            <Grid container sx={{ mt: -3 }}>
              <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="bl-accordion-title">Client name</CustomFormLabel>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  id="bl-accordion-title"
                  placeholder="John Deo"
                  fullWidth
                  inputRef={clientNameRef}
                />
              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="outlined-multiline-static">Category</CustomFormLabel>
              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <CustomTextField
                  id="outlined-multiline-static"
                  placeholder="Modern"
                  //   multiline
                  //   rows={4}
                  //   variant="outlined"
                  fullWidth
                  inputRef={projectCategoryRef}
                />
              </Grid>
              <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="outlined-multiline-static">Author</CustomFormLabel>
              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <CustomTextField
                  id="outlined-multiline-static"
                  placeholder="Modern"
                  //   multiline
                  //   rows={4}
                  //   variant="outlined"
                  fullWidth
                  inputRef={authorRef}
                />
              </Grid>
              <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="outlined-multiline-static">Place</CustomFormLabel>
              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <CustomTextField
                  id="outlined-multiline-static"
                  placeholder="Modern"
                  //   multiline
                  //   rows={4}
                  //   variant="outlined"
                  fullWidth
                  inputRef={placeRef}
                />
              </Grid>
              <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="bl-phone">Date</CustomFormLabel>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  value={workDate}
                  type="date"
                  id="fs-date"
                  placeholder="21-11-2023"
                  fullWidth
                  onChange={(e) => setWorkDate(e.target.value)}
                />
              </Grid>
            </Grid>
          </ParentCard>
        </Grid> */}

        <Grid item xs={12} mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Project
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddWorkForm;
