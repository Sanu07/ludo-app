$(function () {

});

function onBoardLoad() {

};

function movePiece(piece) {
    var rollingInfo = $(piece).data('rollingInfo');
    if ($(piece).parent().hasClass('square') && rollingInfo.rolledValue === 6) {
        switch (rollingInfo.chance) {
            case 1: {
                $('.g-start').append(piece);
                $(piece).parent().html();
                $(piece).data('pos', 1);
                break;
            }
            case 2: {
                $('.y-start').append(piece);
                $(piece).parent().html();
                $(piece).data('pos', 19);
                break;
            }
            case 3: {
                $('.b-start').append(piece);
                $(piece).parent().html();
                $(piece).data('pos', 40);
                break;
            }
            case 4: {
                $('.r-start').append(piece);
                $(piece).parent().html();
                $(piece).data('pos', 55);
                break;
            }
            default: { }
        }
    } else {
        var currentPos = parseInt($(piece).data('pos'));
        var moveToPos = currentPos + parseInt(rollingInfo.rolledValue);
        $('#' + moveToPos).append(piece);
        $(piece).data('pos', moveToPos);
        $(piece).parent().html();
    }
}

function rollDice() {
    $.ajax({
        url: "rollDice",
        cache: false,
        success: function (response) {
            $('#rolled-value').find('h2').text(response.rolledValue);
            activatePieces(response);
        }
    });
}

function activatePieces(rollingInfo) {
    $('.btn-circle').prop('disabled', false);
    switch (rollingInfo.chance) {
        case 1: {
            $('.btn-circle').not('.btn-success').prop('disabled', true);
            $('.btn-success').data('rollingInfo', rollingInfo);
            break;
        }
        case 2: {
            $('.btn-circle').not('.btn-warning').prop('disabled', true);
            $('.btn-warning').data('rollingInfo', rollingInfo);
            break;
        }
        case 3: {
            $('.btn-circle').not('.btn-primary').prop('disabled', true);
            $('.btn-primary').data('rollingInfo', rollingInfo);
            break;
        }
        case 4: {
            $('.btn-circle').not('.btn-danger').prop('disabled', true);
            $('.btn-danger').data('rollingInfo', rollingInfo);
            break;
        }
        default: { }
    }
}