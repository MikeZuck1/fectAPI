document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('btn');
    const champ = document.getElementById('champ');
    const output = document.getElementById('output');

    /*  lorsque l'utilisateur déclanche 
        le bouton submit sans entrer son nom
        un message apparait pour lui demander d'entrer son nom.
    */
    btn.onclick = () => {
        const user = champ.value;
        if (!user) {
            output.textContent = "Veuillez entrer un nom d'utilisateur.";
            return;
        }
        /** Récupère l'adrresse de l'utilisateur. */
        fetch("https://api.github.com/users/" + user)
            .then(response => {
                if (!response.ok) { /** Si la réponse n'est pas valide. */
                    throw new Error('User not found'); /** un message d'erreur s'affiche lorsque l'utilisateur n'est pas trouver. */
                }
                return response.json(); /** La réponse se retourne au format JSON. */
            })
            .then(data => {
                output.textContent = ""; // Efface le contenu précédent
                output.textContent = `Compte de ${data.name}`;
                
                const img = document.createElement("img"); // Crée un élément image.
                img.src = data.avatar_url; // Récupère l'avatar de l'utilisateur.
                output.appendChild(img);
                img.width = "200"; // Taille de l'image.
            })
            .catch(error => {
                output.textContent = "Utilisateur non trouvé ou erreur lors de la récupération des données.";
                console.error('Il y a eu un problème avec votre requête fetch:', error);
            });
    };
});
