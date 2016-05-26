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
            <div className="head-menu-container">
                <div className={"menu-button" + (this.props.route == "Planning" ? " bg_c-grey" : "")} onClick={this.props.setRoute.bind(null, "Planning")}>
                    <span>Planning</span>
                </div>
                <div className={"menu-button" + (this.props.route == "Rooms" ? " bg_c-grey" : "")} onClick={this.props.setRoute.bind(null, "Rooms")}>
                    <span>Rooms</span>
                </div>
                <div className={"menu-button" + (this.props.route == "Modes" ? " bg_c-grey" : "")} onClick={this.props.setRoute.bind(null, "Modes")}>
                    <span>Modes</span>
                </div>
                <div className={"menu-button" + (this.props.route == "Viewer" ? " bg_c-grey" : "")} onClick={this.props.setRoute.bind(null, "Viewer")}>
                    <span>Viewer</span>
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
        var logoutButton = <button className="button-big" onClick={this.props.doLogout}>logout</button>

        switch (this.props.selectedRoute) 
        {
            case "Rooms" :
                content = (
                    <div>
                        <div className="top-menu">
                            <Sidemenu route={this.props.selectedRoute} setRoute={this.props.setRoute}/>
                            {logoutButton}
                        </div>
                        <Rooms/>
                    </div>
                )
                break;
            case "Modes" :
                content = (
                    <div>
                        <div className="top-menu">
                            <Sidemenu route={this.props.selectedRoute} setRoute={this.props.setRoute}/>
                            {logoutButton}
                        </div>
                        <Modes/>
                    </div>
                )
                break;
            case "Planning" :
                content = (
                    <div>
                        <div className="top-menu">
                            <Sidemenu route={this.props.selectedRoute} setRoute={this.props.setRoute}/>
                            {logoutButton}
                        </div>
                        <Planning/>
                    </div>
                )
                break;
            case "Viewer" :
                content = (
                    <div>
                        <div className="top-menu">
                            <Sidemenu route={this.props.selectedRoute} setRoute={this.props.setRoute}/>
                            {logoutButton}
                        </div>
                        <Viewer/>
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

var Viewer = React.createClass({
    componentDidMount : function() {
        viewer();
    },
    render : function() {
        return (
            <div id="container"></div>
        );
    }
});


ErrorMessage = React.createClass({
    getInitialState : function() {
        return {
            ErrorMessage : false
        };
    },
    componentWillReceiveProps : function(nextProps) {
        this.setState({ErrorMessage : nextProps.content}) //castage en bolean
    },
    render (){
        var message = null;
        return (
            <div>
                    <p>{this.state.ErrorMessage}</p>
            </div>
        );
    }
});

var Login = React.createClass({
    getInitialState() {
        return {
            error : false  
        };
    },
    handleSubmit : function(event) {
        event.preventDefault();

        var that = this;
        var email = ReactDOM.findDOMNode(this.refs.email).value;
        var pass = ReactDOM.findDOMNode(this.refs.pass).value;     

        HttpPost('/login', {
            'email': email,
            'password': pass,
        }, function(ret) {          
            var rep = jQuery.parseJSON(ret);
            if(rep.error == null){
                that.props.doLogin(rep.guid);       
            }
            else{
                that.setState({error : rep.error.message || rep.error});
            }
        });
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
                    <button className="button-medium" type="submit">Valider</button>
                </form>
                <button className="button-medium no-decoration" onClick={this.props.setRoute.bind(null, "Register")}>S&#39;enregistrer</button>
                <ErrorMessage content={this.state.error}/>
            </div>
        );
    }
});

var Register = React.createClass({
    getInitialState: function() {
        return {
            registered: false,
            error : false
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
            if(rep.error == null){
                that.setState({registered: ret})      
            }
            else{
                that.setState({error : rep.error.message || rep.error});
            }
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
                    <ErrorMessage content={this.state.error}/>
                </div>
            </div>
        );
    }
});

var App = React.createClass({
    getInitialState: function() {
        return {
            userId: Cookie.load('userId'),
            selectedRoute: null,
            error : false
        };
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
        }, function(rep) {
            if(rep.error){
                that.setState({error : rep.error.message || rep.error});
            } else {
                Cookie.remove('userId');            
                that.setState({userId: false});
                that.setRoute("Login");
            }
        });
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
                <ErrorModal content={this.state.error} title="logout"/>
                </div>
        ); 
    }
});

ReactDOM.render(<App />, document.getElementById('content'));