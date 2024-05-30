import axios from "axios";
import config from '@/../public/config.json';

const apiUrl = config.BASE_URL_SIS_API;

const ObtenerRegistroCambios = async () => {
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

const ObtenerDepartamentos = async () => {
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

const ObtenerTrabajos = async () => {
    try {
        const response = await axios.get(apiUrl + "/ControllerFrontEnd/ObtenerJobs");
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
        const response = await axios.get(apiUrl + "/ControllerFrontEnd/ObtenerUnidadesNegocio");
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

/* const ObtenerFaltantes = async () => {
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
} */

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

const ObtenerEntidades = async () => {
    try {
        const response = await axios.get(apiUrl + "/ControllerFrontEnd/ObtenerEntidades");
        if(response.status === 200 && response.data) {
            return response.data;
        } else {
            console.error('Error al obtener la lista de entidades legales', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener las entidades legales: ', error)
    }
}

const ObtenerLocations = async () => {
    try {
        const response = await axios.get(apiUrl + "/ControllerFrontEnd/ObtenerLocations");
        if(response.status === 200 && response.data) {
            return response.data;
        } else {
            console.error('Error al obtener la lista de localizaciones', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener las localizaciones: ', error)
    }
}

const ObtenerPositions = async () => {
    try {
        const response = await axios.get(apiUrl + "/ControllerFrontEnd/ObtenerPositions");
        if(response.status === 200 && response.data) {
            return response.data;
        } else {
            console.error('Error al obtener la lista de posiciones', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener las posiciones: ', error)
    }
}

const ObtenerGrades = async () => {
    try {
        const response = await axios.get(apiUrl + "/ControllerFrontEnd/ObtenerGrades");
        if(response.status === 200 && response.data) {
            return response.data;
        } else {
            console.error('Error al obtener la lista de grados', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener los grados: ', error)
    }
}

const ObtenerJuegosComunes = async () => {
    try {
        const response = await axios.get(apiUrl + "/ControllerJuegosComunes/GetAllData");
        if(response.status === 200 && response.data) {
            return response.data;
        } else {
            console.error('Error al obtener la lista de juegos comunes', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener los juegos comunes: ', error)
    }
}


export default {    
    ObtenerRegistroCambios,
    ObtenerDepartamentos,
    ObtenerTrabajos,
    ObtenerUnidades,
    /* ObtenerFaltantes, */
    ObtenerModelosTabla,
    ObtenerErrores,
    ObtenerEntidades,
    ObtenerLocations,
    ObtenerPositions,
    ObtenerGrades,
    ObtenerJuegosComunes
}