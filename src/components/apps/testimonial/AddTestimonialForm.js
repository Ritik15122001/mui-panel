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
import Testimonial from './../../landingpage/testimonial/Testimonial';

const AddTestimonialForm = () => {
  const titleRef = useRef();
  const [rating, setRating] = useState('');
  const [reviewerImage, setReviewerImage] = useState('');
  const [quillText, setQuillText] = useState('');
  const desginationRef = useRef();

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
      const imageURL = await uploadImageToFirebase('reviewerImage', e.target.files[0]);

      setReviewerImage({
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
    const desgination = desginationRef.current.value;

    if (!title) {
      alert('fill required fields');
      return;
    }

    try {
      const data = {
        name: title,
        reviewerImage,
        description: quillText,
        desgination,
        rating,
        // clientName,
        // projectCategory,
        // author,
        // place,
        // tag,
      };

      // console.log(data);

      addToFirebase('testimonial', data).then((res) => {
        alert('Testimonial added successfully');
        titleRef.current.value = '';
        desginationRef.current.value = '';
        // clientNameRef.current.value = '';
        // projectCategoryRef.current.value = '';
        // authorRef.current.value = '';
        // placeRef.current.value = '';
        // tag.current.value = '';

        setQuillText('');
        setReviewerImage('');
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
            Name
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
          {/* <Button onClick={async () => console.log(await uploadImageToFirebase(blogImage))}>
                  Upload
                </Button> */}
        </Grid>
        <Grid item xs={12}>
          {reviewerImage && reviewerImage.url && (
            <img
              src={reviewerImage.url}
              width={200}
              height={200}
              style={{ objectFit: 'contain' }}
            />
          )}
        </Grid>
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="outlined-multiline-static">Desgination</CustomFormLabel>
        </Grid>

        <Grid item xs={12} display="flex" alignItems="center">
          <CustomTextField
            id="outlined-multiline-static"
            placeholder="Modern"
            //   multiline
            //   rows={4}
            //   variant="outlined"
            fullWidth
            inputRef={desginationRef}
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
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-title" sx={{ mt: 0 }}>
            Rating
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
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

        <Grid item xs={12} mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Testimonial
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddTestimonialForm;
