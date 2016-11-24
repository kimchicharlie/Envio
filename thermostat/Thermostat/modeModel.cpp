#include "modeModel.h"

ModeModel::ModeModel()
{

}

ModeModel::ModeModel(QObject *parent)
    :QAbstractTableModel(parent)
{
    _modeList = new QStringList();
}

ModeModel::~ModeModel() {

}

int ModeModel::rowCount(const QModelIndex & parent) const
{
    Q_UNUSED(parent);
   return _modeList->size();
}

int ModeModel::columnCount(const QModelIndex & parent) const
{
    Q_UNUSED(parent);
    return 1;
}

QVariant ModeModel::data(const QModelIndex &index, int role) const
{
    if (role == Qt::DisplayRole)
        return (QString(_modeList->at(index.row())));
    return QVariant();
}

void ModeModel::addMode(const QString mode) {
    _modeList->append(mode);
    emit layoutChanged();
}

void ModeModel::removeMode() {
    _modeList->removeLast();
    emit layoutChanged();
}

void ModeModel::reset() {
    _modeList->clear();
    emit layoutChanged();
}
