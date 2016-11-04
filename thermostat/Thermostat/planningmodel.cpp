#include "planningmodel.h"
#include <iostream>

#include <iostream>

PlanningModel::PlanningModel(QObject *parent, QString header)
    : QAbstractTableModel(parent)
{
    _planList = new QList<Planning*>();
}

PlanningModel::~PlanningModel() {

}

int PlanningModel::rowCount(const QModelIndex & parent) const
{
    Q_UNUSED(parent);
   return _planList->size();
}

int PlanningModel::columnCount(const QModelIndex & parent) const
{
    Q_UNUSED(parent);
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

    Q_UNUSED(date);
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
}

void    PlanningModel::addMode(Planning *plan) {
    _planList->append(plan);
    emit layoutChanged();
}

void    PlanningModel::removeMode(const QModelIndex &index, int send) {
    Q_UNUSED(send);
    emit remove(_planList->at(index.row()));
    _planList->removeAt(index.row());
    emit layoutChanged();
}

void    PlanningModel::clearAll() {
    _planList->clear();
}
