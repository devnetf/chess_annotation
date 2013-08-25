/* 
 Document   : chess_annotation.js
 Created on : 15-Jun-2013, 12:32:52 PM
 Author     : Shao Hang He
 Description: core Javascript File for Module chess_annotation
 */
jQuery(document).ready(function()
{
    // initialize variables
    var chess = "";
    //clear prev games
    jQuery('#game-container').html('');
    if (jQuery('#curr_game').html().length > 10)
    {
        var pieceSize = jQuery('#chess_annotation_pieceSize_setting').html();
        chess = new PgnViewer(
                {
                    boardName: "game",
                    //pgnFile: 'upper.pgn',  
                    pgnDiv: 'curr_game',
                    pieceSet: jQuery('#chess_annotation_pieceSet_setting').html(),
                    showCoordinates: true,
                    autoScrollMoves: true,
                    movesFormat: "main_on_own_line",
                    //showBracketsOnVariation: false,
                    hideBracketsOnTopLevelVariation: true,
                    moveAnimationLength: 0.1,
                    pieceSize: pieceSize
                }
        );
        //if it is not the default size, then change the style
        if (pieceSize != 46)
        {
            jQuery('#chess_content').removeClass();
            jQuery('#chessgame').removeClass();
            jQuery('#chessgame_header').removeClass();
            jQuery('#chessgame .movelist').addClass('movelist' + pieceSize);
            jQuery('#chessgame .movelist').removeClass('movelist');
            jQuery('#chessgame .board').addClass('board' + pieceSize);
            jQuery('#chessgame .board').removeClass('board');

            //re-adding style
            jQuery('#chess_content').addClass('chess_content' + pieceSize);
            jQuery('#chessgame').addClass('chessgame' + pieceSize);
            jQuery('#chessgame_header').addClass('chessgame_header' + pieceSize);          
        }
        else
        {
            jQuery('#chess_content').removeClass();
            jQuery('#chessgame').removeClass();
            jQuery('#chessgame_header').removeClass();
            jQuery('#chess_content').addClass('chess_content');
            jQuery('#chessgame').addClass('chessgame');
            jQuery('#chessgame_header').addClass('chessgame_header');
        }
    }

    jQuery("#edit-chess-annotation-parsepgn").click(function() {

        var pgn_txt = jQuery("#edit-chess-annotation-pastepgn").val();
        var pieceSet = jQuery("#select-chess_annotation_pieceSet").val();
        var pieceSize = jQuery("#select-chess_annotation_pieceSize").val();
        //var png_upload = jQuery("#edit-chess-annotation-uploadpgn").val();

        if (pgn_txt.length > 10)
        {
            var content = parsePGNtoHTML(pgn_txt);
            content += '<div id = "chess_annotation_pieceSet_setting"  style = "display:none;" >' + pieceSet + '</div>';
            content += '<div id = "chess_annotation_pieceSize_setting"  style = "display:none;" >' + pieceSize + '</div>';
            //the filter must be set to full html in order for the module to work
            jQuery('.filter-list').val('full_html');
            jQuery('#edit-chess-annotation-pgnview').html('');
            jQuery('#edit-chess-annotation-pgnview').html(content);
            return false;
        }
        /* //to be implemented
         else if (png_upload.length > 1) {
         jQuery.ajax({
         url: Drupal.settings.basePath + 'chess_annotation/processPGN'
         });
         }*/
        return false;
    });
});
function parsePGNtoHTML(pgn)
{

    var prefix = jQuery("#chess_annotation_template").html();
    prefix = rebuildString(prefix, prefix.lastIndexOf('</pre>'));
    var suffix = "</pre>";
    return '<div id ="chess_content" class = "chess_content">' + prefix + pgn + suffix + '</div>';
}

//need to be re-implemented!
function getPGNheader(pgn)
{
    var game_info = pgn.split("[");
    game_info = game_info.join();
    var game_header = game_info.split("]");
    game_header.pop();
    var header_string = game_header.join("<br />");
    return header_string;
}

//utility function 
function sanitizeString(val) {
    var result = '';
    for (var i = 0; i < val.length; i++) {
        var s = val[i];
        if (val.charCodeAt(i) > 31 && val.charCodeAt(i) < 127)
            result += s;
    }

    return result;
}

//utility function 
function rebuildString(val, index) {
    var result = '';
    for (var i = 0; i < val.length; i++) {
        if (i === index)
            break;
        var s = val[i];
        result += s;
    }

    return result;
}
