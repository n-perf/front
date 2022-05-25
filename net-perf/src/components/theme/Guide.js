import React,{useContext} from 'react';
import "shepherd.js/dist/css/shepherd.css";
import { ShepherdTour, ShepherdTourContext } from "react-shepherd";
const Guide = props => {
    const tour = useContext(ShepherdTourContext);
	return (
         <button class="btn btn-primary btn-jittery"  onClick={tour.start}>
        Start Tour
        </button>
      );
};

export default  Guide;