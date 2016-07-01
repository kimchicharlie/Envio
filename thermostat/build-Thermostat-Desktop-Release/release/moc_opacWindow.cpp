/****************************************************************************
** Meta object code from reading C++ file 'opacWindow.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.6.1)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../Thermostat/opacWindow.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'opacWindow.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.6.1. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
struct qt_meta_stringdata_OpacWindow_t {
    QByteArrayData data[12];
    char stringdata0[168];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_OpacWindow_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_OpacWindow_t qt_meta_stringdata_OpacWindow = {
    {
QT_MOC_LITERAL(0, 0, 10), // "OpacWindow"
QT_MOC_LITERAL(1, 11, 10), // "opacChange"
QT_MOC_LITERAL(2, 22, 0), // ""
QT_MOC_LITERAL(3, 23, 4), // "opac"
QT_MOC_LITERAL(4, 28, 12), // "returnToMain"
QT_MOC_LITERAL(5, 41, 8), // "goToTemp"
QT_MOC_LITERAL(6, 50, 7), // "goToLum"
QT_MOC_LITERAL(7, 58, 36), // "on_OpacHorizontalSlider_value..."
QT_MOC_LITERAL(8, 95, 5), // "value"
QT_MOC_LITERAL(9, 101, 21), // "on_AccueilBtn_clicked"
QT_MOC_LITERAL(10, 123, 22), // "on_TempEditBtn_clicked"
QT_MOC_LITERAL(11, 146, 21) // "on_LumEditBtn_clicked"

    },
    "OpacWindow\0opacChange\0\0opac\0returnToMain\0"
    "goToTemp\0goToLum\0on_OpacHorizontalSlider_valueChanged\0"
    "value\0on_AccueilBtn_clicked\0"
    "on_TempEditBtn_clicked\0on_LumEditBtn_clicked"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_OpacWindow[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
       8,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       4,       // signalCount

 // signals: name, argc, parameters, tag, flags
       1,    1,   54,    2, 0x06 /* Public */,
       4,    0,   57,    2, 0x06 /* Public */,
       5,    0,   58,    2, 0x06 /* Public */,
       6,    0,   59,    2, 0x06 /* Public */,

 // slots: name, argc, parameters, tag, flags
       7,    1,   60,    2, 0x08 /* Private */,
       9,    0,   63,    2, 0x08 /* Private */,
      10,    0,   64,    2, 0x08 /* Private */,
      11,    0,   65,    2, 0x08 /* Private */,

 // signals: parameters
    QMetaType::Void, QMetaType::Int,    3,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,

 // slots: parameters
    QMetaType::Void, QMetaType::Int,    8,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,

       0        // eod
};

void OpacWindow::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        OpacWindow *_t = static_cast<OpacWindow *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->opacChange((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 1: _t->returnToMain(); break;
        case 2: _t->goToTemp(); break;
        case 3: _t->goToLum(); break;
        case 4: _t->on_OpacHorizontalSlider_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 5: _t->on_AccueilBtn_clicked(); break;
        case 6: _t->on_TempEditBtn_clicked(); break;
        case 7: _t->on_LumEditBtn_clicked(); break;
        default: ;
        }
    } else if (_c == QMetaObject::IndexOfMethod) {
        int *result = reinterpret_cast<int *>(_a[0]);
        void **func = reinterpret_cast<void **>(_a[1]);
        {
            typedef void (OpacWindow::*_t)(int );
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&OpacWindow::opacChange)) {
                *result = 0;
                return;
            }
        }
        {
            typedef void (OpacWindow::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&OpacWindow::returnToMain)) {
                *result = 1;
                return;
            }
        }
        {
            typedef void (OpacWindow::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&OpacWindow::goToTemp)) {
                *result = 2;
                return;
            }
        }
        {
            typedef void (OpacWindow::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&OpacWindow::goToLum)) {
                *result = 3;
                return;
            }
        }
    }
}

const QMetaObject OpacWindow::staticMetaObject = {
    { &QMainWindow::staticMetaObject, qt_meta_stringdata_OpacWindow.data,
      qt_meta_data_OpacWindow,  qt_static_metacall, Q_NULLPTR, Q_NULLPTR}
};


const QMetaObject *OpacWindow::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *OpacWindow::qt_metacast(const char *_clname)
{
    if (!_clname) return Q_NULLPTR;
    if (!strcmp(_clname, qt_meta_stringdata_OpacWindow.stringdata0))
        return static_cast<void*>(const_cast< OpacWindow*>(this));
    return QMainWindow::qt_metacast(_clname);
}

int OpacWindow::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QMainWindow::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 8)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 8;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 8)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 8;
    }
    return _id;
}

// SIGNAL 0
void OpacWindow::opacChange(int _t1)
{
    void *_a[] = { Q_NULLPTR, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void OpacWindow::returnToMain()
{
    QMetaObject::activate(this, &staticMetaObject, 1, Q_NULLPTR);
}

// SIGNAL 2
void OpacWindow::goToTemp()
{
    QMetaObject::activate(this, &staticMetaObject, 2, Q_NULLPTR);
}

// SIGNAL 3
void OpacWindow::goToLum()
{
    QMetaObject::activate(this, &staticMetaObject, 3, Q_NULLPTR);
}
QT_END_MOC_NAMESPACE
