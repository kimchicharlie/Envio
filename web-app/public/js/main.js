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

var Sidemenu = React.createClass({
    render() {
        return (
            <ul className="table-view">
              <li className="table-view-cell media">
                <a className="navigate-right">
                  <span className="media-object pull-left icon icon-trash"></span>
                  <div className="media-body">
                    Item 1
                  </div>
                </a>
              </li>
              <li className="table-view-cell media">
                <a className="navigate-right">
                  <span className="media-object pull-left icon icon-gear"></span>
                  <div className="media-body">
                    Item 2
                  </div>
                </a>
              </li>
              <li className="table-view-cell media">
                    <Link to="/Rooms">Rooms</Link>
              </li>
            </ul>  
        );
    }
});

var Home = React.createClass({
      handleClick: function(event) {
      react = this
       HttpPost('/logout', {
            'guid': cookie.load('userId')
        }, function(ret) {
            //rep = jQuery.parseJSON(ret)
             if(ret.error == null){
                react.props.doLogout()
             }
        })
      },
      render() {
          /* HttpPost('/infoUserId', {
          //     }, function(ret) {
          //         console.log(ret)
          //     })*/
          return (
              <div className="content">
              <Sidemenu />
                <ul className="table-view">
                  <li className="table-view-cell media">
                  boum
                  </li>
                </ul>
                <button onClick={this.handleClick}>logout</button>
              </div>
          );
      }
});


var RoomListItem = React.createClass({
    render: function () {
            return (
            <li className="table-view-cell media">
            <div>name: {this.props.room.name}</div>
            <div>Temperature actuel: {this.props.room.realTemperature}</div>
            <div>Temperature voulus: {this.props.room.temperature}</div>
            <div>m²: {this.props.room.volume}</div>
            <Link to={`/Rooms/${this.props.room.name}`}>Modifier</Link>
            </li>
        );
    }
});

var RoomList = React.createClass({
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

var Room = React.createClass({
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
            console.log(rep)
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

var ModifRoom = React.createClass({
    getInitialState: function() {
        return {
            status: false,
        }
    },
    handleSubmit(event) {
        event.preventDefault()
        var name = ReactDOM.findDOMNode(this.refs.name).value
        var volume = ReactDOM.findDOMNode(this.refs.volume).value
        react = this;
        HttpPost('/modifyRoom', {
            'newName': name,
            'name': react.props.params.RoomName,
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
        </div>
        );
    }
});


var CreatRoom = React.createClass({
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

var Login = React.createClass({
    handleSubmit(event) {
        event.preventDefault()
        var email = ReactDOM.findDOMNode(this.refs.email).value
        var pass = ReactDOM.findDOMNode(this.refs.pass).value
        react = this;
        HttpPost('/login', {
            'email': email,
            'password': pass,
        }, function(ret) {          
            rep = jQuery.parseJSON(ret)
            console.log(rep)
             if(rep.error == null){
              react.props.doLogin(rep.guid)            
             }
        })
    },
    render() {
        return (
        <div className="bar bar-header-secondary">
             <form role="form" onSubmit={this.handleSubmit}>
                 <div className="form-group">
                  <input ref="email" type="text" placeholder="email" />
                  <input ref="pass" type="password" placeholder="Password" />
                </div>
                <button type="submit" >Submit</button>
              </form>
              <Link to="/Register">Register</Link>
        </div>
        );
    }
});

const Register = React.createClass({
    getInitialState: function() {
        return {
            registered: false,
        }
    },
    handleSubmit(event) {
            event.preventDefault()
            var email = ReactDOM.findDOMNode(this.refs.email).value
            var pass = ReactDOM.findDOMNode(this.refs.pass).value
            var firstname = ReactDOM.findDOMNode(this.refs.firstname).value
            var lastname = ReactDOM.findDOMNode(this.refs.lastname).value
            var organisation = ReactDOM.findDOMNode(this.refs.organisation).value
            react = this;
            HttpPost('/register', {
                'email': email,
                'password': pass,
                'firstname': firstname,
                'lastname': lastname,
                'organisation' : organisation            
            }, function(ret) {
                react.setState({registered: ret})
            })
        },
        render() {
            if(this.state.registered){
              if (this.state.registered.error == null) 
              {            
                return (
                        <div className="bar bar-header-secondary">
                            register success full!
                        </div>
                       );                    
              }
            }
            return (
              <div className={"page " + this.props.position}>
               <Header text="Envio intranet" back="false"/>
                <div className="bar bar-header-secondary">
                   <form role="form" onSubmit={this.handleSubmit}>
                      <div className="form-group">
                      <input ref="firstname" type="text" placeholder="firstname" />
                      <input ref="lastname" type="text" placeholder="lastname" />
                      <input ref="email" type="text" placeholder="email" />
                      <input ref="pass" type="password" placeholder="Password" />
                      <input ref="organisation" type="text" placeholder="Organisation" />                     
                      </div>
                      <button type="submit" >Submit</button>
                    </form>
                </div>
            </div>
            );
    }
});


const App = React.createClass({
    getInitialState: function() {
        return {
            userId: cookie.load('userId')
        }
    },  
    doLogin: function(userId) {
        this.setState({userId : userId});
        cookie.save('userId', userId);
    },
    doLogout: function() {
        cookie.remove('userId');            
        this.setState({userId: false});
    },
    render() {
          if(this.state.userId){
            return (
            <div className={"page " + this.props.position}>
                <Header text="Envio intranet" />
                <Home  doLogout={this.doLogout}/>
            </div>
                    );                    
            }
        return (
            <div className={"page " + this.props.position}>
                <Header text="Envio intranet"/>
                <Login doLogin={this.doLogin}/>
            </div>
        );
    }
});

var Racine = React.createClass({
    render() {
        return (
            <Router>
                <Route path="/" component={App} />                
                <Route path="/Register" component={Register}/>
                <Route path="/CreatRoom" component={CreatRoom}/>
                <Route path="/Rooms" component={Room}/>
                <Route path="/Rooms/:RoomName" component={ModifRoom}/>
          </Router>
    )}
})

ReactDOM.render(<Racine />, document.getElementById('content'));