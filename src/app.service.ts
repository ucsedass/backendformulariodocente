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
    try {
      let consulta = 'select * from ContactosDocentes';
      await sql.connect(config);
      const result = await sql.query(consulta);
      return result.recordsets[0];
    } catch (error) {
      return error;
    }
  }
}
