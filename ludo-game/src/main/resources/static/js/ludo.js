$(function() {

});

function onBoardLoad() {

};
var GLOBAL_CHANCE = 0;
function movePiece(piece) {
	var rollingInfo = $(piece).data('rollingInfo');
	if (!rollingInfo) return false;
	if ($(piece).parent().hasClass('square') && rollingInfo && rollingInfo.rolledValue === 6) {
		$(piece).data('startPos', $(piece).parent().prop('className'));
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
				$(piece).data('pos', 37);
				break;
			}
			case 4: {
				$('.r-start').append(piece);
				$(piece).parent().html();
				$(piece).data('pos', 55);
				break;
			}
			default: {
			}
		}
		$(piece).data('remDist', 56);
		adjustMultiplePieces(parseInt($(piece).data('pos')), piece);
		$('.btn-' + PIECE_CSS_CLASS[rollingInfo.chance]).prop('disabled', true);
		$('#roll-button').prop('disabled', false);
	} else {
		var currentPos = parseInt($(piece).data('pos'));
		var moveToPos = currentPos + parseInt(rollingInfo.rolledValue);
		var isEligibleToMove = false;
		var remainingDist = $(piece).data('remDist') - parseInt(rollingInfo.rolledValue);
		if (remainingDist >= 0) {
			isEligibleToMove = true;
			$(piece).data('remDist', remainingDist);
			if (remainingDist === 0) {
				var className = $(piece).data('startPos');
				$("." + className.replace(/\s/g, '.')).append("<i class=\"fas fa-check\" style=\"color: green;\"></i>");
				$('.btn-' + PIECE_CSS_CLASS[rollingInfo.chance]).prop('disabled', true);
				$('#roll-button').prop('disabled', false);
				$(piece).remove();
				isEligibleToMove = false;
				if ($(".box .square .fa-check").length !== 4) {
					GLOBAL_CHANCE = $(piece).data("rollingInfo").chance;
				}
			}
		}
		if (isEligibleToMove && ($("#" + moveToPos).hasClass('cells') && $("#" + moveToPos).is('.green, .yellow, .blue, .red'))
				|| ($("#" + (currentPos + 1)).hasClass('cells') && $("#" + (currentPos + 1)).is('.green, .yellow, .blue, .red'))) {
			if (!$('#' + moveToPos).hasClass(PIECE_COLORS[rollingInfo.chance])) {
				moveToPos = currentPos + 5 + rollingInfo.rolledValue
			}
		}
		if (moveToPos > 72) {
			moveToPos -= 72;
		}
		if (isEligibleToMove) {
			$('#' + moveToPos).append(piece);
			adjustMultiplePieces(currentPos, piece);
			adjustMultiplePieces(moveToPos, piece);
			$(piece).data('pos', moveToPos);
			$(piece).parent().html();
			$('.btn-' + PIECE_CSS_CLASS[rollingInfo.chance]).prop('disabled', true);
			$('#roll-button').prop('disabled', false);
		}
	}
}

function adjustMultiplePieces(pos, piece) {
	var children = $('#' + pos).children();
	$('#' + pos).find('button').removeAttr('style');
	if (children.length > 1) {
		$.each(children, function( index, child ) {
			var safePos = $(child).parent().attr('class');
			if ($(piece).data('rollingInfo').chance !== $(child).data('rollingInfo').chance
					&& !(safePos.includes('start') || safePos.includes('safe'))) {
				var className = $(child).data('startPos'); 
				$("." + className.replace(/\s/g, '.')).append(child);
				$(child).removeData();
				GLOBAL_CHANCE = $(piece).data('rollingInfo').chance;
			} else {
				var hasChildren = $("#" + pos).children();
				if (hasChildren.length > 1) {
					$(child).css("margin-top", "-" + 25 * (index + 1) + "px");
				}
			}
		});
	}
}

function rollDice() {
	$('#roll-view').find('img').remove();
	$('#loader').show();
	$.ajax({
		url : "rollDice/" + GLOBAL_CHANCE,
		cache : false,
		success : function(response) {
			setTimeout(() => {
				$('#loader').hide();
				$('#roll-view').append('<img alt="' + response.rolledValue + '" height="40px" src="http://roll.diceapi.com/images/poorly-drawn/d6/' + response.rolledValue + '.png"/>');
				isPlayerEligibleToMoveAnyPiece(response);
			}, 200);
			activatePieces(response);
			GLOBAL_CHANCE = 0;
		}
	});
}

function activatePieces(rollingInfo) {
	$('.btn-circle').prop('disabled', false);
	$('#roll-button').removeClass();
	switch (rollingInfo.chance) {
		case 1: {
			$('.btn-circle').not('.btn-success').prop('disabled', true);
			$('.btn-success').data('rollingInfo', rollingInfo);
			$('#roll-button').addClass('btn btn-outline-success');
			break;
		}
		case 2: {
			$('.btn-circle').not('.btn-warning').prop('disabled', true);
			$('.btn-warning').data('rollingInfo', rollingInfo);
			$('#roll-button').addClass('btn btn-outline-warning');
			break;
		}
		case 3: {
			$('.btn-circle').not('.btn-primary').prop('disabled', true);
			$('.btn-primary').data('rollingInfo', rollingInfo);
			$('#roll-button').addClass('btn btn-outline-primary');
			break;
		}
		case 4: {
			$('.btn-circle').not('.btn-danger').prop('disabled', true);
			$('.btn-danger').data('rollingInfo', rollingInfo);
			$('#roll-button').addClass('btn btn-outline-danger');
			break;
		}
		default: {
		}
	}
}

function isPlayerEligibleToMoveAnyPiece(rollingInfo) {
	var children = $('.box .btn-' + PIECE_CSS_CLASS[rollingInfo.chance]);
	var count = 0;
	$.each(children, function( index, child ) {
		  var isNotAbleToMove = !$(child).data('remDist') && (rollingInfo.rolledValue !== 6);
		  var isExceedingLastCellValue = $(child).data('remDist') && ($(child).data('remDist') < rollingInfo.rolledValue);
		  if (isNotAbleToMove || isExceedingLastCellValue) {
			  ++count;
		  }
	});
	if (count !== 4) {
		$('#roll-button').prop('disabled', true);
	}
}

const PIECE_COLORS = {
	1 : "green",
	2 : "yellow",
	3 : "blue",
	4 : "red"
}

const PIECE_CSS_CLASS = {
	1 : "success",
	2 : "warning",
	3 : "primary",
	4 : "danger"
}