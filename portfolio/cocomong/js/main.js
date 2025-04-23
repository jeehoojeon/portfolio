$(function () {

  let section2thumbswiper = new Swiper(".slide_wrap", {
    slidesPerView: 'auto',
    spaceBetween: 30,
    direction: "vertical",
    watchSlidesProgress: true,
    slideToClickedSlide: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  let section2swiper = new Swiper(".section2_friends", {
    thumbs: {
      swiper: section2thumbswiper,
    },
  });




  //섹션4 슬라이드
  let section4swiper = new Swiper(".slider_wrapper", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    initialSlide: 2,
    coverflowEffect: {
      scale: 0.9,
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: ".slider_wrapper .swiper-pagination",
    },
  });

  //서브메뉴 열기
  $('.h_menu .on').click(function () {
    $(this).removeClass('on').next('.lucide').addClass('on');
    $('.submenu ').addClass('on');
  });
  //서브메뉴 닫기
  $('.x_icon').click(function () {
    $(this).removeClass('on').prev('.menu').addClass('on');
    $('.submenu').removeClass('on');
  });


  //언어변경 토글
  $('.option_kr').addClass('active');
  $('.option_eng').removeClass('active');
  $('.toggle_slider').removeClass('eng');

  $('.option_kr').click(function () {
    $(this).addClass('active');
    $('.option_eng').removeClass('active');
    $('.toggle_slider').removeClass('eng');
  });

  $('.option_eng').click(function () {
    $(this).addClass('active');
    $('.option_kr').removeClass('active');
    $('.toggle_slider').addClass('eng');
  });


  //섹션2 캐릭터선택
  //초기상태 (코코몽)만 표시되게
  /*   $('.s2_cocomong').show();
    $('.s2_aromi,.s2_kero,.s2_agul,.s2_duri,.s2_padak').hide(); */
  //슬라이드 테두리 적용
  /*   $('.slide_wrap img:first-child').addClass('border-cocomong'); */

  //클릭이벤트
  /*   $('.slide_wrap img').click(function () {
      $('.slide_wrap img').removeClass('border-cocomong border-aromi border-kero border-agul border-duri border-padak');
      $('.s2_cocomong,.s2_aromi,.s2_kero,.s2_agul,.s2_duri,.s2_padak').hide();
      const index = $(this).index();
      $('.slide_wrap img').attr('src', 'img/black_bg.png');
      $(this).attr('src', 'img/color_bg.png');
  
      switch (index) {
        case 0: // 코코몽
          $('.s2_cocomong').show();
          $(this).addClass('border-cocomong');
          break;
        case 1: // 아로미
          $('.s2_aromi').show();
          $(this).addClass('border-aromi');
          break;
        case 2: // 케로
          $('.s2_kero').show();
          $(this).addClass('border-kero');
          break;
        case 3: // 아글
          $('.s2_agul').show();
          $(this).addClass('border-agul');
          break;
        case 4: // 두리
          $('.s2_duri').show();
          $(this).addClass('border-duri');
          break;
        case 5: // 파닥
          $('.s2_padak').show();
          $(this).addClass('border-padak');
          break;
      }
    });
   */
  //인디케이터 이벤트
  // 섹션들
  const $sections = $('section');
  const $dots = $('.dot_indicators .dot');
  const $scrollbarIndicator = $('.scrollbar_indicator');
  let currentIndex = 0;
  let isScrolling = false;

  // 초기 설정: 첫 번째 섹션만 활성화
  $sections.removeClass('active');
  $sections.first().addClass('active');
  $dots.first().addClass('active');

  // 닷 인디케이터 위치 계산 함수 (수정됨)
  function updateScrollbarIndicator(index) {
    const $dotIndicators = $('.dot_indicators');

    // 닷 인디케이터 내에서의 위치 계산
    const dotIndicatorsWidth = $dotIndicators.width() - 60; // 양쪽 패딩 제외
    const dotSpacing = dotIndicatorsWidth / ($dots.length - 1);

    // 흰색 점을 완전히 가리지 않도록 조정
    const indicatorLeft = 30 + (index * dotSpacing) - 10; // 10px 왼쪽으로 이동

    $scrollbarIndicator.css('left', `${indicatorLeft}px`);
  }

  // 섹션 활성화 함수
  function activateSection(index) {
    // 모든 섹션 비활성화
    $sections.removeClass('active');
    // 해당 인덱스의 섹션만 활성화
    $sections.eq(index).addClass('active');
  }

  // 휠 이벤트 핸들러
  $(window).on('wheel', function (event) {
    if (isScrolling) return;

    isScrolling = true;

    // 휠 방향 확인
    if (event.originalEvent.deltaY > 0) {
      // 아래로 스크롤 (다음 섹션)
      if (currentIndex < $sections.length - 1) {
        currentIndex++;
      }
    } else {
      // 위로 스크롤 (이전 섹션)
      if (currentIndex > 0) {
        currentIndex--;
      }
    }

    // 섹션 활성화
    activateSection(currentIndex);

    // 닷 인디케이터 활성화 및 스크롤바 인디케이터 이동
    $dots.removeClass('active');
    $dots.eq(currentIndex).addClass('active');
    updateScrollbarIndicator(currentIndex);

    // 스크롤링 잠금 해제
    setTimeout(() => {
      isScrolling = false;
    }, 500);
  });

  // 닷 인디케이터 클릭 이벤트
  $dots.on('click', function () {
    if (isScrolling) return;

    currentIndex = $(this).data('index');

    // 섹션 활성화
    activateSection(currentIndex);

    // 닷 인디케이터 활성화 및 스크롤바 인디케이터 이동
    $dots.removeClass('active');
    $(this).addClass('active');
    updateScrollbarIndicator(currentIndex);

    // 스크롤링 잠금 해제
    setTimeout(() => {
      isScrolling = false;
    }, 500);
  });

  // 초기 로드 시 인디케이터 위치 설정
  updateScrollbarIndicator(0);

});//ready end