// هذا الكود هو نقطة البداية لتشغيل جميع الوظائف بعد تحميل الصفحة بالكامل.
// أستخدم 'DOMContentLoaded' لأضمن أن جميع عناصر الـ HTML جاهزة للتعامل معها.
document.addEventListener('DOMContentLoaded', () => {

    // --- تعريف المتغيرات الرئيسية لعناصر الصفحة ---
    // هنا أقوم بتعريف المتغيرات لجميع العناصر التي سأتعامل معها لاحقًا في الكود.
    const header = document.getElementById('mainHeader');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    // --- وظائف الهيدر والقائمة المتنقلة العامة ---
    // هذا الجزء مسؤول عن تحسين تجربة المستخدم عبر التفاعل مع التمرير والقائمة الجانبية.
    
    // أضف مستمعًا لحدث التمرير 'scroll' على النافذة.
    // الهدف: تغيير مظهر الهيدر (شريط التنقل العلوي) عندما يتجاوز المستخدم 50 بكسل في التمرير لأسفل،
    // مما يعطي انطباعًا بصريًا أن المستخدم يتحرك داخل الصفحة.
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // عند النقر على زر فتح القائمة المتنقلة، أقوم بإظهار القائمة والطبقة الشفافة التي تغطي الصفحة.
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        mobileMenuOverlay.classList.add('active');
    });

    // عند النقر على زر إغلاق القائمة، أقوم بإخفائها مع الطبقة الشفافة.
    closeMobileMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenuOverlay.classList.remove('active');
    });

    // نفس وظيفة زر الإغلاق، ولكن عند النقر على الطبقة الشفافة نفسها.
    mobileMenuOverlay.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenuOverlay.classList.remove('active');
    });

    // هذه حلقة تقوم بتطبيق نفس وظيفة الإغلاق على جميع الروابط داخل القائمة المتنقلة،
    // مما يضمن إغلاق القائمة تلقائيًا بعد النقر على أي رابط.
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            mobileMenuOverlay.classList.remove('active');
        });
    });

    // هذا الشرط الأولي يتحقق عند تحميل الصفحة لأول مرة،
    // ويقوم بتطبيق تأثير التمرير على الهيدر إذا كانت الصفحة مفتوحة في موقع ليس في الأعلى.
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    // --- وظائف خاصة بصفحة "شارك قصتك" ---
    // هذا الجزء مسؤول عن خاصية سحب وإفلات الصورة، وعرض عدد الأحرف المكتوبة في حقل القصة.
    const imageUploadArea = document.getElementById('imageUploadArea');
    const storyImageInput = document.getElementById('storyImage');
    const storyContent = document.getElementById('storyContent');
    const charCount = document.querySelector('.text-left.text-xs.text-gray-500');

    // أتحقق من وجود العناصر في الصفحة قبل تطبيق الوظائف عليها.
    if (imageUploadArea && storyImageInput) {
        // منع السلوك الافتراضي للمتصفح (فتح الصورة في نافذة جديدة) عند السحب.
        imageUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            imageUploadArea.classList.add('border-blue-500');
        });
        // إزالة الحدود الزرقاء عند مغادرة الصورة لمنطقة السحب.
        imageUploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            imageUploadArea.classList.remove('border-blue-500');
        });
        // التعامل مع ملف الصورة الذي يتم إسقاطه.
        imageUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            imageUploadArea.classList.remove('border-blue-500');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                storyImageInput.files = files;
                console.log('Image dropped:', files[0].name);
            }
        });
        // السماح بالنقر على منطقة السحب لفتح نافذة اختيار الملفات.
        imageUploadArea.addEventListener('click', () => {
            storyImageInput.click();
        });
        // تسجيل اسم الملف المختار في console للتأكد من نجاح العملية.
        storyImageInput.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length > 0) {
                console.log('Image selected:', files[0].name);
            }
        });
    }

    // أضف مستمعًا لحدث 'input' على حقل القصة لتحديث عداد الأحرف فور الكتابة.
    if (storyContent && charCount) {
        storyContent.addEventListener('input', () => {
            const currentLength = storyContent.value.length;
            charCount.textContent = `${currentLength}/2000 حرف`;
        });
    }

    // --- وظائف صفحة "نصائح يومية" ---
    // هذا هو الجزء الذي قمت بتعديله ليعرض "جميع النصائح" بشكل افتراضي.
    const tipsData = [
        // هنا توجد بيانات ثابتة للنصائح، وكل كائن يمثل نصيحة واحدة.
        { id: 1, title: "تمرين التنفس العميق", content: "خذ نفساً عميقاً لمدة 4 ثوانٍ، احبس النفس لمدة 4 ثوانٍ، ثم أخرج النفس لمدة 6 ثوانٍ. كرر هذا التمرين 5 مرات لتقليل التوتر والقلق.", category: "mindfulness", categoryLabel: "اليقظة الذهنية", icon: "fas fa-leaf", date: "١٤٤٧/٧/٨ هـ", likes: 45 },
        { id: 2, title: "قائمة الامتنان اليومية", content: "اكتب ثلاثة أشياء تشعر بالامتنان لها كل يوم. هذه الممارسة البسيطة يمكنها تحسين مزاجك وتعزيز السعادة.", category: "mood-boosting", categoryLabel: "تعزيز المزاج", icon: "fas fa-feather-alt", date: "١٤٤٧/٧/١٤ هـ", likes: 32 },
        { id: 3, title: "روتين النوم الصحي", content: "اذهب إلى السرير في نفس الوقت واستيقظ في نفس الوقت كل يوم، حتى في عطلات نهاية الأسبوع. هذا يساعد على تنظيم ساعة جسمك الداخلية وتحسين جودة نومك.", category: "sleep-improvement", categoryLabel: "تحسين النوم", icon: "fas fa-moon", date: "١٤٤٧/٧/١٣ هـ", likes: 28 },
        { id: 4, title: "الاستراحة الرقمية", content: "خصص وقتاً في يومك للابتعاد عن الشاشات. اترك هاتفك جانباً واستمتع بالنشاطات الأخرى مثل القراءة أو المشي أو التحدث مع الأصدقاء.", category: "healthy-habits", categoryLabel: "العادات الصحية", icon: "fas fa-mobile-alt", date: "١٤٤٧/٧/١١ هـ", likes: 58 },
        { id: 5, title: "كتابة اليوميات", content: "ابدأ بكتابة يومياتك. قم بتدوين أفكارك ومشاعرك ومخاوفك، فهذا يساعد على تنظيمها والتخلص من التوتر المتراكم.", category: "stress-relief", categoryLabel: "التخلص من التوتر", icon: "fas fa-pen-alt", date: "١٤٤٧/٧/٩ هـ", likes: 29 },
        { id: 6, title: "تقنية التأريض 5-4-3-2-1", content: "لاحظ 5 أشياء تراها، 4 أصوات تسمعها، 3 أشياء تلمسها، 2 رائحتين تشمهما، وطعمًا واحدًا تتذوقه. هذا يساعدك على العودة للحظة الحالية.", category: "anxiety", categoryLabel: "إدارة القلق", icon: "fas fa-hand-holding-heart", date: "١٤٤٧/٧/٧ هـ", likes: 51 },
        { id: 7, title: "التواصل الفعال", content: "عند التحدث مع شخص مهم، ركز على الاستماع الفعال. اطرح أسئلة مفتوحة وأظهر اهتمامًا حقيقًا بما يقوله.", category: "healthy-habits", categoryLabel: "العادات الصحية", icon: "fas fa-comments", date: "١٤٤٧/٧/٦ هـ", likes: 39 },
        { id: 8, title: "تحدي الأفكار السلبية", content: "عندما تراودك فكرة سلبية، اسأل نفسك: 'هل هذا صحيح؟ هل يوجد دليل على ذلك؟ ما هو أسوأ ما يمكن أن يحدث فعلاً؟'.", category: "anxiety", categoryLabel: "إدارة القلق", icon: "fas fa-lightbulb", date: "١٤٤٧/٧/١ هـ", likes: 43 },
        { id: 9, title: "العثور على الإلهام", content: "ابحث عن قصة ملهمة كل يوم. قراءة قصص نجاح أو مشاهدة فيديوهات تحفيزية يمكن أن يغير منظورك.", category: "mood-boosting", categoryLabel: "تعزيز المزاج", icon: "fas fa-brain", date: "١٤٤٧/٦/٢٨ هـ", likes: 22 },
        { id: 10, title: "جدول للوقت", content: "قم بتخصيص وقت محدد لكل مهمة خلال يومك، فهذا يساعد على تنظيم أفكارك وتقليل شعورك بالضياع.", category: "healthy-habits", categoryLabel: "العادات الصحية", icon: "fas fa-clock", date: "١٤٤٧/٦/٢٢ هـ", likes: 19 },
        { id: 11, title: "الاستماع إلى الموسيقى", content: "استمع إلى مقطوعتك الموسيقية المفضلة. الموسيقى تؤثر بشكل إيجابي على الحالة النفسية وتساعد على الاسترخاء.", category: "mood-boosting", categoryLabel: "تعزيز المزاج", icon: "fas fa-music", date: "١٤٤٧/٦/١٨ هـ", likes: 38 }
    ];

    const tipsContainer = document.getElementById('tips-container');
    const filterButtons = document.querySelectorAll('.btn-filter-tip');

    // دالة تقوم بإنشاء وعرض بطاقات النصائح ديناميكيًا على الصفحة.
    function renderTips(tipsToRender) {
        if (!tipsContainer) return;
        tipsContainer.innerHTML = '';
        if (tipsToRender.length === 0) {
            tipsContainer.innerHTML = '<p class="text-center text-gray-500 text-lg py-10">لا توجد نصائح مطابقة للفئة المحددة.</p>';
            return;
        }
        tipsToRender.forEach(tip => {
            const tipCard = `
                <div class="daily-tip-card p-6 bg-white rounded-xl shadow-md transition-all duration-300">
                    <div class="flex justify-between items-center mb-4">
                        <div class="flex items-center">
                            <div class="tip-icon-small tip-icon ${tip.category}">
                                <i class="${tip.icon}"></i>
                            </div>
                            <div class="mr-4">
                                <h3 class="text-xl font-bold">${tip.title}</h3>
                                <div class="flex items-center space-x-reverse space-x-2">
                                    <span class="tip-category-tag ${tip.category}">${tip.categoryLabel}</span>
                                    <p class="text-sm text-gray-500">${tip.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="text-gray-600 leading-relaxed mb-6">${tip.content}</p>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <div class="flex items-center space-x-reverse space-x-4">
                            <a href="#" class="flex items-center hover:text-green-500">
                                <i class="fas fa-bookmark ml-1"></i>
                                <span>حفظ</span>
                            </a>
                            <a href="#" class="flex items-center hover:text-purple-500">
                                <i class="fas fa-share-alt ml-1"></i>
                                <span>مشاركة</span>
                            </a>
                            <button class="likes-btn flex items-center" data-tip-id="${tip.id}">
                                <i class="fas fa-heart ml-1"></i>
                                <span>${tip.likes}</span>
                            </button>
                        </div>
                        <a href="#" class="try-now-btn">
                            جرب الآن
                        </a>
                    </div>
                </div>
            `;
            tipsContainer.insertAdjacentHTML('beforeend', tipCard);
        });
        // أُضيف مستمعات الأحداث لأزرار الإعجاب بعد إضافة البطاقات إلى الصفحة.
        addLikeButtonListeners();
    }

    // هذه الدالة تتعامل مع فلترة النصائح عند النقر على أي زر تصنيف.
    function filterTips(e) {
        const selectedCategory = e.target.dataset.category;
        // هنا أقوم بإزالة كلاسات التحديد من جميع الأزرار.
        filterButtons.forEach(btn => {
            btn.classList.remove('active-filter');
            btn.classList.remove('bg-gradient-to-r', 'from-blue-500', 'to-green-400', 'text-white');
            btn.classList.add('bg-white', 'text-gray-600', 'border', 'border-gray-300');
        });
        // ثم أضيف كلاسات التحديد للزر الذي تم النقر عليه.
        e.target.classList.add('active-filter', 'bg-gradient-to-r', 'from-blue-500', 'to-green-400', 'text-white');
        e.target.classList.remove('bg-white', 'text-gray-600', 'border', 'border-gray-300');

        // إذا كانت الفئة المختارة هي 'all' (الكل)، اعرض جميع النصائح، وإلا، اعرض النصائح المفلترة.
        if (selectedCategory === 'all') {
            renderTips(tipsData);
        } else {
            const filteredTips = tipsData.filter(tip => tip.category === selectedCategory);
            renderTips(filteredTips);
        }
    }
    
    // دالة تُعالج النقر على زر الإعجاب.
    function handleLikeClick(e) {
        const button = e.currentTarget;
        const tipId = parseInt(button.dataset.tipId);
        const tip = tipsData.find(t => t.id === tipId);
        if (tip) {
            // أغيّر لون الزر وأزيد أو أنقص عدد الإعجابات.
            const isLiked = button.classList.toggle('liked');
            if (isLiked) {
                tip.likes++;
            } else {
                tip.likes--;
            }
            const likesSpan = button.querySelector('span');
            likesSpan.textContent = tip.likes;
        }
    }
    
    // دالة مساعدة تُضيف مستمعي الأحداث لأزرار الإعجاب.
    function addLikeButtonListeners() {
        const likeButtons = document.querySelectorAll('.likes-btn');
        likeButtons.forEach(button => {
            button.addEventListener('click', handleLikeClick);
        });
    }

    // --- هذا هو الجزء الأهم في هذا السكربت ---
    // هنا أقوم بتهيئته عند تحميل الصفحة.
    if (tipsContainer) {
        // أضف مستمعي الأحداث لجميع أزرار الفلترة.
        filterButtons.forEach(button => {
            button.addEventListener('click', filterTips);
        });
        
        //  ليعرض كل النصائح.
        const initialTips = tipsData; 
        renderTips(initialTips);
        
        // وهنا أقوم بتحديد زر "جميع النصائح" كنشط عند تحميل الصفحة.
        document.querySelector('.btn-filter-tip[data-category="all"]').classList.add('active-filter', 'bg-gradient-to-r', 'from-blue-500', 'to-green-400', 'text-white');
        document.querySelector('.btn-filter-tip[data-category="all"]').classList.remove('bg-white', 'text-gray-600', 'border', 'border-gray-300');
    }
    
    // --- وظائف تحدي الأسبوع ---
    // هذا الجزء من الكود مسؤول عن التفاعل مع تحدي الأسبوع في الصفحة الرئيسية.
    const acceptChallengeBtn = document.getElementById('acceptChallengeBtn');
    const dayButtons = document.querySelectorAll('.day-btn');
    if (acceptChallengeBtn && dayButtons.length > 0) {
        let challengeAccepted = false;
        // عند النقر على زر "قبول التحدي"، أغير حالته وأعرض رسالة تنبيه للمستخدم.
        acceptChallengeBtn.addEventListener('click', () => {
            if (!challengeAccepted) {
                challengeAccepted = true;
                acceptChallengeBtn.textContent = 'تم قبول التحدي!';
                acceptChallengeBtn.classList.add('is-accepted');
                alert('تهانينا! لقد قبلت تحدي هذا الأسبوع. ابدأ الآن!');
            }
        });
        // عند النقر على أحد أزرار الأيام، أغير حالته إلى "مكتمل" إذا كان التحدي مقبولًا.
        dayButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (challengeAccepted) {
                    button.classList.toggle('is-completed');
                } else {
                    alert('يرجى قبول التحدي أولاً!');
                }
            });
        });
    }
});