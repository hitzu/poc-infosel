# POC Sistema bancario

Prueba tecnica para Infosel usando nodejs

<a href="https://gitmoji.dev">
  <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>

## Comenzando 🚀

Usando git en tu maquina local debes de clonar el proyecto y moverte a la rama dev.

```
git clone https://github.com/hitzu/poc-infosel.git
git checkout dev
```

Agregar en la raiz del proyecto los archivos de enviroment que fueron proporcionados via correo electronico.

### Pre-requisitos 📋

1. [NodeJs](https://nodejs.org/es/download/)

### Instalación 🔧

Usando el gestor de archivos [NPM](https://www.npmjs.com/) que viene incluido con nodejs y posicionando la consola en la raiz de proyecto vamos a installar todas las dependencias del proyecto usando el comando:

```
npm install
```

Esto nos generara la carpeta node_modules y el archivo package_lock.json

### Correr proyecto 🏃‍♂️

Usando los scripts que tenemos en el archivo packaje.json levantamos el proyecto con:

```
npm run start
```

## Definicion de rutas 🍻

1. login: permite obtener un token para hacer uso del sistema bancario:

```
POST
/auth/login
{
    "username" : "ales",
    "password" : "Ro250693"
}
```

2. getUser: nos permite obtener la informacion de la persona, su usuario y su cuentas bancarias

```
GET
user/:idUser
user/613ad150454eb932c1b50cf3
```

3. updateUser: podemos actualizar su informacion de contacto _Protegida por contraseña_

```
Put
user/personal-data
header[authorization] : token
{
    "person":{
        "phone" : "999999",
        "address" : "calle nardos h-6"
    }
}
```

4. createUser: podemos crear un usuario, persona y cuenta bancaria _Protegida por jwt_

```
Post
user
{
    "person":{
        "firstName" : "Aletvia",
        "lastName" : "Anaid",
        "phone" : "2225676867",
        "rfc" : "LELA930620",
        "address" : "San juan Cuautlancingo"
    },
    "user": {
        "username" : "ales",
        "password" : "Ro250693"
    },
    "account": {
        "product" : "Chequera",
        "nip" : 1234
    }
}
```

4. enable-disable-user: podemos inabilitar un usuario, _Protegida por jwt, si el usuario esta desabilitado, no podra logearse_

```
Put
/user/enable-disable
header[authorization] : token
```

Operaciones Bancarias 🏦

1. depositar: permite ingresar una cantidad a nuestra cuenta bancaria, _Protegida por jwt_

```
Post
transaction/deposit
header[authorization] : token
{
    "receivedAccount" : "613ad151454eb932c1b50cf6",
    "movementype": "Abono",
    "amount" : 2000,
    "concept" : "pago mensualidad",
    "reference" : "AF123412",
    "operation" : "SPEI",
    "status" : "Aprobado"
}
```

2. transferir: permite mover una cantidad de nuestra cuenta bancaria a otra seleccionada, _Protegida por jwt_

```
Post
transaction/transfer
header[authorization] : token
{
    "receivedAccount" : "613aa481e9b11ba6c56d46fa",
    "originAccount" : "613ad151454eb932c1b50cf6",
    "movementype": "Transferencia",
    "amount" : 2000,
    "concept" : "pa que no trabajes",
    "reference" : "AF123414",
    "operation" : "SPEI",
    "status" : "Aprobado"
}
```

## Documentacion 📖

Con el servidor levantado podras visitar la pagina /api-docs/ para visualizar la documentación

## Ejecutando las pruebas ⚙️

Usando los scripts que tenemos en el archivo packaje.json levantamos el proyecto con:

```
npm run test
```

Se ejecutara el contenido dentro de la carpeta test.

### Y las pruebas de estilo de codificación ⌨️

Usando el package [linter](https://www.npmjs.com/package/eslint) y apoyandonos de [NPM](https://www.npmjs.com/) podemos ejecutar el script que puede corregir el formato de codigo (cambiar " por ', poner , al final de un objeto json, poner ; al final de sentencias etc...) y señala los errores que no pueden ser corregidos automaticamente (variables no usadas etc...) usando el comando:

```
npm run lint-fix
```

## Construido con 🛠️

Las herramientas que utilizadas para este proyecto

- [NPM](https://www.npmjs.com/) Manejador de dependencias
- [Express](https://expressjs.com/) - framework que permite levantar un servidor rest
- [joi](https://www.npmjs.com/package/joi) - Validador de payload y response
- [joi-to-swagger](https://www.npmjs.com/package/joi-to-swagger) - Permite generar documentacion a partir de los archivos de validacion.
- [supertest](https://www.npmjs.com/package/supertest) Se usa para lanzar peticiones y brinda herramientas para hacer test automaticos
  _[jest](https://www.npmjs.com/package/jest) Permite lanzar test mediante comandos npm
  _[husky](https://www.npmjs.com/package/husky) Utilizando los hooks de git permite lanzar comados npm, en este caso pre-commit lanza npm run lint-fix para corregir errores de codigo y pre-push lanza npm run test para hacer los test automaticos.

## Autores ✒️

- **Roberto Guillermo Torres Lopez** - _Trabajo Inicial_ - [github](https://github.com/hitzu)

## Licencia 📄

Este proyecto está bajo la Licencia (ISC)

## Expresiones de Gratitud 🎁

- Gracias por la oportunidad.
