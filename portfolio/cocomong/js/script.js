$(function () {
    // 요소 선택
    const menuIcon = $('.menu');
    const xIcon = $('.x_icon');
    const submenu = $('.submenu');
    const langKr = $('.lang_kr');
    const langEng = $('.lang_eng');
    const volumeIcon = $('.volume');
    const video = $('video')[0];
    const sliderTrack = $('.slider_track');
    const slides = $('.slide');
    const dots = $('.dot');
    const prevBtn = $('.prev-btn');
    const nextBtn = $('.next-btn');

    // 초기 상태 설정
    xIcon.hide();
    submenu.hide();
    langEng.hide();
    video.muted = true;
    volumeIcon.attr('data-lucide', 'volume-x');
    lucide.createIcons();

    // 메뉴 버튼 클릭 이벤트
    menuIcon.on('click', function() {
        $(this).hide();
        xIcon.show();
        submenu.css('display', 'flex');
    });

    // X 아이콘 클릭 이벤트
    xIcon.on('click', function() {
        $(this).hide();
        menuIcon.show();
        submenu.hide();
    });

    // 페이지 클릭 시 메뉴 닫기
    $(document).on('click', function(event) {
        if (submenu.css('display') === 'flex' &&
            !$(event.target).closest('.submenu').length &&
            !$(event.target).closest('.menu').length &&
            !$(event.target).closest('.x_icon').length) {

            xIcon.hide();
            menuIcon.show();
            submenu.hide();
        }
    });

    // 언어 변경 버튼 이벤트
    langKr.on('click', function() {
        $(this).hide();
        langEng.show();
    });

    langEng.on('click', function() {
        $(this).hide();
        langKr.show();
    });

    // 볼륨 아이콘 클릭 이벤트
    volumeIcon.on('click', function() {
        // 현재 아이콘 상태 확인
        var currentIcon = $(this).attr('data-lucide');
        
        if (currentIcon === 'volume-x') {
            // 음소거 해제 (소리 켜기)
            video.muted = false;
            // 아이콘을 volume-2로 변경
            $(this).attr('data-lucide', 'volume-2');
        } else {
            // 음소거 설정 (소리 끄기)
            video.muted = true;
            // 아이콘을 volume-x로 변경
            $(this).attr('data-lucide', 'volume-x');
        }
        
        // Lucide 아이콘 다시 렌더링
        lucide.createIcons();
    });

    // 초기 설정 - 첫 번째 캐릭터(코코몽)가 보이도록 설정
    $('.s2_aromi, .s2_kero, .s2_agul, .s2_duri, .s2_padak').hide();
    $('.s2_cocomong').show();

    // 초기 테두리 설정 - 코코몽 선택
    $('.slide_wrap img:first-child').addClass('border-cocomong');

    // 슬라이드 이미지 클릭 이벤트
    $('.slide_wrap img').click(function () {
        // 모든 배경 이미지를 black_bg로 변경
        $('.slide_wrap img').attr('src', 'img/black_bg.png');

        // 클릭한 이미지만 color_bg로 변경
        $(this).attr('src', 'img/color_bg.png');

        // 모든 테두리 클래스 제거
        $('.slide_wrap img').removeClass('border-cocomong border-aromi border-kero border-agul border-duri border-padak');

        // 모든 캐릭터 설명 숨기기
        $('.s2_cocomong, .s2_aromi, .s2_kero, .s2_agul, .s2_duri, .s2_padak').hide();

        // 클릭한 인덱스에 따라 해당 캐릭터 표시 및 테두리 색상 적용
        var index = $(this).index();
        switch (index) {
            case 0: // 코코몽
                $('.s2_cocomong').fadeIn(300);
                $(this).addClass('border-cocomong');
                break;
            case 1: // 아로미
                $('.s2_aromi').fadeIn(300);
                $(this).addClass('border-aromi');
                break;
            case 2: // 케로
                $('.s2_kero').fadeIn(300);
                $(this).addClass('border-kero');
                break;
            case 3: // 아글
                $('.s2_agul').fadeIn(300);
                $(this).addClass('border-agul');
                break;
            case 4: // 두리
                $('.s2_duri').fadeIn(300);
                $(this).addClass('border-duri');
                break;
            case 5: // 파닥
                $('.s2_padak').fadeIn(300);
                $(this).addClass('border-padak');
                break;
        }
    });

    // 초기 로드 시 첫 번째 슬라이드가 선택된 상태로 설정
    $('.slide_wrap img:first-child').attr('src', 'img/color_bg.png');
    $('.slide_wrap img:not(:first-child)').attr('src', 'img/black_bg.png');

    // 섹션4 슬라이더 - jQuery로 변경
    if (sliderTrack.length && slides.length && dots.length) {
        let currentIndex = 1; // 초기 인덱스는 첫 번째 슬라이드(active로 설정된 슬라이드)

        // 슬라이드 업데이트 함수
        function updateSlider() {
            // 모든 슬라이드에서 active 클래스 제거
            slides.removeClass('active');
            dots.removeClass('active');

            // 현재 인덱스의 슬라이드와 도트에 active 클래스 추가
            slides.eq(currentIndex).addClass('active');
            dots.eq(currentIndex).addClass('active');

            // 슬라이더 트랙 위치 조정 (중앙 정렬)
            const slideWidth = slides.first().width();
            sliderTrack.css('transform', `translateX(-${currentIndex * slideWidth}px)`);
        }

        // 다음 슬라이드 이동
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }

        // 이전 슬라이드 이동
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        }

        // 버튼 이벤트 리스너 추가
        nextBtn.on('click', nextSlide);
        prevBtn.on('click', prevSlide);

        // 도트 클릭 이벤트 리스너 추가
        dots.each(function (index) {
            $(this).on('click', function () {
                currentIndex = index;
                updateSlider();
            });
        });

        // 자동 슬라이드 설정 (선택 사항)
        const autoSlideInterval = 5000; // 5초마다 슬라이드 변경
        let autoSlideTimer = setInterval(nextSlide, autoSlideInterval);

        // 사용자 상호작용 시 자동 슬라이드 일시 중지 및 재개
        const sliderContainer = $('.slider_container');

        sliderContainer.on('mouseenter', function () {
            clearInterval(autoSlideTimer);
        });

        sliderContainer.on('mouseleave', function () {
            autoSlideTimer = setInterval(nextSlide, autoSlideInterval);
        });

        // 초기 슬라이더 설정
        updateSlider();

        // 터치 슬라이드 지원 (모바일 디바이스)
        let touchStartX = 0;
        let touchEndX = 0;

        sliderTrack.on('touchstart', function (e) {
            touchStartX = e.originalEvent.changedTouches[0].screenX;
        });

        sliderTrack.on('touchend', function (e) {
            touchEndX = e.originalEvent.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchStartX - touchEndX > 50) {
                // 왼쪽으로 스와이프 - 다음 슬라이드
                nextSlide();
            } else if (touchEndX - touchStartX > 50) {
                // 오른쪽으로 스와이프 - 이전 슬라이드
                prevSlide();
            }
        }
    }
}); //ready end