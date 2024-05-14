import axios from "axios";
import config from '@/../public/config.json';

const apiUrl = config.BASE_URL_SIS_API;

const obtenerRegistroCambios = async () => {
    try {
        const response = await axios.get(apiUrl + "/ControllerFrontEnd/ObtenerRegistroCambios");
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            console.error('Error al obtener el registro de las tablas:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener el registro de las tablas:', error);
        return null;
    }
}

const obtenerDepartamentos = async () => {
    try {
        const response = await axios.get(apiUrl + "/ControllerFrontEnd/ObtenerDepartamentos");
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            console.error('Error al obtener el registro de los departamentos', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener el registro de las tablas:', error);
        return null;
    }
}

const obtenerTrabajos = async () => {
    try {
        const response = await axios.get(apiUrl + "/ControllerFrontEnd/ObtenerTrabajos");
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            console.error('Error al obtener el registro de los trabajos', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener el registro de las tablas:', error);
        return null;
    }
}

const ObtenerUnidades = async () => {
    try {
        const response = await axios.get(apiUrl + "/ControllerFrontEnd/ObtenerUnidades");
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            console.error('Error al obtener el registro de las unidades', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener el registro de las tablas:', error);
        return null;
    }
}



export default {    
    obtenerRegistroCambios,
    obtenerDepartamentos,
    obtenerTrabajos,
    ObtenerUnidades,
}