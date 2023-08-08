import styled from '@emotion/styled';
import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

/**
 * Parent using this element must have this styling
 * for backdrop to be contained within component
 */
// const BackdropWrapper = styled('div')(() => ({
//   position: 'relative',
//   width: '100%',
//   height: '100%',
//   zIndex: 0,
// }));

const BackdropAbsolute = styled(Backdrop)(() => ({
  position: 'absolute',
  zIndex: 10,
  borderRadius: '4px',
}));

export default function RelativeSpinner() {
  return (
    <BackdropAbsolute open>
      <CircularProgress color="secondary" />
    </BackdropAbsolute>
  );
}
