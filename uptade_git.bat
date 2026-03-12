@echo off
echo ===== Mise à jour GitHub Pages =====

echo Recuperation des changements...
git pull origin main

echo Ajout des fichiers...
git add .

echo Commit automatique...
git commit -m "Mise a jour du projet %date% %time%"

echo Envoi vers GitHub...
git push origin main

echo ===== Mise a jour terminee ! =====
pause