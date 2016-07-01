/****************************************************************************
** Meta object code from reading C++ file 'planningWindow.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.6.1)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../Thermostat/planningWindow.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'planningWindow.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.6.1. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
struct qt_meta_stringdata_PlanningWindow_t {
    QByteArrayData data[23];
    char stringdata0[287];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_PlanningWindow_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_PlanningWindow_t qt_meta_stringdata_PlanningWindow = {
    {
QT_MOC_LITERAL(0, 0, 14), // "PlanningWindow"
QT_MOC_LITERAL(1, 15, 5), // "noAdd"
QT_MOC_LITERAL(2, 21, 0), // ""
QT_MOC_LITERAL(3, 22, 12), // "returnToMain"
QT_MOC_LITERAL(4, 35, 21), // "on_AccueilBtn_clicked"
QT_MOC_LITERAL(5, 57, 21), // "on_NextButton_clicked"
QT_MOC_LITERAL(6, 79, 24), // "on_AddModeButton_clicked"
QT_MOC_LITERAL(7, 104, 21), // "on_PrevButton_clicked"
QT_MOC_LITERAL(8, 126, 9), // "checkPlan"
QT_MOC_LITERAL(9, 136, 8), // "modeName"
QT_MOC_LITERAL(10, 145, 4), // "hour"
QT_MOC_LITERAL(11, 150, 3), // "min"
QT_MOC_LITERAL(12, 154, 3), // "dur"
QT_MOC_LITERAL(13, 158, 26), // "on_tableView_doubleClicked"
QT_MOC_LITERAL(14, 185, 5), // "index"
QT_MOC_LITERAL(15, 191, 12), // "httpFinished"
QT_MOC_LITERAL(16, 204, 10), // "httpFailed"
QT_MOC_LITERAL(17, 215, 27), // "QNetworkReply::NetworkError"
QT_MOC_LITERAL(18, 243, 3), // "err"
QT_MOC_LITERAL(19, 247, 13), // "httpReadyRead"
QT_MOC_LITERAL(20, 261, 4), // "show"
QT_MOC_LITERAL(21, 266, 10), // "removeMode"
QT_MOC_LITERAL(22, 277, 9) // "Planning*"

    },
    "PlanningWindow\0noAdd\0\0returnToMain\0"
    "on_AccueilBtn_clicked\0on_NextButton_clicked\0"
    "on_AddModeButton_clicked\0on_PrevButton_clicked\0"
    "checkPlan\0modeName\0hour\0min\0dur\0"
    "on_tableView_doubleClicked\0index\0"
    "httpFinished\0httpFailed\0"
    "QNetworkReply::NetworkError\0err\0"
    "httpReadyRead\0show\0removeMode\0Planning*"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_PlanningWindow[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
      13,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       2,       // signalCount

 // signals: name, argc, parameters, tag, flags
       1,    1,   79,    2, 0x06 /* Public */,
       3,    0,   82,    2, 0x06 /* Public */,

 // slots: name, argc, parameters, tag, flags
       4,    0,   83,    2, 0x08 /* Private */,
       5,    0,   84,    2, 0x08 /* Private */,
       6,    0,   85,    2, 0x08 /* Private */,
       7,    0,   86,    2, 0x08 /* Private */,
       8,    5,   87,    2, 0x08 /* Private */,
      13,    1,   98,    2, 0x08 /* Private */,
      15,    0,  101,    2, 0x08 /* Private */,
      16,    1,  102,    2, 0x08 /* Private */,
      19,    0,  105,    2, 0x08 /* Private */,
      20,    0,  106,    2, 0x0a /* Public */,
      21,    1,  107,    2, 0x0a /* Public */,

 // signals: parameters
    QMetaType::Void, QMetaType::Int,    2,
    QMetaType::Void,

 // slots: parameters
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString, QMetaType::Int, QMetaType::Int, QMetaType::Int, QMetaType::QString,    9,   10,   11,   12,    2,
    QMetaType::Void, QMetaType::QModelIndex,   14,
    QMetaType::Void,
    QMetaType::Void, 0x80000000 | 17,   18,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, 0x80000000 | 22,    2,

       0        // eod
};

void PlanningWindow::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        PlanningWindow *_t = static_cast<PlanningWindow *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->noAdd((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 1: _t->returnToMain(); break;
        case 2: _t->on_AccueilBtn_clicked(); break;
        case 3: _t->on_NextButton_clicked(); break;
        case 4: _t->on_AddModeButton_clicked(); break;
        case 5: _t->on_PrevButton_clicked(); break;
        case 6: _t->checkPlan((*reinterpret_cast< QString(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2])),(*reinterpret_cast< int(*)>(_a[3])),(*reinterpret_cast< int(*)>(_a[4])),(*reinterpret_cast< QString(*)>(_a[5]))); break;
        case 7: _t->on_tableView_doubleClicked((*reinterpret_cast< const QModelIndex(*)>(_a[1]))); break;
        case 8: _t->httpFinished(); break;
        case 9: _t->httpFailed((*reinterpret_cast< QNetworkReply::NetworkError(*)>(_a[1]))); break;
        case 10: _t->httpReadyRead(); break;
        case 11: _t->show(); break;
        case 12: _t->removeMode((*reinterpret_cast< Planning*(*)>(_a[1]))); break;
        default: ;
        }
    } else if (_c == QMetaObject::IndexOfMethod) {
        int *result = reinterpret_cast<int *>(_a[0]);
        void **func = reinterpret_cast<void **>(_a[1]);
        {
            typedef void (PlanningWindow::*_t)(int );
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&PlanningWindow::noAdd)) {
                *result = 0;
                return;
            }
        }
        {
            typedef void (PlanningWindow::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&PlanningWindow::returnToMain)) {
                *result = 1;
                return;
            }
        }
    }
}

const QMetaObject PlanningWindow::staticMetaObject = {
    { &QMainWindow::staticMetaObject, qt_meta_stringdata_PlanningWindow.data,
      qt_meta_data_PlanningWindow,  qt_static_metacall, Q_NULLPTR, Q_NULLPTR}
};


const QMetaObject *PlanningWindow::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *PlanningWindow::qt_metacast(const char *_clname)
{
    if (!_clname) return Q_NULLPTR;
    if (!strcmp(_clname, qt_meta_stringdata_PlanningWindow.stringdata0))
        return static_cast<void*>(const_cast< PlanningWindow*>(this));
    return QMainWindow::qt_metacast(_clname);
}

int PlanningWindow::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
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
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 13;
    }
    return _id;
}

// SIGNAL 0
void PlanningWindow::noAdd(int _t1)
{
    void *_a[] = { Q_NULLPTR, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void PlanningWindow::returnToMain()
{
    QMetaObject::activate(this, &staticMetaObject, 1, Q_NULLPTR);
}
QT_END_MOC_NAMESPACE
