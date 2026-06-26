(function ($) {
  "use strict";

  $(function () {
    var $form = $("#tt-contact-form");
    if (!$form.length) return;

    $form.off("submit").on("submit", function (e) {
      e.preventDefault();
      var $th = $(this);

      $.ajax({
        type: "POST",
        url: "/mail.php",
        data: $th.serialize(),
      })
        .done(function () {
          alert("Grazie! Il tuo messaggio è stato inviato.");
          setTimeout(function () {
            $th.trigger("reset");
          }, 800);
        })
        .fail(function () {
          alert("Errore nell'invio. Riprova o scrivimi via email.");
        });

      return false;
    });
  });
})(jQuery);
