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

  const [data, setData] = useState({
    MemberName: "",
    designation: "",
    image: "",
    facebook:"",
    twitter:"",
    instagram:""
});


const handleChangeName = (e) => {
  setData({
    ...data,
    MemberName: e.target.value
  });
};

const handleChangeDesignation = (e) => {
  setData({
    ...data,
    designation: e.target.value
  });
};

const handleChangefacebook = (e) => {
  setData({
    ...data,
    facebook: e.target.value
  });
};

const handleChangeinstagram = (e) => {
  setData({
    ...data,
    instagram: e.target.value
  });
};

const handleChangetwitter = (e) => {
  setData({
    ...data,
    twitter: e.target.value
  });
};



const handleChooseImage = (e) => {
  const file = e.target.files[0];
console.log("image---->",file)
// setCarouselImage(file);
setData(prev => ({...prev,
  image:file
})); 

};

const heroimageid = rows._id;
  const handleData = async (heroimageid) => {
    // console.log("rowid---->"+heroimageid);

    try {
      const result = await readFirebasebyId(API_PATHS.ADD_TEAM + "/" + heroimageid);
      setData({
        MemberName: result.data.MemberName,
        designation: result.data.designation,
        image: result.data.image,
        facebook:result.data.facebook,
        twitter:result.data.twitter,
        instagram:result.data.instagram,
    });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    handleData(heroimageid);
  }, []);


  const handleSubmit = () => {
    try {
      const formData = new FormData();

      formData.append('MemberName',data.MemberName);
      formData.append('designation',data.designation);
      formData.append('image',data.image)
      formData.append('facebook',data.facebook)
      formData.append('instagram',data.instagram)
      formData.append('twitter',data.twitter)


      // console.log(data);

      updateInFirebase(API_PATHS.ADD_TEAM+"/"+`${heroimageid}`,formData).then((res) => {
        alert('Carousel updated successfully');
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
            value={data.MemberName}
            onChange={(e) => handleChangeName(e)}
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
          {data.image  && (
            <img   src={`${API_URL}/${data.image.filename}`} width={200} height={200} style={{ objectFit: 'contain' }} />
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
            value={data.designation}
            onChange={(e) => handleChangeDesignation(e)}
          />
        </Grid>
        {/* <Grid item xs={12} display="flex" alignItems="center">
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
        </Grid> */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-title" sx={{ mt: 0 }}>
            Facebook Link
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            value={data.facebook}
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            onChange={(e) => handleChangefacebook(e)}
          />
        </Grid>

        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-title" sx={{ mt: 0 }}>
            Instagram Link
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            value={data.instagram}
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            onChange={(e) => handleChangeinstagram(e)}
          />
        </Grid>

        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-title" sx={{ mt: 0 }}>
            Twitter Link
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            value={data.twitter}
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            onChange={(e) => handleChangetwitter(e)}
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
