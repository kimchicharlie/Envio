#ifndef PLANNINGMODEL_H
#define PLANNINGMODEL_H

#include <QAbstractTableModel>
#include "planning.h"

class PlanningModel : public QAbstractTableModel
{
    Q_OBJECT

public:
    PlanningModel(QObject *parent, QString header);
    ~PlanningModel();

    int rowCount(const QModelIndex & /*parent*/) const;
    int columnCount(const QModelIndex & /*parent*/) const;
    QVariant data(const QModelIndex &index, int role) const;

private:
    QList<Planning*>    *_planList;

};


#endif // PLANNINGMODEL_H
