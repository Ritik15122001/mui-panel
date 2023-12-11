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
import { addToFirebase, updateInFirebase, uploadImageToFirebase } from '../../../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Quill.css';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateBlog = () => {
  // const titleRef = useRef();
  const location = useLocation();
  const rows = location.state.row;
  // console.log('rows', rows);
  const navigate = useNavigate();
  const [title, setTitle] = useState(rows.title);
  const [category, setCategory] = useState(rows.category);
  // const authorRef = useRef();
  const [author, setAuthor] = useState(rows.author);
  const [blogDate, setBlogDate] = useState(rows.blogDate);
  const [blogImage, setBlogImage] = useState(rows.blogImage);
  const [authorImage, setAuthorImage] = useState(rows.authorImage);
  const [quillText, setQuillText] = useState(rows.description);
  const [authorQuillText, setAuthorQuillText] = useState(rows.authorDescription);
  const [selectedTags, setSelectedTags] = useState(rows.tags);

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
  };

  const handleSubmit = () => {
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

      updateInFirebase(`blogs/${rows.key}`, data).then((res) => {
        alert('Blog posted successfully');
        navigate('/apps/blog/posts');
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
          <CustomTextField
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        {/* <Grid item xs={12} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="bl-category">Category</CustomFormLabel>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              disabled
              id="bl-category"
              placeholder="John Deo"
              fullWidth
              value={category}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid> */}
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
          <CustomTextField
            id="bl-author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="John Deo"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message">Author Image</CustomFormLabel>
        </Grid>

        <Grid item xs={12}>
          <CustomTextField id="bl-image" type="file" fullWidth onChange={handleChooseAuthorImage} />
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
            Update
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdateBlog;
