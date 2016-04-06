#include "planningWindow.h"
#include "ui_planningWindow.h"

PlanningWindow::PlanningWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::PlanningWindow)
{
    ui->setupUi(this);

    _planModel = new PlanningModel(this, QString(QDate::currentDate().toString()));

    _planning = ui->tableView;
    _prevBtn = ui->PrevButton;
    _nextBtn = ui->NextButton;
    _addModeBtn = ui->AddModeButton;
//    ui->DateLabel->setText(QDate::currentDate().toString());

    _planning->setModel(_planModel);
   // QHeaderView *hdView = _planning->horizontalHeader();
   // hdView->setDefaultSectionSize(280);
  //  hdView->setObjectName(QString(QDate::currentDate().toString()));
    //_planning->setHorizontalHeader(hdView);

}

PlanningWindow::~PlanningWindow()
{
    delete ui;
}

void PlanningWindow::on_AccueilBtn_clicked()
{
    emit returnToMain();
}
