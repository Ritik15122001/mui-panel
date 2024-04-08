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
const UpdateAbout = () => {
  // const titleRef = useRef();
  const location = useLocation();
  const rows = location.state.row;
  const navigate = useNavigate();
  const [title, setTitle] = useState(rows.title);
  const [servicesTitles, SetServicesTitles]= useState([]);

  const [aboutImage, setAboutImage] = useState(rows.aboutImage);
  const [quillText, setQuillText] = useState(rows.description);
  const [data, setData] = useState({
    heading: "",
    subheading: "",
    image: "",
    titles:"",
});

  // const getbase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fr = new FileReader();

  //     // console.log(file instanceof Blob); // should be true

  //     fr.readAsDataURL(file);
  //     fr.onerror = reject;
  //     fr.onload = function () {
  //       resolve(fr.result);
  //     };
  //   });
  // };

  
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
    ...prev, titles: value
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
      const result = await readFirebasebyId(API_PATHS.ADD_About + "/" + imageid);
      setData({
        heading: result.data.heading,
        subheading: result.data.subheading,
        image: result.data.image,
        titles: result.data.titles,
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
     
      formData.append('heading', data.heading);
      formData.append('subheading', data.subheading);
      formData.append('image', data.image);
      formData.append('titles',data.titles)
     
  
      updateInFirebase(API_PATHS.ADD_About + "/" + rows._id, formData).then(() => {
        alert('About updated successfully');
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

        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-description">Services</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
          <ReactQuill
          value={data.titles}
            onChange={(value) => handleChangeTitle(value)}
          placeholder="Description"
/>

          </Paper>
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

export default UpdateAbout;
