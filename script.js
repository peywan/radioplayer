// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'

// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.

// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.

// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("channels-container");

  fetch("https://api.sr.se/api/v2/channels?format=json&size=100")
    .then((response) => response.json())
    .then((data) => {
      data.channels.forEach((channel) => {
        const channelCard = document.createElement("div");
        channelCard.className = "channel-card";
        channelCard.style.backgroundColor = channel.color;
        channelCard.style.borderColor = "black";
        channelCard.style.borderWidth = "3px";
        channelCard.innerHTML = `
                  <div class="station" style="background-color:${channel.color};">
                      <img src="${channel.image}" alt="${channel.name}">
                      <div class="station-info">
                          <h2>${channel.name}</h2>
                          <audio controls>
                              <source src="${channel.liveaudio.url}" type="audio/mpeg">
                              Your browser does not support the audio element.
                          </audio>
                      </div>
                  </div>
              `;
        container.appendChild(channelCard);
      });
    })
    .catch((error) => console.error("Error fetching channels:", error));
});
