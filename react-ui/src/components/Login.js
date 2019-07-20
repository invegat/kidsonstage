/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension, react/jsx-one-expression-per-line, react/prop-types */
/* eslint-disable no-console, no-class-assign, jsx-a11y/label-has-for, react/forbid-prop-types */
import { Navbar, NavbarBrand } from 'mdbreact';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import { TextField } from 'redux-form-material-ui'
import { TextField } from '@material-ui/core';
import { faArrowRight, faUser, faKey } from '@fortawesome/free-solid-svg-icons';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { withStyles } from '@material-ui/core/styles';
// import common from '@material-ui/core/colors/common';
// const black = common.black;
// import purple from '@material-ui/core/colors/purple';
// import { makeStyles } from '@material-ui/core/styles';
// import black from '@material-ui/core/colors/black';
import { login as Login } from '../actions';
import './css/login.css';

// const purple500 = purple[500];

/*
  <TextField
    defaultValue="react-bootstrap"
    label="Bootstrap"
    id="bootstrap-input"
    InputProps={{
      disableUnderline: true,
      classes: {
        root: classes.root,
        input: classes.input,
      },
    }}
    InputLabelProps={{
      shrink: true,
      className: classes.label,
    }}
    FormHelperTextProps={{
      classes:{
        root: classes.yourCSS,
        error: classes.yourErrorCSS
      }
    }}
  />
*/

// const useStyles = makeStyles(theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//   },
//   dense: {
//     marginTop: 16,
//   },
//   menu: {
//     width: 200,
//   }
// }));

// export default function FilledTextFields() {
//   const classes = useStyles();
//   const [values, setValues] = React.useState({
//     name: 'Cat in the Hat',
//     age: '',
//     multiline: 'Controlled',
//     currency: 'EUR',
//   });

//   const handleChange = name => event => {
//     setValues({ ...values, [name]: event.target.value });
//   };

// const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
//   // const classes = useStyles(),
//   <TextField
//     label={label}
//     InputProps={{
//       disableUnderline: false,
//       color: purple500,
//       // classes: {
//       //   root: classes.root,
//       //   input: classes.input
//       // }
//     }}
//     floatingLabelFocusStyle={{
//       color: 'black',
//     }}
//     underlineFocusStyle={{
//       borderColor: 'white',
//     }}
//     underlineStyle={{
//       borderColor: 'grey',
//     }}
//     helperText={touched && error}
//     {...input}
//     {...custom}
//     style={{
//       color: 'red',
//     }}
//   />
// );

// const styles = {
//   root: {
//     // background: 'white',
//     color: 'black',
//   },
// };
const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hint={label} label={label} error={touched && error} {...input} {...custom} />
);
// const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
//   <TextField
//     color="black"
//     label={label}
//     // floatingLabelFocusStyle={{
//     //   color: 'black',
//     // }}
//     // underlineFocusStyle={{
//     //   borderColor: 'black',
//     // }}
//     // underlineStyle={{
//     //   borderColor: 'black',
//     // }}
//     error={touched && error}
//     {...input}
//     {...custom}
//     style={{
//       color: 'black',
//     }}
//     className="textFieldColor"
//     inputProps={{ color: purple500 }}
//     // className={styles.root}
//     // InputProps={{
//     //   className: styles.input,
//     // }}
//   />
// );

class SignIn extends Component {
  handleFormSubmit = ({ username, password }) => {
    const { history, login } = this.props;
    console.log(`username: ${username}  password: ${password}`);
    login({ username, password }, history);
  };

  renderAlert() {
    const { error } = this.props;
    if (!error) return null;
    return <h3>{error}</h3>;
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="login--container">
        <div className="login--form_container">
          <Navbar className="login--box_navbar" dark expand="md">
            <NavbarBrand tag="span" className="login--box_brand">
              Log In
            </NavbarBrand>
          </Navbar>

          {/* <div className="login--icon"></div> */}
          <div className="login--form">
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <fieldset>
                <FontAwesomeIcon icon={faUser} />{' '}
                <Field
                  className="login--form_field"
                  name="username"
                  color="black"
                  component={renderTextField}
                  type="text"
                  label="Username"
                />
              </fieldset>
              <fieldset>
                <FontAwesomeIcon icon={faKey} />{' '}
                <Field
                  className="login--form_field"
                  name="password"
                  component={renderTextField}
                  type="password"
                  label="Password"
                />
              </fieldset>
              <button className="login--button" type="submit">
                Sign In <FontAwesomeIcon icon={faArrowRight} />
              </button>
              {this.renderAlert()}
              <br />
              <br />
              <span>
                Not a member? <Link to="/signup">Sign Up!</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.defaultProps = {
  error: null,
};
SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  error: state.auth.error,
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  login: (o, h) => dispatch(Login(o, h)),
});

SignIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
/* eslint-disable no-class-assign */
// UserSignIn = connect(mapStateToProps, { login })(UserSignIn);

export default reduxForm({
  form: 'signin',
  fields: ['username', 'password'],
})(SignIn);

// export default reduxForm({
//   form: 'signin',
//   fields: ['username', 'password'],
// })(UserSignIn);
