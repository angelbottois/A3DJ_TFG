export interface Cliente {
    idUsuario: string,
    correo: string,
    nombre: string,
    apellidos: string,
    fotoPerfil: string,
    activo: boolean,
    hashPass: string,
    planSocios: string,
    planActivo: boolean
}

export interface Supervisor {
    idUsuario: string,
    correo: string,
    nombre: string,
    apellidos: string,
    fotoPerfil: string,
    activo: boolean,
    hashPass: string
    administrador: boolean
}

export interface Hora {
    id: number,
    hora: string
}