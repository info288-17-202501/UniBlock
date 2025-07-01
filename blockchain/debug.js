// debug-blockchain.js
const fs = require('fs');
const { cargarClaves } = require('./blockchain/crypto-utils');
const validadores = require('./blockchain/validadores');
const Block = require('./blockchain/block');
const Blockchain = require('./blockchain/blockchain');

console.log('=== DIAGNÓSTICO COMPLETO ===\n');

// 1. Verificar claves
const claves = cargarClaves('./node/keypair.json');
console.log('1. CLAVES:');
console.log('   ✅ Clave en keypair coincide con validadores:', claves.publicKey.trim() === validadores[0].trim());

// 2. Verificar cadena actual
if (fs.existsSync('./cadena.json')) {
    const cadena = JSON.parse(fs.readFileSync('./cadena.json'));
    console.log('\n2. CADENA EXISTENTE:');
    console.log('   - Número de bloques:', cadena.length);
    
    cadena.forEach((bloque, i) => {
        console.log(`\n   BLOQUE ${i}:`);
        console.log('   - Index:', bloque.index);
        console.log('   - PublicKey presente:', !!bloque.publicKey);
        console.log('   - Hash propio:', bloque.hashPropio?.substring(0, 16) + '...');
        console.log('   - Firma presente:', !!bloque.firmaDigital);
        
        if (i > 0) {
            // Verificar si la clave está en validadores
            const estaAutorizada = validadores.includes(bloque.publicKey);
            console.log('   - Clave autorizada:', estaAutorizada);
            
            if (!estaAutorizada) {
                console.log('   - Clave del bloque vs primera clave validador:');
                console.log('     Longitudes:', bloque.publicKey.length, 'vs', validadores[0].length);
                console.log('     Son iguales con trim:', bloque.publicKey.trim() === validadores[0].trim());
            }
        }
    });
} else {
    console.log('\n2. No existe cadena.json');
}

// 3. Crear y validar un bloque de prueba
console.log('\n3. PRUEBA DE CREACIÓN DE BLOQUE:');
const blockchain = new Blockchain();

// Si no hay cadena, crear génesis
if (blockchain.cadena.length === 0) {
    console.log('   - Creando bloque génesis...');
    blockchain.crearGenesis(claves.publicKey, claves.privateKey);
}

// Crear bloque de prueba
const ultimo = blockchain.obtenerUltimoBloque();
console.log('   - Último bloque index:', ultimo.index);

const bloqueTest = new Block(
    ultimo.index + 1,
    new Date().toISOString(),
    'TEST',
    [{ opcion: 'TEST', timestamp: new Date().toISOString() }],
    ultimo.hashPropio,
    claves.publicKey
);

bloqueTest.firmarBloque(claves.privateKey);

console.log('   - Bloque test creado:');
console.log('     Index:', bloqueTest.index);
console.log('     Hash:', bloqueTest.hashPropio.substring(0, 16) + '...');
console.log('     PublicKey coincide:', bloqueTest.publicKey === claves.publicKey);
console.log('     Está en validadores:', validadores.includes(bloqueTest.publicKey));

// 4. Intentar agregar el bloque
console.log('\n4. INTENTANDO AGREGAR BLOQUE:');
const exito = blockchain.agregarBloque(bloqueTest);
console.log('   - Resultado:', exito ? '✅ ÉXITO' : '❌ FALLÓ');

// 5. Validar cadena manualmente
console.log('\n5. VALIDACIÓN MANUAL:');
const esValida = blockchain.esCadenaValida();
console.log('   - Cadena válida:', esValida ? '✅ SÍ' : '❌ NO');