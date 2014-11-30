<?php

namespace Movies\DefaultBundle\Util;

class CurlHelper
{	
	/**
  	* Helper to execute a HTTP using the get Methods 
  	* If there is an error with the URL it returns an empty JSON Object
  	*/
	public function get( $uri )
	{
		$uri = str_replace(' ', "%20", $uri);
		$ch  = curl_init();
   		curl_setopt_array(
   		$ch, array( 
   		CURLOPT_URL => $uri,    // Adding Movie to the request
   		CURLOPT_RETURNTRANSFER => true // Return response
		));

		$output = curl_exec($ch);
		curl_close($ch);  // free

		if (is_bool ( $output ))
		{
			$output = "{}";
		} 

		return $output;
	}

}