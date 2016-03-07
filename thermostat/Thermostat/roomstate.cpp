#include "roomstate.h"

RoomState::RoomState()
{
    // récupérer les vrais valeurs dans la DB
    _temp = 20.0;
    _lum = 60;
    _opac = 20;
    _tempDisp = "°C";
    _hourDisp = 2;
}

RoomState::~RoomState()
{

}

void RoomState::setTemp(double temp) {
    this->_temp = temp;
}

void RoomState::setLum(int lum) {
    this->_lum = lum;
}

void RoomState::setOpac(int opac) {
    this->_opac = opac;
}


// 1 for celcius, 2 for farenheit
void    RoomState::setTempDisp(int change) {
    if (change == 1)
        _tempDisp = "°C";
    else
        _tempDisp = "°F";
    emit changeTempDisp();
}

// 1 for 12 hours, 2 for 24 hours
void    RoomState::setHourDisp(int change) {
        _hourDisp = change;

}

double RoomState::getTemp() {
    return(_temp);
}

int RoomState::getLum() {
    return(_lum);
}

int RoomState::getOpac() {
    return(_opac);
}

QString RoomState::gettempDisp() {
    return (_tempDisp);
}

int     RoomState::getHourDisp() {
    return (_hourDisp);
}

void    RoomState::convertTemp() {
    //convert celcius to farenheit or invert
}
