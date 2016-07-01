/****************************************************************************
** Meta object code from reading C++ file 'configWindow.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.6.1)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../Thermostat/configWindow.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'configWindow.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.6.1. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
struct qt_meta_stringdata_ConfigWindow_t {
    QByteArrayData data[19];
    char stringdata0[268];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_ConfigWindow_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_ConfigWindow_t qt_meta_stringdata_ConfigWindow = {
    {
QT_MOC_LITERAL(0, 0, 12), // "ConfigWindow"
QT_MOC_LITERAL(1, 13, 12), // "returnToMain"
QT_MOC_LITERAL(2, 26, 0), // ""
QT_MOC_LITERAL(3, 27, 14), // "TempDispChange"
QT_MOC_LITERAL(4, 42, 14), // "HourDispChange"
QT_MOC_LITERAL(5, 57, 13), // "changeCurRoom"
QT_MOC_LITERAL(6, 71, 10), // "RoomState*"
QT_MOC_LITERAL(7, 82, 21), // "on_AccueilBtn_clicked"
QT_MOC_LITERAL(8, 104, 25), // "on_TempDispButton_clicked"
QT_MOC_LITERAL(9, 130, 25), // "on_HourDispButton_clicked"
QT_MOC_LITERAL(10, 156, 19), // "on_listView_clicked"
QT_MOC_LITERAL(11, 176, 5), // "index"
QT_MOC_LITERAL(12, 182, 10), // "changeRoom"
QT_MOC_LITERAL(13, 193, 12), // "httpFinished"
QT_MOC_LITERAL(14, 206, 10), // "httpFailed"
QT_MOC_LITERAL(15, 217, 27), // "QNetworkReply::NetworkError"
QT_MOC_LITERAL(16, 245, 3), // "err"
QT_MOC_LITERAL(17, 249, 13), // "httpReadyRead"
QT_MOC_LITERAL(18, 263, 4) // "show"

    },
    "ConfigWindow\0returnToMain\0\0TempDispChange\0"
    "HourDispChange\0changeCurRoom\0RoomState*\0"
    "on_AccueilBtn_clicked\0on_TempDispButton_clicked\0"
    "on_HourDispButton_clicked\0on_listView_clicked\0"
    "index\0changeRoom\0httpFinished\0httpFailed\0"
    "QNetworkReply::NetworkError\0err\0"
    "httpReadyRead\0show"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_ConfigWindow[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
      13,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       4,       // signalCount

 // signals: name, argc, parameters, tag, flags
       1,    0,   79,    2, 0x06 /* Public */,
       3,    1,   80,    2, 0x06 /* Public */,
       4,    1,   83,    2, 0x06 /* Public */,
       5,    1,   86,    2, 0x06 /* Public */,

 // slots: name, argc, parameters, tag, flags
       7,    0,   89,    2, 0x08 /* Private */,
       8,    0,   90,    2, 0x08 /* Private */,
       9,    0,   91,    2, 0x08 /* Private */,
      10,    1,   92,    2, 0x08 /* Private */,
      12,    1,   95,    2, 0x08 /* Private */,
      13,    0,   98,    2, 0x08 /* Private */,
      14,    1,   99,    2, 0x08 /* Private */,
      17,    0,  102,    2, 0x08 /* Private */,
      18,    0,  103,    2, 0x0a /* Public */,

 // signals: parameters
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,    2,
    QMetaType::Void, QMetaType::Int,    2,
    QMetaType::Void, 0x80000000 | 6,    2,

 // slots: parameters
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QModelIndex,   11,
    QMetaType::Void, QMetaType::Int,    2,
    QMetaType::Void,
    QMetaType::Void, 0x80000000 | 15,   16,
    QMetaType::Void,
    QMetaType::Void,

       0        // eod
};

void ConfigWindow::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        ConfigWindow *_t = static_cast<ConfigWindow *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->returnToMain(); break;
        case 1: _t->TempDispChange((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 2: _t->HourDispChange((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 3: _t->changeCurRoom((*reinterpret_cast< RoomState*(*)>(_a[1]))); break;
        case 4: _t->on_AccueilBtn_clicked(); break;
        case 5: _t->on_TempDispButton_clicked(); break;
        case 6: _t->on_HourDispButton_clicked(); break;
        case 7: _t->on_listView_clicked((*reinterpret_cast< const QModelIndex(*)>(_a[1]))); break;
        case 8: _t->changeRoom((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 9: _t->httpFinished(); break;
        case 10: _t->httpFailed((*reinterpret_cast< QNetworkReply::NetworkError(*)>(_a[1]))); break;
        case 11: _t->httpReadyRead(); break;
        case 12: _t->show(); break;
        default: ;
        }
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        switch (_id) {
        default: *reinterpret_cast<int*>(_a[0]) = -1; break;
        case 3:
            switch (*reinterpret_cast<int*>(_a[1])) {
            default: *reinterpret_cast<int*>(_a[0]) = -1; break;
            case 0:
                *reinterpret_cast<int*>(_a[0]) = qRegisterMetaType< RoomState* >(); break;
            }
            break;
        }
    } else if (_c == QMetaObject::IndexOfMethod) {
        int *result = reinterpret_cast<int *>(_a[0]);
        void **func = reinterpret_cast<void **>(_a[1]);
        {
            typedef void (ConfigWindow::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&ConfigWindow::returnToMain)) {
                *result = 0;
                return;
            }
        }
        {
            typedef void (ConfigWindow::*_t)(int );
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&ConfigWindow::TempDispChange)) {
                *result = 1;
                return;
            }
        }
        {
            typedef void (ConfigWindow::*_t)(int );
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&ConfigWindow::HourDispChange)) {
                *result = 2;
                return;
            }
        }
        {
            typedef void (ConfigWindow::*_t)(RoomState * );
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&ConfigWindow::changeCurRoom)) {
                *result = 3;
                return;
            }
        }
    }
}

const QMetaObject ConfigWindow::staticMetaObject = {
    { &QMainWindow::staticMetaObject, qt_meta_stringdata_ConfigWindow.data,
      qt_meta_data_ConfigWindow,  qt_static_metacall, Q_NULLPTR, Q_NULLPTR}
};


const QMetaObject *ConfigWindow::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *ConfigWindow::qt_metacast(const char *_clname)
{
    if (!_clname) return Q_NULLPTR;
    if (!strcmp(_clname, qt_meta_stringdata_ConfigWindow.stringdata0))
        return static_cast<void*>(const_cast< ConfigWindow*>(this));
    return QMainWindow::qt_metacast(_clname);
}

int ConfigWindow::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QMainWindow::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 13)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 13;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 13)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 13;
    }
    return _id;
}

// SIGNAL 0
void ConfigWindow::returnToMain()
{
    QMetaObject::activate(this, &staticMetaObject, 0, Q_NULLPTR);
}

// SIGNAL 1
void ConfigWindow::TempDispChange(int _t1)
{
    void *_a[] = { Q_NULLPTR, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}

// SIGNAL 2
void ConfigWindow::HourDispChange(int _t1)
{
    void *_a[] = { Q_NULLPTR, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 2, _a);
}

// SIGNAL 3
void ConfigWindow::changeCurRoom(RoomState * _t1)
{
    void *_a[] = { Q_NULLPTR, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 3, _a);
}
QT_END_MOC_NAMESPACE
