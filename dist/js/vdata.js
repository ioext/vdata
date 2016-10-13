/********************************************************************************
 *
 *	VData Client by DeKuan, Inc
 *	www.dekuan.org
 *
 ********************************************************************************/


/**
 *	class of CVData
 */
function CVData()
{
	var m_oThis = this;

	/**
	 *	@return {number}
	 *	HTTP Get
	 */
	this.Get = function( arrParam, pfnCallback )
	{
		if ( ! m_oThis.IsValidParam( arrParam ) || ! _IsFunction( pfnCallback ) )
		{
			return false;
		}

		//	...
		arrParam[ 'method' ] = 'GET';
		return m_oThis.Http( arrParam, pfnCallback );
	};

	/**
	 *	@return {number}
	 *	HTTP Post
	 */
	this.Post = function( arrParam, pfnCallback )
	{
		if ( ! m_oThis.IsValidParam( arrParam ) || ! _IsFunction( pfnCallback ) )
		{
			return VDATA.ERROR.PARAMETER;
		}

		//	...
		arrParam[ 'method' ] = 'POST';
		return m_oThis.Http( arrParam, pfnCallback );
	};

	/**
	 *	@return {number}
	 *	HTTP Put
	 */
	this.Put = function( arrParam, pfnCallback )
	{
		if ( ! m_oThis.IsValidParam( arrParam ) || ! _IsFunction( pfnCallback ) )
		{
			return VDATA.ERROR.PARAMETER;
		}

		//	...
		arrParam[ 'method' ] = 'PUT';
		return m_oThis.Http( arrParam, pfnCallback );
	};

	/**
	 *	@return {number}
	 *	HTTP Put
	 */
	this.Delete = function( arrParam, pfnCallback )
	{
		if ( ! m_oThis.IsValidParam( arrParam ) || ! _IsFunction( pfnCallback ) )
		{
			return VDATA.ERROR.PARAMETER;
		}

		//	...
		arrParam[ 'method' ] = 'DELETE';
		return m_oThis.Http( arrParam, pfnCallback );
	};

	/**
	 *	@return {number}
	 *	HTTP Get
	 */
	this.Http = function( arrParam, pfnCallback )
	{
		//
		//	arrParam	- object,	see .IsValidParam()
		//	pfnCallback	- function,	function( oResponse ){}
		//	RETURN		- error id
		//
		var nRet;
		var sMethod;
		var sUrl;
		var oData;
		var nTimeout;
		var sVersion;
		var bASync;
		var oHeader;
		var oResponse;

		if ( ! m_oThis.IsValidParam( arrParam, true ) || ! _IsFunction( pfnCallback ) )
		{
			return VDATA.ERROR.PARAMETER;
		}

		//	...
		nRet = VDATA.ERROR.UNKNOWN;

		//	...
		sMethod		= m_oThis.GetSafeMethod( _GetSafeValue( arrParam, 'method', VDATA.CONST.DEFAULT_METHOD ) );
		sUrl		= _GetSafeValue( arrParam, 'url', '' );
		oData		= _GetSafeValue( arrParam, 'data', {} );
		nTimeout	= m_oThis.GetSafeTimeout( _GetSafeValue( arrParam, 'timeout', VDATA.CONST.DEFAULT_TIMEOUT ) );
		sVersion	= m_oThis.GetSafeVersion( _GetSafeValue( arrParam, 'version', VDATA.CONST.DEFAULT_VERSION ) );
		bASync		= Boolean( _GetSafeValue( arrParam, 'async', true ) );

		//	get safe values
		oData		= ( _IsObject( oData ) ? oData : {} );

		//	Request header
		oHeader		=
		{
			"Accept"	: ( VDATA.CONST.HTTP_HEADER_VERSION_ACCEPT + sVersion )
		};

		//	response
		oResponse	= m_oThis.GetDefaultVDataObject();

		try
		{
			$.ajax
			({
				method		: sMethod,
				url		: sUrl,
				data		: oData,
				headers		: oHeader,
				dataTpe		: "json",
				cache		: false,
				async		: bASync,
				timeout		: nTimeout,
				beforeSend	: function( oJqXHR, oSettings )
				{
				},
				success 	: function( oJsonData, sStatus, jqXHR )
				{
					if ( m_oThis.IsValidVData( oJsonData ) )
					{
						oResponse = oJsonData;
					}
					else
					{
						oResponse[ 'errorid' ]		= VDATA.ERROR.JSON;
						oResponse[ 'errordesc' ]	= _IsString( sStatus ) ? sStatus : '';
					}

					//
					//	call back
					//
					pfnCallback( oResponse );
				},
				error		: function( oJqXHR, sStatus, sErrorThrown )
				{
					//
					//	oJqXHR		- The jqXHR (in jQuery 1.4.x, XMLHttpRequest) object,
					// 			  a string describing the type of error that occurred and
					// 			  an optional exception object
					//	sStatus		- Possible values (besides null) are
					//			  "timeout", "error", "abort", and "parsererror".
					//	sErrorThrown	- When an HTTP error occurs,
					//			  errorThrown receives the textual portion of the HTTP status,
					//			  such as "Not Found" or "Internal Server Error."
					//

					oResponse[ 'errorid' ]		= VDATA.ERROR.NETWORK;
					oResponse[ 'errordesc' ]	= ( 'status: ' + sStatus + ', errorThrown :' + sErrorThrown );

					//
					//	call back
					//
					pfnCallback( oResponse );
				}
			});

			//	...
			nRet = VDATA.ERROR.SUCCESS;
		}
		catch ( oError )
		{
			nRet = VDATA.ERROR.EXCEPTION;

			//	...
			oResponse[ 'errorid' ]		= VDATA.ERROR.EXCEPTION;
			oResponse[ 'errordesc' ]	= oError.message;

			//
			//	call back
			//
			pfnCallback( oResponse );
		}

		//	...
		return nRet;
	};

	/**
	 *	@return {boolean}
	 *	if the variable being evaluated is a valid json in virtual data format ?
	 */
	this.IsValidVData = function( arrJson )
	{
		return ( arrJson &&
			_IsObject( arrJson ) &&
			arrJson.hasOwnProperty( 'errorid' ) &&
			arrJson.hasOwnProperty( 'errordesc' ) &&
			arrJson.hasOwnProperty( 'vdata' ) &&
			$.isNumeric( arrJson[ 'errorid' ] ) &&
			_IsString( arrJson[ 'errordesc' ] ) &&
			( $.isArray( arrJson[ 'vdata' ] ) || _IsObject( arrJson[ 'vdata' ] ) ) &&
			(
				arrJson.hasOwnProperty( 'json' ) ?
					( _IsObject( arrJson[ 'json' ] ) || $.isArray( arrJson[ 'json' ] ) )
					:
					true
			)
		);
	};

	/**
	 *	@return {object}
	 */
	this.GetDefaultVDataObject = function()
	{
		return {
			'errorid'	: VDATA.ERROR.UNKNOWN,
			'errordesc'	: '',
			'vdata'		: {},
			'version'	: VDATA.CONST.DEFAULT_VERSION,
			'json'		: {}
		};
	};

	/**
	 *	@return {boolean}
	 */
	this.IsValidParam = function( arrParam, bCheckMore )
	{
		//
		//	arrParam
		//		'method'	: string,	'GET', 'POST', ...
		//		'url'		: string,	url
		//		'data'		: string,array,	appended as parameters to url for GET
		//						appended as body for POST and others
		//		'version'	: string,	service version required by client
		//		'timeout'	: int,		timeout (in milliseconds) for the request
		//		'cookie'	: string/array,	cookies in string or array
		//		'headers'	: array,	HTTP request header list, like this:
		//						name1: value1
		//						name2: value2
		var bRet;

		//	...
		bRet = false;

		if ( arrParam &&
			_IsObject( arrParam ) &&
			arrParam.hasOwnProperty( 'url' ) &&
			_IsString( arrParam[ 'url' ] ) &&
			arrParam[ 'url'].length > 0 )
		{
			if ( bCheckMore )
			{
				if ( arrParam.hasOwnProperty( 'method' ) &&
					_IsString( arrParam[ 'method' ] ) )
				{
					bRet = true;
				}
			}
			else
			{
				bRet = true;
			}
		}

		return bRet;
	};

	/**
	 *	@return {boolean}
	 */
	this.IsSupportedMethod = function( sMethod )
	{
		if ( ! _IsString( sMethod ) || 0 == sMethod.length )
		{
			return false;
		}

		//	...
		sMethod	= $.trim( sMethod ).toUpperCase();

		//	...
		return ( VDATA.CONST.HTTP_SUPPORTED_METHODS.hasOwnProperty( sMethod ) &&
		VDATA.CONST.HTTP_SUPPORTED_METHODS[ sMethod ] );
	};

	/**
	 *	@return {string}
	 */
	this.GetSafeMethod = function( sMethod )
	{
		if ( ! _IsString( sMethod ) || 0 == sMethod.length )
		{
			return VDATA.CONST.DEFAULT_METHOD;
		}

		//	...
		var sRet;

		//	...
		sMethod	= $.trim( sMethod ).toUpperCase();
		if ( m_oThis.IsSupportedMethod( sMethod ) )
		{
			sRet = sMethod;
		}
		else
		{
			sRet = VDATA.CONST.DEFAULT_METHOD;
		}

		return sRet;
	};

	/**
	 *	@return {string}
	 */
	this.GetSafeVersion = function( sVersion )
	{
		if ( ! _IsString( sVersion ) || 0 == sVersion.length )
		{
			return VDATA.CONST.DEFAULT_VERSION;
		}

		//	...
		var sRet;

		//	...
		sVersion = $.trim( sVersion );
		if ( _IsString( sVersion ) && sVersion.length > 0 )
		{
			sRet = sVersion;
		}
		else
		{
			sRet = VDATA.CONST.DEFAULT_VERSION;
		}

		return sRet;
	};

	/**
	 *	@return {number}
	 *	timeout (in milliseconds) for the request
	 */
	this.GetSafeTimeout = function( nTimeout )
	{
		return ( $.isNumber( nTimeout ) && nTimeout > 0 ) ? parseInt( nTimeout ) : VDATA.CONST.DEFAULT_TIMEOUT;
	};



	////////////////////////////////////////////////////////////////////////////////
	//	Private
	//

	/**
	 *	@return {*}
	 */
	function _Construct()
	{
	}

	/**
	 *	@return {boolean}
	 */
	function _IsString( vValue )
	{
		return ( "string" === typeof( vValue ) );
	}
	function _IsFunction( vValue )
	{
		return ( "function" === typeof( vValue ) );
	}

	/**
	 *	@return {boolean}
	 */
	function _IsObject( vValue )
	{
		return ( "object" === typeof( vValue ) );
	}

	function _GetSafeValue( oData, sKey, vDefaultValue )
	{
		var vRet;

		if ( ! _IsObject( oData ) || ! _IsString( sKey ) )
		{
			return vDefaultValue;
		}

		//	...
		vRet = vDefaultValue;

		if ( oData.hasOwnProperty( sKey ) )
		{
			vRet = oData[ sKey ];
		}

		return vRet;
	}


	//
	//	construct
	//
	_Construct();
}



