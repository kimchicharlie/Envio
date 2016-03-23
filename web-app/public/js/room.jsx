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
//this.props.room._id
RoomListItem = React.createClass({
    handleClick : function (){
      this.props.changeToModif(this.props.room._id);
    },
    render: function () {
          return (
            <li className="room-elem">
              <span className="w_20p">Nom : {this.props.room.name}</span>
              <span className="w_20p">Température actuelle : {this.props.room.realTemperature + "°"}</span>
              <span className="w_20p">Temperature voulue : {this.props.room.temperature + "°"}</span>
              <span className="w_20p">Volume: {this.props.room.volume + "m3"}</span>
              <button className="list-button w_15p" onClick={this.handleClick}>Modifier</button>
            </li>
        );
    }
});

RoomList = React.createClass({
    render: function () {
        var react = this;
        var items = this.props.rooms.map(function (room) {
            return (
                <RoomListItem key={room._id} room={room} changeToModif={react.props.changeToModif}/>
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
            selectedCat :null,
        };
      },
      changeToCreate: function(){
          this.setState({selectedCat:"create"});
      },
      changeToModif: function(Id){
          this.setState({selectedCat:Id});
      },
      changeToRoomList: function(){
        react = this;
          HttpPost('/getRooms', {
            'organisation': 'Envio',// a changer avec les info users            
        }, function(ret) {         
            rep = jQuery.parseJSON(ret);
            if (rep.error == null){              
              react.setState({rooms: rep.rooms});
              react.setState({selectedCat:null});
            }
            else{
              react.setState({rooms: rep.error});
              react.setState({selectedCat:null});
            }            
        });                  
      },  
      componentDidMount: function() {
        react = this;
          HttpPost('/getRooms', {
            'organisation': 'Envio',// a changer avec les info users            
        }, function(ret) {         
            rep = jQuery.parseJSON(ret);
            if (rep.error == null){              
              react.setState({rooms: rep.rooms});
            }
            else{
              react.setState({rooms: rep.error});
            }            
        });
      },
      render() {
          var cat = <RoomList rooms={this.state.rooms} changeToModif={this.changeToModif}/>;
          var createButton = <button className="button-medium" onClick={this.changeToCreate}>Créer room</button>;

          if (this.state.selectedCat == "create") 
          {
              cat = <CreateRoom changeToRoomList={this.changeToRoomList}/>;
              createButton = null
          }
          if(this.state.selectedCat != "create" && this.state.selectedCat !== null )
          {
              cat = <ModifRoom Id={this.state.selectedCat} changeToRoomList={this.changeToRoomList}/>;
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
          react.setState({room: rep.room})
      })
    },    
    handleSubmit(event) {
        event.preventDefault()
        var name = ReactDOM.findDOMNode(this.refs.name).value
        var volume = ReactDOM.findDOMNode(this.refs.volume).value
        react = this;
        HttpPost('/modifyRoom', {
            'newName': name,
            'name': react.state.room.name,
            'volume': volume,            
        }, function(ret) {          
            rep = jQuery.parseJSON(ret)
            react.setState({status: rep})
        })
    },
    ChangeTemp(event) {
        var newValue = ReactDOM.findDOMNode(this.refs.temperature).value
        react = this;
        HttpPost('/changeTemperature', {
            'roomID': react.props.Id,
            'temperature': newValue,
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
                        <button onClick={this.props.changeToRoomList} >Retour</button>
                    </div>
                   );                    
          }
        }      
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
            <button className="button-medium" onClick={this.props.changeToRoomList}>Retour</button>
          </div>
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
        event.preventDefault()
        var organisation = ReactDOM.findDOMNode(this.refs.organisation).value
        var name = ReactDOM.findDOMNode(this.refs.name).value
        var volume = ReactDOM.findDOMNode(this.refs.volume).value
        react = this;
        HttpPost('/createRoom', {
            'organisation': organisation,
            'name': name,
            'volume': volume,
            
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
                        Création réussie!
                        <button onClick={this.props.changeToRoomList}>Retour</button>
                    </div>
                   );                    
          }
        }      
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
        </div>
        );
    }
});
