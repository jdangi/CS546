(function ($) {
  const theForm = $("#email-form");
  const theEmail = $("#the-email");
  const theMessage = $("#the-message");
  const theResult = $("#the-result");

  theForm.submit(e => {
    e.preventDefault();
    const formData = {
      email: theEmail.val(),
      message: theMessage.val()
    };

    $.ajax({
      type: "POST",
      url: "/",
      // dataType: "json",
      // contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (data) {
        data = JSON.parse(data);
        theResult.text(data.reply);  //jquery issue 4 parse the result to json
      },
      contentType: "application/json",
      dataType: "json"
    });
  });
})(jQuery); // jQuery is exported as $ and jQuery
