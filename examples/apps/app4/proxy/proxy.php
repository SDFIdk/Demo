<?php
 $ch = curl_init($_GET['url']);
 curl_setopt($ch, CURLOPT_HEADER, 0);
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
 $output = curl_exec($ch);
 curl_close($ch);
 echo $output;
?>