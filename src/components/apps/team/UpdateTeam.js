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

const UpdateTeam = () => {
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

  const handleChooseImage = async (e) => {
    try {
      const imageURL = await uploadImageToFirebase('teamImages', e.target.files[0]);

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
    try {
      const data = {
        name: title,
        teamImage,
        description: quillText,
        desgination,
        link,
      };

      // console.log(data);

      updateInFirebase(`team/${rows.key}`, data).then((res) => {
        alert('Team updated successfully');
        navigate('/apps/team/view');
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
          <CustomTextField
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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
          {teamImage && teamImage.url && (
            <img src={teamImage.url} width={200} height={200} style={{ objectFit: 'contain' }} />
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
            value={desgination}
            onChange={(e) => setDesgination(e.target.value)}
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
            LinkedIn Link
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            value={link}
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            onChange={(e) => setLink(e.target.value)}
          />
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

export default UpdateTeam;
