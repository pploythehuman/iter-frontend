import { handleResponse } from '../api';
import axios from 'axios';
import { GeoJsonObject } from 'geojson';


const api = axios.create( {
    baseURL: "https://api.openrouteservice.org/v2/"
});

interface position {
    lat: number;
    lng: number;
}

export const getDirection = async (data?: number[][]) => {
    if (data == undefined) {
        data = []
    }
    console.log({coordinates: data})
    return handleResponse(api.post<GeoJsonObject>("/directions/driving-car/geojson", {coordinates: data}, {
        headers: {
            Authorization: '5b3ce3597851110001cf6248df19b7fa07f4487f9c1b9426b84f6d36'
            // Authorization: process.env.OPENROUTE_KEY as string
        }
    }));
};