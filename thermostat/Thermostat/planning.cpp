#include "planning.h"

Planning::Planning(QString type, QDate date, int hour, int min, int duration) :
_type(type), _date(date), _hour(hour), _minute(min), _duration(duration)
{

}

Planning::Planning(QString type, QString id, QDateTime start, QDateTime end) {
    _type = type;
    _id = id;
    _date = start.date();
    _hour = start.time().hour();
    _minute = start.time().minute();
    _duration = (end.time().hour() - _hour) * 60 +
            end.time().minute() + _minute;
}


QString   Planning::getType() {
    return _type;
}

QDate   Planning::getDate() {
    return _date;
}

int     Planning::getHour() {
    return _hour;
}

int     Planning::getMinute() {
    return _minute;
}

int     Planning::getDuration() {
    return _duration;
}
