import React, { useState ,useEffect} from 'react';


const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width:1300,
      height:1300,
    });
   
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, []);
   
    return windowSize;
  }


export default useWindowSize;
