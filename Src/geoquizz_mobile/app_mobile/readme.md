#APP Mobile, répertoire app_mobile : Programation en ligne sur Nativescript-Vue Playground
$ sudo npm install -g nativescript@latest
$ sudo tns preview --bundle
Ou import du répertoire app sur le site web de Telerik Nativescript-Vue Playground

#Debug sur mobile avec Playground et Preview du Play Store de Google
QR code à scanner

#Utilsation d'un serveur local pour communiquer avec l'API mobile
ngrok dans répertoire ngrok, création d'un compte
https://dashboard.ngrok.com/get-started
$ ./ngrok authtoken 5n7e8AUUkLUTKmy76iBuN_3LKQVgp84gw5Zjbx8ezHv
$ ./ngrok help
$ ./ngrok http localhost:12081 -host-header=localhost

#Configuration du code pour la déclaration de variable si on a notre propre service
data() {
            return {
                ...
                urlngrok: "http://e3084853.ngrok.io"
            };
        },

#Permettre l'enregistrement de la photo dans le répertoire images
Pour le répertoire de nos codes sources il faut autoriser les droits
$ sudo chmod a+rwx -R geoquizz


