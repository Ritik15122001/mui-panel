import {
  Grid,
  InputAdornment,
  Button,
  MenuItem,
  Paper,
  Autocomplete,
  TextField,
} from '@mui/material';
import React, { useRef, useState,useEffect } from 'react';

import { addToFirebase, uploadImageToFirebase } from '../../../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Quill.css';
// import './Quill.css';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import ParentCard from '../../shared/ParentCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { readFirebasebyId } from '../../../firebase';
import { API_PATHS,API_URL } from '../../../utils';

const PreviewAbout = () => {
  //   const titleRef = useRef();
  const location = useLocation();
  const rows = location.state.row;
  const navigate = useNavigate();
  const [title, setTitle] = useState(rows.title);
  const [aboutImage, setAboutImage] = useState(rows.aboutImage);
  const [quillText, setQuillText] = useState(rows.description);
  const [data, setData] = useState({
    heading: "",
    subheading: "",
    image: "",
    titles:"",
});

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

  // const handleChooseImage = async (e) => {
  //   try {
  //     const imageURL = await uploadImageToFirebase('aboutImages', e.target.files[0]);

  //     setAboutImage({
  //       name: e.target.files[0].name,
  //       type: e.target.files[0].type,
  //       size: e.target.files[0].size,
  //       url: imageURL,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }

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
 // };

 const handleSubmit = () => {
  navigate('/apps/home/view');
};

  const imageid = rows._id

  const handleData = async (imageid) => {
    // console.log("rowid---->"+imageid);

    try {
      const result = await readFirebasebyId(API_PATHS.ADD_About + "/" + imageid);
      setData({
        heading: result.data.heading,
        subheading: result.data.subheading,
        image: result.data.image,
        titles: result.data.titles
        // Set other fields as needed
    });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
   
  };

console.log("titles---->",data.titles)
  useEffect(() => {
    handleData(imageid);
  }, []);

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
          <CustomTextField
            disabled
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            value={data.heading}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        {/* 2 */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-description">SubHeading</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <ReactQuill
            readOnly
              value={data.subheading}
              onChange={(value) => setQuillText(value)}
              placeholder="Description"
            />
          </Paper>
        </Grid>
        {/* 5 */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message">Image</CustomFormLabel>
        </Grid>

        {/* <Grid item xs={12}>
          <CustomTextField id="bl-image" type="file" fullWidth onChange={handleChooseImage} />
        </Grid> */}
        <Grid item xs={12}>
      
            <img src={`${API_URL}/${data.image.filename}`} width={200} height={200} style={{ objectFit: 'contain' }} />
          
        </Grid>

        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-description">Services</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <ReactQuill
              value={data.titles}
              onChange={(value) => setQuillText(value)}
              placeholder="Description"
              readOnly
            />
          </Paper>
        </Grid>

        <Grid item xs={12} mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Done
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PreviewAbout;
