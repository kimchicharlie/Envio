#ifndef TEMPERATUREWINDOW_H
#define TEMPERATUREWINDOW_H

#include <QMainWindow>
#include <QLabel>
#include "QSlider.h"
#include <iostream>

namespace Ui {
class TemperatureWindow;
}

class TemperatureWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit TemperatureWindow(QWidget *parent = 0, int tempDisp = 1);
    ~TemperatureWindow();
    void setSliderVal(int val);

signals:
    // signal to handle the temp has changed
    void tempChange(double temp);
    void returnToMain();
    void goToLum();
    void goToOpac();


private slots:
    void on_TempHorizontalSlider_valueChanged(int value);

    void on_AccueilBtn_clicked();
    void on_LumEditBtn_clicked();
    void on_OpacEditBtn_clicked();

private:
    Ui::TemperatureWindow   *ui;
    QPixmap                 *_logo;
    QSlider                 *_slider;
    QLabel                  *_label;
    int                     _tempDisp;
};

#endif // TEMPERATUREWINDOW_H
