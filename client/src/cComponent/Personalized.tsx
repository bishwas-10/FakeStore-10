import { Box, Button } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom'

const Personalized = () => {
    const navigate = useNavigate();
  return (
    <Box className="h-40  my-2 flex flex-col items-center justify-center shadow-sm  border-2 border-gray-400 rounded-lg ">
    <p>See Personalized Recommendation</p>
    <Button onClick={() => navigate("/login")} variant="contained">
      Sign In
    </Button>
    <span className="text-sm">
      New Customer?{" "}
      <Link to="/signup" className="text-secondary text-[14px] py-2">
        Start here
      </Link>
    </span>
  </Box>
  )
}

export default Personalized