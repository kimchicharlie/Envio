var React = require('react');
var ReactDOM = require('react-dom');
var cookie = require('react-cookie');
var utils = require('../../utils');


var Header = React.createClass({
	render() {
		return (
			<header className="bar bar-nav">
				<a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
				<h1 className="title">{this.props.text}</h1>
			</header>
		);
	}
});

ModeListItem = React.createClass({
    ModifMode : function (){
      this.props.changeToModif(this.props.mode[utils.getIdType()]);
    },
    DeleteMode : function (){
      this.props.changeToDelete(this.props.mode[utils.getIdType()]);
    },
	render: function () {
		return (
			<li className="panel panel-success mode-elem">
				<span className="w_20p">Nom : <h3 className="teal">{this.props.mode.name}</h3></span>
				<span className="w_20p">Luminosité: <h3 className="blue"> {this.props.mode.light}</h3></span>
				<span className="w_20p">Température : <h3 className="red"> {this.props.mode.temperature}</h3></span>
				<button className="btn btn-primary list-button w_20p pads " onClick={this.ModifMode}><i className="fa fa-pencil" aria-hidden="true"></i> Modifier</button>
				<button className="btn btn-danger list-button w_20p pads" onClick={this.DeleteMode}><i className="fa fa-ban" aria-hidden="true"></i> Supprimer</button>
			</li>
		);
	}
});

ModeList = React.createClass({
	render: function () {
		var react = this;
		var items = this.props.modes.map(function (mode) {
			return (
				<ModeListItem key={mode[utils.getIdType()]} mode={mode} changeToDelete={react.props.changeToDelete} changeToModif={react.props.changeToModif}/>
			);
		});
		return (
			<ul className="modes-list">
				{items}
			</ul>
		);
	}
});

Modes = React.createClass({
	  getInitialState: function() {
		return {
			modes: [],
			creat :null,
			modif :null,
			delete :null,
			error : false
		};
	  },
  	  changeToCreate: function(){
          this.setState({creat: true});
          this.setState({modif: null});
          this.setState({delete: null});
      },
      changeToModif: function(Id){
          this.setState({modif: Id});
          this.setState({creat: null});
          this.setState({delete: null});
      },
      changeToDelete: function(Id){
      	  this.setState({delete: Id});
          this.setState({modif: null});
          this.setState({creat: null});          
      },
      changeToModeList: function(){
      	react = this;
		  HttpPost('/getModes', {
			'organisation': this.props.Organisation,// a changer avec les info users            
		}, function(rep) {         
			rep = jQuery.parseJSON(rep);
			if (rep.error == null){
	          react.setState({modif: null});
	          react.setState({delete: null});
	          react.setState({creat: null});			  
			  react.setState({modes: rep.modes});
			}
			else{
			  react.setState({modes: []});
	          react.setState({modif: null});
	          react.setState({delete: null});
	          react.setState({creat: null});
	          react.setState({error :rep.error});
			}            
		});          
      },  
	  componentDidMount: function() {
		console.log(this.props.Organisation)
		react = this;
		  HttpPost('/getModes', {
			'organisation': this.props.Organisation,            
		}, function(rep) {         
			rep = jQuery.parseJSON(rep);
			if (rep.error === null){
			  react.setState({modes: rep.modes});
			}
			else{
			  react.setState({error:rep.error});
			  react.setState({modes: []});
			}            
		});
	  },
	  render() {
          var cat = <ModeList modes={this.state.modes} changeToDelete={this.changeToDelete} changeToModif={this.changeToModif}/>;
          var createButton = <button className="button-medium-cl btn btn-success" onClick={this.changeToCreate}><i className="fa fa-plus-square" aria-hidden="true"></i> Créer Mode</button>;
          if (this.state.creat !== null) 
          {
              cat = <CreateMode Organisation={this.props.Organisation} changeToModeList={this.changeToModeList}/>;
              createButton = null;
          }                  
          if(this.state.modif !== null )
          {
              cat = <ModifMode Id={this.state.modif} changeToModeList={this.changeToModeList}/>;
          }
          if(this.state.delete !== null )
          {
              cat = <DeleteMode Id={this.state.delete} changeToModeList={this.changeToModeList}/>;
              createButton = null;
          }	  	  
		  return (
			  <div>
				<div className="content">
					{cat}                   
                    {createButton}
				</div>
				<ErrorMessage content={this.state.error}/>
			  </div>
		  );
	  }
});

