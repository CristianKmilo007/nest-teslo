<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrolo

1. Clonar el repositorio

2. Ejecutar
```
npm i
```

3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Clonar el archivo __.env.template__ y renombrar la copia a __.env__

5. Cambiar las variables de entorno definidas en el __.env__

6. Levantar la base de datos
```
docker-compose up -d
```

7. Ejecutar la aplicacion en dev
```
npm run start:dev
```

8. Reconstruir base de datos con la semilla
```
http://localhost:3100/api/seed
```