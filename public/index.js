document.getElementById("ajouter-utilisateur-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("Formulaire soumis"); 

    const nomInput = document.getElementById("nom");
    const prenomInput = document.getElementById("prenom");
    const emailInput = document.getElementById("email");
    const resultatsDiv = document.getElementById("resultats");

    const nom = nomInput.value;
    const prenom = prenomInput.value;
    const email = emailInput.value;

    try {
        const response = await fetch("/utilisateur", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nom, prenom, email })
        });

        if (response.status === 200) {
            resultatsDiv.textContent = "Utilisateur ajouté avec succès!";
        } else {
            resultatsDiv.textContent = "Une erreur s'est produite lors de l'ajout de l'utilisateur.";
        }
    } catch (error) {
        console.error(error);
        resultatsDiv.textContent = "Une erreur s'est produite lors de la communication avec le serveur.";
    }
});




// document.addEventListener('DOMContentLoaded', function () {
//     const commentForm = document.getElementById('comment-form');
//     const techCommentForm = document.getElementById('tech-comment-form');
//     const userCommentForm = document.getElementById('user-comment-form');
//     const dateCommentForm = document.getElementById('date-comment-form');
//     const resultsDiv = document.getElementById('results');

//     commentForm.addEventListener('submit', async function (e) {
//         e.preventDefault();
//         const userId = document.getElementById('userId').value;
//         const technologieId = document.getElementById('technologieId').value;
//         const comment = document.getElementById('comment').value;
//         const response = await fetch('/commentaires', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ userId, technologieId, contenu: comment })
//         });

//         if (response.status === 201) {
//             resultsDiv.textContent = 'Commentaire ajouté avec succès';
//         } else {
//             resultsDiv.textContent = 'Erreur lors de l\'ajout du commentaire';
//         }
//     });

//     techCommentForm.addEventListener('submit', async function (e) {
//         e.preventDefault();
//         const techId = document.getElementById('techId').value;
//         const response = await fetch(`/commentaires/${techId}`);
//         const commentaires = await response.json();
//         displayComments(commentaires);
//     });

//     userCommentForm.addEventListener('submit', async function (e) {
//         e.preventDefault();
//         const userIdComment = document.getElementById('userIdComment').value;
//         const response = await fetch(`/commentaires/utilisateur/${userIdComment}`);
//         const commentaires = await response.json();
//         displayComments(commentaires);
//     });

//     dateCommentForm.addEventListener('submit', async function (e) {
//         e.preventDefault();
//         const dateParam = document.getElementById('dateParam').value;
//         const response = await fetch(`/commentaires/date/${dateParam}`);
//         const commentaires = await response.json();
//         displayComments(commentaires);
//     });

//     function displayComments(commentaires) {
//         resultsDiv.innerHTML = '';
//         if (commentaires.length === 0) {
//             resultsDiv.textContent = 'Aucun commentaire trouvé.';
//         } else {
//             const ul = document.createElement('ul');
//             commentaires.forEach(commentaire => {
//                 const li = document.createElement('li');
//                 li.textContent = `ID: ${commentaire.id}, User ID: ${commentaire.userId}, Technologie ID: ${commentaire.technologieId}, Contenu: ${commentaire.contenu}, Date: ${commentaire.date_creation_commentaire}`;
//                 ul.appendChild(li);
//             });
//             resultsDiv.appendChild(ul);
//         }
//     }
// });
document.addEventListener('DOMContentLoaded', function () {
    const commentForm = document.getElementById('comment-form');
    const techForm = document.getElementById('tech-form');
    const signupForm = document.getElementById('signup-form');
    const commentList = document.getElementById('comment-list');
    const techList = document.getElementById('tech-list');

    // Fonction pour afficher les commentaires
    function displayComments() {
        fetch('/commentaires')
            .then(response => response.json())
            .then(data => {
                commentList.innerHTML = '';
                data.forEach(comment => {
                    const li = document.createElement('li');
                    li.textContent = `Utilisateur ID: ${comment.userId}, Technologie ID: ${comment.technologieId}, Commentaire: ${comment.contenu}`;
                    commentList.appendChild(li);
                });
            });
    }

    // Fonction pour afficher les technologies
    function displayTechnologies() {
        fetch('/technologies')
            .then(response => response.json())
            .then(data => {
                techList.innerHTML = '';
                data.forEach(tech => {
                    const li = document.createElement('li');
                    li.textContent = `Technologie: ${tech.nom_techno}`;
                    techList.appendChild(li);
                });
            });
    }

    // Écouter la soumission du formulaire de commentaire
    commentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const userId = document.getElementById('userId').value;
        const technologieId = document.getElementById('technologieId').value;
        const comment = document.getElementById('comment').value;

        fetch('/commentaire', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, technologieId, contenu: comment })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            displayComments(); // Actualiser la liste des commentaires
        });
    });

    // Écouter la soumission du formulaire de technologie
    techForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nomTechno = document.getElementById('nomTechno').value;

        fetch('/technologies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nom_techno: nomTechno })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            displayTechnologies(); 
        });
    });


    // Charger les commentaires et les technologies au chargement de la page
    displayComments();
    displayTechnologies();
});

