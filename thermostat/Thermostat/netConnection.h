#ifndef NETCONNECTION_H
#define NETCONNECTION_H

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


class NetConnection
{
public:
    NetConnection(QObject *par, QString hostName, quint16 hostPort);

    void                    setNetMan(QNetworkAccessManager*);
    QNetworkAccessManager*  getNetMan();
    void                    setHostName(QString);
    QString*                getHostName();
    void                    setHostPort(quint16);
    quint16                 getHostPort();
    void                    setUrl(QUrl);
    QUrl                    getUrl();
    bool                    testConnection();
    QNetworkReply*          post(QNetworkRequest, QHttpMultiPart*);

private:
    QObject         *parent;

    // Network
    QAbstractSocket *_socket;

    QNetworkAccessManager   *_netMan;
    //http://176.31.127.14/
    QString                 *_hostName = new QString("127.0.0.1");
    quint16                 _hostPort = 1337;
    QUrl                    _url;
};

#endif // NETCONNECTION_H
