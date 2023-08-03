import PropTypes from 'prop-types';
import React from 'react';
import { useSpring, animated } from 'react-spring';

function CalorieDial({ maxValue }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: maxValue,
    config: { mass: 1, tension: 20, duration: 1000 },
    // onRest: () => reset(), // Reset the animation when it's finished
  });

  return <animated.div>{number.interpolate((val) => Math.floor(val))}</animated.div>;
}

CalorieDial.propTypes = {
  maxValue: PropTypes.number.isRequired,
};

export default CalorieDial;
