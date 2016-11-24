#ifndef ADDEVENT_H
#define ADDEVENT_H

#include <QDialog>
#include <QSpinBox>
#include <QComboBox>
#include <QLabel>

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

#include "netConnection.h"
#include "modeModel.h"

namespace Ui {
class AddEvent;
}

class AddEvent : public QDialog
{
    Q_OBJECT

public:
    explicit AddEvent(QWidget *parent = 0);
    ~AddEvent();


private slots:
    void    stateRet(int state);
    void    on_validateBtn_clicked();
    void    on_cancelBtn_clicked();

    void on_hourStartSpin_valueChanged(int arg1);

    void on_minStartSpin_valueChanged(int arg1);
    void httpFinished();
    void httpFailed(QNetworkReply::NetworkError err);
    void httpReadyRead();


public slots:
    void show();

signals:
    void    checkPlan(QString modeName, int hour, int min, int dur, QString);

private:
    Ui::AddEvent *ui;
    QComboBox    *_modeCbBox;
    QSpinBox     *_hourSpin;
    QSpinBox     *_minSpin;
    QSpinBox     *_durSpin;
    QLabel       *_errorLbl;
    std::map<int, std::string>         _mapName;
    std::map<int, std::string>         _mapID;
    ModeModel                         *_modeList;

    // Network
    NetConnection           *_network;

    QNetworkAccessManager   *_netMan;
    QNetworkReply           *_netRep;
    QHttpMultiPart          *_multiPart;
    QByteArray              _reply;
    QJsonArray              *_jsonArr;
    bool                    _error = false;
    QString                 _organisation;
};

#endif // ADDEVENT_H
