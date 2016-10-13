var React = require('react');
var ReactDOM = require('react-dom');
var cookie = require('react-cookie');
var Modal = require('react-modal');
var Select = require('react-select');
var utils = require('../../utils');

console.log(utils)
var modalStyles = {overlay: {zIndex: 10}};

function findLabelByValue(list, value, reverse){
    if(reverse)
    {
        for (var i = 0; i < list.length; i++) {
          if (list[i].label === value) {
            return list[i].value;
          }
        }
    }else{
      for (var i = 0; i < list.length; i++) {
        if (list[i].value === value) {
          return list[i].label;
        }
      }
    }
  return "Couldn't find object with id: " + value;
}

var Header = React.createClass({
    render() {
        return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <h2 className="title">{this.props.text}</h2>
            </header>
        );
    }
});

Planning = React.createClass({
      getInitialState: function() {
        return {
            rooms: [],
            modalCreatIsOpen: false,
            modalDeleteIsOpen: false,
            start: 0,
            end: 0,
            name: null,            
            ListOfRooms: [],
            ListOfModes: [],
            selectedRoom: {},
        };
      },
      componentDidMount: function() {
        react = this;
        HttpPost('/getModes', {
               'organisation': react.props.Organisation,// a changer avec les info users            
                }, function(rep) {         
                rep = jQuery.parseJSON(rep)
                if (rep.error == null){
                  var selectOptions = [];
                  for (var key in rep.modes)
                  {
                    selectOptions.push({value: rep.modes[key][utils.getIdType()] , label: rep.modes[key].name})
                  }
                  react.setState({ListOfModes : selectOptions})              
                  react.setState({modes: rep.modes})
                }
                else{
                  react.setState({modes: rep.error.message || rep.error})
                }            
        });
        this.getRooms(0);
        this.creatCalendar();
      },
      getRooms: function(index){
                react = this
                HttpPost('/getRooms', {
                'organisation': react.props.Organisation,// a changer avec les info users            
                }, function(rep) {         
                rep = jQuery.parseJSON(rep)
                if (rep.error == null){
                  var selectOptions = [];
                  for (var key in rep.rooms)
                  {
                    selectOptions.push({value: rep.rooms[key][utils.getIdType()] , label: rep.rooms[key].name})
                  }
                  react.setState({ListOfRooms : selectOptions})              
                  react.setState({rooms: rep.rooms})
                  react.setState({selectedRoom: rep.rooms[index][utils.getIdType()]})
                  react.setCalendar(rep.rooms[index].planning)
                }
                else{
                  react.setState({rooms: rep.error.message || rep.error})
                }            
        });
      },
      creatCalendar: function(){
        react = this;
        $('#calendar').fullCalendar({
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay',
          },
            timezone: 'local',
            defaultView: 'agendaWeek',
            editable: true,
            selectable: true,
            eventClick: function(calEvent, jsEvent, view) {
              react.openModal(calEvent, 0, false);
            },        
            select: function(start, end) {
              react.openModal(start, end, true);
            },
            eventDragStart: function(event, delta, revertFunc) {
                react.setState({start: event});
            },
            eventDrop: function(event, delta, revertFunc) {
                start = new Date((event.start._d - delta))
                end = new Date((event.end._d - delta))
                var id=findLabelByValue(react.state.ListOfModes, event.title, true)                
                HttpPost('/modifyEvent', {
                  organisation : react.props.Organisation, //a changer plus tard
                  roomID : react.state.selectedRoom,
                  modeID : id,
                  eventName: react.state.start.title,
                  newName: event.title,
                  dateBegin : start,
                  dateEnd : end,
                  newDateBegin : event.start._d,
                  newDateEnd : event.end._d,
                }, function(rep) {
                  rep = jQuery.parseJSON(rep)
                    react.setState({modalDeleteIsOpen: false});
                    for (var i = 0; i < react.state.rooms.length; i++) {
                      if (react.state.rooms[i][utils.getIdType()] === rep.room[utils.getIdType()]) {
                        react.state.rooms[i].planning = rep.room.planning
                        react.setCalendar(react.state.rooms[i].planning)
                      }
                    }
                })                        
            },
            eventResizeStart: function(event, delta, revertFunc) {
                react.setState({start: event});
            },
            eventResize: function(event, delta, revertFunc) {
                start = new Date((event.start._d))
                end = new Date((event.end._d - delta))
                var id=findLabelByValue(react.state.ListOfModes, event.title, true)
                HttpPost('/modifyEvent', {
                  organisation : react.props.Organisation, //a changer plus tard
                  roomID : react.state.selectedRoom,
                  modeID : id,
                  eventName: react.state.start.title,
                  newName: event.title,
                  dateBegin : start,
                  dateEnd : end,
                  newDateBegin : event.start._d,
                  newDateEnd : event.end._d,
                }, function(rep) {
                  rep = jQuery.parseJSON(rep)
                    react.setState({modalDeleteIsOpen: false});
                    for (var i = 0; i < react.state.rooms.length; i++) {
                      if (react.state.rooms[i][utils.getIdType()] === rep.room[utils.getIdType()]) {
                        react.state.rooms[i].planning = rep.room.planning
                        react.setCalendar(react.state.rooms[i].planning)
                      }
                    }
                })                        
            },                                    
        });
        $('#calendar').fullCalendar( 'changeView', 'agendaWeek' );
      },
      openModal: function(start , end, key) {
        if (key == true) 
        this.setState({modalCreatIsOpen: true});
        else 
        this.setState({modalDeleteIsOpen: true});  
        this.setState({start: start});
        this.setState({end: end});
      },     
      creatEvent: function(val) {
        react=this
        trueDateBegin = new Date(this.state.start._d).toISOString();
        trueDateEnd = new Date(this.state.end._d).toISOString();
        var label= findLabelByValue(this.state.ListOfModes, val);
        HttpPost('/createEvent', {
          organisation : react.props.Organisation, //a changer plus tard
          roomID : react.state.selectedRoom,
          modeID : val,
          eventName: label,
          dateBegin : trueDateBegin,
          dateEnd : trueDateEnd,     
        }, function(rep) {
          rep = jQuery.parseJSON(rep);
            react.setState({modalCreatIsOpen: false});
            for (var i = 0; i < react.state.rooms.length; i++) {
              if (react.state.rooms[i][utils.getIdType()] === rep.room[utils.getIdType()]) {
                react.state.rooms[i].planning = rep.room.planning;
                react.setCalendar(react.state.rooms[i].planning);
              }
            }

        })        
      },
      modifyEvent: function(val) {
        var label= findLabelByValue(react.state.ListOfModes, val);
        HttpPost('/modifyEvent', {
          organisation : react.props.Organisation, //a changer plus tard
          roomID : this.state.selectedRoom,
          modeID : val,
          eventName: this.state.start.title,
          newName: label,
          dateBegin : this.state.start.start._d,
          dateEnd : this.state.start.end._d,
          newDateBegin : this.state.start.start._d,
          newDateEnd : this.state.start.end._d,     
        }, function(rep) {
          rep = jQuery.parseJSON(rep);
            react.setState({modalDeleteIsOpen: false});
            for (var i = 0; i < react.state.rooms.length; i++) {
              if (react.state.rooms[i][utils.getIdType()] === rep.room[utils.getIdType()]) {
                react.state.rooms[i].planning = rep.room.planning;
                react.setCalendar(react.state.rooms[i].planning);
              }
            }

        })        
      },
      deleteEvent: function() {
        HttpPost('/deleteEvent', {
          organisation : react.props.Organisation, //a changer plus tard
          roomID : this.state.selectedRoom,
          eventName: this.state.start.title,
          dateBegin : this.state.start.start._d,
        }, function(rep) {
          rep = jQuery.parseJSON(rep)
          react.setState({modalDeleteIsOpen: false});
          for (var i = 0; i < react.state.rooms.length; i++) {
            if (react.state.rooms[i][utils.getIdType()] === rep.room[utils.getIdType()]) {
              react.state.rooms[i].planning = rep.room.planning
              react.setCalendar(react.state.rooms[i].planning)
            }
          }
        })        
      },      
      selectRoom: function(val){ 
        for (var i = 0; i < this.state.rooms.length; i++) {
          if (this.state.rooms[i][utils.getIdType()] === val) {
            react.setCalendar(this.state.rooms[i].planning)
          }
        }        
        this.setState({selectedRoom: val})
      },
      setCalendar: function(planning){
        $('#calendar').fullCalendar('removeEvents')
        for (var i in planning){
            var eventData;
            eventData = {
              title: planning[i].name,
              start: new Date(planning[i].dateBegin),
              end: new Date(planning[i].dateEnd)
            };
            $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
        }
      },
      closeDeleteModal: function(){
        this.setState({modalDeleteIsOpen: false});
      },
   	  closeCreatModal: function(){
        this.setState({modalCreatIsOpen: false});
      },
      render() {
          return (
              <div>
                <div className="label-s content">
                  <Select className="calendar-dd" className="dropdown-toggle" simpleValue options={this.state.ListOfRooms} value={this.state.selectedRoom} onChange={this.selectRoom}/>
                  <div id='calendar'></div>
                </div>
                <Modal className="form form-modal" isOpen={this.state.modalCreatIsOpen} style={ modalStyles }>          
                    <Select className="label-m" simpleValue options={this.state.ListOfModes} onChange={this.creatEvent}/>
                    <button className="btn red-b" onClick={this.closeCreatModal}><i className="fa fa-ban" aria-hidden="true"></i> Annuler</button>
                </Modal>
                <Modal className="form form-modal-2" isOpen={this.state.modalDeleteIsOpen} style={ modalStyles }>
                    <button className="btn red-b" onClick={this.deleteEvent}><i className="fa fa-ban" aria-hidden="true"></i> Supprimer cet evenement</button>
                    <button className="btn" onClick={this.closeDeleteModal}><i className="fa fa-chevron-left" aria-hidden="true"></i> Annuler</button>
                </Modal>                  
              </div>
          );
      }
});