window.onload = loadHistory;
function activateEmergency() {
  playSiren();
  speak("Emergency vehicle approaching. Please give way.");
  document.getElementById("hospitalLocation").innerHTML =
    "City Care Hospital – 1.8 km away (Nearest Emergency Center)";
  document.getElementById("trafficStatus").innerHTML =
    "🚦 Alert Sent: Ambulance within 2 km. Green Corridor Activated.";
  document.getElementById("publicAlert").innerHTML =
    "🔊 Emergency voice alert activated.";
  document.getElementById("hospitalAlert").innerHTML =
    "🚨 Emergency Patient Incoming: Cardiac Condition.";
  document.getElementById("availability").innerHTML =
    "🛏 3 ICU Beds Available.";
  let etaValue = Math.floor(Math.random() * 5 + 5) + " Minutes";
  document.getElementById("eta").innerHTML = etaValue;
  moveAmbulance();
  addToHistory("Emergency", "Cardiac Condition", "City Care Hospital", etaValue);
}
function activateStable() {
  speak("Stable condition patient. Normal traffic flow.");
  document.getElementById("hospitalLocation").innerHTML =
    "Metro Hospital – Regular Admission";
  document.getElementById("trafficStatus").innerHTML =
    "No traffic priority required.";
  document.getElementById("publicAlert").innerHTML =
    "No public announcement needed.";
  document.getElementById("hospitalAlert").innerHTML =
    "Stable Case Processing.";
  document.getElementById("availability").innerHTML =
    "🛏 5 General Beds Available.";
  let etaValue = Math.floor(Math.random() * 10 + 10) + " Minutes";
  document.getElementById("eta").innerHTML = etaValue;
  moveAmbulance();
  addToHistory("Stable", "General Condition", "Metro Hospital", etaValue);
}
function ambulanceClicked() {
  speak("Emergency vehicle approaching. Please make way.");
}
function speak(text) {
  let speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
}
function playSiren() {
  let audio = new Audio("https://www.soundjay.com/misc/sounds/siren-01.mp3");
  audio.play();
}
function moveAmbulance() {
  let amb = document.getElementById("ambulance");
  amb.style.left = "0px";
  setTimeout(() => {
    amb.style.left = "85%";
  }, 100);
}
function toggleHistory() {
  document.getElementById("historyPanel").classList.toggle("open");
}
function addToHistory(mode, condition, hospital, eta) {
  const now = new Date();
  const entry = {
    mode,
    condition,
    hospital,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    eta
  };
  let history = JSON.parse(localStorage.getItem("cases")) || [];
  history.unshift(entry);
  localStorage.setItem("cases", JSON.stringify(history));
  loadHistory();
}
function loadHistory() {
  let history = JSON.parse(localStorage.getItem("cases")) || [];
  const list = document.getElementById("historyList");
  list.innerHTML = "";
  if (history.length === 0) {
    list.innerHTML = "<p class='empty'>No cases recorded yet.</p>";
    return;
  }
  history.forEach(item => {
    let div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML =
      `<strong>Mode:</strong> ${item.mode}<br>
       <strong>Condition:</strong> ${item.condition}<br>
       <strong>Hospital:</strong> ${item.hospital}<br>
       <strong>Date:</strong> ${item.date}<br>
       <strong>Time:</strong> ${item.time}<br>
       <strong>ETA:</strong> ${item.eta}`;
    list.appendChild(div);
  });
}
function clearHistory() {
  localStorage.removeItem("cases");
  loadHistory();
}
