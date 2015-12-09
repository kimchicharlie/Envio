var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
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
    render: function () {
            return (
            <li className="table-view-cell media">
            <div>name: {this.props.room.name}</div>
            <div>Temperature actuel: {this.props.room.realTemperature}</div>
            <div>Temperature voulus: {this.props.room.temperature}</div>
            <div>m²: {this.props.room.volume}</div>
            <Link to={`/Rooms/${this.props.room._id}`}>Modifier</Link>
            </li>
        );
    }
});

RoomList = React.createClass({
    render: function () {
        var items = this.props.rooms.map(function (room) {
            return (
                <RoomListItem key={room.id} room={room} />
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
            rooms: []
        }
      },
      componentDidMount: function() {
        react = this
          HttpPost('/getRooms', {
            'organisation': 'Envio',// a changer avec les info users            
        }, function(ret) {         
            rep = jQuery.parseJSON(ret)
            if (rep.error == null){              
              react.setState({rooms: rep.rooms})
            }
            else{
              react.setState({rooms: rep.error})
            }            
        })
      },
      render() {
          return (
              <div>
                <Header text="Envio Room"/>
                <div className="content">
                    <RoomList rooms={this.state.rooms}/>
                    <Link to="/CreatRoom">Creat room</Link>
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
          'roomID': react.props.params.Id,         
      }, function(ret) {          
          rep = jQuery.parseJSON(ret)
          console.log(rep)
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
            console.log(rep)
            react.setState({status: rep})
        })
    },
    ChangeTemp(event) {
        var newValue = ReactDOM.findDOMNode(this.refs.temperature).value
        react = this;
        HttpPost('/changeTemperature', {
            'roomID': react.props.params.Id,
            'temperature': newValue,
        }, function(ret) {          
            rep = jQuery.parseJSON(ret)
            console.log(rep)
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
                    </div>
                   );                    
          }
        }      
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
            console.log(rep)
            react.setState({status: rep})
        })
    },
    render() {
        if(this.state.status){
          if (this.state.status.error == null) 
          {            
            return (
                    <div className="bar bar-header-secondary">
                        Creat success full!
                    </div>
                   );                    
          }
        }      
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
        </div>
        );
    }
});
