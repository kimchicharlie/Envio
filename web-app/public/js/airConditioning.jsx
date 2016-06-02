var React = require('react');
var ReactDOM = require('react-dom');
var cookie = require('react-cookie');


AirConditioningListItem = React.createClass({
    ModifAirConditioning : function (){
      this.props.changeToModif(this.props.airConditioning._id);
    },
    DeleteAirConditioning : function (){
      this.props.changeToDelete(this.props.airConditioning._id, this.props.index);
    },
    render: function () {
          return (
            <li className="room-elem">
              <span className="w_20p">Temperature voulus : {this.props.airConditioning.temperatureWanted} °</span>
              <button className="list-button w_15p" onClick={this.ModifAirConditioning}>Modifier</button>
              <button className="list-button w_15p" onClick={this.DeleteAirConditioning}>Supprimer</button>
            </li>
        );
    }
});

AirConditioningList = React.createClass({
    render: function () {
        var react = this;
        var items = this.props.airConditionings.map(function (airConditioning) {
            return (
                <AirConditioningListItem key={airConditioning._id} airConditioning={airConditioning} changeToDelete={react.props.changeToDelete} changeToModif={react.props.changeToModif}/>
            );
        });
        return (
            <ul className="airConditionings-list">
                {items}
            </ul>
        );
    }
});

AirConditionings = React.createClass({
    getInitialState: function() {        
    return {
          airConditionings: [],
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
      changeToAirConditioningList: function(){
        react = this;
      HttpPost('/getAirConditionings', {
      'room': this.props.room,
    }, function(rep) {         
      rep = jQuery.parseJSON(rep);
      if (rep.error === null){
            react.setState({modif: null});
            react.setState({delete: null});
            react.setState({creat: null});        
        react.setState({airConditionings: rep.airConditionings});
      }
      else{
            react.setState({error:  rep.error});
            react.setState({modif: null});
            react.setState({delete: null});
            react.setState({creat: null});
            react.setState({airConditionings: []});
      }            
    });          
      },
    componentDidMount: function() {
    react = this;
      HttpPost('/getAirConditionings', {
      'room': this.props.room,         
    }, function(rep) {     
      rep = jQuery.parseJSON(rep);
      if (rep.error === null){
        console.log(rep)
        react.setState({airConditionings: rep.airConditionings});
      }
      else{
        console.log(rep)
        react.setState({error:  rep.error.message || rep.error});
        react.setState({airConditionings: []});
      }            
    });
    },
    render() {
          var cat = <AirConditioningList airConditionings={this.state.airConditionings} changeToDelete={this.changeToDelete} changeToModif={this.changeToModif}/>;
          var creatbutton = <button className="button-medium" onClick={this.changeToCreat}>Créer air conditionner</button>;
          if (this.state.creat !== null) 
          {
              cat = <CreateAirConditioning roomID={this.props.room} changeToAirConditioningList={this.changeToAirConditioningList}/>;
              creatbutton = null;
          }                  
          if(this.state.modif !== null )
          {
              cat = <ModifAirConditioning Id={this.state.modif} changeToAirConditioningList={this.changeToAirConditioningList}/>;
          }
          if(this.state.delete !== null )
          {
              cat = <DeleteAirConditioning Id={this.state.delete} changeToAirConditioningList={this.changeToAirConditioningList}/>;
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

ModifAirConditioning = React.createClass({
    getInitialState: function() {
        return {
            status: false,
            airConditioning: null
        }
    },
    componentDidMount: function() {
       react = this;
           HttpPost('/getAirConditioning', {
              'airConditioningID': react.props.Id,         
          }, function(rep) {          
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              react.setState({airConditioning: rep.airConditioning});
            }
            else if(react.state.status == false){
              react.setState({status :  rep.error.message || rep.error});
            } 
      });
    },    
    handleSubmit(event) {
        event.preventDefault();
        var temperaturewanted = ReactDOM.findDOMNode(this.refs.temperaturewanted).value;
        react = this;
        HttpPost('/modifyAirConditioning', {
            'airConditioningID': react.props.Id,
            'temperaturewanted':temperaturewanted,
        }, function(rep) {
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              react.setState({status: false});
              react.props.changeToAirConditioningList();
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
                <input className="input-medium" ref="temperaturewanted" type="text" placeholder="TemperatureWanted"/>
              </div>            
            </div>
            <button className="button-medium" type="submit">Modifier</button>
          </form>
          <div>
            <button className="button-medium" onClick={this.props.changeToAirConditioningList}>Retour</button>            
          </div>          
          <ErrorMessage content={this.state.status}/>
        </div>
        );
    }
});

CreateAirConditioning = React.createClass({
    getInitialState: function() {
        return {
            status: false,
        }
    },
    handleSubmit(event) {
        event.preventDefault();
        var temperaturewanted = ReactDOM.findDOMNode(this.refs.temperaturewanted).value;
        react = this;
        HttpPost('/createAirConditioning', {
            'room': react.props.roomID,
            'temperaturewanted': temperaturewanted,            
        }, function(rep) {
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              react.setState({status: false});
              react.props.changeToAirConditioningList();
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
                    <input className="input-medium" ref="temperaturewanted" type="text" placeholder="temperaturewanted"/>
                  </div>
                </div>
                <button className="button-medium" type="submit" >Créer air conditionner</button>
              </form>
              <button className="button-medium" onClick={this.props.changeToAirConditioningList} >Retour</button>
              <ErrorMessage content={this.state.status}/>
        </div>
        );
    }
});

DeleteAirConditioning = React.createClass({
    getInitialState : function() {
        return {
            error : false
        };
    },
    deleteAirConditioning : function (){
      var react = this;
      HttpPost('/deleteAirConditioning', {
        'airConditioningID': react.props.Id,         
      }, function(rep) {
          rep = jQuery.parseJSON(rep);
          if(rep.error == null){
            react.props.changeToAirConditioningList();  
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
        <button className="button-medium" onClick={this.deleteAirConditioning}>Oui</button>
        <button  className="button-medium" onClick={this.props.changeToAirConditioningList} >Non</button>
        <ErrorMessage content={this.state.error}/>
        </div>
      );
    }
});