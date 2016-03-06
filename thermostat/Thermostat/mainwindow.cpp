#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),

    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    _curRoom = new RoomState();
    // get the logo and display it
    _logo = new QPixmap("./2017_logo_envio2.png");
    _logo->scaled(50, 50, Qt::KeepAspectRatio);
    this->ui->LogoLabel->setPixmap(*_logo);

    //get the label to display the state and fill them
    _tempLbl = this->ui->TempLabel;
    _tempLbl->setText(QString::number(_curRoom->getTemp()) + "°C");
    _lumLbl = this->ui->LumLabel;
    _lumLbl->setText(QString::number(_curRoom->getLum()) + "%");
    _opacLbl = this->ui->OpacLabel;
    _opacLbl->setText(QString::number(_curRoom->getOpac()) + "%");

    _tempBtn = this->ui->TempEditButton;
    _lumBtn = this->ui->LumEditButton;
    _opacBtn = this->ui->OpacEditButton;

    this->_date = new QDateTime();
    this->ui->DateLabel->setText(
                this->_date->currentDateTime().toString(Qt::TextDate));

    _tempWin = new TemperatureWindow(this);
    connect(_tempWin, SIGNAL(tempChange(double)),
            this, SLOT(tempValChanged(double)));
    connect(_tempWin, SIGNAL(returnToMain()),
            this, SLOT(backToMainFromTemp()));
}

MainWindow::~MainWindow()
{
    delete _logo;
    delete _date;
    delete _tempLbl;
    delete _lumLbl;
    delete _opacLbl;
    delete _tempBtn;
    delete _lumBtn;
    delete _opacBtn;
    delete _tempWin;
    delete ui;
}

TemperatureWindow* MainWindow::getTempWin() {
    return (_tempWin);
}

/*
TemperatureWindow MainWindow::getTempWin() {
    return (_tempWin);
}

LumWindow MainWindow::getLumWin() {
    return (_lumWin);
}

OpacWindow MainWindow::getOpacWin() {
    return (_opacWin);
}

PlanningWindow MainWindow::getPlanWin() {
    return (_planWin);
}

ConfigWindow MainWindow::getConfigWin() {
    return (_configWin);
}
*/

void MainWindow::on_TempEditButton_clicked()
{
    // change window to TemperatureWindow
    this->hide();
    this->_tempWin->show();
}

void MainWindow::on_LumEditButton_clicked()
{

}

void MainWindow::on_OpacEditButton_clicked()
{

}

void MainWindow::on_PlanningEditButton_clicked()
{

}

void MainWindow::on_ConfigEditButton_clicked()
{

}

void MainWindow::tempValChanged(double newVal) {
    _curRoom->setTemp(newVal);
    _tempLbl->setText(QString::number(_curRoom->getTemp()) + "°C");
}

void    MainWindow::backToMainFromTemp() {
    _tempWin->hide();
    this->show();
}
