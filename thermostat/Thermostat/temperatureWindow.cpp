#include "temperatureWindow.h"
#include "ui_temperatureWindow.h"

#include <QColor>
#include <QDebug>
#include <QTime>

TemperatureWindow::TemperatureWindow(QWidget *parent, int tempDisp, double temp) :
    QMainWindow(parent),
    ui(new Ui::TemperatureWindow)
{
    ui->setupUi(this);

    ui->OpacEditBtn->hide();
    _tempDisp = tempDisp;
    _slider = ui->TempHorizontalSlider;
    _label = ui->TempLabel;
    _slider->setValue(temp);
    if (_tempDisp == 1) {
        _slider->setValue(temp * 10);
        int x = 145 - (temp - 16) * 5;
        QColor color = QColor(255, x, 83, 255);
        QString format("<font color=\"%1\">%2</font>");
        QString text = QString::number(temp) + "°C";
        _label->setText(format.arg(color.name(), text));
//        _label->setText(QString::number(temp) + "°C");
    }
    else {
        //convert celcius to fahrenheit or invert
        // T(°C) = (T(°F) - 32) × 5/9
        _slider->setValue((temp - 32) * 5.0 / 9.0 * 10);
        _label->setText(QString::number(temp) + "°F");
    }
/**
    _logo = new QPixmap("./2017_logo_envio2.png");
    _logo->scaled(50, 50, Qt::KeepAspectRatio);
    this->ui->LogoLabel->setPixmap(*_logo);
/**/
}

TemperatureWindow::~TemperatureWindow()
{
    delete ui;
}

void TemperatureWindow::setSliderVal(double val) {
    if (_tempDisp == 1) {
        int x = 145 - (int)(val - 16) * 5;
        QColor color = QColor(255, x, 83, 255);
        QString format("<font color=\"%1\">%2</font>");
        QString text = QString::number((double)(val)) + "°C";
        _label->setText(format.arg(color.name(), text));
    } else {
        _label->setText(QString::number(val) + "°F");
    }
    _slider->setValue(val * 10);
}

void TemperatureWindow::setTempDisp(double val) {
    _tempDisp = val;
}

void TemperatureWindow::on_TempHorizontalSlider_valueChanged(int value)
{
    _slider->blockSignals(true);

    int tmpTemp = value;
    double tmp = tmpTemp;
    tmp = tmp / 10.0 - (int)(tmp / 10.0);
    // make the value be x.5 or x.0
    if (tmp <= 0.9 && tmp > 0.7)
        tmp = tmp + (1.0 - tmp);
    else if (tmp <= 0.7 && tmp > 0.5)
        tmp = tmp - (tmp - 0.5);
    else if (tmp < 0.5 && tmp >= 0.3)
        tmp = tmp + (0.5 - tmp);
    else if (tmp < 0.3 && tmp >= 0.1)
        tmp = tmp - (tmp - 0.5);
    tmpTemp = tmpTemp / 10 * 10 + tmp * 10;

    _slider->setValue(tmpTemp);

    //convert celcius to fahrenheit
    // T(°C) = (T(°F) - 32) × 5/9
    // T(°F) = T(°C) × 9 / 5 + 32
    // 1 for celcius, 2 for fahrenheit
    if (_tempDisp == 1) {
        int x = 145 - (int)(_slider->value() / 10 - 16) * 5;
        QColor color = QColor(255, x, 83, 255);
        QString format("<font color=\"%1\">%2</font>");
        QString text = QString::number((double)(_slider->value()) / 10) + "°C";
        _label->setText(format.arg(color.name(), text));
        emit tempChange((double)(_slider->value()) / 10);
    }
    else {
        int x = 145 - (int)(_slider->value() / 10 - 16) * 5;
        QColor color = QColor(255, x, 83, 255);
        QString format("<font color=\"%1\">%2</font>");
        QString text = (QString::number((double)(_slider->value()) / 10 * 9.0 / 5.0 + 32) + "°F");
        _label->setText(format.arg(color.name(), text));
        emit tempChange((double)(_slider->value()) / 10 * 9.0 / 5.0 + 32);
    }
    _slider->blockSignals(false);
}

void TemperatureWindow::on_AccueilBtn_clicked()
{
    emit returnToMain();
}

void TemperatureWindow::on_LumEditBtn_clicked() {
    emit goToLum();
}

void TemperatureWindow::on_OpacEditBtn_clicked() {
    emit goToOpac();
}

void TemperatureWindow::on_PlanningEditBtn_clicked()
{
    emit goToPlan();
}

void TemperatureWindow::on_ConfigEditBtn_clicked()
{
    emit goToConfig();
}


