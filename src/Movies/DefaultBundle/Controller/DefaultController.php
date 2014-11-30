<?php

namespace Movies\DefaultBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    /**
     * Single Page appliaction, download all the requier Javascript and render
     * html
     */
    public function indexAction()
    {
        return $this->render('MoviesDefaultBundle:Default:index.html.twig');
    }

    /**
     * @Route("/search/{movie}")
     * Use the themoviedb API
     * If there is an error with the URL it returns an empty JSON Object
     */
    public function searchAction($movie)
    {
    	$url = 'http://api.themoviedb.org';
    	$key = 'ec92634a4466078d022a85a41caee33e';
    	$url = $url . '/3/search/movie?api_key=' . $key . '&query=';

    	$ch = curl_init();
    	curl_setopt_array(
    	$ch, array( 
    		CURLOPT_URL => $url.$movie,    // Adding Movie to the request
    		CURLOPT_RETURNTRANSFER => true // Return response
			));

		$output = curl_exec($ch);
		curl_close($ch);  // free

		if (is_bool ( $output ))
		{
			$output = "{}";
		} else
        {
             $output = preg_replace('/results/', 'rows', $output, 1);
        }

		return new Response($output) ;
    }
}
