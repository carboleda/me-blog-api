Backend que expone un API Rest basada en firebase-functions para proveer la información necesaria para el proyecto [me-blog](https://github.com/carboleda/me-blog).

```shell
cd me-blog-api/functions
```

## Deploy all functions
```shell
firebase deploy --only functions
```

## Deploy specific functions
```shell
firebase deploy --only functions:me
```

## Generate data
Ejecuta funciones que hacer el scraping y genera archivos json que serán servidos a través de las firebase funcions
Esto se hace ya que para cuentas free el trafico de salida está restrigido solo a servicios de Google
```shell
npm run generate
```

## Run locally
```shell
firebase emulators:start
```