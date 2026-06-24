const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const themeToggle = document.getElementById('theme-toggle');
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const langToggleBtn = document.getElementById('lang-toggle-btn');
const langMenu = document.querySelector('.lang-menu');
const langItems = document.querySelectorAll('.lang-item');

const translations = {
  fr: {
    brand: 'Imperial Building Group',
    nav_home: 'Accueil',
    nav_services: 'Services',
    nav_gallery: 'Galerie',
    nav_about: 'À propos',
    nav_contact: 'Contact',
    nav_careers: 'Carrières',
    hero_title: 'Construction & rénovation haut de gamme',
    hero_text: 'Nous accompagnons vos projets résidentiels et professionnels avec savoir-faire, design et efficacité.',
    hero_cta: 'Nos services',
    theme_toggle: 'Mode sombre',
    theme_toggle_light: 'Mode clair',
    services_title: 'Nos services',
    card_conception_title: 'Étude & conception',
    card_conception_text: 'Plans personnalisés et suivi d\'étude architecturale pour des réalisations solides et esthétiques.',
    card_renovation_title: 'Rénovation intelligente',
    card_renovation_text: 'Remise à neuf, optimisation d\'espace et modernisation de vos bâtiments avec une finition soignée.',
    card_gestion_title: 'Gestion de chantier',
    card_gestion_text: 'Coordination complète des travaux, respect des délais et contrôle qualité jusqu\'à la livraison.',
    card_formation_title: 'Formation BTP & Logiciels',
    card_formation_text: 'Formations professionnelles en techniques de construction et logiciels techniques pour développer vos compétences.',
    card_materiaux_title: 'Vente Matériaux',
    card_materiaux_text: 'Distribution de matériaux de construction de qualité supérieure au meilleur prix pour vos projets.',
    gallery_title: 'Galerie de réalisations',
    gallery_intro: 'Découvrez quelques-uns de nos chantiers, rénovations et projets d\'aménagement réalisés avec soin.',
    gallery_caption_1: 'Rénovation intérieure moderne',
    gallery_caption_2: 'Façade de bâtiment rénovée',
    gallery_caption_3: 'Projet de conception architecturale',
    gallery_caption_4: 'Espace de vie rénové',
    gallery_caption_5: 'Chantier de construction',
    gallery_caption_6: 'Réaménagement de bureau',
    about_title: 'À propos d\'Imperial Building Group',
    about_text_1: 'Imperial Building Group est votre partenaire de confiance pour des réalisations durables, élégantes et sécurisées.',
    about_text_2: 'Nous mettons l\'accent sur la qualité, la transparence et l\'accompagnement à chaque étape de votre projet.',
    promise_title: 'Notre promesse',
    promise_item_1: 'Des chantiers propres et organisés',
    promise_item_2: 'Des délais respectés',
    promise_item_3: 'Un suivi client personnalisé',
    contact_title: 'Contact',
    contact_text: 'Envoyez un message pour discuter de votre projet.',
    follow_us_title: 'Suivez-nous',
    follow_us_text: 'Retrouvez nos projets, actualités et conseils sur les réseaux sociaux :',
    label_name: 'Nom',
    label_email: 'Email',
    label_message: 'Message',
    placeholder_name: 'Votre nom',
    placeholder_email: 'Votre email',
    placeholder_message: 'Votre message',
    contact_send: 'Envoyer',
    careers_title: 'Postuler chez Imperial Building Group',
    careers_description: 'Envoyez-nous votre candidature pour rejoindre notre équipe. Remplissez le formulaire ci‑dessous.',
    careers_file_note: 'Si vous joignez un CV, notez que le fichier ne sera pas automatiquement attaché à l\'e-mail généré; après ouverture du client mail, pensez à l\'attacher manuellement si nécessaire.',
    careers_label_name: 'Nom complet',
    careers_label_email: 'Email',
    careers_label_phone: 'Téléphone',
    careers_label_position: 'Poste visé',
    careers_option_general: 'Général',
    careers_option_site_manager: 'Chef de chantier',
    careers_option_mason: 'Maçon',
    careers_option_electrician: 'Électricien',
    careers_option_plumber: 'Plombier',
    careers_option_other: 'Autre',
    careers_label_message: 'Message',
    careers_label_cv: 'CV (fichier)',
    careers_submit: 'Envoyer la candidature',
    placeholder_careers_name: 'Votre nom',
    placeholder_careers_email: 'Votre email',
    placeholder_careers_phone: 'Votre téléphone',
    placeholder_careers_position: 'Sélectionnez un poste',
    placeholder_careers_message: 'Votre lettre de motivation',
    footer_text: '© 2026 Imperial Building Group. Tous droits réservés.',
    form_error: 'Veuillez renseigner votre nom et votre email.',
    form_success: 'Merci ! Votre message a bien été pris en compte.',
    services_stone_title: 'Fabrication & pose des pierres plates',
    services_stone_text: 'Fabrication sur mesure et pose de pierres plates pour façades, dallages et parements.',
    services_backfill_title: 'Garnissage & remblaiement',
    services_backfill_text: 'Garnissage et remblaiement pour fondations, nivellement et préparation de terrain.',
    services_gardening_title: 'Jardinage & aménagement paysager',
    services_gardening_text: 'Création et entretien d\'espaces verts, plantations, engazonnement et systèmes d\'irrigation.',
    services_paint_title: 'Peinture bâtiment',
    services_paint_text: 'Peinture intérieure et extérieure, finitions durables et traitements anti-humidité.',
    services_procurement_title: 'Approvisionnement & logistique',
    services_procurement_text: 'Gestion des matériaux, approvisionnement, livraison et coordination logistique pour respecter les délais.',
  },
  en: {
    brand: 'Imperial Building Group',
    nav_home: 'Home',
    nav_services: 'Services',
    nav_gallery: 'Gallery',
    nav_about: 'About',
    nav_contact: 'Contact',
    nav_careers: 'Careers',
    hero_title: 'High-end construction & renovation',
    hero_text: 'We support your residential and commercial projects with craftsmanship, design, and efficiency.',
    hero_cta: 'Our services',
    theme_toggle: 'Dark mode',
    theme_toggle_light: 'Light mode',
    services_title: 'Our services',
    card_conception_title: 'Design & planning',
    card_conception_text: 'Custom plans and architectural study support for strong and aesthetic projects.',
    card_renovation_title: 'Smart renovation',
    card_renovation_text: 'Refurbishment, space optimization, and modernization of your buildings with fine finishes.',
    card_gestion_title: 'Site management',
    card_gestion_text: 'Complete coordination of work, deadline management and quality control until delivery.',
    card_formation_title: 'Training in construction & software',
    card_formation_text: 'Professional training in construction techniques and software to grow your skills.',
    card_materiaux_title: 'Material sales',
    card_materiaux_text: 'Distribution of high-quality construction materials at the best price for your projects.',
    services_stone_title: 'Stone fabrication & installation',
    services_stone_text: 'Custom stone fabrication and installation for facades, pavements, and cladding.',
    services_backfill_title: 'Backfill & leveling',
    services_backfill_text: 'Backfill and leveling for foundations, grading, and site preparation.',
    services_gardening_title: 'Gardening & landscaping',
    services_gardening_text: 'Green space creation and maintenance, planting, turfing and irrigation systems.',
    services_paint_title: 'Building painting',
    services_paint_text: 'Interior and exterior painting, durable finishes and anti-moisture treatments.',
    services_procurement_title: 'Procurement & logistics',
    services_procurement_text: 'Material management, procurement, delivery and logistics coordination to meet deadlines.',
    gallery_title: 'Project gallery',
    gallery_intro: 'Discover some of our sites, renovations and fit-out projects completed with care.',
    gallery_caption_1: 'Modern interior renovation',
    gallery_caption_2: 'Renovated building facade',
    gallery_caption_3: 'Architectural design project',
    gallery_caption_4: 'Renovated living space',
    gallery_caption_5: 'Construction site',
    gallery_caption_6: 'Office redesign',
    about_title: 'About Imperial Building Group',
    about_text_1: 'Imperial Building Group is your trusted partner for durable, elegant and secure projects.',
    about_text_2: 'We focus on quality, transparency and support at every stage of your project.',
    promise_title: 'Our promise',
    promise_item_1: 'Clean and organized sites',
    promise_item_2: 'Deadlines respected',
    promise_item_3: 'Personalized client follow-up',
    contact_title: 'Contact',
    contact_text: 'Send a message to discuss your project.',
    follow_us_title: 'Follow us',
    follow_us_text: 'Find our projects, news and tips on social media:',
    label_name: 'Name',
    label_message: 'Message',
    placeholder_name: 'Your name',
    placeholder_email: 'Your email',
    placeholder_message: 'Your message',
    contact_send: 'Send',
    careers_title: 'Apply at Imperial Building Group',
    careers_description: 'Send us your application to join our team. Fill in the form below.',
    careers_file_note: 'If you attach a CV, note that the file will not be automatically attached to the generated email; after opening your mail client, remember to attach it manually if needed.',
    careers_label_name: 'Full name',
    careers_label_email: 'Email',
    careers_label_phone: 'Phone',
    careers_label_position: 'Position applied for',
    careers_option_general: 'General',
    careers_option_site_manager: 'Site manager',
    careers_option_mason: 'Mason',
    careers_option_electrician: 'Electrician',
    careers_option_plumber: 'Plumber',
    careers_option_other: 'Other',
    careers_label_message: 'Message',
    careers_label_cv: 'CV (file)',
    careers_submit: 'Send application',
    placeholder_careers_name: 'Your name',
    placeholder_careers_email: 'Your email',
    placeholder_careers_phone: 'Your phone',
    placeholder_careers_position: 'Select a position',
    placeholder_careers_message: 'Your cover letter',
    footer_text: '© 2026 Imperial Building Group. All rights reserved.',
    form_error: 'Please provide your name and email.',
    form_success: 'Thank you! Your message has been submitted.',
  },
  ln: {
    brand: 'Imperial Building Group',
    nav_home: 'Ndako',
    nav_services: 'Mibeko',
    nav_gallery: 'Galerie',
    nav_about: 'Malamu',
    nav_contact: 'Kosolola',
    nav_careers: 'Mibeko ya misala',
    hero_title: 'Kosala & kosimba eloko ya ezaleli ya pete',
    hero_text: 'Tosalisaka mikano na biso ya boloko mpe ya mosala na bokoko, lobiko mpe bokasi.',
    hero_cta: 'Mibeko na biso',
    theme_toggle: 'Mode ya molili',
    theme_toggle_light: 'Mode ya elengi',
    services_title: 'Mibeko na biso',
    card_conception_title: 'Kobanisa & kokata',
    card_conception_text: 'Baplan ya ndenge na ndenge mpe kosalisa na etudes ya architecture mpo na misala makasi mpe ya kitoko.',
    card_renovation_title: 'Kosimba malamu',
    card_renovation_text: 'Kozonga na sika, kobongisa esika mpe kolakisa balabola na biteni ya kitoko.',
    card_gestion_title: 'Kosunga chantier',
    card_gestion_text: 'Kosangisa mosala mobimba, kotalela mikolo mpe kontrol qualité kino na kobimisa.',
    card_formation_title: 'Batela BTP & logiciels',
    card_formation_text: 'Masanoli na mosala ya construction mpe logiciels mpo na kokolisa mayele na bino.',
    card_materiaux_title: 'Kobomba biloko',
    card_materiaux_text: 'Kozwa biloko ya construction ya kitoko na mbongo malamu mpo na mipasi na bino.',
    services_stone_title: 'Fabrikasiyo & pose ya pierres plates',
    services_stone_text: 'Fabrikasiyo na pose ya pierres plates mpo na façades, dallages mpe parements.',
    services_backfill_title: 'Garnissage & remblaiement',
    services_backfill_text: 'Garnissage mpe remblaiement mpo na fondations, nivellement mpe préparation ya terrain.',
    services_gardening_title: 'Jardinage & aménagement paysager',
    services_gardening_text: 'Kokela mpe kosala ba espaces verts, plantations, engazonnement mpe systèmes d irrigation.',
    services_paint_title: 'Peinture bâtiment',
    services_paint_text: 'Peinture intérieure mpe extérieure, finitions durables mpe traitements anti-humidité.',
    services_procurement_title: 'Approvisionnement & logistique',
    services_procurement_text: 'Gestion ya biloko, approvisionnement, livraison mpe coordination logistique mpo na kotya mikolo.',
    gallery_title: 'Galerie ya misala',
    gallery_intro: 'Tala biteni ya biso ya chantier, kosimba mpe ba projets ya aménagement oyo ebimi na motema.',
    gallery_caption_1: 'Kosimba ndako ya malamu',
    gallery_caption_2: 'Fasade ya bâtiment oyo esimbami',
    gallery_caption_3: 'Projet ya conception architecturale',
    gallery_caption_4: 'Espace ya bomoi oyo esimbami',
    gallery_caption_5: 'Chantier ya construction',
    gallery_caption_6: 'Kosala ndako ya bureau',
    about_title: 'Makambo ya Imperial Building Group',
    about_text_1: 'Imperial Building Group ezali partenaire na bino ya mposa ya misala oyo eza malamu, kitoko mpe bobotami.',
    about_text_2: 'Tozali na misala ya kokoba na qualité, transparence mpe kosalisa na nzela nyonso ya projet na bino.',
    promise_title: 'Loyembo na biso',
    promise_item_1: 'Chantiers propre mpe organisés',
    promise_item_2: 'Ba délais ekozala respectés',
    promise_item_3: 'Suivi ya client oyo ezalaka na lolenge moko',
    contact_title: 'Kosolola',
    contact_text: 'Somba mokano mpo na koloba na projet na yo.',
    follow_us_title: 'Tosusu na biso',
    follow_us_text: 'Tala misala na biso, actualités mpe mabongisi na ba réseaux sociaux :',
    label_name: 'Kombo',
    label_message: 'Mokano',
    placeholder_name: 'Kombo na yo',
    placeholder_email: 'Email na yo',
    placeholder_message: 'Mokano na yo',
    contact_send: 'Tinda',
    careers_title: 'Kobakisa na Imperial Building Group',
    careers_description: 'Tindá biso mokano na bino mpo na kokóma misele na biso. Tondimi forme oyo epesami na nse.',
    careers_file_note: 'Soki otindá CV, kende ozali koluka ete fichier ebongisami te na email oyo ebimelami; soki email ebimá, koyeba koyika fichier yango manuallement soki esengeli.',
    careers_label_name: 'Kombo mobimba',
    careers_label_email: 'Email',
    careers_label_phone: 'Téléphone',
    careers_label_position: 'Poste oyo ozali kolanda',
    careers_option_general: 'Général',
    careers_option_site_manager: 'Chef de chantier',
    careers_option_mason: 'Maçon',
    careers_option_electrician: 'Électricien',
    careers_option_plumber: 'Plombier',
    careers_option_other: 'Autre',
    careers_label_message: 'Mokano',
    careers_label_cv: 'CV (fichier)',
    careers_submit: 'Tinda candidature',
    placeholder_careers_name: 'Kombo na yo',
    placeholder_careers_email: 'Email na yo',
    placeholder_careers_phone: 'Téléphone na yo',
    placeholder_careers_position: 'Séléctionner poste',
    placeholder_careers_message: 'Mokano na yo',
    footer_text: '© 2026 Imperial Building Group. Respect biloko nyonso ekobaki.',
    form_error: 'Kosalisa kombo na yo mpe email na yo.',
    form_success: 'Matondo ! Mokano na yo ememelami malamu.',
  },
  es: {
    brand: 'Imperial Building Group',
    nav_home: 'Inicio',
    nav_services: 'Servicios',
    nav_gallery: 'Galería',
    nav_about: 'Sobre',
    nav_contact: 'Contacto',
    nav_careers: 'Carreras',
    hero_title: 'Construcción y renovación de alta gama',
    hero_text: 'Apoyamos tus proyectos residenciales y comerciales con experiencia, diseño y eficiencia.',
    hero_cta: 'Nuestros servicios',
    theme_toggle: 'Modo oscuro',
    theme_toggle_light: 'Modo claro',
    services_title: 'Nuestros servicios',
    card_conception_title: 'Estudio y diseño',
    card_conception_text: 'Planos personalizados y seguimiento de estudio arquitectónico para realizaciones sólidas y estéticas.',
    card_renovation_title: 'Renovación inteligente',
    card_renovation_text: 'Reacondicionamiento, optimización de espacio y modernización de sus edificios con un acabado cuidado.',
    card_gestion_title: 'Gestión de obra',
    card_gestion_text: 'Coordinación completa de trabajos, respeto de plazos y control de calidad hasta la entrega.',
    card_formation_title: 'Formación BTP & software',
    card_formation_text: 'Formaciones profesionales en técnicas de construcción y software técnico para desarrollar sus competencias.',
    card_materiaux_title: 'Venta de materiales',
    card_materiaux_text: 'Distribución de materiales de construcción de alta calidad al mejor precio para tus proyectos.',
    services_stone_title: 'Fabricación y colocación de piedra',
    services_stone_text: 'Fabricación personalizada y colocación de piedras planas para fachadas, pavimentos y revestimientos.',
    services_backfill_title: 'Garnished & relleno',
    services_backfill_text: 'Garnished y relleno para cimientos, nivelación y preparación del terreno.',
    services_gardening_title: 'Jardinería & paisajismo',
    services_gardening_text: 'Creación y mantenimiento de áreas verdes, plantaciones, césped y sistemas de riego.',
    services_paint_title: 'Pintura de edificios',
    services_paint_text: 'Pintura interior y exterior, acabados duraderos y tratamientos antihumedad.',
    services_procurement_title: 'Aprovisionamiento & logística',
    services_procurement_text: 'Gestión de materiales, aprovisionamiento, entrega y coordinación logística para cumplir los plazos.',
    gallery_title: 'Galería de proyectos',
    gallery_intro: 'Descubre algunos de nuestros sitios, renovaciones y proyectos de acondicionamiento realizados con cuidado.',
    gallery_caption_1: 'Renovación interior moderna',
    gallery_caption_2: 'Fachada de edificio renovada',
    gallery_caption_3: 'Proyecto de diseño arquitectónico',
    gallery_caption_4: 'Espacio habitable renovado',
    gallery_caption_5: 'Sitio de construcción',
    gallery_caption_6: 'Rediseño de oficina',
    about_title: 'Sobre Imperial Building Group',
    about_text_1: 'Imperial Building Group es su socio de confianza para proyectos duraderos, elegantes y seguros.',
    about_text_2: 'Nos centramos en la calidad, la transparencia y el acompañamiento en cada etapa de su proyecto.',
    promise_title: 'Nuestra promesa',
    promise_item_1: 'Sitios limpios y organizados',
    promise_item_2: 'Plazos respetados',
    promise_item_3: 'Seguimiento personalizado del cliente',
    contact_title: 'Contacto',
    contact_text: 'Envía un mensaje para discutir tu proyecto.',
    follow_us_title: 'Síguenos',
    follow_us_text: 'Descubre nuestros proyectos, noticias y consejos en redes sociales:',
    label_name: 'Nombre',
    label_message: 'Mensaje',
    placeholder_name: 'Tu nombre',
    placeholder_email: 'Tu correo',
    placeholder_message: 'Tu mensaje',
    contact_send: 'Enviar',
    careers_title: 'Aplica en Imperial Building Group',
    careers_description: 'Envíanos tu candidatura para unirte a nuestro equipo. Completa el formulario a continuación.',
    careers_file_note: 'Si adjuntas un CV, ten en cuenta que el archivo no se adjuntará automáticamente al correo generado; después de abrir tu cliente de correo, recuerda adjuntarlo manualmente si es necesario.',
    careers_label_name: 'Nombre completo',
    careers_label_email: 'Correo',
    careers_label_phone: 'Teléfono',
    careers_label_position: 'Puesto deseado',
    careers_option_general: 'General',
    careers_option_site_manager: 'Jefe de obra',
    careers_option_mason: 'Albañil',
    careers_option_electrician: 'Electricista',
    careers_option_plumber: 'Fontanero',
    careers_option_other: 'Otro',
    careers_label_message: 'Mensaje',
    careers_label_cv: 'CV (archivo)',
    careers_submit: 'Enviar candidatura',
    placeholder_careers_name: 'Tu nombre',
    placeholder_careers_email: 'Tu correo',
    placeholder_careers_phone: 'Tu teléfono',
    placeholder_careers_position: 'Selecciona un puesto',
    placeholder_careers_message: 'Tu carta de presentación',
    footer_text: '© 2026 Imperial Building Group. Todos los derechos reservados.',
    form_error: 'Por favor proporciona tu nombre y correo.',
    form_success: '¡Gracias! Tu mensaje ha sido enviado.',
  },
  zh: {
    brand: 'Imperial Building Group',
    nav_home: '首页',
    nav_services: '服务',
    nav_gallery: '图库',
    nav_about: '关于',
    nav_contact: '联系',
    nav_careers: '招聘',
    hero_title: '高端建筑与翻新',
    hero_text: '我们以工艺、设计与效率支持您的住宅和商业项目。',
    hero_cta: '我们的服务',
    theme_toggle: '深色模式',
    theme_toggle_light: '浅色模式',
    services_title: '我们的服务',
    card_conception_title: '设计与规划',
    card_conception_text: '定制规划与建筑研究支持，打造坚固且美观的项目。',
    card_renovation_title: '智能翻新',
    card_renovation_text: '翻新、空间优化和建筑物现代化，配以精致的收尾。',
    card_gestion_title: '工地管理',
    card_gestion_text: '全面协调施工，管理工期并把控质量直到交付。',
    card_formation_title: '建筑与软件培训',
    card_formation_text: '提供建筑技术与软件培训，提升您的专业技能。',
    card_materiaux_title: '材料销售',
    card_materiaux_text: '提供优质建筑材料，以最佳价格满足您的项目需求。',
    services_stone_title: '石材加工与安装',
    services_stone_text: '为立面、铺装和覆层提供定制石材加工与安装。',
    services_backfill_title: '回填与整平',
    services_backfill_text: '为地基、找平和场地准备提供回填与整平。',
    services_gardening_title: '园艺与景观',
    services_gardening_text: '绿地创建与维护、种植、铺草和灌溉系统。',
    services_paint_title: '建筑涂装',
    services_paint_text: '内外墙涂装，耐久饰面和防潮处理。',
    services_procurement_title: '采购与物流',
    services_procurement_text: '材料管理、采购、交付与物流协调以满足期限。',
    gallery_title: '项目图库',
    gallery_intro: '探索我们精心完成的工地、翻新和装修项目。',
    gallery_caption_1: '现代室内翻新',
    gallery_caption_2: '翻新建筑立面',
    gallery_caption_3: '建筑设计项目',
    gallery_caption_4: '翻新居住空间',
    gallery_caption_5: '施工现场',
    gallery_caption_6: '办公室改造',
    about_title: '关于 Imperial Building Group',
    about_text_1: 'Imperial Building Group 是您值得信赖的合作伙伴，提供持久、优雅、安全的工程。',
    about_text_2: '我们关注质量、透明度，并在项目的每个阶段提供支持。',
    promise_title: '我们的承诺',
    promise_item_1: '干净有序的工地',
    promise_item_2: '按时完成',
    promise_item_3: '个性化客户跟进',
    contact_title: '联系',
    contact_text: '发送消息以讨论您的项目。',
    follow_us_title: '关注我们',
    follow_us_text: '在社交媒体上查看我们的项目、新闻和建议：',
    label_name: '姓名',
    label_message: '消息',
    placeholder_name: '您的姓名',
    placeholder_email: '您的邮箱',
    placeholder_message: '您的消息',
    contact_send: '发送',
    careers_title: '申请 Imperial Building Group',
    careers_description: '发送您的申请加入我们的团队。请填写以下表格。',
    careers_file_note: '如果您附上简历，请注意文件不会自动附加到生成的电子邮件；在打开邮件客户端后，如有必要，请手动附加。',
    careers_label_name: '全名',
    careers_label_email: '邮箱',
    careers_label_phone: '电话',
    careers_label_position: '申请职位',
    careers_option_general: '通用',
    careers_option_site_manager: '工地经理',
    careers_option_mason: '泥瓦匠',
    careers_option_electrician: '电工',
    careers_option_plumber: '水管工',
    careers_option_other: '其他',
    careers_label_message: '留言',
    careers_label_cv: '简历（文件）',
    careers_submit: '发送申请',
    placeholder_careers_name: '您的姓名',
    placeholder_careers_email: '您的邮箱',
    placeholder_careers_phone: '您的电话',
    placeholder_careers_position: '选择职位',
    placeholder_careers_message: '您的求职信',
    footer_text: '© 2026 Imperial Building Group。保留所有权利。',
    form_error: '请提供您的姓名和邮箱。',
    form_success: '谢谢！您的消息已提交。',
  },
};

