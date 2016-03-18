#-------------------------------------------------
#
# Project created by QtCreator 2016-03-06T15:04:01
#
#-------------------------------------------------

QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = Thermostat
TEMPLATE = app
RC_FILE = thermostat.rc

SOURCES += main.cpp\
    temperatureWindow.cpp \
    lumWindow.cpp \
    opacWindow.cpp \
    mainwindow.cpp \
    roomstate.cpp \
    planningWindow.cpp \
    configWindow.cpp

HEADERS  += temperatureWindow.h \
    lumWindow.h \
    opacWindow.h \
    mainwindow.h \
    roomstate.h \
    planningWindow.h \
    configWindow.h

FORMS    += mainwindow.ui \
    temperatureWindow.ui \
    lumWindow.ui \
    opacWindow.ui \
    planningWindow.ui \
    configWindow.ui
