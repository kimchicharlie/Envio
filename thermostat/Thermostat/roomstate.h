#ifndef ROOMSTATE_H
#define ROOMSTATE_H


class RoomState
{
public:
    RoomState();
    ~RoomState();

    void setTemp(float temp);
    void setLum(int lum);
    void setOpac(int opac);
    float getTemp();
    int getLum();
    int getOpac();

private:
    float   _temp;
    int     _lum;
    int     _opac;
};

#endif // ROOMSTATE_H
