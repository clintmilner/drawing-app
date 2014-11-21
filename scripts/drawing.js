var Paintbrush = (function()
{
    var canvas = document.getElementById( 'drawing' ),
        ctx = canvas.getContext( '2d' ),
        STROKE_WIDTH = 7,
        $cmd = $( '#cmd' );
    return {
        init: function()
        {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            $( document.body )
                .on( 'keyup', '#cmd', function()
                {
                    var commands = [ 'clear', 'circle', 'rectangle', 'line', 'fill'],
                        cmd = $( this ).val();

                    var check = new RegExp( '\\b' + cmd, 'i' );
                    var isGoodCmd = check.test( commands );

                    if( isGoodCmd && cmd !== '' )
                    {
                        switch ( cmd ) {
                            case commands[0]:
                                $(this ).prop( 'placeholder', 'clear' );
                                Paintbrush.drawClear( 'lightblue' );
                            break;
                            case commands[1]:
                                Paintbrush.drawCircle( 150, 311, 25, 'goldenrod' );
                                break;
                            case commands[2]:
                                Paintbrush.drawRectangle( 44, 60, 200, 100, '#d87b22' );
                                break;
                            case commands[3]:
                                Paintbrush.drawLine( 25, 100, 160, 400, 'tomato' );
                                break;
                            case commands[4]:
//                              Paintbrush.drawFill( centerX, centerY, 'yellow' );
                                break;
                            default:
                                console.log( cmd );
                                ctx.clearRect(0, 0, canvas.width, canvas.height)
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
            //var canvasRatio = canvas.width / canvas.height,
            //    multiplier = 1;
            //ctx.beginPath();
            //setInterval( function(){
            //    console.log( x );
            //    console.info( y );
            //    if( x > 0 || y > 0 )
            //    {
            //        ctx.rect( x, y, multiplier*canvasRatio, multiplier*canvasRatio );
            //        ctx.fillStyle = color;
            //        ctx.fill();
            //
            //        multiplier++;
            //    }
            //
            //}, 100 );

        }
    }
})();