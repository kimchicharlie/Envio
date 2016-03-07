#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),

    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    _curRoom = new RoomState();
    // get the logo and display it
/*
     _logo = new QPixmap("./2017_logo_envio2.png");
    _logo->scaled(50, 50, Qt::KeepAspectRatio);
    this->ui->LogoLabel->setPixmap(*_logo);
*/

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

    // temperature window and associated signals/slots
    _tempWin = new TemperatureWindow(this);
    connect(_tempWin, SIGNAL(tempChange(double)),
            this, SLOT(tempValChanged(double)));
    connect(_tempWin, SIGNAL(returnToMain()),
            this, SLOT(backToMain()));

    // lum window and associated signals/slots
    _lumWin = new LumWindow(this);
    connect(_lumWin, SIGNAL(lumChange(int)),
            this, SLOT(lumValChanged(int)));
    connect(_lumWin, SIGNAL(returnToMain()),
            this, SLOT(backToMain()));

    /*
    // opac window and associated signals/slots
    _opacWin = new OpacWindow(this);
    connect(_opacWin, SIGNAL(opacChange(int)),
            this, SLOT(opacValChanged(int)));
    connect(_opacWin, SIGNAL(returnToMain()),
            this, SLOT(backToMain()));

    // planning window and associated signals/slots
    _planWin = new PlanningWindow(this);
    connect(_planWin, SIGNAL(returnToMain()),
            this, SLOT(backToMain()));

    // config window and associated signals/slots
    _configWin = new ConfigWindow(this);
    connect(_configWin, SIGNAL(tempDispChange(int)),
            this, SLOT(tempDispChanged(int)));
    connect(_configWin, SIGNAL(hourDispChange(int)),
            this, SLOT(hourDispChanged(int)));
    connect(_configWin, SIGNAL(returnToMain()),
            this, SLOT(backToMain()));
    */
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

LumWindow* MainWindow::getLumWin() {
    return (_lumWin);
}

/*
OpacWindow* MainWindow::getOpacWin() {
    return (_opacWin);
}

PlanningWindow* MainWindow::getPlanWin() {
    return (_planWin);
}

ConfigWindow* MainWindow::getConfigWin() {
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
    // change window to TemperatureWindow
    this->hide();
    _tempWin->hide();
    /*
    _opacWin->hide();
    _planWin->hide();
    _configWin->hide();
    */
    this->_lumWin->show();
}

void MainWindow::on_OpacEditButton_clicked()
{
    this->hide();
    _tempWin->hide();
    _lumWin->hide();
    /*
    _planWin->hide();
    _configWin->hide();
    _opacWin->show();
    */
}

void MainWindow::on_PlanningEditButton_clicked()
{
    this->hide();
    _tempWin->hide();
    _lumWin->hide();
    /*
    _opacWin->hide();
    _configWin->hide();
    _planWin->show();
    */
}

void MainWindow::on_ConfigEditButton_clicked()
{
    this->hide();
    _tempWin->hide();
    _lumWin->hide();
    /*
    _opacWin->hide();
    _planWin->hide();
    _configWin->show();
    */
}

void    MainWindow::backToMain() {
    _tempWin->hide();
    _lumWin->hide();
    /*
    _opacWin->hide();
    _planWin->hide();
    _configWin->hide();
    */
    this->show();
}

void MainWindow::tempValChanged(double newVal) {
    _curRoom->setTemp(newVal);
    _tempLbl->setText(QString::number(_curRoom->getTemp()) + "°C");
}

void MainWindow::lumValChanged(int newVal) {
    _curRoom->setLum(newVal);
    _lumLbl->setText(QString::number(_curRoom->getLum()) + "%");
}
