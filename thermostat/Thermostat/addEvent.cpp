#include "addEvent.h"
#include "mainwindow.h"
#include "ui_addEvent.h"

AddEvent::AddEvent(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::AddEvent)
{
    ui->setupUi(this);
    _modeCbBox = ui->modeComboBox;
    _hourSpin = ui->hourStartSpin;
    _minSpin = ui->minStartSpin;
    _durSpin = ui->durationSpin;
    _errorLbl = ui->errorLbl;

    //setup network part
    MainWindow *tmp = (MainWindow*)parent->parentWidget();
    _network = new NetConnection(this, *(tmp->getHostName()),
                                 tmp->getHostPort());
/**
    _netMan = new QNetworkAccessManager(this);
    _netMan->setNetworkAccessible(QNetworkAccessManager::Accessible);
    _netMan->connectToHost(*(_network->getHostName()), _network->getHostPort());
/**/
    _netRep = Q_NULLPTR;
}

AddEvent::~AddEvent()
{
    delete ui;
}

void    AddEvent::show() {
    QDialog::show();
    if (!_network->testConnection())
        return;

     QString tmpStr = QString(QString("http://") + *(_network->getHostName()) + QString(":") + QString::number(_network->getHostPort()) +
                           QString("/api/getModes?api_key=f8c5e1xx5f48e56s4x8"));
     QNetworkRequest netReq = QNetworkRequest(QUrl(tmpStr.toStdString().c_str()));

    QHttpPart textPart = QHttpPart();
    QByteArray tmp;
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"organisation\""));
    tmp.append("Envio");
    textPart.setBody(tmp);

    _multiPart = new QHttpMultiPart(QHttpMultiPart::FormDataType);
    _multiPart->append(textPart);

    _netRep = _network->post(netReq, _multiPart);
//    _netRep = _netMan->post(netReq, _multiPart);
    connect(_netRep, SIGNAL(finished()), this, SLOT(httpFinished()));
    connect(_netRep, SIGNAL(error(QNetworkReply::NetworkError)), this, SLOT(httpFailed(QNetworkReply::NetworkError)));
    connect(_netRep, SIGNAL(readyRead()), this, SLOT(httpReadyRead()));
}

// state = 0, the mode has been added to the planning of the current room.
// state = 1, another mode is set during this time.
void    AddEvent::stateRet(int state) {
    if (state == 1)
        _errorLbl->setText("<font color='red'>Un autre mode est déjà présent sur la plage horaire sélectionnée.</font>");
    else
        _errorLbl->setText("");
}

void AddEvent::on_validateBtn_clicked()
{
    int i = _modeCbBox->currentIndex();
    QString modeName = QString::fromStdString(_mapName.at(i));
    QString modeID = QString::fromStdString(_mapID.at(i));
    int hourStart = _hourSpin->value();
    int minStart = _minSpin->value();
    int duration = _durSpin->value();

    emit checkPlan(modeName, hourStart, minStart, duration, modeID);
}

void AddEvent::on_cancelBtn_clicked()
{
    _errorLbl->setText("");
    this->hide();
}

void AddEvent::on_hourStartSpin_valueChanged(int arg1)
{
    int tot = arg1 * 60 + _minSpin->value();
    _durSpin->setMaximum(24 * 60 - tot);
}

void AddEvent::on_minStartSpin_valueChanged(int arg1)
{
    int tot = arg1 + _hourSpin->value() * 60 ;
    _durSpin->setMaximum(24 * 60 - tot);
}

void AddEvent::httpFinished()
{
    if (_netRep->error()) {
            std::cout  << _netRep->errorString().toStdString() << std::endl;
            _netRep->deleteLater();
            _netRep = Q_NULLPTR;
            return;
        }

    QJsonDocument doc = QJsonDocument();
    doc = doc.fromJson(_netRep->readAll());
    doc.Indented;
    _reply = doc.toJson();

    QVariant redirectionTarget  = _netRep->attribute(QNetworkRequest::RedirectionTargetAttribute);

    if(!redirectionTarget.isNull())
        _network->redirectUrl(redirectionTarget, _multiPart);
/* {
        const QUrl newUrl = _network->getUrl().resolved(redirectionTarget.toUrl());
        _network->setUrl(newUrl);
        QNetworkRequest request(_network->getUrl());
//        _netRep = _netMan->post(request, _multiPart);
        _netRep = _network->post(request, _multiPart);
    }
*/
    std::map<std::string, std::string> m;
    std::istringstream resp(_reply.toStdString().c_str());
    std::string header;
    std::string::size_type index;
    while (std::getline(resp, header) && header != "\r") {
        header.erase(std::remove(header.end() - 1, header.end(), ','), header.end());
        header.erase(std::remove(header.begin(), header.end(), '\"'), header.end());
        index = header.find(':', 0);
        if (index != std::string::npos) {
            std::string tmp = boost::algorithm::trim_copy(header.substr(0, index));
            m.insert(std::make_pair(tmp,
                boost::algorithm::trim_copy(header.substr(index + 1))
            ));

            if (m.find(tmp) != m.end() && m.find("_id") != m.end() && m.find("name") != m.end()) {
                _mapName.insert(std::make_pair(_mapName.size(), m.at("name")));
                _mapID.insert(std::make_pair(_mapID.size(), m.at("_id")));
                _modeCbBox->addItem(QString::fromStdString(m.at("name")));
                m.clear();
            }
        }
    }

}

void AddEvent::httpFailed(QNetworkReply::NetworkError err) {
    qDebug() << "Error: " << err;
}

void AddEvent::httpReadyRead()
{
    qDebug() << "Reply finish: " << _netRep->isFinished();
}
