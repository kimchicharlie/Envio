#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),

    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    // get the logo and display it
    _logo = new QPixmap("D:/Qt_projets/test/2017_logo_envio2.png");
    _logo->scaled(50, 50, Qt::KeepAspectRatio);
    this->ui->LogoLabel->setPixmap(*_logo);

    //get the label to display the state and fill them
    _tempLbl = this->ui->TempLabel;
    _tempLbl->setText("20°C");
    _lumLbl = this->ui->LumLabel;
    _lumLbl->setText("70%");
    _opacLbl = this->ui->OpacLabel;
    _opacLbl->setText("20%");

    _tempBtn = this->ui->TempEditButton;
    _lumBtn = this->ui->LumEditButton;
    _opacBtn = this->ui->OpacEditButton;

    this->_date = new QDateTime();
    this->ui->DateLabel->setText(
                this->_date->currentDateTime().toString(Qt::TextDate));

    _tempWin = new TemperatureWindow(this);
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

void MainWindow::on_TempEditButton_clicked()
{
    this->hide();
    this->_tempWin->show();
}

void MainWindow::on_LumEditButton_clicked()
{

}

void MainWindow::on_OpacEditButton_clicked()
{

}

void MainWindow::on_PlanningEditButton_2_clicked()
{

}

void MainWindow::on_ConfigEditButton_clicked()
{

}
