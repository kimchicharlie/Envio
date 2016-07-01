/****************************************************************************
** Meta object code from reading C++ file 'lumWindow.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.6.1)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../Thermostat/lumWindow.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'lumWindow.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.6.1. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
struct qt_meta_stringdata_LumWindow_t {
    QByteArrayData data[16];
    char stringdata0[238];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_LumWindow_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_LumWindow_t qt_meta_stringdata_LumWindow = {
    {
QT_MOC_LITERAL(0, 0, 9), // "LumWindow"
QT_MOC_LITERAL(1, 10, 9), // "lumChange"
QT_MOC_LITERAL(2, 20, 0), // ""
QT_MOC_LITERAL(3, 21, 3), // "lum"
QT_MOC_LITERAL(4, 25, 12), // "returnToMain"
QT_MOC_LITERAL(5, 38, 8), // "goToTemp"
QT_MOC_LITERAL(6, 47, 8), // "goToOpac"
QT_MOC_LITERAL(7, 56, 10), // "goToConfig"
QT_MOC_LITERAL(8, 67, 8), // "goToPlan"
QT_MOC_LITERAL(9, 76, 35), // "on_LumHorizontalSlider_valueC..."
QT_MOC_LITERAL(10, 112, 5), // "value"
QT_MOC_LITERAL(11, 118, 21), // "on_AccueilBtn_clicked"
QT_MOC_LITERAL(12, 140, 22), // "on_TempEditBtn_clicked"
QT_MOC_LITERAL(13, 163, 22), // "on_OpacEditBtn_clicked"
QT_MOC_LITERAL(14, 186, 26), // "on_PlanningEditBtn_clicked"
QT_MOC_LITERAL(15, 213, 24) // "on_ConfigEditBtn_clicked"

    },
    "LumWindow\0lumChange\0\0lum\0returnToMain\0"
    "goToTemp\0goToOpac\0goToConfig\0goToPlan\0"
    "on_LumHorizontalSlider_valueChanged\0"
    "value\0on_AccueilBtn_clicked\0"
    "on_TempEditBtn_clicked\0on_OpacEditBtn_clicked\0"
    "on_PlanningEditBtn_clicked\0"
    "on_ConfigEditBtn_clicked"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_LumWindow[] = {

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
    QMetaType::Void, QMetaType::Int,    3,
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

void LumWindow::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        LumWindow *_t = static_cast<LumWindow *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->lumChange((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 1: _t->returnToMain(); break;
        case 2: _t->goToTemp(); break;
        case 3: _t->goToOpac(); break;
        case 4: _t->goToConfig(); break;
        case 5: _t->goToPlan(); break;
        case 6: _t->on_LumHorizontalSlider_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 7: _t->on_AccueilBtn_clicked(); break;
        case 8: _t->on_TempEditBtn_clicked(); break;
        case 9: _t->on_OpacEditBtn_clicked(); break;
        case 10: _t->on_PlanningEditBtn_clicked(); break;
        case 11: _t->on_ConfigEditBtn_clicked(); break;
        default: ;
        }
    } else if (_c == QMetaObject::IndexOfMethod) {
        int *result = reinterpret_cast<int *>(_a[0]);
        void **func = reinterpret_cast<void **>(_a[1]);
        {
            typedef void (LumWindow::*_t)(int );
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&LumWindow::lumChange)) {
                *result = 0;
                return;
            }
        }
        {
            typedef void (LumWindow::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&LumWindow::returnToMain)) {
                *result = 1;
                return;
            }
        }
        {
            typedef void (LumWindow::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&LumWindow::goToTemp)) {
                *result = 2;
                return;
            }
        }
        {
            typedef void (LumWindow::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&LumWindow::goToOpac)) {
                *result = 3;
                return;
            }
        }
        {
            typedef void (LumWindow::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&LumWindow::goToConfig)) {
                *result = 4;
                return;
            }
        }
        {
            typedef void (LumWindow::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&LumWindow::goToPlan)) {
                *result = 5;
                return;
            }
        }
    }
}

const QMetaObject LumWindow::staticMetaObject = {
    { &QMainWindow::staticMetaObject, qt_meta_stringdata_LumWindow.data,
      qt_meta_data_LumWindow,  qt_static_metacall, Q_NULLPTR, Q_NULLPTR}
};


const QMetaObject *LumWindow::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *LumWindow::qt_metacast(const char *_clname)
{
    if (!_clname) return Q_NULLPTR;
    if (!strcmp(_clname, qt_meta_stringdata_LumWindow.stringdata0))
        return static_cast<void*>(const_cast< LumWindow*>(this));
    return QMainWindow::qt_metacast(_clname);
}

int LumWindow::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
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
void LumWindow::lumChange(int _t1)
{
    void *_a[] = { Q_NULLPTR, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void LumWindow::returnToMain()
{
    QMetaObject::activate(this, &staticMetaObject, 1, Q_NULLPTR);
}

// SIGNAL 2
void LumWindow::goToTemp()
{
    QMetaObject::activate(this, &staticMetaObject, 2, Q_NULLPTR);
}

// SIGNAL 3
void LumWindow::goToOpac()
{
    QMetaObject::activate(this, &staticMetaObject, 3, Q_NULLPTR);
}

// SIGNAL 4
void LumWindow::goToConfig()
{
    QMetaObject::activate(this, &staticMetaObject, 4, Q_NULLPTR);
}

// SIGNAL 5
void LumWindow::goToPlan()
{
    QMetaObject::activate(this, &staticMetaObject, 5, Q_NULLPTR);
}
QT_END_MOC_NAMESPACE
