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
    return 'LLEGO AL SERVICIO_________________';
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
      .execute('sp_newFormularioDocente')
      .catch((err) => {
        console.log(err);
        return err;
      });

    return result;
  }
}
