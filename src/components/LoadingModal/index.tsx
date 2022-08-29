import { Backdrop, CircularProgress } from '@mui/material';

export const LoadingModal = () => {
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: 10000 }} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
