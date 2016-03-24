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
    deleteMode : function (){
      this.props.changeToDelete(this.props.mode._id);
    },
	render: function () {
			return (
			<li className="table-view-cell media">
				<div>name: {this.props.mode.name}</div>
				<div>Luminosité: {this.props.mode.light}</div>
				<div>Opacité : {this.props.mode.opacity}</div>
				<div>Temperature : {this.props.mode.temperature}</div>
				<button onClick={this.ModifMode}>Modifier</button>
				<button onClick={this.deleteMode}>Supprimer</button>
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
			<ul  className="table-view">
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
		};
	  },
  	  changeToCreat: function(){
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
	  deleteMode : function (modeID, index){
	  	var react = this;
		HttpPost('/deleteMode', {
		  'modeID': modeID,         
		}, function(ret) {          
		  rep = jQuery.parseJSON(ret);
		  //console.log(rep);
		  if(rep.error === null){
		  	react.state.modes.splice(index,1);
		  }
		  react.changeToModeList();
		});		
	  },
      changeToModeList: function(){
      	react = this;
		  HttpPost('/getModes', {
			'organisation': 'Envio',// a changer avec les info users            
		}, function(ret) {         
			rep = jQuery.parseJSON(ret);
			if (rep.error === null){
	          react.setState({modif: null});
	          react.setState({delete: null});
	          react.setState({creat: null});			  
			  react.setState({modes: rep.modes});
			}
			else{
			  react.setState({modes: rep.error});
	          react.setState({modif: null});
	          react.setState({delete: null});
	          react.setState({creat: null});
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
          var cat = <ModeList modes={this.state.modes} changeToDelete={this.changeToDelete} changeToModif={this.changeToModif}/>;
          var creatbutton = <button onClick={this.changeToCreat}>Creat Mode</button>;
          if (this.state.creat !== null) 
          {
              cat = <CreatMode changeToModeList={this.changeToModeList}/>;
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
				<Header text="Envio Mode"/>
				<div className="content">
					{cat}                   
                    {creatbutton}
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
		  rep = jQuery.parseJSON(ret);
		  console.log(rep);
		  react.setState({mode: rep.mode});
	  });
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
			console.log(rep)
			react.setState({status: rep})
			react.props.changeToModeList()
		})
	},
	render() {    
		return (
		<div className="bar bar-header-secondary">
			 <form role="form" onSubmit={this.handleSubmit}>
				 <div className="form-group">
				  <input ref="newName" type="text" placeholder="new name" />
				  <input ref="light" type="text" placeholder="new light" />
				  <input ref="opacity" type="text" placeholder="new opacity" />
				  <input ref="temperature" type="text" placeholder="new temperature" />
				</div>
				<button type="submit" >modif</button>
			  </form>
			  <button onClick={this.props.changeToModeList} >Retour</button>
		</div>
		);
	}
});


CreatMode = React.createClass({
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
			'opacity': opacity,
			'temperature': temperature
			
		}, function(ret) {          
			rep = jQuery.parseJSON(ret);
			console.log(rep);
			react.setState({status: rep});
			react.props.changeToModeList()
		});
	},
	render() {    
		return (
		<div className="bar bar-header-secondary">
			 <form role="form" onSubmit={this.handleSubmit}>
				 <div className="form-group">
				  <input ref="organisation" type="text" placeholder="organisation" />
				  <input ref="name" type="text" placeholder="name" />
				  <input ref="light" type="text" placeholder="light" />
				  <input ref="opacity" type="text" placeholder="opacity" />
				  <input ref="temperature" type="text" placeholder="temperature" />
				</div>
				<button type="submit" >Creat</button>
			  </form>
			  <button onClick={this.props.changeToModeList} >Retour</button>
		</div>
		);
	}
});


DeleteMode = React.createClass({
    deleteMode : function (){
      	  	var react = this;
		HttpPost('/deleteMode', {
		  'modeID': react.props.Id,         
		}, function(ret) {          
		  rep = jQuery.parseJSON(ret);
		  //console.log(rep);
		  react.props.changeToModeList();
		});	
    },
	render: function () {
			return (
			<div>
			Êtes-vous sûr ?
			<button onClick={this.deleteMode}>Oui</button>
			<button onClick={this.props.changeToModeList} >Non</button>
			</div>
		);
	}
});