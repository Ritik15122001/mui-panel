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
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import ParentCard from '../../shared/ParentCard';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const handleChooseIcon = async (e) => {
    try {
      const iconURL = await uploadImageToFirebase('serviceIcon', e.target.files[0]);

      setIcon({
        name: e.target.files[0].name,
        type: e.target.files[0].type,
        size: e.target.files[0].size,
        url: iconURL,
      });
    } catch (err) {
      console.log(err);
    }

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
  };

  const handleSubmit = () => {
    try {
      const data = {
        title,
        serviceImage,
        icon,
        description: quillText,
        accordianDes: accordionDescription,
        accordionTitle,
        // accordionDescription,
      };

      // console.log(data);

      updateInFirebase(`services/${rows.key}`, data).then((res) => {
        alert('Service updated successfully');
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
        <Grid item xs={12} display="flex" alignItems="center">
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
        </Grid>
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message">Icon</CustomFormLabel>
        </Grid>

        <Grid item xs={12}>
          <CustomTextField id="bl-image" type="file" fullWidth onChange={handleChooseIcon} />
        </Grid>
        <Grid item xs={12}>
          {icon && icon.url && (
            <img src={icon.url} width={200} height={200} style={{ objectFit: 'contain' }} />
          )}
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
          {serviceImage && serviceImage.url && (
            <img src={serviceImage.url} width={200} height={200} style={{ objectFit: 'contain' }} />
          )}
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
          <CustomFormLabel htmlFor="bl-accordion"></CustomFormLabel>
        </Grid>

        <Grid item xs={12} display="flex" alignItems="center">
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

export default UpdateServices;
