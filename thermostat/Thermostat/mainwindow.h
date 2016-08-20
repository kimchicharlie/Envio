#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QLabel>
#include <QPushButton>
#include <QDateTime>
#include <QString>
#include <QTimer>
#include <QNetworkAccessManager>
#include <QNetworkRequest>
#include <QNetworkReply>
#include <QByteArray>
//#include <QJsonArray>
#include <QJsonDocument>
#include <QUrl>
#include <QUrlQuery>
#include <QHttpPart>
#include <QSettings>

#include <boost/algorithm/string/trim.hpp>

#include <string>
#include <iostream>
#include <sstream>

#include "netConnection.h"
#include "temperatureWindow.h"
#include "lumWindow.h"
//#include "opacWindow.h"
#include "planningWindow.h"
#include "configWindow.h"
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

    TemperatureWindow*  getTempWin();
    LumWindow*          getLumWin();
    //OpacWindow*          getOpacWin();
    PlanningWindow*     getPlanWin();
    ConfigWindow*       getConfigWin();
    void                roomValFromAPI();
    void                parseRep();
    QString*                getHostName();
    quint16                 getHostPort();


private slots:
    void on_TempEditButton_clicked();

    void on_LumEditButton_clicked();

    void on_OpacEditButton_clicked();

    void on_PlanningEditButton_clicked();

    void on_ConfigEditButton_clicked();

    void updateVals();

    void changeCurRoom(RoomState*);

    void httpFinished();
    void httpFailed(QNetworkReply::NetworkError err);
    void httpReadyRead();

    // make signals and slots to update
    // the state when values change
    void tempValChanged(double newVal);
    void lumValChanged(int newVal);
    void opacValChanged(int newVal);

    void tempDispChanged(int);
    void hourDispChanged(int);

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
    QTimer          *_timer;

    // Other windows
    TemperatureWindow   *_tempWin;
    LumWindow           *_lumWin;
//    OpacWindow          *_opacWin;
    PlanningWindow      *_planWin;
    ConfigWindow        *_configWin;

    // Network
    NetConnection           *_network;

    QNetworkAccessManager   *_netMan;
    QNetworkReply           *_netRep;
    //http://176.31.127.14/
    QString                 _idRoom;
//    QString                 *_hostName = new QString("176.31.127.14");
  //  QString                 *_hostName = new QString("127.0.0.1");
//    quint16                 _hostPort = 1337;
//    QUrl                    _url;
    QHttpMultiPart          *_multiPart;
    QByteArray              _reply;
    QJsonArray              *_jsonArr;
    bool                    _error = false;
    bool                    _toSend = false;
};

#endif // MAINWINDOW_H
