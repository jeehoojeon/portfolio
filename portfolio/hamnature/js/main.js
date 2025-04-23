$(document).ready(function() {
    // 텍스트 효과를 적용할 모든 요소 선택
    const textElements = $('.big_txt, .big_txt2');
    
    // CSS 스타일 추가
    $('<style>')
        .text(`
            .fill-text {
                position: relative;
                display: inline-block;
            }
            .fill-text .original {
                color: #EDEDED;
            }
            .fill-text .fill {
                position: absolute;
                top: 0;
                left: 0;
                color: #FFB400;
                overflow: hidden;
                height: 0;
                transition: height 0.3s ease-out;
            }
        `)
        .appendTo('head');
    
    // 각 텍스트 요소에 효과 적용
    textElements.each(function() {
        const element = $(this);
        // 기존 HTML 저장
        const originalHtml = element.html();
        
        // <br> 태그로 분리하여 각 줄에 효과 적용
        const lines = originalHtml.split('<br>');
        let newHtml = '';
        
        lines.forEach((line, lineIndex) => {
            if (lineIndex > 0) newHtml += '<br>';
            
            // 줄 내용 정리 (공백 제거, HTML 태그 처리)
            const cleanLine = line.trim();
            // 텍스트 내용 추출
            const textContent = $('<div>').html(cleanLine).text();
            
            // 효과 적용
            newHtml += `<span class="fill-text"><span class="original">${textContent}</span><span class="fill">${textContent}</span></span>`;
        });
        
        element.html(newHtml);
    });
    
    // 스크롤 이벤트 감지
    $(window).scroll(function() {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        
        // 각 텍스트 요소마다 개별적으로 효과 적용
        textElements.each(function() {
            const element = $(this);
            
            // 요소의 위치 정보
            const elementTop = element.offset().top;
            const elementHeight = element.outerHeight();
            
            // 효과를 시작할 스크롤 위치와 끝낼 위치 설정
            const startScroll = elementTop - windowHeight * 0.8;
            const endScroll = elementTop + elementHeight * 0.3;
            
            // 스크롤 위치에 따른 채우기 효과 계산
            if (scrollTop >= startScroll && scrollTop <= endScroll) {
                // 스크롤 진행률 계산 (0~1 사이 값)
                let fillProgress = (scrollTop - startScroll) / (endScroll - startScroll);
                
                // 진행률 제한 (0~1 사이)
                fillProgress = Math.max(0, Math.min(1, fillProgress));
                
                // 부드러운 효과를 위한 easing 적용
                fillProgress = easeInOutQuad(fillProgress);
                
                // 텍스트 채우기 효과 적용
                element.find('.fill').css('height', (fillProgress * 101) + '%'); // 101%로 설정하여 완전히 채워지도록
            } else if (scrollTop < startScroll) {
                element.find('.fill').css('height', '0%');
            } else if (scrollTop > endScroll) {
                element.find('.fill').css('height', '101%'); // 101%로 설정하여 완전히 채워지도록
            }
        });
    });
    
    // 부드러운 애니메이션을 위한 easing 함수
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }
    
    // 페이지 로드 시 스크롤 이벤트 강제 발생시켜 초기 상태 설정
    setTimeout(function() {
        $(window).trigger('scroll');
    }, 100);
    
    // 언어 토글 기능 구현 - 여기서부터 새로 추가된 코드
    $('#langToggle').click(function(e) {
        e.preventDefault(); // 기본 링크 동작 방지
        
        // 현재 언어 상태 확인
        const currentLang = $(this).data('lang');
        
        if(currentLang === 'kr') {
            // 영어로 변경
            $(this).data('lang', 'en');
            $('#langImg').attr('src', 'img/header_lang_en.png'); // 영어 이미지로 변경
            
            // 여기에 사이트 언어를 영어로 변경하는 추가 코드 작성
            // 예: $('.selector').text('English Text');
            
            console.log('Language changed to English');
        } else {
            // 한국어로 변경
            $(this).data('lang', 'kr');
            $('#langImg').attr('src', 'img/header_lang.png'); // 한국어 이미지로 변경
            
            // 여기에 사이트 언어를 한국어로 변경하는 추가 코드 작성
            // 예: $('.selector').text('한국어 텍스트');
            
            console.log('Language changed to Korean');
        }
    });
});