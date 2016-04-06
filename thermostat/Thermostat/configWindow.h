#ifndef CONFIGWINDOW_H
#define CONFIGWINDOW_H

#include <QMainWindow>
#include <QStringListModel>
#include <QListView>
#include "roomstate.h"
#include "roomlistmodel.h"

namespace Ui {
class ConfigWindow;
}

class ConfigWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit ConfigWindow(QWidget *parent = 0);
    ~ConfigWindow();

signals:
    // signal to handle the temp has changed
    void returnToMain();
    void TempDispChange();
    void HourDispChange();

private slots:
    void on_AccueilBtn_clicked();
    void on_TempDispButton_clicked();
    void on_HourDispButton_clicked();

    void on_listView_clicked(const QModelIndex &index);

private:
    Ui::ConfigWindow    *ui;
    //list of rooms to display
    RoomListModel       *_model;
    QListView           *_listView;
    QList<RoomState*>   *_rooms;
    int                 _tempDisp; //value to display for the current room 1 for C° / 2 for F°
    int                 _hourDisp; //value to display for the current room 1 for 12h / 2 for 24h
};

#endif // CONFIGWINDOW_H
