#include "roomstate.h"
#include <iostream>

RoomState::RoomState()
{
    // récupérer les vrais valeurs dans la DB
    _temp = 20.0;
    _lum = 60;
    _opac = 20;
    _hourDisp = 1;
//    _hourDisp = 2;
    //get the name of the room
    _name = "Large Room";
    //get the pin of the room
    _code = "0000";
/**/
    _tempDisp = "°C";
    _tempDispVal = 1;
/*
    _tempDisp = "°F";
    _tempDispVal = 2;
    //convert celcius to fahrenheit
    // T(°C) = (T(°F) - 32) × 5/9
    _temp = _temp * 9 / 5 + 32;
/**/
    connect(this, SIGNAL(changeTempDisp()),
                      this, SLOT(convertTemp()));
}

RoomState::RoomState(QString name, QString pin)
{
    // récupérer les vrais valeurs dans la DB
    _temp = 20.0;
    _lum = 60;
    _opac = 20;
    _hourDisp = 2;
    _name = name;
    _code = pin;
    _tempDisp = "°C";
    _tempDispVal = 1;
    connect(this, SIGNAL(changeTempDisp()),
                      this, SLOT(convertTemp()));
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


// 1 for celcius, 2 for fahrenheit
void    RoomState::setTempDisp(int change) {
    _tempDispVal = change;
    if (change == 1)
        _tempDisp = "°C";
    else
        _tempDisp = "°F";
    emit changeTempDisp();
}

// 1 for 12 hours, 2 for 24 hours
void    RoomState::setHourDisp(int change) {
        _hourDisp = change;
//        emit changeHourDisp();
}

void    RoomState::TempDispChange(int change) {
    _tempDispVal = change;
    if (change == 1)
        _tempDisp = "°C";
    else
        _tempDisp = "°F";
    emit changeTempDisp();
/*    if (_tempDispVal == 1)
        setTempDisp(2);
    else
        setTempDisp(1);
*/
}

void    RoomState::HourDispChange(int val) {
    _hourDisp = val;
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

QString RoomState::getTempDisp() {
    return (_tempDisp);
}


int RoomState::getTempDispVal() {
    return (_tempDispVal);
}

int     RoomState::getHourDisp() {
    return (_hourDisp);
}

QString RoomState::getPin() {
    return (_code);
}


void    RoomState::convertTemp() {
    //convert celcius to fahrenheit or invert
    // T(°C) = (T(°F) - 32) × 5/9
    if (_tempDispVal == 1)
        _temp = (_temp - 32) * 5.0 / 9.0;
    else
        _temp = _temp * 9.0 / 5.0 + 32;
}
