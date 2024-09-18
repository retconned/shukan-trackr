export function setupOfflineHandler(): void {
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  updateOnlineStatus();
}

function updateOnlineStatus(): void {
  const status = navigator.onLine ? "online" : "offline";
  console.log(`App is ${status}`);
  // You can update UI elements here to show online/offline status
}
