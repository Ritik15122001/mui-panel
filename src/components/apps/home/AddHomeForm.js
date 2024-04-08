import {
  Grid,
  InputAdornment,
  Button,
  MenuItem,
  Paper,
  Autocomplete,
  TextField,
} from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomOutlinedInput from '../../forms/theme-elements/CustomOutlinedInput';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import { addToFirebase, uploadImageToFirebase, readFirebase } from '../../../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { API_URL,API_PATHS } from '../../../utils';

const AddHomeForm = () => {
  const urlRef = useRef();
  
  const [carouselImage, setCarouselImage] = useState('');
  const [carouselItemCount, setCarouselItemCount] = useState(0);
  const [quillText, setQuillText] = useState('');
  useEffect(() => {
    const fetchCarouselItemCount = async () => {
      try {
        const existingItems = await readFirebase('/apps/home');
        console.log(existingItems)
        setCarouselItemCount(existingItems.length);
      } catch (error) {
        console.error('Error fetching carousel items:', error);
      }
    };

    fetchCarouselItemCount();
  }, []);



  const handleChooseImage = (e) => {
    const file = e.target.files[0];
  console.log("image---->",file)
  setCarouselImage(file);
  };

  const handleSubmit = () => {
    const heading = urlRef.current.value;


    if (!heading) {
      alert('fill required fields');
      return;
    }
   
   


    try {
     
      const formData = new FormData();

      formData.append('heading',heading);
      formData.append('subheading',quillText);
      formData.append('image',carouselImage)

      // console.log(data);

      addToFirebase(API_PATHS.ADD_HEROIMG, formData).then((res) => {
        alert('HeroImage added successfully');
        heading.current.value = '';
        setQuillText('');
        setCarouselImage('');
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
          <CustomTextField id="bl-title" placeholder="John Deo" fullWidth inputRef={urlRef} />
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
            <img src={carouselImage.url} width={200} height={200} style={{ objectFit: 'contain' }} />
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
