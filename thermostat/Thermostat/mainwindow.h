#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QLabel>
#include <QPushButton>
#include <QDateTime>
#include <QString>
#include "temperatureWindow.h"
#include "LumWindow.h"
#include "roomstate.h"

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

    TemperatureWindow* getTempWin();
    LumWindow* getLumWin();
/*
    OpacWindow MainWindow::getOpacWin();
    PlanningWindow MainWindow::getPlanWin();
    ConfigWindow MainWindow::getConfigWin();
*/
private slots:
    void on_TempEditButton_clicked();

    void on_LumEditButton_clicked();

    void on_OpacEditButton_clicked();

    void on_PlanningEditButton_clicked();

    void on_ConfigEditButton_clicked();

    // make signals and slots to update
    // the state when values change
    void tempValChanged(double newVal);
    void lumValChanged(int newVal);

    // slot to return to the mainWindow
    void    backToMain();

private:
    Ui::MainWindow  *ui;

    QPixmap         *_logo;
    RoomState       *_curRoom;

    // Label to display state
    QLabel          *_tempLbl;
    QLabel          *_lumLbl;
    QLabel          *_opacLbl;

    // Button to change window
    QPushButton     *_tempBtn;
    QPushButton     *_lumBtn;
    QPushButton     *_opacBtn;

    QDateTime       *_date;

    // Other windows
    TemperatureWindow   *_tempWin;
    LumWindow           *_lumWin;
};

#endif // MAINWINDOW_H
