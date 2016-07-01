/****************************************************************************
** Meta object code from reading C++ file 'mainwindow.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.6.1)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../Thermostat/mainwindow.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'mainwindow.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.6.1. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
struct qt_meta_stringdata_MainWindow_t {
    QByteArrayData data[22];
    char stringdata0[347];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_MainWindow_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_MainWindow_t qt_meta_stringdata_MainWindow = {
    {
QT_MOC_LITERAL(0, 0, 10), // "MainWindow"
QT_MOC_LITERAL(1, 11, 25), // "on_TempEditButton_clicked"
QT_MOC_LITERAL(2, 37, 0), // ""
QT_MOC_LITERAL(3, 38, 24), // "on_LumEditButton_clicked"
QT_MOC_LITERAL(4, 63, 25), // "on_OpacEditButton_clicked"
QT_MOC_LITERAL(5, 89, 29), // "on_PlanningEditButton_clicked"
QT_MOC_LITERAL(6, 119, 27), // "on_ConfigEditButton_clicked"
QT_MOC_LITERAL(7, 147, 10), // "updateVals"
QT_MOC_LITERAL(8, 158, 13), // "changeCurRoom"
QT_MOC_LITERAL(9, 172, 10), // "RoomState*"
QT_MOC_LITERAL(10, 183, 12), // "httpFinished"
QT_MOC_LITERAL(11, 196, 10), // "httpFailed"
QT_MOC_LITERAL(12, 207, 27), // "QNetworkReply::NetworkError"
QT_MOC_LITERAL(13, 235, 3), // "err"
QT_MOC_LITERAL(14, 239, 13), // "httpReadyRead"
QT_MOC_LITERAL(15, 253, 14), // "tempValChanged"
QT_MOC_LITERAL(16, 268, 6), // "newVal"
QT_MOC_LITERAL(17, 275, 13), // "lumValChanged"
QT_MOC_LITERAL(18, 289, 14), // "opacValChanged"
QT_MOC_LITERAL(19, 304, 15), // "tempDispChanged"
QT_MOC_LITERAL(20, 320, 15), // "hourDispChanged"
QT_MOC_LITERAL(21, 336, 10) // "backToMain"

    },
    "MainWindow\0on_TempEditButton_clicked\0"
    "\0on_LumEditButton_clicked\0"
    "on_OpacEditButton_clicked\0"
    "on_PlanningEditButton_clicked\0"
    "on_ConfigEditButton_clicked\0updateVals\0"
    "changeCurRoom\0RoomState*\0httpFinished\0"
    "httpFailed\0QNetworkReply::NetworkError\0"
    "err\0httpReadyRead\0tempValChanged\0"
    "newVal\0lumValChanged\0opacValChanged\0"
    "tempDispChanged\0hourDispChanged\0"
    "backToMain"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_MainWindow[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
      16,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // slots: name, argc, parameters, tag, flags
       1,    0,   94,    2, 0x08 /* Private */,
       3,    0,   95,    2, 0x08 /* Private */,
       4,    0,   96,    2, 0x08 /* Private */,
       5,    0,   97,    2, 0x08 /* Private */,
       6,    0,   98,    2, 0x08 /* Private */,
       7,    0,   99,    2, 0x08 /* Private */,
       8,    1,  100,    2, 0x08 /* Private */,
      10,    0,  103,    2, 0x08 /* Private */,
      11,    1,  104,    2, 0x08 /* Private */,
      14,    0,  107,    2, 0x08 /* Private */,
      15,    1,  108,    2, 0x08 /* Private */,
      17,    1,  111,    2, 0x08 /* Private */,
      18,    1,  114,    2, 0x08 /* Private */,
      19,    1,  117,    2, 0x08 /* Private */,
      20,    1,  120,    2, 0x08 /* Private */,
      21,    0,  123,    2, 0x08 /* Private */,

 // slots: parameters
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, 0x80000000 | 9,    2,
    QMetaType::Void,
    QMetaType::Void, 0x80000000 | 12,   13,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Double,   16,
    QMetaType::Void, QMetaType::Int,   16,
    QMetaType::Void, QMetaType::Int,   16,
    QMetaType::Void, QMetaType::Int,    2,
    QMetaType::Void, QMetaType::Int,    2,
    QMetaType::Void,

       0        // eod
};

void MainWindow::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        MainWindow *_t = static_cast<MainWindow *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->on_TempEditButton_clicked(); break;
        case 1: _t->on_LumEditButton_clicked(); break;
        case 2: _t->on_OpacEditButton_clicked(); break;
        case 3: _t->on_PlanningEditButton_clicked(); break;
        case 4: _t->on_ConfigEditButton_clicked(); break;
        case 5: _t->updateVals(); break;
        case 6: _t->changeCurRoom((*reinterpret_cast< RoomState*(*)>(_a[1]))); break;
        case 7: _t->httpFinished(); break;
        case 8: _t->httpFailed((*reinterpret_cast< QNetworkReply::NetworkError(*)>(_a[1]))); break;
        case 9: _t->httpReadyRead(); break;
        case 10: _t->tempValChanged((*reinterpret_cast< double(*)>(_a[1]))); break;
        case 11: _t->lumValChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 12: _t->opacValChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 13: _t->tempDispChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 14: _t->hourDispChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 15: _t->backToMain(); break;
        default: ;
        }
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        switch (_id) {
        default: *reinterpret_cast<int*>(_a[0]) = -1; break;
        case 6:
            switch (*reinterpret_cast<int*>(_a[1])) {
            default: *reinterpret_cast<int*>(_a[0]) = -1; break;
            case 0:
                *reinterpret_cast<int*>(_a[0]) = qRegisterMetaType< RoomState* >(); break;
            }
            break;
        }
    }
}

const QMetaObject MainWindow::staticMetaObject = {
    { &QMainWindow::staticMetaObject, qt_meta_stringdata_MainWindow.data,
      qt_meta_data_MainWindow,  qt_static_metacall, Q_NULLPTR, Q_NULLPTR}
};


const QMetaObject *MainWindow::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *MainWindow::qt_metacast(const char *_clname)
{
    if (!_clname) return Q_NULLPTR;
    if (!strcmp(_clname, qt_meta_stringdata_MainWindow.stringdata0))
        return static_cast<void*>(const_cast< MainWindow*>(this));
    return QMainWindow::qt_metacast(_clname);
}

int MainWindow::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QMainWindow::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 16)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 16;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 16)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 16;
    }
    return _id;
}
QT_END_MOC_NAMESPACE
