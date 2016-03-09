var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');
var Select = require('react-select');
var Cookie = require('react-cookie');

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
                    <p onClick={this.props.setRoute.bind(null, "Planning")}>Planning</p>
                </li>
                <li className="table-view-cell media">
                    <p onClick={this.props.setRoute.bind(null, "Rooms")}>Rooms</p>
                </li>
                <li className="table-view-cell media">
                    <p  onClick={this.props.setRoute.bind(null, "Modes")}>Modes</p>
                </li>
            </ul>  
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
    handleSubmit : function(event) {
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
                that.props.doLogin(rep.guid);       
            }
        })
    },
    render() {
        console.log("this : ", this)
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
                    <button className="button-medium" type="submit">Valider</button>
                </form>
                <button className="button-medium no-decoration" onClick={this.props.setRoute.bind(null, "Register")}>S'enregistrer</button>
            </div>
        );
    }
});

var Register = React.createClass({
    getInitialState: function() {
        return {
            registered: false,
        }
    },
    handleSubmit(event) {
        event.preventDefault();

        console.log("submit")
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
            console.log("ret : ", ret)
            that.setState({registered: ret})
        })
    },
    reloadPage : function (){
        document.location.reload()
    },
    backToLogin(event) {
        event.preventDefault();

        this.props.setRoute("Login");
    },
    render() {
        if(this.state.registered){
            if (this.state.registered.error == null) 
            {            
                return (
                    <div className="bar bar-header-secondary">
                        register successfull!
                        <button onClick={this.reloadPage}>Se connecter</button>
                    </div>
                );                    
            }
        }
        
        return (
            <div className="form-big">
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
                    <button className="button-medium no-decoration" onClick={this.backToLogin}>Retour</button>
                </div>
            </div>
        );
    }
});

var Home = React.createClass({
    componentWillMount : function () {

    },
    render() {
        var route = null;
        var content = "";

        switch (this.props.selectedRoute) 
        {
            case "Rooms" :
                content = (
                    <div>
                        <Sidemenu setRoute={this.props.setRoute}/>
                        <Rooms/>
                        <button onClick={this.props.doLogout}>logout</button>
                    </div>
                )
                break;
            case "Modes" :
                content = (
                    <div>
                        <Sidemenu setRoute={this.props.setRoute}/>
                        <Modes/>
                        <button onClick={this.props.doLogout}>logout</button>
                    </div>
                )
                break;
            case "Planning" :
                content = (
                    <div>
                        <Sidemenu setRoute={this.props.setRoute}/>
                        <Planning/>
                        <button onClick={this.props.doLogout}>logout</button>
                    </div>
                )
                break;
            case "Login" :                
                content = (
                    <div>
                        <Login setRoute={this.props.setRoute}
                            doLogin={this.props.doLogin}/>
                    </div>
                )
                break;
            case "Register" :
                content = (
                    <div>
                        <Register setRoute={this.props.setRoute}/>
                    </div>
                )
                break;
             default:
                route = null;
        }

        return (
            <div className="content">
                {content}
            </div>
          );
      }
});

var App = React.createClass({
    getInitialState: function() {
        return {
            userId: Cookie.load('userId'),
            selectedRoute: null
        }
    },
    setRoute: function (route) {
        this.setState({
            selectedRoute : route
        });
    },
    doLogin: function(userId) {
        this.setState({userId : userId});
        Cookie.save('userId', userId);
        this.setRoute('Rooms');
    },
    doLogout: function(event) {
        var that = this;  

        HttpPost('/logout', {
            'guid': Cookie.load('userId')
        }, function(ret) {
            //rep = jQuery.parseJSON(ret)
            if(ret.error == null){
                Cookie.remove('userId');            
                this.setState({userId: false});
            }
        })
    },
    componentWillMount: function () {
        if (this.state.userId) {
            this.setRoute("Rooms");                 
        } else {   
            this.setRoute("Login");
        }
    },
    render() {
        return (
            <div className="main-content">
                <div className="header-container">
                    <span className="title-big">Envio</span>
                </div>
                <Home selectedRoute={this.state.selectedRoute}
                    doLogout={this.doLogout} 
                    doLogin={this.doLogin}
                    setRoute={this.setRoute}/>
            </div>
        ); 
    }
});


ReactDOM.render(<App />, document.getElementById('content'));