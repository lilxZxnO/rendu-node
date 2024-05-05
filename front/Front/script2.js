const formulaire = document.getElementById("formulaire");

formulaire.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  const token = data.token;

  localStorage.setItem("token", token);
});

const getMyProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/getMyProfile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.log(data);
};

//api 
document.addEventListener("DOMContentLoaded", function() {
  fetch("https://hp-api.lainocs.fr/characters")
    .then(response => response.json())
    .then(data => {
      const charactersContainer = document.getElementById("characters-container");
      data.forEach(character => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = character.image;
        img.alt = character.name;

        const name = document.createElement("h2");
        name.textContent = character.name;

        const house = document.createElement("p");
        house.textContent = `House: ${character.house}`;

        const actor = document.createElement("p");
        actor.textContent = `Actor: ${character.actor}`;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(house);
        card.appendChild(actor);

        charactersContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error fetching characters:", error);
    });
});
