#include "configWindow.h"
#include "ui_configWindow.h"

ConfigWindow::ConfigWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::ConfigWindow)
{
    ui->setupUi(this);
}

ConfigWindow::~ConfigWindow()
{
    delete ui;
}

void ConfigWindow::on_AccueilBtn_clicked()
{
    emit returnToMain();
}
