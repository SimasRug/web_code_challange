import React from 'react';
import {CgSpinnerTwoAlt} from 'react-icons/cg';
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