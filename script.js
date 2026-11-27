document.addEventListener('DOMContentLoaded', () => {
    const firebaseConfig = {
        apiKey: 'AIzaSyDug8slvE1sJIpAOtOe188bvGOMgBm09kY',
        authDomain: 'project-5900549989236517000.firebaseapp.com',
        databaseURL: 'https://project-5900549989236517000-default-rtdb.firebaseio.com',
        projectId: 'project-5900549989236517000',
        storageBucket: 'project-5900549989236517000.firebasestorage.app',
        messagingSenderId: '402957485429',
        appId: '1:402957485429:web:28764864203d57cfb6ff3c',
        measurementId: 'G-GKPQEFXY1T'
    };

    let firebaseDatabase = null;
    if (window.firebase) {
        const firebaseApp = window.firebase.initializeApp(firebaseConfig);
        firebaseDatabase = window.firebase.database(firebaseApp);
    }

    const translations = {
        zh: {
            navLabel: '網站導覽',
            profileNav: '個人介紹',
            skillsNav: '技能／專長',
            gamesNav: '遊戲紀錄',
            onlineStatus: 'ONLINE / EXPLORING',
            aboutKicker: '關於我',
            skillsKicker: '技能與專長',
            gamesKicker: '歷史最高',
            profileTitle: '嗨，我是周以秉',
            profileDescription: '目前就讀池上國中，平常喜歡打電動和吃生魚片。個性是正常人，正在慢慢探索自己喜歡的事物。',
            schoolLabel: 'SCHOOL',
            talentLabel: 'TALENT',
            interestsLabel: 'INTERESTS',
            birthdayLabel: 'BIRTHDAY',
            likeButton: '❤️ 給我一個讚',
            skillsTitle: '我會做的事',
            editingSkill: '剪輯',
            editingDescription: '隨便玩玩但我覺得我剪得不錯',
            violinSkill: '小提琴',
            violinDescription: '拉得很爛但還是拉',
            sportsSkill: '運動',
            sportsDescription: '800公尺2分30\n400公尺1分06\n100公尺不好說',
            debateSkill: '辯論',
            debateDescription: '喜歡跟你唱反調，像她不愛我我卻愛著她',
            gamesTitle: '遊戲紀錄',
            valorantRank: '白金一',
            valorantProgressLabel: '特戰英豪段位進度',
            valorantName: '名稱：愛停在那場雨 我困在那個你#000',
            brawlRank: '鑽石三',
            brawlId: 'ID：Imissherbecause',
            footerText: 'Designed by 周以秉 • HTML, CSS & JS'
        },
        en: {
            navLabel: 'Site navigation',
            profileNav: 'About Me',
            skillsNav: 'Skills',
            gamesNav: 'Game Records',
            onlineStatus: 'ONLINE / EXPLORING',
            aboutKicker: 'ABOUT ME',
            skillsKicker: 'SKILLS & TALENTS',
            gamesKicker: 'PERSONAL BEST',
            profileTitle: 'Hi, I am Zhou Yibing',
            profileDescription: 'I study at Chishang Junior High School. I enjoy gaming and eating sashimi, and I am exploring the things I love.',
            schoolLabel: 'SCHOOL',
            talentLabel: 'TALENT',
            interestsLabel: 'INTERESTS',
            birthdayLabel: 'BIRTHDAY',
            likeButton: '❤️ Like this page',
            skillsTitle: 'Things I Do',
            editingSkill: 'Video Editing',
            editingDescription: "Just messing around, but I think my edits are pretty good",
            violinSkill: 'Violin',
            violinDescription: "I'm not great, but I still play",
            sportsSkill: 'Sports',
            sportsDescription: '800 m: 2:30\n400 m: 1:06\n100 m: hard to say',
            debateSkill: 'Debate',
            debateDescription: "I like arguing the opposite, like she doesn't love me, but I love her",
            gamesTitle: 'Game Records',
            valorantRank: 'Platinum I',
            valorantProgressLabel: 'Valorant rank progress',
            valorantName: 'Name: 愛停在那場雨 我困在那個你#000',
            brawlRank: 'Diamond III',
            brawlId: 'ID: Imissherbecause',
            footerText: 'Designed by Zhou Yibing • HTML, CSS & JS'
        }
    };

    const languageToggle = document.getElementById('language-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    let currentLanguage = localStorage.getItem('site_language') || 'zh';

    function updateLanguage(language) {
        currentLanguage = language;
        const dictionary = translations[language];

        document.documentElement.lang = language === 'zh' ? 'zh-TW' : 'en';
        document.title = language === 'zh' ? '周以秉 | 個人主頁' : 'Zhou Yibing | Personal Page';
        document.querySelectorAll('[data-i18n]').forEach((element) => {
            element.textContent = dictionary[element.dataset.i18n];
        });
        document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
            element.setAttribute('aria-label', dictionary[element.dataset.i18nAriaLabel]);
        });

        if (languageToggle) {
            languageToggle.querySelector('span').textContent = language === 'zh' ? 'EN' : '中';
            languageToggle.setAttribute('aria-label', language === 'zh' ? '切換英文' : 'Switch to Chinese');
            languageToggle.setAttribute('aria-pressed', String(language === 'en'));
        }
        if (themeToggle) {
            updateTheme(document.body.classList.contains('light-theme'));
        }
        localStorage.setItem('site_language', language);
    }

    function updateTheme(isLight) {
        document.body.classList.toggle('light-theme', isLight);
        if (themeToggle) {
            themeToggle.querySelector('i').className = `fa-solid fa-${isLight ? 'moon' : 'sun'}`;
            themeToggle.querySelector('span').textContent = isLight ? (currentLanguage === 'zh' ? '深色' : 'Dark') : (currentLanguage === 'zh' ? '淺色' : 'Light');
            themeToggle.setAttribute('aria-label', isLight ? (currentLanguage === 'zh' ? '切換深色主題' : 'Switch to dark theme') : (currentLanguage === 'zh' ? '切換淺色主題' : 'Switch to light theme'));
            themeToggle.setAttribute('aria-pressed', String(isLight));
        }
        localStorage.setItem('site_theme', isLight ? 'light' : 'dark');
    }

    updateLanguage(currentLanguage);
    updateTheme(localStorage.getItem('site_theme') === 'light');

    languageToggle?.addEventListener('click', () => updateLanguage(currentLanguage === 'zh' ? 'en' : 'zh'));
    themeToggle?.addEventListener('click', () => updateTheme(!document.body.classList.contains('light-theme')));

    // ----------------------------------------------------
    // 0. Sidebar 導覽
    // ----------------------------------------------------
    const sidebar = document.getElementById('site-sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const pagePanels = document.querySelectorAll('.page-panel');

    function toggleSidebar(forceOpen) {
        const isOpen = forceOpen ?? !sidebar.classList.contains('is-open');
        sidebar.classList.toggle('is-open', isOpen);
        sidebarOverlay.classList.toggle('is-visible', isOpen);
        sidebarToggle.setAttribute('aria-expanded', String(isOpen));
        sidebarToggle.setAttribute('aria-label', isOpen ? '關閉網站選單' : '開啟網站選單');
        sidebarToggle.innerHTML = `<i class="fa-solid fa-${isOpen ? 'xmark' : 'bars'}"></i>`;
    }

    if (sidebar && sidebarToggle && sidebarOverlay) {
        sidebarToggle.addEventListener('click', () => toggleSidebar());
        sidebarOverlay.addEventListener('click', () => toggleSidebar(false));

        sidebarLinks.forEach((link) => {
            link.addEventListener('click', () => {
                const pageName = link.dataset.page;

                sidebarLinks.forEach((item) => {
                    const isActive = item === link;
                    item.classList.toggle('active', isActive);
                    item.setAttribute('aria-selected', String(isActive));
                });

                pagePanels.forEach((panel) => {
                    panel.hidden = panel.id !== `page-${pageName}`;
                });

                if (window.innerWidth <= 900) toggleSidebar(false);
            });
        });
    }

    // ----------------------------------------------------
    // 1. 打字機效果 (Typing Effect)
    // ----------------------------------------------------
    const tagline = document.querySelector('.tagline');
    const text = "< Gamer / Violinist / Developer >";
    if (tagline) {
        tagline.textContent = "";
        let index = 0;

        function typeWriter() {
            if (index < text.length) {
                tagline.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        typeWriter();
    }

    // ----------------------------------------------------
    // 2. 按讚功能（Firebase 雲端同步，無法連線時使用本機儲存）
    // ----------------------------------------------------
    const likeBtn = document.getElementById('like-btn');
    const likeCount = document.getElementById('like-count');

    let count = parseInt(localStorage.getItem('user_like_count'), 10) || 0;
    const likesRef = firebaseDatabase ? firebaseDatabase.ref('site/likes') : null;

    function showFloatingHeart(x, y) {
        if (!likeBtn) return;

        const heart = document.createElement('span');
        heart.classList.add('floating-heart');
        heart.textContent = '❤️';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        likeBtn.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
    }

    if (likeCount) {
        likeCount.textContent = count;
    }

    if (likesRef) {
        let previousCount = null;
        likesRef.on('value', (snapshot) => {
            const remoteCount = Number(snapshot.val());
            const nextCount = Number.isFinite(remoteCount) && remoteCount >= 0
                ? Math.floor(remoteCount)
                : 0;

            if (likeBtn && previousCount !== null && nextCount > previousCount) {
                const buttonRect = likeBtn.getBoundingClientRect();
                showFloatingHeart(buttonRect.width / 2, buttonRect.height / 2);
            }

            previousCount = nextCount;
            count = nextCount;
            if (likeCount) {
                likeCount.textContent = count;
            }
            localStorage.setItem('user_like_count', count);
        }, (error) => {
            console.error('Failed to listen for like count updates:', error);
        });
    }

    if (likeBtn) {
        likeBtn.addEventListener('click', (e) => {
            if (likesRef) {
                likesRef.transaction((currentCount) => {
                    const parsedCount = Number(currentCount);
                    const safeCount = Number.isFinite(parsedCount) && parsedCount >= 0
                        ? Math.floor(parsedCount)
                        : 0;
                    return safeCount + 1;
                }).catch((error) => {
                    console.error('Failed to save like:', error);
                });
            } else {
                count++;
                if (likeCount) {
                    likeCount.textContent = count;
                }
                localStorage.setItem('user_like_count', count);
                const buttonRect = likeBtn.getBoundingClientRect();
                showFloatingHeart(e.clientX - buttonRect.left, e.clientY - buttonRect.top);
            }
        });
    }

    // 點擊卡片即可複製 Discord、特戰或荒野名稱
    const copyCards = document.querySelectorAll('.copy-card');

    async function copyCardValue(card) {
        const value = card.dataset.copyValue;
        const hint = card.querySelector('.copy-hint');

        try {
            await navigator.clipboard.writeText(value);
        } catch {
            const fallbackInput = document.createElement('textarea');
            fallbackInput.value = value;
            fallbackInput.setAttribute('readonly', '');
            fallbackInput.style.position = 'fixed';
            fallbackInput.style.opacity = '0';
            document.body.appendChild(fallbackInput);
            fallbackInput.select();
            document.execCommand('copy');
            fallbackInput.remove();
        }

        card.classList.add('is-copied');
        if (hint) hint.textContent = '已複製！';
        setTimeout(() => {
            card.classList.remove('is-copied');
            if (hint) hint.textContent = '點擊複製';
        }, 1400);
    }

    copyCards.forEach((card) => {
        card.addEventListener('click', () => copyCardValue(card));
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                copyCardValue(card);
            }
        });
    });

});