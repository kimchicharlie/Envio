var React = require('react');
var ReactDOM = require('react-dom');
var cookie = require('react-cookie');


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
      this.props.changeToModif(this.props.mode._id);
    },
    DeleteMode : function (){
      this.props.changeToDelete(this.props.mode._id);
    },
	render: function () {
		return (
			<li className="mode-elem">
				<span className="w_20p">Nom : {this.props.mode.name}</span>
				<span className="w_20p">Luminosité: {this.props.mode.light}</span>
				<span className="w_20p">Température : {this.props.mode.temperature}</span>
				<button className="list-button w_15p" onClick={this.ModifMode}>Modifier</button>
				<button className="list-button w_15p" onClick={this.DeleteMode}>Supprimer</button>
			</li>
		);
	}
});

ModeList = React.createClass({
	render: function () {
		var react = this;
		var items = this.props.modes.map(function (mode) {
			return (
				<ModeListItem key={mode._id} mode={mode} changeToDelete={react.props.changeToDelete} changeToModif={react.props.changeToModif}/>
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
			'organisation': 'Envio',// a changer avec les info users            
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
		react = this;
		  HttpPost('/getModes', {
			'organisation': 'Envio',// a changer avec les info users            
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
          var createButton = <button className="button-medium" onClick={this.changeToCreate}>Créer Mode</button>;
          if (this.state.creat !== null) 
          {
              cat = <CreateMode changeToModeList={this.changeToModeList}/>;
              creatbutton = null;
          }                  
          if(this.state.modif !== null )
          {
              cat = <ModifMode Id={this.state.modif} changeToModeList={this.changeToModeList}/>;
          }
          if(this.state.delete !== null )
          {
              cat = <DeleteMode Id={this.state.delete} changeToModeList={this.changeToModeList}/>;
              creatbutton = null;
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
		<div className="bar bar-header-secondary">
			 <form role="form" onSubmit={this.handleSubmit}>
				 <div className="form-group">
					<div className="input-container">
		            	<input className="input-medium" ref="newName" type="text" placeholder="Nom"/>
		            </div>
		            <div className="input-container">
		            	<input className="input-medium" ref="light" type="number" placeholder="Luminosité" min="0" max="100"/>
		            </div>
		            <div className="input-container">
		            	<input className="input-medium" ref="opacity" type="number" placeholder="Opacité" min="0" max="100"/>
		            </div>
		            <div className="input-container">
		            	<input className="input-medium" ref="temperature" type="number" placeholder="Température" min="15" max="40"/>
		            </div>
				</div>
				<button className="button-medium" type="submit">Modifier</button>
			  </form>
			  <button className="button-medium" onClick={this.props.changeToModeList}>Retour</button>
			  <ErrorMessage content={this.state.status}/>
		</div>
		);
	}
});

		            // <div className="input-container">
		            // 	<input className="input-medium" ref="opacity" type="text" placeholder="Opacité"/>
		            // </div>


CreateMode = React.createClass({
	getInitialState: function() {
		return {
			status: false,
		};
	},
	handleSubmit(event) {
		event.preventDefault();
		var organisation = ReactDOM.findDOMNode(this.refs.organisation).value
		var name = ReactDOM.findDOMNode(this.refs.name).value
		var light = ReactDOM.findDOMNode(this.refs.light).value
		var opacity = ReactDOM.findDOMNode(this.refs.opacity).value
		var temperature = ReactDOM.findDOMNode(this.refs.temperature).value
		react = this;
		HttpPost('/createMode', {
			'organisation': organisation,
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
			<div className="bar bar-header-secondary">
				<form role="form" onSubmit={this.handleSubmit}>
					<div className="form-group">
						<div className="input-container">
		                	<input className="input-medium" ref="organisation" type="text" placeholder="Organisation"/>
		                </div>
		                <div className="input-container">
		                	<input className="input-medium" ref="name" type="text" placeholder="Nom"/>
		                </div>
		                <div className="input-container">
		                	<input className="input-medium" ref="light" type="number" placeholder="Luminosité" min="0" max="100"/>
		                </div>
		                <div className="input-container">
		                	<input className="input-medium" ref="opacity" type="number" placeholder="Opacité" min="0" max="100"/>
		                </div>
		                <div className="input-container">
		                	<input className="input-medium" ref="temperature" type="number" placeholder="Température" min="15" max="40"/>
		                </div>
					</div>
					<button className="button-medium" type="submit" >Créer</button>
				</form>
				<button className="button-medium" onClick={this.props.changeToModeList} >Retour</button>
				<ErrorMessage content={this.state.status}/>
			</div>
		);
	}
});

		                // <div className="input-container">
		                // 	<input className="input-medium" ref="opacity" type="text" placeholder="Opacité"/>
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
			<div>
			Êtes-vous sûr ?
			<button className="button-medium" onClick={this.deleteMode}>Oui</button>
			<button className="button-medium" onClick={this.props.changeToModeList} >Non</button>
			<ErrorMessage content={this.state.error}/>
			</div>
		);
	}
});