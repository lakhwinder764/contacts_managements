import { Box } from '@mui/material'
import React from 'react'
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box display="flex" flexDirection="column" height="250vh" alignItems="center" p={6} backgroundColor="primary.light">
        <Box mt={5} >
        <Link to="/" style={{textDecoration:'none', color:"white", fontSize:'20px'}}>Contact</Link> 
        </Box>
        <Box mt={7}>
        <Link to="/home" style={{textDecoration:'none', color:"white", fontSize:'20px'}}>Charts and Maps</Link> 
        </Box>
    </Box>
  )
}

export default Sidebar
