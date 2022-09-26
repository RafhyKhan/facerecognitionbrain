import React from 'react';


/*
his Rank() function called from App.js, is meant to displa the text declaring your rank
Using HTML writing in {}
*/
const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='white f3'>
        {`${name}, your current entry count is...`}
      </div>
      <div className='white f1'>
        {entries}
      </div>
    </div>
  );
}

export default Rank;