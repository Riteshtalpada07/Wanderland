document.addEventListener('DOMContentLoaded', function() {
    // Get listing data from the global variable set in the EJS template
    const listingData = window.listingData || {};
    
    // Initialize map with a default view
    const map = L.map('map').setView([20.5937, 78.9629], 4); // Default to India center
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);
    
    // Geocode the location and add marker
    const location = listingData.location || '';
    const country = listingData.country || '';
    const address = `${location}, ${country}`.replace(', ,', ',').replace(/^,\s*/, '').replace(/\s*,$/, '');
    
    // Only attempt geocoding if we have a valid address
    if (address && address !== ', ') {
      // Using Nominatim API for geocoding
      fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data && Array.isArray(data) && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lng = parseFloat(data[0].lon);
            
            // Validate coordinates
            if (!isNaN(lat) && !isNaN(lng)) {
              // Set map view to the location with appropriate zoom
              map.setView([lat, lng], 15);
              
              // Add marker with a nice icon
              const marker = L.marker([lat, lng], {
                draggable: false,
                title: listingData.title || ''
              }).addTo(map)
                .bindPopup(`
                  <div style="min-width: 200px;">
                    <h4 style="margin: 0 0 10px 0;">${listingData.title || ''}</h4>
                    <p style="margin: 0 0 5px 0;">${location}, ${country}</p>
                    <p style="margin: 0; font-size: 0.9em; color: #666;">₹${listingData.price ? Number(listingData.price).toLocaleString("en-IN") : 'N/A'}</p>
                  </div>
                `)
                .openPopup();
            } else {
              console.warn('Invalid coordinates received for:', address);
              showErrorOnMap(map, 'Invalid location data');
            }
          } else {
            console.warn('Could not geocode location:', address);
            showErrorOnMap(map, 'Location not found on map');
          }
        })
        .catch(error => {
          console.error('Geocoding error:', error);
          showErrorOnMap(map, 'Unable to load location');
        });
    } else {
      console.warn('Empty address for geocoding');
      showErrorOnMap(map, 'No location specified');
    }
  });
  
  function showErrorOnMap(map, message) {
    // Add a simple error message to the map
    const errorPopup = L.popup()
      .setLatLng([20.5937, 78.9629])
      .setContent(`
        <div style="text-align:center; padding:15px; color: #666;">
          <b>Map Information:</b><br>
          <span style="font-size: 0.9em;">${message}</span>
        </div>
      `);
    
    map.setView([20.5937, 78.9629], 4);
    errorPopup.openOn(map);
  }