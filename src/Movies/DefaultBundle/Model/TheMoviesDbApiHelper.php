<?php

namespace Movies\DefaultBundle\Model;

/* 
 * Class was create to respect the DRY principal and not to  
 * have repeated the same URI and keys in many places.
 */
class TheMoviesDbApiHelper
{
	const URL = 'http://api.themoviedb.org/3/';

	/*
	 * Key necessary to access the API is sent as a Get parameter on the URI
	*/
	const KEY = 'ec92634a4466078d022a85a41caee33e';

	protected $curl_helper;

	public function __construct( $curl_helper )
	{
		$this->curl_helper = $curl_helper;
	}

	/*
	 * Call seach to "curl" the API for a specific movie 
	 * Return JSON 
	*/
	function  searchPerson($uri_parameters)
	{
		return $this->search('person', $uri_parameters);
	}	

	/*
	 * Call seach to "curl" the API for a specific movie 
	 * return JSON 
	*/
	function searchMovie( $uri_parameters )
	{
		return $this->search('movie', $uri_parameters);
	}

	/*
	 * Complete the URI base on the type of search and execute the curl
	 * return JSON
	*/
	function search($type, $uri_parameters)
	{
		$key_parameter = '?api_key=' . TheMoviesDbApiHelper::KEY . '&';

		# Complete URI
		$uri = TheMoviesDbApiHelper::URL . 'search/'. $type ;
		$uri .= $key_parameter . $uri_parameters;
		
		# Do the curl
		return $this->curl_helper->get( $uri );
	}
}
