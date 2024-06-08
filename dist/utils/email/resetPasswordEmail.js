"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_enviroment_1 = require("../../enviroments/app.enviroment");
const email_1 = require("./email");
const sendResetPassowrdEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, url }) {
    try {
        // Configurar el objeto de correo electrónico con contenido HTML
        const mailOptions = {
            from: app_enviroment_1.EMAIL_USER,
            to,
            subject: 'Restablecer contraseña',
            html: `
        <html>
          <head>
            <style>
              /* Estilos CSS para el correo electrónico */
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333333;
              }
              p {
                margin-bottom: 20px;
                line-height: 1.6;
              }
              a {
                color: #007bff;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1> Cambio de contraseña </h1>
              <p>
                Hola,<br><br>
                Aquí tienes el enlace para restablecer tu contraseña:
                <br>
                <a href="${url}">Restablecer contraseña</a>
                <br><br>
                ¡Gracias!
              </p>
            </div>
          </body>
        </html>
      `,
        };
        // Enviar el correo electrónico
        const info = yield email_1.transporter.sendMail(mailOptions);
        console.log('Correo electrónico enviado:', info.response);
        return info.response;
    }
    catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        throw new Error('Error al enviar el correo electrónico');
    }
});
exports.default = sendResetPassowrdEmail;
