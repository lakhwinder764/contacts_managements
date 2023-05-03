import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import FormDialog from "./Dialog";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Home = () => {
    const userList = useSelector((state) => state.users.value);
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <FormDialog />
      {
        userList.length === 0 && (
  <Box display="flex" border="1px solid black" borderRadius="4px" height="20px" margin={2} padding={2} backgroundColor="#FAF9F6" marginTop={4}>
     <CancelIcon sx={{color:"red"}}/>
     <Typography sx={{ pl: 2}}>No Contact Found Please Add Contact from create contact Button</Typography>
  </Box>
        ) 
      }
  
      </Box>
    );
}

export default Home
