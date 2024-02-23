import { Button } from "@mui/material";

const BackToTop = () => {
    function backToTop(){
        window.scrollTo(
          {
            top:0,
            behavior: 'smooth'
          }
        ) ;
      }
  return (
    <div> 
      <Button
      variant="contained"
        onClick={backToTop}
        className="mt-4 w-full py-2 capitalize"
      >
        Back to top
      </Button>
    </div>
  );
};

export default BackToTop;
