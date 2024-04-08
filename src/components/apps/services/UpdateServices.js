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
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import ParentCard from '../../shared/ParentCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { readFirebasebyId } from '../../../firebase';
import { API_URL,API_PATHS } from '../../../utils';

const UpdateServices = () => {
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
  const [accordionTitle, setAccordionTitle] = useState(rows.accordionTitle);
  const [data, setData] = useState({
    services:"",
    image: "",
    
});

const handleChangeTitle = (value) => {
  // Split the HTML content into separate list items
  // let servicesArray = Array.from(value.matchAll(/<p>(.*?)<\/p>/g), match => match[1]);
  // servicesArray = servicesArray.map((item) => item.replace(/^\d+\.\s*/, ''))
  // console.log("val-->", servicesArray);

  // const tempDiv = document.createElement('div');
  // tempDiv.innerHTML = value;

  // // Extract the text content of the list items
  // const titles = Array.from(tempDiv.querySelectorAll('li'))
  //   .map(li => li.textContent.trim().replace(/^\d+\.\s*/, ''))
  //   .filter(title => title !== '');
  setData(prev => ({
    ...prev, services: value
  }))
};

const handleChooseImage = (e) => {
  const file = e.target.files[0];
console.log("image---->",file)
// setCarouselImage(file);
setData(prev => ({...prev,
  image:file
})); 
};


  const imageid = rows._id
  const handleData = async (imageid) => {
    // console.log("rowid---->"+imageid);

    try {
      const result = await readFirebasebyId(API_PATHS.ADD_Services + "/" + imageid);
      setData({
        services: result.data.services,
        image: result.data.image,
       
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







  const handleSubmit = () => {
    try {

      const formData = new FormData();
    
      // Append each item of servicesArray separately

      formData.append('services', data.services);
      formData.append('image', data.image);
 
     
  
      updateInFirebase(API_PATHS.ADD_Services + "/" + rows._id, formData).then(() => {
        alert('About updated successfully');
        navigate('/apps/services/view');
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
        {/* <Grid item xs={12} display="flex" alignItems="center">
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
        </Grid> */}
        {/* <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message">Icon</CustomFormLabel>
        </Grid> */}

        {/* <Grid item xs={12}>
          <CustomTextField id="bl-image" type="file" fullWidth onChange={handleChooseIcon} />
        </Grid> */}
        {/* <Grid item xs={12}>
          {icon && icon.url && (
            <img src={icon.url} width={200} height={200} style={{ objectFit: 'contain' }} />
          )}
        </Grid> */}
        {/* 2 */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-description">services</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <ReactQuill
              value={data.services}
              onChange={(value) => handleChangeTitle(value)}
              placeholder="Description"
            />
          </Paper>
        </Grid>
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

      

        {/* <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-accordion"></CustomFormLabel>
        </Grid> */}

        {/* <Grid item xs={12} display="flex" alignItems="center">
          <ParentCard title="Accordion Fields">
            <Grid container sx={{ mt: -3 }}>
              <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="bl-accordion-title">Accordion Title</CustomFormLabel>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  id="bl-accordion-title"
                  placeholder="John Deo"
                  fullWidth
                  value={accordionTitle}
                  onChange={(e) => setAccordionTitle(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="bl-description">Accordian Description</CustomFormLabel>
              </Grid>
              <Grid item xs={12}>
                <Paper variant="outlined">
                  <ReactQuill
                    value={accordionDescription}
                    onChange={(value) => setAccordianDescription(value)}
                    placeholder="Description"
                  />
                </Paper>
              </Grid>
            </Grid>
          </ParentCard>
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

export default UpdateServices;
