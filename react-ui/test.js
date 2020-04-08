/* eslint prefer-arrow-callback: 0 */
/* eslint-env es6 */

import { Component } from "react";

export default class Test extends Component {
  testarrow = props => {
    console.log(props);
  }  
}
