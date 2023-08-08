import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.dark,
  '&:hover': {
    backgroundColor: theme.palette.secondary.hover,
  },
}));

export const StyledInput = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
}));
