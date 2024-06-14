export function parseLocation(location: any): any {
  try {
    if (location && typeof location === 'string') {
      location = JSON.parse(location);
    }
  } catch (error) {
    return location;
  }
  return location;
}

export function convertToLatLng(local: any): any {
  if (local && local.location) {
    local.location = new google.maps.LatLng(local.location.lat, local.location.lng);
  }
  return local;
}
