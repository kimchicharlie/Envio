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

RoomListItem = React.createClass({
    ModifMode : function (){
      this.props.changeToModif(this.props.room._id);
    },
    DeleteRoom : function (){
      this.props.changeToDelete(this.props.room._id, this.props.index);
    },
    render: function () {
          return (
            <li className="panel panel-success room-elem">
              <span className="w_20p">Nom :<h3 className="teal">{this.props.room.name}</h3></span>
              <span className="w_20p">Luminosité voulue : <h3 className="blue">{this.props.room.light + "%"}</h3></span>
              <span className="w_20p">Temperature voulue : <h3 className="red">{this.props.room.temperature + "°"}</h3></span>
              <span className="w_20p">Volume: <h3 className="purple">{this.props.room.volume + "m3"}</h3></span>
              <button className="btn btn-primary list-button w_15p pads" onClick={this.ModifMode}><i className="fa fa-pencil" aria-hidden="true"></i> Modifier</button>
              <button className="btn btn-danger list-button w_15p pads" onClick={this.DeleteRoom}><i className="fa fa-ban" aria-hidden="true"></i> Supprimer</button>
            </li>
        );
    }
});

RoomList = React.createClass({
    render: function () {
        var react = this;
        var items = this.props.rooms.map(function (room) {
            return (
                <RoomListItem key={room._id} room={room} changeToDelete={react.props.changeToDelete} changeToModif={react.props.changeToModif}/>
            );
        });
        return (
            <ul className="rooms-list">
                {items}
            </ul>
        );
    }
});

Rooms = React.createClass({
    getInitialState: function() {        
    return {
          rooms: [],
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
      changeToRoomList: function(){
        react = this;
      HttpPost('/getRooms', {
      'organisation': 'Envio',// a changer avec les info users            
    }, function(rep) {         
      rep = jQuery.parseJSON(rep);
      if (rep.error === null){
            react.setState({modif: null});
            react.setState({delete: null});
            react.setState({creat: null});        
        react.setState({rooms: rep.rooms});
      }
      else{
            react.setState({error:  rep.error});
            react.setState({modif: null});
            react.setState({delete: null});
            react.setState({creat: null});
            react.setState({rooms: []});
      }            
    });          
      },
    componentDidMount: function() {
    react = this;
      HttpPost('/getRooms', {
      'organisation': 'Envio',// a changer avec les info users            
    }, function(rep) {         
      rep = jQuery.parseJSON(rep);
      if (rep.error === null){
        react.setState({rooms: rep.rooms});
      }
      else{
        react.setState({error:  rep.error.message || rep.error});
        react.setState({rooms: []});
      }            
    });
    },
    render() {
          var cat = <RoomList rooms={this.state.rooms} changeToDelete={this.changeToDelete} changeToModif={this.changeToModif}/>;
          var creatbutton = <button className="button-medium-cl btn btn-success" onClick={this.changeToCreat}><i className="fa fa-plus-square" aria-hidden="true"></i> Créer salle</button>;
          if (this.state.creat !== null) 
          {
              cat = <CreateRoom changeToRoomList={this.changeToRoomList}/>;
              creatbutton = null;
          }                  
          if(this.state.modif !== null )
          {
              cat = <ModifRoom Id={this.state.modif} changeToRoomList={this.changeToRoomList}/>;
          }
          if(this.state.delete !== null )
          {
              cat = <DeleteRoom Id={this.state.delete} changeToRoomList={this.changeToRoomList}/>;
              creatbutton = null;
          }
          return (
              <div>
                <div className="content">
                    {cat}                   
                    {creatbutton}
            x    </div>
                <ErrorMessage content={this.state.error}/>
              </div>
          );
      }
});

ModifRoom = React.createClass({
    getInitialState: function() {
        return {
            status: false,
            room: null
        }
    },
    componentDidMount: function() {
       react = this;
           HttpPost('/getRoomPlusHardware', {
              'roomID': react.props.Id,         
          }, function(rep) {          
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              console.log(rep.room)
              react.setState({room: rep.room});
            }
            else if(react.state.status == false){
              react.setState({status :  rep.error.message || rep.error});
            } 
      });
    },    
    handleSubmit : function(event) {
        event.preventDefault();
        var name = ReactDOM.findDOMNode(this.refs.name).value;
        var volume = ReactDOM.findDOMNode(this.refs.volume).value;
        react = this;
        HttpPost('/modifyRoom', {
            'newName': name,
            'name': react.state.room.name,
            'volume': volume,            
        }, function(rep) {
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              react.setState({status: false});
              react.props.changeToRoomList();
            }
            else {
              react.setState({status : rep.error.message || rep.error});
            }             
        });
    },
    ChangeTemp : function(event) {
        var newValue = ReactDOM.findDOMNode(this.refs.temperature).value;
        react = this;
        HttpPost('/changeTemperature', {
            'roomID': react.props.Id,
            'temperature': newValue,
        }, function(rep) {          
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              if (rep.room.artificialIntellligence)
                react.ChangeIA();
              else{
              react.setState({status: false});
              react.props.changeToRoomList();
              }
            }
            else {
              react.setState({status : rep.error.message ||  rep.error});
            }
        });
    },
    ChangeLight : function(event) {
        var newValue = ReactDOM.findDOMNode(this.refs.light).value;
        react = this;
        HttpPost('/changeLight', {
            'roomID': react.props.Id,
            'light': newValue,
        }, function(rep) {          
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              if (rep.room.artificialIntellligence)
                react.ChangeIA();
              else{
              react.setState({status: false});
              react.props.changeToRoomList();
              }
            }
            else {
              react.setState({status : rep.error.message ||  rep.error});
            }
        });
    },
    ChangeIA : function(event) {
        react = this;
        HttpPost('/switchIA', {
            'roomID': react.props.Id,
        }, function(rep) {          
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              react.setState({status: false});
              if(react.props.changeToRoomList)
              react.props.changeToRoomList();
            }
            else {
              react.setState({status : rep.error.message ||  rep.error});
            }
        });
    },       
    render : function() {
    var MyWindow = null;
    var AirConditioning = null;
    var Captor = null;
    var IA = null;
    if (this.state.room){
      AirConditioning = <AirConditionings room={this.state.room._id} airConditionings={this.state.room.airConditionings} />;
      MyWindow = <Windows room={this.state.room._id} windows={this.state.room.windows}/>;
      Captor = <Captors room={this.state.room._id} captors={this.state.room.captors}/>;
      IA = <button className="btn button-medium" onClick={this.ChangeIA}> {!this.state.room.artificialIntellligence ? "Activer mode Intelligent" : "Désactiver mode Intelligent"} </button>;
  	}
        return (
        <div className="form">
          <form role="form" onSubmit={this.handleSubmit}>
           <h2 className="label-g"> Modifiez votre salle :<br></br> </h2>
             <ErrorMessage content={this.state.status}/>
            <div className="form-group">
              <div className="input-container">
                <input className="input-medium" ref="name" type="text" placeholder="Nom"/>
              </div>
              <div className="input-container">
                <input className="input-medium" ref="volume" type="number" placeholder="Volume" min="0"/>
              </div>
            </div>
            <button className="teal-b btn button-medium" type="submit"><i className="fa fa-pencil" aria-hidden="true"></i> Modifier</button>
          </form>
          <div className="input-container">
            <input className="input-medium" ref="temperature" type="number" placeholder={this.state.room ? this.state.room.temperature : 5} min="15" max="40"/>
          </div>
          <div>
            <button className="teal-b btn button-medium" onClick={this.ChangeTemp}><i className="fa fa-sun-o" aria-hidden="true"></i> Changer la température</button><br/>
          </div>
          <div className="input-container">
            <input className="input-medium" ref="light" type="number" placeholder={this.state.room ? this.state.room.light : 5} min="0" max="100"/>
          </div>
          <div>
            <button className="teal-b btn button-medium" onClick={this.ChangeLight}><i className="fa fa-lightbulb-o" aria-hidden="true"></i> Changer la luminosité</button><br/>        
          </div>
          {IA}
          {Captor}
          {MyWindow}
          {AirConditioning}
          <button className="red-b btn button-medium" onClick={this.props.changeToRoomList}><i className="fa fa-chevron-left" aria-hidden="true"></i> Retour</button>    
        </div>
        );
    }
});

