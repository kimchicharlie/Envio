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
    handleClick : function (){
      this.props.changeToModif(this.props.room._id);
    },
    deleteRoom : function (){
      this.props.changeToDelete(this.props.room._id, this.props.index);
    },
    render: function () {
            return (
            <li className="table-view-cell media">
              <div>name: {this.props.room.name}</div>
              <div>Temperature actuel: {this.props.room.realTemperature}</div>
              <div>Temperature voulus: {this.props.room.temperature}</div>
              <div>m²: {this.props.room.volume}</div>
              <button onClick={this.handleClick}>Modifier</button>
              <button onClick={this.deleteRoom}>Supprimer</button>
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
            <ul  className="table-view">
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
    }, function(ret) {         
      rep = jQuery.parseJSON(ret);
      if (rep.error === null){
            react.setState({modif: null});
            react.setState({delete: null});
            react.setState({creat: null});        
        react.setState({rooms: rep.rooms});
      }
      else{
        react.setState({rooms: rep.error});
            react.setState({modif: null});
            react.setState({delete: null});
            react.setState({creat: null});
      }            
    });          
      },  
    componentDidMount: function() {
    react = this;
      HttpPost('/getRooms', {
      'organisation': 'Envio',// a changer avec les info users            
    }, function(ret) {         
      rep = jQuery.parseJSON(ret);
      if (rep.error === null){
        react.setState({rooms: rep.rooms});
      }
      else{
        react.setState({rooms: rep.error});
      }            
    });
    },
    render() {
          var cat = <RoomList rooms={this.state.rooms} changeToDelete={this.changeToDelete} changeToModif={this.changeToModif}/>;
          var creatbutton = <button onClick={this.changeToCreat}>Creat Room</button>;
          if (this.state.creat !== null) 
          {
              cat = <CreatRoom changeToRoomList={this.changeToRoomList}/>;
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
        <Header text="Envio Room"/>
        <div className="content">
          {cat}                   
                    {creatbutton}
        </div>
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
      }, function(ret) {          
          rep = jQuery.parseJSON(ret)
          console.log(rep)
          react.setState({room: rep.room})
      })
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
        }, function(ret) {          
            rep = jQuery.parseJSON(ret);
            console.log(rep);
            react.setState({status: rep});
            react.props.changeToRoomList();
        });
    },
    ChangeTemp(event) {
        var newValue = ReactDOM.findDOMNode(this.refs.temperature).value;
        react = this;
        HttpPost('/changeTemperature', {
            'roomID': react.props.Id,
            'temperature': newValue,
        }, function(ret) {          
            rep = jQuery.parseJSON(ret);
            console.log(rep);
            react.setState({status: rep});
            react.props.changeToRoomList();
        });
    },
    render() {    
        return (
        <div className="bar bar-header-secondary">
             <form role="form" onSubmit={this.handleSubmit}>
                 <div className="form-group">
                  <input ref="name" type="text" placeholder="new name" />
                  <input ref="volume" type="text" placeholder="new volume" />
                </div>
                <button type="submit" >modif</button>
              </form>
              <input ref="temperature" type="number" placeholder={this.state.room ? this.state.room.temperature : 5} />
              <button onClick={this.ChangeTemp} >change temperature</button>
              <button onClick={this.props.changeToRoomList} >Retour</button>
        </div>
        );
    }
});


CreatRoom = React.createClass({
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
            
        }, function(ret) {          
            rep = jQuery.parseJSON(ret);
            react.setState({status: rep});
            react.props.changeToRoomList();
        });
    },
    render() {   
        return (
        <div className="bar bar-header-secondary">
             <form role="form" onSubmit={this.handleSubmit}>
                 <div className="form-group">
                  <input ref="organisation" type="text" placeholder="organisation" />
                  <input ref="name" type="text" placeholder="name" />
                  <input ref="volume" type="text" placeholder="volume" />
                </div>
                <button type="submit" >Creat</button>
              </form>
              <button onClick={this.props.changeToRoomList} >Retour</button>
        </div>
        );
    }
});

DeleteRoom = React.createClass({
    deleteRoom : function (){
            var react = this;
    HttpPost('/deleteRoom', {
      'roomID': react.props.Id,         
    }, function(ret) {
      rep = jQuery.parseJSON(ret);
      
      react.props.changeToRoomList();
    }); 
    },
  render: function () {
      return (
      <div>
      Êtes-vous sûr ?
      <button onClick={this.deleteRoom}>Oui</button>
      <button onClick={this.props.changeToRoomList} >Non</button>
      </div>
    );
  }
});