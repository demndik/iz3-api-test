(function () {

    const protocol = 'http://';
    const domain = 'localhost';
    const port = ':3015';
    const appURL = protocol + domain + port;

    $('#deploy-contract').on('submit', function (e) {
        e.preventDefault();
        let button = $('button', this);
        let result = $('#result', this);
        let data = {
            source: ($('#code', this).val() || false),
            resourceRent: ($('#resources', this).val() || false)
        };
        button.attr('disabled', true);
        result.html('');
        $.ajax({
            url: appURL + '/contracts/ecma/deployContract',
            method: 'POST',
            data: data,
        })
            .always(function (resp) {
                result.html(`${toBeautyfyJSON(resp)}`);
                button.attr('disabled', false);
            });
    });

    $('#deploy-method').on('submit', function (e) {
        e.preventDefault();
        let button = $('button', this);
        let result = $('#result', this);
        let contractAddress = $('#address', this).val() || false;
        let contractMethod = $('#method', this).val() || false;
        let methodParams = $('#params', this).val() || [];

        button.attr('disabled', true);
        result.html('');
        $.ajax({
            url: appURL + '/contracts/ecma/deployMethod/' + contractAddress + '/' + contractMethod,
            method: 'POST',
            data: {'argsEncoded': JSON.stringify(methodParams)},
        })
            .always(function (resp) {
                result.html(`${toBeautyfyJSON(resp)}`);
                button.attr('disabled', false);
            });
    });

    $('#call-method').on('submit', function (e) {
        e.preventDefault();
        let button = $('button', this);
        let result = $('#result', this);
        let contractAddress = $('#address', this).val() || false;
        let contractMethod = $('#method', this).val() || false;
        let methodParams = $('#params', this).val() || [];

        button.attr('disabled', true);
        result.html('');
        $.ajax({
            url: appURL + '/contracts/ecma/callMethod/' + contractAddress + '/' + contractMethod,
            method: 'POST',
            data: {'argsEncoded': JSON.stringify(methodParams)},
        })
            .always(function (resp) {
                result.html(`${toBeautyfyJSON(resp)}`);
                button.attr('disabled', false);
            });
    });

    $('#get-info').on('submit', function (e) {
        e.preventDefault();
        let button = $('button', this);
        button.attr('disabled', true);
        $.ajax({
            url: appURL + '/contracts/ecma/getInfo',
            method: 'GET',
            dataType: 'json',
        })
            .always(function (resp) {
                button.attr('disabled', false);
            });
    });

    let toBeautyfyJSON = function (data) {
        try {
            data = JSON.stringify(data, undefined, 2);
        } catch (e) {

        }
        return data;
    };
})();