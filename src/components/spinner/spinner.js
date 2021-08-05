import React from 'react';
import {CgSpinnerTwoAlt} from "react-icons/all";
import './spinner.css'

export class Spinner extends React.Component {
   render() {
       return (
           <div className='spinner'>
               <CgSpinnerTwoAlt/>
           </div>
       );
   }
}