const defaultLang = 'fr';
let currentLang = localStorage.getItem('language') || defaultLang;

function updateThemeToggleText(lang) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const key = isDark ? 'theme_toggle_light' : 'theme_toggle';
  if (!themeToggle) return;
  themeToggle.textContent = translations[lang]?.[key] || translations.fr[key] || themeToggle.textContent;
}

function translatePage(lang) {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    const text = translations[lang]?.[key] || translations.fr[key] || element.textContent;
    element.textContent = text;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.placeholder = translations[lang]?.[key] || translations.fr[key] || element.placeholder;
  });

  updateThemeToggleText(lang);
}

function setLanguage(lang) {
  currentLang = lang;
  translatePage(lang);
  localStorage.setItem('language', lang);
  if (langToggleBtn) {
    langToggleBtn.textContent = lang.toUpperCase();
    langToggleBtn.setAttribute('aria-expanded', 'false');
  }
  if (langMenu) {
    langMenu.classList.remove('open');
  }
  langItems.forEach((item) => {
    item.classList.toggle('active', item.dataset.lang === lang);
  });
}

langToggleBtn?.addEventListener('click', () => {
  if (!langMenu) return;
  const isOpen = langMenu.classList.toggle('open');
  langToggleBtn.setAttribute('aria-expanded', String(isOpen));
});

