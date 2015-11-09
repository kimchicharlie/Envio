var React = require('react');
var Router = require('react-router').Router;
var ReactDOM = require('react-dom');
var cookie = require('react-cookie');

var Route = Router.Route;
var Link = Router.Link;

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
                <a className="navigate-right">
                  <span className="media-object pull-left icon icon-pages"></span>
                  <div className="media-body">
                    Item 3
                  </div>
                </a>
              </li>
            </ul>  
        );
    }
});

var Home = React.createClass({
    render() {
        /* HttpPost('/infoUser', {
        //     }, function(ret) {
        //         console.log(ret)
        //     })*/
        return (
            <div className="content">
            <Sidemenu />
                      <ul className="table-view">
              <li className="table-view-cell media">
              boum</li></ul>
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
            'api_key' : "f8c5e1xx5f48e56s4x8",
        }, function(ret) {
            console.log(ret)
            //react.props.doLogin(ret.name)
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
        </div>
        );
    }
});

const Register = React.createClass({
    getInitialState: function() {
        return {
            loged: false,
        }
    },
    handleSubmit(event) {
            event.preventDefault()
            var email = ReactDOM.findDOMNode(this.refs.email).value
            var pass = ReactDOM.findDOMNode(this.refs.pass).value
            var firstname = ReactDOM.findDOMNode(this.refs.firstname).value
            var lastname = ReactDOM.findDOMNode(this.refs.lastname).value
            react = this;
            console.log(this.state.loged)
            HttpPost('/register', {
                'email': email,
                'password': pass,
                'firstname': firstname,
                'lastname': lastname            
            }, function(ret) {
                //console.log(ret)
                react.setState({loged: true})
            })
        },
        render() {
            var loged
            if(this.state.loged){
            return (
                    <div className="bar bar-header-secondary">
                        <Home />
                    </div>
                    );                    
            }
            return (
            <div className="bar bar-header-secondary">
                 <form role="form" onSubmit={this.handleSubmit}>
                     <div className="form-group">
                     <input ref="firstname" type="text" placeholder="firstname" />
                     <input ref="lastname" type="text" placeholder="lastname" />
                      <input ref="email" type="text" placeholder="email" />
                      <input ref="pass" type="password" placeholder="Password" />
                    </div>
                    <button type="submit" >Submit</button>
                  </form>
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
    render() {
          if(this.state.userId){
            return (
            <div className={"page " + this.props.position}>
                <Header text="Envio intranet" back="false"/>
                <Home />
            </div>
                    );                    
            }
        return (
            <div className={"page " + this.props.position}>
                <Header text="Envio intranet" back="false"/>
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
          </Router>
    )}
})

ReactDOM.render(<Racine />, document.getElementById('content'));