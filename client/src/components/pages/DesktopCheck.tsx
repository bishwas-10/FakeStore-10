import { useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";

const DesktopCheck = () => {
  const desktop = useMediaQuery("(min-width:1024px)");
  return (
    <>
      {!desktop ? (
        <div className="h-screen w-screen flex items-center justify-center">
          please open it on a desktop 
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default DesktopCheck;
