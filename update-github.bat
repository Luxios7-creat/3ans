@echo off
echo ===== Mise à jour GitHub Pages =====
echo Ajout de tous les fichiers...
git add .

echo Commit automatique...
git commit -m "Mise à jour du projet %date% %time%"

echo Push vers GitHub...
git push origin main

echo ===== Mise à jour terminée ! =====
pause
