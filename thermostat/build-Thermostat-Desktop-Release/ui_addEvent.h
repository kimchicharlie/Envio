/********************************************************************************
** Form generated from reading UI file 'addEvent.ui'
**
** Created by: Qt User Interface Compiler version 5.7.0
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
        AddEvent->setStyleSheet(QStringLiteral("Background: #232123;"));
        TitleLbl = new QLabel(AddEvent);
        TitleLbl->setObjectName(QStringLiteral("TitleLbl"));
        TitleLbl->setGeometry(QRect(80, 10, 151, 31));
        QFont font;
        font.setFamily(QStringLiteral("Segoe UI,sans-serif"));
        font.setBold(true);
        font.setWeight(75);
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
        QFont font1;
        font1.setFamily(QStringLiteral("Segoe UI,sans-serif"));
        errorLbl->setFont(font1);
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
        hourStartSpin->setFont(font);
        hourStartSpin->setStyleSheet(QLatin1String("font-family:\"Segoe UI\", sans-serif;\n"
"background: #777;\n"
""));
        hourStartSpin->setMaximum(23);
        minStartSpin = new QSpinBox(AddEvent);
        minStartSpin->setObjectName(QStringLiteral("minStartSpin"));
        minStartSpin->setGeometry(QRect(230, 100, 51, 31));
        minStartSpin->setFont(font);
        minStartSpin->setStyleSheet(QLatin1String("font-family:\"Segoe UI\", sans-serif;\n"
"background: #777;\n"
""));
        minStartSpin->setMaximum(55);
        minStartSpin->setSingleStep(5);
        durationSpin = new QSpinBox(AddEvent);
        durationSpin->setObjectName(QStringLiteral("durationSpin"));
        durationSpin->setGeometry(QRect(140, 150, 51, 31));
        durationSpin->setFont(font);
        durationSpin->setStyleSheet(QLatin1String("font-family:\"Segoe UI\", sans-serif;\n"
"background: #777;"));
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
        validateBtn->setFont(font1);
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
        cancelBtn->setFont(font1);
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
        label->setGeometry(QRect(200, 90, 20, 41));
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
        modeComboBox->setGeometry(QRect(10, 70, 121, 24));
        modeComboBox->setFont(font1);
        modeComboBox->setStyleSheet(QLatin1String("font-family: \"Segoe UI\", sans-serif;\n"
"background: #777;\n"
"text-transform: uppercase;\n"
"font-size: 12px;"));
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
