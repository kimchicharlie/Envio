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
            <li className="table-view-cell media">
            <div>name: {this.props.room.name}</div>
            <div>Temperature actuel: {this.props.room.realTemperature}</div>
            <div>Temperature voulus: {this.props.room.temperature}</div>
            <div>m²: {this.props.room.volume}</div>
            <button onClick={this.handleClick}>Modifier</button>
            </li>
        );
    }
});

RoomList = React.createClass({
    render: function () {
        var react = this;
        var items = this.props.rooms.map(function (room) {
            return (
                <RoomListItem key={room.id} room={room} changeToModif={react.props.changeToModif}/>
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
            selectedCat :null,
        };
      },
      changeToCreat: function(){
          this.setState({selectedCat:"creat"});
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
          var creatbutton = <button onClick={this.changeToCreat}>Creat room</button>;
          if (this.state.selectedCat == "creat") 
          {
              cat = <CreatRoom changeToRoomList={this.changeToRoomList}/>;
              creatbutton = null
          }                  
          if(this.state.selectedCat != "creat" && this.state.selectedCat !== null )
          {
              cat = <ModifRoom Id={this.state.selectedCat} changeToRoomList={this.changeToRoomList}/>;
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
            'roomID': react.props.Id,
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
                        <button onClick={this.props.changeToRoomList} >Retour</button>
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
                        <button onClick={this.props.changeToRoomList} >Retour</button>
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
              <button onClick={this.props.changeToRoomList} >Retour</button>
        </div>
        );
    }
});
