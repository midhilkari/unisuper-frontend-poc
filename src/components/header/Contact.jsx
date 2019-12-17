import React from "react";
import Popup from "reactjs-popup";

//This triggers the popup message
export default () => (
    <Popup trigger={<button>Contact us</button>} position="bottom left">
    {close => (
        //{have a class name to the division here and ADD CSS styling here}
      <div className="ContactUs">
        {/*<a className="close" onClick={close}>
          &times;
    </a>*/}
        {/* Further styling required*/}
        <p>Call us at </p>
        <p>Phone: 1800 331 6</p>
      </div>
      
    )}
    
  </Popup>
);