import { expect } from 'chai';
import { Pacient } from '../../src/pacient.js';
//importamos el sinon 
import sinon from 'sinon';

describe('Pacient — proves unitàries', function () {
  let pacient;
  //usamos el usefaketimers 
  it('calcula l’edat respecte a hui usant el rellotge simulat', function () {
    const rellotge = sinon.useFakeTimers(new Date(2030, 0, 1));

    try {
        const pacient = new Pacient(
            'Laia',
            'Ferrer Soler',
            '16/03/1988'
        );

        expect(pacient.obtenirEdat()).to.equal(41);
    } finally {
        rellotge.restore();
    }
});


  beforeEach(function () {
    pacient = new Pacient('Laia', 'Ferrer Soler', '16/03/1988');
  });

  it('saludar() retorna «Hola, soc Laia Ferrer Soler»', function () {
    expect(pacient.saludar()).to.equal('Hola, soc Laia Ferrer Soler');
  });

  it('obtenirNom() i modificarNom()', function () {
    expect(pacient.obtenirNom()).to.equal('Laia');
    pacient.modificarNom('Marta');
    expect(pacient.obtenirNom()).to.equal('Marta');
  });

  it('obtenirCognoms() i modificarCognoms()', function () {
    pacient.modificarCognoms('Ribes Mas');
    expect(pacient.obtenirCognoms()).to.equal('Ribes Mas');
  });

  it('accepta la data com a text dd/mm/aaaa', function () {
    const d = pacient.obtenirDataNaixement();
    expect(d).to.be.instanceOf(Date);
    expect([d.getDate(), d.getMonth() + 1, d.getFullYear()])
      .to.deep.equal([16, 3, 1988]);
  });

  describe('obtenirEdat() amb data de referència fixa', function () {
    it('el dia abans de l\'aniversari encara té 37 anys', function () {
      expect(pacient.obtenirEdat(new Date(2026, 2, 15))).to.equal(37);
    });

    it('el dia de l\'aniversari ja en té 38', function () {
      expect(pacient.obtenirEdat(new Date(2026, 2, 16))).to.equal(38);
    });

    it('després de modificar la data de naixement', function () {
      pacient.modificarDataNaixement('29/02/2000');
      expect(pacient.obtenirEdat(new Date(2026, 9, 5))).to.equal(26);
    });
  });

  it('té una bàscula associada per defecte', function () {
    expect(pacient.obtenirBascula()).to.exist;
    expect(pacient.calcularIMC()).to.equal(0);
  });
  //prueba necesaria para cubrir la actividad 2
  it('accepta la data de naixement com a objecte Date', function () {
    const data = new Date(1988, 2, 16);
    const pacient = new Pacient('Laia', 'Ferrer Soler', data);

    expect(pacient.obtenirDataNaixement()).to.equal(data);
});
//prueba necesaria para cubrir la actividad 2 
it('modificarDataNaixement() accepta un objecte Date', function () {
    const data = new Date(1990, 5, 10);

    pacient.modificarDataNaixement(data);

    expect(pacient.obtenirDataNaixement()).to.equal(data);
});

//añadida la prueba
it('rebutja un nom buit', function () {
  expect(() => new Pacient('', 'Ferrer Soler', '16/03/1988'))
    .to.throw();
});

it('rebutja una data futura', function () {
  expect(() => new Pacient('Laia', 'Ferrer Soler', '01/01/2030'))
    .to.throw();
});

});
