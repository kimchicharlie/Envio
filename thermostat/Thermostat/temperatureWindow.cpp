#include "temperatureWindow.h"
#include "ui_temperatureWindow.h"

TemperatureWindow::TemperatureWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::TemperatureWindow)
{
    ui->setupUi(this);

    _slider = ui->TempHorizontalSlider;
    _label = ui->TempLabel;
    _label->setText(QString::number((double)(_slider->value()) / 10.0) + "°C");
    /*
    _logo = new QPixmap("./2017_logo_envio2.png");
    _logo->scaled(50, 50, Qt::KeepAspectRatio);
    this->ui->LogoLabel->setPixmap(*_logo);
    */
}

TemperatureWindow::~TemperatureWindow()
{
    delete ui;
}

void TemperatureWindow::on_TempHorizontalSlider_valueChanged(int value)
{
    double tmp = value;
    tmp = tmp / 10.0 - (int)(tmp / 10.0);
    // make the value be x.5 or x.0
    if (tmp <= 0.9 && tmp >= 0.8)
        tmp = tmp + (1.0 - tmp);
    else if (tmp <= 0.7 && tmp > 0.5)
        tmp = tmp - (tmp - 0.5);
    else if (tmp < 0.5 && tmp >= 0.3)
        tmp = tmp + (0.5 - tmp);
    else if (tmp < 0.3 && tmp >= 0.1)
        tmp = tmp - (tmp - 0.5);
    _slider->setValue(value / 10 * 10 + tmp * 10);
    _label->setText(QString::number((double)(_slider->value()) / 10) + "°C");
    emit tempChange((double)(_slider->value()) / 10);
}

void TemperatureWindow::on_AccueilBtn_clicked()
{
    emit returnToMain();
}
