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
import { API_PATHS,API_URL } from '../../../utils';
import { readFirebasebyId } from '../../../firebase';

const UpdateWork = () => {
  const location = useLocation();
  const rows = location.state.row;
  const navigate = useNavigate();
  // const titleRef = useRef();
  const [title, setTitle] = useState(rows.title);
  const [category, setCategory] = useState(rows.category);
  const [workImage, setWorkImage] = useState(rows.workImage);
  const [description, setDescription] = useState(rows.description);
  const [quillText, setQuillText] = useState(rows.projectDescription);
  const [workDate, setWorkDate] = useState(rows.workDate);

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


const handleChangeHeading = (e) => {
  setData({
    ...data,
    heading: e.target.value
  });
};

const handleChangeSubheading = (value) => {
  setData({
    ...data,
    subheading: value
  });
};

const handleChooseImage = (e) => {
  const file = e.target.files[0];
console.log("image---->",file)
// setCarouselImage(file);
setData(prev => ({...prev,
  image:file
})); 
}


const heroimageid = rows._id;
  const handleData = async (heroimageid) => {
    // console.log("rowid---->"+heroimageid);

    try {
      const result = await readFirebasebyId(API_PATHS.ADD_work + "/" + heroimageid);
      setData({
        heading: result.data.heading,
        subheading: result.data.subheading,
        image: result.data.image
        // Set other fields as needed
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

      formData.append('heading',data.heading);
      formData.append('subheading',data.subheading);
      formData.append('image',data.image)


      // console.log(data);

      updateInFirebase(API_PATHS.ADD_work+"/"+`${heroimageid}`,formData).then((res) => {
        alert('Carousel updated successfully');
        navigate('/apps/work/view');
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
          <CustomTextField
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            value={data.heading}
            onChange={(e) =>handleChangeHeading(e)}
          />
        </Grid>
        {/* 2 */}
        {/* 5 */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message">Image</CustomFormLabel>
        </Grid>

        <Grid item xs={12}>
          <CustomTextField id="bl-image" type="file" fullWidth onChange={handleChooseImage} />
        </Grid>
        <Grid item xs={12}>
       
            <img src={`${API_URL}/${data.image.filename}`} width={200} height={200} style={{ objectFit: 'contain' }} />
      
        </Grid>
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-description">subheading</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <ReactQuill
             value={data.subheading}
             onChange={(value) => handleChangeSubheading(value)}
              placeholder="Description"
            />
          </Paper>
        </Grid>

        {/* <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-accordion"></CustomFormLabel>
        </Grid> */}

     

        <Grid item xs={12} mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};


export default UpdateWork;
