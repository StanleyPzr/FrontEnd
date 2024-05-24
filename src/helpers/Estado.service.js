import axios from "axios";
import config from '@/../public/config.json';

const apiUrl = config.BASE_URL_SIS_API;

const obtenerRegistroCambios = async () => {
    try {
        const response = await axios.get(apiUrl + "/ControllerFrontEnd/ObtenerRegistroCambios");
        if (response.status === 200 && response.data) {
            console.log(response.data)
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

const ObtenerFaltantes = async () => {
    try {
        const response = await axios.get(apiUrl + "/ControllerFrontEnd/ObtenerDepartamentosFaltantes");
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

const ObtenerModelosTabla = async () => {
    try {
        const response = await axios.get(apiUrl + "/ControllerFrontEnd/ObtenerTipoModelo");
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            console.error('Error al obtener las tablas y sus modelos', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener el registro de las tablas:', error);
        return null;
    }
}

const ObtenerErrores = async () => {
    try {
        const response = await axios.get(apiUrl + "/ControllerFrontEnd/ObtenerErrores");
        if(response.status === 200 && response.data) {
            return response.data;
        } else {
            console.error('Error al obtener la lista de errores', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener el registro de errores: ', error)
    }
}


export default {    
    obtenerRegistroCambios,
    obtenerDepartamentos,
    obtenerTrabajos,
    ObtenerUnidades,
    ObtenerFaltantes,
    ObtenerModelosTabla,
    ObtenerErrores
}