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

    /*
	 * Orginze key parameter to be add to the GET URI
	 */
    protected $key_parameter;

    /*
	 * Initilize variables and received the curl helper
	 * format a json and return it
	 */
    public function __construct($curl_helper)
    {
        $this->curl_helper = $curl_helper;
        $this->key_parameter = '?api_key=' . TheMoviesDbApiHelper::KEY . '&';
    }

    /*
	 * Call search function to "curl" the API for a specific movie
	 * format a json and return it
	*/
    public function searchPerson($uri_parameters)
    {
        $json_string = $this->search('person', $uri_parameters);

        // Search for the movies of that person
        if ( strpos($json_string,'known_for') ) 
        {
            $json = json_decode( $json_string, true );
            $id = $json['rows'][0]['id'];
            $json = json_decode( $this->getPersonMovies( $id ), true);

            $json_string = json_encode( $json['rows'] );
        } else 
        {
            $json_string = json_encode(json_decode($json_string, true)['rows']);
        }

        return $json_string;
    }

    /*
	 * Call search function to "curl" the API for a specific movie
	 * return JSON after addaption to UI format
	*/
    public function searchMovie($uri_parameters)
    {
        $json = json_decode($this->search('movie', $uri_parameters), true);

        return json_encode($json['rows']);
    }

    /*
	 * Complete the URI base on the type of search and execute the curl
	 * return JSON
	*/
    public function search($type, $uri_parameters)
    {
        # Complete URI
        $uri  = TheMoviesDbApiHelper::URL . 'search/'. $type ;
        $uri .= $this->key_parameter . $uri_parameters;

        # Do the curl and replace names for compatibility with the UI

        return preg_replace('/results/', 'rows',
            $this->curl_helper->get( $uri ), 1);

        
    }

    public function getPersonMovies($id)
    {
        # Complete URI
        $uri  = TheMoviesDbApiHelper::URL . 'person/'. $id . '/movie_credits' ;
        $uri .= $this->key_parameter;

        # Do the curl and replace names for compatibility with the UI

        return preg_replace('/cast/',
            'rows',
            $this->curl_helper->get( $uri ),
            1);
    }
}
