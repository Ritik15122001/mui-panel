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

import { addToFirebase, updateInFirebase, uploadImageToFirebase } from '../../../firebase';
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

const PreviewWork = () => {
  const location = useLocation();
  const rows = location.state.row;
  const navigate = useNavigate();
  // const titleRef = useRef();
  const [title, setTitle] = useState(rows.title);
  const [category, setCategory] = useState(1);
  const [workImage, setWorkImage] = useState(rows.workImage);
  const [workDate, setWorkDate] = useState(rows.workDate);
  const [quillText, setQuillText] = useState(rows.projectDescription);
  // const projectTitleRef = useRef();
  const [author, setAuthor] = useState(rows.author);
  // const authorRef = useRef();
  const [place, setPlace] = useState(rows.place);
  // const placeRef = useRef();
  const [clientName, setClientName] = useState(rows.clientName);

  const [data, setData] = useState({
    heading: "",
    subheading: "",
    image: "",
});
  

  const handleChooseImage = async (e) => {
    try {
      const imageURL = await uploadImageToFirebase('workImagess', e.target.files[0]);

      setWorkImage({
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
    navigate('/apps/work/view');
  };


  const workid = rows._id

  const handleData = async (workid) => {
    // console.log("rowid---->"+workid);

    try {
      const result = await readFirebasebyId(API_PATHS.ADD_work + "/" + workid);
      setData({
        heading: result.data.heading,
        subheading: result.data.subheading,
        image: result.data.image,
     
        // Set other fields as needed
    });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
   
  };

  console.log("titles---->",data.titles)
  useEffect(() => {
    handleData(workid);
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
            Title
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
          <CustomFormLabel htmlFor="bl-description">Description</CustomFormLabel>
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

        {/* <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-accordion"></CustomFormLabel>
        </Grid>

        <Grid item xs={12} display="flex" alignItems="center">
          <ParentCard title="Project Information">
            <Grid container sx={{ mt: -3 }}>
              <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="bl-accordion-title">Client name</CustomFormLabel>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  disabled
                  id="bl-accordion-title"
                  placeholder="John Deo"
                  fullWidth
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </Grid> */}

              {/* <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="outlined-multiline-static">Category</CustomFormLabel>
              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <CustomTextField
                  disabled
                  id="outlined-multiline-static"
                  placeholder="Modern"
                  //   multiline
                  //   rows={4}
                  //   variant="outlined"
                  fullWidth
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="outlined-multiline-static">Author</CustomFormLabel>
              </Grid> */}

              {/* <Grid item xs={12} display="flex" alignItems="center">
                <CustomTextField
                  disabled
                  id="outlined-multiline-static"
                  placeholder="Modern"
                  //   multiline
                  //   rows={4}
                  //   variant="outlined"
                  fullWidth
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="outlined-multiline-static">Place</CustomFormLabel>
              </Grid> */}

              {/* <Grid item xs={12} display="flex" alignItems="center">
                <CustomTextField
                  disabled
                  id="outlined-multiline-static"
                  placeholder="Modern"
                  //   multiline
                  //   rows={4}
                  //   variant="outlined"
                  fullWidth
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
              </Grid> */}
              {/* <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="bl-phone">Date</CustomFormLabel>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  disabled
                  value={workDate}
                  type="date"
                  id="fs-date"
                  placeholder="21-11-2023"
                  fullWidth
                  onChange={(e) => setWorkDate(e.target.value)}
                />
              </Grid>
            </Grid>
          </ParentCard>
        </Grid> */}

        <Grid item xs={12} mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Done
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PreviewWork;
