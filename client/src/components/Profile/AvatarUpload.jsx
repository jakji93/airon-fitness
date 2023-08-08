import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import {
  Avatar, Box, styled,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React, {
  createRef, useContext, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateUserProfile, updateUserProfileImage } from '../../reducers/UserProfile';
import { StyledButton } from '../../styled';
import { ToastContext } from '../common/context/ToastContextProvider';

const BigAvatar = styled(Avatar)(({ theme }) => ({
  width: '120px',
  height: '120px',
  margin: `0 auto ${theme.spacing(2)}px`,
  border: `1px solid ${grey[500]}`,
  boxShadow: `0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]}`,
  fontSize: '3rem',
}));

export const base64Flag = 'data:image/jpeg;base64,';
export const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return window.btoa(binary);
};

export default function AvatarUpload() {
  const openToast = useContext(ToastContext);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.userProfile.profile);
  const profileImage = base64Flag + arrayBufferToBase64(profile?.profileImage?.data?.data);
  const [image, _setImage] = useState(profileImage ?? '/static/img/avatars/default-profile.svg');
  const inputFileRef = createRef();
  const imageExists = image && image !== base64Flag;

  useEffect(() => {
    _setImage(profileImage ?? '/static/img/avatars/default-profile.svg');
  }, [profile, profileImage]);

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };

  const setImage = (newImage) => {
    if (imageExists) {
      cleanup();
      dispatch(updateUserProfile({ profileImage: 'blank' }));
    }
    _setImage(newImage);
  };

  const handleOnChange = (event) => {
    const newImage = event.target?.files?.[0];
    if (!newImage) return;

    if (newImage.size > 500000) {
      openToast('error', 'File size is too large, please use a smaller picture');
      return;
    }
    setImage(URL.createObjectURL(newImage));
    dispatch(updateUserProfileImage(newImage));
  };

  const handleClick = (event) => {
    if (imageExists) {
      event.preventDefault();
      setImage(null);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <BigAvatar
        alt={profile?.firstName ?? '?'}
        src={image}
        imgProps={{
          style: {
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'cover',
          },
        }}
      />
      <input
        ref={inputFileRef}
        accept="image/*"
        hidden
        id="avatar-image-upload"
        type="file"
        onChange={handleOnChange}
      />
      <label htmlFor="avatar-image-upload">
        <StyledButton
          variant="contained"
          onClick={handleClick}
          component="span"
          sx={{
            mt: 2,
          }}
        >
          {imageExists ? <DeleteIcon sx={{ marginRight: '5px' }} /> : <UploadIcon sx={{ marginRight: '5px' }} />}
          {imageExists ? 'Delete' : 'Upload'}
        </StyledButton>
      </label>
    </Box>
  );
}
