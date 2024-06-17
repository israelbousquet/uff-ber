import { Lift } from '../interfaces/global-interfaces';

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
    local.location = new google.maps.LatLng(
      local.location.lat,
      local.location.lng
    );
  }
  return local;
}

export function filteredIndivualLift(res: Lift) {
  filterLift(res);
  filteredWaypoint(res);

  return res;
}

export function filterLift(res: Lift) {
  res.lift!.start_location = parseLocation(res.lift!.start_location);
  res.lift!.end_location = parseLocation(res.lift!.end_location);

  res.lift!.start_location = convertToLatLng(res.lift!.start_location);
  res.lift!.end_location = convertToLatLng(res.lift!.end_location);
}

export function filteredWaypoint(res: Lift) {
  if (res.waypoints && res.waypoints.length > 0) {
    res.waypoints.map((item) => {
      item.dropoff_location = parseLocation(item.dropoff_location);
      item.pickup_location = parseLocation(item.pickup_location);

      item.dropoff_location = convertToLatLng(item.dropoff_location);
      item.pickup_location = convertToLatLng(item.pickup_location);
    });
  }
}
