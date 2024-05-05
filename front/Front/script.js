//navbar
const indicator = document.querySelector(".nav-indicator");
const items = document.querySelectorAll(".nav-item");
function handleIndicator(el) {
  items.forEach((item) => {
    item.classList.remove("is-active");
    item.removeAttribute("style");
  });

  indicator.style.width = `${el.offsetWidth}px`;
  indicator.style.backgroundColor = el.getAttribute("data-active-color");
  indicator.style.left = `${el.offsetLeft}px`;

  el.classList.add("is-active");
  el.style.color = el.getAttribute("data-active-color");
}

items.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    handleIndicator(e.target);
  });
  item.classList.contains("is-active") && handleIndicator(item);
});

// api
//attendre que le DOM soit chargé(ici j'ai regarder dans des repos github pour comprendre comment ils mettaits des api et ils mettaient ça donc je l'ai mis aussi pour voir si ça marche et ça marche)
// Attendre que le DOM soit chargé
// Attendre que le DOM soit chargé
// Attendre que le DOM soit chargé
// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", () => {
  // Sélection des personnages
  const charactersContainer = document.querySelector("#characters-container");

  // Requête des personnages depuis l'API
  fetch("https://hp-api.lainocs.fr/characters/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((characters) => {
      characters.forEach((character) => {
        // Crée une carte pour chaque personnage
        const characterCard = document.createElement("div");
        characterCard.classList.add("character-card");

        // Ajoute les informations du personnage à la carte
        characterCard.innerHTML = `
                    <img src="${character.image}" alt="${
          character.name
        }" class="character-image">
                    <h2 class="character-name">${character.name}</h2>
                    <p class="character-details">House: ${character.house}</p>
                    <a href="https://hp-api.lainocs.fr/characters/${character.name
                      .toLowerCase()
                      .replace(/\s/g, "-")}">Voir plus</a>
                `;

        // Ajoute la carte au container
        charactersContainer.appendChild(characterCard);

        // Ajoute un événement de clic à chaque carte de personnage
        characterCard.addEventListener("click", () => {
          // Vérifie si la couleur est déjà appliquée à la carte
          if (characterCard.style.backgroundColor) {
            // Supprime la couleur
            characterCard.style.backgroundColor = "";
          } else {
            // Applique la couleur de la maison à la carte
            switch (character.house.toLowerCase()) {
              case "gryffindor":
                characterCard.style.backgroundColor = "#7f0909"; // Rouge pour Gryffindor
                break;
              case "hufflepuff":
                characterCard.style.backgroundColor = "#ecb939"; // Jaune pour Hufflepuff
                break;
              case "ravenclaw":
                characterCard.style.backgroundColor = "#0e1a40"; // Bleu pour Ravenclaw
                break;
              case "slytherin":
                characterCard.style.backgroundColor = "#1a472a"; // Vert pour Slytherin
                break;
              default:
                break;
            }
          }
          console.log(character.house);
          fetch("http://localhost:3000/house", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ house: character.house }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              console.log("Server response:", data);
              // Mettre à jour l'interface utilisateur ou effectuer d'autres actions nécessaires
            })
            .catch((error) => {
              console.error("Error sending house color to server:", error);
            });
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching characters:", error);
    });
});
document.querySelectorAll(".character-card").forEach((card) => {
  card.addEventListener("click", () => {
    // Récupérer la couleur de la maison de la carte de personnage
    //get house with character-details class *
    housediv = card.querySelector(".character-details");
    const houseColor = housediv.textContent.split(" ")[1];
    console.log(houseColor);

    // Envoyer la couleur de la maison au serveur
    fetch("http://localhost:3000/house", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ house: houseColor }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Server response:", data);
        // Mettre à jour l'interface utilisateur ou effectuer d'autres actions nécessaires
      })
      .catch((error) => {
        console.error("Error sending house color to server:", error);
      });
  });
});
