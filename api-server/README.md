#API-REST

##Lancement :

#####NODE :
- npm install
- node start.js

(En cas de problèmes de droits, exécutez les commandes en sudo)

##Routes :

###Default :
Pour vérifier que l'api tourne bien :)
```json
Route : "/"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification"
}
```
###Room
Créer une room
```json
Route : "/createRoom?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"organisation" : "Organisation",
	"name" : "Nom voulu pour la room",
	"volume" : "Volume de la room en mètres cubes",
	"data" : "Objet '3JS' servant à la modélisation 3D",
}
```
Modifier une room
```json
Route : "/modifyRoom?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"newName" : "Nouveau nom de la room",
	"name" : "Nom actuel de la room",
	"volume" : "Nouveau volume de la room"
}
```
Supprimer une room
```json
Route : "/deleteRoom?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"roomID" : "MongoID de la room",
}
```
Modifier la modélisation de la room
```json
Route : "/modifyData?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"name" : "Nom actuel de la room",
	"data" : "Objet '3JS' servant à la modélisation 3D"
}
```
Récupérer les données d'une room
```json
Route : "/getRoom?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"_id" : "ID de la room à récupérer"
}
```
Récupérer le planning d'une room
```json
Route : "/getRoomPlanning?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"_id" : "ID de la room à récupérer"
}
```
Récupérer une room ainsi que son hardware
```json
Route : "/getRoomPlusHardware?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"_id" : "ID de la room à récupérer"
}
```
Récupérer toutes les rooms d'une organisation
```json
Route : "/getRooms?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"organisation" : "Organisation"
}
```
Changer la température d'une room
```json
Route : "/changeTemperature?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"roomId" : "ID de la room",
	"temperature" : "Temperature voulue pour la room"
}
```
Changer la luminosité d'une room
```json
Route : "/changeLight?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"roomId" : "ID de la room",
	"temperature" : "Luminosité voulue pour la room"
}
```
Changer la température d'une room sans les statistiques
```json
Route : "/changeTemperatureWithoutStat?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"roomId" : "ID de la room",
	"temperature" : "Temperature voulue pour la room"
}
```
Changer la luminosité d'une room sans les statistiques
```json
Route : "/changeLightWithoutStat?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"roomId" : "ID de la room",
	"temperature" : "Temperature voulue pour la room"
}
```
Ajoute un événement dans le planning
```json
Route : "/addEventPlanning?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"roomId" : "ID de la room",
	"eventName" : "Nom de l'événement",
	"modeID": "ID du mode",
	"dateBegin": "Date de début",
	"dateEnd": "Date de fin",
}
```
Supprimer un événement du planning
```json
Route : "/removeEventPlanning?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"roomId" : "ID de la room",
	"eventName" : "Nom de l'événement",
	"dateBegin": "Date de début",
}
```
Modifier un événement du planning
```json
Route : "/modifyEventPlanning?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"roomId" : "ID de la room",
	"eventName" : "Nom de l'événement",
	"newName" : "Nouveau nom si changement",
	"modeID": "ID du mode",
	"dateBegin": "Date de début",
	"dateEnd": "Date de fin",
	"newDateBegin": "Nouvelle date de début",
	"newDateEnd": "Nouvelle date de fin",
}
```
Active l'IA / Désactive l'IA
```json
Route : "/switchIA?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"roomId" : "ID de la room",
}
```
###Materiel :
Récupérer les matériels de la room
```json
Route : "/getMaterielsFromRoom?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"organisation" : "Organisation",
	"roomId" : "ID de la room"
}
```
Changer la température voulue de la room
```json
Route : "/changeTemperatureNeeded?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"roomId" : "ID de la room",
	"temperature" : "Température voulue pour la room",
	"organisation" : "Organisation",
}
```
###User
Connecter un utilisateur
```json
Route : "/login"  
Methode : "POST"
Paramètres :
{
	"email" : "Adresse email",
	"password" : "Mot de passe"
}
```
Enregistrer un utilisateur
```json
Route : "/register"  
Methode : "POST"
Paramètres :
{
	"email" : "Adresse email",
	"password" : "Mot de passe",
	"firstname" : "Prénom",
	"lastname" : "Nom de famille",
	"organisation" : "Organisation"
}
```
Crée un nouveau mot de passe aléatoirement et l'envoie par mail
```json
Route : "/passwordForgotten"  
Methode : "POST"
Paramètres :
{
	"email" : "Adresse email",
}
```
Changer mot de passe
```json
Route : "/changePassword?api_key={key}"
Methode : "POST"
Paramètres :
{
	"email" : "Adresse email",
	"newPassword" : "Nouveau mot de passe"
}
```
Se déconnecter
```json
Route : "/logout"  
Methode : "POST"
Paramètres :
{
	"guid" : "GUID de l'utilisateur"
}
```
Connaitre le statut de connection de l'utilisateur
```json
Route : "/isConnected?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"guid" : "GUID de l'utilisateur"
}
```
Récupérer les données d'un utilisateur
```json
Route : "/getUser?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"guid" : "GUID de l'utilisateur"
}
```
Modifie les données d'un utilisateur
```json
Route : "/updateUser?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"userId": "MongoID de l'utilisateur",
	"email": "Nouvelle adresse email",
	"firstname": "Nouveau prénom",
	"lastname": "Nouveau nom de famille",
	"organisation": "Nouvelle organisation",
	"password": "Nouveau mot de passe",
}
```
###Stat
Ajoute des données dans les statistiques
```json
Route : "/addStat?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"roomID": "MongoID de la Room",
	"realLight": "Luminosité réelle",
	"neededLight": "Luminosité voulue",
	"realTemperature": "Température réelle",
	"neededTemperature": "Température voulue",
}
```
###Window
Crée une Window
```json
Route : "/createWindow?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"room": "MongoID de la Room",
	"orientation": "Orientation de la Window",
	"size": "Aire de la Window",
	"opacity": "Opacité %",
	"opacityWanted": "Opacité % voulue",
}
```
Modifie une Window
```json
Route : "/modifyWindow?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"windowID": "MongoID de la Window",
	"orientation": "Orientation de la Window",
	"size": "Aire de la Window",
	"opacityWanted": "Nouvelle opacité % voulue",
}
```
Supprime une Window
```json
Route : "/deleteWindow?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"windowID": "MongoID de la Window",
}
```
Récupère toutes les Windows d'une Room
```json
Route : "/getWindows?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"room": "MongoID de la Room",
}
```
Récupère une Window
```json
Route : "/getWindow?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"windowID": "MongoID de la Window",
}
```
###Mode
Crée un Mode
```json
Route : "/createMode?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"organisation": "MongoID de l'Organisation'",
	"name": "Nom",
	"light": "Luminosité",
	"opacity": "Opacité %",
	"temperature": "Température",
}
```
Modifie un Mode
```json
Route : "/modifyMode?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"modeID": "MongoID du Mode",
	"newName": "Nouveau nom",
	"light": "Luminosité",
	"opacity": "Opacité % voulue",
	"temperature": "Température",
}
```
Supprime un Mode
```json
Route : "/deleteMode?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"modeID": "MongoID du Mode",
}
```
Récupère tous les Modes d'une Organisation
```json
Route : "/getModes?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"organisation": "MongoID de l'Organisation",
}
```
Récupère un Mode
```json
Route : "/getMode?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"modeID": "MongoID du Mode",
}
```
###Captor
Crée un Captor
```json
Route : "/createCaptor?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"room": "MongoID de la Room",
	"type": "Type de capteur",
	"value": "Valeur du capteur",
}
```
Modifie un Captor
```json
Route : "/modifyCaptor?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"modeID": "MongoID du Captor",
	"type": "Type de capteur",
	"value": "Valeur du capteur",
}
```
Supprime un Captor
```json
Route : "/deleteCaptor?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"captorID": "MongoID du Captor",
}
```
Récupère tous les Captors d'une Room
```json
Route : "/getCaptors?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"room": "MongoID de la Room",
}
```
Récupère un Captor
```json
Route : "/getCaptor?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"captorID": "MongoID du Captor",
}
```
###AirConditioning
Crée un AirConditioning
```json
Route : "/createAirConditioning?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"room": "MongoID de la Room",
	"temperatureWanted": "Température voulue",
}
```
Modifie un AirConditioning
```json
Route : "/modifyAirConditioning?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"airConditioningID": "MongoID du AirConditioning",
	"temperatureWanted": "Température voulue",
}
```
Supprime un AirConditioning
```json
Route : "/deleteAirConditioning?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"airConditioningID": "MongoID du AirConditioning",
}
```
Récupère tous les AirConditionings d'une Room
```json
Route : "/getAirConditionings?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"room": "MongoID de la Room",
}
```
Récupère un AirConditioning
```json
Route : "/getAirConditioning?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"airConditioningID": "MongoID du AirConditioning",
}
```
