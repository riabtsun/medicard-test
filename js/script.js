window.addEventListener("DOMContentLoaded", (event) => {
  //mobile menu
  let mobileMenu = document.querySelector(".mobile-menu");
  let menuToggle = document.querySelector(".menu_toggle");

  menuToggle.addEventListener("click", (e) => {
    mobileMenu.classList.toggle("active");
    if (mobileMenu.classList.contains("active")) {
      menuToggle.src = "./images/menu-close.svg";
    } else {
      menuToggle.src = "./images/menu-open.svg";
    }
  });
});

//scroll to top
let scrollToTopVisible = false;
document.addEventListener("scroll", () => {
  const scrollToTop = document.body.querySelector(".scroll-to-top");
  if (document.documentElement.scrollTop > 100) {
    if (!scrollToTopVisible) {
      fadeIn(scrollToTop);
      scrollToTopVisible = true;
    }
  } else {
    if (scrollToTopVisible) {
      fadeOut(scrollToTop);
      scrollToTopVisible = false;
    }
  }
  scrollToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

function fadeOut(el) {
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= 0.1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "block";
  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += 0.1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

//inputs masks
$(document).ready(function () {
  $("#phone").inputmask("+38(099)-999-99-99");
  Inputmask({ mask: "MD00809999999" }).mask("#card_code");
  Inputmask({ mask: "9999" }).mask("#code");
  Inputmask({ mask: "9999" }).mask("#code-sms");
  Inputmask({
    mask: "99.99.9999",
    placeholder: "дд.мм.рррр",
    alias: "datetime",
  }).mask("#dob");
});

//form submit
$(document).on("submit", "form[name=register]", function (e) {
  e.preventDefault();

  $.ajax({
    type: $(this).attr("method"),
    url: $(this).attr("action"),
    cache: false,
    //contentType: '',
    dataType: "json",
    data: $(this).serialize(), // serializes the form's elements.
    success: function (data) {
      console.log(data); // show response from the php script.
      $("div.modal").modal("hide");
      $("#exampleModal .modal-title").html(data.title);
      $("#exampleModal .modal-body p").html(data.text);
      $("#exampleModal").modal("show");
      if (data.error == false) {
        $("form[name=register]")[0].reset();
        //$(".div-info").hide();
        //$(".div-sms").hide();
        ////$(".div-card_code").hide();
        //$(".div-card_code input").removeAttr("readonly");
        //$(".div-card_code button").removeAttr("disabled");
        //$("form[name=register] input[type=checkbox]").attr("disabled", true);
        //$("form[name=register] button[type=submit]").attr("disabled", true);
      }
    },
  });
});

$("select#city").chained("select#region");

$("select#region").change(function () {
  $("input[name=region]").val($(this).find(":selected").text());
});

$("select#city").change(function () {
  var t = $(this).find(":selected").text();
  if (t == "Інше") {
    $("textarea[name=city_text]").text("").show();
  } else {
    $("textarea[name=city_text]").hide().text("");
  }
});

$(document).on("submit", "form[name=register]", function (e) {
  e.preventDefault();

  $.ajax({
    type: $(this).attr("method"),
    url: $(this).attr("action"),
    cache: false,
    //contentType: '',
    dataType: "json",
    data: $(this).serialize(), // serializes the form's elements.
    success: function (data) {
      console.log(data); // show response from the php script.
      $("div.modal").modal("hide");
      $("#exampleModal .modal-title").html(data.title);
      $("#exampleModal .modal-body p").html(data.text);
      $("#exampleModal").modal("show");
      if (data.error == false) {
        $("form[name=register]")[0].reset();
        $("select#region").trigger("change");
      }
    },
  });
});
