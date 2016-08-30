var React = require('react');
var ReactDOM = require('react-dom');
var cookie = require('react-cookie');


CaptorListItem = React.createClass({
    ModifCaptor : function (){
      this.props.changeToModif(this.props.captor._id);
    },
    DeleteCaptor : function (){
      this.props.changeToDelete(this.props.captor._id, this.props.index);
    },
    render: function () {
          return (
            <li className="room-elem">
              <span className="w_20p">Type : {this.props.captor.type} </span>
              <span className="w_20p">Dernière valeur : {this.props.captor.value + " °"}</span>
              <button className="list-button w_15p" onClick={this.ModifCaptor}>Modifier</button>
              <button className="list-button w_15p" onClick={this.DeleteCaptor}>Supprimer</button>
            </li>
        );
    }
});

CaptorList = React.createClass({
    render: function () {
        var react = this;
        var items = this.props.captors.map(function (captor) {
            return (
                <CaptorListItem key={captor._id} captor={captor} changeToDelete={react.props.changeToDelete} changeToModif={react.props.changeToModif}/>
            );
        });
        return (
            <ul className="captors-list">
                {items}
            </ul>
        );
    }
});

Captors = React.createClass({
    getInitialState: function() {        
      return {
          captors: this.props.captors,
          creat :null,
          modif :null,
          delete :null,
          error : false
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
      changeToCaptorList: function(){
        react = this;
      HttpPost('/getCaptors', {
      'room': this.props.room,
    }, function(rep) {         
      rep = jQuery.parseJSON(rep);
      if (rep.error === null){
            react.setState({modif: null});
            react.setState({delete: null});
            react.setState({creat: null});        
            react.setState({captors: rep.captors});
      }
      else{
            react.setState({error:  rep.error});
            react.setState({modif: null});
            react.setState({delete: null});
            react.setState({creat: null});
            react.setState({captors: []});
      }            
    });          
      },
    componentDidMount: function() {
      react = this;
        HttpPost('/getCaptors', {
          'room': this.props.room,         
          }, function(rep) {     
          rep = jQuery.parseJSON(rep);
          if (rep.error === null){
            react.setState({captors: rep.captors});
          }
          else{
            react.setState({error:  rep.error.message || rep.error});
            react.setState({captors: []});
          }            
      });
    },
    render : function() {
          var cat = <CaptorList captors={this.state.captors} changeToDelete={this.changeToDelete} changeToModif={this.changeToModif}/>;
          var creatbutton = <button className="button-medium" onClick={this.changeToCreat}>Créer capteur</button>;
          if (this.state.creat !== null) 
          {
              cat = <CreateCaptor roomID={this.props.room} changeToCaptorList={this.changeToCaptorList}/>;
              creatbutton = null;
          }                  
          if(this.state.modif !== null )
          {
              cat = <ModifCaptor Id={this.state.modif} changeToCaptorList={this.changeToCaptorList}/>;
          }
          if(this.state.delete !== null )
          {
              cat = <DeleteCaptor Id={this.state.delete} changeToCaptorList={this.changeToCaptorList}/>;
              creatbutton = null;
          }
          return (
              <div>
                <div className="content">
                    {cat}                   
                    {creatbutton}
                </div>
                <ErrorMessage content={this.state.error}/>
              </div>
          );
      }
});

ModifCaptor = React.createClass({
    getInitialState: function() {
        return {
            status: false,
            captor: null
        }
    },
    componentDidMount: function() {
       react = this;
           HttpPost('/getCaptor', {
              'captorID': react.props.Id,         
          }, function(rep) {          
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              react.setState({captor: rep.captor});
            }
            else if(react.state.status == false){
              react.setState({status :  rep.error.message || rep.error});
            } 
      });
    },    
    handleSubmit(event) {
        event.preventDefault();
        var type = ReactDOM.findDOMNode(this.refs.type).value;
        var value = ReactDOM.findDOMNode(this.refs.valueCaptor).value;
        react = this;
        HttpPost('/modifyCaptor', {
            'captorID': react.props.Id,
            'type':type,
            'value':value,
        }, function(rep) {
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              react.setState({status: false});
              react.props.changeToCaptorList();
            }
            else {
              react.setState({status : rep.error.message || rep.error});
            }
        });
    },    
    render() {    
        return (
        <div className="bar bar-header-secondary">
          <form role="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="input-container">
                <input className="input-medium" ref="type" type="text" placeholder="Type"/>
              </div>
              <div className="input-container">
                <input className="input-medium" ref="valueCaptor" type="text" placeholder="Valeur"/>
              </div>
            </div>
            <button className="button-medium" type="submit">Modifier</button>
          </form>
          <div>
            <button className="button-medium" onClick={this.props.changeToCaptorList}>Retour</button>            
          </div>          
          <ErrorMessage content={this.state.status}/>
        </div>
        );
    }
});

CreateCaptor = React.createClass({
    getInitialState: function() {
        return {
            status: false,
        }
    },
    handleSubmit(event) {
        event.preventDefault();
        var type = ReactDOM.findDOMNode(this.refs.type).value;
        var value = ReactDOM.findDOMNode(this.refs.value).value;
        react = this;
        HttpPost('/createCaptor', {
            'room': react.props.roomID,
            'type': type,
            'value': value,            
        }, function(rep) {
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              react.setState({status: false});
              react.props.changeToCaptorList();
            }
            else{
              react.setState({status : rep.error.message ||  rep.error});
            }            
        });
    },
    render() {   
        return (
        <div className="bar bar-header-secondary">
             <form role="form" onSubmit={this.handleSubmit}>
                 <div className="form-group">
                  <div className="input-container">
                    <input className="input-medium" ref="type" type="text" placeholder="Type"/>
                  </div>
                  <div className="input-container">
                    <input className="input-medium" ref="value" type="text" placeholder="Value"/>
                  </div>
                </div>
                <button className="button-medium" type="submit" >Créer capteur</button>
              </form>
              <button className="button-medium" onClick={this.props.changeToCaptorList} >Retour</button>
              <ErrorMessage content={this.state.status}/>
        </div>
        );
    }
});

DeleteCaptor = React.createClass({
    getInitialState : function() {
        return {
            error : false
        };
    },
    deleteCaptor : function (){
      var react = this;
      HttpPost('/deleteCaptor', {
        'captorID': react.props.Id,         
      }, function(rep) {
          rep = jQuery.parseJSON(rep);
          if(rep.error == null){
            react.props.changeToCaptorList();  
          }
          else{
            react.setState({error :  rep.error});
          }             

      }); 
    },
    render: function () {
        return (
        <div>
        Êtes-vous sûr ?
        <button className="button-medium" onClick={this.deleteCaptor}>Oui</button>
        <button  className="button-medium" onClick={this.props.changeToCaptorList} >Non</button>
        <ErrorMessage content={this.state.error}/>
        </div>
      );
    }
});