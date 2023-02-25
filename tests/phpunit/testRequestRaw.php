<?php

namespace ioext\vdata;



use ioext\vdata\CConst;
use ioext\vdata\CRequest;
use ioext\delib\CLib;


/***
 *	Class testRequestRaw
 *	@package ioext\vdata
 */
class testRequestRaw extends \PHPUnit\Framework\TestCase
{
	public function testRawRequest()
	{
		$cRequest	= CRequest::GetInstance();

		echo "\r\n";

		$nCall		= $cRequest->HttpRaw
		(
			[
				'method'	=> 'GET',
				'url'		=> "http://www.baidu.com/",
				'headers'	=>
					[
						'X-Application-Id'	=> '99999-88888',
					],
			],
			$arrResp
		);
		if ( CConst::ERROR_SUCCESS == $nCall &&
			$cRequest->IsValidRawResponse( $arrResp ) )
		{
			echo "HTTP Status: " . $arrResp[ 'status' ] . "\r\n";
			print_r( $arrResp[ 'headers' ] );

			var_dump( $arrResp[ 'data' ] );
		}

	}


}
