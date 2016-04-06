#ifndef ROOMLISTMODEL_H
#define ROOMLISTMODEL_H

#include <QAbstractTableModel>

class RoomListModel : public QAbstractTableModel
{
    Q_OBJECT

public:
    RoomListModel(QObject *parent);
    ~RoomListModel();


    int rowCount(const QModelIndex & /*parent*/) const;
    int columnCount(const QModelIndex & /*parent*/) const;
    QVariant data(const QModelIndex &index, int role) const;

private:
    QStringList    *_roomList;

};

#endif // ROOMLISTMODEL_H
