#include "planningmodel.h"
#include <iostream>

#include <iostream>

PlanningModel::PlanningModel(QObject *parent, QString header)
    : QAbstractTableModel(parent)
{
    _planList = new QList<Planning*>();
//    this->setHeaderData(0, Qt::Orientation::Horizontal, header);
/*
    _planList->append(new Planning("meeting", QDate::currentDate(), 10, 0, 120));
    _planList->append(new Planning("lunch", QDate::currentDate(), 12, 0, 60));
    _planList->append(new Planning("test1", QDate::currentDate(), 8, 30, 30));
    _planList->append(new Planning("test2", QDate::currentDate(), 14, 0, 180));
*/
}

PlanningModel::~PlanningModel() {

}

void PlanningModel::refreshPlanning(QDate date)
{
    //get the planning for the current room with the date
}


int PlanningModel::rowCount(const QModelIndex & parent) const
{
   return _planList->size();
}

int PlanningModel::columnCount(const QModelIndex & parent) const
{
    return 1;
}

QVariant PlanningModel::data(const QModelIndex &index, int role) const
{
    if (role == Qt::DisplayRole) {
        QString tmp = QString(_planList->at(index.row())->getType() + " - " +
                                  QString::number(_planList->at(index.row())->getHour()) + ":");
        //complete the string with an additionnal 0 if minutes < 10
        if (_planList->at(index.row())->getMinute() < 10)
            tmp = QString(tmp + "0" + QString::number(_planList->at(index.row())->getMinute()));
        else
            tmp = QString(tmp + QString::number(_planList->at(index.row())->getMinute()));
        tmp = QString(tmp + " - Durée: " +
                      QString::number(_planList->at(index.row())->getDuration()) + "minutes");
            return (tmp);
    }
    return QVariant();
}

QString PlanningModel::customHeader(const QModelIndex &index) {
    QString tmp = QString(QString::number(_planList->at(index.row())->getHour()) +
                          ":" + QString::number(_planList->at(index.row())->getMinute()));
    return (tmp);
}

int PlanningModel::checkPlan(QDate date, int hour, int min, int dur) {

    int start = hour * 60 + min;
    int end = start + dur;
    for (int i = 0; i != _planList->size(); i++) {

        int otherStart = _planList->at(i)->getHour() * 60 +
                _planList->at(i)->getMinute();
        int otherEnd = otherStart + _planList->at(i)->getDuration();
        // other mode during the mode that wish to be added (start in)
        if (otherStart > start && otherStart < end)
            return (-1);
        // other mode during the mode that wish to be added (end in)
        else if (otherEnd > start && otherEnd < end)
            return (-1);
        // other mode encapsule the mode that wish to be added
        else if (otherStart < start && otherEnd > end)
            return (-1);
    }
    return (0);
}

void    PlanningModel::addMode(QString modeName, QDate date, int hour, int min, int dur) {
    _planList->append(new Planning(modeName, date, hour, min, dur));
    emit layoutChanged();
    // send the new added mode to the API
}

#include <QDebug>
void    PlanningModel::addMode(Planning *plan, int send) {
    qDebug() << "in it.";
    _planList->append(plan);
    emit layoutChanged();
    // send the new added mode to the API if send = 0
}

void    PlanningModel::removeMode(const QModelIndex &index, int send) {
    _planList->removeAt(index.row());
    emit layoutChanged();
    // send the removed mode to the API if send = 0
}

void    PlanningModel::clearAll() {
    _planList->clear();
}