CreateRoom = React.createClass({
    getInitialState: function() {
        return {
            status: false,
        }
    },
    handleSubmit : function(event) {
        event.preventDefault();
       // var organisation = ReactDOM.findDOMNode(this.refs.organisation).value;
        var name = ReactDOM.findDOMNode(this.refs.name).value;
        var volume = ReactDOM.findDOMNode(this.refs.volume).value;
        react = this;
        HttpPost('/createRoom', {
            'organisation': 'Envio',
            'name': name,
            'volume': volume,
            
        }, function(rep) {
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              react.setState({status: false});
              react.props.changeToRoomList();
            }
            else{
              react.setState({status : rep.error.message ||  rep.error});
            }            
        });
    },
    render : function() {   
        return (
        <div className="form bar bar-header-secondary">
            <h2 className="label-g"> Créez votre salle :<br></br> </h2>
             <ErrorMessage content={this.state.status}/>
             <form role="form" onSubmit={this.handleSubmit}>
                 <div className="form-group">
                  <div className="input-container">
                    <input className="input-medium" ref="name" type="text" placeholder="Nom"/>
                  </div>
                  <div className="input-container">
                    <input className="input-medium" ref="volume" type="number" placeholder="Volume" min="0"/>
                  </div>
                </div>
                <button className="btn btn-success button-medium" type="submit" ><i className="fa fa-plus-square" aria-hidden="true"></i> Créer salle</button>
              </form>
              <button className="red-b btn btn-success" onClick={this.props.changeToRoomList} ><i className="fa fa-chevron-left" aria-hidden="true"></i> Retour</button>
        </div>
        );
    }
});

                  // <div className="input-container">
                  //   <input className="input-medium" ref="organisation" type="text" placeholder="organisation"/>
                  // </div>

DeleteRoom = React.createClass({
    getInitialState : function() {
        return {
            error : false
        };
    },
    deleteRoom : function (){
      var react = this;
      HttpPost('/deleteRoom', {
        'roomID': react.props.Id,         
      }, function(rep) {
          rep = jQuery.parseJSON(rep);
          if(rep.error == null){
            react.props.changeToRoomList();  
          }
          else{
            react.setState({error :  rep.error});
          }             

      }); 
  },
  render: function () {
      return (
      <div className="form">
      <h2 className="label-g">Êtes-vous sûr ?<br></br> </h2>
      <button className="btn button-medium" onClick={this.deleteRoom}><i className="fa fa-check" aria-hidden="true"></i> Oui</button>
      <button  className="red-b btn button-medium" onClick={this.props.changeToRoomList}><i className="fa fa-ban" aria-hidden="true"></i> Non</button>
      <ErrorMessage content={this.state.error}/>
      </div>
    );
  }
});