const startPage = document.querySelector('div[class="app-startPage"]')
const reloadButton = document.querySelector('button[class="app-reloadButton"]')
const settingButton = document.querySelector('button[class="app-openSettings"]')
const installButton = document.querySelector('button[class="app-installNow"]')
const link = document.createElement('link')
link.setAttribute('rel', 'stylesheet')
link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Material+Icons')

document.querySelector('head').appendChild(link)

reloadButton.addEventListener('click', () => {
  window.location.reload()
})
reloadButton.innerHTML = '<i class="material-icons">refresh</i>'
window.addEventListener('appinstalled', () => {
  alert('thanks for install this app!')
  hideInAppInstallPromotion()
});
// This variable will save the event for later use.
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevents the default mini-infobar or install dialog from appearing on mobile
  e.preventDefault();
  // Save the event because you'll need to trigger it later.
  deferredPrompt = e;
  // Show your customized install prompt for your PWA
  // Your own UI doesn't have to be a single element, you
  // can have buttons in different locations, or wait to prompt
  // as part of a critical journey.
  showInAppInstallPromotion();
});
// Gather the data from your custom install UI event listener
installButton.addEventListener('click', async () => {
  // deferredPrompt is a global variable we've been using in the sample to capture the `beforeinstallevent`
  deferredPrompt.prompt();
  // Find out whether the user confirmed the installation or not
  const { outcome } = await deferredPrompt.userChoice;
  // The deferredPrompt can only be used once.
  deferredPrompt = null;
  // Act on the user's choice
  if (outcome === 'accepted') {
    console.log('User accepted the install prompt.');
  } else if (outcome === 'dismissed') {
    console.log('User dismissed the install prompt');
  }
});