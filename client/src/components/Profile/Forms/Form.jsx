import {
  Paper, Typography, Grid, InputLabel, TextField, FormControl, Select, MenuItem, Button,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FormInput from './FormInput';

export default function Form() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const categories = [
    'science',
    'sports',
    'business',
    'politics',
    'entertainment',
    'technology',
    'world',
    'all',
  ];
  return (

    <Paper elevation={3} sx={{ marginRight: '15%', marginLeft: '15%' }}>
      <Box sx={{ padding: 5 }}>
        <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
          Update Basic Profile
        </Typography>
        <Grid container spacing={3}>
          <FormInput
            id="first-name"
            label="First Name"
            half
          />
          <FormInput
            id="last-name"
            label="Last Name"
            half
          />
          <Grid item xs={12} sm={2}>
            <InputLabel
              sx={{
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 700,
              }}
            >
              Content
            </InputLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <TextField
              id="outlined-multiline-static"
              label="Content"
              multiline
              fullWidth
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <InputLabel
              sx={{
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 700,
              }}
            >
              URL
            </InputLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <TextField
              required
              id="url"
              name="url"
              label="URL"
              fullWidth
              size="small"
              autoComplete="off"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <InputLabel
              sx={{
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 700,
              }}
            >
              Category
            </InputLabel>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                {categories.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <InputLabel
              sx={{
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 700,
              }}
            >
              Author
            </InputLabel>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="author"
              name="author"
              label="Author"
              fullWidth
              size="small"
              autoComplete="off"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <InputLabel
              sx={{
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 700,
              }}
            >
              Img Upload
            </InputLabel>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button>
              <UploadFileIcon />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} />
          <Grid item xs={12} sm={5} />
          <Grid item xs={12} sm={4}>
            <Button variant="contained" sx={{ color: '#ff781f' }}>
              Save
            </Button>
          </Grid>
          <Grid item xs={12} sm={5} />
        </Grid>
      </Box>
    </Paper>

  );
}
