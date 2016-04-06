#ifndef PLANNINGWINDOW_H
#define PLANNINGWINDOW_H

#include <QMainWindow>
#include <QTableView>
#include <QTableWidget>
#include <QPushButton>
#include "planningmodel.h"


namespace Ui {
class PlanningWindow;
}

class PlanningWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit PlanningWindow(QWidget *parent = 0);
    ~PlanningWindow();

signals:
    // signal to handle the temp has changed
    void returnToMain();

private slots:
    void on_AccueilBtn_clicked();

private:
    Ui::PlanningWindow  *ui;
    QTableView          *_planning;
    QPushButton         *_prevBtn;
    QPushButton         *_nextBtn;
    QPushButton         *_addModeBtn;

    PlanningModel       *_planModel;
};

#endif // PLANNINGWINDOW_H
