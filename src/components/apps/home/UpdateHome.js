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
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomOutlinedInput from '../../forms/theme-elements/CustomOutlinedInput';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import { addToFirebase, updateInFirebase, uploadImageToFirebase } from '../../../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { readFirebasebyId } from '../../../firebase';
import { API_PATHS,API_URL } from '../../../utils';

const UpdateHome = () => {
  // const urlRef = useRef();
  const location = useLocation();
  const rows = location.state.row;
  const navigate = useNavigate();
  const [Heading, setHeading] = useState("");
  const [quillText, setQuillText] = useState('');
  const [carouselImage, setCarouselImage] = useState(rows.carouselImage);
  const [data, setData] = useState({
    heading: "",
    subheading: "",
    image: ""
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
})); };
 const heroimageid = rows._id;
  const handleData = async (heroimageid) => {
    // console.log("rowid---->"+heroimageid);

    try {
      const result = await readFirebasebyId(API_PATHS.ADD_HEROIMG + "/" + heroimageid);
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


  // const handleChooseImage = async (e) => {
  //   try {
  //     const imageURL = await uploadImageToFirebase('homeImage', e.target.files[0]);

  //     setCarouselImage({
  //       name: e.target.files[0].name,
  //       type: e.target.files[0].type,
  //       size: e.target.files[0].size,
  //       url: imageURL,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSubmit = () => {
    try {
      const formData = new FormData();

      formData.append('heading',data.heading);
      formData.append('subheading',data.subheading);
      formData.append('image',data.image)


      // console.log(data);

      updateInFirebase(API_PATHS.ADD_HEROIMG+"/"+`${heroimageid}`,formData).then((res) => {
        alert('Carousel updated successfully');
        navigate('/apps/home/view');
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
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-description">SubHeading</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <ReactQuill     
              value={data.subheading}
              onChange={(value) => handleChangeSubheading(value)}
              placeholder="Subheading"
            />
          </Paper>
        </Grid>
        {/* 3 */}

        {/* 4 */}

        {/* 5 */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message">Image</CustomFormLabel>
        </Grid>

        <Grid item xs={12}>
          <CustomTextField id="bl-image" type="file" fullWidth  onChange={handleChooseImage} />
          {/* <Button onClick={async () => console.log(await uploadImageToFirebase(blogImage))}>
              Upload
            </Button> */}
        </Grid>
        <Grid item xs={12}>

            <img
              src={`${API_URL}/${data.image.filename}`}
              width={200}
              height={200}
              style={{ objectFit: 'contain' }}
              loading="lazy"
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

export default UpdateHome;



