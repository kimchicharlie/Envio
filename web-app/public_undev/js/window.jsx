var React = require('react');
var ReactDOM = require('react-dom');
var cookie = require('react-cookie');


WindowListItem = React.createClass({
    ModifWindow : function (){
      this.props.changeToModif(this.props.window._id);
    },
    DeleteWindow : function (){
      this.props.changeToDelete(this.props.window._id, this.props.index);
    },
    render: function () {
          return (
            <li className="room-elem">
              <span className="w_20p">Orientation : {this.props.window.orientation} °Nord</span>
              <span className="w_20p">taille : {this.props.window.size + "m²"}</span>
              <span className="w_20p">Luminositer : {this.props.window.opacity + "%"}</span>
              <span className="w_20p">Luminositer volue: {this.props.window.opacityWanted + "%"}</span>
              <button className="list-button w_15p" onClick={this.ModifWindow}>Modifier</button>
              <button className="list-button w_15p" onClick={this.DeleteWindow}>Supprimer</button>
            </li>
        );
    }
});

WindowList = React.createClass({
    render: function () {
        var react = this;
        var itemsWindow = this.props.windows.map(function (window) {
            return (
                <WindowListItem key={window._id} window={window} changeToDelete={react.props.changeToDelete} changeToModif={react.props.changeToModif}/>
            );
        });
        return (
            <ul className="windows-list">
                {itemsWindow}
            </ul>
        );
    }
});

Windows = React.createClass({
    getInitialState: function() {        
    return {
          windows: this.props.windows,
          creat :null,
          modif :null,
          delete :null,
          error : false
      };
    },
      changeToCreat: function(){
          this.setState({creat: true});
          this.setState({modif: null});
          this.setState({delete: null});
      },
      changeToModif: function(Id){
          this.setState({modif: Id});
          this.setState({creat: null});
          this.setState({delete: null});          
      },
      changeToDelete: function(Id){
          this.setState({delete: Id});
          this.setState({modif: null});
          this.setState({creat: null});          
      },
      changeToWindowList: function(){
        react = this;
      HttpPost('/getWindows', {
      'room': this.props.room,
    }, function(rep) {         
      rep = jQuery.parseJSON(rep);
      if (rep.error === null){
            react.setState({modif: null});
            react.setState({delete: null});
            react.setState({creat: null});        
        react.setState({windows: rep.windows});
      }
      else{
            react.setState({error:  rep.error});
            react.setState({modif: null});
            react.setState({delete: null});
            react.setState({creat: null});
            react.setState({windows: []});
      }            
    });          
      },
    componentDidMount: function() {
      react = this;
        HttpPost('/getWindows', {
          'room': this.props.room,         
          }, function(rep) {     
          rep = jQuery.parseJSON(rep);
          if (rep.error === null){
            react.setState({windows: rep.windows});
          }
          else{       
            react.setState({error:  rep.error.message || rep.error});
            react.setState({windows: []});
          }            
      });
    },
    render : function() {
          var catWindow = <WindowList windows={this.state.windows} changeToDelete={this.changeToDelete} changeToModif={this.changeToModif}/>;
          var creatbutton = <button className="button-medium" onClick={this.changeToCreat}>Créer Vitre</button>;
          if (this.state.creat !== null) 
          {
              catWindow = <CreateWindow roomID={this.props.room} changeToWindowList={this.changeToWindowList}/>;
              creatbutton = null;
          }                  
          if(this.state.modif !== null )
          {
              catWindow = <ModifWindow Id={this.state.modif} changeToWindowList={this.changeToWindowList}/>;
          }
          if(this.state.delete !== null )
          {
              catWindow = <DeleteWindow Id={this.state.delete} changeToWindowList={this.changeToWindowList}/>;
              creatbutton = null;
          }
          return (
              <div>
                <div className="content">
                    {catWindow}                   
                    {creatbutton}
                </div>
                <ErrorMessage content={this.state.error}/>
              </div>
          );
      }
});

