import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
// import { BrowserRouter as Router } from 'react-router-dom';

// import faPlusCircle from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { Navbar, NavbarBrand } from 'mdbreact';

import './css/events.css';
// import { Button } from 'reactstrap';

class NewEventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // render() {
  //   return (
  //     // <LinkContainer router={(e) => {console.log(e)}}  exact to="/events/new">
  //     <Button href="/events/new">Add Event</Button>
  //     // </LinkContainer>
  //   );
  // }
  render() {
    return (
      <LinkContainer exact to="/events/new">
        <div className="eventCard--Container">
          <Navbar className="eventCard--box_navbar" dark expand="md">
            <NavbarBrand tag="span">Add Event</NavbarBrand>
          </Navbar>
          <div className="eventCard--Body">
            <FontAwesomeIcon size="5x" icon={faPlusCircle} />
          </div>
        </div>
      </LinkContainer>
    );
  }
}

export default NewEventCard;
