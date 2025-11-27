# Aplicación de Carta a Santa 
Esta aplicación es un servicio backend de Node.js y Express que sirve un formulario simple y utiliza Nodemailer para procesar la solicitud y enviar el contenido de la carta a una dirección de correo específica.

## Como hacerla funcionar

Crea un archivo llamado .env en la raiz del proyecto para configurar las credenciales SMTP.

```bash
PORT=3000

# HOST: Servidor SMTP (ej: smtp.gmail.com)
EMAIL_HOST=smtp.gmail.com

# PORT: Puerto de conexión.
EMAIL_PORT=587 

# USER: Correo del remitente.
EMAIL_USER=tu.correo.de.remitente@ejemplo.com

# PASSWORD: Contraseña de Aplicación/Token del servidor.
EMAIL_PASSWORD=el_token_o_password_de_aplicacion
```

Luego deberas ejecutar la aplicaicon dirgiendote a la crpeta con el siguiente comando:

```bash
cd /carpeta destino

npm run dev
```

Abre tu navegador y navega a la URL base:
```bash
http://localhost:3000/
```

Rellena el formulario y presiona el boton de la parte de abajo para mandarlo y Listo!