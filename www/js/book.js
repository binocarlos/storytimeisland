// this is the stub

var $ = require('jquery');
var Hammer = require('hammer');
var has3d = require('has-translate3d');

document.ontouchmove = function(event){
    event.preventDefault();
}

function setupbook(selector){

  var is_3d = has3d;

  var startpage = 0;

  var activebook = null;
  var dragging = null;
  var animating = false;
  var loading = false;
  var currentsize = {};
  var currentpos = {};

  /*
  
    PAGE DRAG EVENTS
    
  */
  var hammertime = new Hammer($(selector).get(0), {
    drag_min_distance:10,
    tap_max_distance:9
  })


  hammertime.ondragstart = function(ev){
    if(activebook){
      activebook.ondragstart(ev);
    }
  }

  hammertime.ondrag = function(ev){
    if(activebook){
      activebook.ondrag(ev);
    }
  }

  hammertime.ondragend = function(ev){
    if(activebook){
      activebook.ondragend(ev);
    }
  }

  hammertime.ontap = function(ev){
    if(activebook){
      activebook.ontap(ev);
    }
  }

  activebook = create_book();

  /*
  
    BOOK CREATE
    
  */
  function create_book(){

    var book;
    var bookelem = $(selector);

    var pagecount = bookelem.find('.page').length;
    if(is_3d){
      var PageTurner = require('pageturner')
      book = new PageTurner({
        bookselector:selector,
        pageselector:'.page',
        startpage:startpage,
        perspective:950
      })
    }
    else{
      var PageFader = require('pagefader');
      book = new PageFader({
        bookselector:selector,
        pageselector:'.page',
        startpage:startpage
      })
    }
    
    function get_current_page(){
      return book.currentpage || startpage;
    }

    book.on('ready', function(){
      
    })

    book.on('resize', function(newsize){
      
      setTimeout(function(){
        currentsize = newsize;

        var windowsize = {
          width:$(window).width(),
          height:$(window).height()
        }

        var xpos = bookelem.offset().left;
        var ypos = bookelem.offset().top;

        currentpos = {
          x:xpos,
          y:ypos
        }

        book.load_page(book.currentpage);
      }, 10)
      
      
    })

    book.on('load', function(index){
      loading = true;
    })

    book.on('loaded', function(index){
      loading = false;

      if(book.triggernext){
        book.triggernext();
        book.triggernext = null;
      }


    })

    book.on('animate', function(side){
      //apply_shadow(side);

      animating = true;
    })

    book.on('animated', function(side){

      animating = false;
      //apply_shadow(side);
    })

    book.ondragstart = function(ev){
      dragging = true;
    }

    book.ondrag = function(ev){
      if(!dragging){
        return;
      }

      if(ev.distance>=15){
        if(animating || loading){
          book.triggernext = function(){
            book.animate_direction(ev.direction=='left' ? 1 : -1);    
          }
          return;
        }
        dragging = false;
        book.animate_direction(ev.direction=='left' ? 1 : -1);  
      }

    }

    book.ondragend = function(ev){
      dragging = false;
    }

    book.ontap = function(ev){
      
    }

    book.render();

    return book;
  }

}

