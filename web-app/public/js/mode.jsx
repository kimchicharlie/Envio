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
    handleClick : function (){
      this.props.changeToModif(this.props.mode._id);
    },
	render: function () {
		return (
			<li className="mode-elem">
				<span className="w_20p">Nom : {this.props.mode.name}</span>
				<span className="w_20p">Luminosité: {this.props.mode.light}</span>
				<span className="w_20p">Opacité : {this.props.mode.opacity}</span>
				<span className="w_20p">Température : {this.props.mode.temperature}</span>
				<button className="list-button w_15p" onClick={this.handleClick}>Modifier</button>
			</li>
		);
	}
});

ModeList = React.createClass({
	render: function () {
		var react = this
		var items = this.props.modes.map(function (mode) {
			return (
				<ModeListItem key={mode._id} mode={mode} changeToModif={react.props.changeToModif}/>
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
			selectedCat :null,
		};
	  },
  	  changeToCreate: function(){
          this.setState({selectedCat:"create"});
      },
      changeToModif: function(Id){
          this.setState({selectedCat:Id});
      },
      changeToModeList: function(){
      	react = this;
		  HttpPost('/getModes', {
			'organisation': 'Envio',// a changer avec les info users            
		}, function(ret) {         
			rep = jQuery.parseJSON(ret);
			if (rep.error === null){
			  react.setState({modes: rep.modes});
			  react.setState({selectedCat:null});
			}
			else{
			  react.setState({modes: rep.error});
			  react.setState({selectedCat:null});
			}            
		});          
      },  
	  componentDidMount: function() {
		react = this;
		  HttpPost('/getModes', {
			'organisation': 'Envio',// a changer avec les info users            
		}, function(ret) {         
			rep = jQuery.parseJSON(ret);
			if (rep.error === null){
			  react.setState({modes: rep.modes});
			}
			else{
			  react.setState({modes: rep.error});
			}            
		});
	  },
	  render() {
          var cat = <ModeList modes={this.state.modes} changeToModif={this.changeToModif}/>;
          var createButton = <button className="button-medium" onClick={this.changeToCreate}>Créer Mode</button>;
          if (this.state.selectedCat == "create") 
          {
              cat = <CreateMode changeToModeList={this.changeToModeList}/>;
              createButton = null
          }                  
          if(this.state.selectedCat != "create" && this.state.selectedCat !== null )
          {
              cat = <ModifMode Id={this.state.selectedCat} changeToModeList={this.changeToModeList}/>;
          }	  	  
		  return (
			  <div>
				<div className="content">
					{cat}                   
                    {createButton}
				</div>
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
	  }, function(ret) {          
		  rep = jQuery.parseJSON(ret)
		  react.setState({mode: rep.mode})
	  })
	},    
	handleSubmit(event) {
		event.preventDefault()
		var newName = ReactDOM.findDOMNode(this.refs.newName).value
		var light = ReactDOM.findDOMNode(this.refs.light).value
		var opacity = ReactDOM.findDOMNode(this.refs.opacity).value
		var temperature = ReactDOM.findDOMNode(this.refs.temperature).value
		react = this;
		HttpPost('/modifyMode', {
			'modeID' : react.props.Id,
			'newName' : newName,
			'light' : light,
			'opacity' : opacity,
			'temperature' : temperature
		}, function(ret) {          
			rep = jQuery.parseJSON(ret)
			react.setState({status: rep})
		})
	},
	render() {
		if(this.state.status){
		  if (this.state.status.error == null) 
		  {            
			return (
					<div className="bar bar-header-secondary">
						Modif success full!
						<button onClick={this.props.changeToModeList} >Retour</button>
					</div>
				   );                    
		  }
		}      
		return (
		<div className="bar bar-header-secondary">
			 <form role="form" onSubmit={this.handleSubmit}>
				 <div className="form-group">
					<div className="input-container">
		            	<input className="input-medium" ref="newName" type="text" placeholder="Nom"/>
		            </div>
		            <div className="input-container">
		            	<input className="input-medium" ref="light" type="text" placeholder="Luminosité"/>
		            </div>
		            <div className="input-container">
		            	<input className="input-medium" ref="opacity" type="text" placeholder="Opacité"/>
		            </div>
		            <div className="input-container">
		            	<input className="input-medium" ref="temperature" type="text" placeholder="Température"/>
		            </div>
				</div>
				<button className="button-medium" type="submit">Modifier</button>
			  </form>
			  <button className="button-medium" onClick={this.props.changeToModeList}>Retour</button>
		</div>
		);
	}
});


CreateMode = React.createClass({
	getInitialState: function() {
		return {
			status: false,
		};
	},
	handleSubmit(event) {
		event.preventDefault()
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
			'opacity': opacity,
			'temperature': temperature
			
		}, function(ret) {          
			rep = jQuery.parseJSON(ret)
			react.setState({status: rep})
		})
	},
	render() {
		if(this.state.status){
		  if (this.state.status.error == null) 
		  {            
			return (
					<div className="bar bar-header-secondary">
						Création réussie !
						<button onClick={this.props.changeToModeList} >Retour</button>
					</div>
				   );                    
		  }
		}      
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
		                	<input className="input-medium" ref="light" type="text" placeholder="Luminosité"/>
		                </div>
		                <div className="input-container">
		                	<input className="input-medium" ref="opacity" type="text" placeholder="Opacité"/>
		                </div>
		                <div className="input-container">
		                	<input className="input-medium" ref="temperature" type="text" placeholder="Température"/>
		                </div>
					</div>
					<button className="button-medium" type="submit" >Créer</button>
				</form>
				<button className="button-medium" onClick={this.props.changeToModeList} >Retour</button>
			</div>
		);
	}
});
