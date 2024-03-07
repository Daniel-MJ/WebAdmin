export interface Insputssearch {
    titulo: string;
    tipo: string;
    fechaInicio: {
        $date: Date; // Puedes ajustar el tipo de $date según el formato real
      };
    fechaFinal: {
        $date: Date; // Puedes ajustar el tipo de $date según el formato real
    };
    ponente: string[];
    organizador: string[];
    lugar: string;
    limiteAsistentes: number;
    enlaceInformacion: string;
    enlaceInscripcion: string;
    descripcion: string;
    categoria: string[];
}
