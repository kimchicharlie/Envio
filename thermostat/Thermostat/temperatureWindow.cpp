#include "temperatureWindow.h"
#include "ui_temperatureWindow.h"

TemperatureWindow::TemperatureWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::TemperatureWindow)
{
    ui->setupUi(this);
}

TemperatureWindow::~TemperatureWindow()
{
    delete ui;
}
