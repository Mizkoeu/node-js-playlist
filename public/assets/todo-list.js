$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          //location.reload();
          var ul = document.getElementById('chores');
          var li = document.createElement('li');
          li.appendChild(document.createTextNode(data.item));
          ul.appendChild(li);
        }
      });

      return false;

  });

  $('li').on('click', function(){
      $(this).attr('id', 'toDelete');
      var item = $(this).text().replace(/ /g, "-");
      //console.log(item);
      //$(this).remove();
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          //location.reload();
          $('#toDelete').remove();
        }
      });
  });

});
