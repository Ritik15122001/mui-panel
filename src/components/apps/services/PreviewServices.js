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

import { addToFirebase, readFirebasebyId, uploadImageToFirebase } from '../../../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Quill.css';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import ParentCard from '../../shared/ParentCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_PATHS,API_URL } from '../../../utils';

const PreviewServices = () => {
  const location = useLocation();
  const rows = location.state.row;
  // console.log('rows-->', rows);
  const navigate = useNavigate();
  // const titleRef = useRef();
  const [title, setTitle] = useState(rows.title);
  const [serviceImage, setServiceImage] = useState(rows.serviceImage);
  const [icon, setIcon] = useState(rows.icon);
  const [quillText, setQuillText] = useState(rows.description);
  const [accordionDescription, setAccordianDescription] = useState(rows.accordianDes);
  // const accordionTitleRef = useRef();
  const [accordianTitle, setAccordianTitle] = useState(rows.accordionTitle);
  const [data, setData] = useState({ 
    services:"",
    image: "",
});

  const handleChooseImage = async (e) => {
    try {
      const imageURL = await uploadImageToFirebase('serviceImages', e.target.files[0]);

      setServiceImage({
        name: e.target.files[0].name,
        type: e.target.files[0].type,
        size: e.target.files[0].size,
        url: imageURL,
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log("service------>",data.services)

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
  

  const handleSubmit = () => {
    navigate('/apps/services/view');
  };

  const servicesid = rows._id

  console.log("serviceid---->",servicesid)

  const handleData = async (servicesid) => {
    try {
      const result = await readFirebasebyId(API_PATHS.ADD_Services + "/" + servicesid);
    
      setData({
        services: result.data.services,
        image: result.data.image,      
      });

      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    handleData(servicesid);
  }, []);


console.log("services---------->",data.services)
  
  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Layout */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <Grid container>
        {/* 1 */}
       
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-description">Description</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
           <ReactQuill
            readOnly
            value={data.services}
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

       

        <Grid item xs={12} mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Done
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PreviewServices;
