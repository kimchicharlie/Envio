#ifndef PLANNINGWINDOW_H
#define PLANNINGWINDOW_H

#include <QMainWindow>
#include <QTableView>
#include <QTableWidget>
#include <QPushButton>

#include <QNetworkAccessManager>
#include <QNetworkRequest>
#include <QNetworkReply>
#include <QByteArray>
#include <QJsonArray>
#include <QJsonDocument>
#include <QHttpPart>

#include <boost/algorithm/string/trim.hpp>

#include <string>
#include <iostream>
#include <sstream>


#include "planningmodel.h"
#include "addEvent.h"


namespace Ui {
class PlanningWindow;
}

class PlanningWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit PlanningWindow(QWidget *parent = 0);
    ~PlanningWindow();

    void getRoomsModeFromAPI();
    void setRoomId(QString id);
    void parseRep();
    void constructSimpleMode(std::string id, std::string name, std::string dB, std::string hB, std::string hE);
    void constructMode(std::string id, std::string name, std::string dB, std::string dE, std::string timeBeg, std::string timeEnd);
    void toAPI(Planning*);


signals:
    // mode has not been added
    void noAdd(int);
    void returnToMain();


private slots:
    void on_AccueilBtn_clicked();

    void on_NextButton_clicked();

    void on_AddModeButton_clicked();

    void on_PrevButton_clicked();

    void checkPlan(QString modeName, int hour, int min, int dur, QString);

    void on_tableView_doubleClicked(const QModelIndex &index);

    void httpFinished();
    void httpFailed(QNetworkReply::NetworkError err);
    void httpReadyRead();


public slots:
    void    show();
    void    removeMode(Planning*);

private:
    Ui::PlanningWindow  *ui;
    QTableView          *_planning;
    QPushButton         *_prevBtn;
    QPushButton         *_nextBtn;
    QPushButton         *_addModeBtn;
    QDate               _date;

    PlanningModel       *_planModel;
    AddEvent            *_modal;
    QString             _roomId;


    // Network
    QNetworkAccessManager   *_netMan;
    QNetworkReply           *_netRep;
    //http://176.31.127.14/
    QString                 *_hostName = new QString("176.31.127.14");
//    QString                 *_hostName = new QString("127.0.0.1");
    quint16                 _hostPort = 1337;
    QUrl                    _url;
    QHttpMultiPart          *_multiPart;
    QByteArray              _reply;
    bool                    _error = false;
};

#endif // PLANNINGWINDOW_H
