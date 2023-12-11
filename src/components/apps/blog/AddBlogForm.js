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
import './Quill.css';

const AddBlogForm = () => {
  const titleRef = useRef();
  const [category, setCategory] = useState(1);
  const authorRef = useRef();
  const [blogDate, setBlogDate] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [authorImage, setAuthorImage] = useState('');
  const [quillText, setQuillText] = useState('');
  const [authorQuillText, setAuthorQuillText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

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
      const imageURL = await uploadImageToFirebase('blogImages', e.target.files[0]);

      setBlogImage({
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
  const handleChooseAuthorImage = async (e) => {
    try {
      const imagesURL = await uploadImageToFirebase('authorImages', e.target.files[0]);

      setAuthorImage({
        name: e.target.files[0].name,
        type: e.target.files[0].type,
        size: e.target.files[0].size,
        url: imagesURL,
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
    const author = authorRef.current.value;

    if (!title || !author || !category || !blogDate) {
      alert('fill required fields');
      return;
    }

    try {
      const data = {
        title,
        author,
        category,
        blogDate,
        comments: [],
        blogImage,
        authorImage,
        description: quillText,
        authorDescription: authorQuillText,
        tags: selectedTags,
      };

      // console.log(data);

      addToFirebase('blogs', data).then((res) => {
        alert('Blog posted successfully');
        titleRef.current.value = '';
        authorRef.current.value = '';
        setQuillText('');
        setAuthorImage('');
        setAuthorQuillText('');
        setCategory('');
        setBlogImage('');
        setBlogDate(null);
        setSelectedTags([]);
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
        <Grid item xs={12} alignItems="center">
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
            <MenuItem value={'Business'}>Business</MenuItem>
            <MenuItem value={'Development'}>Development</MenuItem>
            <MenuItem value={'Consulting'}>Consulting</MenuItem>
            <MenuItem value={'Corporate'}>Corporate</MenuItem>
            <MenuItem value={'Design'}>Design</MenuItem>
            <MenuItem value={'Fashion'}>Fashion</MenuItem>
            <MenuItem value={'Marketing'}>Marketing</MenuItem>
          </CustomSelect>
        </Grid>

        {/* 3 */}

        {/* 4 */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-phone">Date</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            value={blogDate}
            type="date"
            id="fs-date"
            placeholder="John Deo"
            fullWidth
            onChange={(e) => setBlogDate(e.target.value)}
          />
        </Grid>
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
          {blogImage && blogImage.url && (
            <img
              src={blogImage.url}
              width={200}
              height={200}
              style={{ objectFit: 'contain' }}
              loading="lazy"
            />
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

        <Grid item xs={12} display="flex" alignItems="center">
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
        </Grid>
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-author">Author name</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField id="bl-author" inputRef={authorRef} placeholder="John Deo" fullWidth />
        </Grid>
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message">Author Image</CustomFormLabel>
        </Grid>

        <Grid item xs={12}>
          <CustomTextField id="bl-image" type="file" fullWidth onChange={handleChooseAuthorImage} />
          {/* <Button onClick={async () => console.log(await uploadImageToFirebase(blogImage))}>
            Upload
          </Button> */}
        </Grid>
        <Grid item xs={12}>
          {authorImage && authorImage.url && (
            <img
              src={authorImage.url}
              width={200}
              height={200}
              style={{ objectFit: 'contain' }}
              loading="lazy"
            />
          )}
        </Grid>
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-description">Author Description</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <ReactQuill
              value={authorQuillText}
              onChange={(value) => setAuthorQuillText(value)}
              placeholder="Description"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Post
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddBlogForm;
