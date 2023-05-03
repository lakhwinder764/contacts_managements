import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from 'nanoid'
import { addUser, deleteUser, updateUsername } from "./Contact/ContactsSlice";
import { Box, Grid, Radio, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [editstate, setEditState] = React.useState(false);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [userid, setuserid] = useState("");
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.value);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChange = (event) => {
    userForm.setFieldValue('status', event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  

 const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    lastname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    status: Yup.string().required('Required'),
});
const userForm = useFormik({
  initialValues:{
    firstname: '',
    lastname:'',
    status:'',
  },
  validationSchema,
  onSubmit:(values) => {
    dispatch(
      addUser({
        id: nanoid(),
        firstname:values.firstname,
        lastname:values.lastname,
        statusvalue:values.status,
      }))
      setOpen(false);
  }

})

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly">
      <Button variant="contained" onClick={handleClickOpen}>
        Create Contact
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign:' center'}}>Create Contact Screen</DialogTitle>
        <DialogContent>
            <Grid container>
                <Grid item container xs={12} direction="row" justifyContent="space-evenly" alignItems="center">
                    <Typography>
                      First Name: 
                    </Typography>
                 <TextField
          type="text"
          placeholder="First Name"
          required
          onChange={(event) => {
            userForm.setFieldValue('firstname', event.target.value);  
          }}
          helperText={userForm.touched.firstname ? userForm.errors.firstname : ''}
          error={Boolean(userForm.errors.firstname) && userForm.touched.firstname}
          sx={{m: 2 }}
        />
                </Grid>
                <Grid item container xs={12} direction="row" justifyContent="space-evenly" alignItems="center">
    <Typography>
        Last Name: 
    </Typography>
<TextField
          type="text"
          placeholder="last Name"
          required   
          onChange={(event) => {
            userForm.setFieldValue('lastname', event.target.value);   
          }}
          sx={{m: 2 }}
          helperText={userForm.touched.lastname ? userForm.errors.lastname : ''}
          error={Boolean(userForm.errors.lastname) && userForm.touched.lastname}
        />
</Grid>
<Grid item container xs={12} direction="row" justifyContent="space-evenly" alignItems="center">
<Typography>Status:</Typography>
<Box display="flex" flexDirection="column" alignItems="center">
  <Box display="flex" alignItems="center">
<Typography>Active</Typography>
<Radio
  checked={userForm.values.status === 'active'}
  onChange={handleChange}
  value="active"
  name="radio-buttons"
/>
</Box>
<Box display="flex" alignItems="center">
    <Typography>Inactive</Typography>
<Radio
  checked={userForm.values.status === 'inactive'}
  onChange={handleChange}
  value="inactive"
  name="radio-buttons"
/>
</Box>
  </Box>
</Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Box display="flex" alignItems="center" justifyContent="center" flexGrow={1}>
            <Button
          variant="contained"  
          onClick={() => {
            userForm.handleSubmit();
          
          }}
          >
            Save Contact
          </Button>
            </Box>
       
        </DialogActions>
      </Dialog>

      <Box display="flex" alignItems="center" justifyContent="space-evenly" width="1000px" mt={3}>
        {userList.map((user) => {
          return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly" height="200px" border="1px solid grey" borderRadius="4px" backgroundColor="#FAF9F6" p={2}>
                <Box display="flex" alignItems="center" justifyContent="space-evenly">
              {editstate && userid === user.id ? (  
              <input
                type="text"
                placeholder="Enter first Name..."
                style={{width:'80px'}}
                onChange={(event) => {
                    setfirstname(event.target.value);
                  }}
                  value={firstname}
              /> ):( <Typography> {user.firstname}</Typography>)
              }  
              {
                editstate && userid === user.id ? (
                    <input
                    type="text"
                    placeholder="Enter last Name..."
                    style={{width:'80px', marginLeft: '10px'}}
                    onChange={(event) => {
                        setlastname(event.target.value);
                      }}
                      value={lastname}
                  />
                ) :(
                    <Typography sx={{ ml: 1}}> {user.lastname}</Typography> 
                ) 
              }
                </Box>
                {
                  user.statusvalue === 'active' ? (   
                               <Box border="1px solid #77dd77" p={1} backgroundColor="#77dd77">{user.statusvalue}</Box>
                               ) :(
                                <Box border="1px solid #FF6961" p={1} backgroundColor="#FF6961">{user.statusvalue}</Box>
                               )
                }
           

                { editstate ? (
                  <Button
                  variant="contained"
                  color='success'
                    onClick={() => {
                        dispatch(
                          updateUsername({ id: user.id, firstname: firstname, lastname: lastname })
                        );
                        setEditState(false)
                      }}
                  >
                   Save
                  </Button>
              ) :(
                <Button
                variant="contained"
                color='success'
                  onClick={() => {
                   setuserid(user.id);
                   setfirstname(user.firstname);
                   setlastname(user.lastname);
                   setEditState(true)
                    }}
                >
                 Edit
                </Button>
              )}
              <Button
              variant='contained'
              color="error"
                onClick={() => {
                  dispatch(deleteUser({ id: user?.id }));
                }}
              >
                Delete
              </Button>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
