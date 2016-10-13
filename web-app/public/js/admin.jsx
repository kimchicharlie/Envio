var React = require('react');
var ReactDOM = require('react-dom');
var cookie = require('react-cookie');
var utils = require('../../utils');

Admin = React.createClass({
  getInitialState: function() {        
    return {
        error : false
    };
  },
  componentDidMount: function() {
    
  },
  render : function() {          
    return (
      <div>
        <div className="content">
          Espace Admin
        </div>
      </div>
    );
  }
});