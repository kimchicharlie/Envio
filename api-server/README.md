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
