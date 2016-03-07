var React = require('react');
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
                    <p onClick={this.props.changeCat}>Planning</p>
                </li>
                <li className="table-view-cell media">
                    <p onClick={this.props.changeCat}>Rooms</p>
                </li>
                <li className="table-view-cell media">
                    <p  onClick={this.props.changeCat}>Modes</p>
                </li>
            </ul>  
        );
    }
});

var Home = React.createClass({
    getInitialState: function() {
        return {
              selectedCat : null
        };
    },
    handleClick: function(event) {
        var that = this;        
        HttpPost('/logout', {
            'guid': cookie.load('userId')
        }, function(ret) {
            //rep = jQuery.parseJSON(ret)
            if(ret.error == null){
                that.props.doLogout()
            }
        })
    },
    changeCat: function(event){
        this.setState({selectedCat:event.target.textContent});
    },
    render() {
        var cat = null;
        switch (this.state.selectedCat) 
        {
            case "Rooms" :
                cat = <Rooms/>;
                break;
            case "Modes" :
                cat = <Modes/>;
                break;
            case "Planning" :
                cat = <Planning/>;
                break;
             default:
                 cat = null;
         }
        return (
            <div className="content">
                <Sidemenu changeCat={this.changeCat}/>
                {cat}
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
    getInitialState : function() {
        return {
            selectedCat : false  
        };
    },
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
                that.props.doLogin(rep.guid)            
            }
        })
    },
    changeCat : function()
    {
        this.setState({selectedCat : true})
    },
    render() {
        if (this.state.selectedCat)
            return (<Register/>)
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
                <button className="button-medium no-decoration" onClick={this.changeCat}>S&#39;enregistrer</button>
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
    reloadPage : function (){
        document.location.reload()
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
                        <button onClick={this.reloadPage}>Se loger</button>
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


ReactDOM.render(<App />, document.getElementById('content'));