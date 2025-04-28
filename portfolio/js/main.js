$(function () {
  // ========== GNB ==========
  $(".menu_btn").on("click", function (e) {
    e.preventDefault();
    $(".full_gnb").toggleClass("active");

    if ($(".full_gnb").hasClass("active")) {
      $(this).text("X").addClass("menu_close_btn");
      $("body").addClass("noscroll");
    } else {
      $(this).text("MENU").removeClass("menu_close_btn");
      $("body").removeClass("noscroll");
    }
  });

  $(".menu_list a").on("click", function () {
    $(".full_gnb").removeClass("active");
    $(".menu_btn").text("MENU").removeClass("menu_close_btn");
    $("body").removeClass("noscroll");
  });

  //폴라로이드 사진 흝뿌림
  function placePicturesWithoutOverlap() {
    const pictures = document.querySelectorAll(".Picture");
    const placed = [];
    const section = document.getElementById("aboutme_card");
    const sectionWidth = section.offsetWidth;
    const sectionHeight = section.offsetHeight;
    const pictureWidth = 300;
    const pictureHeight = 370; // note 포함 높이 예상

    const maxTries = 500;

    pictures.forEach((pic) => {
      let x,
        y,
        overlaps,
        tries = 0;

      do {
        overlaps = false;
        x = Math.floor(Math.random() * (sectionWidth - pictureWidth));
        y = Math.floor(Math.random() * (sectionHeight - pictureHeight));

        for (const placedPic of placed) {
          const aLeft = x;
          const aRight = x + pictureWidth;
          const aTop = y;
          const aBottom = y + pictureHeight;

          const bLeft = placedPic.x;
          const bRight = placedPic.x + pictureWidth;
          const bTop = placedPic.y;
          const bBottom = placedPic.y + pictureHeight;

          const isOverlapping =
            aLeft < bRight &&
            aRight > bLeft &&
            aTop < bBottom &&
            aBottom > bTop;

          if (isOverlapping) {
            overlaps = true;
            break;
          }
        }

        tries++;
      } while (overlaps && tries < maxTries);

      placed.push({ x, y });
      pic.style.left = `${x}px`;
      pic.style.top = `${y}px`;
      pic.style.position = "absolute";
      pic.style.transform = `rotate(${Math.random() * 20 - 10}deg)`; // 약간 회전
    });
  }

  window.addEventListener("load", placePicturesWithoutOverlap);

  // ========== 폴라로이드 드래그 효과 ==========
  const pictures = document.querySelectorAll(".Picture");
  let previousTouch;
  /* 
   function updateElementPosition(element, event) {
    let movementX, movementY;

    if (event.type === "touchmove") {
      const touch = event.touches[0];
      movementX = previousTouch ? touch.clientX - previousTouch.clientX : 0;
      movementY = previousTouch ? touch.clientY - previousTouch.clientY : 0;
      previousTouch = touch;
    } else {
      movementX = event.movementX;
      movementY = event.movementY;
    }

    const elementY = parseInt(element.style.top || 0) + movementY;
    const elementX = parseInt(element.style.left || 0) + movementX;

    element.style.top = `${elementY}px`;
    element.style.left = `${elementX}px`;
  }

   function startDrag(element, event) {
    const updateFunction = (event) => updateElementPosition(element, event);
    const stopFunction = () =>
      stopDrag({ update: updateFunction, stop: stopFunction });
    document.addEventListener("mousemove", updateFunction);
    document.addEventListener("touchmove", updateFunction);
    document.addEventListener("mouseup", stopFunction);
    document.addEventListener("touchend", stopFunction);
  }

  function stopDrag({ update, stop }) {
    previousTouch = undefined;
    document.removeEventListener("mousemove", update);
    document.removeEventListener("touchmove", update);
    document.removeEventListener("mouseup", stop);
    document.removeEventListener("touchend", stop);
  } */

  pictures.forEach((picture) => {
    const range = 100;
    const randomRotate = Math.random() * (range / 2) - range / 4;
    // 요소의 크기 측정
    const { width, height } = picture.getBoundingClientRect();
    // 가운데 위치 계산 (뷰포트 크기 기준)
    const centerX = window.innerWidth / 2 - width / 2;
    const centerY = window.innerHeight / 2 - height / 2;

    picture.style.top = `${centerY}px`;
    picture.style.left = `${centerX}px`;
    picture.style.transform = `rotate(${randomRotate}deg)`;
    picture.style.position = "absolute";

    /*  picture.addEventListener("mousedown", (e) => startDrag(picture, e));
    picture.addEventListener("touchstart", (e) => startDrag(picture, e)); */
  });

  // ========== 카드 클릭 → 공통 처리 함수 ==========
  function setupCard(cardId, url, shouldOpen = true) {
    const card = document.getElementById(cardId);
    if (!card) return;

    const img = card.querySelector(".Picture-img");
    const text = card.querySelector(".Picture-note span");

    const clickHandler = (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (shouldOpen) {
        window.open(url, "_blank");
      } else {
        // 👉 이동하지 않고 실행할 다른 동작
        console.log(`${cardId} 클릭됨 (이동 안 함)`);

        // 예: 카드 확대/팝업 보여주기 같은 UI 동작
        //card.classList.toggle('active');
      }
    };

    [img, text].forEach((el) => {
      if (el) el.addEventListener("click", clickHandler);
    });
  }

  /*   setupCard("meCard", "me.html", true);
  setupCard("schoolCard", "school.html", true);
  setupCard("historyCard", "history.html", true);
  setupCard("habbyCard", "", false); */

  //짤랑이 카드 클릭하면 이미지 전환되게
  const animalVariants = [
    { src: "./img/animal.png", label: "MY FRIEND" },
    { src: "./img/animal_modal.png", label: "MY FRIEND" },
  ];

  function setupImageSwitcherWithText(cardId, variantList) {
    const card = document.getElementById(cardId);
    if (!card) return;

    const img = card.querySelector(".Picture-img");
    const text = card.querySelector(".Picture-note span");

    let currentIndex = 0;

    const switchImage = () => {
      currentIndex = (currentIndex + 1) % variantList.length;
      img.src = variantList[currentIndex].src;
      text.textContent = variantList[currentIndex].label;
    };

    // 클릭 시 이미지+텍스트 전환
    [img, text].forEach((el) => {
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        switchImage();
      });
    });
  }

  setupImageSwitcherWithText("animalCard", animalVariants);

  //어바웃미 폴라로이드 클릭 시
  setupCard("meCard", "", false); // 기존 클릭 연결 제거

  $("#meCard .Picture-img, #meCard .Picture-note span").on(
    "click",
    function () {
      $("#aboutme_me").addClass("active");
    }
  );

  //닫기 버튼
  /*   $(document).on("click", ".close_btn", function (e) {
    e.stopPropagation();
    $("#aboutme_me").removeClass("active");
  }); */

  // 바깥 배경 누르면 닫힘
  $("#aboutme_me").on("click", function (e) {
    if ($(e.target).is("#aboutme_me")) {
      $("#aboutme_me").removeClass("active");
    }
  });
  /* 
  $(".close_btn").on("click", function (e) {
    e.stopPropagation(); // 이벤트 버블링 방지
    $("#aboutme_me").removeClass("active");
  }); */

  // schoolCard 클릭 시 #school 팝업 보여주기
  $("#schoolCard .Picture-img, #schoolCard .Picture-note span").on(
    "click",
    function () {
      $("#school").addClass("active");
    }
  );

  $(document).on("click", ".popup_close_btn", function (e) {
    e.stopPropagation();
    $(this).closest("#aboutme_me, #school").removeClass("active");
  });

  // 닫기 버튼으로 팝업 닫기
  /*   $("#school .close_btn").on("click", function (e) {
    e.stopPropagation();
    $("#school").removeClass("active");
  }); */

  // 바깥 클릭 시 팝업 닫기
  $("#school").on("click", function (e) {
    if ($(e.target).is("#school")) {
      $("#school").removeClass("active");
    }
  });

  // 프로젝트 클릭시
  $("#projects_2").on("click", function (e) {
    e.preventDefault(); // 기본 동작 방지
    window.open("projects.html", "_blank"); // 새 창에서 열기
  });

  // 스킬 클릭시
  $("#skills_2").on("click", function (e) {
    e.preventDefault(); // 기본 동작 방지
    window.open("skills.html", "_blank"); // 새 창에서 열기
  });

  //프로젝트 마우스 효과
  const $circle = $("#projects_2 .circle");
  const $projects2 = $("#projects_2");

  $projects2.on("mousemove", function (e) {
    const offset = $(this).offset();
    const mouseX = e.pageX - offset.left;
    const mouseY = e.pageY - offset.top;

    $circle.css({
      left: mouseX - 25 + "px", // 중심 맞추기
      top: mouseY - 25 + "px",
      display: "block",
    });
  });

  $projects2.on("mouseleave", function () {
    $circle.css("display", "none");
  });

  //스킬 클릭시 마우스효과
  function setupMouseFollowEffect(sectionSelector) {
    const $section = $(sectionSelector);
    const $circle = $section.find(".circle");

    $section.on("mousemove", function (e) {
      const offset = $section.offset();
      const mouseX = e.pageX - offset.left;
      const mouseY = e.pageY - offset.top;

      $circle.css({
        left: mouseX - $circle.width() / 2 + "px",
        top: mouseY - $circle.height() / 2 + "px",
        display: "flex",
      });
    });

    $section.on("mouseleave", function () {
      $circle.css("display", "none");
    });
  }

  // 프로젝트, 스킬 영역에 마우스 효과 적용
  setupMouseFollowEffect("#projects_2");
  setupMouseFollowEffect("#skills_2");

  //히스토리
  var $element = $(".each-event, .title");
  var $window = $(window);
  $window.on("scroll resize", check_for_fade);
  $window.trigger("scroll");
  function check_for_fade() {
    var window_height = $window.height();

    $.each($element, function (event) {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_offset = $element.offset().top;
      space =
        window_height -
        (element_height + element_offset - $(window).scrollTop());
      if (space < 60) {
        $element.addClass("non-focus");
      } else {
        $element.removeClass("non-focus");
      }
    });
  }

  // historyCard 클릭 시 #history 팝업 활성화
  $("#historyCard .Picture-img, #historyCard .Picture-note span").on(
    "click",
    function () {
      $("#history").addClass("active");
      $("body").addClass("noscroll");

      // 타임라인 이벤트들이 순차적으로 나타나는 애니메이션
      setTimeout(function () {
        $(".each-event").each(function (index) {
          setTimeout(() => {
            $(this).addClass("show");
          }, 300 * index);
        });
      }, 500);
    }
  );

  // 히스토리 타임라인 스크롤 효과
  $("#history").on("scroll", function () {
    var scrollTop = $(this).scrollTop();
    var windowHeight = $(this).height();

    $(".each-year").each(function () {
      var $year = $(this);
      var yearTop = $year.position().top; // ← 이거 중요!!
      var yearHeight = $year.outerHeight();

      if (
        yearTop < windowHeight / 2 &&
        yearTop + yearHeight > windowHeight / 2
      ) {
        $year.find(".title").removeClass("non-focus");
        $year.find(".each-event").removeClass("non-focus");
      } else {
        $year.find(".title").addClass("non-focus");
        $year.find(".each-event").addClass("non-focus");
      }
    });
  });
  setTimeout(function () {
    $(".each-event").each(function (index) {
      setTimeout(() => {
        $(this).addClass("show");
      }, 300 * index);
    });
  }, 500);

  // 팝업 닫기 버튼
  $(document).on("click", ".popup_close_btn", function (e) {
    e.stopPropagation();
    $(this).closest("#aboutme_me, #school, #history").removeClass("active");
    $("body").removeClass("noscroll");

    // 타임라인 이벤트 초기화
    $(".each-event").removeClass("show");
  });

  // 배경 클릭 시 팝업 닫기
  $("#history").on("click", function (e) {
    if ($(e.target).is("#history")) {
      $(this).removeClass("active");
      $("body").removeClass("noscroll");

      // 타임라인 이벤트 초기화
      $(".each-event").removeClass("show");
    }
  });
}); //ready end