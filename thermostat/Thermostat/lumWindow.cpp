#include "lumWindow.h"
#include "ui_lumWindow.h"

LumWindow::LumWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::LumWindow)
{
    ui->setupUi(this);
    _slider = ui->TempHorizontalSlider;
    _label = ui->LumLabel;
    _label->setText(QString::number(_slider->value()) + "%");
}

LumWindow::~LumWindow()
{
    delete ui;
}

void LumWindow::on_TempHorizontalSlider_valueChanged(int value)
{
    _label->setText(QString::number(value) + "%");
    emit lumChange(value);
}

void LumWindow::on_AccueilBtn_clicked()
{
    emit returnToMain();
}
