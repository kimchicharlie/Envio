#ifndef CONFIGWINDOW_H
#define CONFIGWINDOW_H

#include <QMainWindow>
#include <QStringListModel>
#include <QListView>

#include <QNetworkAccessManager>
#include <QNetworkRequest>
#include <QNetworkReply>
#include <QByteArray>
//#include <QJsonArray>
#include <QJsonDocument>
//#include <QUrl>
//#include <QUrlQuery>
#include <QHttpPart>
#include <boost/algorithm/string/trim.hpp>

#include <string>
#include <iostream>
#include <sstream>

#include "netConnection.h"
#include "roomstate.h"
#include "roomlistmodel.h"
#include "roomSelection.h"

namespace Ui {
class ConfigWindow;
}

class ConfigWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit ConfigWindow(QWidget *parent = 0);
    ~ConfigWindow();
    void getRoomsFromAPI();
    void parseRep();



signals:
    // signal to handle the temp has changed
    void returnToMain();
    void TempDispChange(int);
    void HourDispChange(int);
    void changeCurRoom(RoomState*);

private slots:
    void on_AccueilBtn_clicked();
    void on_TempDispButton_clicked();
    void on_HourDispButton_clicked();

    void on_listView_clicked(const QModelIndex &index);
    void changeRoom(int);

    void httpFinished();
    void httpFailed(QNetworkReply::NetworkError err);
    void httpReadyRead();

public slots:
    void    show();


private:
    Ui::ConfigWindow    *ui;
    //list of rooms to display
    RoomListModel       *_model;
    QListView           *_listView;
    QList<RoomState*>   *_rooms;
    int                 _tempDisp; //value to display for the current room 1 for C° / 2 for F°
    int                 _hourDisp; //value to display for the current room 1 for 12h / 2 for 24h
    RoomSelection       *_modal;

    // Network
    NetConnection           *_network;
    QNetworkAccessManager   *_netMan;
    QNetworkReply           *_netRep;
    //http://176.31.127.14/
//    QString                 *_hostName = new QString("176.31.127.14");
//    QString                 *_hostName = new QString("127.0.0.1");
//    quint16                 _hostPort = 1337;
//    QUrl                    _url;
    QHttpMultiPart          *_multiPart;
    QByteArray              _reply;
    QJsonArray              *_jsonArr;
    bool                    _error = false;
    bool                    _toSend = false;
};

#endif // CONFIGWINDOW_H
