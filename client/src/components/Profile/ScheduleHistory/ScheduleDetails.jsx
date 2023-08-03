import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function ScheduleDetails({ details, day }) {
  const getContent = (content, idx) => {
    if (content[0] === 'nutrition_totals') {
      return (
        <p key={content[0]}>Nutrition Information: {`${content[1].calories} Calories, ${content[1].carbohydrates}g Carbohydrates, ${content[1].fat}g Fat, ${content[1].protein}g Protein`}</p>
      );
    }

    if (content[0] === 'total_calories') {
      return (
        <p key={content[0]}>Calories Burned: {content[1]}</p>
      );
    }

    if (typeof content[1] === 'object') {
      return (
        content[1].map((c) => (
          <div key={c.exercise}>
            <p key={`details-${idx}`}>
              {`${c.exercise}: ${c.sets} sets of `
              + `${c.reps} reps with ${c.rest} seconds of rest`}
            </p>
          </div>
        ))
      );
    }

    return (
      <p key={content[0]}>
        {content[0].charAt(0).toUpperCase() + content[0].slice(1)}: {content[1]}
      </p>
    );
  };

  return (
    <Box key={`ScheduleDetails-${day}`}>
      <Typography variant="h4">
        Day {day + 1}
      </Typography>
      {
        Object.entries(details).map((content, idx) => getContent(content, idx, details.length))
      }
    </Box>
  );
}

ScheduleDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  details: PropTypes.object.isRequired,
  day: PropTypes.number.isRequired,
};
