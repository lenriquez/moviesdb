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
    	$uri = $url . '/3/search/movie?api_key=' . $key . '&query=';

        $response = $this->get('curl_helper')->get( $uri . $movie );

        
        return  new Response(preg_replace('/results/', 'rows', $response, 1));
    }
}
