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
    QJsonArray              *_jsonArr;
    bool                    _error = false;
};

#endif // ADDEVENT_H
