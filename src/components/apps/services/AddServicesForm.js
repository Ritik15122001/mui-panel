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
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import ParentCard from '../../shared/ParentCard';
import { API_PATHS } from '../../../utils';

const AddServicesForm = () => {
  const titleRef = useRef();
  const [serviceImage, setServiceImage] = useState('');
  const [icon, setIcon] = useState('');
  const [quillText, setQuillText] = useState('');
  const [accordionDescription, setAccordianDescription] = useState('');
  const accordionTitleRef = useRef();
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



  const handleChooseImage = (e) => {
    const file = e.target.files[0];
  console.log("image---->",file)
  setServiceImage(file);
  };

  const handleSubmit = () => {
  
    try {
    
      const formData = new FormData();
      
      // Extracting text content from HTML and splitting into array
   
      
      // Adding image to formData
      formData.append('image', serviceImage);
      formData.append('services',quillText)

      // Sending formData to backend
      addToFirebase(API_PATHS.ADD_Services, formData).then((res) => {
        alert('Services added successfully');
        setQuillText('');
        setServiceImage('');
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
        {/* <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-title" sx={{ mt: 0 }}>
            Title
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField id="bl-title" placeholder="John Deo" fullWidth inputRef={titleRef} />
        </Grid>
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message">Icon</CustomFormLabel>
        </Grid> */}

        {/* <Grid item xs={12}>
          <CustomTextField id="bl-image" type="file" fullWidth onChange={handleChooseIcon} />
          <Button onClick={async () => console.log(await uploadImageToFirebase(blogImage))}>
            Upload
          </Button>
        </Grid>
        <Grid item xs={12}>
          {icon && icon.url && (
            <img src={icon.url} width={200} height={200} style={{ objectFit: 'contain' }} />
          )}
        </Grid> */}
        {/* 2 */}

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
          {serviceImage && serviceImage.url && (
            <img src={serviceImage.url} width={200} height={200} style={{ objectFit: 'contain' }} />
          )}
        </Grid>

        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-description">Services</CustomFormLabel>
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
                <CustomFormLabel htmlFor="bl-description">Accordian Description</CustomFormLabel>
              </Grid>
              <Grid item xs={12}>
                <Paper variant="outlined">
                  <ReactQuill
                    value={accordionDescription}
                    onChange={(value) => setAccordianDescription(value)}
                    placeholder="Description"
                  />
                </Paper>
              </Grid>
            </Grid>
          </ParentCard>
        </Grid> */}

        <Grid item xs={12} mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Service
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddServicesForm;
