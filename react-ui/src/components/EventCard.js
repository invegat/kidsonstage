import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import './css/events.css';

// import 'bootstrap/dist/css/bootstrap.css';

// import {
//   Card,
//   Button,
//   Badge,
//   CardImg,
//   CardBody,
//   CardTitle,
//   CardText,
//   CardSubtitle,
//   CardImgOverlay,
//   CardHeader,
//   Collapse
// } from 'reactstrap';

import { getEvent,getGroups } from '../actions'

class EventCard extends Component {
  constructor(props) {
    super(props);
    const { id } = props;
    this.state = { id };
    console.log(`EventCard id ${id}`);

  }

  componentDidMount() {
    this.props.setEvent(this.state.id);
    this.props.setGroups(this.state.id);
  }

  render() {
    return (
      <LinkContainer exact to="/events/details">
        <div className="eventCard--Container">
          <div className="eventCard--Title">{this.props.title}</div>
          <div className="eventCard--Date">{this.props.eventDate}</div>
        </div>
      </LinkContainer>
    );
  }
}

// export default EventCard;
const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setEvent: (id) =>  dispatch(getEvent(id)),
    setGroups: (id) => dispatch(getGroups(id)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EventCard);