import React from 'react';
import '../input.css';

import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

const Input = ({ title, total, cases, onClick, className }) => {
  return (
    <Grid item sm={4} xs={12}>
      <Box sx={{ mr: 2, cursor: 'pointer' }}>
        <Card
          className={className}
          onClick={onClick}
          sx={{
            marginBottom: '10px',
          }}
        >
          <CardContent>
            <Typography className={className}>{title}</Typography>
            <h2 className={className}>{cases}</h2>
            <Typography className={className}>{total}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default Input;
