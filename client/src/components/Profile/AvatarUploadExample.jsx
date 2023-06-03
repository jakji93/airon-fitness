import {
  Avatar, Button as MuiButton, Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import {
  CloudUpload as MuiCloudUpload,
  Delete as MuiDelete,
} from '@mui/icons-material';
import { spacing, styled } from '@mui/system';
import React, { createRef, useState } from 'react';
// https://gist.github.com/Pacheco95/aa5c28b7a61dacba5b8f55f84d1fa591
const Button = styled(MuiButton)(spacing);
const UploadIcon = styled(MuiCloudUpload)(spacing);
const DeleteIcon = styled(MuiDelete)(spacing);

const CenteredContent = styled('div')`
  text-align: center;
`;

const BigAvatar = styled(Avatar)(({ theme }) => ({
  width: '120px',
  height: '120px',
  margin: `0 auto ${theme.spacing(2)}px`,
  border: `1px solid ${grey[500]}`,
  boxShadow: `0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]}`,

}));

function AvatarUploadExample() {
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

  /**
   *
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
   */
  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImage(null);
    }
  };

  return (
    <CenteredContent>
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
          mb={2}
          onClick={handleClick}
        >
          {image ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
          {image ? 'Delete' : 'Upload'}
        </Button>
      </label>
      <Typography variant="caption" display="block" gutterBottom>
        128 x 128 pixels .jpg
      </Typography>
    </CenteredContent>
  );
}

export default AvatarUploadExample;
