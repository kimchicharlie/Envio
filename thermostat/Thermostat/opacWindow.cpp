#include "opacWindow.h"
#include "ui_opacWindow.h"

OpacWindow::OpacWindow(QWidget *parent) :
      QMainWindow(parent),
      ui(new Ui::OpacWindow)
{
    ui->setupUi(this);
    _slider = ui->OpacHorizontalSlider;
    _label = ui->LumLabel;
    _label->setText(QString::number(_slider->value()) + "%");
/*
    ui->AccueilBtn->setStyleSheet("font-family: \"Montserrat\", sans-serif; text-transform: uppercase; outline: 0; background: #4CAF50; width: 100%; border: 0; padding: 10px;color: #FFFFFF;font-size: 12px;");
    ui->LumEditBtn->setStyleSheet("font-family: \"Montserrat\", sans-serif; text-transform: uppercase; outline: 0; background: #0288d1; width: 100%; border: 0; padding: 10px;color: #FFFFFF;font-size: 12px;");
    ui->TempEditBtn->setStyleSheet("font-family: \"Montserrat\", sans-serif; text-transform: uppercase; outline: 0; background: #6a1b9a; width: 100%; border: 0; padding: 10px;color: #FFFFFF;font-size: 12px;");

    ui->PlanningEditBtn->setStyleSheet("font-family: \"Montserrat\", sans-serif; text-transform: uppercase; outline: 0; background: #4CAF50; width: 100%; border: 0; padding: 10px;color: #FFFFFF;font-size: 12px;");
    ui->ConfigEditBtn->setStyleSheet("font-family: \"Montserrat\", sans-serif; text-transform: uppercase; outline: 0; background: #4CAF50; width: 100%; border: 0; padding: 10px;color: #FFFFFF;font-size: 12px;");

    ui->LumFixLabel->setStyleSheet("font-family: \"Montserrat\", sans-serif; text-transform: uppercase; outline: 0; width: 100%; border: 0; padding: 10px;color: #4d4d4d;font-size: 12px;");
*/
    _label->setStyleSheet("font-family: \"Montserrat\", sans-serif; text-transform: uppercase; outline: 0; width: 100%; border: 0; padding: 10px;color: #6a1b9a;font-size: 12px;");

}

OpacWindow::~OpacWindow()
{
    delete ui;
}

void OpacWindow::setSliderVal(int val) {
    this->_slider->setValue(val);
}

void OpacWindow::on_OpacHorizontalSlider_valueChanged(int value)
{
    _label->setText(QString::number(value) + "%");
    emit opacChange(value);
}

void OpacWindow::on_AccueilBtn_clicked()
{
    emit returnToMain();
}

void OpacWindow::on_TempEditBtn_clicked()
{
    emit goToTemp();
}

void OpacWindow::on_LumEditBtn_clicked()
{
    emit goToLum();
}

