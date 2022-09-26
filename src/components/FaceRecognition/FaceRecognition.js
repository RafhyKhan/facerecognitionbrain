import React from 'react';

/*
You are called FaceRecognition function, from App.js while bringing with you
varaibles imageUrl and box. 

You are making the input image centered, src for source, giving it width but adjustable height
You are also creating the boundery box here, with all given values, box is setState so its accesible
by all files
*/

const FaceRecognition = ({ imageUrl, box }) => {
	return (
		<div className='center'>
			<div className='absolute mt2'>  
				<img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
				<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
	);
}


//must export back to app interface
export default FaceRecognition;