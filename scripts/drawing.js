var Paintbrush = (function()
{
    var canvas = document.getElementById( 'drawing' ),
        ctx = canvas.getContext( '2d' ),
        STROKE_WIDTH = 7,
        commands = [ 'clear', 'circle', 'rectangle', 'line', 'fill'],
        $error = $( '.error' ),
        $errorMsg = $( '#errorMsg' );

    return {
        init: function()
        {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            $( document.body )
                .on( 'click', '#submit', function( e ){
                    if( e !== undefined ){ e.preventDefault(); }
                    var cmd = $( '#cmd' ).val();

                    Paintbrush.processCommand( cmd );
                })
                .on( 'keyup', '#cmd', function( e )
                {
                    var cmd = $( this ).val();
                    if( e.keyCode === 13 && cmd !== '' )
                    {
                        Paintbrush.processCommand( cmd )
                    }
                    else
                    {
                        var $hint = $( '#hint' ),
                            check = new RegExp( '\\b' + cmd, 'i' ),
                            isGoodCmd = check.test( commands );

                        if( isGoodCmd && cmd !== '' )
                        {
                            $hint.text( '' );
                            switch ( cmd ) {
                                case commands[0]:
                                    $hint.text( commands[0] + ' color' );
                                    break;
                                case commands[1]:
                                    $hint.text( commands[1] + ' xPos yPos radius color' );
                                    break;
                                case commands[2]:
                                    $hint.text( commands[2] + ' xPos yPos width height color' );
                                    break;
                                case commands[3]:
                                    $hint.text( commands[3] + ' x1 y1 x2 y2 color' );
                                    break;
                                case commands[4]:
                                    $hint.text( commands[4] + ' xPos yPos color' );
                                    break;
                                default:
                                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                            }
                        }
                    }

                });

        },
        drawClear: function( color )
        {
            ctx.beginPath();
            ctx.rect( 0, 0, canvas.width, canvas.height );
            ctx.fillStyle = color;
            ctx.fill();
        },
        drawCircle: function( x, y, radius, color )
        {
            ctx.beginPath();
            ctx.arc( x, y, radius, 0, 2*Math.PI, false );
            ctx.lineWidth = STROKE_WIDTH;
            ctx.strokeStyle = color;
            ctx.stroke();
        },
        drawRectangle: function( x, y, w, h, color )
        {
            ctx.beginPath();
            ctx.rect( x, y, w, h );
            ctx.lineWidth = STROKE_WIDTH;
            ctx.strokeStyle = color;
            ctx.stroke();
        },
        drawLine: function( x1, y1, x2, y2, color )
        {
            ctx.beginPath();
            ctx.moveTo( x1, y1 );
            ctx.lineTo( x2, y2 );
            ctx.strokeStyle = color;
            ctx.lineWidth = STROKE_WIDTH;
            ctx.stroke();
        },
        drawFill: function( x, y, color )
        {
            var tL = [0,0],
                bL = [0,canvas.height],
                tR = [canvas.width, 0],
                bR = [canvas.width, canvas.height];
            var w = 50, h = 50, M = 2;
            ctx.beginPath();
            setInterval( function(){
                if( x >= 0 || y >= 0 )
                {
                    ctx.rect( x-M, y-M, w*M, h*M );
                    ctx.fillStyle = color;
                    ctx.fill();

                    M = M*(M+M);
                    console.log( M );
                }
            }, 100);


        },
        processCommand: function( cmd )
        {
            var rawCmd = cmd.split( ' ' );
            ctx.clearRect(0, 0, canvas.width, canvas.height );
            switch ( rawCmd[0] ) {
                case commands[0]:
                    if( rawCmd.length === 2 )
                    {
                        Paintbrush.hideValidation();
                        Paintbrush.drawClear( rawCmd[1] );
                    }
                    else
                    {
                        Paintbrush.throwValidation( 'The ' + commands[0] + ' command requires 2 parameters' );
                    }
                    break;
                case commands[1]:
                    if( rawCmd.length === 5 )
                    {
                        Paintbrush.hideValidation();
                        Paintbrush.drawCircle( rawCmd[1], rawCmd[2], rawCmd[3], rawCmd[4] );
                    }
                    else
                    {
                        Paintbrush.throwValidation( 'The ' + commands[1] + ' command requires 5 parameters' );
                    }
                    break;
                case commands[2]:
                    if( rawCmd.length === 6 )
                    {
                        Paintbrush.hideValidation();
                        Paintbrush.drawRectangle( rawCmd[1], rawCmd[2], rawCmd[3], rawCmd[4], rawCmd[5] );                    }
                    else
                    {
                        Paintbrush.throwValidation( 'The ' + commands[2] + ' command requires 6 parameters' );
                    }
                    break;
                case commands[3]:
                    if( rawCmd.length === 6 )
                    {
                        Paintbrush.hideValidation();
                        Paintbrush.drawLine( rawCmd[1], rawCmd[2], rawCmd[3], rawCmd[4], rawCmd[5] );
                    }
                    else
                    {
                        Paintbrush.throwValidation( 'The ' + commands[3] + ' command requires 6 parameters')
                    }
                    break;
                case commands[4]:
                    if( rawCmd.length === 4 )
                    {
                        Paintbrush.hideValidation();
                        Paintbrush.drawFill( rawCmd[1], rawCmd[2], rawCmd[3] );
                    }
                    else
                    {
                        Paintbrush.throwValidation( 'The ' + commands[4] + ' command requires 4 parameters')
                    }
                    break;
                default:
                    Paintbrush.hideValidation();
                    $( '#hint' ).text( 'Command not recognized' );
                    ctx.clearRect(0, 0, canvas.width, canvas.height );
            }
        },
        throwValidation: function( msg )
        {
            $error.removeClass( 'hidden' );
            $errorMsg.text( msg );

        },
        hideValidation: function()
        {
            $error.addClass( 'hidden' );
            $errorMsg.text( '' );
        }
    }
})();