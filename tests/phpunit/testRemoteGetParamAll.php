<?php

namespace ioext\vdata;


/***
 *	Class testRemoteGetParamAll
 *	@package ioext\vdata
 */
class testRemoteGetParamAll extends \PHPUnit\Framework\TestCase
{
	private $m_arrInput =
		[
			'sr'	=> 1,
			'apid'	=> 'id-x-c',
			'apnm'	=> 'XING NAME',
			'aver'	=> '2.0.12',
			'apc'	=> '2.0.12',
			'sver'	=> '1.0',
			'pmod'	=> 'iPhone5s',
			'reso'	=> '1136x640',
			'mobop'	=> 'CMCC',
			'im'	=> 'imssdfasdfasdfasdfdsf',
			'nstat'	=> '4G',
			'mad'	=> '124123:222:222:223:DFDF',
			'sla'	=> 'chs',
			'stz'	=> '4800',
		];
	public function testGetParamAll()
	{
		echo "\r\ntestGetParamAll\r\n";

		print_r( \ioext\vdata\CRemote::GetParamAll() );
		print_r( \ioext\vdata\CRemote::GetParamAll( $this->m_arrInput ) );
	}
}
