/********************************************************************************
** Form generated from reading UI file 'addEvent.ui'
**
** Created by: Qt User Interface Compiler version 5.6.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_ADDEVENT_H
#define UI_ADDEVENT_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QDialog>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpinBox>

QT_BEGIN_NAMESPACE

class Ui_AddEvent
{
public:
    QLabel *TitleLbl;
    QLabel *errorLbl;
    QSpinBox *hourStartSpin;
    QSpinBox *minStartSpin;
    QSpinBox *durationSpin;
    QLabel *startHourLbl;
    QLabel *durationLbl;
    QPushButton *validateBtn;
    QPushButton *cancelBtn;
    QLabel *label;
    QComboBox *modeComboBox;
    QLabel *label_2;

    void setupUi(QDialog *AddEvent)
    {
        if (AddEvent->objectName().isEmpty())
            AddEvent->setObjectName(QStringLiteral("AddEvent"));
        AddEvent->setWindowModality(Qt::WindowModal);
        AddEvent->resize(320, 240);
        AddEvent->setStyleSheet(QStringLiteral(""));
        TitleLbl = new QLabel(AddEvent);
        TitleLbl->setObjectName(QStringLiteral("TitleLbl"));
        TitleLbl->setGeometry(QRect(80, 10, 151, 31));
        QFont font;
        font.setFamily(QStringLiteral("Segoe UI,sans-serif"));
        TitleLbl->setFont(font);
        TitleLbl->setStyleSheet(QLatin1String("font-family: \"Segoe UI\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"width: 100%;\n"
"border: 0;\n"
"padding: 10px;\n"
"color: #AAA;\n"
"font-size: 12px;"));
        errorLbl = new QLabel(AddEvent);
        errorLbl->setObjectName(QStringLiteral("errorLbl"));
        errorLbl->setGeometry(QRect(10, 40, 301, 31));
        errorLbl->setFont(font);
        errorLbl->setStyleSheet(QLatin1String("font-family: \"Segoe UI\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"width: 100%;\n"
"border: 0;\n"
"padding: 10px;\n"
"font-size: 12px;"));
        hourStartSpin = new QSpinBox(AddEvent);
        hourStartSpin->setObjectName(QStringLiteral("hourStartSpin"));
        hourStartSpin->setGeometry(QRect(140, 100, 51, 31));
        QFont font1;
        font1.setFamily(QStringLiteral("Segoe UI,sans-serif"));
        font1.setBold(true);
        font1.setWeight(75);
        hourStartSpin->setFont(font1);
        hourStartSpin->setStyleSheet(QLatin1String("QSpinBox   {  \n"
"	font-family:\"Segoe UI\", sans-serif;\n"
"     padding-right: 15px; \n"
"     border-width: 3;\n"
"	width: 20px;\n"
"   background:#777;\n"
"   color:#CCC;\n"
"   border-right: 1px solid #444;\n"
"   border-bottom: 1px solid #444;\n"
"   border-top: 2px solid #444;\n"
"   border-left: 2px solid #444;\n"
"   \n"
"   padding:3px;\n"
"   border-radius: 8px;\n"
"}\n"
"\n"
"QSpinBox::up-button {\n"
"    subcontrol-origin: margin; \n"
"    subcontrol-position: top right; \n"
"    background-color: #444;\n"
"    border-top-right-radius: 8px; \n"
"    border-width: 1px; \n"
"    width: 16px; \n"
"    border-top: 2px solid #444;\n"
"    border-left: 2px solid #CCC;\n"
"    border-bottom: 1px solid #CCC; \n"
" } \n"
" \n"
"QSpinBox::up-arrow{ \n"
"    border-left: 3px solid none;\n"
"    border-right: 3px solid none; \n"
"    border-bottom: 3px solid #808080; \n"
"    width: 2px; \n"
"    height: 1px; \n"
"}\n"
"\n"
"QSpinBox::up-button:pressed {\n"
"    subcontrol-origin: margin; \n"
"    subcontrol"
                        "-position: top right; \n"
"    background-color: qlineargradient(x1: 0, y1: 0, x2: 0, y2: 1,\n"
"                                 stop: 0  rgb(217, 231, 247), stop: 0.1 rgb(194, 216, 242),\n"
"                                 stop: 0.5 rgb(194, 216, 242), stop: 1.0 rgb(174, 204, 242));\n"
"    border-top-right-radius: 8px; \n"
"    border-width: 1px; \n"
"    width: 15px; \n"
"    border-left: 1px solid #BEBEBE; \n"
"    border-top: 3px solid #444;\n"
" } \n"
" \n"
"QSpinBox::up-arrow:pressed { \n"
"    background-color: transparent;\n"
"    border-left: 3px solid none;\n"
"    border-right: 3px solid none; \n"
"    border-bottom: 3px solid #808080; \n"
"    width: 1px; \n"
"    height: 1px; \n"
"}\n"
"\n"
" QSpinBox::down-button {\n"
"    subcontrol-origin: margin; \n"
"    subcontrol-position: bottom right; \n"
"    background-color:  #444;\n"
"    border-bottom-right-radius: 8px; \n"
"    border-width: 1px; \n"
"    width: 16px;\n"
"    border-bottom: 2px solid #444;\n"
"    border-left: 2px solid #CCC;\n"
""
                        "    border-top: 1px solid none; \n"
" } \n"
" \n"
"QSpinBox::down-arrow  { \n"
"    background-color: transparent;\n"
"    border-left: 3px solid none;\n"
"    border-right: 3px solid none; \n"
"    border-top: 3px solid #808080; \n"
"    width: 2px; \n"
"    height: 1px; \n"
"}\n"
"\n"
"QSpinBox::down-button:pressed  {\n"
"    subcontrol-origin: margin; \n"
"    subcontrol-position: bottom right; \n"
"    background-color: qlineargradient(x1: 0, y1: 0, x2: 0, y2: 1,\n"
"                                 stop: 0  #444, stop: 0.1 #444,\n"
"                                 stop: 0.5 #CCC, stop: 1.0 #CCC);\n"
"    border-bottom-right-radius: 8px; \n"
"    border-width: 1px; \n"
"    width: 14px; \n"
"    border-left: 1px solid #BEBEBE; \n"
"    border-top: 1px solid #BEBEBE; \n"
"    border-right: 1px solid #BEBEBE; \n"
"    border-bottom: 0px;\n"
" } \n"
" \n"
"QSpinBox::down-arrow:pressed   { \n"
"    background-color: transparent;\n"
"    border-left: 3px solid none;\n"
"    border-right: 3px solid none; \n"
" "
                        "   border-top: 3px solid #808080; \n"
"    width: 1px; \n"
"    height: 1px; \n"
"}"));
        hourStartSpin->setMaximum(23);
        minStartSpin = new QSpinBox(AddEvent);
        minStartSpin->setObjectName(QStringLiteral("minStartSpin"));
        minStartSpin->setGeometry(QRect(230, 100, 51, 31));
        minStartSpin->setFont(font1);
        minStartSpin->setStyleSheet(QLatin1String("QSpinBox   {  \n"
"	font-family:\"Segoe UI\", sans-serif;\n"
"     padding-right: 15px; \n"
"     border-width: 3;\n"
"	width: 20px;\n"
"   background:#777;\n"
"   color:#CCC;\n"
"   border-right: 1px solid #444;\n"
"   border-bottom: 1px solid #444;\n"
"   border-top: 2px solid #444;\n"
"   border-left: 2px solid #444;\n"
"   \n"
"   padding:3px;\n"
"   border-radius: 8px;\n"
"}\n"
"\n"
"QSpinBox::up-button {\n"
"    subcontrol-origin: margin; \n"
"    subcontrol-position: top right; \n"
"    background-color: #444;\n"
"    border-top-right-radius: 8px; \n"
"    border-width: 1px; \n"
"    width: 16px; \n"
"    border-top: 2px solid #444;\n"
"    border-left: 2px solid #CCC;\n"
"    border-bottom: 1px solid #CCC; \n"
" } \n"
" \n"
"QSpinBox::up-arrow{ \n"
"    border-left: 3px solid none;\n"
"    border-right: 3px solid none; \n"
"    border-bottom: 3px solid #808080; \n"
"    width: 2px; \n"
"    height: 1px; \n"
"}\n"
"\n"
"QSpinBox::up-button:pressed {\n"
"    subcontrol-origin: margin; \n"
"    subcontrol"
                        "-position: top right; \n"
"    background-color: qlineargradient(x1: 0, y1: 0, x2: 0, y2: 1,\n"
"                                 stop: 0  rgb(217, 231, 247), stop: 0.1 rgb(194, 216, 242),\n"
"                                 stop: 0.5 rgb(194, 216, 242), stop: 1.0 rgb(174, 204, 242));\n"
"    border-top-right-radius: 8px; \n"
"    border-width: 1px; \n"
"    width: 15px; \n"
"    border-left: 1px solid #BEBEBE; \n"
"    border-top: 3px solid #444;\n"
" } \n"
" \n"
"QSpinBox::up-arrow:pressed { \n"
"    background-color: transparent;\n"
"    border-left: 3px solid none;\n"
"    border-right: 3px solid none; \n"
"    border-bottom: 3px solid #808080; \n"
"    width: 1px; \n"
"    height: 1px; \n"
"}\n"
"\n"
" QSpinBox::down-button {\n"
"    subcontrol-origin: margin; \n"
"    subcontrol-position: bottom right; \n"
"    background-color:  #444;\n"
"    border-bottom-right-radius: 8px; \n"
"    border-width: 1px; \n"
"    width: 16px;\n"
"    border-bottom: 2px solid #444;\n"
"    border-left: 2px solid #CCC;\n"
""
                        "    border-top: 1px solid none; \n"
" } \n"
" \n"
"QSpinBox::down-arrow  { \n"
"    background-color: transparent;\n"
"    border-left: 3px solid none;\n"
"    border-right: 3px solid none; \n"
"    border-top: 3px solid #808080; \n"
"    width: 2px; \n"
"    height: 1px; \n"
"}\n"
"\n"
"QSpinBox::down-button:pressed  {\n"
"    subcontrol-origin: margin; \n"
"    subcontrol-position: bottom right; \n"
"    background-color: qlineargradient(x1: 0, y1: 0, x2: 0, y2: 1,\n"
"                                 stop: 0  #444, stop: 0.1 #444,\n"
"                                 stop: 0.5 #CCC, stop: 1.0 #CCC);\n"
"    border-bottom-right-radius: 8px; \n"
"    border-width: 1px; \n"
"    width: 14px; \n"
"    border-left: 1px solid #BEBEBE; \n"
"    border-top: 1px solid #BEBEBE; \n"
"    border-right: 1px solid #BEBEBE; \n"
"    border-bottom: 0px;\n"
" } \n"
" \n"
"QSpinBox::down-arrow:pressed   { \n"
"    background-color: transparent;\n"
"    border-left: 3px solid none;\n"
"    border-right: 3px solid none; \n"
" "
                        "   border-top: 3px solid #808080; \n"
"    width: 1px; \n"
"    height: 1px; \n"
"}"));
        minStartSpin->setMaximum(55);
        minStartSpin->setSingleStep(5);
        durationSpin = new QSpinBox(AddEvent);
        durationSpin->setObjectName(QStringLiteral("durationSpin"));
        durationSpin->setGeometry(QRect(140, 150, 51, 31));
        durationSpin->setFont(font1);
        durationSpin->setStyleSheet(QLatin1String("QSpinBox   {  \n"
"	font-family:\"Segoe UI\", sans-serif;\n"
"     padding-right: 15px; \n"
"     border-width: 3;\n"
"	width: 20px;\n"
"   background:#777;\n"
"   color:#CCC;\n"
"   border-right: 1px solid #444;\n"
"   border-bottom: 1px solid #444;\n"
"   border-top: 2px solid #444;\n"
"   border-left: 2px solid #444;\n"
"   \n"
"   padding:3px;\n"
"   border-radius: 8px;\n"
"}\n"
"\n"
"QSpinBox::up-button {\n"
"    subcontrol-origin: margin; \n"
"    subcontrol-position: top right; \n"
"    background-color: #444;\n"
"    border-top-right-radius: 8px; \n"
"    border-width: 1px; \n"
"    width: 16px; \n"
"    border-top: 2px solid #444;\n"
"    border-left: 2px solid #CCC;\n"
"    border-bottom: 1px solid #CCC; \n"
" } \n"
" \n"
"QSpinBox::up-arrow{ \n"
"    border-left: 3px solid none;\n"
"    border-right: 3px solid none; \n"
"    border-bottom: 3px solid #808080; \n"
"    width: 2px; \n"
"    height: 1px; \n"
"}\n"
"\n"
"QSpinBox::up-button:pressed {\n"
"    subcontrol-origin: margin; \n"
"    subcontrol"
                        "-position: top right; \n"
"    background-color: qlineargradient(x1: 0, y1: 0, x2: 0, y2: 1,\n"
"                                 stop: 0  rgb(217, 231, 247), stop: 0.1 rgb(194, 216, 242),\n"
"                                 stop: 0.5 rgb(194, 216, 242), stop: 1.0 rgb(174, 204, 242));\n"
"    border-top-right-radius: 8px; \n"
"    border-width: 1px; \n"
"    width: 15px; \n"
"    border-left: 1px solid #BEBEBE; \n"
"    border-top: 3px solid #444;\n"
" } \n"
" \n"
"QSpinBox::up-arrow:pressed { \n"
"    background-color: transparent;\n"
"    border-left: 3px solid none;\n"
"    border-right: 3px solid none; \n"
"    border-bottom: 3px solid #808080; \n"
"    width: 1px; \n"
"    height: 1px; \n"
"}\n"
"\n"
" QSpinBox::down-button {\n"
"    subcontrol-origin: margin; \n"
"    subcontrol-position: bottom right; \n"
"    background-color:  #444;\n"
"    border-bottom-right-radius: 8px; \n"
"    border-width: 1px; \n"
"    width: 16px;\n"
"    border-bottom: 2px solid #444;\n"
"    border-left: 2px solid #CCC;\n"
""
                        "    border-top: 1px solid none; \n"
" } \n"
" \n"
"QSpinBox::down-arrow  { \n"
"    background-color: transparent;\n"
"    border-left: 3px solid none;\n"
"    border-right: 3px solid none; \n"
"    border-top: 3px solid #808080; \n"
"    width: 2px; \n"
"    height: 1px; \n"
"}\n"
"\n"
"QSpinBox::down-button:pressed  {\n"
"    subcontrol-origin: margin; \n"
"    subcontrol-position: bottom right; \n"
"    background-color: qlineargradient(x1: 0, y1: 0, x2: 0, y2: 1,\n"
"                                 stop: 0  #444, stop: 0.1 #444,\n"
"                                 stop: 0.5 #CCC, stop: 1.0 #CCC);\n"
"    border-bottom-right-radius: 8px; \n"
"    border-width: 1px; \n"
"    width: 14px; \n"
"    border-left: 1px solid #BEBEBE; \n"
"    border-top: 1px solid #BEBEBE; \n"
"    border-right: 1px solid #BEBEBE; \n"
"    border-bottom: 0px;\n"
" } \n"
" \n"
"QSpinBox::down-arrow:pressed   { \n"
"    background-color: transparent;\n"
"    border-left: 3px solid none;\n"
"    border-right: 3px solid none; \n"
" "
                        "   border-top: 3px solid #808080; \n"
"    width: 1px; \n"
"    height: 1px; \n"
"}\n"
"\n"
"\n"
"/*QSpinBox   {  \n"
"	font-family:\"Segoe UI\", sans-serif;\n"
"     padding-right: 15px; \n"
"     border-width: 3;\n"
"	width: 20px;\n"
"   background:#777;\n"
"   border-right: 1px solid #444;\n"
"   border-bottom: 1px solid #444;\n"
"   border-top: 2px solid #444;\n"
"   border-left: 2px solid #444;\n"
"   \n"
"   padding:3px;\n"
"   border-radius: 8px;\n"
"}\n"
"\n"
"QSpinBox::up-button {\n"
"    subcontrol-origin: margin; \n"
"    subcontrol-position: top right; \n"
"    background-color: qlineargradient(x1: 0, y1: 0, x2: 0, y2: 1,\n"
"                                 stop: 0  #444, stop: 0.1 #444,\n"
"                                 stop: 0.5 #CCC, stop: 1.0 #CCC);\n"
"    border-top-right-radius: 8px; \n"
"    border-width: 1px; \n"
"    width: 16px; \n"
"    border-top: 2px solid #444;\n"
" } \n"
" \n"
"QSpinBox::up-arrow{ \n"
"    background-color: transparent;\n"
"    border-left: 3px solid none;\n"
" "
                        "   border-right: 3px solid none; \n"
"    border-bottom: 3px solid #808080; \n"
"    width: 1px; \n"
"    height: 1px; \n"
"}\n"
"\n"
"QSpinBox::up-button:pressed {\n"
"    subcontrol-origin: margin; \n"
"    subcontrol-position: top right; \n"
"    background-color: qlineargradient(x1: 0, y1: 0, x2: 0, y2: 1,\n"
"                                 stop: 0  rgb(217, 231, 247), stop: 0.1 rgb(194, 216, 242),\n"
"                                 stop: 0.5 rgb(194, 216, 242), stop: 1.0 rgb(174, 204, 242));\n"
"    border-top-right-radius: 8px; \n"
"    border-width: 1px; \n"
"    width: 15px; \n"
"    border-left: 1px solid #BEBEBE; \n"
"    border-top: 3px solid #444;\n"
" } \n"
" \n"
"QSpinBox::up-arrow:pressed { \n"
"    background-color: transparent;\n"
"    border-left: 3px solid none;\n"
"    border-right: 3px solid none; \n"
"    border-bottom: 3px solid #808080; \n"
"    width: 1px; \n"
"    height: 1px; \n"
"}\n"
"\n"
" QSpinBox::down-button {\n"
"    subcontrol-origin: margin; \n"
"    subcontrol-position:"
                        " bottom right; \n"
"    background-color: qlineargradient(x1: 0, y1: 0, x2: 0, y2: 1,\n"
"                                 stop: 0  #CCC, stop: 0.7 #CCC,\n"
"                                 stop: 1.5 #444, stop: 1.0 #444);\n"
"    border-bottom-right-radius: 8px; \n"
"    border-width: 1px; \n"
"    width: 16px; \n"
"    border-bottom: 0px;\n"
" } \n"
" \n"
"QSpinBox::down-arrow  { \n"
"    background-color: transparent;\n"
"    border-left: 3px solid none;\n"
"    border-right: 3px solid none; \n"
"    border-top: 3px solid #808080; \n"
"    width: 1px; \n"
"    height: 1px; \n"
"}\n"
"\n"
"QSpinBox::down-button:pressed  {\n"
"    subcontrol-origin: margin; \n"
"    subcontrol-position: bottom right; \n"
"    background-color: qlineargradient(x1: 0, y1: 0, x2: 0, y2: 1,\n"
"                                 stop: 0  #444, stop: 0.1 #444,\n"
"                                 stop: 0.5 #CCC, stop: 1.0 #CCC);\n"
"    border-bottom-right-radius: 8px; \n"
"    border-width: 1px; \n"
"    width: 14px; \n"
"    bord"
                        "er-left: 1px solid #BEBEBE; \n"
"    border-top: 1px solid #BEBEBE; \n"
"    border-right: 1px solid #BEBEBE; \n"
"    border-bottom: 0px;\n"
" } \n"
" \n"
"QSpinBox::down-arrow:pressed   { \n"
"    background-color: transparent;\n"
"    border-left: 3px solid none;\n"
"    border-right: 3px solid none; \n"
"    border-top: 3px solid #808080; \n"
"    width: 1px; \n"
"    height: 1px; \n"
"}"));
        durationSpin->setMinimum(30);
        durationSpin->setMaximum(750);
        durationSpin->setSingleStep(30);
        startHourLbl = new QLabel(AddEvent);
        startHourLbl->setObjectName(QStringLiteral("startHourLbl"));
        startHourLbl->setGeometry(QRect(10, 100, 121, 31));
        startHourLbl->setFont(font);
        startHourLbl->setStyleSheet(QLatin1String("font-family: \"Segoe UI\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"width: 100%;\n"
"border: 0;\n"
"padding: 7px;\n"
"color: #AAA;\n"
"font-size: 12px;"));
        durationLbl = new QLabel(AddEvent);
        durationLbl->setObjectName(QStringLiteral("durationLbl"));
        durationLbl->setGeometry(QRect(10, 150, 91, 31));
        durationLbl->setFont(font);
        durationLbl->setStyleSheet(QLatin1String("font-family: \"Segoe UI\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"width: 100%;\n"
"border: 0;\n"
"padding: 10px;\n"
"color: #AAA;\n"
"font-size: 12px;"));
        validateBtn = new QPushButton(AddEvent);
        validateBtn->setObjectName(QStringLiteral("validateBtn"));
        validateBtn->setGeometry(QRect(140, 194, 80, 31));
        validateBtn->setFont(font);
        validateBtn->setStyleSheet(QLatin1String("QPushButton\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #5cb85c;\n"
"	border: 0;\n"
"	padding: 7px;\n"
"	color: #FFFFFF;\n"
"	font-size: 14px;\n"
"	border-radius: 7px;\n"
"}\n"
"\n"
"QPushButton:hover\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #449d44;\n"
"	border: 0;\n"
"	padding: 7px;\n"
"	color: #FFFFFF;\n"
"	font-size: 14px;\n"
"	border-radius: 7px;\n"
"}"));
        cancelBtn = new QPushButton(AddEvent);
        cancelBtn->setObjectName(QStringLiteral("cancelBtn"));
        cancelBtn->setGeometry(QRect(230, 194, 80, 31));
        cancelBtn->setFont(font);
        cancelBtn->setStyleSheet(QLatin1String("QPushButton\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #5cb85c;\n"
"	border: 0;\n"
"	padding: 7px;\n"
"	color: #FFFFFF;\n"
"	font-size: 14px;\n"
"	border-radius: 7px;\n"
"}\n"
"\n"
"QPushButton:hover\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #449d44;\n"
"	border: 0;\n"
"	padding: 7px;\n"
"	color: #FFFFFF;\n"
"	font-size: 14px;\n"
"	border-radius: 7px;\n"
"}"));
        label = new QLabel(AddEvent);
        label->setObjectName(QStringLiteral("label"));
        label->setGeometry(QRect(200, 100, 20, 41));
        label->setFont(font);
        label->setStyleSheet(QLatin1String("font-family: \"Segoe UI\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"width: 100%;\n"
"border: 0;\n"
"padding: 7px;\n"
"color: #AAA;\n"
"font-size: 12px;"));
        modeComboBox = new QComboBox(AddEvent);
        modeComboBox->setObjectName(QStringLiteral("modeComboBox"));
        modeComboBox->setGeometry(QRect(10, 70, 121, 32));
        QFont font2;
        font2.setFamily(QStringLiteral("Segoe UI,sans-serif"));
        font2.setBold(false);
        font2.setWeight(50);
        modeComboBox->setFont(font2);
        modeComboBox->setStyleSheet(QLatin1String("QPushButton:hover, QToolButton:hover,QComboBox:hover, QCheckBox:hover, QRadioButton:hover {\n"
"background: transparent;\n"
"}\n"
"\n"
"QComboBox:!editable {\n"
"	font-family:\"Segoe UI\", sans-serif;\n"
"	color: #CCC;\n"
"   min-width: 80px;  \n"
"   min-height: 19px; \n"
"    background:#777;\n"
"   border-left: 1px solid #444;\n"
"   border-top: 1px solid #444;\n"
"   border-bottom: 2px solid #777;\n"
"   border-right: 2px solid #777;\n"
"   background:qlineargradient(x1: 0, y1: 0, x2: 0, y2: 1,\n"
"                                 stop: 0  #444, stop: 0.2 #777,\n"
"                                 stop: 0.5 #777, stop: 1.0 #777);\n"
"   padding:3px;\n"
"   border-radius: 8px;\n"
"}\n"
"\n"
"QComboBox:!editable:on {\n"
"   min-width: 80px;\n"
"   min-height: 19px; \n"
"    background:#777;\n"
"   border-left: 1px solid #444;\n"
"   border-top: 1px solid #444;\n"
"   border-bottom: 2px solid #777;\n"
"   border-left: 2px solid #777;\n"
"   background:qlineargradient(x1: 0, y1: 0, x2: 0, y2: 1,\n"
"          "
                        "                       stop: 0  #444, stop: 0.2 #777,\n"
"                                 stop: 0.5 #777, stop: 1.0 #777);\n"
"   padding:3px;\n"
"   border-radius: 8px;\n"
"}\n"
"\n"
"QComboBox:editable {\n"
"   min-width: 80px;  \n"
"   min-height: 18px; \n"
"   border-left: 1px solid #444;\n"
"   border-top: 1px solid #444;\n"
"   border-bottom: 2px solid #CCC;\n"
"   border-left: 2px solid #CCC;\n"
"   background:white;\n"
"   padding:3px;\n"
"   border-radius: 8px;\n"
"}\n"
"\n"
"QComboBox::drop-down {\n"
"    subcontrol-origin: padding;\n"
"    subcontrol-position: top right;\n"
"    width: 20px;\n"
"    border-left-width: 1px;\n"
"    border-left-color: darkgray;\n"
"    border-left-style: solid; /* just a single line */\n"
"}\n"
"\n"
"QComboBox::down-arrow {\n"
"    background-color: transparent;\n"
"    border-left: 5px solid none;\n"
"    border-right: 5px solid none; \n"
"    border-top: 5px solid #CCC; \n"
"    width: 1px; \n"
"    height: 1px; \n"
"    \n"
"}\n"
"\n"
"QComboBox QAbstractItemView "
                        "{\n"
