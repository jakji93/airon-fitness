export const getErrorMessage = (error) => (
  error.response
  && error.response.data
  && error.response.data.message
)
  || error.message
  || error.toString();

export const placeholder = () => 1;
