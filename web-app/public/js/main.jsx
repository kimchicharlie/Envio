var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var ReactDOM = require('react-dom');
var cookie = require('react-cookie');
var Modal = require('react-modal');
var Select = require('react-select');

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
                    <Link to="/Planning">Planning</Link>
                </li>
                <li className="table-view-cell media">
                    <Link to="/Rooms">Rooms</Link>
                </li>
                <li className="table-view-cell media">
                    <Link to="/Modes">Modes</Link>
                </li>
            </ul>  
        );
    }
});

var Home = React.createClass({
    handleClick: function(event) {
        var that = this

        HttpPost('/logout', {
            'guid': cookie.load('userId')
        }, function(ret) {
            //rep = jQuery.parseJSON(ret)
            if(ret.error == null){
                that.props.doLogout()
            }
        })
    },
    render() {
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

var Planning = React.createClass({
    getInitialState: function() {        
        return {
            rooms: []
        }
    },
    componentDidMount: function() {
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: true,
            selectable: true,
            select: function(start, end) {
                var title = prompt('Event Title:');
                var eventData;
                if (title) {
                    eventData = {
                        title: title,
                        start: start,
                        end: end
                    };
                    $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                }
                $('#calendar').fullCalendar('unselect');
            },
        });
    },
    render() {
        return (
            <div>
                <Header text="Envio Planning"/>
                <div className="content">
                    <div id='calendar'></div>
                </div>
            </div>
        );
    }
});

var Login = React.createClass({
    handleSubmit(event) {
        event.preventDefault()

        var that = this;
        var email = ReactDOM.findDOMNode(this.refs.email).value
        var pass = ReactDOM.findDOMNode(this.refs.pass).value        

        HttpPost('/login', {
            'email': email,
            'password': pass,
        }, function(ret) {          
            var rep = jQuery.parseJSON(ret)

            console.log("reponse : ", rep);

            if(rep.error == null){
                that.props.doLogin(rep.guid)            
            }
        })
    },
    render() {
        return (
            <div className="form-big">
                <form role="form" onSubmit={this.handleSubmit}>
                    <div className="input-list">
                        <div className="input-container">
                            <input className="input-medium" ref="email" type="text" placeholder="email" />
                        </div>
                        <div className="input-container">
                            <input className="input-medium" ref="pass" type="password" placeholder="Password" />
                        </div>
                    </div>
                    <button className="button-medium" type="submit" >Valider</button>
                </form>
                <Link className="button-medium no-decoration" to="/Register">S'enregistrer</Link>
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
        event.preventDefault();

        var email = ReactDOM.findDOMNode(this.refs.email).value
        var pass = ReactDOM.findDOMNode(this.refs.pass).value
        var firstname = ReactDOM.findDOMNode(this.refs.firstname).value
        var lastname = ReactDOM.findDOMNode(this.refs.lastname).value
        var organisation = ReactDOM.findDOMNode(this.refs.organisation).value
        var that = this;

        HttpPost('/register', {
            'email': email,
            'password': pass,
            'firstname': firstname,
            'lastname': lastname,
            'organisation' : organisation            
        }, function(ret) {
            that.setState({registered: ret})
        })
    },
    backToLogin(event) {
        event.preventDefault();


    },
    render() {
        if(this.state.registered){
            if (this.state.registered.error == null) 
            {            
                return (
                    <div className="bar bar-header-secondary">
                        register successfull!
                    </div>
                );                    
            }
        }
        
        return (
            <div className="form-big">
                <Header text="Envio" back="false"/>
                <div className="bar bar-header-secondary">
                    <form role="form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="input-container">
                                <input className="input-medium" ref="firstname" type="text" placeholder="firstname"/>
                            </div>
                            <div className="input-container">
                                <input className="input-medium" ref="lastname" type="text" placeholder="lastname"/>
                            </div>
                            <div className="input-container">
                                <input className="input-medium" ref="email" type="text" placeholder="email"/>
                            </div>
                            <div className="input-container">
                                <input className="input-medium" ref="pass" type="password" placeholder="Password"/>
                            </div>
                            <div className="input-container">
                                <input className="input-medium" ref="organisation" type="text" placeholder="Organisation"/>                     
                            </div>
                        </div>
                        <button className="button-medium" type="submit">Valider</button>
                    </form>
                    <Link className="button-medium no-decoration" to="/">Retour</Link>
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
        if (this.state.userId) {
            return (
                <div className="main-content">
                    <div className="header-container">
                        <span className="title-big">Envio</span>
                    </div>
                    <Home doLogout={this.doLogout}/>
                </div>
            );                    
        } else {   
            return (
                <div className="main-content">
                    <div className="header-container">
                        <span className="title-big">Envio</span>
                    </div>
                    <Login doLogin={this.doLogin}/>
                </div>
            );
        }
    }
});

var Racine = React.createClass({
    render() {
        return (
            <Router>
                <Route path="/" component={App} />                
                <Route path="/Register" component={Register}/>
                <Route path="/CreatRoom" component={CreatRoom}/>
                <Route path="/Rooms" component={Rooms}/>
                <Route path="/Rooms/:Id" component={ModifRoom}/>
                <Route path="/CreatMode" component={CreatMode}/>
                <Route path="/Modes" component={Modes}/>
                <Route path="/Modes/:Id" component={ModifMode}/>
                <Route path="/Planning" component={Planning}/>
          </Router>
    )}
})

ReactDOM.render(<Racine />, document.getElementById('content'));