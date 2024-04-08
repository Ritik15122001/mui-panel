import {
  Grid,
  InputAdornment,
  Button,
  MenuItem,
  Paper,
  Autocomplete,
  TextField,
} from '@mui/material';
import React, { useRef, useState,useEffect} from 'react';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomOutlinedInput from '../../forms/theme-elements/CustomOutlinedInput';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import { addToFirebase, updateInFirebase, uploadImageToFirebase } from '../../../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../../utils';
import { readFirebasebyId } from '../../../firebase';
import { API_URL } from '../../../utils';


const PreviewHome = () => {
  // const urlRef = useRef();
  const location = useLocation();
  const rows = location.state.row;
  const navigate = useNavigate();
  const [url, setUrl] = useState(rows.imageLink);
  const [carouselImage, setCarouselImage] = useState(rows.carouselImage);
  const [quillText, setQuillText] = useState('');
  const [data, setData] = useState({
    heading: "",
    subheading: "",
    image: ""
});

  // const handleChooseImage = async (e) => {
  //   try {
  //     const imageURL = await uploadImageToFirebase('homeImagess', e.target.files[0]);

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
    navigate('/apps/home/view');
  };

    const heroimageid = rows._id

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

 
console.log("heading---->",data.heading)
  
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
            onChange={(e) => setUrl(e.target.value)}
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
        {/* 3 */}

        {/* 4 */}

        {/* 5 */}


        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message">Image</CustomFormLabel>
        </Grid>

        {/* <Grid item xs={12}>
            <CustomTextField id="bl-image" type="file" fullWidth onChange={handleChooseImage} />
           
          </Grid> */}
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
            Done
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PreviewHome;
