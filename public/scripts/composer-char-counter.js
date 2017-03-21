$( document ).ready(function() {
    console.log( "ready!" );
    let charCount = 0;
    $( "textarea" ).keyup(function() {
      console.log( "Handler for .keypress() called." );
      console.log(this.value.length);
      this.parentNode.children[2].innerText = 140 - this.value.length;
      if (this.value.length > 140) {
        this.parentNode.children[2].style.color = "red";
      } else {
        this.parentNode.children[2].style.color = "black";
      }
    });


});