langItems.forEach((item) => {
  item.addEventListener('click', () => {
    setLanguage(item.dataset.lang);
  });
});

document.addEventListener('click', (event) => {
  if (!langMenu || !langToggleBtn) return;
  if (!langMenu.contains(event.target) && !langToggleBtn.contains(event.target)) {
    langMenu.classList.remove('open');
    langToggleBtn.setAttribute('aria-expanded', 'false');
  }
});

navToggle?.addEventListener('click', () => {
  siteNav?.classList.toggle('open');
});

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
}

setLanguage(currentLang);

themeToggle?.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
  updateThemeToggleText(currentLang);
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email) {
    if (formStatus) formStatus.textContent = translations[currentLang]?.form_error || translations.fr.form_error;
    return;
  }

  if (formStatus) formStatus.textContent = translations[currentLang]?.form_success || translations.fr.form_success;
  form.reset();
  setTimeout(() => {
    if (formStatus) formStatus.textContent = '';
  }, 5000);
});

// Accessibility: ensure the status paragraph announces changes to screen readers
if (formStatus) {
  formStatus.setAttribute('role', 'status');
  formStatus.setAttribute('aria-live', 'polite');
}

// Close mobile nav after clicking any nav link (improves UX on small screens)
document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    if (siteNav?.classList.contains('open')) {
      siteNav.classList.remove('open');
    }
  });
});

