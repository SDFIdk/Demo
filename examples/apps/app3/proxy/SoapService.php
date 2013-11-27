<?php
	require_once('../lib/nusoap.php');
	
	$lon = $_POST['lon'];
	$lat = $_POST['lat'];

	$client = new nusoap_client('service.wsdl','wsdl'); 
	$pointOptions = array('SRS'=>'EPSG:25832', 'x' => $lon ,'y' => $lat);
	$result = $client->call('getHeightForCoordinate', array('point' => $pointOptions));
	
	
	if ($client->fault) 
		{
			print_r('Server travlt');
		} 
	else 
		{
			$err = $client->getError();
			if ($err) 
			{
				print_r('Server travlt');
			} 
			else 
			{
				print_r($result['height']);	
			}
		} 
?>