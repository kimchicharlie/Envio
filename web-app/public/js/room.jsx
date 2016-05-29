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
            <li className="room-elem">
              <span className="w_20p">Nom : {this.props.room.name}</span>
              <span className="w_20p">Température actuelle : {this.props.room.realTemperature + "°"}</span>
              <span className="w_20p">Temperature voulue : {this.props.room.temperature + "°"}</span>
              <span className="w_20p">Volume: {this.props.room.volume + "m3"}</span>
              <button className="list-button w_15p" onClick={this.ModifMode}>Modifier</button>
              <button className="list-button w_15p" onClick={this.DeleteRoom}>Supprimer</button>
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
          var creatbutton = <button className="button-medium" onClick={this.changeToCreat}>Creat Room</button>;
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
                </div>
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
           HttpPost('/getRoom', {
              'roomID': react.props.Id,         
          }, function(rep) {          
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              react.setState({room: rep.room});
            }
            else if(react.state.status == false){
              react.setState({status :  rep.error.message || rep.error});
            } 
      });
    },    
    handleSubmit(event) {
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
    ChangeTemp(event) {
        var newValue = ReactDOM.findDOMNode(this.refs.temperature).value;
        react = this;
        HttpPost('/changeTemperature', {
            'roomID': react.props.Id,
            'temperature': newValue,
        }, function(rep) {          
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              react.setState({status: false});
              react.props.changeToRoomList();
            }
            else {
              react.setState({status : rep.error.message ||  rep.error});
            }
        });
    },
    ChangeLight(event) {
        var newValue = ReactDOM.findDOMNode(this.refs.light).value;
        react = this;
        HttpPost('/changeLight', {
            'roomID': react.props.Id,
            'light': newValue,
        }, function(rep) {          
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              react.setState({status: false});
              react.props.changeToRoomList();
            }
            else {
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
                <input className="input-medium" ref="name" type="text" placeholder="Name"/>
              </div>
              <div className="input-container">
                <input className="input-medium" ref="volume" type="text" placeholder="Volume"/>
              </div>
            </div>
            <button className="button-medium" type="submit">Modifier</button>
          </form>
          <div className="input-container">
            <input className="input-medium" ref="temperature" type="number" placeholder={this.state.room ? this.state.room.temperature : 5}/>
          </div>
          <div>
            <button className="button-medium" onClick={this.ChangeTemp}>Changer la température</button><br/>
          </div>
          <div className="input-container">
            <input className="input-medium" ref="light" type="number" placeholder={this.state.room ? this.state.room.light : 5}/>
          </div>
          <div>
            <button className="button-medium" onClick={this.ChangeLight}>Changer la luminosité</button><br/>
            <button className="button-medium" onClick={this.props.changeToRoomList}>Retour</button>            
          </div>          
          <ErrorMessage content={this.state.status}/>
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
    handleSubmit(event) {
        event.preventDefault();
        var organisation = ReactDOM.findDOMNode(this.refs.organisation).value;
        var name = ReactDOM.findDOMNode(this.refs.name).value;
        var volume = ReactDOM.findDOMNode(this.refs.volume).value;
        react = this;
        HttpPost('/createRoom', {
            'organisation': organisation,
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
    render() {   
        return (
        <div className="bar bar-header-secondary">
             <form role="form" onSubmit={this.handleSubmit}>
                 <div className="form-group">
                  <div className="input-container">
                    <input className="input-medium" ref="organisation" type="text" placeholder="organisation"/>
                  </div>
                  <div className="input-container">
                    <input className="input-medium" ref="name" type="text" placeholder="name"/>
                  </div>
                  <div className="input-container">
                    <input className="input-medium" ref="volume" type="text" placeholder="volume"/>
                  </div>
                </div>
                <button className="button-medium" type="submit" >Créer</button>
              </form>
              <button className="button-medium" onClick={this.props.changeToRoomList} >Retour</button>
              <ErrorMessage content={this.state.status}/>
        </div>
        );
    }
});

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
      <div>
      Êtes-vous sûr ?
      <button className="button-medium" onClick={this.deleteRoom}>Oui</button>
      <button  className="button-medium" onClick={this.props.changeToRoomList} >Non</button>
      <ErrorMessage content={this.state.error}/>
      </div>
    );
  }
});