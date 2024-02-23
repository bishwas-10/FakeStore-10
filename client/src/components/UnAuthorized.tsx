import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Box className="w-full h-screen flex flex-col items-center justify-center">
      <p>You do not have access to the requested page.</p>
      <p>Sign Out and sign in as an ADMIN.</p>
      <div className="flexGrow">
        <Button variant="contained" onClick={goBack}>Go Back</Button>
      </div>
    </Box>
  );
};

export default Unauthorized;
