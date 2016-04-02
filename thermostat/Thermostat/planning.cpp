#include "planning.h"

Planning::Planning(QString type, QDate date, int hour, int min, int duration) :
_type(type), _date(date), _hour(hour), _minute(min), _duration(duration)
{

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
