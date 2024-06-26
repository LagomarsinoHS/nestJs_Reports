import { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { PRODUCTS } from './products.reports';
import { Formatter } from 'src/helpers/formatter';

const LOGO: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 120,
};

const STYLES: StyleDictionary = {
  h1: {
    fontSize: 20,
    bold: true,
    margin: [0, 5],
  },
  h2: {
    bold: true,
    fontSize: 16,
  },
  h3: {
    bold: true,
    fontSize: 14,
  },
};

const HEADER: Content = {
  text: 'Bill Report',
  alignment: 'right',
  margin: [10, 10],
};

const FOOTER: Content = {
  text: 'Generated by Mister L.',
  alignment: 'right',
  margin: [10, 10],
};

const CLIENT_DATA: Content[] = [
  { columns: [{ text: 'Cobrar a:', style: 'h3' }] },
  { columns: ['John Doe'] },
  { columns: ['Razón Social: John Doe Cop.'] },
  { columns: ['BN: 123456789'] },
];

export const billReport = (): TDocumentDefinitions => {
  const subTotal = PRODUCTS.reduce((acc, ele) => acc + ele.Total, 0);
  const granTotal = subTotal * 1.16;

  return {
    header: HEADER,
    footer: FOOTER,
    content: [
      LOGO,
      { text: 'Tucan Code', style: 'h1' }, // Puedo agregar una linea sola, sin ninguna costumización, o abrir un objeto y especificar cosas, como el estilo

      // Dirección de la Empresa e información
      {
        columns: [
          { text: '15 Montgomery St.', style: 'h3' },
          { text: 'Bill Number: 123456', bold: true, alignment: 'right' },
        ],
      },
      {
        columns: [
          'San Francisco, CA 94104',
          { text: `Date: ${Formatter.getDate()}`, alignment: 'right' },
        ],
      },
      {
        columns: [
          'BN: 123456789',
          {
            text: `Due Date: ${Formatter.getDate()}`,
            alignment: 'right',
          },
        ],
      },
      { columns: [{ text: 'www.google.com', link: 'https://www.google.com' }] }, // Para agregar un link se debe usar la key "link"

      // Código QR con la dirección
      {
        qr: 'www.google.com',
        fit: 100,
        alignment: 'right',
      },

      // Datos del Cliente
      CLIENT_DATA,

      // Tabla con los datos
      {
        margin: [0, 20],
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Producto', 'Precio', 'Cantidad', 'Total'],
            ...PRODUCTS.map((p) => [
              p.Id,
              p.Producto,
              Formatter.currency(p.Precio),
              p.Cantidad,
              {
                text: Formatter.currency(p.Total),
                bold: true,
                alignement: 'right',
              },
            ]),
            [{}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}],
            [{}, {}, {}, { text: 'SubTotal:' }, { text: subTotal, bold: true }],
            [
              {},
              {},
              {
                text: 'Gran Total:',
                fillColor: 'black',
                color: 'white',
                colSpan: 2,
                margin: [5, 5],
              },
              {},
              {
                text: granTotal,
                bold: true,
                fillColor: 'black',
                color: 'white',
                margin: [5, 5],
              },
            ],
          ],
        },
      },
    ],

    // Estilo
    styles: STYLES, // Aquí le indico que usará los estilos definidos en la constante de arriba
  };
};
