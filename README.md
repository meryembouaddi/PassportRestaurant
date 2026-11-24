# PASSPORT · Restaurant sans frontières

Site de soutenance réalisé en React et JSX avec Vite. Ouvrir le dossier contenant ce fichier dans VS Code. Utiliser Node.js 22 ou 24 avec npm.

## Démarrer le projet

Dans le terminal du projet, lancer `npm ci`, puis `npm run dev`. Ouvrir l’adresse locale affichée par Vite. Les modifications dans src sont visibles dès l’enregistrement.

## Modifier le contenu

| Emplacement | Rôle |
| --- | --- |
| src/main.jsx | Monte l’application dans la page HTML et charge les styles. |
| src/App.jsx | Assemble les sections dans leur ordre d’affichage. |
| src/components/ | Contient le logo, la navigation et le pied de page. |
| src/sections/ | Contient les six sections du site, dont le carnet interactif et le formulaire. |
| src/data/ | Regroupe les destinations, les spécialités et le texte de soutenance. |
| src/services/email.js | Envoie les avis au modèle EmailJS configuré. |
| src/styles/site.css | Définit la palette, la mise en page et les règles pour mobile. |
| src/assets/ | Conserve le logo original et les photographies. |
| public/soutenance.pdf | Dossier accessible depuis la rubrique Le projet. |

## Recevoir les avis

Le fichier .env contient les trois identifiants publics EmailJS du projet. Après une modification, redémarrer Vite ou reconstruire le site. Dans le modèle EmailJS, indiquer votre Gmail dans To Email et {{reply_to}} dans Reply-To. Utiliser {{from_name}}, {{reply_to}}, {{rating}} et {{message}} dans le corps du courriel. L’envoi nécessite une connexion Internet.

## Préparer la mise en ligne

Lancer `npm run build`. Vite génère le dossier dist à déployer sur un hébergement statique. Pour vérifier le résultat localement, lancer `npm run preview` et ouvrir l’adresse affichée.
