#ifndef TEMPERATUREWINDOW_H
#define TEMPERATUREWINDOW_H

#include <QMainWindow>
#include <QLabel>
#include <QSlider>
#include <iostream>

namespace Ui {
class TemperatureWindow;
}

class TemperatureWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit TemperatureWindow(QWidget *parent = 0, int tempDisp = 1, double temp = 20.0);
    ~TemperatureWindow();
    void setSliderVal(double val);
    void setTempDisp(double val);

signals:
    // signal to handle the temp has changed
    void tempChange(double temp);
    void returnToMain();
    void goToLum();
    void goToOpac();
    void goToConfig();
    void goToPlan();


private slots:
    void on_TempHorizontalSlider_valueChanged(int value);

    void on_AccueilBtn_clicked();
    void on_LumEditBtn_clicked();
    void on_OpacEditBtn_clicked();
    void on_PlanningEditBtn_clicked();
    void on_ConfigEditBtn_clicked();

private:
    Ui::TemperatureWindow   *ui;
    QPixmap                 *_logo;
    QSlider                 *_slider;
    QLabel                  *_label;
    double                     _tempDisp;
};

#endif // TEMPERATUREWINDOW_H
