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
    int x = 55 + (int)(_slider->value()) * 2;
    QColor color = QColor(0, x, x, 255);
    QString format("<font color=\"%1\">%2</font>");
    QString text = QString::number(_slider->value()) + "%";
    _label->setText(format.arg(color.name(), text));
}

LumWindow::~LumWindow()
{
    delete ui;
}

void LumWindow::setSliderVal(int val) {
    this->_slider->setValue(val);
    int x = 55 + (int)(_slider->value()) * 2;
    QColor color = QColor(0, x, x, 255);
    QString format("<font color=\"%1\">%2</font>");
    QString text = QString::number(val) + "%";
    _label->setText(format.arg(color.name(), text));
}

void LumWindow::on_LumHorizontalSlider_valueChanged(int value)
{
    _slider->blockSignals(true);
    int x = 55 + (int)(_slider->value()) * 2;
    QColor color = QColor(0, x, x, 255);
    QString format("<font color=\"%1\">%2</font>");
    QString text = QString::number(value) + "%";
    _label->setText(format.arg(color.name(), text));

    emit lumChange(value);
    _slider->blockSignals(false);
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
