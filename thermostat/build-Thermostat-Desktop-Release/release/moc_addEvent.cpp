/****************************************************************************
** Meta object code from reading C++ file 'addEvent.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.6.1)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../Thermostat/addEvent.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'addEvent.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.6.1. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
struct qt_meta_stringdata_AddEvent_t {
    QByteArrayData data[20];
    char stringdata0[240];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_AddEvent_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_AddEvent_t qt_meta_stringdata_AddEvent = {
    {
QT_MOC_LITERAL(0, 0, 8), // "AddEvent"
QT_MOC_LITERAL(1, 9, 9), // "checkPlan"
QT_MOC_LITERAL(2, 19, 0), // ""
QT_MOC_LITERAL(3, 20, 8), // "modeName"
QT_MOC_LITERAL(4, 29, 4), // "hour"
QT_MOC_LITERAL(5, 34, 3), // "min"
QT_MOC_LITERAL(6, 38, 3), // "dur"
QT_MOC_LITERAL(7, 42, 8), // "stateRet"
QT_MOC_LITERAL(8, 51, 5), // "state"
QT_MOC_LITERAL(9, 57, 22), // "on_validateBtn_clicked"
QT_MOC_LITERAL(10, 80, 20), // "on_cancelBtn_clicked"
QT_MOC_LITERAL(11, 101, 29), // "on_hourStartSpin_valueChanged"
QT_MOC_LITERAL(12, 131, 4), // "arg1"
QT_MOC_LITERAL(13, 136, 28), // "on_minStartSpin_valueChanged"
QT_MOC_LITERAL(14, 165, 12), // "httpFinished"
QT_MOC_LITERAL(15, 178, 10), // "httpFailed"
QT_MOC_LITERAL(16, 189, 27), // "QNetworkReply::NetworkError"
QT_MOC_LITERAL(17, 217, 3), // "err"
QT_MOC_LITERAL(18, 221, 13), // "httpReadyRead"
QT_MOC_LITERAL(19, 235, 4) // "show"

    },
    "AddEvent\0checkPlan\0\0modeName\0hour\0min\0"
    "dur\0stateRet\0state\0on_validateBtn_clicked\0"
    "on_cancelBtn_clicked\0on_hourStartSpin_valueChanged\0"
    "arg1\0on_minStartSpin_valueChanged\0"
    "httpFinished\0httpFailed\0"
    "QNetworkReply::NetworkError\0err\0"
    "httpReadyRead\0show"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_AddEvent[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
      10,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       1,       // signalCount

 // signals: name, argc, parameters, tag, flags
       1,    5,   64,    2, 0x06 /* Public */,

 // slots: name, argc, parameters, tag, flags
       7,    1,   75,    2, 0x08 /* Private */,
       9,    0,   78,    2, 0x08 /* Private */,
      10,    0,   79,    2, 0x08 /* Private */,
      11,    1,   80,    2, 0x08 /* Private */,
      13,    1,   83,    2, 0x08 /* Private */,
      14,    0,   86,    2, 0x08 /* Private */,
      15,    1,   87,    2, 0x08 /* Private */,
      18,    0,   90,    2, 0x08 /* Private */,
      19,    0,   91,    2, 0x0a /* Public */,

 // signals: parameters
    QMetaType::Void, QMetaType::QString, QMetaType::Int, QMetaType::Int, QMetaType::Int, QMetaType::QString,    3,    4,    5,    6,    2,

 // slots: parameters
    QMetaType::Void, QMetaType::Int,    8,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   12,
    QMetaType::Void, QMetaType::Int,   12,
    QMetaType::Void,
    QMetaType::Void, 0x80000000 | 16,   17,
    QMetaType::Void,
    QMetaType::Void,

       0        // eod
};

void AddEvent::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        AddEvent *_t = static_cast<AddEvent *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->checkPlan((*reinterpret_cast< QString(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2])),(*reinterpret_cast< int(*)>(_a[3])),(*reinterpret_cast< int(*)>(_a[4])),(*reinterpret_cast< QString(*)>(_a[5]))); break;
        case 1: _t->stateRet((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 2: _t->on_validateBtn_clicked(); break;
        case 3: _t->on_cancelBtn_clicked(); break;
        case 4: _t->on_hourStartSpin_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 5: _t->on_minStartSpin_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 6: _t->httpFinished(); break;
        case 7: _t->httpFailed((*reinterpret_cast< QNetworkReply::NetworkError(*)>(_a[1]))); break;
        case 8: _t->httpReadyRead(); break;
        case 9: _t->show(); break;
        default: ;
        }
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        switch (_id) {
        default: *reinterpret_cast<int*>(_a[0]) = -1; break;
        case 7:
            switch (*reinterpret_cast<int*>(_a[1])) {
            default: *reinterpret_cast<int*>(_a[0]) = -1; break;
            case 0:
                *reinterpret_cast<int*>(_a[0]) = qRegisterMetaType< QNetworkReply::NetworkError >(); break;
            }
            break;
        }
    } else if (_c == QMetaObject::IndexOfMethod) {
        int *result = reinterpret_cast<int *>(_a[0]);
        void **func = reinterpret_cast<void **>(_a[1]);
        {
            typedef void (AddEvent::*_t)(QString , int , int , int , QString );
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&AddEvent::checkPlan)) {
                *result = 0;
                return;
            }
        }
    }
}

const QMetaObject AddEvent::staticMetaObject = {
    { &QDialog::staticMetaObject, qt_meta_stringdata_AddEvent.data,
      qt_meta_data_AddEvent,  qt_static_metacall, Q_NULLPTR, Q_NULLPTR}
};


const QMetaObject *AddEvent::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *AddEvent::qt_metacast(const char *_clname)
{
    if (!_clname) return Q_NULLPTR;
    if (!strcmp(_clname, qt_meta_stringdata_AddEvent.stringdata0))
        return static_cast<void*>(const_cast< AddEvent*>(this));
    return QDialog::qt_metacast(_clname);
}

int AddEvent::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QDialog::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 10)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 10;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 10)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 10;
    }
    return _id;
}

// SIGNAL 0
void AddEvent::checkPlan(QString _t1, int _t2, int _t3, int _t4, QString _t5)
{
    void *_a[] = { Q_NULLPTR, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)), const_cast<void*>(reinterpret_cast<const void*>(&_t3)), const_cast<void*>(reinterpret_cast<const void*>(&_t4)), const_cast<void*>(reinterpret_cast<const void*>(&_t5)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}
QT_END_MOC_NAMESPACE
