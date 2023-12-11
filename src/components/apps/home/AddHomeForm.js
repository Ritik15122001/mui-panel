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
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomOutlinedInput from '../../forms/theme-elements/CustomOutlinedInput';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import { addToFirebase, uploadImageToFirebase } from '../../../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddHomeForm = () => {
  const urlRef = useRef();
  const [carouselImage, setCarouselImage] = useState('');

  const handleChooseImage = async (e) => {
    try {
      const imageURL = await uploadImageToFirebase('homeImage', e.target.files[0]);

      setCarouselImage({
        name: e.target.files[0].name,
        type: e.target.files[0].type,
        size: e.target.files[0].size,
        url: imageURL,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = () => {
    const urlLink = urlRef.current.value;

    if (!urlLink) {
      alert('fill required fields');
      return;
    }

    try {
      const data = {
        carouselImage,
        imageLink: urlLink,
      };

      // console.log(data);

      addToFirebase('home', data).then((res) => {
        alert('Carousel added successfully');
        (urlRef.current.value = ''), setCarouselImage('');
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
            Link
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField id="bl-title" placeholder="John Deo" fullWidth inputRef={urlRef} />
        </Grid>
        {/* 2 */}

        {/* 3 */}

        {/* 4 */}

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
          {carouselImage && carouselImage.url && (
            <img
              src={carouselImage.url}
              width={200}
              height={200}
              style={{ objectFit: 'contain' }}
              loading="lazy"
            />
          )}
        </Grid>

        <Grid item xs={12} mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Carousel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddHomeForm;
