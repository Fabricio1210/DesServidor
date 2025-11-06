import { suma, resta, multiplica, divide } from '../app/operation/utils';

describe('Pruebas de operaciones matematicas', () => {
    test('suma de dos números', () => {
        expect(suma(3, 7)).toBe(10);
    });

    test('resta de dos numeros', () => {
        expect(resta(10, 3)).toBe(7);
    });

    test('multiplicacion de dos numeros', () => {
        expect(multiplica(4, 5)).toBe(20);
    });

    test('division valida', () => {
        expect(divide(20, 4)).toBe(5);
    });
});
