# Iceman Stock Counting System

Offline barcode stock count app (one HTML page). Works in Chrome on a laptop with a USB / Bluetooth barcode scanner, or on an Android phone with the camera.

- **No company data is stored in this repository.** The item master (item codes, barcodes) is loaded on each phone from a CSV file, and all counts stay on the phone until they are exported as a CSV file.
- After the first visit the app works without Wi-Fi (service worker). On Android: Chrome menu > *Install app* / *Add to Home screen*.
- Build: 20261027-1943