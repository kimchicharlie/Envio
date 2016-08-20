#include "netConnection.h"

NetConnection::NetConnection(QObject *par, QString hostName, quint16 hostPort)
{
    parent = par;
    _hostName = new QString(hostName);
    _hostPort = hostPort;
    _socket = new QAbstractSocket(QAbstractSocket::TcpSocket, parent);

    //setup network part
    _netMan = new QNetworkAccessManager(parent);
    _netMan->setNetworkAccessible(QNetworkAccessManager::Accessible);
    _netMan->connectToHost(*_hostName, _hostPort);
    QString tmp = QString(QString("http://") + *_hostName + QString(":") + QString::number(_hostPort) +
                          QString("/api/getRoom?api_key=f8c5e1xx5f48e56s4x8"));

    _url = QUrl(tmp.toStdString().c_str());
}

void                    NetConnection::setNetMan(QNetworkAccessManager *netMan) {
    _netMan = netMan;
}

QNetworkAccessManager*  NetConnection::getNetMan() {
    return _netMan;
}

void                    NetConnection::setHostName(QString name) {
    _hostName = new QString(name);
}

QString*                 NetConnection::getHostName() {
    return _hostName;
}

void                    NetConnection::setHostPort(quint16 port) {
    _hostPort = port;
}

quint16                 NetConnection::getHostPort() {
    return _hostPort;
}

void                    NetConnection::setUrl(QUrl url) {
    _url = url;
}

QUrl                    NetConnection::getUrl() {
    return _url;
}

bool    NetConnection::testConnection() {
    QAbstractSocket *socket = new QAbstractSocket(QAbstractSocket::TcpSocket, parent);
    socket->connectToHost(*_hostName, _hostPort);
     if (!socket->waitForConnected(1000))
         return false;
     delete socket;
     return true;
}

QNetworkReply*           NetConnection::post(QNetworkRequest req, QHttpMultiPart *multiPart) {
    return (_netMan->post(req, multiPart));
}
