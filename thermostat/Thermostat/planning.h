#ifndef PLANNING_H
#define PLANNING_H

#include <QString>
#include <QDate>

class Planning
{
public:
    Planning(QString type, QDate date, int hour, int min, int duration);

    QString     getType();
    QDate       getDate();
    int         getHour();
    int         getMinute();
    int         getDuration();
private:
    QString _type;
    QDate   _date;
    int     _hour;
    int     _minute;
    int     _duration;
};

#endif // PLANNING_H
