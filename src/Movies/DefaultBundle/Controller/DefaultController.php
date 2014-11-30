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
     * @Route("/search_movie/{movie}")
     * Use the themoviedb API
     * If there is an error with the URL it returns an empty JSON Object
     */
    public function searchMovieAction($movie)
    {
        // Adding 
    	$uri = 'query=' . $movie;
        $response = $this->get('api_helper')->searchMovie( $uri );

        return  new Response(preg_replace('/results/', 'rows', $response, 1));
    }

    /**
     * @Route("/search_person/{person}")
     * Use the themoviedb API
     * If there is an error with the URL it returns an empty JSON Object
     */
    public function searchPersonAction($person)
    {
        $uri = 'query=' . $person;
        $response = $this->get('api_helper')->searchPerson( $uri );

        return  new Response(preg_replace('/results/', 'rows', $response, 1));
    }
}
