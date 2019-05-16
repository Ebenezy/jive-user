import React, { Component } from 'react';
import  '../images/styles/spinner.css';
 export default class Spinner extends Component {
    render() {
        return (
            <div class="spinner">
            <div class="spinner-container container1">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
            <div class="spinner-container container2">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
          
          </div>
        );
    }
}

