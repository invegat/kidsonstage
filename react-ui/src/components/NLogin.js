/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
// import RenderToLayer from 'material-ui/internal/RenderToLayer';

// const currencies = [
//   {
//     value: 'USD',
//     label: '$',
//   },
//   {
//     value: 'EUR',
//     label: '€',
//   },
//   {
//     value: 'BTC',
//     label: '฿',
//   },
//   {
//     value: 'JPY',
//     label: '¥',
//   },
// ];

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
}));

const classes = useStyles();

class SignIn extends Component {
  handleFormSubmit = ({ username, password }) => {
    const { history, login } = this.props;
    console.log(`username: ${username}  password: ${password}`);
    login({ username, password }, history);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(this.handleFormSubmit)}
      >
        <TextField
          id="filled-name"
          label="Name"
          className={classes.textField}
          margin="normal"
          variant="filled"
        />

        <TextField
          id="filled-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="filled"
        />
      </form>
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