"   border: 1px solid gray;\n"
"}\n"
"\n"
"QLabel {  \n"
"  background-color:transparent;\n"
"}\n"
"\n"
"QLineEdit, QTextEdit {  \n"
"   background:white;\n"
"   min-width: 80px;  \n"
"   min-height: 16px; \n"
"   border-right: 1px solid rgb(255, 255, 255);\n"
"   border-bottom: 1px solid rgb(255, 255, 255);\n"
"   border-top: 2px solid rgb(136, 163, 205);\n"
"   border-left: 2px solid rgb(136, 163, 205);\n"
"   \n"
"   padding:3px;\n"
"   border-radius: 8px;\n"
"}\n"
"\n"
"QComboBox QAbstractItemView {\n"
"   border: 1px solid gray;\n"
"}"));
        label_2 = new QLabel(AddEvent);
        label_2->setObjectName(QStringLiteral("label_2"));
        label_2->setGeometry(QRect(210, 150, 55, 31));
        label_2->setFont(font);
        label_2->setStyleSheet(QLatin1String("font-family: \"Segoe UI\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"width: 100%;\n"
"border: 0;\n"
"padding: 7px;\n"
"color: #AAA;\n"
"font-size: 12px;"));

        retranslateUi(AddEvent);

        QMetaObject::connectSlotsByName(AddEvent);
    } // setupUi

    void retranslateUi(QDialog *AddEvent)
    {
        AddEvent->setWindowTitle(QApplication::translate("AddEvent", "Dialog", 0));
        TitleLbl->setText(QApplication::translate("AddEvent", "Ajouter Ev\303\250nement", 0));
        errorLbl->setText(QString());
        startHourLbl->setText(QApplication::translate("AddEvent", "Heure de d\303\251but :", 0));
        durationLbl->setText(QApplication::translate("AddEvent", "Dur\303\251e :", 0));
        validateBtn->setText(QApplication::translate("AddEvent", "Ok", 0));
        cancelBtn->setText(QApplication::translate("AddEvent", "Annuler", 0));
        label->setText(QApplication::translate("AddEvent", ":", 0));
        label_2->setText(QApplication::translate("AddEvent", "min", 0));
    } // retranslateUi

};

namespace Ui {
    class AddEvent: public Ui_AddEvent {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_ADDEVENT_H
