#ifndef PLANNINGWINDOW_H
#define PLANNINGWINDOW_H

#include <QMainWindow>
#include <QCalendarWidget>

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
    QCalendarWidget     *_calendar;
};

#endif // PLANNINGWINDOW_H
