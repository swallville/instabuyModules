"use strict";
var FieldValidation = (function () {
    function FieldValidation() {
    }
    FieldValidation.MatchPassword = function (AC) {
        var password = AC.get('password').value; // to get value in input tag
        var confirmPassword = AC.get('repeat_password').value; // to get value in input tag
        if (password != confirmPassword) {
            AC.get('repeat_password').setErrors({ MatchPassword: true });
        }
        else {
            return null;
        }
    };
    FieldValidation.ValidateCNPJ = function (control) {
        var cnpj = control.value; // to get value in input tag
        if (cnpj == undefined) {
            cnpj = '';
        }
        if (FieldValidation.isCNPJValid(cnpj)) {
            return null;
        }
        else {
            return { ValidateCNPJ: false };
        }
    };
    FieldValidation.isCNPJValid = function (cnpj) {
        cnpj = cnpj.toString().replace(/[^\d]+/g, "");
        if (cnpj == '') {
            return false;
        }
        if (cnpj.length != 14) {
            return false;
        }
        // Elimina CNPJs invalidos conhecidos
        if (cnpj == '00000000000000' ||
            cnpj == '11111111111111' ||
            cnpj == '22222222222222' ||
            cnpj == '33333333333333' ||
            cnpj == '44444444444444' ||
            cnpj == '55555555555555' ||
            cnpj == '66666666666666' ||
            cnpj == '77777777777777' ||
            cnpj == '88888888888888' ||
            cnpj == '99999999999999') {
            return false;
        }
        // Valida DVs
        var tamanho = cnpj.length - 2;
        var numeros = cnpj.substring(0, tamanho);
        var digitos = cnpj.substring(tamanho);
        var soma = 0;
        var pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            return false;
        }
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            return false;
        }
        return true;
    };
    FieldValidation.ValidateCPF = function (control) {
        var cpf = control.value;
        if (cpf == '' || cpf == null) {
            return { ValidateCNPJ: false };
        }
        cpf = cpf.toString().replace(/[^\d]+/g, "");
        if (cpf.length != 11) {
            return { ValidateCNPJ: false };
        }
        var numeros, digitos, soma, i, resultado, digitos_iguais;
        digitos_iguais = 1;
        if (cpf.length < 11)
            return { ValidateCNPJ: false };
        for (i = 0; i < cpf.length - 1; i++)
            if (cpf.charAt(i) != cpf.charAt(i + 1)) {
                digitos_iguais = 0;
                break;
            }
        if (!digitos_iguais) {
            numeros = cpf.substring(0, 9);
            digitos = cpf.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return { ValidateCNPJ: false };
            numeros = cpf.substring(0, 10);
            soma = 0;
            for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return { ValidateCNPJ: false };
            return null;
        }
        else
            return { ValidateCNPJ: false };
    };
    FieldValidation.ValidatePhone = function (control) {
        var phone = control.value;
        if (phone == '' || phone == null) {
            return { ValidatePhone: false };
        }
        phone = phone.toString().replace(/[^\d]+/g, "");
        if (phone.length != 11) {
            return { ValidatePhone: false };
        }
        // Elimina CNPJs invalidos conhecidos
        if (phone == '00000000000' ||
            phone == '11111111111' ||
            phone == '22222222222' ||
            phone == '33333333333' ||
            phone == '44444444444' ||
            phone == '55555555555' ||
            phone == '66666666666' ||
            phone == '77777777777' ||
            phone == '88888888888' ||
            phone == '99999999999') {
            return { ValidatePhone: false };
        }
    };
    return FieldValidation;
}());
exports.FieldValidation = FieldValidation;
