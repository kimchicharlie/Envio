#ifndef TEMPERATUREWINDOW_H
#define TEMPERATUREWINDOW_H

#include <QMainWindow>
//#include "mainwindow.h"

namespace Ui {
class TemperatureWindow;
}

class TemperatureWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit TemperatureWindow(QWidget *parent = 0);
    ~TemperatureWindow();

signals:
    // signal to handle the temp has changed

private slots:
    //

private:
    Ui::TemperatureWindow *ui;
};

#endif // TEMPERATUREWINDOW_H
