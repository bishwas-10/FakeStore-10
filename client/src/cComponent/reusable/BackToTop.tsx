
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
      <button
        onClick={backToTop}
        className="mt-4 w-full py-2 text-white capitalize  bg-slate-600"
      >
        Back to top
      </button>
    </div>
  );
};

export default BackToTop;
