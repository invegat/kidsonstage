/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { /* Field, */ reduxForm, FieldArray, initialize } from 'redux-form';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { getGroups, getPartGroups } from '../actions';
import EventDetailGroupRow from './EventDetailGroupRow';
import NormalizeTime from './normalizers/normalizeTime';
/* eslint-disable react/prop-types, no-console, no-param-reassign,
        jsx-a11y/no-noninteractive-element-interactions, arrow-body-style,
        jsx-a11y/label-has-for
        */

import './css/eventDetail.css';

class RenderGroups extends React.Component {
  constructor(props) {
    super(props);
    this.bools = [];
    this.state = {
      addIndex: -1,
    };
  }

  get valid() {
    const isValid = this.bools.length === 0 || this.bools.every(b => b === true);
    // if (!isValid) {
    //   const index = this.bools.findIndex(b => !b);
    //   // console.log(`this.bools.length: ${this.bools.length} index: ${index}`);
    // }
    return isValid;
  }

  add = (i, v) => {
    if (this.bools[i] !== v) {
      this.bools[i] = v;
      const { addIndex } = this.state;
      this.setState({
        addIndex: addIndex - 1,
      });
    }
  };

  renderEventRows = ({ fields, activated, props, eventId, admin, groupFA, addIndex, error }) => (
    <div>
      <ul>
        {fields.map((group, index) => (
          <li key={`${group}.row`}>
            {activated !== undefined && (
              <EventDetailGroupRow
                rowProps={props}
                eventId={eventId}
                admin={admin}
                fields={fields}
                groupText={group}
                index={index}
                group={groupFA[index]}
                activated={activated}
                isValid={this.add}
              />
            )}
          </li>
        ))}
        {admin > 0 && (
          <li
            key={
              Math.random()
                .toString(36)
                .substring(2) + Date.now().toString(36)
            }
          >
            <button
              className="eventDetail--form_container_button"
              id="addGroupButton"
              type="button"
              disabled={!this.valid}
              style={{ opacity: this.valid ? '1' : '0.5' }}
              onClick={() => {
                sessionStorage.setItem('pushingNewGroup', 1);
                fields.push();
              }}
            >
              Add Group why 2?
            </button>
          </li>
        )}
        {error && (
          <li key={-1} className="error">
            {error}
          </li>
        )}
      </ul>
    </div>
  );

  render() {
    // console.log(`render 92 this.props: ${JSON.stringify(this.props, null, 2)}`);
    // eslint-disable-next-line react/destructuring-assignment
    console.log(`render 95 this.props.error ${this.props.error}`);
    const {
      activated,
      groupFA,
      eventId,
      admin,
      props,
      // meta: { error },
      error,
    } = this.props;
    const { addIndex } = this.state;
    return (
      <div>
        <FieldArray
          name="groupFA"
          activated={activated}
          groupFA={groupFA}
          eventId={eventId}
          admin={admin}
          props={props}
          error={error}
          addIndex={addIndex}
          component={this.renderEventRows}
        />
      </div>
    );
  }
}

const onKeyPress = event => {
  // console.log(`kp event ${JSON.stringify(event.which)}`);
  if (event.which === 13 /* Enter */) {
    event.preventDefault();
  }
};
let EventDetailsGroupsCalls = 0;
const EventDetailsGroups = props => {
  // console.log(`Event Detail Group history? ${props.history}`);
  const { load, history, activated, eventId, admin, invalid } = props;
  console.log(`EventDetailsGroups times ${EventDetailsGroupsCalls}`);
  EventDetailsGroupsCalls += 1;
  // console.log(`Groups load type ${typeof load}`);
  // console.log(`Groups getGroups type ${typeof getGroups}`);
  return (
    <form onKeyPress={onKeyPress}>
      <RenderGroups
        name="groupFA"
        component={RenderGroups}
        eventId={eventId || 2}
        admin={admin}
        load={load}
        props={props}
        activated={activated}
        // eslint-disable-next-line react/destructuring-assignment
        groupFA={props.initialValues.groupFA}
        error={!invalid}
      />
      <div className="eventDetail--return_button_container">
        <button
          type="button"
          // disabled={submitting || !pristine}
          onKeyPress={onKeyPress}
          onClick={() => history.push('/events')}
        >
          Return to Events <FontAwesomeIcon icon={faUndoAlt} />
        </button>
      </div>
    </form>
  );
};
const EventDetail = reduxForm({
  form: 'eventdetailGroups', // a unique identifier for this form
  touchOnBlur: true,
  // enableReinitialize: true,
})(EventDetailsGroups);
// export default EventDetail;

const fiveLenthDate = state => {
  return state.groups.map(group => {
    const userId = Number(sessionStorage.getItem('id'));
    const partIndex = state.partGroups.findIndex(
      partGroup => partGroup.groupId === group.id && partGroup.userId === userId
    );

    const partGroup = partIndex >= 0 ? state.partGroups[partIndex] : undefined;

    // this.setState({
    //   group: { ...group, partGroup },
    // });
    const checked = partGroup ? partGroup.subscribed : false;
    const { time, ...rest } = group;
    // if (checked) {
    //   console.log(`partIndex: ${partIndex} partGroups.length: ${state.partGroups.length}
    //     partGroup.groupId ${partGroup ? partGroup.groupId : null} group.id ${group.id}
    //     group.name |${group.name}| checked ${checked} `);
    // }
    //  else {
    //   console.log(`group ${group.id} |${group.name}| is unchecked`);
    // }
    // rest.time = time.substring(0, 5);
    let newTime = time.length >= 5 ? NormalizeTime(time, time) : time;
    if (newTime[0] === ' ') newTime = `0${newTime.slice(1)}`;
    let hours = Number(newTime.slice(0, 2));
    if (Number.isNaN(hours) || hours > 23 || hours < 0) hours = 12;
    // defaulting no valid hour to 12 pm.
    // convert military to am/pm with leading space for < 10
    const pm = hours >= 12;
    if (hours === 0) hours = 12;
    newTime = `${hours - (hours > 12 ? 12 : 0)}`.padStart(2, ' ') + newTime.slice(2);
    return {
      ...rest,
      time: newTime.substring(0, 5),
      checked,
      partGroup,
      pm,
    };
  });
};
export default connect(
  state => ({
    initialValues: { groupFA: fiveLenthDate(state) },
  }),
  dispatch => ({
    load: eventId => dispatch(getGroups(eventId)),
    loadPart: eventId => dispatch(getPartGroups(eventId)),
    changeFieldValues: (formName, data) => dispatch(initialize(formName, data)),
  })
)(EventDetail);

// const selector = formValueSelector('EventDetailsGroups');
// const FA = connect((state) => {
//   const fa = selector(state, 'groupFA');
//   return {
//     fa,
//   };
// })(EventDetail);
// console.log(JSON.stringify(FA));
