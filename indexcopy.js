// function copyToClipboard1(ip) {
//   navigator.clipboard.writeText(ip).then(() => {
//     // alert("Copied: " + ip);
//   });
// }

// changes on
// List of IPs (this can come from API, backend, or config)

const ipAddresses = [
  "3.238.199.57", 
"44.192.69.220",
"44.220.190.237",
"3.227.1.205",
"3.238.199.80",
];

const v = "22:50:00";
const startTime = new Date(`2026-08-23T${v}`).getTime();
const counter = "ostCountdown" // countdown | countdown1
////////////aws cloud
//////////////////////
const ipAddresses1 = [
  "https://449962745516.signin.aws.amazon.com/console?region=us-east-1",
  "kk_labs_user_131044",
  "aKM7cD0!Fy@g",
];
// changes off

// Render IP list into the container
const ipGrid = document.getElementById("ipGrid");
ipAddresses.forEach((ip) => {
  const div = document.createElement("div");
  div.classList.add("ip-item");
  div.innerHTML = `
    ${ip} 
    <button class="copy-btn" onclick="copyToClipboard('ssh ec2-user@${ip}')">
      <i class="fas fa-copy"></i> Copy
    </button>
  `;
  ipGrid.appendChild(div);
});

// Copy to clipboard function
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // alert(`Copied: ${text}`);
    })
    .catch((err) => {
      console.error("Copy failed", err);
    });
}

// Set a fixed global start time (same for everyone)
// Example: August 23, 2025 07:00 UTC

// Duration (3 hours in milliseconds)
const duration = 3 * 60 * 60 * 1000;

// Calculate end time
const endTime = startTime + duration;

function updateCountdown(ct) {
  const now = Date.now();
  const distance = endTime - now;

  if (distance <= 0) {
    document.getElementById(`${ct}`).innerHTML = "00:00:00";
    clearInterval(timer);
    return;
  }

  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById(`${ct}`).innerHTML =
    hours + "h " + minutes + "m " + seconds + "s ";
}

// Run immediately and then every second
updateCountdown(counter);
const timer = setInterval(() => updateCountdown(counter), 1000);