ModifMode = React.createClass({
	getInitialState: function() {
		return {
			status: false,
			mode: null
		}
	},
	componentDidMount: function() {
	   react = this;
	   HttpPost('/getMode', {
		  'modeID': react.props.Id,         
	  }, function(rep) {          
			rep = jQuery.parseJSON(rep);
			if(rep.error == null){
				react.setState({mode: rep.mode});
			}
			else if(react.state.status == false){
				react.setState({status :rep.error});
			}		  
	  });
	},    
	handleSubmit(event) {
		event.preventDefault();
		var newName = ReactDOM.findDOMNode(this.refs.newName).value;
		var light = ReactDOM.findDOMNode(this.refs.light).value;
		var temperature = ReactDOM.findDOMNode(this.refs.temperature).value;
		react = this;
		HttpPost('/modifyMode', {
			'modeID' : react.props.Id,
			'newName' : newName,
			'light' : light,
			'opacity' : 0,
			'temperature' : temperature
		}, function(rep) {          
			rep = jQuery.parseJSON(rep)
			if(rep.error == null){
				react.setState({status: false})
				react.props.changeToModeList()
			}
			else {
				react.setState({status : rep.error.message || rep.error});
			}			
		})
	},
	render() {    
		return (
		<div className="form bar bar-header-secondary">
			 <form role="form" onSubmit={this.handleSubmit}>
			 	 <h2 className="label-g"> Modifiez votre mode :<br></br> </h2>
			 	 <ErrorMessage content={this.state.status}/>
				 <div className="">
					<div className="input-container">
		            	<input className="input-medium" ref="newName" type="text" placeholder="Nom"/>
		            </div>
		            <div className="input-container">
		            	<input className="input-medium" ref="light" type="number" placeholder="Luminosité" min="0" max="100"/>
		            </div>
		            <div className="input-container">
		            	<input className="input-medium" ref="temperature" type="number" placeholder="Température" min="15" max="40"/>
		            </div>
				</div>
				<button className="btn button-medium" type="submit"><i className="fa fa-pencil" aria-hidden="true"></i> Modifier</button>
			  </form>
			  <button className="red-b btn button-medium" onClick={this.props.changeToModeList}><i className="fa fa-chevron-left" aria-hidden="true"></i> Retour</button>
		</div>
		);
	}
});
		            // <div className="input-container">
		            // 	<input className="input-medium" ref="opacity" type="number" placeholder="Opacité" min="0" max="100"/>
		            // </div>


CreateMode = React.createClass({
	getInitialState: function() {
		return {
			status: false,
		};
	},
	handleSubmit(event) {
		event.preventDefault();
		//var organisation = ReactDOM.findDOMNode(this.refs.organisation).value
		var name = ReactDOM.findDOMNode(this.refs.name).value
		var light = ReactDOM.findDOMNode(this.refs.light).value
		var temperature = ReactDOM.findDOMNode(this.refs.temperature).value
		react = this;
		HttpPost('/createMode', {
			'organisation': this.props.Organisation,
			'name': name,
			'light': light,
			'opacity': 0,
			'temperature': temperature
			
		}, function(rep) {
			rep = jQuery.parseJSON(rep);
			if(rep.error == null){
				react.setState({status: false});
				react.props.changeToModeList();
			}
			else{
				react.setState({status :rep.error});
			}
		});
	},
	render() {
		return (
			<div className="form bar bar-header-secondary">
				<form role="form" onSubmit={this.handleSubmit}>
				 <h2 className="label-g"> Créez votre mode de salle<br></br> </h2>
					<div className="form-group">
						<ErrorMessage content={this.state.status}/>
		                <div className="input-container">
		                	<input className="input-medium" ref="name" type="text" placeholder="Nom"/>
		                </div>
		                <div className="input-container">
		                	<input className="input-medium" ref="light" type="number" placeholder="Luminosité" min="0" max="100"/>
		                </div>
		                <div className="input-container">
		                	<input className="input-medium" ref="temperature" type="number" placeholder="Température" min="15" max="40"/>
		                </div>
					</div>
					<button className="btn btn-success button-medium" type="submit" ><i className="fa fa-plus-square" aria-hidden="true"></i> Créer</button>
				</form>
				<button className="red-b btn btn-success button-medium" onClick={this.props.changeToModeList} ><i className="fa fa-chevron-left" aria-hidden="true"></i> Retour</button>
			</div>
		);
	}
});

						// <div className="input-container">
					    // <input className="input-medium" ref="organisation" type="text" placeholder="Organisation"/>
					    // </div>
		                // <div className="input-container">
		                // 	<input className="input-medium" ref="opacity" type="number" placeholder="Opacité" min="0" max="100"/>
		                // </div>


DeleteMode = React.createClass({
    getInitialState : function() {
        return {
            error : false
        };
    },
    deleteMode : function (){
	  	var react = this;
		HttpPost('/deleteMode', {
		  'modeID': react.props.Id,         
		}, function(rep) {          
		  	rep = jQuery.parseJSON(rep);
			if(rep.error == null){
				react.props.changeToModeList();     
			}
			else{
				react.setState({error :rep.error});
			}		  
		});	
    },
	render: function () {
			return (
			<div className="form">
			<h2 className="label-g">Êtes-vous sûr ?<br></br> </h2>
			<button className=" btn button-medium" onClick={this.deleteMode}><i className="fa fa-check" aria-hidden="true"></i> Oui</button>
			<button className="red-b btn button-medium" onClick={this.props.changeToModeList}><i className="fa fa-ban" aria-hidden="true"></i> Non</button>
			<ErrorMessage content={this.state.error}/>
			</div>
		);
	}
});