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
import { API_URL, API_PATHS } from '../../../utils';

import { addToFirebase, uploadImageToFirebase } from '../../../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Quill.css';
// import './Quill.css';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import ParentCard from '../../shared/ParentCard';

const AddTeamForm = () => {
  const titleRef = useRef();
  const [link, setLink] = useState('');
  const [link2, setLink2] = useState('');
  const [link3, setLink3] = useState('');
  const [teamImage, setTeamImage] = useState('');
  const [quillText, setQuillText] = useState('');
  const desginationRef = useRef();

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

  const handleChooseImage = (e) => {
    const file = e.target.files[0];
  console.log("image---->",file)
    setTeamImage(file);
  };

  const handleSubmit = () => {
    const title = titleRef.current.value;
    const desgination = desginationRef.current.value;

    if (!title) {
      alert('fill required fields');
      return;
    }

    
   
   


    try {
     
      const formData = new FormData();

      formData.append('MemberName',title);
      formData.append('designation',desgination);
      formData.append('image',teamImage)
      formData.append('facebook',link)
      formData.append('twitter',link2)
      formData.append('instagram',link3)


      // console.log(data);

      addToFirebase(API_PATHS.ADD_TEAM, formData).then((res) => {
        alert('Team added successfully');
        titleRef.current.value = '';
        desginationRef.current.value = '';

        setQuillText('');
        setLink('');
        setTeamImage('');
        setLink('');
        setLink2('');
        setLink3('');
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
          <CustomTextField id="bl-title" placeholder="John Deo" fullWidth inputRef={titleRef} />
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
            fullWidth
            inputRef={desginationRef}
          />
        </Grid>
        {/* <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-description">Description</CustomFormLabel>
        </Grid> */}
        {/* <Grid item xs={12}>
          <Paper variant="outlined">
            <ReactQuill
              value={quillText}
              onChange={(value) => setQuillText(value)}
              placeholder="Description"
            />
          </Paper>
        </Grid> */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-title" sx={{ mt: 5 }}>
            Facebook Link
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

        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-title" sx={{ mt: 5 }}>
            Twitter Link
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            value={link2}
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            onChange={(e) => setLink2(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-title" sx={{ mt: 5 }}>
            Instagram Link
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            value={link3}
            id="bl-title"
            placeholder="John Deo"
            fullWidth
            onChange={(e) => setLink3(e.target.value)}
          />
        </Grid>



        <Grid item xs={12} mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Team
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddTeamForm;
