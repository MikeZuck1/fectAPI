document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('btn');
    const champ = document.getElementById('champ');
    const output = document.getElementById('output');

    btn.onclick = () => {
        const user = champ.value;
        if (!user) {
            output.textContent = "Veuillez entrer un nom d'utilisateur.";
            return;
        }

        fetch("https://api.github.com/users/" + user)
            .then(response => {
                if (!response.ok) {
                    throw new Error('User not found');
                }
                return response.json();
            })
            .then(data => {
                output.textContent = ""; // Efface le contenu précédent
                output.textContent = `Compte de ${data.name}`;
                
                const img = document.createElement("img"); // Corrigé l'orthographe ici
                img.src = data.avatar_url; // Récupère l'avatar de l'utilisateur.
                output.appendChild(img);
                img.width = "200";
            })
            .catch(error => {
                output.textContent = "Utilisateur non trouvé ou erreur lors de la récupération des données.";
                console.error('Il y a eu un problème avec votre requête fetch:', error);
            });
    };
});
