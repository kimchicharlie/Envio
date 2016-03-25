#ifndef PLANNING_H
#define PLANNING_H

#include <QString>

class Planning
{
public:
    Planning(QString type, int day, int month, int hour, int min, int duration);

private:
    QString _type;
    int     _day;
    int     _month;
    int     _hour;
    int     _minute;
    int     _duration;
};

#endif // PLANNING_H
