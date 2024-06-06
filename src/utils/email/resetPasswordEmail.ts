import { EMAIL_USER } from '../../enviroments/app.enviroment';
import { transporter } from './email';

type SendResetPassowrdEmailT = {
  to: string;
  url: string;
};

const sendResetPassowrdEmail = async ({ to, url }: SendResetPassowrdEmailT) => {
  try {
    // Configurar el objeto de correo electrónico con contenido HTML
    const mailOptions = {
      from: EMAIL_USER,
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
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.response);
    return info.response;
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw new Error('Error al enviar el correo electrónico');
  }
};

export default sendResetPassowrdEmail;
