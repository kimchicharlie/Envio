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
	"volume" : "Volume de la room en mètres cubes"
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
	"roomID" : "ID de la room à récupérer"
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

Ajouter un Mode au Planning de la Room
```json
Route : "/addEventPlanning?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"roomId" : "ID de la room",
        "eventName": "Nom (généralement le nom du mode)",
        "modeID": "ID du mode",
        "dateBegin": "Date de debut du mode(un object javascript date)",
        "dateEnd": "Date de fin du mode(un object javascript date)"
}
```

Suprimer un Mode du Planning de la Room
```json
Route : "/removeEventPlanning?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"roomId" : "ID de la room",
        "eventName": "Nom (généralement le nom du mode)",
        "dateBegin": "Date de debut du mode(un object javascript date)",
}
```
Modifier un Mode au Planning de la Room
```json
Route : "/modifyEventPlanning?api_key={key}"  
Methode : "POST"
Paramètres :
{
	"roomId" : "ID de la room",
        "eventName": "Nom (généralement le nom du mode)",
        "newName": "Nouveau nom",
        "modeID": "ID du mode",
        "dateBegin": "Date de debut du mode(un object javascript date)",
        "dateEnd": "Date de fin du mode(un object javascript date)"
	"newDateBegin": "Nouvelle date de debut",
	"newDateEnd": "Nouvelle date de fin"        
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
	"organisation" : "Organisation",
	"roomId" : "ID de la room",
	"temperature" : "Temperature voulue pour la room"
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
Demander un nouveau mot de passe
```json
Route : "/passwordForgotten"  
Methode : "POST"
Paramètres :
{
	"email" : "Adresse email",
	"newPassword" : "Nouveau mot de passe"
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
###Mode
Créer un mode
```json
Route : "/creatMode"  
Methode : "POST"
Paramètres :
{
	"organisation" : "Organisation",
	"name" : "Nom",
	"luminosity" : "lumière",
	"opacity" : "opicter",
	"temperature" : "température" 
}
```

Modifier un mode
```json
Route : "/modifyMode"  
Methode : "POST"
Paramètres :
{
	"modeID" : "ID du mode",
	"newName" : "nom",
	"luminosity" : "Lumière",
	"opacity" : "Opicter",
	"temperature" : "Température" 
}
```
Supprimer un mode
```json
Route : "/deleteMode"  
Methode : "POST"
Paramètres :
{
	"modeID" : "ID du mode"
}
```
Récupérer les modes
```json
Route : "/getModes"  
Methode : "POST"
Paramètres :
{
	"organisation" : "Organisation"
}
```

Récupérer un mode
```json
Route : "/getMode"  
Methode : "POST"
Paramètres :
{
	"modeID" : "ID du mode"
}
```





