#ifndef ROOMSTATE_H
#define ROOMSTATE_H

#include <QString>

class RoomState
{
public:
    RoomState();
    ~RoomState();

    void    setTemp(double temp);
    void    setLum(int lum);
    void    setOpac(int opac);
    void    setTempDisp(int);
    void    setHourDisp(int);
    double  getTemp();
    int     getLum();
    int     getOpac();
    QString gettempDisp();
    int     getHourDisp();

signals:
    void    changeTempDisp();

public slots:
    void    convertTemp();

private:
    double      _temp;
    int         _lum;
    int         _opac;
    QString     _tempDisp; // 1 for celcius, 2 for farenheit
    int         _hourDisp; // 1 for 12 hours, 2 for 24 hours
};

#endif // ROOMSTATE_H
