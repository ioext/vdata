var jsdom	= require('mocha-jsdom');
var expect	= require('chai').expect;
var fs		= require('fs');
<<<<<<< HEAD

var jsdom	= require('jsdom');
//var document	= jsdom.jsdom("");


//var $;
//var jsdom	= require('mocha-jsdom');
//var rerequire	= jsdom.rerequire;

global.document	= jsdom.jsdom();
global.window	= global.document.defaultView;
global.$	= require( 'jquery' )( global.window );

var $ = global.$;

//var $		= require('jquery')( ( require("jsdom").jsdom().defaultView ) );

var vdata	= require('../../dist/js/vdata.js');


=======
>>>>>>> e8ee790ba0de547d144c63ba171d8b8100f6f43e


describe( "vdata", function()
{
	var $;
<<<<<<< HEAD

	beforeEach(function()
	{
		$		= require('jquery')( ( require("jsdom").jsdom().defaultView ) );
		console.log('before every test in every file');
	});

=======

	jsdom
	({
		src : fs.readFileSync( 'dist/js/vdata.js', 'utf-8' )
	});
>>>>>>> e8ee790ba0de547d144c63ba171d8b8100f6f43e

	before( function()
	{
		$ = require('jquery');
	});

	describe( "#errors", function()
	{
		it ( "`VDATA.ERROR.SUCCESS` should equal 0", function()
		{
			expect( VDATA.ERROR.SUCCESS ).to.equal( 0 );
		});
		it ( "`VDATA.ERROR.USER_START` should equal 10000", function()
		{
			expect( VDATA.ERROR.USER_START ).to.equal( 10000 );
		});
		it ( "`VDATA.ERROR.USER_END` should equal 99999", function()
		{
			expect( VDATA.ERROR.USER_END ).to.equal( 99999 );
		});
		it ( "`VDATA.ERROR.UNKNOWN` should equal -100000", function()
		{
			expect( VDATA.ERROR.UNKNOWN ).to.equal( -100000 );
		});
		it ( "`VDATA.ERROR.ACCESS_DENIED` should equal -100001", function()
		{
			expect( VDATA.ERROR.ACCESS_DENIED ).to.equal( -100001 );
		});
		it ( "`VDATA.ERROR.PARAMETER` should equal -100002", function()
		{
			expect( VDATA.ERROR.PARAMETER ).to.equal( -100002 );
		});
		it ( "`VDATA.ERROR.EXCEPTION` should equal -100011", function()
		{
			expect( VDATA.ERROR.EXCEPTION ).to.equal( -100011 );
		});
		it ( "`VDATA.ERROR.NETWORK` should equal -100300", function()
		{
			expect( VDATA.ERROR.NETWORK ).to.equal( -100300 );
		});
		it ( "`VDATA.ERROR.JSON` should equal -100301", function()
		{
			expect( VDATA.ERROR.JSON ).to.equal( -100301 );
		});
	});


	describe( "#constants", function()
	{
		it ( "`VDATA.CONST.HTTP_HEADER_VERSION_ACCEPT` should equal to `application/vdata+json+version:`", function()
		{
			expect( VDATA.CONST.HTTP_HEADER_VERSION_ACCEPT ).to.equal( 'application/vdata+json+version:' );
		});
		it ( "`VDATA.CONST.HTTP_SUPPORTED_METHODS['GET']` should equal to true", function()
		{
			expect( VDATA.CONST.HTTP_SUPPORTED_METHODS['GET'] ).to.equal( true );
		});
	});

	describe( "#objects", function()
	{
		it ( "`VDATA` should be an object", function()
		{
			expect( typeof( VDATA ) ).to.equal( 'object' );
		});
	});


	describe( "#functions", function()
	{
<<<<<<< HEAD
		//	...
		//jsdom();

		before( function()
		{
			//$ = rerequire('jquery');


			//var window	= document.defaultView;
			//
			//global.window	= window;
			//global.document	= document;
			//global.$	= require('jquery')( document.defaultView, true );
		});


		it ( "`$` should be an object", function()
		{
			expect( typeof( $ ) ).to.equal( 'object' );
		});

		it ( "`$.trim` should be `function`", function()
		{
			expect( $.trim ).to.equal( 'function' );
		});

=======
>>>>>>> e8ee790ba0de547d144c63ba171d8b8100f6f43e
		it ( "`Get` method should return an vdata object", function()
		{
			VDATA.Get
			(
				{
					'url'	: 'http://www.dekuan.org/',
					'async'	: false
				},
				function( oResponse )
				{
					expect( typeof( oResponse ) ).to.equal( 'object' );
				}
			);
		});
	});

});