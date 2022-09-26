import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import './Particle.css';

import React from 'react';


/*
This is copied from the ts-particles react documentation online. Edited based on video found
on youtube, mar 22 2022
*/

function Particle() {

	const particlesInit = useCallback(async (engine) => {
    	console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);


	return (
		<Particles
		className='particles'
		id="tsparticles"
			init={particlesInit}
			loaded={particlesLoaded}

			options={
				{background: {color: {
                        value: "",},},
                fpsLimit: 120,
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    move: {
                        directions: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 6,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 30,
                    },
                    opacity: {
                        value: 0.1,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,}
        	}

		/>
	)
}

export default Particle