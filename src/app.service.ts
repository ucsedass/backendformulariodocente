import { Injectable } from '@nestjs/common';
require('tls').DEFAULT_MIN_VERSION = 'TLSv1';
var sql = require('mssql');
var config = {
  user: 'devConceptos',
  password: 'qwerty',
  server: 'sgo-desarrollo',
  database: 'GestionConceptos',

  options: {
    trustedConnection: true,
    encrypt: false, // modifique a false para que no me de error de certificado
    enableArithAbort: true,
    trustServerCertificate: false,
  },
};

@Injectable()
export class AppService {
  getHello(): string {
    let a;
    return 'LLEGO AL SERVICIO________  _________';
  }

  async newFormulario(data) {
    console.log('PARAMETROS:', data);
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input('dni', sql.Int, parseInt(data.dni))
      .input('nombre', sql.VarChar(61), data.nombre)
      .input('apellido', sql.VarChar(61), data.apellido)
      .input('sede', sql.VarChar(61), data.sede)
      .input('tienecorreo', sql.VarChar(3), data.correo)
      .input('correopersonal', sql.VarChar(100), data.correoPersonal)
      .input('correoinstitucional', sql.VarChar(100), data.correoInstitucional)
      .input('correoalternativo', sql.VarChar(100), data.correoAlternativo)
      .input('referenciaacademica', sql.VarChar(500), data.referenciaAcademica)
      .input('celularcodarea', sql.Int, parseInt(data.celCodArea))
      .input('celularnro', sql.Int, parseInt(data.celular))
      .execute('sp_newFormularioDocente')
      .catch((err) => {
        console.log('error', err);
        return err;
      });

    return result;
  }
}
