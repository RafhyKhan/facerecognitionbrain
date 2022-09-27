
import React, { Component } from 'react';
//importing React.Component basically

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particle from './components/Particle/Particle.jsx';
import Clarifai from 'clarifai';
import './App.css';

//This is how you import documents, 






const initialState = {
  input: ' ',
  imageUrl: ' ',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
      id: '',
      name: '',
      email: '', 
      entries: 0,
      joined: ''
  }
}
class App extends Component {
  //must be called because we need super due to this. commands
  //we are preasigning values, user will not be signed in initially, 
  //route, will led to sign in page, image url text is blank, so is input user data
  constructor() {
    super();
    this.state = {
      input: ' ',
      imageUrl: ' ',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
          id: '',
          name: '',
          email: '', 
          entries: 0,
          joined: ''
      }
    }
  }


loadUser = (data) => {
  this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
  }})
}

/*
This function is made to locate the users face using the clarifai online API. We location
the 4 points of box around the face using clarifai api, which gives data when called on picture.
We than create a box picture with css and placed ontop of image to show face in picture
*/
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.output[0].data.regions[0].region.info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }




//When it says this.setState({box: box}), you are making box a variable accesible by all FILES
  displayFaceBox = (box) => {
    this.setState({box: box});
  }



//----
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }


/*On button submit, we execute soe of the functions above, this button is for after sign in
the use inputs url data, than presses button to locate face. Tha we display faceboc made with css.
*/ 

//we change for localhost to guarded HEROKU server
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://guarded-refuge-47284.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => { 
        if (response) {
          fetch('https://guarded-refuge-47284.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }


/*This function is like an event listener, for whenever the route is changed. Depending on the
route it changes the isSignedIn variable, which goes through an if statement in wnother file
to dictate where the user should go next.
*/
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() {
      const { isSignedIn, imageUrl, route, box } = this.state;
      return (
        //This are all the compnenets of the app -------------------------------
      <div className="App">
        <Particle className='particles'/>
        
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm 
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition box={box} imageUrl={imageUrl} />  
            </div>
          : ( // ? and : are both conditional operator like if statement, saves space
              route === 'signin' //if equal to signin than do route change
                                //go to signin and register files while taking these variable
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>  
              //your passing the functions as props, loadUser and onRouteChange
            )
        } 
      </div>
    );
  }
}

export default App;
