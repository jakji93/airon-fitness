const hasFitnessPlan = (state = false, action = {}) => {
  switch (action.type) {
    case 'CREATE':
      return true;
    default:
      return state;
  }
};

export default hasFitnessPlan;
