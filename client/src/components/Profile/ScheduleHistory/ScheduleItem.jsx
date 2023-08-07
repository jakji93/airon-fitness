import { Paper, Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import ScheduleDetails from './ScheduleDetails';

export default function ScheduleItem({ details, token }) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setShowDetails(false);
  }, [token]);

  const getDateString = () => {
    const dateObject = new Date(details.createdAt);

    return dateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getCustomInputString = () => {
    if (details.inputs.length !== 0) {
      let inputString = 'Custom Input: ';

      details.inputs.forEach((i, idx) => {
        inputString += i;
        if (idx !== details.inputs.length) inputString += ', ';
      });

      return inputString;
    }
    return 'No custom inputs';
  };

  return (
    <Grid item xs={12} lg={6} sx={{ margin: '8px 0' }}>
      <Paper
        elevation={3}
        sx={{
          width: '100%', height: '100px', cursor: 'pointer', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}
        onClick={() => setShowDetails(!showDetails)}
        aria-expanded={showDetails}
      >
        <Box>
          Generated { Object.values(details.schedule)[0].breakfast ? 'Meal Schedule' : 'Workout Schedule' } on {getDateString()}
        </Box>
        <Box sx={{ marginTop: '8px' }}>
          {getCustomInputString()}
        </Box>
      </Paper>
      {
        showDetails
          ? (
            <Box sx={{
              width: '100%', backgroundColor: '#d3d3d3', borderRadius: '0px 0 20px 20px', padding: '20px',
            }}
            >
              {
                details
                  ? Object.values(details.schedule).map((s, idx) => <ScheduleDetails key={`details-${idx + 1}`} details={s} day={idx} token={token} />)
                  : ''
              }
            </Box>
          ) : ''
      }
    </Grid>
  );
}

ScheduleItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  details: PropTypes.object.isRequired,
  token: PropTypes.number.isRequired,
};
