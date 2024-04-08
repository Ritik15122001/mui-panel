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

const PreviewTeam = () => {
  const location = useLocation();
  const rows = location.state.row;
  const navigate = useNavigate();
  // const titleRef = useRef();
  const [title, setTitle] = useState(rows.name);
  const [link, setLink] = useState(rows.link);
  const [teamImage, setTeamImage] = useState(rows.teamImage);
  const [quillText, setQuillText] = useState(rows.description);
  
  // const desginationRef = useRef();
  const [desgination, setDesgination] = useState(rows.desgination);
  const [data, setData] = useState({ 
    MemberName:"",
    designation: "",
    image:"",
    facebook:"",
    instagram:"",
    twitter:""
});

  const handleChooseImage = async (e) => {
    try {
      const imageURL = await uploadImageToFirebase('teamImagess', e.target.files[0]);

      setTeamImage({
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
    navigate('/apps/team/view');
  };

 
  const teamid = rows._id

  const handleData = async (teamid) => {
    // console.log("rowid---->"+imageid);

    try {
      const result = await readFirebasebyId(API_PATHS.ADD_TEAM + "/" + teamid);
      setData({
        MemberName:result.data.MemberName,
        designation:result.data.designation,
        image: result.data.image,
        facebook:result.data.facebook,
        instagram:result.data.instagram,
        twitter:result.data.twitter,
       
    });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
   
  };

  
  useEffect(() => {
    handleData(teamid);
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
            Name
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            disabled
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            value={data.MemberName}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        {/* 2 */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="outlined-multiline-static">Desgination</CustomFormLabel>
        </Grid>

        <Grid item xs={12} display="flex" alignItems="center">
          <CustomTextField
            disabled
            id="outlined-multiline-static"
            placeholder="Modern"
            //   multiline
            //   rows={4}
            //   variant="outlined"
            value={data.designation}
            onChange={(e) => setDesgination(e.target.value)}
          />
        </Grid>
        {/* 5 */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message">Image</CustomFormLabel>
        </Grid>


        {/* <Grid item xs={12}>
            <CustomTextField id="bl-image" type="file" fullWidth onChange={handleChooseImage} />
           
          </Grid> */}
        <Grid item xs={12}>
         
            <img  src={`${API_URL}/${data.image.filename}`} width={200} height={200} style={{ objectFit: 'contain' }} />
         
        </Grid>
      
        {/* <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-description">Description</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <ReactQuill
              readOnly
              value={quillText}
              onChange={(value) => setQuillText(value)}
              placeholder="Description"
            />
          </Paper>
        </Grid> */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-title" sx={{ mt: 5 }}>
            FaceBook Link
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            disabled
            value={data.facebook}
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            onChange={(e) => setLink(e.target.value)}
          />
        </Grid>


        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-title" sx={{ mt: 5 }}>
            Instagram Link
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            disabled
            value={data.instagram}
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            onChange={(e) => setLink(e.target.value)}
          />
        </Grid>


        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-title" sx={{ mt: 5 }}>
            twitter Link
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            disabled
            value={data.twitter}
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            onChange={(e) => setLink(e.target.value)}
          />
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

export default PreviewTeam;
