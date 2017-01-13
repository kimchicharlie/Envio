var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');
var Select = require('react-select');
var Cookie = require('react-cookie');
var utils = require('../../utils');

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
        let adminSpace = '';
        
        if (!!this.props.isAdmin) {
            adminSpace = (
                <div className={"link " + (this.props.route == "Admin" ? " bg_c-grey" : "")} onClick={this.props.setRoute.bind(null, "Admin")}>
                    <span>Admin</span>
                </div>
            );
        }
        return (
            <div>
                <nav id="nav">
                    <img className="logosm" src="images/Envio2.png"/>
                    <div className={"link " + (this.props.route == "Planning" ? " bg_c-grey" : "")} onClick={this.props.setRoute.bind(null, "Planning")}>
                        <span>Planning</span>
                    </div>
                    <div className={"link " + (this.props.route == "Rooms" ? " bg_c-grey" : "")} onClick={this.props.setRoute.bind(null, "Rooms")}>
                        <span>Salles</span>
                    </div>
                    <div className={"link " + (this.props.route == "Modes" ? " bg_c-grey" : "")} onClick={this.props.setRoute.bind(null, "Modes")}>
                        <span>Modes</span>
                    </div>
                    <div className={"link " + (this.props.route == "Simulateur" ? " bg_c-grey" : "")} onClick={this.props.setRoute.bind(null, "Simulateur")}>
                        <span>Visionneuse</span>
                    </div>
                    <div className={"link " + (this.props.route == "Editor" ? " bg_c-grey" : "")} onClick={this.props.setRoute.bind(null, "Editor")}>
                        <span>Editeur</span>
                    </div>
                    {adminSpace}
                </nav>
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
        var logoutButton = <button className="butsty btn btn-info btn-lg" onClick={this.props.doLogout}><i className="fa fa-sign-out" aria-hidden="true"></i> Deconnexion</button>
        var isAdmin = false;

        if (this.props.user && this.props.user.isAdmin) {
            isAdmin = true;
        }

        switch (this.props.selectedRoute)
        {
            case "Rooms" :
                content = (
                    <div>
                        <div className="top-menu">
                            <Sidemenu route={this.props.selectedRoute} setRoute={this.props.setRoute} isAdmin={isAdmin}/>
                            {logoutButton}
                        </div>
                        <Rooms Organisation={this.props.Organisation}  isAdmin={isAdmin}/>
                    </div>
                )
                break;
            case "Modes" :
                content = (
                    <div>
                        <div className="top-menu">
                            <Sidemenu route={this.props.selectedRoute} setRoute={this.props.setRoute} isAdmin={isAdmin}/>
                            {logoutButton}
                        </div>
                        <Modes Organisation={this.props.Organisation}  isAdmin={isAdmin}/>
                    </div>
                )
                break;
            case "Planning" :
                content = (
                     <div>
                        <div className="top-menu">
                            <Sidemenu route={this.props.selectedRoute} setRoute={this.props.setRoute} isAdmin={isAdmin}/>
                            {logoutButton}
                        </div>
                        <Planning Organisation={this.props.Organisation}  isAdmin={isAdmin}/>
                    </div>
                )
                break;
            case "Simulateur" :
                content = (
                    <div>
                        <div className="top-menu">
                            <Sidemenu route={this.props.selectedRoute} setRoute={this.props.setRoute} isAdmin={isAdmin}/>
                            {logoutButton}
                        </div>
                        <Simulateur/>
                    </div>
                )
                break;
            case "Editor" :
                content = (
                    <div>
                        <div className="top-menu">
                            <Sidemenu route={this.props.selectedRoute} setRoute={this.props.setRoute} isAdmin={isAdmin}/>
                            {logoutButton}
                        </div>
                        <Editor/>
                    </div>
                )
                break;
            case "Admin" :
                content = (
                    <div>
                        <div className="top-menu">
                            <Sidemenu route={this.props.selectedRoute} setRoute={this.props.setRoute} isAdmin={isAdmin}/>
                            {logoutButton}
                        </div>
                        <Admin Organisation={this.props.Organisation}/>
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

var Simulateur = React.createClass({
    componentDidMount : function() {
        viewer();
    },
    render : function() {
        return (
            <div className="label-sim" id="container"></div>
        );
    }
});

var Editor = React.createClass({
    componentDidMount : function() {
        editor();
    },
    render : function() {
        return (
            <div className="label-sim" id="containerEditor"></div>
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
                that.props.doLogin(rep);
            }
            else{
                that.setState({error : rep.error.message || rep.error});
            }
        });
    },
    render() {
        return (
            <div className="form">
                <form role="form" onSubmit={this.handleSubmit}>
                    <ErrorMessage className="error" content={this.state.error}/>
                    <div className="input-list">
                        <div className="input-container">
                            <input className="input-medium" ref="email" type="text" placeholder="E-mail" />
                        </div>
                        <div className="input-container">
                            <input className="input-medium" ref="pass" type="password" placeholder="Mot de Passe" />
                        </div>
                    </div>
                    <button id="knapp" className="btn btn-success button-medium" type="submit"><i className="fa fa-plug" aria-hidden="true"></i> Connexion</button>
                </form>
                <button className="btn btn-success no-decoration" onClick={this.props.setRoute.bind(null, "Register")}><i className="fa fa-user" aria-hidden="true"></i> S&#39;inscrire</button>
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
        }, function(rep) {
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
                that.setState({registered: rep})

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
        if(this.state.registered && this.state.registered.error == null){
            return (
                 <div className="form">
                     <span className="label-c">Vous etes desormais inscrit !<br>Bienvenue dans l&#39;experience Envio !</br></span>
                     <br/><button className="button-medium" onClick={this.reloadPage}><i className="fa fa-plug" aria-hidden="true"></i> Se connecter</button>
                 </div>
            );
        }

        return (
            <div className="form">
                <div className="bar bar-header-secondary">
                    <form role="form" onSubmit={this.handleSubmit}>
                     <ErrorMessage content={this.state.error}/>
                        <div className="form-group">
                            <div className="input-container">
                                <input className="input-medium" ref="firstname" type="text" placeholder="Prénom"/>
                            </div>
                            <div className="input-container">
                                <input className="input-medium" ref="lastname" type="text" placeholder="Nom"/>
                            </div>
                            <div className="input-container">
                                <input className="input-medium" ref="email" type="text" placeholder="E-mail"/>
                            </div>
                            <div className="input-container">
                                <input className="input-medium" ref="organisation" type="text" placeholder="Organisation"/>
                            </div>
                            <div className="input-container">
                                <input className="input-medium" ref="pass" type="password" placeholder="Mot de passe"/>
                            </div>
                        </div>
                        <button className="button-medium" type="submit"><i className="fa fa-check" aria-hidden="true"></i> Valider</button>
                    </form>
                    <button className="button-medium no-decoration" onClick={this.backToLogin}><i className="fa fa-chevron-left" aria-hidden="true"></i> Retour</button>
                </div>
            </div>
        );
    }
});

var App = React.createClass({
    getInitialState: function() {
        return {
            userId: Cookie.load('userId'),
            organisation: Cookie.load('organisation'),
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
        Cookie.save('userId', userId.guid);
        Cookie.save('organisation', userId.user.organisation);
        this.setState({
            userId : userId.guid,
            organisation : userId.user.organisation,
        });
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
                Cookie.remove('organisation');
                that.setState({userId: false});
                that.setRoute("Login");
            }
        });
    },
    componentWillMount: function () {
        var that = this;
        if (that.state.userId) {
            HttpPost('/getUser', {
                'guid': that.state.userId,
            }, function(rep) {
                rep = JSON.parse(rep);
                if (rep.error === null){
                  that.setState({user: rep.user});
                }
                else{
                  that.setState({error:rep.error});
                }
            });
            that.setRoute("Rooms");
        } else {
            that.setRoute("Login");
        }
    },
     render() {
        if (this.state.selectedRoute == "Login" || this.state.selectedRoute == "Register")
        {
            return (
                <div className="envio-main main-content" id="wrapped">
                    <div className="header-container">
                        <img className="logo" src="images/Envio2.png"/>
                        <h2 className="pres"> Adoptez la domotique de Demain </h2>
                        <span className="subpres"> Pour commencer, entrez <b>vos identifiants</b> </span>
                   </div>
                    <Home
                        selectedRoute={this.state.selectedRoute}
                        doLogout={this.doLogout}
                        doLogin={this.doLogin}
                        setRoute={this.setRoute}/>
                    <ErrorModal content={this.state.error} title="logout"/>
                </div>
            );

        } else {
            return (
                <div className="envio-logged main-content" id="wrapped">
                    <Home
                        user={this.state.user}
                        selectedRoute={this.state.selectedRoute}
                        doLogout={this.doLogout}
                        doLogin={this.doLogin}
                        setRoute={this.setRoute}
                        Organisation={this.state.organisation}/>
                    <ErrorModal content={this.state.error} title="logout"/>
                </div>
            );
        }
    }
});

ReactDOM.render(<App />, document.getElementById('content'));
