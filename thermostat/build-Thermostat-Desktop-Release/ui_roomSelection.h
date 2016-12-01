/********************************************************************************
** Form generated from reading UI file 'roomSelection.ui'
**
** Created by: Qt User Interface Compiler version 5.6.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_ROOMSELECTION_H
#define UI_ROOMSELECTION_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QDialog>
#include <QtWidgets/QDialogButtonBox>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>

QT_BEGIN_NAMESPACE

class Ui_RoomSelection
{
public:
    QDialogButtonBox *buttonBox;
    QLabel *label;
    QLineEdit *lineEdit;
    QLabel *errorLbl;

    void setupUi(QDialog *RoomSelection)
    {
        if (RoomSelection->objectName().isEmpty())
            RoomSelection->setObjectName(QStringLiteral("RoomSelection"));
        RoomSelection->resize(320, 240);
        RoomSelection->setStyleSheet(QLatin1String("Background: #232123;\n"
""));
        buttonBox = new QDialogButtonBox(RoomSelection);
        buttonBox->setObjectName(QStringLiteral("buttonBox"));
        buttonBox->setGeometry(QRect(10, 200, 301, 32));
        QFont font;
        font.setBold(true);
        font.setWeight(75);
        buttonBox->setFont(font);
        buttonBox->setStyleSheet(QLatin1String("QPushButton\n"
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
"	font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #449d44;\n"
"	border: 0;\n"
"	padding: 7px;\n"
"	color: #FFFFFF;\n"
"	font-size: 14px;\n"
"	border-radius: 7px;\n"
"}"));
        buttonBox->setOrientation(Qt::Horizontal);
        buttonBox->setStandardButtons(QDialogButtonBox::Cancel|QDialogButtonBox::Ok);
        label = new QLabel(RoomSelection);
        label->setObjectName(QStringLiteral("label"));
        label->setGeometry(QRect(20, 20, 281, 51));
        QFont font1;
        font1.setFamily(QStringLiteral("Segoe UI,sans-serif"));
        font1.setBold(true);
        font1.setWeight(75);
        label->setFont(font1);
        label->setStyleSheet(QLatin1String("font-family:\"Segoe UI\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"width: 100%;\n"
"border: 0;\n"
"padding: 10px;\n"
"color: #AAA;\n"
"font-size: 14px;"));
        label->setAlignment(Qt::AlignCenter);
        lineEdit = new QLineEdit(RoomSelection);
        lineEdit->setObjectName(QStringLiteral("lineEdit"));
        lineEdit->setGeometry(QRect(20, 110, 281, 61));
        lineEdit->setFont(font1);
        lineEdit->setStyleSheet(QLatin1String("font-family:\"Segoe UI\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"width: 100%;\n"
"border: 2;\n"
"background: #444;\n"
"padding: 10px;\n"
"color: #AAA;\n"
"font-size: 12px;"));
        lineEdit->setMaxLength(8);
        lineEdit->setEchoMode(QLineEdit::Password);
        lineEdit->setAlignment(Qt::AlignCenter);
        errorLbl = new QLabel(RoomSelection);
        errorLbl->setObjectName(QStringLiteral("errorLbl"));
        errorLbl->setGeometry(QRect(24, 70, 271, 41));
        errorLbl->setStyleSheet(QLatin1String("font-family:\"Segoe UI\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"width: 100%;\n"
"border: 0;\n"
"padding: 10px;\n"
"color: #b71c1c;\n"
"font-size: 12px;\n"
""));

        retranslateUi(RoomSelection);
        QObject::connect(buttonBox, SIGNAL(accepted()), RoomSelection, SLOT(accept()));
        QObject::connect(buttonBox, SIGNAL(rejected()), RoomSelection, SLOT(reject()));

        QMetaObject::connectSlotsByName(RoomSelection);
    } // setupUi

    void retranslateUi(QDialog *RoomSelection)
    {
        RoomSelection->setWindowTitle(QApplication::translate("RoomSelection", "Dialog", 0));
        label->setText(QApplication::translate("RoomSelection", "Entrer le code de la salle", 0));
        errorLbl->setText(QString());
    } // retranslateUi

};

namespace Ui {
    class RoomSelection: public Ui_RoomSelection {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_ROOMSELECTION_H
