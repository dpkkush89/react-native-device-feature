import * as SQLite from 'expo-sqlite';
import {Place} from '../models/place';

const database = SQLite.openDatabase('places.db');

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            latitude REAL NOT NUll,
            longitude REAL NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction(txn => {
      txn.executeSql(
        `INSERT INTO places (title, imageUri, address,latitude,longitude) VALUES (?,?,?,?,?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.latitude,
          place.location.longitude,
        ],
        (_, result) => {
          console.log('Insert Query Result', result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places = [];
          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  latitude: dp.latitude,
                  longitude: dp.longitude,
                },
                dp.id,
              ),
            );
          }
          console.log('fetch query result', result);
          resolve(places);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
  return promise;
}

export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM places WHERE id=?`,
        [id],
        (_, result) => {
          console.log(result);
          const dbPlace = result.rows._array[0];
          const place = new Place(
            dbPlace.title,
            dbPlace.imageUri,
            {
              latitude: dbPlace.latitude,
              longitude: dbPlace.longitude,
              address: dbPlace.address,
            },
            dbPlace.id,
          );
          resolve(place);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
  return promise;
}
