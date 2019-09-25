import React, { Component } from 'react';

class FavsPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
        user_id : 1,
        savedTrails : [],
        hikedTrails: []
      } 
    }

componentDidMount() {
  // this.setState({
  //   user_id: this.state.id
  // });
  fetch('/favs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: 1,
    })
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    //console.log(res);
    this.setState(state => {
      return {
        ...state,
        savedTrails: res.trails,
        hikedTrails: res.hiked,
      };
    });
  })
}

render() {
let savedTrails = [];
let hikedTrails = [];


if (this.state.savedTrails.length > 0) {
  savedTrails = this.state.savedTrails.map(x => {
    console.log(x)

     return x.name
  })
}
if(this.state.hikedTrails.length>0) {
  this.state.hikedTrails.map(x => {
    //console.log(this.state.hikedTrails) 
    x.hikedTrails = hikedTrails;
    console.log(hikedTrails)
    return hikedTrails;
})
}

 return (
     <div className = "getUserTrails">
      hello
      {savedTrails}
      {hikedTrails}
     </div>
 )
}
}
export default FavsPage;