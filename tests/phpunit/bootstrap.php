<?php

error_reporting(E_ALL | E_STRICT);

//	include the composer autoloader
$loader = require __DIR__ . '/../../vendor/autoload.php';

//	autoload abstract TestCase classes in test directory
$loader->addPsr4( 'ioext\\vdata\\', __DIR__ . '/../../src/' );
$loader->addPsr4( 'ioext\\vdata\\', __DIR__ );
$loader->addPsr4( 'ioext\\delib\\', __DIR__ . '/../../vendor/ioext/delib/src/' );
