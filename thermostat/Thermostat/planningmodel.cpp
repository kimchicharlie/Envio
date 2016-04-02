#include "planningmodel.h"

PlanningModel::PlanningModel(QObject *parent, QString header)
    : QAbstractTableModel(parent)
{
    _planList = new QList<Planning*>();
//    this->setHeaderData(0, Qt::Orientation::Horizontal, header);
    _planList->append(new Planning("meeting", QDate::currentDate(), 10, 0, 2));
    _planList->append(new Planning("lunch", QDate::currentDate(), 12, 0, 1));
    _planList->append(new Planning("test", QDate::currentDate(), 8, 30, 1));
    _planList->append(new Planning("snap", QDate::currentDate(), 14, 0, 3));
}

PlanningModel::~PlanningModel() {

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

    if (role == Qt::DisplayRole)
        return (QString(_planList->at(index.row())->getType() + " - " +
                        QString::number(_planList->at(index.row())->getHour()) + ":" +
                        QString::number(_planList->at(index.row())->getMinute()) + " - " +
                        QString::number(_planList->at(index.row())->getDuration()) + "h"));
    return QVariant();
}
