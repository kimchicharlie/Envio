var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');
var utils = require('../../utils');


const customStyles = {
  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

ErrorModal = React.createClass({
	getInitialState : function() {
	    return {
	        openModal : false
	    };
	},
	componentWillReceiveProps : function(nextProps) {
	    this.setState({openModal : !!nextProps.content}) //castage en bolean
	},
	Cancel: function (){
		this.setState({openModal : false});
	},
	render (){
		var Yes = null;
		var No = null;
		var Cancel = <button onClick={this.Cancel}>OK</button>;
		if (this.props.Yes != null)
			Yes = <button onClick={this.props.Yes}>Oui</button>;
		if (this.props.No != null)
			No = <button onClick={this.props.No}>Non</button>;
		if (this.props.Cancel != null)
			Cancel = <button onClick={this.props.Cancel}>Annuler</button>;
	    return (
	    	<div>
		    	<Modal isOpen={this.state.openModal} style={customStyles}>
		            <h1>{this.props.title}</h1>
		            <p>{this.props.content}</p>
		            {Cancel}
		            {Yes}
		            {No}
		    	</Modal>
	    	</div>
	    );
	}
});
