#include "roomlistmodel.h"

RoomListModel::RoomListModel(QObject *parent)
    :QAbstractTableModel(parent)
{
    _roomList = new QStringList();
    /*
    _roomList->append("large");
    _roomList->append("small");
    _roomList->append("medium");
    _roomList->append("empty");
    */
}

RoomListModel::~RoomListModel() {

}

int RoomListModel::rowCount(const QModelIndex & parent) const
{
   return _roomList->size();
}

int RoomListModel::columnCount(const QModelIndex & parent) const
{
    return 1;
}

QVariant RoomListModel::data(const QModelIndex &index, int role) const
{
    if (role == Qt::DisplayRole)
        return (QString(_roomList->at(index.row())));
    return QVariant();
}

void RoomListModel::addRoom(const QString room) {
    _roomList->append(room);
    emit layoutChanged();
}

void RoomListModel::removeRoom() {
    _roomList->removeLast();
    emit layoutChanged();
}

void RoomListModel::reset() {
    _roomList->clear();
    emit layoutChanged();
}
