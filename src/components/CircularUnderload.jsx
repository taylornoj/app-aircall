import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularUnderLoad() {
  return <CircularProgress sx={{ ml: 20, mt: 10, 'color': "#2AC420"}} disableShrink />;
} 