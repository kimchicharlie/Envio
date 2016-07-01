/****************************************************************************
** Meta object code from reading C++ file 'temperatureWindow.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.6.1)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../Thermostat/temperatureWindow.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'temperatureWindow.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.6.1. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
struct qt_meta_stringdata_TemperatureWindow_t {
    QByteArrayData data[16];
    char stringdata0[247];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_TemperatureWindow_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_TemperatureWindow_t qt_meta_stringdata_TemperatureWindow = {
    {
QT_MOC_LITERAL(0, 0, 17), // "TemperatureWindow"
QT_MOC_LITERAL(1, 18, 10), // "tempChange"
QT_MOC_LITERAL(2, 29, 0), // ""
QT_MOC_LITERAL(3, 30, 4), // "temp"
QT_MOC_LITERAL(4, 35, 12), // "returnToMain"
QT_MOC_LITERAL(5, 48, 7), // "goToLum"
QT_MOC_LITERAL(6, 56, 8), // "goToOpac"
QT_MOC_LITERAL(7, 65, 10), // "goToConfig"
QT_MOC_LITERAL(8, 76, 8), // "goToPlan"
QT_MOC_LITERAL(9, 85, 36), // "on_TempHorizontalSlider_value..."
QT_MOC_LITERAL(10, 122, 5), // "value"
QT_MOC_LITERAL(11, 128, 21), // "on_AccueilBtn_clicked"
QT_MOC_LITERAL(12, 150, 21), // "on_LumEditBtn_clicked"
QT_MOC_LITERAL(13, 172, 22), // "on_OpacEditBtn_clicked"
QT_MOC_LITERAL(14, 195, 26), // "on_PlanningEditBtn_clicked"
QT_MOC_LITERAL(15, 222, 24) // "on_ConfigEditBtn_clicked"

    },
    "TemperatureWindow\0tempChange\0\0temp\0"
    "returnToMain\0goToLum\0goToOpac\0goToConfig\0"
    "goToPlan\0on_TempHorizontalSlider_valueChanged\0"
    "value\0on_AccueilBtn_clicked\0"
    "on_LumEditBtn_clicked\0on_OpacEditBtn_clicked\0"
    "on_PlanningEditBtn_clicked\0"
    "on_ConfigEditBtn_clicked"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_TemperatureWindow[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
      12,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       6,       // signalCount

 // signals: name, argc, parameters, tag, flags
       1,    1,   74,    2, 0x06 /* Public */,
       4,    0,   77,    2, 0x06 /* Public */,
       5,    0,   78,    2, 0x06 /* Public */,
       6,    0,   79,    2, 0x06 /* Public */,
       7,    0,   80,    2, 0x06 /* Public */,
       8,    0,   81,    2, 0x06 /* Public */,

 // slots: name, argc, parameters, tag, flags
       9,    1,   82,    2, 0x08 /* Private */,
      11,    0,   85,    2, 0x08 /* Private */,
      12,    0,   86,    2, 0x08 /* Private */,
      13,    0,   87,    2, 0x08 /* Private */,
      14,    0,   88,    2, 0x08 /* Private */,
      15,    0,   89,    2, 0x08 /* Private */,

 // signals: parameters
    QMetaType::Void, QMetaType::Double,    3,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,

 // slots: parameters
    QMetaType::Void, QMetaType::Int,   10,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,

       0        // eod
};

void TemperatureWindow::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        TemperatureWindow *_t = static_cast<TemperatureWindow *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->tempChange((*reinterpret_cast< double(*)>(_a[1]))); break;
        case 1: _t->returnToMain(); break;
        case 2: _t->goToLum(); break;
        case 3: _t->goToOpac(); break;
        case 4: _t->goToConfig(); break;
        case 5: _t->goToPlan(); break;
        case 6: _t->on_TempHorizontalSlider_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 7: _t->on_AccueilBtn_clicked(); break;
        case 8: _t->on_LumEditBtn_clicked(); break;
        case 9: _t->on_OpacEditBtn_clicked(); break;
        case 10: _t->on_PlanningEditBtn_clicked(); break;
        case 11: _t->on_ConfigEditBtn_clicked(); break;
        default: ;
        }
    } else if (_c == QMetaObject::IndexOfMethod) {
        int *result = reinterpret_cast<int *>(_a[0]);
        void **func = reinterpret_cast<void **>(_a[1]);
        {
            typedef void (TemperatureWindow::*_t)(double );
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&TemperatureWindow::tempChange)) {
                *result = 0;
                return;
            }
        }
        {
            typedef void (TemperatureWindow::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&TemperatureWindow::returnToMain)) {
                *result = 1;
                return;
            }
        }
        {
            typedef void (TemperatureWindow::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&TemperatureWindow::goToLum)) {
                *result = 2;
                return;
            }
        }
        {
            typedef void (TemperatureWindow::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&TemperatureWindow::goToOpac)) {
                *result = 3;
                return;
            }
        }
        {
            typedef void (TemperatureWindow::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&TemperatureWindow::goToConfig)) {
                *result = 4;
                return;
            }
        }
        {
            typedef void (TemperatureWindow::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&TemperatureWindow::goToPlan)) {
                *result = 5;
                return;
            }
        }
    }
}

const QMetaObject TemperatureWindow::staticMetaObject = {
    { &QMainWindow::staticMetaObject, qt_meta_stringdata_TemperatureWindow.data,
      qt_meta_data_TemperatureWindow,  qt_static_metacall, Q_NULLPTR, Q_NULLPTR}
};


const QMetaObject *TemperatureWindow::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *TemperatureWindow::qt_metacast(const char *_clname)
{
    if (!_clname) return Q_NULLPTR;
    if (!strcmp(_clname, qt_meta_stringdata_TemperatureWindow.stringdata0))
        return static_cast<void*>(const_cast< TemperatureWindow*>(this));
    return QMainWindow::qt_metacast(_clname);
}

int TemperatureWindow::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QMainWindow::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 12)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 12;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 12)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 12;
    }
    return _id;
}

// SIGNAL 0
void TemperatureWindow::tempChange(double _t1)
{
    void *_a[] = { Q_NULLPTR, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void TemperatureWindow::returnToMain()
{
    QMetaObject::activate(this, &staticMetaObject, 1, Q_NULLPTR);
}

// SIGNAL 2
void TemperatureWindow::goToLum()
{
    QMetaObject::activate(this, &staticMetaObject, 2, Q_NULLPTR);
}

// SIGNAL 3
void TemperatureWindow::goToOpac()
{
    QMetaObject::activate(this, &staticMetaObject, 3, Q_NULLPTR);
}

// SIGNAL 4
void TemperatureWindow::goToConfig()
{
    QMetaObject::activate(this, &staticMetaObject, 4, Q_NULLPTR);
}

// SIGNAL 5
void TemperatureWindow::goToPlan()
{
    QMetaObject::activate(this, &staticMetaObject, 5, Q_NULLPTR);
}
QT_END_MOC_NAMESPACE
