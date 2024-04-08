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


const AddAboutForm = () => {
  const HeadingRef = useRef();
  


  const [aboutImage, setAboutImage] = useState('');
  const [subquillText, setsubQuillText] = useState('');
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


  const handleChooseImage = (e) => {
    const file = e.target.files[0];
  console.log("image---->",file)
  setAboutImage(file);
  };

 

  const handleSubmit = () => {
    const Heading = HeadingRef.current.value;
  
    if (!Heading) {
      alert('fill required fields');
      return;
    }
  
    try {
      const formData = new FormData();
      // const servicesArray = Array.from(quillText.matchAll(/<li>(.*?)<\/li>/g), match => match[1]);
      formData.append('heading', Heading);
      formData.append('subheading', subquillText);
      formData.append("titles", quillText)
      
      // Append each item of servicesArray separately
      // servicesArray.forEach((item, index) => {
      //   formData.append(`titles[${index}]`, item);
      // });
  
      formData.append('image', aboutImage);
  
      addToFirebase(API_PATHS.ADD_About, formData).then((res) => {
        alert('About added successfully');
        HeadingRef.current.value = '';
        setsubQuillText('');
        setQuillText('');
        setAboutImage('');
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
          <CustomTextField id="bl-title" placeholder="John Deo" fullWidth inputRef={HeadingRef} />
        </Grid>
        {/* 2 */}

        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-description">Subheading</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <ReactQuill
              value={subquillText}
              onChange={(value) => setsubQuillText(value)}
              placeholder="Subheading"
            />
          </Paper>
        </Grid>

        {/* 5 */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message">Image</CustomFormLabel>
        </Grid>

        <Grid item xs={12}>
          <CustomTextField id="bl-image" type="file" fullWidth onChange={handleChooseImage} />
        </Grid>
        <Grid item xs={12}>
          {aboutImage && aboutImage.url && (
            <img src={aboutImage.url} width={200} height={200} style={{ objectFit: 'contain' }} />
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
              placeholder="Services"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add About
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddAboutForm;
