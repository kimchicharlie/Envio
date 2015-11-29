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
<<<<<<< HEAD
Route : "/createRoom"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
=======
Route : "/createRoom?api_key={key}"  
Methode : "POST"
Paramètres :
{
>>>>>>> dcad149ba7d005a19a9703032e2eec3fc650b261
	"organisation" : "Organisation",
	"name" : "Nom voulu pour la room",
	"volume" : "Volume de la room en mètres cubes"
}
```
Modifier une room
```json
<<<<<<< HEAD
Route : "/modifyRoom"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
=======
Route : "/modifyRoom?api_key={key}"  
Methode : "POST"
Paramètres :
{
>>>>>>> dcad149ba7d005a19a9703032e2eec3fc650b261
	"newName" : "Nouveau nom de la room",
	"name" : "Nom actuel de la room",
	"volume" : "Nouveau volume de la room"
}
```
<<<<<<< HEAD
Récupérer les données d'une room
```json
Route : "/getRoom"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
	"_id" : "ID de la room à récupérer"
=======
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
>>>>>>> dcad149ba7d005a19a9703032e2eec3fc650b261
}
```
Récupérer toutes les rooms d'une organisation
```json
<<<<<<< HEAD
Route : "/getRooms"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
=======
Route : "/getRooms?api_key={key}"  
Methode : "POST"
Paramètres :
{
>>>>>>> dcad149ba7d005a19a9703032e2eec3fc650b261
	"organisation" : "Organisation"
}
```
Changer la température d'une room
```json
<<<<<<< HEAD
Route : "/changeTemperature"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
=======
Route : "/changeTemperature?api_key={key}"  
Methode : "POST"
Paramètres :
{
>>>>>>> dcad149ba7d005a19a9703032e2eec3fc650b261
	"roomId" : "ID de la room",
	"temperature" : "Temperature voulue pour la room"
}
```
###Materiel :
Récupérer les matériels de la room 
```json
<<<<<<< HEAD
Route : "/getMaterielsFromRoom"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
=======
Route : "/getMaterielsFromRoom?api_key={key}"  
Methode : "POST"
Paramètres :
{
>>>>>>> dcad149ba7d005a19a9703032e2eec3fc650b261
	"organisation" : "Organisation",
	"roomId" : "ID de la room"
}
```
Changer la température voulue de la room
```json
<<<<<<< HEAD
Route : "/changeTemperatureNeeded"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
=======
Route : "/changeTemperatureNeeded?api_key={key}"  
Methode : "POST"
Paramètres :
{
>>>>>>> dcad149ba7d005a19a9703032e2eec3fc650b261
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
<<<<<<< HEAD
	"api_key" : "Clé d'authentification",
=======
>>>>>>> dcad149ba7d005a19a9703032e2eec3fc650b261
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
<<<<<<< HEAD
	"api_key" : "Clé d'authentification",
=======
>>>>>>> dcad149ba7d005a19a9703032e2eec3fc650b261
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
<<<<<<< HEAD
	"api_key" : "Clé d'authentification",
=======
>>>>>>> dcad149ba7d005a19a9703032e2eec3fc650b261
	"email" : "Adresse email",
	"newPassword" : "Nouveau mot de passe"
}
```
Changer mot de passe
```json
<<<<<<< HEAD
Route : "/changePassword"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
=======
Route : "/changePassword?api_key={key}"
Methode : "POST"
Paramètres :
{
>>>>>>> dcad149ba7d005a19a9703032e2eec3fc650b261
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
<<<<<<< HEAD
	"api_key" : "Clé d'authentification",
=======
>>>>>>> dcad149ba7d005a19a9703032e2eec3fc650b261
	"guid" : "GUID de l'utilisateur"
}
```
Connaitre le statut de connection de l'utilisateur
```json
<<<<<<< HEAD
Route : "/isConnected"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
=======
Route : "/isConnected?api_key={key}"  
Methode : "POST"
Paramètres :
{
>>>>>>> dcad149ba7d005a19a9703032e2eec3fc650b261
	"guid" : "GUID de l'utilisateur"
}
```
Récupérer les données d'un utilisateur
```json
<<<<<<< HEAD
Route : "/getUser"  
Methode : "POST"
Paramètres :
{
	"api_key" : "Clé d'authentification",
=======
Route : "/getUser?api_key={key}"  
Methode : "POST"
Paramètres :
{
>>>>>>> dcad149ba7d005a19a9703032e2eec3fc650b261
	"guid" : "GUID de l'utilisateur"
}
```
