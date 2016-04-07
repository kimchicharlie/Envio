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

    void showEvent(QShowEvent* event );

signals:
// signal to handle the temp has changed
void returnToMain();

private slots:
    void on_AccueilBtn_clicked();

    void on_NextButton_clicked();

    void on_AddModeButton_clicked();

    void on_PrevButton_clicked();

private:
    Ui::PlanningWindow  *ui;
    QTableView          *_planning;
    QPushButton         *_prevBtn;
    QPushButton         *_nextBtn;
    QPushButton         *_addModeBtn;
    QDate               _date;

    PlanningModel       *_planModel;
};

#endif // PLANNINGWINDOW_H
