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
        mainwindow.cpp \
    roomstate.cpp \
    temperatureWindow.cpp \
    lumWindow.cpp

HEADERS  += mainwindow.h \
    roomstate.h \
    temperatureWindow.h \
    lumWindow.h

FORMS    += mainwindow.ui \
    temperatureWindow.ui \
    lumWindow.ui
