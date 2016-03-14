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
     * 
	*/
    public function searchPerson($uri_parameters)
    {
        # Get the id of the person the user is looking for
        $uri = TheMoviesDbApiHelper::URL."search/person{$this->key_parameter}{$uri_parameters}&search_type=ngram";
        $res = json_decode($this->curl_helper->get( $uri ), true);

        $size = count($res["results"]);
        if($size > 0)
        {
            $id = $res["results"][0]['id'];
            return $this->getPersonMovies($id);
        } else 
        {
            return "[]";
        }
    }

    # http://api.themoviedb.org/3/person/500/movie_credits?api_key=ec92634a4466078d022a85a41caee33e
    public function getPerson($id)
    {    
        $uri =  TheMoviesDbApiHelper::URL."person/{$id}/movie_credits?{$this->key_parameter}";
        return json_encode($this->curl_helper->get( $uri ));
    }

    /*
	 * Call search function to "curl" the API for a specific movie
	 * return JSON after addaption to UI format
	*/
    public function searchMovie($uri_parameters)
    {
        #$json = json_decode($this->search('movie', $uri_parameters), true);
        #return json_encode($json['rows']);
        # Print whatever return search usually used to test URIs
        return $this->search('movie', $uri_parameters);
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
        #return $uri;
        # Do the curl and replace names for compatibility with the UI
        return preg_replace('/results/', 'rows',
            $this->curl_helper->get( $uri ), 1);
    }

    public function getPersonMovies($id)
    {
        # Complete URI
        $uri  = TheMoviesDbApiHelper::URL . 'person/'. $id . '/movie_credits' ;
        $uri .= $this->key_parameter;
        $movies = json_decode($this->curl_helper->get( $uri ), true)["cast"];
        $result = [];
        foreach($movies as &$movie){
            if($movie["poster_path"] !== NULL && $movie["release_date"] !== NULL  && $movie["character"] !== "")
            {
                array_push($result, $movie);
            }
        }
        # Do the curl and replace names for compatibility with the UI
        return json_encode($result);
    }

    public function searchMulti($uri_parameters)
    {
        #$uri_parameters .= "&page=1000";
        $json = json_decode($this->search('multi', $uri_parameters), true);
        #return  $this->search('multi', $uri_parameters); 
        return  json_encode($json['rows']);  
    }

    public function multiAutocomplete($uri_parameters)
    {
        #return $this->search('person', "{$uri_parameters}&search_type=ngram");
        # Decode the result gather from the API 
        $results = json_decode($this->search('person', "{$uri_parameters}&search_type=ngram"), true);
        $results = $results['rows'];

        # Gather names that match 
        $names = [];        
        foreach ($results as &$value) {
            array_push($names, "{$value['name']}");
        }
        $names = array_slice($names, 0, 7);
        return json_encode($names); 
    }

    # http://api.themoviedb.org/3/movie/popular?api_key=ec92634a4466078d022a85a41caee33e
    public function getPopularMovies()
    {
        $uri = TheMoviesDbApiHelper::URL."movie/popular{$this->key_parameter}";
        return $this->curl_helper->get( $uri);
    }

    # http://api.themoviedb.org/3/movie/293660?api_key=ec92634a4466078d022a85a41caee33e
    # http://api.themoviedb.org/3/movie/293660/images?api_key=ec92634a4466078d022a85a41caee33e
    public function getMovie($id){
        $uri = TheMoviesDbApiHelper::URL."movie/{$id}{$this->key_parameter}";
        $movie = json_decode($this->curl_helper->get($uri), true);

        $uri = TheMoviesDbApiHelper::URL."movie/{$id}/images{$this->key_parameter}";
        $posters =  json_decode($this->curl_helper->get($uri), true)['posters'];
        $movie['images'] = [];
        foreach($posters as &$poster){
            if($poster["iso_639_1"] === "en")
            {
                array_push($movie['images'], $poster);
            }
        }
        return json_encode($movie);
    }

}
