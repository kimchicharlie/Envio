#include "planningmodel.h"
#include <iostream>

PlanningModel::PlanningModel(QObject *parent, QString header)
    : QAbstractTableModel(parent)
{
    _planList = new QList<Planning*>();
//    this->setHeaderData(0, Qt::Orientation::Horizontal, header);
    _planList->append(new Planning("meeting", QDate::currentDate(), 10, 0, 2));
    _planList->append(new Planning("lunch", QDate::currentDate(), 12, 0, 1));
    _planList->append(new Planning("test1", QDate::currentDate(), 8, 30, 1));
    _planList->append(new Planning("test2", QDate::currentDate(), 14, 0, 3));
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
        tmp = QString(tmp + + " - Duration: " +
                      QString::number(_planList->at(index.row())->getDuration()) + "h");
            return (tmp);
    }
    return QVariant();
}

QString PlanningModel::customHeader(const QModelIndex &index) {
    QString tmp = QString(QString::number(_planList->at(index.row())->getHour()) +
                          ":" + QString::number(_planList->at(index.row())->getMinute()));
    return (tmp);
}
