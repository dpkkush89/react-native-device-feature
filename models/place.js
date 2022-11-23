export class Place {
  constructor(title, imageUri, location, id) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = {
      latitude: location.latitude,
      longitude: location.longitude,
    };
    this.id = id;
    // this.id = new Date().toString() + Math.random().toString();
  }
}
