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

    void setupUi(QDialog *AddEvent)
    {
        if (AddEvent->objectName().isEmpty())
            AddEvent->setObjectName(QStringLiteral("AddEvent"));
        AddEvent->setWindowModality(Qt::WindowModal);
        AddEvent->resize(320, 240);
        TitleLbl = new QLabel(AddEvent);
        TitleLbl->setObjectName(QStringLiteral("TitleLbl"));
        TitleLbl->setGeometry(QRect(90, 10, 141, 31));
        TitleLbl->setStyleSheet(QLatin1String("font-family: \"Segoe UI\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"width: 100%;\n"
"border: 0;\n"
"padding: 10px;\n"
"color: #4d4d4d;\n"
"font-size: 12px;"));
        errorLbl = new QLabel(AddEvent);
        errorLbl->setObjectName(QStringLiteral("errorLbl"));
        errorLbl->setGeometry(QRect(10, 40, 301, 31));
        errorLbl->setStyleSheet(QLatin1String("font-family: \"Segoe UI\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"width: 100%;\n"
"border: 0;\n"
"padding: 10px;\n"
"color: #4d4d4d;\n"
"font-size: 12px;"));
        hourStartSpin = new QSpinBox(AddEvent);
        hourStartSpin->setObjectName(QStringLiteral("hourStartSpin"));
        hourStartSpin->setGeometry(QRect(140, 100, 51, 31));
        hourStartSpin->setStyleSheet(QStringLiteral("font-family:\"Segoe UI\", sans-serif;"));
        hourStartSpin->setMaximum(23);
        minStartSpin = new QSpinBox(AddEvent);
        minStartSpin->setObjectName(QStringLiteral("minStartSpin"));
        minStartSpin->setGeometry(QRect(230, 100, 51, 31));
        minStartSpin->setStyleSheet(QStringLiteral("font-family:\"Segoe UI\", sans-serif;"));
        minStartSpin->setMaximum(55);
        minStartSpin->setSingleStep(5);
        durationSpin = new QSpinBox(AddEvent);
        durationSpin->setObjectName(QStringLiteral("durationSpin"));
        durationSpin->setGeometry(QRect(140, 150, 51, 31));
        durationSpin->setStyleSheet(QStringLiteral("font-family:\"Segoe UI\", sans-serif;"));
        durationSpin->setMinimum(30);
        durationSpin->setMaximum(750);
        durationSpin->setSingleStep(30);
        startHourLbl = new QLabel(AddEvent);
        startHourLbl->setObjectName(QStringLiteral("startHourLbl"));
        startHourLbl->setGeometry(QRect(10, 100, 121, 31));
        startHourLbl->setStyleSheet(QLatin1String("font-family: \"Segoe UI\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"width: 100%;\n"
"border: 0;\n"
"padding: 10px;\n"
"color: #4d4d4d;\n"
"font-size: 12px;"));
        durationLbl = new QLabel(AddEvent);
        durationLbl->setObjectName(QStringLiteral("durationLbl"));
        durationLbl->setGeometry(QRect(10, 150, 91, 31));
        durationLbl->setStyleSheet(QLatin1String("font-family: \"Segoe UI\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"width: 100%;\n"
"border: 0;\n"
"padding: 10px;\n"
"color: #4d4d4d;\n"
"font-size: 12px;"));
        validateBtn = new QPushButton(AddEvent);
        validateBtn->setObjectName(QStringLiteral("validateBtn"));
        validateBtn->setGeometry(QRect(140, 194, 80, 31));
        validateBtn->setStyleSheet(QLatin1String("QPushButton\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #5cb85c;\n"
"	border: 0;\n"
"	padding: 10px;\n"
"	color: #FFFFFF;\n"
"	font-size: 12px;\n"
"}\n"
"\n"
"QPushButton:hover\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #449d44;\n"
"	border: 0;\n"
"	padding: 10px;\n"
"	color: #FFFFFF;\n"
"	font-size: 12px;\n"
"}"));
        cancelBtn = new QPushButton(AddEvent);
        cancelBtn->setObjectName(QStringLiteral("cancelBtn"));
        cancelBtn->setGeometry(QRect(230, 194, 80, 31));
        cancelBtn->setStyleSheet(QLatin1String("QPushButton\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #5cb85c;\n"
"	border: 0;\n"
"	padding: 10px;\n"
"	color: #FFFFFF;\n"
"	font-size: 12px;\n"
"}\n"
"\n"
"QPushButton:hover\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #449d44;\n"
"	border: 0;\n"
"	padding: 10px;\n"
"	color: #FFFFFF;\n"
"	font-size: 12px;\n"
"}"));
        label = new QLabel(AddEvent);
        label->setObjectName(QStringLiteral("label"));
        label->setGeometry(QRect(200, 90, 20, 41));
        QFont font;
        font.setFamily(QStringLiteral("Segoe UI,sans-serif"));
        label->setFont(font);
        label->setStyleSheet(QStringLiteral("font-family:\"Segoe UI\", sans-serif;"));
        modeComboBox = new QComboBox(AddEvent);
        modeComboBox->setObjectName(QStringLiteral("modeComboBox"));
        modeComboBox->setGeometry(QRect(10, 70, 121, 24));
        modeComboBox->setStyleSheet(QLatin1String("font-family: \"Segoe UI\", sans-serif;\n"
"text-transform: uppercase;\n"
"font-size: 12px;"));

        retranslateUi(AddEvent);

        QMetaObject::connectSlotsByName(AddEvent);
    } // setupUi

    void retranslateUi(QDialog *AddEvent)
    {
        AddEvent->setWindowTitle(QApplication::translate("AddEvent", "Dialog", 0));
        TitleLbl->setText(QApplication::translate("AddEvent", "Ajouter Ev\303\250nement", 0));
        errorLbl->setText(QApplication::translate("AddEvent", "TextLabel", 0));
        startHourLbl->setText(QApplication::translate("AddEvent", "Heure de d\303\251but", 0));
        durationLbl->setText(QApplication::translate("AddEvent", "Dur\303\251e", 0));
        validateBtn->setText(QApplication::translate("AddEvent", "Ok", 0));
        cancelBtn->setText(QApplication::translate("AddEvent", "Annuler", 0));
        label->setText(QApplication::translate("AddEvent", ":", 0));
    } // retranslateUi

};

namespace Ui {
    class AddEvent: public Ui_AddEvent {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_ADDEVENT_H
