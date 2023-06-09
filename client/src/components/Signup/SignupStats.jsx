import {
  Box, Typography, Grid, Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { experienceLevels } from '../../utils/userUtils';
import FormSelect from '../Profile/Forms/FormSelect';
import FormTextFieldWithRadio from '../Profile/Forms/FormTextWithRadio';

export default function SignupStats({ updateUser, nextStage }) {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [experience, setExperience] = useState('');
  const handleSubmit = (e) => {
    updateUser({});
    nextStage(e);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Lastly, let&apos;s get some stats
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormSelect
              id="experience"
              label="Experience"
              showTitleLabel={false}
              options={experienceLevels}
              setValue={setExperience}
              value={experience}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex' }}>
            <FormTextFieldWithRadio
              id="weight"
              label="Weight"
              showTitleLabel={false}
              value={weight}
              setValue={setWeight}
              type="number"
              radioGroups={['lb', 'kg']}
            />
            <FormTextFieldWithRadio
              id="height"
              label="Height"
              showTitleLabel={false}
              value={height}
              setValue={setHeight}
              type="number"
              radioGroups={['cm', 'in']}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}

SignupStats.propTypes = {
  nextStage: PropTypes.func,
  updateUser: PropTypes.func,
};

SignupStats.defaultProps = {
  nextStage: null,
  updateUser: null,
};
