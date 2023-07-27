import {
  Box, Button, Paper, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Carousel from 'react-material-ui-carousel';

import WorkoutStatesEnum from './WorkoutFlowStates';

function Item({ item }) {
  const { name, description } = item;

  return (
    <Paper>
      <h2>{name}</h2>
      <p>{description}</p>

      <Button className="CheckButton">
        Check it out!
      </Button>
    </Paper>
  );
}

export default function WorkoutCarousel({ onNext }) {
  const items = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!',
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
    },
  ];

  return (
    <Box>
      <Box>
        <Typography variant="h1">
          Workout Selection Carousel
        </Typography>
        <Button onClick={() => onNext(WorkoutStatesEnum.IN_SESSION)} variant="outlined">
          START WORKOUT
        </Button>
      </Box>

      <Carousel>
        {
            // eslint-disable-next-line react/no-array-index-key
            items.map((item, i) => <Item key={i} item={item} />)
        }
      </Carousel>

    </Box>
  );
}

WorkoutCarousel.propTypes = {
  onNext: PropTypes.func.isRequired,
};

Item.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
