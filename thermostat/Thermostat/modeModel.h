#ifndef MODEMODEL_H
#define MODEMODEL_H

#include <QAbstractTableModel>

class ModeModel : public QAbstractTableModel
{
    Q_OBJECT

public:
    ModeModel();

public:
    ModeModel(QObject *parent);
    ~ModeModel();

    int rowCount(const QModelIndex & /*parent*/) const;
    int columnCount(const QModelIndex & /*parent*/) const;
    QVariant data(const QModelIndex &index, int role) const;
    void addMode(const QString mode);
    void removeMode();
    void reset();

private:
    QStringList    *_modeList;
};

#endif // MODEMODEL_H