/**
 *	defines VDATA
 */
var window	= window || {};
var VDATA	= window.VDATA || ( window.VDATA = new CVData() );

//
//	error ids of VData
//
VDATA.ERROR	=
{
	//
	//	common error codes
	//
	SUCCESS			: 0,            //      successfully

	USER_START		: 10000,	//	start of user customized error id
	USER_END		: 99999,	//	end of user customized error id

	UNKNOWN			: -100000,      //      unknown errors
	ACCESS_DENIED		: -100001,      //      access denied
	PARAMETER		: -100002,      //      error in parameters
	PERMISSION		: -100003,      //      error in permission
	EXPIRED			: -100004,      //      error in expired
	NOT_LOGGEDIN		: -100005,      //      error in not logged in
	FAILED_LOGGEDIN		: -100006,      //      error in failed logged in

	CREATE_INSTANCE		: -100010,      //      error in creating instance
	EXCEPTION		: -100011,	//	error in exception

	DB_SELECT		: -100050,	//	error in selecting database
	DB_UPDATE		: -100051,	//	error in updating database
	DB_INSERT		: -100052,	//	error in inserting database
	DB_DELETE		: -100053,	//	error in deleting database
	DB_DROP			: -100054,	//	error in dropping database
	DB_TRANSACTION		: -100060,	//	error in transaction
	DB_TABLE_NAME		: -100065,	//	error in table name

	REQUEST_VIA_IP	: -100100,	//	bad request via ip request

	NETWORK		: -100300,	//	error network
	JSON		: -100301,	//	error json
	JSON_ERRORID	: -100302,	//	error json.errorid
	JSON_ERRORDESC	: -100303,	//	error json.errordesc
	JSON_VDATA	: -100304	//	error json.vdata
};

//
//	constants of VData
//
VDATA.CONST	=
{
	HTTP_HEADER_VERSION_ACCEPT	: 'application/vdata+json+version:',

	//
	//	supported methods
	//
	HTTP_SUPPORTED_METHODS		: { 'GET' : true, 'POST' : true, 'DELETE' : true, 'PUT' : true },

	//
	//	default values
	//
	DEFAULT_VERSION			: '1.0',	//	default version
	DEFAULT_METHOD			: 'GET',	//	default HTTP request method
	DEFAULT_TIMEOUT			: 5 * 1000	//	timeout in milliseconds, default value is 5 seconds
};



//
//	exports for node.js
//
if ( "object" === typeof module && "object" === typeof module.exports )
{
	module.exports.VDATA = VDATA;
}



