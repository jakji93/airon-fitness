import PropTypes from 'prop-types';
import React from 'react';
import { useSpring, animated } from 'react-spring';

function NumberDial({ maxValue }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: maxValue,
    config: { mass: 1, tension: 20, duration: 1000 },
  });

  return <animated.div>{number.interpolate((val) => Math.floor(val))}</animated.div>;
}

NumberDial.propTypes = {
  maxValue: PropTypes.number.isRequired,
};

export default NumberDial;
