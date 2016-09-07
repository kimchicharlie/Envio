#include "lumWindow.h"
#include "ui_lumWindow.h"

LumWindow::LumWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::LumWindow)
{
    ui->setupUi(this);
    ui->OpacEditBtn->hide();

    _slider = ui->LumHorizontalSlider;
    _label = ui->LumLabel;
    _label->setText(QString::number(_slider->value()) + "%");

}

LumWindow::~LumWindow()
{
    delete ui;
}

void LumWindow::setSliderVal(int val) {
    this->_slider->setValue(val);
}

void LumWindow::on_LumHorizontalSlider_valueChanged(int value)
{
    _label->setText(QString::number(value) + "%");
    emit lumChange(value);
}

void LumWindow::on_AccueilBtn_clicked()
{
    emit returnToMain();
}


void LumWindow::on_TempEditBtn_clicked() {
    emit goToTemp();
}

void LumWindow::on_OpacEditBtn_clicked() {
    emit goToOpac();
}

void LumWindow::on_PlanningEditBtn_clicked()
{
    emit goToPlan();
}

void LumWindow::on_ConfigEditBtn_clicked()
{
    emit goToConfig();
}
