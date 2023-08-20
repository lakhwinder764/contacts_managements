import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import FormDialog from './Dialog';
import { useSelector } from 'react-redux';

const Home = () => {
  const userList = useSelector((state) => state.users.value);
  return (
    <div class="flex flex-col items-center content-center">
      <FormDialog />
      {userList?.length === 0 && (
        <div class=" flex flex-row p-2 m-6 rounded-md border-solid border-zinc-950 bg-stone-300 items-center content-center">
          <CancelIcon sx={{ color: 'red' }} />
          <p class="pl-2 font-bold text-sm">
            No Contact Found Please Add Contact from create contact Button
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
