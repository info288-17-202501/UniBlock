# UniBlock: Un Sistema de Votacion basado en Blockchain
Repositorio del equipo VTeam 7 para el curso INFO288: Sistemas Distribuidos. Este repositorio contiene el código fuente de nuestro sistema de votación universitaria basado en blockchain, diseñado para garantizar seguridad, transparencia e integridad en los procesos electorales.

# Integrantes

- <a href="https://github.com/fcordovav">Felipe Córdova</a>
- <a href="https://github.com/CreativeSelf1">Fernando Castillo</a>
- <a href="https://github.com/Lukayx">Fernando Inzulza</a>
- <a href="https://github.com/cperez17">Cristóbal Pérez</a>
- <a href="https://github.com/JuanElPro7">Juan Santana</a>

# Manual de Instalación
A continuación se presentan los pasos para instalar nuestro sistema de votación en su máquina localmente.

## Instalar Git

Instalar Git para poder gestionar el código fuente del proyecto y establecer una vinculación con el repositorio remoto.
- Git: https://git-scm.com/downloads

Una vez que Git esté instalado, se debe clonar el repositorio en el directorio local. Esto permitirá obtener una copia del código en tu computadora para visualizarlo y ejecutar la página.
- Comando:
```git clone https://github.com/info288-17-202501/UniBlock.git```

## Instalar Node

Instalar Node.js para gestionar dependencias y compilación.
- Nodejs: https://nodejs.org/en/

Nota: El lenguaje principal de nuestro trabajo es JavaScript, el cual por defecto viene incluido al instalar Node.js

## Instalar dependencias para blockchain

```
cd blockchain
npm install
```

## Instalar dependencias para backend

```
cd backend
npm install
```

## Instalar dependencias para frontend

```
cd frontend
npm install
```

Ya con todo instalado, es hora de ejecutar de iniciar el servidor.

## Iniciar backend

```
cd backend
npm run dev
```

## Iniciar frontend

```
cd frontend
npm run dev
```


