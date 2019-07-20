/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './css/events.css';
import { Navbar, NavbarBrand } from 'mdbreact';

import { TextField } from '@material-ui/core';

// import { FontAwesomeIcon } from "@fortawesome-svg-core/react-fontawesome";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { addEvent } from '../actions';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hint={label} label={label} error={touched && error} {...input} {...custom} />
);

/* eslint-disable react/forbid-prop-types */
class EventsNew extends Component {
  handleFormSubmit = ({
    title,
    eventDate,
    activated = false,
    completed = false,
    owner = sessionStorage.getItem('id'),
  }) => {
    this.props.save(
      {
        title,
        eventDate,
        activated,
        completed,
        owner,
      },
      this.props.history.push('/events')
    );
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="eventDetail--container">
        <div className="eventDetail--form_container">
          <Navbar className="eventDetail--box_navbar" dark expand="md">
            <NavbarBrand tag="span">Create Event</NavbarBrand>
          </Navbar>
          <div className="eventDetail--box_content">
            <form onSubmit={handleSubmit(this.handleFormSubmit)} id="new-event-form">
              <FontAwesomeIcon icon={faEdit} />{' '}
              <Field name="title" type="text" component={renderTextField} label="Title" />
              <br />
              <FontAwesomeIcon icon={faCalendarAlt} />{' '}
              <Field
                name="eventDate"
                type="text"
                component={renderTextField}
                label="Date"
                placeholder="Date"
              />
              <br />
              <br />
              <button
                className="new-user-action-button newEvent--button_save"
                id="new-user-sign-up"
                type="submit"
                disabled={pristine || submitting}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
EventsNew.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  save: PropTypes.func.isRequired,
};
// export default EventsNew;
const NewEvent = reduxForm({
  form: 'newEvent', // a unique identifier for this form
  touchOnBlur: true,
})(EventsNew);

export default connect(
  () => ({}),
  dispatch => ({ save: event => dispatch(addEvent(event)) })
)(NewEvent);
