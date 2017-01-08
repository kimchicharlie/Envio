#TRANSMISSION SERVER

##Lancement :

#####NODE :
- npm install
- node start.js

(En cas de problèmes de droits, exécutez les commandes en sudo)

##Routes :

###Default :
Pour vérifier que le serveur tourne bien :)
```json
Route : "/"  
Methode : "POST"
Paramètres :
{
	"transmission_key" : "Clé d'authentification"
}
```
###Communication :
Modifier la valeur d'un capteur
```json
Route : "/modifyCaptorValue"  
Methode : "POST"
Paramètres :
{
	"captorID": "MongoID du capteur",
        "value": "Valeur désirée"
}
```
Modifier la température d'un capteur
```json
Route : "/modifyLight"  
Methode : "POST"
Paramètres :
{
	"captors": "MongoID du capteur",
	"roomID": "MongoID de la room",
	"lightNeeded": "Luminosité désirée",
	"maxLux": "Luminosité maximale",
	"transmission_key": "Clé d'authentification"
}
```
