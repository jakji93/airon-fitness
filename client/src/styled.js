import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.secondary.main,
  textTransform: 'none',
}));

export const StyledInput = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
}));
