#include "planningWindow.h"
#include "ui_planningWindow.h"

PlanningWindow::PlanningWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::PlanningWindow)
{
    ui->setupUi(this);
}

PlanningWindow::~PlanningWindow()
{
    delete ui;
}

void PlanningWindow::on_AccueilBtn_clicked()
{
    emit returnToMain();
}
