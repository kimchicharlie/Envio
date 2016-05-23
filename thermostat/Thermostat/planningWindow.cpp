#include "planningWindow.h"
#include "ui_planningWindow.h"
#include <iostream>

PlanningWindow::PlanningWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::PlanningWindow)
{
    ui->setupUi(this);

    _planModel = new PlanningModel(this, QString(QDate::currentDate().toString()));
    _date = QDate::currentDate();

    _planning = ui->tableView;
    _prevBtn = ui->PrevButton;
    _nextBtn = ui->NextButton;
    _addModeBtn = ui->AddModeButton;
    ui->DateLabel->setText(_date.toString());

    _planning->setModel(_planModel);
    _modal = new AddEvent(this);
    _modal->hide();
    connect(_modal, SIGNAL(checkPlan(int,int,int)), this, SLOT(checkPlan(int,int,int)));
    connect(this, SIGNAL(noAdd()), _modal, SLOT(stateRet()));
   QHeaderView *hdHorView = _planning->horizontalHeader();
   hdHorView->setDefaultSectionSize(290);
//   hdView->setObjectName(QString(QDate::currentDate().toString()));
   hdHorView->hide();
   _planning->setHorizontalHeader(hdHorView);

   QHeaderView *hdVertView = _planning->verticalHeader();
   hdVertView->hide();
   for (int i = 0; i < _planModel->rowCount(_planModel->index(0, 0)); i++) {
       QString tmp = _planModel->customHeader(_planModel->index(i, 0));
       _planModel->setHeaderData(i, Qt::Vertical, tmp);
   }
}

PlanningWindow::~PlanningWindow()
{
    delete ui;
}

void PlanningWindow::showEvent( QShowEvent* event ) {
    QWidget::showEvent( event );
    _date = QDate::currentDate();
    //update the planning
    _planModel->refreshPlanning(_date);
}

void PlanningWindow::on_AccueilBtn_clicked()
{
    emit returnToMain();
}

void PlanningWindow::on_PrevButton_clicked()
{
    //récupérer les modes correspondant a la salle et a la date
    _date = _date.addDays(-1);
    ui->DateLabel->setText(_date.toString());
}

void PlanningWindow::on_NextButton_clicked()
{
    //récupérer les modes correspondant a la salle et a la date
    _date = _date.addDays(1);
    ui->DateLabel->setText(_date.toString());
}

void PlanningWindow::on_AddModeButton_clicked()
{
    _modal->show();
    //poper une fenetre avec choix de date et choix de mode
}

void    PlanningWindow::checkPlan(int hour, int min, int dur) {
    //checker planning with this info
    if (_planModel->checkPlan(_date, hour, min, dur) == -1)
        emit noAdd();
    else {
        //create the mode and add it
        _modal->hide();
    }
}
