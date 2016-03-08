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
}

OpacWindow::~OpacWindow()
{
    delete ui;
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
