$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="message-main" data-message-id=${message.id}>
            <div class="name">
              <div class="name__user-name">
                ${message.user_name}
              </div>
              <div class="name__create-at">
                ${message.created_at}
              </div>
            </div>
            <div class="message">
              <p class="message__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
      return html;
    } else {
      var html =
        `<div class="message-main">
            <div class="name">
              <div class="name__user-name">
                ${message.user_name}
              </div>
              <div class="name__create-at">
                ${message.created_at}
              </div>
            </div>
            <div class="message">
              <p class="message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
    };
  }
$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildHTML(data); 
    $('.messages').append(html);
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    $('form')[0].reset();
    $('input').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });
})
});
