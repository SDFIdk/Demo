<?php
	// Test if the cookie is already set, to avoid unnecessary contact to Kortforsyningen:
	$ticket = NULL;
	if (isset($_COOKIE['kfticket']))
	{
		$ticket = $_COOKIE['kfticket'];
		}
	// 
	// Replace the VisStedet login information with your own login
	// Fetch a ticket from Kortforsyningen, using your organization's login

	else
	{

        preg_match("/[^\.\/]+\.[^\.\/]+$/", $_SERVER['HTTP_HOST'], $matches);
        $domain = $matches[0];

		$ticket = file_get_contents(
				"http://services.kortforsyningen.dk/service?request=GetTicket&login=VisStedet&password=VisStedet");
		setcookie("kfticket", $ticket, time()+60*60*24, '/', $domain); 
	}
	//Print out the ticket in the HTML for easier reference and debugging:
	echo "kfticket= ".$_COOKIE['kfticket'];
?>