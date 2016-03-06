#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QLabel>
#include <QPushButton>
#include <QDateTime>
#include "temperatureWindow.h"

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private slots:
    void on_TempEditButton_clicked();

    void on_LumEditButton_clicked();

    void on_OpacEditButton_clicked();

    void on_PlanningEditButton_2_clicked();

    void on_ConfigEditButton_clicked();

    // make signals and slots to update
    // the state when values change

private:
    Ui::MainWindow  *ui;

    QPixmap         *_logo;

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
};

#endif // MAINWINDOW_H
