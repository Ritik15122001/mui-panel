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

const AddAboutForm = () => {
  const titleRef = useRef();

  const [aboutImage, setAboutImage] = useState('');
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

  const handleChooseImage = async (e) => {
    try {
      const imageURL = await uploadImageToFirebase('aboutImages', e.target.files[0]);

      setAboutImage({
        name: e.target.files[0].name,
        type: e.target.files[0].type,
        size: e.target.files[0].size,
        url: imageURL,
      });
    } catch (err) {
      console.log(err);
    }

    // console.log(e.target.files[0]);
    // const imgUrl = e.target.files[0];
    // const url = await getbase64(e.target.files[0]);
    // setBlogImage({
    //   name: e.target.files[0].name,
    //   type: e.target.files[0].type,
    //   size: e.target.files[0].size,
    //   url,
    // });
    // setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = () => {
    const title = titleRef.current.value;

    if (!title) {
      alert('fill required fields');
      return;
    }

    try {
      const data = {
        title,
        aboutImage,
        description: quillText,
      };

      // console.log(data);

      addToFirebase('about', data).then((res) => {
        alert('About added successfully');
        titleRef.current.value = '';

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
            Title
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField id="bl-title" placeholder="John Deo" fullWidth inputRef={titleRef} />
        </Grid>
        {/* 2 */}

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
            Add Project
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddAboutForm;