// Focus the name field when user navigates to the contact section via nav
document.querySelectorAll('a[href="#contact"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    // Allow normal anchor navigation then focus after a short delay
    setTimeout(() => {
      const nameInput = document.querySelector('#contact-form [name="name"]');
      if (nameInput) nameInput.focus();
    }, 250);
  });
});

// Careers form handling - opens mail client with prefilled content (attachments must be added manually)
const careersForm = document.getElementById('careers-form');
const careersStatus = document.getElementById('careers-form-status');
if (careersStatus) {
  careersStatus.setAttribute('role', 'status');
  careersStatus.setAttribute('aria-live', 'polite');
}

careersForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const fm = careersForm;
  const name = (fm.name?.value || '').trim();
  const email = (fm.email?.value || '').trim();
  const phone = (fm.phone?.value || '').trim();
  const position = (fm.position?.value || 'Candidature').trim();
  const message = (fm.message?.value || '').trim();
  const fileInput = fm.querySelector('[name="cv"]');
  const fileName = fileInput?.files?.[0]?.name || '';

  if (!name || !email) {
    if (careersStatus) careersStatus.textContent = translations[currentLang]?.form_error || translations.fr.form_error;
    return;
  }

  const subject = `Candidature: ${position} - ${name}`;
  let body = `Nom: ${name}%0D%0AEmail: ${email}%0D%0ATéléphone: ${phone}%0D%0APoste: ${position}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
  if (fileName) {
    body += `%0D%0A%0D%0ACV: ${encodeURIComponent(fileName)}%0D%0A(ATTENTION: veuillez joindre le fichier CV manuellement dans votre client mail si nécessaire)`;
  }

  const mailto = `mailto:imperialbuilding20@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  // Open default mail client
  window.location.href = mailto;
  if (careersStatus) careersStatus.textContent = translations[currentLang]?.form_success || translations.fr.form_success;
  setTimeout(() => {
    if (careersStatus) careersStatus.textContent = '';
  }, 6000);
});
