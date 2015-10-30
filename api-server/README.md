#API-REST

##Lancement :

#####NODE :
- npm install
- node start.js

(En cas de problèmes de droits, exécutez les commandes en sudo)

##Routes :

###Default :
```json
Route : "/"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification"
}
```
###Materiel :
Récupérer les matériels de la room 
```json
Route : "/getMaterielsFromRoom"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
	"organisation" : "Organisation",
	"roomId" : "ID de la room"
}
```
Changer la température voulue de la room
```json
Route : "/changeTemperatureNeeded"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
	"organisation" : "Organisation",
	"roomId" : "ID de la room",
	"temperature" : "Temperature voulue pour la room"
}
```
###Room
Créer une room
```json
Route : "/createRoom"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
	"organisation" : "Organisation",
	"name" : "Nom voulu pour la room",
	"volume" : "Volume de la room en mètres cubes"
}
```
Modifier une room
```json
Route : "/modifyRoom"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
	"newName" : "Nouveau nom de la room",
	"name" : "Nom actuel de la room",
	"volume" : "Nouveau volume de la room"
}
```
Récupérer les données d'une room
```json
Route : "/getRoom"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
	"_id" : "ID de la room à récupérer"
}
```
Récupérer toutes les rooms d'une organisation
```json
Route : "/getRooms"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
	"organisation" : "Organisation"
}
```
Changer la température d'une room
```json
Route : "/changeTemperature"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
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
	"api_key" : "Clé d'authentification",
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
	"api_key" : "Clé d'authentification",
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
	"api_key" : "Clé d'authentification",
	"email" : "Adresse email",
	"newPassword" : "Nouveau mot de passe"
}
```
Changer mot de passe
```json
Route : "/changePassword"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
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
	"api_key" : "Clé d'authentification",
	"guid" : "GUID de l'utilisateur"
}
```
Connaitre le statut de connection de l'utilisateur
```json
Route : "/isConnected"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
	"guid" : "GUID de l'utilisateur"
}
```
Récupérer les données d'un utilisateur
```json
Route : "/getUser"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
	"guid" : "GUID de l'utilisateur"
}
```
