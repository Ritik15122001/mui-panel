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

const AddContactForm = () => {
  const titleRef = useRef();
  const [quillText, setQuillText] = useState('');

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

  const handleChooseImage = async (e) => {};

  const handleSubmit = () => {
    const title = titleRef.current.value;
    // const accordionTitle = accordionTitleRef.current.value;
    // const accordionDescription = accordionDescriptionRef.current.value;

    if (!title) {
      alert('fill required fields');
      return;
    }

    try {
      const data = {
        title,
        description: quillText,
      };

      // console.log(data);

      addToFirebase('contact', data).then((res) => {
        alert('Contact added successfully');
        titleRef.current.value = '';
        setQuillText('');
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
          <CustomTextField id="bl-title" placeholder="John Deo" fullWidth inputRef={titleRef} />
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
        {/* <Grid item xs={12} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="bl-message">Image</CustomFormLabel>
          </Grid>
  
          <Grid item xs={12}>
            <CustomTextField id="bl-image" type="file" fullWidth onChange={handleChooseImage} />
            <Button onClick={async () => console.log(await uploadImageToFirebase(blogImage))}>
                Upload
              </Button>
          </Grid>
          <Grid item xs={12}>
            {blogImage && blogImage.url && (
              <img src={blogImage.url} width={200} height={200} style={{ objectFit: 'contain' }} />
            )}
          </Grid> */}

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

        {/* <Grid item xs={12} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="bl-tags">Tags</CustomFormLabel>
            </Grid>
    
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="blog-tags"
                options={[]}
                value={selectedTags}
                freeSolo
                onChange={(e, value) => setSelectedTags(value)}
                renderInput={(params) => <CustomTextField {...params} placeholder="Add your tags..." />}
              />
            </Grid> */}

        {/* <Grid item xs={12} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="bl-accordion"></CustomFormLabel>
          </Grid>
  
          <Grid item xs={12} display="flex" alignItems="center">
            <ParentCard title="Accordion Fields">
              <Grid container sx={{ mt: -3 }}>
                <Grid item xs={12} display="flex" alignItems="center">
                  <CustomFormLabel htmlFor="bl-accordion-title">Accordion Title</CustomFormLabel>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    id="bl-accordion-title"
                    placeholder="John Deo"
                    fullWidth
                    inputRef={accordionTitleRef}
                  />
                </Grid>
                <Grid item xs={12} display="flex" alignItems="center">
                  <CustomFormLabel htmlFor="bl-accordion-title">Place</CustomFormLabel>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    id="bl-accordion-title"
                    placeholder="John Deo"
                    fullWidth
                    // inputRef={accordionTitleRef}
                  />
                </Grid>
                <Grid item xs={12} display="flex" alignItems="center">
                  <CustomFormLabel htmlFor="bl-accordion-title">Accordion mail</CustomFormLabel>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    id="bl-accordion-title"
                    placeholder="John Deo"
                    fullWidth
                    // inputRef={accordionTitleRef}
                  />
                </Grid>
                <Grid item xs={12} display="flex" alignItems="center">
                  <CustomFormLabel htmlFor="bl-accordion-title">Contact No.</CustomFormLabel>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    id="bl-accordion-title"
                    placeholder="John Deo"
                    fullWidth
                    // inputRef={accordionTitleRef}
                  />
                </Grid>
  
                <Grid item xs={12} display="flex" alignItems="center">
                  <CustomFormLabel htmlFor="outlined-multiline-static">
                    Accordion Description
                  </CustomFormLabel>
                </Grid>
  
                <Grid item xs={12} display="flex" alignItems="center">
                  <CustomTextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    inputRef={accordionDescriptionRef}
                  />
                </Grid>
              </Grid>
            </ParentCard>
          </Grid> */}

        <Grid item xs={12} mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Contact
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddContactForm;
