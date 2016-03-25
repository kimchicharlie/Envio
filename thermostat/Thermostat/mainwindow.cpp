#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),

    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    this->setStyleSheet("./style/thermostatStyleSheet.");

    _curRoom = new RoomState();
    // get the logo and display it
/*
     _logo = new QPixmap("./2017_logo_envio2.png");
    _logo->scaled(50, 50, Qt::KeepAspectRatio);
    this->ui->LogoLabel->setPixmap(*_logo);
*/

    //get the label to display the state and fill them
    _tempLbl = this->ui->TempLabel;
    _tempLbl->setText(QString::number(_curRoom->getTemp()) + _curRoom->getTempDisp());
    if (_curRoom->getTempDispVal() == 1)
        _tempLbl->setText(QString::number(_curRoom->getTemp()) + "°C");
    else
        _tempLbl->setText(QString::number(_curRoom->getTemp()) + "°F");
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

    // temperature window and associated signals/slots
    _tempWin = new TemperatureWindow(this, 1);
//    _tempWin = new TemperatureWindow(this, 2);
    _tempWin->setSliderVal(_curRoom->getTemp() * 10);
    connect(_tempWin, SIGNAL(tempChange(double)),
            this, SLOT(tempValChanged(double)));
    connect(_tempWin, SIGNAL(returnToMain()),
            this, SLOT(backToMain()));
    connect(_tempWin, SIGNAL(goToLum()),
            this, SLOT(on_LumEditButton_clicked()));
    connect(_tempWin, SIGNAL(goToOpac()),
            this, SLOT(on_OpacEditButton_clicked()));

    // lum window and associated signals/slots
    _lumWin = new LumWindow(this);
    _lumWin->setSliderVal(_curRoom->getLum());
    connect(_lumWin, SIGNAL(lumChange(int)),
            this, SLOT(lumValChanged(int)));
    connect(_lumWin, SIGNAL(returnToMain()),
            this, SLOT(backToMain()));
    connect(_lumWin, SIGNAL(goToTemp()),
            this, SLOT(on_TempEditButton_clicked()));
    connect(_lumWin, SIGNAL(goToOpac()),
            this, SLOT(on_OpacEditButton_clicked()));


    // opac window and associated signals/slots
    _opacWin = new OpacWindow(this);
    _opacWin->setSliderVal(_curRoom->getOpac());
    connect(_opacWin, SIGNAL(opacChange(int)),
            this, SLOT(opacValChanged(int)));
    connect(_opacWin, SIGNAL(returnToMain()),
            this, SLOT(backToMain()));
    connect(_opacWin, SIGNAL(goToTemp()),
            this, SLOT(on_TempEditButton_clicked()));
    connect(_opacWin, SIGNAL(goToLum()),
            this, SLOT(on_LumEditButton_clicked()));

    // planning window and associated signals/slots
    _planWin = new PlanningWindow(this);
    connect(_planWin, SIGNAL(returnToMain()),
            this, SLOT(backToMain()));

    // config window and associated signals/slots
    _configWin = new ConfigWindow(this);
/*
    connect(_configWin, SIGNAL(TempDispChange(int)),
            _curRoom, SLOT(TempDispChange(int)));
    connect(_configWin, SIGNAL(HourDispChange(int)),
            _curRoom, SLOT(HourDispChange(int)));
*/
    connect(_configWin, SIGNAL(returnToMain()),
            this, SLOT(backToMain()));
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
    delete _lumWin;
    delete _opacWin;
    delete ui;
}

TemperatureWindow* MainWindow::getTempWin() {
    return (_tempWin);
}

LumWindow* MainWindow::getLumWin() {
    return (_lumWin);
}


OpacWindow* MainWindow::getOpacWin() {
    return (_opacWin);
}


PlanningWindow* MainWindow::getPlanWin() {
    return (_planWin);
}

ConfigWindow* MainWindow::getConfigWin() {
    return (_configWin);
}


void MainWindow::on_TempEditButton_clicked()
{
    // change window to TemperatureWindow
    this->hide();
    _tempWin->hide();
    _lumWin->hide();
    _planWin->hide();
    _configWin->hide();
    this->_tempWin->show();
}

void MainWindow::on_LumEditButton_clicked()
{
    // change window to TemperatureWindow
    this->hide();
    _tempWin->hide();
    _opacWin->hide();
    _planWin->hide();
    _configWin->hide();
    this->_lumWin->show();
}

void MainWindow::on_OpacEditButton_clicked()
{
    this->hide();
    _tempWin->hide();
    _lumWin->hide();
    _planWin->hide();
    _configWin->hide();
    this->_opacWin->show();
}

void MainWindow::on_PlanningEditButton_clicked()
{
    this->hide();
    _tempWin->hide();
    _lumWin->hide();
    _opacWin->hide();
    _configWin->hide();
    _planWin->show();
}

void MainWindow::on_ConfigEditButton_clicked()
{
    this->hide();
    _tempWin->hide();
    _lumWin->hide();
    _opacWin->hide();
    _planWin->hide();
    _configWin->show();
}

void    MainWindow::backToMain() {
    _tempWin->hide();
    _lumWin->hide();
    _opacWin->hide();
    _planWin->hide();
    _configWin->hide();
    this->show();
}

void MainWindow::tempValChanged(double newVal) {
    _curRoom->setTemp(newVal);
    _tempLbl->setText(QString::number(_curRoom->getTemp()) + _curRoom->getTempDisp());
/*    if (_curRoom->gettempDispVal() == 1)
        _tempLbl->setText(QString::number(_curRoom->getTemp()) + "°C");
    else
        _tempLbl->setText(QString::number(_curRoom->getTemp()) + "°F");
    */
}

void MainWindow::lumValChanged(int newVal) {
    _curRoom->setLum(newVal);
    _lumLbl->setText(QString::number(_curRoom->getLum()) + "%");
}

void MainWindow::opacValChanged(int newVal) {
    _curRoom->setOpac(newVal);
    _opacLbl->setText(QString::number(_curRoom->getOpac()) + "%");
}
