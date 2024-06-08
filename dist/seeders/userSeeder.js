"use strict";
// userSeeder.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const users_model_1 = __importDefault(require("../models/users.model"));
const app_enviroment_1 = require("../enviroments/app.enviroment");
function seedAdminUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!app_enviroment_1.DB_URI) {
                console.log('\x1b[31m', 'No database URI provided', '\x1b[0m');
                return;
            }
            yield mongoose_1.default.connect(app_enviroment_1.DB_URI);
            const adminData = {
                username: 'Admin Root',
                email: 'root@test.io',
                password: '12345678',
                role: 'ADMIN',
            };
            const adminUser = yield users_model_1.default.create(adminData);
            console.log('Usuario administrador creado con éxito:', adminUser);
        }
        catch (error) {
            console.error('Error al crear el usuario administrador:', error);
        }
        finally {
            yield mongoose_1.default.disconnect();
        }
    });
}
// Ejecutar la función para crear el usuario administrador
seedAdminUser();
