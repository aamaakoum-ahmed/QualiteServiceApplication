

(function () {
    'use strict';

    
    const btnAnalyse = document.getElementById('btnAnalyse');
    const btnOpt02 = document.getElementById('btnOpt02');
    const btnOpt03 = document.getElementById('btnOpt03');
    const gallery = document.getElementById('gallery');
    const errorMsg = document.getElementById('errorMsg');
    const textZone = document.getElementById('textZone');  

    // function ClearGallery() : pour nettoyer la gallerie et garder le message derreur
    function clearGallery() {
        const enfants = gallery.children;
        for (let i = enfants.length - 1; i >= 0; i--) {
            if (enfants[i].id !== 'errorMsg') {  
                gallery.removeChild(enfants[i]);
            }
        }
    }

    // function displayImages() affichage des images
    function displayImages(images) {
        clearGallery();
        errorMsg.style.display = 'none';  
        textZone.classList.remove('active');

        
        images.forEach(nomFichier => {
            const img = document.createElement('img');
            img.src = '/images/' + nomFichier; 
            img.alt = nomFichier;
            img.dataset.filename = nomFichier;

            // Événement au clic sur l'image
            img.addEventListener('click', function (e) {
                e.stopPropagation();
                textZone.classList.add('active');
                textZone.innerHTML =
                    `<strong>Fichier :</strong> ${this.dataset.filename}
                    <br><br>
                    <em>Contenu associé (à définir)</em>`;
            });

            gallery.appendChild(img);  
        });
    }

    // function displayError() : affichage de message d erreur
    function displayError(message) {
        clearGallery();
        textZone.classList.remove('active');
        errorMsg.textContent = '⚠ ' + message;  
        errorMsg.style.display = 'block';
    }

    // function loadImages(): pour recuperer les images via AJAX 
    function loadImages() {
        errorMsg.style.display = 'none';
        textZone.classList.remove('active');

        fetch('/Home/GetImages')
            .then(response => {  
                if (!response.ok) {
                    throw new Error('Erreur HTTP : ' + response.status);  
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    displayImages(data.images);
                } else {
                    displayError(data.message || 'Aucune photo détectée');  
                }
            })
            .catch(err => {
                displayError('Erreur technique : ' + err.message);
                console.error('Erreur fetch :', err);
            });
    }

    // les Events lier au boutons
    if (btnAnalyse) {
        btnAnalyse.addEventListener('click', loadImages);
    }

    if (btnOpt02) {
        btnOpt02.addEventListener('click', function () {  
            alert('Fonction en cours de développement...');
        });
    }

    if (btnOpt03) {
        btnOpt03.addEventListener('click', function () {
            alert('Fonction en cours de développement...');
        });
    }

    // appel de la function loadImages pour un telechargement auto
    // loadImages();

})();