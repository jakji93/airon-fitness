import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function ScheduleDetails({ details, day }) {
  const getContent = (content, idx) => {
    if (typeof content[1] === 'object') {
      return (
        <p key={`details-${idx}`}>
          {`${content[1].exercise}: ${content[1].sets} sets of `
          + `${content[1].reps} reps with ${content[1].rest} seconds of rest`}
        </p>
      );
    }
    return (
      <p key={`details-${idx}`}>
        {content[0]}: {content[1]}
      </p>
    );
  };

  return (
    <Box>
      <Typography variant="h4">
        Day {day + 1}
      </Typography>
      {
        Object.entries(details).map((content, idx) => getContent(content, idx))
      }
    </Box>
  );
}

ScheduleDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  details: PropTypes.object.isRequired,
  day: PropTypes.number.isRequired,
};
