"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseUrl = void 0;
const getBaseUrl = (req) => {
    const protocol = req.protocol; // Obtener el protocolo (http o https)
    const hostname = req.get('host'); // Obtener el nombre del host
    return `${protocol}://${hostname}`;
};
exports.getBaseUrl = getBaseUrl;
