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
     * @Route("/search/movie/{movie}")
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
     * @Route("/search/person/{person}")
     * Use the themoviedb API
     * If there is an error with the URL it returns an empty JSON Object
     */
    public function searchPersonAction($person)
    {
        $uri = 'query=' . $person;
        $response = $this->get('api_helper')->searchPerson( $uri );

        $response = new Response($response);
        $response->headers->set('Content-Type', 'application/json');
        return  $response; #new Response(preg_replace('/results/', 'rows', $response, 1));
    }

    /**
    * @Route("/search/multi/{query}")
    * Use the themoviedb API
    * If there is an error with the URL it returns an empty JSON Object
    */
    public function search($query)
    {
        $uri = 'query=' . $query;
        $response = $this->get('api_helper')->searchMulti( $uri );
        return  new Response($response); #new Response(preg_replace('/results/', 'rows', $response, 1));
    }

    /**
    * @Route("/search/autocomplete/{query}")
    * Use the themoviedb API
    */
    public function autocomplete($query)
    {
        $uri = 'query=' . $query;
        $response = $this->get('api_helper')->multiAutocomplete( $uri );

        $response =  new Response($response);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
    * @Route("/movies/popular")
    * Use the themoviedb API
    */
    public function popular()
    {
        $response = $this->get('api_helper')->getPopularMovies();

        $response =  new Response($response);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
    * @Route("/movies/{id}")
    * Use the themoviedb API
    */
    public function getMovie($id)
    {
        $response = $this->get('api_helper')->getMovie($id);

        $response =  new Response($response);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }      
}
