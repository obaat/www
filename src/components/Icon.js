import React, {Component} from 'react';
import {hoc} from '../styleHelpers';
import g from 'glamorous';

const fa = {
  display: "inline-block",
  font: "normal normal normal 14px/1 FontAwesome",
  fontSize: "inherit",
  textRendering: "auto",
  "-webkitFontSmoothing": "antialiased",
}

export default hoc(
  g(({name, className, onClick}) =>
    <i onClick={ onClick } className={`fa-${name} ${className}`} aria-hidden="true" />
)(fa));
