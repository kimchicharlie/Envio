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

    void        refreshPlanning(QDate);
    int         rowCount(const QModelIndex & /*parent*/) const;
    int         columnCount(const QModelIndex & /*parent*/) const;
    QVariant    data(const QModelIndex &index, int role) const;
    QString     customHeader(const QModelIndex &index);
    int         checkPlan(QDate date, int hour, int min, int dur);
    void        addMode(QString modeName, QDate date, int hour, int min, int dur);
    void        removeMode(const QModelIndex &index);

private:
    QList<Planning*>    *_planList;

};


#endif // PLANNINGMODEL_H
