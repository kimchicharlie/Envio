#include "roomstate.h"

RoomState::RoomState()
{
    // récupérer les vrais valeurs dans la DB
    _temp = 20.0;
    _lum = 60;
    _opac = 20;
}

RoomState::~RoomState()
{

}

void RoomState::setTemp(float temp) {
    this->_temp = temp;
}

void RoomState::setLum(int lum) {
    this->_lum = lum;
}

void RoomState::setOpac(int opac) {
    this->_opac = opac;
}

float RoomState::getTemp() {
    return(_temp);
}

int RoomState::getLum() {
    return(_lum);
}

int RoomState::getOpac() {
    return(_opac);
}

