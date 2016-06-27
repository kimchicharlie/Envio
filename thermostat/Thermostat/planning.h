#ifndef PLANNING_H
#define PLANNING_H

#include <QString>
#include <QDate>

class Planning
{
public:
    Planning(QString type, QDate date, int hour, int min, int duration);
    Planning(QString type, QString id, QDate date, int hour, int min, int duration);
    Planning(QString type, QString id, QDateTime start, QDateTime end);

    QString     getType();
    QString     getId();
    QDate       getDate();
    int         getHour();
    int         getMinute();
    int         getDuration();
private:
    QString _type;
    QString _id;
    QDate   _date;
    int     _hour;
    int     _minute;
    int     _duration; // in minutes
};

#endif // PLANNING_H