ModifWindow = React.createClass({
    getInitialState: function() {
        return {
            status: false,
            window: null
        }
    },
    componentDidMount: function() {
       react = this;
           HttpPost('/getWindow', {
              'windowID': react.props.Id,         
          }, function(rep) {          
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              react.setState({window: rep.window});
            }
            else if(react.state.status == false){
              react.setState({status :  rep.error.message || rep.error});
            } 
      });
    },    
    handleSubmit(event) {
        event.preventDefault();
        var orientation = ReactDOM.findDOMNode(this.refs.orientation).value;
        var size = ReactDOM.findDOMNode(this.refs.sizeWindow).value;
        var opacityWanted = ReactDOM.findDOMNode(this.refs.opacityWanted).value;
        react = this;
        HttpPost('/modifyWindow', {
            'windowID': react.props.Id,
            'orientation':orientation,
            'size':size,
            'opacityWanted':opacityWanted
        }, function(rep) {
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              react.setState({status: false});
              react.props.changeToWindowList();
            }
            else {
              react.setState({status : rep.error.message || rep.error});
            }             
        });
    },    
    render() {    
        return (
        <div className="bar bar-header-secondary">
          <form role="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="input-container">
                <input className="input-medium" ref="orientation" type="text" placeholder="Orientation Nord"/>
              </div>
              <div className="input-container">
                <input className="input-medium" ref="sizeWindow" type="text" placeholder="Taille"/>
              </div>
              <div className="input-container">
                <input className="input-medium" ref="opacityWanted" type="text" placeholder="Opaciter voulue"/>
              </div>              
            </div>
            <button className="button-medium" type="submit">Modifier</button>
          </form>
          <div>
            <button className="button-medium" onClick={this.props.changeToWindowList}>Retour</button>            
          </div>          
          <ErrorMessage content={this.state.status}/>
        </div>
        );
    }
});

CreateWindow = React.createClass({
    getInitialState: function() {
        return {
            status: false,
        }
    },
    handleSubmit(event) {
        event.preventDefault();
        var orientation = ReactDOM.findDOMNode(this.refs.orientation).value;
        var size = ReactDOM.findDOMNode(this.refs.size).value;
        var opacityWanted = ReactDOM.findDOMNode(this.refs.opacityWanted).value;
        react = this;
        HttpPost('/createWindow', {
            'room': react.props.roomID,
            'orientation': orientation,
            'size': size,
            'opacity': opacityWanted,
            'opacityWanted': opacityWanted,
            
        }, function(rep) {
            rep = jQuery.parseJSON(rep);
            if(rep.error == null){
              react.setState({status: false});
              react.props.changeToWindowList();
            }
            else{
              react.setState({status : rep.error.message ||  rep.error});
            }            
        });
    },
    render() {   
        return (
        <div className="bar bar-header-secondary">
             <form role="form" onSubmit={this.handleSubmit}>
                 <div className="form-group">
                  <div className="input-container">
                    <input className="input-medium" ref="orientation" type="text" placeholder="orientation"/>
                  </div>
                  <div className="input-container">
                    <input className="input-medium" ref="size" type="text" placeholder="Taille"/>
                  </div>
                  <div className="input-container">
                    <input className="input-medium" ref="opacityWanted" type="text" placeholder="opaciter volue"/>
                  </div>
                </div>
                <button className="button-medium" type="submit" >Créer Vitre</button>
              </form>
              <button className="button-medium" onClick={this.props.changeToWindowList} >Retour</button>
              <ErrorMessage content={this.state.status}/>
        </div>
        );
    }
});

DeleteWindow = React.createClass({
    getInitialState : function() {
        return {
            error : false
        };
    },
    deleteWindow : function (){
      var react = this;
      HttpPost('/deleteWindow', {
        'windowID': react.props.Id,         
      }, function(rep) {
          rep = jQuery.parseJSON(rep);
          if(rep.error == null){
            react.props.changeToWindowList();  
          }
          else{
            react.setState({error :  rep.error});
          }             

      }); 
    },
    render: function () {
        return (
        <div>
        Êtes-vous sûr ?
        <button className="button-medium" onClick={this.deleteWindow}>Oui</button>
        <button  className="button-medium" onClick={this.props.changeToWindowList} >Non</button>
        <ErrorMessage content={this.state.error}/>
        </div>
      );
    }
});