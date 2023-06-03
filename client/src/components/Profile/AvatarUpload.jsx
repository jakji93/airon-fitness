import React, { createRef, useState } from 'react';
import {
  Avatar, Box, Button, styled,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { grey } from '@mui/material/colors';

const BigAvatar = styled(Avatar)(({ theme }) => ({
  width: '120px',
  height: '120px',
  margin: `0 auto ${theme.spacing(2)}px`,
  border: `1px solid ${grey[500]}`,
  boxShadow: `0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]}`,

}));

export default function AvatarUpload() {
  const [image, _setImage] = useState(null);
  const inputFileRef = createRef();

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };

  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  const handleOnChange = (event) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setImage(URL.createObjectURL(newImage));
    }
  };

  const handleClick = (event) => {
    if (image) {
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
        alt="Avatar"
        src={image || '/static/img/avatars/default-profile.svg'}
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          component="span"
        >
          {image ? <DeleteIcon /> : <UploadIcon />}
          {image ? 'Delete' : 'Upload'}
        </Button>
      </label>
    </Box>
  );
}
