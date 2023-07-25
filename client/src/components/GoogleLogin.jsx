import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { GoogleLogin as ReactGoogleLogin } from 'react-google-login';

import { ToastContext } from './common/context/ToastContextProvider';

export const clientId = '130203680740-fujge3ued302ncjq7fn5576co6pc0t54.apps.googleusercontent.com';

export default function GoogleLogin(props) {
  const {
    buttonText,
    failureText,
    onSuccess,
    isSignedIn,
  } = props;
  const openToast = useContext(ToastContext);
  const handleSuccess = (res) => {
    onSuccess(res);
  };

  const handleFailure = () => {
    openToast('error', failureText);
  };

  return (
    <ReactGoogleLogin
      clientId={clientId}
      buttonText={buttonText}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy="single_host_origin"
      isSignedIn={isSignedIn}
    />
  );
}

GoogleLogin.propTypes = {
  buttonText: PropTypes.string.isRequired,
  failureText: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool,
};

GoogleLogin.defaultProps = {
  failureText: 'Failed to authenticate with Google',
  isSignedIn: false,
};
