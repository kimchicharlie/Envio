#ifndef ROOMSTATE_H
#define ROOMSTATE_H

#include <QString>
#include <QMainWindow>
#include "planning.h"

class RoomState : public QWidget
{
    Q_OBJECT

public:
    RoomState();
    RoomState(QString name, QString pin);
    ~RoomState();

    void    setTemp(double temp);
    void    setLum(int lum);
    void    setOpac(int opac);
    void    setTempDisp(int);
    void    setHourDisp(int);
    double  getTemp();
    int     getLum();
    int     getOpac();
    QString getTempDisp();
    int     getTempDispVal();
    int     getHourDisp();
    QString getPin();
    QString getID();
    QString getName();

signals:
    void    changeTempDisp();
//    void    changeHourDisp();

private slots:
    void    convertTemp();
    void    TempDispChange(int);
    void    HourDispChange(int);

private:
    double          _temp;
    int             _lum;
    int             _opac;
    QString         _name;
    QString         _id;
    QString         _code;

    QList<Planning> _plan;

    QString         _tempDisp; // 1 for celcius, 2 for fahrenheit
    int             _tempDispVal; // 1 for celcius, 2 for fahrenheit
    int             _hourDisp; // 1 for 12 hours, 2 for 24 hours
};

#endif // ROOMSTATE_H
