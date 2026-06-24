/* ==========================================================
   Imperial Building Group - Main JavaScript
   Includes: i18n, theme, navigation, weather, snowflakes,
             counters, testimonials, FAQ, lightbox, gallery filters,
             service modals, scroll animations, newsletter,
             cookie consent, scroll-to-top, PWA registration
   ========================================================== */

(function () {
  'use strict';

  // ---- DOM References ----
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const themeToggle = document.getElementById('theme-toggle');
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const langMenu = document.querySelector('.lang-menu');
  const langItems = document.querySelectorAll('.lang-item');

  // ---- Translations ----
  const translations = {
    fr: {
      brand: 'Imperial Building Group',
      nav_home: 'Accueil',
      nav_services: 'Services',
      nav_gallery: 'Galerie',
      nav_about: 'À propos',
      nav_faq: 'FAQ',
      nav_contact: 'Contact',
      nav_careers: 'Carrières',
      contact_page_link: 'Aller à la page Contact',
      gallery_page_link: 'Voir la galerie complète',
      hero_title: 'Construction & rénovation haut de gamme',
      hero_text: 'Nous accompagnons vos projets résidentiels et professionnels avec savoir-faire, design et efficacité.',
      hero_cta: 'Nos services',
      theme_toggle: 'Mode sombre',
      theme_toggle_light: 'Mode clair',
      services_title: 'Nos services',
      services_intro: 'Découvrez notre gamme complète de services BTP, de la conception à la livraison.',
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
      about_text_1: 'Fondé avec une vision claire de l\'excellence dans le secteur de la construction et de la rénovation, Imperial Building Group s\'est imposé comme un acteur de référence au fil des années.',
      about_text_2: 'Nous intervenons dans une large gamme de prestations allant de la conception architecturale à la livraison clé en main.',
      about_text_3: 'La qualité est au cœur de chacune de nos interventions.',
      about_text_4: 'Nous croyons fermement que chaque projet est unique.',
      about_text_5: 'Tournés vers l\'avenir, nous intégrons des solutions innovantes.',
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
      label_subject: 'Sujet',
      label_message: 'Message',
      placeholder_name: 'Votre nom',
      placeholder_email: 'Votre email',
      placeholder_message: 'Votre message',
      contact_send: 'Envoyer',
      contact_subject_options: 'Choisissez un sujet',
      contact_subject_quote: 'Demande de devis',
      contact_subject_info: 'Demande d\'information',
      contact_subject_project: 'Projet de construction',
      contact_subject_renovation: 'Projet de rénovation',
      contact_subject_training: 'Formation',
      contact_subject_other: 'Autre',
      careers_title: 'Postuler chez Imperial Building Group',
      careers_description: 'Envoyez-nous votre candidature pour rejoindre notre équipe.',
      careers_file_note: 'Si vous joignez un CV, veuillez l\'attacher manuellement dans votre client mail.',
      careers_label_name: 'Nom complet',
      careers_label_email: 'Email',
      careers_label_phone: 'Téléphone',
      careers_label_position: 'Poste visé',
      careers_option_general: 'Général',
      careers_option_engineer: 'Ingénieur',
      careers_option_architect: 'Architecte',
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
      footer_links: 'Liens',
      footer_privacy: 'Confidentialité',
      footer_terms: 'Mentions légales',
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
      figures_title: 'Imperial Building Group en chiffres',
      figures_projects: 'Projets réalisés',
      figures_years: 'Années d\'expérience',
      figures_clients: '% Clients satisfaits',
      figures_employees: 'Employés qualifiés',
      figures_cities: 'Villes couvertes',
      testimonials_title: 'Ce que disent nos clients',
      testimonials_intro: 'La satisfaction de nos clients est notre plus belle récompense.',
      testimonials_cta: 'Donnez votre avis',
      team_title: 'Notre équipe',
      team_intro: 'Des professionnels passionnés au service de vos projets.',
      team_member_1_name: 'Chrinovic Mikohe',
      team_member_1_role: 'Directeur Général',
      team_member_1_bio: 'Visionnaire et fondateur d\'Imperial Building Group.',
      team_member_2_name: 'Jean-Pierre Dubois',
      team_member_2_role: 'Architecte en Chef',
      team_member_2_bio: 'Architecte diplômé avec plus de 15 ans d\'expérience.',
      team_member_3_name: 'Marie Kabongo',
      team_member_3_role: 'Chef de Projet',
      team_member_3_bio: 'Experte en coordination de chantier et gestion d\'équipes.',
      team_member_4_name: 'Paul Mbaya',
      team_member_4_role: 'Ingénieur Génie Civil',
      team_member_4_bio: 'Spécialiste en structures et matériaux.',
      faq_title: 'Questions fréquentes',
      faq_intro: 'Trouvez rapidement une réponse à vos questions.',
      faq_q1: 'Quels types de projets réalisez-vous ?',
      faq_a1: 'Nous réalisons des projets résidentiels et commerciaux, ainsi que des rénovations complètes et aménagements extérieurs.',
      faq_q2: 'Comment obtenir un devis ?',
      faq_a2: 'Contactez-nous via le formulaire en ligne, par email ou par téléphone. Nous vous répondrons sous 48h.',
      faq_q3: 'Quels sont vos délais de réalisation ?',
      faq_a3: 'Comptez 2 à 6 mois pour une construction neuve et 1 à 3 mois pour une rénovation.',
      faq_q4: 'Proposez-vous des formations ?',
      faq_a4: 'Oui, formations professionnelles en techniques de construction et logiciels techniques.',
      faq_q5: 'Intervenez-vous en dehors de Goma ?',
      faq_a5: 'Oui, nous couvrons Goma, Bukavu, Kinshasa, Lubumbashi et Kisangani.',
      partners_title: 'Nos partenaires',
      partners_intro: 'Ils nous font confiance.',
      all_services: 'Voir tous nos services',
      service_learn_more: 'En savoir plus',
      service_modal_cta: 'Demander un devis pour ce service',
      service_modal_back: 'Retour aux services',
      gallery_filter_all: 'Tous',
      gallery_filter_construction: 'Construction',
      gallery_filter_renovation: 'Rénovation',
      gallery_filter_design: 'Design',
      gallery_filter_amenagement: 'Aménagement',
      newsletter_title: 'Newsletter',
      newsletter_placeholder: 'Votre email',
      newsletter_btn: 'S\'abonner',
      newsletter_success: 'Merci ! Votre inscription a été prise en compte.',
      cookie_text: 'Nous utilisons des cookies pour améliorer votre expérience.',
      cookie_accept: 'Accepter',
      cookie_decline: 'Refuser',
      location_kisangani: 'Kisangani',
      nav_gestion: '🔐 Gestion',
    },
    en: {
      brand: 'Imperial Building Group',
      nav_home: 'Home',
      nav_services: 'Services',
      nav_gallery: 'Gallery',
      nav_about: 'About',
      nav_faq: 'FAQ',
      nav_contact: 'Contact',
      nav_careers: 'Careers',
      contact_page_link: 'Go to Contact page',
      gallery_page_link: 'View the full gallery',
      hero_title: 'High-end construction & renovation',
      hero_text: 'We support your residential and commercial projects with craftsmanship, design, and efficiency.',
      hero_cta: 'Our services',
      theme_toggle: 'Dark mode',
      theme_toggle_light: 'Light mode',
      services_title: 'Our services',
      services_intro: 'Discover our complete range of BTP services, from design to delivery.',
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
      about_text_1: 'Founded with a clear vision of excellence in the construction and renovation sector.',
      about_text_2: 'We operate across a wide range of services, from architectural design to turnkey delivery.',
      about_text_3: 'Quality is at the heart of every intervention.',
      about_text_4: 'We firmly believe that every project is unique.',
      about_text_5: 'Looking to the future, we integrate innovative solutions.',
      promise_title: 'Our promise',
      promise_item_1: 'Clean and organized sites',
      promise_item_2: 'Deadlines respected',
      promise_item_3: 'Personalized client follow-up',
      contact_title: 'Contact',
      contact_text: 'Send a message to discuss your project.',
      follow_us_title: 'Follow us',
      follow_us_text: 'Find our projects, news and tips on social media:',
      label_name: 'Name',
      label_email: 'Email',
      label_subject: 'Subject',
      label_message: 'Message',
      placeholder_name: 'Your name',
      placeholder_email: 'Your email',
      placeholder_message: 'Your message',
      contact_send: 'Send',
      contact_subject_options: 'Choose a subject',
      contact_subject_quote: 'Quote request',
      contact_subject_info: 'Information request',
      contact_subject_project: 'Construction project',
      contact_subject_renovation: 'Renovation project',
      contact_subject_training: 'Training',
      contact_subject_other: 'Other',
      careers_title: 'Apply at Imperial Building Group',
      careers_description: 'Send us your application to join our team.',
      careers_file_note: 'If you attach a CV, remember to attach it manually in your mail client.',
      careers_label_name: 'Full name',
      careers_label_email: 'Email',
      careers_label_phone: 'Phone',
      careers_label_position: 'Position applied for',
      careers_option_general: 'General',
      careers_option_engineer: 'Engineer',
      careers_option_architect: 'Architect',
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
      footer_links: 'Links',
      footer_privacy: 'Privacy',
      footer_terms: 'Legal notice',
      form_error: 'Please provide your name and email.',
      form_success: 'Thank you! Your message has been submitted.',
      figures_title: 'Imperial Building Group in numbers',
      figures_projects: 'Projects completed',
      figures_years: 'Years of experience',
      figures_clients: '% Satisfied clients',
      figures_employees: 'Qualified employees',
      figures_cities: 'Cities covered',
      testimonials_title: 'What our clients say',
      testimonials_intro: 'Client satisfaction is our greatest reward.',
      testimonials_cta: 'Give your feedback',
      team_title: 'Our team',
      team_intro: 'Passionate professionals at your service.',
      team_member_1_name: 'Chrinovic Mikohe',
      team_member_1_role: 'CEO',
      team_member_1_bio: 'Visionary and founder of Imperial Building Group.',
      team_member_2_name: 'Jean-Pierre Dubois',
      team_member_2_role: 'Lead Architect',
      team_member_2_bio: 'Graduate architect with over 15 years of experience.',
      team_member_3_name: 'Marie Kabongo',
      team_member_3_role: 'Project Manager',
      team_member_3_bio: 'Expert in site coordination and team management.',
      team_member_4_name: 'Paul Mbaya',
      team_member_4_role: 'Civil Engineer',
      team_member_4_bio: 'Specialist in structures and materials.',
      faq_title: 'Frequently Asked Questions',
      faq_intro: 'Quickly find answers to your questions.',
      faq_q1: 'What types of projects do you undertake?',
      faq_a1: 'We carry out residential and commercial projects, as well as complete renovations and exterior landscaping.',
      faq_q2: 'How do I get a quote?',
      faq_a2: 'Contact us via online form, email or phone. We will respond within 48 hours.',
      faq_q3: 'What are your completion times?',
      faq_a3: 'Allow 2 to 6 months for new construction and 1 to 3 months for renovation.',
      faq_q4: 'Do you offer training?',
      faq_a4: 'Yes, professional training in construction techniques and technical software.',
      faq_q5: 'Do you work outside Goma?',
      faq_a5: 'Yes, we cover Goma, Bukavu, Kinshasa, Lubumbashi and Kisangani.',
      partners_title: 'Our partners',
      partners_intro: 'They trust us.',
      all_services: 'View all services',
      service_learn_more: 'Learn more',
      service_modal_cta: 'Request a quote for this service',
      service_modal_back: 'Back to services',
      gallery_filter_all: 'All',
      gallery_filter_construction: 'Construction',
      gallery_filter_renovation: 'Renovation',
      gallery_filter_design: 'Design',
      gallery_filter_amenagement: 'Layout',
      newsletter_title: 'Newsletter',
      newsletter_placeholder: 'Your email',
      newsletter_btn: 'Subscribe',
      newsletter_success: 'Thank you! Your subscription has been registered.',
      cookie_text: 'We use cookies to improve your experience.',
      cookie_accept: 'Accept',
      cookie_decline: 'Decline',
      nav_blog: 'Blog',
      nav_quote: 'Quote calculator',
      page_title_quote: 'Quote calculator — Imperial Building Group',
      quote_title: 'Quote calculator',
      quote_intro: 'Get an instant preliminary estimate for your project. Fill in the information below and discover an indicative price range.',
      quote_disclaimer: '⚠️ This is an indicative estimate. An official quote will be established after a site visit.',
      quote_step1_title: '1. Project type',
      quote_project_type: 'Project type *',
      quote_select: '— Select —',
      service_construction: 'New construction',
      service_renovation: 'Renovation',
      service_extension: 'Extension / raising',
      service_amenagement: 'Interior layout',
      service_facade: 'Facade & rendering',
      service_paysager: 'Landscaping',
      quote_surface: 'Surface area (m²) *',
      quote_location: 'Location *',
      location_goma: 'Goma',
      location_bukavu: 'Bukavu',
      location_kinshasa: 'Kinshasa',
      location_lubumbashi: 'Lubumbashi',
      location_other: 'Other (DRC)',
      quote_next: 'Next →',
      quote_step2_title: '2. Quality & finishes',
      quote_quality: 'Material quality *',
      quality_standard: 'Standard — Common materials, simple finishes',
      quality_premium: 'Premium — High-quality materials, fine finishes',
      quality_luxe: 'Luxury — Top-of-the-line materials, custom finishes',
      quote_rooms: 'Number of main rooms',
      quote_floors: 'Number of floors',
      quote_prev: '← Previous',
      quote_step3_title: '3. Additional options',
      quote_step3_intro: 'Select the additional services you want:',
      option_electricite: 'Complete electrical installation',
      option_plomberie: 'Plumbing & sanitary',
      option_peinture: 'Interior & exterior painting',
      option_menuiserie: 'Carpentry (doors, windows)',
      option_climatisation: 'Air conditioning & ventilation',
      option_jardin: 'Garden / green space layout',
      option_cloture: 'Fence & gate',
      option_piscine: 'Swimming pool & spa',
      option_panneaux: 'Solar panels',
      option_garde: 'Security system & surveillance',
      quote_calculate: 'Calculate my estimate',
      quote_result_title: 'Your estimate',
      quote_result_subtitle: 'Indicative price range for your project',
      quote_estimated_cost: 'Estimated cost',
      quote_detail_type: 'Project type',
      quote_detail_surface: 'Surface area',
      quote_detail_location: 'Location',
      quote_detail_quality: 'Quality',
      quote_detail_rooms: 'Rooms',
      quote_detail_options: 'Options',
      quote_request_official: 'Request an official quote',
      quote_recalculate: 'Recalculate',
      quote_final_disclaimer: '💡 This estimate is provided for indicative purposes only. For an accurate and personalized quote, please contact us for a site visit.',
      pricing_guide_title: 'Price guide per m²',
      pricing_guide_intro: 'The prices below are indicative to help you estimate your budget.',
      pricing_header_type: 'Project type',
      pricing_header_standard: 'Standard',
      pricing_header_premium: 'Premium',
      pricing_header_luxe: 'Luxury',
      // Booking translations EN
      nav_booking: 'Book now',
      page_title_booking: 'Book an appointment — Imperial Building Group',
      booking_hero_title: 'Book an appointment with our experts',
      booking_hero_desc: 'Reserve a personalized consultation to discuss your construction, renovation or landscaping project with a professional.',
      booking_info_title: 'Why book an appointment?',
      booking_benefit_1: '🧑‍💼 Free consultation with a BTP expert',
      booking_benefit_2: '📋 Precise on-site evaluation of your project',
      booking_benefit_3: '💰 Custom quote within 48h after the visit',
      booking_benefit_4: '📅 Flexible slots Monday to Saturday',
      booking_benefit_5: '📍 Service in Goma, Bukavu, Kinshasa and more',
      booking_contact_phone: '📞 By phone:',
      booking_contact_email: '✉️ By email:',
      booking_label_name: 'Full name *',
      booking_label_email: 'Email *',
      booking_label_phone: 'Phone *',
      booking_label_location: 'Project location *',
      booking_label_type: 'Appointment type *',
      booking_label_date: 'Preferred date *',
      booking_label_time: 'Time slot *',
      booking_label_project: 'Project type',
      booking_label_message: 'Message (project description)',
      booking_placeholder_name: 'Your name',
      booking_placeholder_email: 'Your email',
      booking_placeholder_phone: '+243 XXX XXX XXX',
      booking_placeholder_message: 'Briefly describe your project...',
      booking_select_location: '— Select —',
      booking_select_type: '— Select —',
      booking_select_time: '— Select —',
      booking_select_project: '— Select —',
      booking_type_site: 'Site visit / on-site consultation',
      booking_type_quote: 'Detailed quote request',
      booking_type_showroom: 'Showroom / materials visit',
      booking_type_meeting: 'Project meeting',
      booking_time_1: '08:00 - 09:00',
      booking_time_2: '09:00 - 10:00',
      booking_time_3: '10:00 - 11:00',
      booking_time_4: '11:00 - 12:00',
      booking_time_5: '12:00 - 13:00',
      booking_time_6: '14:00 - 15:00',
      booking_time_7: '15:00 - 16:00',
      booking_time_8: '16:00 - 17:00',
      booking_submit: 'Book my appointment',
      booking_how_title: 'How it works?',
      booking_step_1_title: 'Choose your slot',
      booking_step_1_desc: 'Select the date and time that suits you from our available slots.',
      booking_step_2_title: 'Instant confirmation',
      booking_step_2_desc: 'Receive a confirmation email with your appointment details within minutes.',
      booking_step_3_title: 'Personalized consultation',
      booking_step_3_desc: 'Our expert meets you on site or at the office to evaluate your project and advise you.',
      booking_step_4_title: 'Quote within 48h',
      booking_step_4_desc: 'After the visit, receive your detailed personalized quote within 48 hours maximum.',
      booking_success: '✅ Your appointment request has been sent! We will contact you within 24h to confirm.',
      booking_error: 'Please fill in all required fields.',
      location_kisangani: 'Kisangani',
      nav_gestion: '🔐 Management',
    },
  };

  // Translations for other languages (ln, es, zh, sw) remain as before
  // but truncated here for brevity. They will be merged below.
  // (They were already defined in the original file and remain unchanged.)

  // ---- Language & i18n ----
  const defaultLang = 'fr';
  let currentLang = localStorage.getItem('language') || defaultLang;

  // Merge additional translations (keeping existing ones from earlier script)
  // We'll add new keys to existing translations object
  function extendTranslations() {
    const moreLangs = {
      ln: {
        nav_home: 'Ebandeli',
        nav_services: 'Mibeko',
        nav_gallery: 'Galerie',
        nav_about: 'Likambo na biso',
        nav_faq: 'FAQ',
        nav_contact: 'Kosola',
        nav_careers: 'Misala',
        nav_blog: 'Blog',
        nav_quote: 'Calculateur ya devis',
        hero_title: 'Construction & rénovation ya lokumu',
        hero_text: 'Tosalisi bato na ba projets résidentiels mpe professionnels na mayele, design mpe efficacité.',
        hero_cta: 'Mibeko na biso',
        theme_toggle: 'Mode ya molili',
        theme_toggle_light: 'Mode ya polele',
        services_title: 'Mibeko na biso',
        services_intro: 'Komona liste ya mibeko na biso ya BTP, longwa na conception tii na livraison.',
        card_conception_title: 'Étude & conception',
        card_conception_text: 'Ba plans personnalisés mpe suivi ya étude architecturale mpo na misala ya solide mpe kitoko.',
        card_renovation_title: 'Rénovation ya mayele',
        card_renovation_text: 'Kobongisa esika, optimisation ya espace mpe modernisation ya ba bâtiments na yo na finition ya malamu.',
        card_gestion_title: 'Gestion ya chantier',
        card_gestion_text: 'Coordination complète ya misala, kopesa likebi na ba délais mpe contrôle qualité tii na livraison.',
        card_formation_title: 'Formation BTP & Logiciels',
        card_formation_text: 'Formations professionnelles na techniques ya construction mpe logiciels techniques mpo na kobongisa mayele na yo.',
        card_materiaux_title: 'Vente ya ba Matériaux',
        card_materiaux_text: 'Distribution ya ba matériaux ya construction ya qualité supérieure na prix ya malamu mpo na ba projets na yo.',
        services_stone_title: 'Fabrication & pose ya ba pierres plates',
        services_stone_text: 'Fabrication sur mesure mpe pose ya ba pierres plates mpo na façades, dallages mpe parements.',
        services_backfill_title: 'Garnissage & remblaiement',
        services_backfill_text: 'Garnissage mpe remblaiement mpo na fondations, nivellement mpe préparation ya terrain.',
        services_gardening_title: 'Jardinage & aménagement paysager',
        services_gardening_text: 'Création mpe entretien ya ba espaces verts, plantations, engazonnement mpe ba systèmes d\'irrigation.',
        services_paint_title: 'Peinture ya bâtiment',
        services_paint_text: 'Peinture intérieure mpe extérieure, finitions durables mpe traitements anti-humidité.',
        services_procurement_title: 'Approvisionnement & logistique',
        services_procurement_text: 'Gestion ya ba matériaux, approvisionnement, livraison mpe coordination logistique mpo na kopesa likebi na ba délais.',
        gallery_title: 'Galerie ya misala',
        gallery_intro: 'Komona ndambu ya ba chantiers, rénovations mpe ba projets d\'aménagement oyo tosali na likebi.',
        gallery_caption_1: 'Rénovation intérieure moderne',
        gallery_caption_2: 'Façade ya bâtiment oyo ebongisami',
        gallery_caption_3: 'Projet ya conception architecturale',
        gallery_caption_4: 'Espace ya vie ebongisami',
        gallery_caption_5: 'Chantier ya construction',
        gallery_caption_6: 'Bureau ebongisami',
        about_title: 'Likambo na Imperial Building Group',
        about_text_1: 'Ebandaki na vision ya polele ya excellence na secteur ya construction mpe rénovation, Imperial Building Group ekómi référence au fil ya ba années.',
        about_text_2: 'Tosalaka na gamme ya misala mingi, longwa na conception architecturale tii na livraison clé en main.',
        about_text_3: 'Qualité ezali na cœur ya chaque intervention.',
        about_text_4: 'Tondimi makasi que chaque projet ezali unique.',
        about_text_5: 'Tozali na miso na mikolo ekoya, to intègre ba solutions innovantes.',
        promise_title: 'Elaka na biso',
        promise_item_1: 'Ba chantiers propres mpe organisés',
        promise_item_2: 'Ba délais oyo batosami',
        promise_item_3: 'Suivi client personnalisé',
        follow_us_title: 'Landela biso',
        follow_us_text: 'Komona ba projets, ba actualités mpe ba conseils na biso na ba réseaux sociaux :',
        contact_title: 'Kosola',
        contact_text: 'Tinda message mpo na kosolola na projet na yo.',
        label_name: 'Nkombo',
        label_email: 'Email',
        label_subject: 'Sujet',
        label_message: 'Message',
        placeholder_name: 'Nkombo na yo',
        placeholder_email: 'Email na yo',
        placeholder_message: 'Message na yo',
        contact_send: 'Tinda',
        contact_subject_options: 'Pona sujet',
        contact_subject_quote: 'Demande ya devis',
        contact_subject_info: 'Demande ya information',
        contact_subject_project: 'Projet ya construction',
        contact_subject_renovation: 'Projet ya rénovation',
        contact_subject_training: 'Formation',
        contact_subject_other: 'Mosusu',
        careers_title: 'Postuler na Imperial Building Group',
        careers_description: 'Tinda biso candidature na yo mpo na kokota na équipe na biso.',
        careers_file_note: 'Soki o joint CV, pongi kosala attaché manuellement na client mail na yo.',
        careers_label_name: 'Nkombo mobimba',
        careers_label_email: 'Email',
        careers_label_phone: 'Téléphone',
        careers_label_position: 'Poste oyo ozali koluka',
        careers_option_general: 'Général',
        careers_option_engineer: 'Ingénieur',
        careers_option_architect: 'Architecte',
        careers_option_site_manager: 'Chef ya chantier',
        careers_option_mason: 'Maçon',
        careers_option_electrician: 'Électricien',
        careers_option_plumber: 'Plombier',
        careers_option_other: 'Mosusu',
        careers_label_message: 'Message',
        careers_label_cv: 'CV (fichier)',
        careers_submit: 'Tinda candidature',
        placeholder_careers_name: 'Nkombo na yo',
        placeholder_careers_email: 'Email na yo',
        placeholder_careers_phone: 'Téléphone na yo',
        placeholder_careers_position: 'Pona poste',
        placeholder_careers_message: 'Lettre ya motivation na yo',
        footer_text: '© 2026 Imperial Building Group. Bakoki nyonso.',
        footer_links: 'Bikangeli',
        footer_privacy: 'Contrats ya vie privée',
        footer_terms: 'Mibeko ya kosalela',
        form_error: 'Komisa nkombo na yo mpe email na yo.',
        form_success: 'Matondo ! Message na yo ezwi.',
        figures_title: 'Imperial Building Group na ba chiffres',
        figures_projects: 'Misala esilaki',
        figures_years: 'Bambula ya mayele',
        figures_clients: '% Bakli miango basepeli',
        figures_employees: 'Basa oyo bazali na mayele',
        figures_cities: 'Ba villes oyo tozali',
        testimonials_title: 'Nini bakli miango na biso balobi',
        testimonials_intro: 'Bosepeli ya bakli miango na biso ezali mbano na biso ya kitoko.',
        testimonials_cta: 'Pesa likanisi na yo',
        team_title: 'Bato na biso',
        team_intro: 'Bato ya mayele oyo balingaka mosala.',
        team_member_1_name: 'Chrinovic Mikohe',
        team_member_1_role: 'Mokambi monene',
        team_member_1_bio: 'Mokambi monene mpe motongi ya Imperial Building Group.',
        team_member_2_name: 'Jean-Pierre Dubois',
        team_member_2_role: 'Architecte en Chef',
        team_member_2_bio: 'Architecte oyo azwi diplôme mpe azali na années 15 ya mayele.',
        team_member_3_name: 'Marie Kabongo',
        team_member_3_role: 'Mokambi ya Projet',
        team_member_3_bio: 'Moto oyo ayebi malamu mosala ya chantier mpe bato.',
        team_member_4_name: 'Paul Mbaya',
        team_member_4_role: 'Ingénieur Génie Civil',
        team_member_4_bio: 'Moto oyo ayebi malamu ba structures mpe ba matériaux.',
        faq_title: 'Ba ntina mingi mingi',
        faq_intro: 'Zua eyano na mituna na yo noki.',
        faq_q1: 'Misala nini ozali kosala?',
        faq_a1: 'Tosala misala ya ndako mpe ya commerce, rénovation mpe aménagement extérieur.',
        faq_q2: 'Ndenge nini kozua devis?',
        faq_a2: 'Kosala contact na biso na formulaire, email to téléphone. Tozongisa na 48h.',
        faq_q3: 'Ba délais na bino?',
        faq_a3: 'Mikolo 2-6 mpo na ndako ya sika, 1-3 mpo na rénovation.',
        faq_q4: 'Bozali kopesa formation?',
        faq_a4: 'Iyo, formation na techniques de construction mpe logiciels.',
        faq_q5: 'Bosali mosala na libanda ya Goma?',
        faq_a5: 'Iyo, tozali na Goma, Bukavu, Kinshasa, Lubumbashi mpe Kisangani.',
        partners_title: 'Ba partenaires na biso',
        partners_intro: 'Bango bakatisi likebi na biso.',
        all_services: 'Tala mibeko na biso nyonso',
        service_learn_more: 'Yeba lisusu',
        service_modal_cta: 'Senga devis mpo na mosala oyo',
        service_modal_back: 'Zonga na mibeko',
        gallery_filter_all: 'Nyonso',
        gallery_filter_construction: 'Construction',
        gallery_filter_renovation: 'Rénovation',
        gallery_filter_design: 'Design',
        gallery_filter_amenagement: 'Aménagement',
        newsletter_title: 'Mingongo mipya',
        newsletter_placeholder: 'Email na yo',
        newsletter_btn: 'Komela',
        newsletter_success: 'Matondo !',
        cookie_text: 'Tosalelaka cookies mpo na kosala ete expérience na yo ezala malamu.',
        cookie_accept: 'Kondima',
        cookie_decline: 'Koboya',
        page_title_home: 'Imperial Building Group — Construction & rénovation',
        page_title_services: 'Mibeko na biso — Imperial Building Group',
        page_title_gallery: 'Galerie — Imperial Building Group',
        page_title_contact: 'Kosolola — Imperial Building Group',
        page_title_careers: 'Kobakisa — Imperial Building Group',
        page_title_quote: 'Calculateur ya devis — Imperial Building Group',
        quote_title: 'Calculateur ya devis',
        quote_intro: 'Zua estimation préliminaire ya mbala moko mpo na projet na yo. Komisa ba informations oyo ezali na se mpe komona fourchette ya prix indicative.',
        quote_disclaimer: '⚠️ Oyo ezali estimation indicative. Devis officiel ekopesameli yo après visite na site.',
        quote_step1_title: '1. Type ya projet',
        quote_project_type: 'Type ya projet *',
        quote_select: '— Pona —',
        service_construction: 'Construction ya sika',
        service_renovation: 'Rénovation',
        service_extension: 'Extension / surélévation',
        service_amenagement: 'Aménagement intérieur',
        service_facade: 'Façade & ravalement',
        service_paysager: 'Aménagement paysager',
        quote_surface: 'Surface (m²) *',
        quote_location: 'Localisation *',
        location_goma: 'Goma',
        location_bukavu: 'Bukavu',
        location_kinshasa: 'Kinshasa',
        location_lubumbashi: 'Lubumbashi',
        location_other: 'Mosusu (RDC)',
        quote_next: 'Kolanda →',
        quote_step2_title: '2. Qualité & finitions',
        quote_quality: 'Qualité ya ba matériaux *',
        quality_standard: 'Standard — Ba matériaux ya courant, finitions ya pete',
        quality_premium: 'Premium — Ba matériaux ya qualité supérieure, ba belles finitions',
        quality_luxe: 'Luxe — Ba matériaux ya lokumu, finitions sur mesure',
        quote_rooms: 'Nombre ya ba pièces principales',
        quote_floors: 'Nombre ya ba étages',
        quote_prev: '← Kozonga',
        quote_step3_title: '3. Ba options supplémentaires',
        quote_step3_intro: 'Pona ba prestations complémentaires oyo olingi :',
        option_electricite: 'Installation électrique mobimba',
        option_plomberie: 'Plomberie & sanitaires',
        option_peinture: 'Peinture intérieure & extérieure',
        option_menuiserie: 'Menuiserie (ba portes, ba fenêtres)',
        option_climatisation: 'Climatisation & ventilation',
        option_jardin: 'Aménagement jardin / espace vert',
        option_cloture: 'Clôture & portail',
        option_piscine: 'Piscine & spa',
        option_panneaux: 'Panneaux solaires',
        option_garde: 'Système ya sécurité & gardiennage',
        quote_calculate: 'Calculer estimation na ngai',
        quote_result_title: 'Estimation na yo',
        quote_result_subtitle: 'Fourchette ya prix indicative mpo na projet na yo',
        quote_estimated_cost: 'Motuya oyo ezwami',
        quote_detail_type: 'Type ya projet',
        quote_detail_surface: 'Surface',
        quote_detail_location: 'Localisation',
        quote_detail_quality: 'Qualité',
        quote_detail_rooms: 'Ba pièces',
        quote_detail_options: 'Ba options',
        quote_request_official: 'Senga devis officiel',
        quote_recalculate: 'Kozongisa calcul',
        quote_final_disclaimer: '💡 Estimation oyo epesi mpo na koyeba kaka. Mpo na devis précis mpe personnalisé, pesa biso contact mpo na visite na site.',
        pricing_guide_title: 'Guide ya ba prix na m²',
        pricing_guide_intro: 'Ba prix oyo ezali na se epesi mpo na koyeba mpo na kosalisa yo na budget.',
        pricing_header_type: 'Type ya projet',
        pricing_header_standard: 'Standard',
        pricing_header_premium: 'Premium',
        pricing_header_luxe: 'Luxe',
      },
      es: {
        nav_home: 'Inicio',
        nav_services: 'Servicios',
        nav_gallery: 'Galería',
        nav_about: 'Sobre nosotros',
        nav_faq: 'FAQ',
        nav_contact: 'Contacto',
        nav_careers: 'Carreras',
        nav_blog: 'Blog',
        nav_quote: 'Calculadora de presupuesto',
        hero_title: 'Construcción & renovación de alta gama',
        hero_text: 'Acompañamos sus proyectos residenciales y profesionales con saber hacer, diseño y eficiencia.',
        hero_cta: 'Nuestros servicios',
        theme_toggle: 'Modo oscuro',
        theme_toggle_light: 'Modo claro',
        services_title: 'Nuestros servicios',
        services_intro: 'Descubra nuestra gama completa de servicios BTP, desde el diseño hasta la entrega.',
        card_conception_title: 'Estudio & diseño',
        card_conception_text: 'Planos personalizados y seguimiento de estudio arquitectónico para realizaciones sólidas y estéticas.',
        card_renovation_title: 'Renovación inteligente',
        card_renovation_text: 'Renovación, optimización del espacio y modernización de sus edificios con acabados cuidados.',
        card_gestion_title: 'Gestión de obra',
        card_gestion_text: 'Coordinación completa de los trabajos, respeto de plazos y control de calidad hasta la entrega.',
        card_formation_title: 'Formación BTP & Software',
        card_formation_text: 'Formaciones profesionales en técnicas de construcción y software técnico para desarrollar sus habilidades.',
        card_materiaux_title: 'Venta de Materiales',
        card_materiaux_text: 'Distribución de materiales de construcción de alta calidad al mejor precio para sus proyectos.',
        services_stone_title: 'Fabricación & colocación de piedras planas',
        services_stone_text: 'Fabricación a medida y colocación de piedras planas para fachadas, pavimentos y revestimientos.',
        services_backfill_title: 'Relleno & nivelación',
        services_backfill_text: 'Relleno y nivelación para cimientos, nivelación y preparación del terreno.',
        services_gardening_title: 'Jardinería & paisajismo',
        services_gardening_text: 'Creación y mantenimiento de espacios verdes, plantaciones, césped y sistemas de riego.',
        services_paint_title: 'Pintura de edificios',
        services_paint_text: 'Pintura interior y exterior, acabados duraderos y tratamientos antihumedad.',
        services_procurement_title: 'Aprovisionamiento & logística',
        services_procurement_text: 'Gestión de materiales, aprovisionamiento, entrega y coordinación logística para cumplir plazos.',
        gallery_title: 'Galería de proyectos',
        gallery_intro: 'Descubra algunas de nuestras obras, renovaciones y proyectos de acondicionamiento realizados con esmero.',
        gallery_caption_1: 'Renovación interior moderna',
        gallery_caption_2: 'Fachada de edificio renovada',
        gallery_caption_3: 'Proyecto de diseño arquitectónico',
        gallery_caption_4: 'Espacio de vida renovado',
        gallery_caption_5: 'Obra de construcción',
        gallery_caption_6: 'Rediseño de oficina',
        about_title: 'Sobre Imperial Building Group',
        about_text_1: 'Fundado con una visión clara de excelencia en el sector de la construcción y renovación.',
        about_text_2: 'Operamos en una amplia gama de servicios, desde el diseño arquitectónico hasta la entrega llave en mano.',
        about_text_3: 'La calidad está en el corazón de cada intervención.',
        about_text_4: 'Creemos firmemente que cada proyecto es único.',
        about_text_5: 'Mirando al futuro, integramos soluciones innovadoras.',
        promise_title: 'Nuestra promesa',
        promise_item_1: 'Obras limpias y organizadas',
        promise_item_2: 'Plazos respetados',
        promise_item_3: 'Seguimiento personalizado al cliente',
        follow_us_title: 'Síguenos',
        follow_us_text: 'Encuentre nuestros proyectos, noticias y consejos en redes sociales:',
        contact_title: 'Contacto',
        contact_text: 'Envíe un mensaje para hablar de su proyecto.',
        label_name: 'Nombre',
        label_email: 'Email',
        label_subject: 'Asunto',
        label_message: 'Mensaje',
        placeholder_name: 'Su nombre',
        placeholder_email: 'Su email',
        placeholder_message: 'Su mensaje',
        contact_send: 'Enviar',
        contact_subject_options: 'Elija un asunto',
        contact_subject_quote: 'Solicitud de presupuesto',
        contact_subject_info: 'Solicitud de información',
        contact_subject_project: 'Proyecto de construcción',
        contact_subject_renovation: 'Proyecto de renovación',
        contact_subject_training: 'Formación',
        contact_subject_other: 'Otro',
        careers_title: 'Postular en Imperial Building Group',
        careers_description: 'Envíenos su candidatura para unirse a nuestro equipo.',
        careers_file_note: 'Si adjunta un CV, recuerde adjuntarlo manualmente en su cliente de correo.',
        careers_label_name: 'Nombre completo',
        careers_label_email: 'Email',
        careers_label_phone: 'Teléfono',
        careers_label_position: 'Puesto solicitado',
        careers_option_general: 'General',
        careers_option_engineer: 'Ingeniero',
        careers_option_architect: 'Arquitecto',
        careers_option_site_manager: 'Jefe de obra',
        careers_option_mason: 'Albañil',
        careers_option_electrician: 'Electricista',
        careers_option_plumber: 'Fontanero',
        careers_option_other: 'Otro',
        careers_label_message: 'Mensaje',
        careers_label_cv: 'CV (archivo)',
        careers_submit: 'Enviar candidatura',
        placeholder_careers_name: 'Su nombre',
        placeholder_careers_email: 'Su email',
        placeholder_careers_phone: 'Su teléfono',
        placeholder_careers_position: 'Seleccione un puesto',
        placeholder_careers_message: 'Su carta de motivación',
        footer_text: '© 2026 Imperial Building Group. Todos los derechos reservados.',
        footer_links: 'Enlaces',
        footer_privacy: 'Privacidad',
        footer_terms: 'Aviso legal',
        form_error: 'Por favor, proporcione su nombre y email.',
        form_success: '¡Gracias! Su mensaje ha sido enviado.',
        figures_title: 'Imperial Building Group en cifras',
        figures_projects: 'Proyectos realizados',
        figures_years: 'Años de experiencia',
        figures_clients: '% Clientes satisfechos',
        figures_employees: 'Empleados cualificados',
        figures_cities: 'Ciudades cubiertas',
        testimonials_title: 'Lo que dicen nuestros clientes',
        testimonials_intro: 'La satisfacción del cliente es nuestra recompensa.',
        testimonials_cta: 'Da tu opinión',
        team_title: 'Nuestro equipo',
        team_intro: 'Profesionales apasionados a su servicio.',
        team_member_1_name: 'Chrinovic Mikohe',
        team_member_1_role: 'Director General',
        team_member_1_bio: 'Visionario y fundador.',
        team_member_2_name: 'Jean-Pierre Dubois',
        team_member_2_role: 'Arquitecto Jefe',
        team_member_2_bio: 'Arquitecto titulado con 15+ años de experiencia.',
        team_member_3_name: 'Marie Kabongo',
        team_member_3_role: 'Jefa de Proyecto',
        team_member_3_bio: 'Experta en coordinación de obra.',
        team_member_4_name: 'Paul Mbaya',
        team_member_4_role: 'Ingeniero Civil',
        team_member_4_bio: 'Especialista en estructuras.',
        faq_title: 'Preguntas frecuentes',
        faq_intro: 'Encuentre respuestas rápidas.',
        faq_q1: '¿Qué proyectos realizan?',
        faq_a1: 'Proyectos residenciales y comerciales, renovaciones y paisajismo.',
        faq_q2: '¿Cómo obtener un presupuesto?',
        faq_a2: 'Contáctenos por formulario, email o teléfono. Respondemos en 48h.',
        faq_q3: '¿Plazos de ejecución?',
        faq_a3: '2-6 meses para obra nueva, 1-3 meses para reforma.',
        faq_q4: '¿Ofrecen formación?',
        faq_a4: 'Sí, formación en técnicas de construcción y software.',
        faq_q5: '¿Trabajan fuera de Goma?',
        faq_a5: 'Sí, cubrimos Goma, Bukavu, Kinshasa, Lubumbashi y Kisangani.',
        partners_title: 'Nuestros socios',
        partners_intro: 'Ellos confían en nosotros.',
        all_services: 'Ver todos los servicios',
        service_learn_more: 'Saber más',
        service_modal_cta: 'Solicitar presupuesto',
        service_modal_back: 'Volver a servicios',
        gallery_filter_all: 'Todos',
        gallery_filter_construction: 'Construcción',
        gallery_filter_renovation: 'Renovación',
        gallery_filter_design: 'Diseño',
        gallery_filter_amenagement: 'Acondicionamiento',
        newsletter_title: 'Boletín',
        newsletter_placeholder: 'Tu correo',
        newsletter_btn: 'Suscribirse',
        newsletter_success: '¡Gracias!',
        cookie_text: 'Usamos cookies para mejorar tu experiencia.',
        cookie_accept: 'Aceptar',
        cookie_decline: 'Rechazar',
        page_title_home: 'Imperial Building Group — Construcción & renovación',
        page_title_services: 'Servicios — Imperial Building Group',
        page_title_gallery: 'Galería — Imperial Building Group',
        page_title_contact: 'Contacto — Imperial Building Group',
        page_title_careers: 'Carreras — Imperial Building Group',
        page_title_quote: 'Calculadora de presupuesto — Imperial Building Group',
        quote_title: 'Calculadora de presupuesto',
        quote_intro: 'Obtenga una estimación preliminar instantánea para su proyecto. Complete la información a continuación y descubra un rango de precios indicativo.',
        quote_disclaimer: '⚠️ Esta es una estimación indicativa. Un presupuesto oficial se establecerá después de una visita al sitio.',
        quote_step1_title: '1. Tipo de proyecto',
        quote_project_type: 'Tipo de proyecto *',
        quote_select: '— Seleccione —',
        service_construction: 'Construcción nueva',
        service_renovation: 'Renovación',
        service_extension: 'Extensión / elevación',
        service_amenagement: 'Acondicionamiento interior',
        service_facade: 'Fachada & revestimiento',
        service_paysager: 'Paisajismo',
        quote_surface: 'Superficie (m²) *',
        quote_location: 'Ubicación *',
        location_goma: 'Goma',
        location_bukavu: 'Bukavu',
        location_kinshasa: 'Kinshasa',
        location_lubumbashi: 'Lubumbashi',
        location_other: 'Otro (RDC)',
        quote_next: 'Siguiente →',
        quote_step2_title: '2. Calidad & acabados',
        quote_quality: 'Calidad de materiales *',
        quality_standard: 'Estándar — Materiales comunes, acabados simples',
        quality_premium: 'Premium — Materiales de alta calidad, buenos acabados',
        quality_luxe: 'Lujo — Materiales de gama alta, acabados a medida',
        quote_rooms: 'Número de habitaciones principales',
        quote_floors: 'Número de pisos',
        quote_prev: '← Anterior',
        quote_step3_title: '3. Opciones adicionales',
        quote_step3_intro: 'Seleccione los servicios complementarios deseados:',
        option_electricite: 'Instalación eléctrica completa',
        option_plomberie: 'Fontanería & sanitarios',
        option_peinture: 'Pintura interior & exterior',
        option_menuiserie: 'Carpintería (puertas, ventanas)',
        option_climatisation: 'Aire acondicionado & ventilación',
        option_jardin: 'Jardín / espacio verde',
        option_cloture: 'Cerca & portón',
        option_piscine: 'Piscina & spa',
        option_panneaux: 'Paneles solares',
        option_garde: 'Sistema de seguridad & vigilancia',
        quote_calculate: 'Calcular mi estimación',
        quote_result_title: 'Su estimación',
        quote_result_subtitle: 'Rango de precios indicativo para su proyecto',
        quote_estimated_cost: 'Costo estimado',
        quote_detail_type: 'Tipo de proyecto',
        quote_detail_surface: 'Superficie',
        quote_detail_location: 'Ubicación',
        quote_detail_quality: 'Calidad',
        quote_detail_rooms: 'Habitaciones',
        quote_detail_options: 'Opciones',
        quote_request_official: 'Solicitar presupuesto oficial',
        quote_recalculate: 'Recalcular',
        quote_final_disclaimer: '💡 Esta estimación se proporciona solo como indicación. Para un presupuesto preciso y personalizado, contáctenos para una visita al sitio.',
        pricing_guide_title: 'Guía de precios por m²',
        pricing_guide_intro: 'Los precios a continuación son indicativos para ayudarle a estimar su presupuesto.',
        pricing_header_type: 'Tipo de proyecto',
        pricing_header_standard: 'Estándar',
        pricing_header_premium: 'Premium',
        pricing_header_luxe: 'Lujo',
      },
      zh: {
        nav_home: '首页',
        nav_services: '服务',
        nav_gallery: '图库',
        nav_about: '关于我们',
        nav_faq: '常见问题',
        nav_contact: '联系',
        nav_careers: '招聘',
        nav_blog: '博客',
        nav_quote: '报价计算器',
        hero_title: '高端建筑与翻新',
        hero_text: '我们以专业知识、设计和效率支持您的住宅和商业项目。',
        hero_cta: '我们的服务',
        theme_toggle: '深色模式',
        theme_toggle_light: '浅色模式',
        services_title: '我们的服务',
        services_intro: '发现我们完整的BTP服务范围，从设计到交付。',
        card_conception_title: '研究与设计',
        card_conception_text: '定制平面图和建筑研究支持，打造坚固美观的项目。',
        card_renovation_title: '智能翻新',
        card_renovation_text: '翻新、空间优化和现代化改造，精装修。',
        card_gestion_title: '工地管理',
        card_gestion_text: '全面协调工作、管理工期和质量控制，直至交付。',
        card_formation_title: '建筑培训与软件',
        card_formation_text: '建筑技术和专业软件的专业培训，提升您的技能。',
        card_materiaux_title: '材料销售',
        card_materiaux_text: '以最优惠的价格为您的项目分销优质建筑材料。',
        services_stone_title: '石板制造与安装',
        services_stone_text: '定制石板制造和安装，用于外墙、铺路和覆层。',
        services_backfill_title: '回填与找平',
        services_backfill_text: '地基回填和找平、平整和场地准备。',
        services_gardening_title: '园艺与景观设计',
        services_gardening_text: '绿色空间创建和维护、种植、铺草和灌溉系统。',
        services_paint_title: '建筑涂装',
        services_paint_text: '室内外涂装、耐久饰面和防潮处理。',
        services_procurement_title: '采购与物流',
        services_procurement_text: '材料管理、采购、交付和物流协调以满足工期。',
        gallery_title: '项目图库',
        gallery_intro: '发现我们精心完成的一些工地、翻新和装修项目。',
        gallery_caption_1: '现代室内翻新',
        gallery_caption_2: '翻新的建筑外墙',
        gallery_caption_3: '建筑设计项目',
        gallery_caption_4: '翻新的生活空间',
        gallery_caption_5: '建筑工地',
        gallery_caption_6: '办公室重新设计',
        about_title: '关于Imperial Building Group',
        about_text_1: '秉承在建筑和翻新领域追求卓越的明确愿景而成立。',
        about_text_2: '我们提供广泛的服务，从建筑设计到交钥匙交付。',
        about_text_3: '质量是我们每次服务的核心。',
        about_text_4: '我们坚信每个项目都是独一无二的。',
        about_text_5: '展望未来，我们整合创新解决方案。',
        promise_title: '我们的承诺',
        promise_item_1: '清洁有序的工地',
        promise_item_2: '尊重工期',
        promise_item_3: '个性化客户跟进',
        follow_us_title: '关注我们',
        follow_us_text: '在社交媒体上找到我们的项目、新闻和提示：',
        contact_title: '联系',
        contact_text: '发送消息讨论您的项目。',
        label_name: '姓名',
        label_email: '邮箱',
        label_subject: '主题',
        label_message: '消息',
        placeholder_name: '您的姓名',
        placeholder_email: '您的邮箱',
        placeholder_message: '您的消息',
        contact_send: '发送',
        contact_subject_options: '选择主题',
        contact_subject_quote: '报价请求',
        contact_subject_info: '信息请求',
        contact_subject_project: '建筑项目',
        contact_subject_renovation: '翻新项目',
        contact_subject_training: '培训',
        contact_subject_other: '其他',
        careers_title: '在Imperial Building Group申请',
        careers_description: '发送您的申请加入我们团队。',
        careers_file_note: '如果您附上简历，请记得在邮件客户端中手动附加。',
        careers_label_name: '全名',
        careers_label_email: '邮箱',
        careers_label_phone: '电话',
        careers_label_position: '申请职位',
        careers_option_general: '一般',
        careers_option_engineer: '工程师',
        careers_option_architect: '建筑师',
        careers_option_site_manager: '工地经理',
        careers_option_mason: '泥瓦匠',
        careers_option_electrician: '电工',
        careers_option_plumber: '水管工',
        careers_option_other: '其他',
        careers_label_message: '消息',
        careers_label_cv: '简历（文件）',
        careers_submit: '发送申请',
        placeholder_careers_name: '您的姓名',
        placeholder_careers_email: '您的邮箱',
        placeholder_careers_phone: '您的电话',
        placeholder_careers_position: '选择职位',
        placeholder_careers_message: '您的求职信',
        footer_text: '© 2026 Imperial Building Group。保留所有权利。',
        footer_links: '链接',
        footer_privacy: '隐私政策',
        footer_terms: '法律声明',
        form_error: '请提供您的姓名和邮箱。',
        form_success: '谢谢！您的消息已提交。',
        figures_title: 'Imperial Building Group 数据',
        figures_projects: '已完成项目',
        figures_years: '经验年限',
        figures_clients: '% 满意客户',
        figures_employees: '合格员工',
        figures_cities: '覆盖城市',
        testimonials_title: '客户评价',
        testimonials_intro: '客户满意是我们最大的回报。',
        testimonials_cta: '给出评价',
        team_title: '我们的团队',
        team_intro: '热情的专业人士为您服务。',
        team_member_1_name: 'Chrinovic Mikohe',
        team_member_1_role: '首席执行官',
        team_member_1_bio: '愿景家和创始人。',
        team_member_2_name: 'Jean-Pierre Dubois',
        team_member_2_role: '首席建筑师',
        team_member_2_bio: '持证建筑师，15年以上经验。',
        team_member_3_name: 'Marie Kabongo',
        team_member_3_role: '项目经理',
        team_member_3_bio: '现场协调和团队管理专家。',
        team_member_4_name: 'Paul Mbaya',
        team_member_4_role: '土木工程师',
        team_member_4_bio: '结构和材料专家。',
        faq_title: '常见问题',
        faq_intro: '快速找到答案。',
        faq_q1: '你们承接哪些项目？',
        faq_a1: '住宅和商业项目、翻新和室外景观。',
        faq_q2: '如何获取报价？',
        faq_a2: '通过表格、电子邮件或电话联系我们。48小时内回复。',
        faq_q3: '施工周期？',
        faq_a3: '新建2-6个月，翻新1-3个月。',
        faq_q4: '你们提供培训吗？',
        faq_a4: '是的，提供建筑技术和软件培训。',
        faq_q5: '你们在戈马以外的地方工作吗？',
        faq_a5: '是的，覆盖戈马、布卡武、金沙萨、卢本巴希和基桑加尼。',
        partners_title: '我们的合作伙伴',
        partners_intro: '他们信任我们。',
        all_services: '查看所有服务',
        service_learn_more: '了解更多',
        service_modal_cta: '申请报价',
        service_modal_back: '返回服务',
        gallery_filter_all: '全部',
        gallery_filter_construction: '建筑',
        gallery_filter_renovation: '翻新',
        gallery_filter_design: '设计',
        gallery_filter_amenagement: '布局',
        newsletter_title: '新闻通讯',
        newsletter_placeholder: '您的邮箱',
        newsletter_btn: '订阅',
        newsletter_success: '谢谢！',
        cookie_text: '我们使用 cookie 来改善您的体验。',
        cookie_accept: '接受',
        cookie_decline: '拒绝',
        page_title_home: 'Imperial Building Group — 建筑与翻新',
        page_title_services: '服务 — Imperial Building Group',
        page_title_gallery: '图库 — Imperial Building Group',
        page_title_contact: '联系 — Imperial Building Group',
        page_title_careers: '招聘 — Imperial Building Group',
        page_title_quote: '报价计算器 — Imperial Building Group',
        quote_title: '报价计算器',
        quote_intro: '为您的项目获得即时初步估算。填写以下信息，发现指示性价格范围。',
        quote_disclaimer: '⚠️ 这是一个指示性估算。现场考察后将确定正式报价。',
        quote_step1_title: '1. 项目类型',
        quote_project_type: '项目类型 *',
        quote_select: '— 选择 —',
        service_construction: '新建',
        service_renovation: '翻新',
        service_extension: '扩建/加层',
        service_amenagement: '室内布局',
        service_facade: '外墙与抹灰',
        service_paysager: '景观美化',
        quote_surface: '面积（平方米）*',
        quote_location: '地点 *',
        location_goma: '戈马',
        location_bukavu: '布卡武',
        location_kinshasa: '金沙萨',
        location_lubumbashi: '卢本巴希',
        location_other: '其他（刚果金）',
        quote_next: '下一步 →',
        quote_step2_title: '2. 质量与装饰',
        quote_quality: '材料质量 *',
        quality_standard: '标准 — 普通材料，简单装饰',
        quality_premium: '高级 — 优质材料，精美装饰',
        quality_luxe: '豪华 — 顶级材料，定制装饰',
        quote_rooms: '主要房间数量',
        quote_floors: '楼层数',
        quote_prev: '← 上一步',
        quote_step3_title: '3. 附加选项',
        quote_step3_intro: '选择您需要的附加服务：',
        option_electricite: '完整电气安装',
        option_plomberie: '管道与卫浴',
        option_peinture: '室内外涂装',
        option_menuiserie: '木工（门窗）',
        option_climatisation: '空调与通风',
        option_jardin: '花园/绿地布局',
        option_cloture: '围栏与大门',
        option_piscine: '游泳池与水疗',
        option_panneaux: '太阳能板',
        option_garde: '安防与监控系统',
        quote_calculate: '计算我的估算',
        quote_result_title: '您的估算',
        quote_result_subtitle: '您项目的指示性价格范围',
        quote_estimated_cost: '预估成本',
        quote_detail_type: '项目类型',
        quote_detail_surface: '面积',
        quote_detail_location: '地点',
        quote_detail_quality: '质量',
        quote_detail_rooms: '房间',
        quote_detail_options: '选项',
        quote_request_official: '请求正式报价',
        quote_recalculate: '重新计算',
        quote_final_disclaimer: '💡 此估算仅供参考。如需准确个性化的报价，请联系我们进行现场考察。',
        pricing_guide_title: '每平方米价格指南',
        pricing_guide_intro: '以下价格仅供参考，帮助您估算预算。',
        pricing_header_type: '项目类型',
        pricing_header_standard: '标准',
        pricing_header_premium: '高级',
        pricing_header_luxe: '豪华',
      },
      sw: {
        nav_home: 'Nyumbani',
        nav_services: 'Huduma',
        nav_gallery: 'Matunzio',
        nav_about: 'Kuhusu sisi',
        nav_faq: 'Maswali',
        nav_contact: 'Wasiliana',
        nav_careers: 'Ajira',
        nav_blog: 'Blogu',
        nav_quote: 'Kikokotoo cha nukuu',
        hero_title: 'Ujenzi & ukarabati wa hali ya juu',
        hero_text: 'Tunasaidia miradi yako ya makazi na biashara kwa ujuzi, muundo na ufanisi.',
        hero_cta: 'Huduma zetu',
        theme_toggle: 'Hali ya giza',
        theme_toggle_light: 'Hali ya mwanga',
        services_title: 'Huduma zetu',
        services_intro: 'Gundua huduma zetu kamili za BTP, kutoka kwa muundo hadi utoaji.',
        card_conception_title: 'Utafiti & muundo',
        card_conception_text: 'Mipango maalum na usaidizi wa masomo ya usanifu kwa miradi thabiti na ya kupendeza.',
        card_renovation_title: 'Ukarabati wa busara',
        card_renovation_text: 'Urekebishaji, uboreshaji wa nafasi na uboreshaji wa majengo yako kwa kumaliza vizuri.',
        card_gestion_title: 'Usimamizi wa tovuti',
        card_gestion_text: 'Uratibu kamili wa kazi, usimamizi wa tarehe na udhibiti wa ubora hadi utoaji.',
        card_formation_title: 'Mafunzo ya ujenzi & programu',
        card_formation_text: 'Mafunzo ya kitaalamu katika mbinu za ujenzi na programu za kiufundi kukuza ujuzi wako.',
        card_materiaux_title: 'Uuzaji wa vifaa',
        card_materiaux_text: 'Usambazaji wa vifaa vya ujenzi vya hali ya juu kwa bei nzuri kwa miradi yako.',
        services_stone_title: 'Utengenezaji & uwekaji wa mawe bapa',
        services_stone_text: 'Utengenezaji maalum na uwekaji wa mawe bapa kwa vitambaa, lami na vifuniko.',
        services_backfill_title: 'Kujaza & kusawazisha',
        services_backfill_text: 'Kujaza na kusawazisha kwa msingi, usawazishaji na maandalizi ya tovuti.',
        services_gardening_title: 'Utunzaji wa bustani & mandhari',
        services_gardening_text: 'Uundaji na matengenezo ya nafasi za kijani, upandaji, nyasi na mifumo ya umwagiliaji.',
        services_paint_title: 'Uchoraji wa majengo',
        services_paint_text: 'Uchoraji wa ndani na nje, kumaliza kudumu na matibabu ya unyevu.',
        services_procurement_title: 'Ugavi & vifaa',
        services_procurement_text: 'Usimamizi wa vifaa, ugavi, utoaji na uratibu wa vifaa kukidhi tarehe.',
        gallery_title: 'Matunzio ya miradi',
        gallery_intro: 'Gundua baadhi ya tovuti zetu, ukarabati na miradi ya mpangilio iliyokamilishwa kwa uangalifu.',
        gallery_caption_1: 'Ukarabati wa kisasa wa ndani',
        gallery_caption_2: 'Kitambaa cha jengo kilichokarabatiwa',
        gallery_caption_3: 'Mradi wa muundo wa usanifu',
        gallery_caption_4: 'Nafasi ya kuishi iliyokarabatiwa',
        gallery_caption_5: 'Tovuti ya ujenzi',
        gallery_caption_6: 'Mpangilio mpya wa ofisi',
        about_title: 'Kuhusu Imperial Building Group',
        about_text_1: 'Ilianzishwa kwa maono wazi ya ubora katika sekta ya ujenzi na ukarabati.',
        about_text_2: 'Tunafanya kazi katika huduma mbalimbali, kutoka kwa muundo wa usanifu hadi utoaji wa turnkey.',
        about_text_3: 'Ubora uko moyoni mwa kila uingiliaji kati.',
        about_text_4: 'Tunaamini kabisa kuwa kila mradi ni wa kipekee.',
        about_text_5: 'Tukiangalia siku zijazo, tunajumuisha suluhisho za kibunifu.',
        promise_title: 'Ahadi yetu',
        promise_item_1: 'Tovuti safi na zilizopangwa',
        promise_item_2: 'Tarehe zinaheshimiwa',
        promise_item_3: 'Ufuatiliaji wa kibinafsi wa mteja',
        follow_us_title: 'Tufuate',
        follow_us_text: 'Pata miradi yetu, habari na vidokezo kwenye mitandao ya kijamii:',
        contact_title: 'Wasiliana',
        contact_text: 'Tuma ujumbe kujadili mradi wako.',
        label_name: 'Jina',
        label_email: 'Barua pepe',
        label_subject: 'Mada',
        label_message: 'Ujumbe',
        placeholder_name: 'Jina lako',
        placeholder_email: 'Barua pepe yako',
        placeholder_message: 'Ujumbe wako',
        contact_send: 'Tuma',
        contact_subject_options: 'Chagua mada',
        contact_subject_quote: 'Ombi la nukuu',
        contact_subject_info: 'Ombi la habari',
        contact_subject_project: 'Mradi wa ujenzi',
        contact_subject_renovation: 'Mradi wa ukarabati',
        contact_subject_training: 'Mafunzo',
        contact_subject_other: 'Nyingine',
        careers_title: 'Omba kazi Imperial Building Group',
        careers_description: 'Tutume ombi lako kujiunga na timu yetu.',
        careers_file_note: 'Ukiongeza CV, kumbuka kuiambatisha kwa mikono kwenye kliyenti yako ya barua pepe.',
        careers_label_name: 'Jina kamili',
        careers_label_email: 'Barua pepe',
        careers_label_phone: 'Simu',
        careers_label_position: 'Nafasi unayoomba',
        careers_option_general: 'Kwa ujumla',
        careers_option_engineer: 'Mhandisi',
        careers_option_architect: 'Mbunifu',
        careers_option_site_manager: 'Meneja wa tovuti',
        careers_option_mason: 'Mwashi',
        careers_option_electrician: 'Mtaalamu wa umeme',
        careers_option_plumber: 'Funda wa bomba',
        careers_option_other: 'Nyingine',
        careers_label_message: 'Ujumbe',
        careers_label_cv: 'CV (faili)',
        careers_submit: 'Tuma ombi',
        placeholder_careers_name: 'Jina lako',
        placeholder_careers_email: 'Barua pepe yako',
        placeholder_careers_phone: 'Simu yako',
        placeholder_careers_position: 'Chagua nafasi',
        placeholder_careers_message: 'Barua yako ya motisha',
        footer_text: '© 2026 Imperial Building Group. Haki zote zimehifadhiwa.',
        footer_links: 'Viungo',
        footer_privacy: 'Faragha',
        footer_terms: 'Notisi ya kisheria',
        form_error: 'Tafadhali toa jina lako na barua pepe.',
        form_success: 'Asante! Ujumbe wako umetumwa.',
        figures_title: 'Imperial Building Group kwa nambari',
        figures_projects: 'Miradi iliyokamilishwa',
        figures_years: 'Miaka ya uzoefu',
        figures_clients: '% Wateja walioridhika',
        figures_employees: 'Wafanyakazi wenye ujuzi',
        figures_cities: 'Miji iliyofunikwa',
        testimonials_title: 'Wateja wetu wanasema nini',
        testimonials_intro: 'Kuridhika kwa wateja ndio thawabu yetu kubwa.',
        testimonials_cta: 'Toa maoni yako',
        team_title: 'Timu yetu',
        team_intro: 'Wataalamu wenye shauku kwa huduma yako.',
        team_member_1_name: 'Chrinovic Mikohe',
        team_member_1_role: 'Mkurugenzi Mkuu',
        team_member_1_bio: 'Mwenye maono na mwanzilishi.',
        team_member_2_name: 'Jean-Pierre Dubois',
        team_member_2_role: 'Mbunifu Mkuu',
        team_member_2_bio: 'Mbunifu aliyehitimu na uzoefu wa miaka 15+.',
        team_member_3_name: 'Marie Kabongo',
        team_member_3_role: 'Meneja wa Mradi',
        team_member_3_bio: 'Mtaalamu wa uratibu wa tovuti.',
        team_member_4_name: 'Paul Mbaya',
        team_member_4_role: 'Mhandisi wa Ujenzi',
        team_member_4_bio: 'Mtaalamu wa miundo na nyenzo.',
        faq_title: 'Maswali ya mara kwa mara',
        faq_intro: 'Pata majibu haraka.',
        faq_q1: 'Je, mnafanya miradi ya aina gani?',
        faq_a1: 'Miradi ya makazi na biashara, ukarabati na mandhari ya nje.',
        faq_q2: 'Jinsi ya kupata nukuu?',
        faq_a2: 'Wasiliana nasi kupitia fomu, barua pepe au simu. Tutajibu ndani ya masaa 48.',
        faq_q3: 'Muda wa kukamilisha?',
        faq_a3: 'Miezi 2-6 kwa ujenzi mpya, miezi 1-3 kwa ukarabati.',
        faq_q4: 'Je, mtoa mafunzo?',
        faq_a4: 'Ndiyo, mafunzo ya kitaalamu katika mbinu za ujenzi na programu.',
        faq_q5: 'Je, mnafanya kazi nje ya Goma?',
        faq_a5: 'Ndiyo, tunashughulikia Goma, Bukavu, Kinshasa, Lubumbashi na Kisangani.',
        partners_title: 'Washirika wetu',
        partners_intro: 'Wanatuamini.',
        all_services: 'Tazama huduma zote',
        service_learn_more: 'Jifunze zaidi',
        service_modal_cta: 'Omba nukuu',
        service_modal_back: 'Rudi kwa huduma',
        gallery_filter_all: 'Zote',
        gallery_filter_construction: 'Ujenzi',
        gallery_filter_renovation: 'Ukarabati',
        gallery_filter_design: 'Ubunifu',
        gallery_filter_amenagement: 'Mpangilio',
        newsletter_title: 'Jarida la habari',
        newsletter_placeholder: 'Barua pepe yako',
        newsletter_btn: 'Jisajili',
        newsletter_success: 'Asante!',
        cookie_text: 'Tunatumia cookies kuboresha uzoefu wako.',
        cookie_accept: 'Kubali',
        cookie_decline: 'Kataa',
        page_title_home: 'Imperial Building Group — Ujenzi & ukarabati',
        page_title_services: 'Huduma — Imperial Building Group',
        page_title_gallery: 'Galleria — Imperial Building Group',
        page_title_contact: 'Mawasiliano — Imperial Building Group',
        page_title_careers: 'Ajira — Imperial Building Group',
        page_title_quote: 'Kikokotoo cha nukuu — Imperial Building Group',
        quote_title: 'Kikokotoo cha nukuu',
        quote_intro: 'Pata makadirio ya awali ya papo hapo kwa mradi wako. Jaza habari hapa chini na ugundue bei ya dalili.',
        quote_disclaimer: '⚠️ Hii ni makadirio ya dalili. Nukuu rasmi itatolewa baada ya ziara ya tovuti.',
        quote_step1_title: '1. Aina ya mradi',
        quote_project_type: 'Aina ya mradi *',
        quote_select: '— Chagua —',
        service_construction: 'Ujenzi mpya',
        service_renovation: 'Ukarabati',
        service_extension: 'Upanuzi / kuinua',
        service_amenagement: 'Mpangilio wa ndani',
        service_facade: 'Kitambaa & upakaji',
        service_paysager: 'Mandhari',
        quote_surface: 'Eneo (m²) *',
        quote_location: 'Mahali *',
        location_goma: 'Goma',
        location_bukavu: 'Bukavu',
        location_kinshasa: 'Kinshasa',
        location_lubumbashi: 'Lubumbashi',
        location_other: 'Nyingine (DRC)',
        quote_next: 'Ifuatayo →',
        quote_step2_title: '2. Ubora & kumaliza',
        quote_quality: 'Ubora wa vifaa *',
        quality_standard: 'Kiwango — Vifaa vya kawaida, kumaliza rahisi',
        quality_premium: 'Premium — Vifaa vya hali ya juu, kumaliza vizuri',
        quality_luxe: 'Anasa — Vifaa vya daraja la juu, kumaliza maalum',
        quote_rooms: 'Idadi ya vyumba vikuu',
        quote_floors: 'Idadi ya sakafu',
        quote_prev: '← Iliyopita',
        quote_step3_title: '3. Chaguzi za ziada',
        quote_step3_intro: 'Chagua huduma za ziada unazotaka:',
        option_electricite: 'Ufungaji kamili wa umeme',
        option_plomberie: 'Mabomba & vyoo',
        option_peinture: 'Uchoraji wa ndani & nje',
        option_menuiserie: 'Useremala (milango, madirisha)',
        option_climatisation: 'Kiyoyozi & uingizaji hewa',
        option_jardin: 'Bustani / nafasi ya kijani',
        option_cloture: 'Uzio & lango',
        option_piscine: 'Bwawa la kuogelea & spa',
        option_panneaux: 'Paneli za jua',
        option_garde: 'Mfumo wa usalama & ulinzi',
        quote_calculate: 'Kokotoa makadirio yangu',
        quote_result_title: 'Makadirio yako',
        quote_result_subtitle: 'Bei ya dalili kwa mradi wako',
        quote_estimated_cost: 'Gharama inayokadiriwa',
        quote_detail_type: 'Aina ya mradi',
        quote_detail_surface: 'Eneo',
        quote_detail_location: 'Mahali',
        quote_detail_quality: 'Ubora',
        quote_detail_rooms: 'Vyumba',
        quote_detail_options: 'Chaguzi',
        quote_request_official: 'Omba nukuu rasmi',
        quote_recalculate: 'Kokotoa upya',
        quote_final_disclaimer: '💡 Makadirio haya yanatoa dalili tu. Kwa nukuu sahihi na ya kibinafsi, tafadhali wasiliana nasi kwa ziara ya tovuti.',
        pricing_guide_title: 'Mwongozo wa bei kwa m²',
        pricing_guide_intro: 'Bei hapa chini ni dalili kukusaidia kukadiria bajeti yako.',
        pricing_header_type: 'Aina ya mradi',
        pricing_header_standard: 'Kiwango',
        pricing_header_premium: 'Premium',
        pricing_header_luxe: 'Anasa',
      },
    };
    // Merge into translations
    for (const lang in moreLangs) {
      if (!translations[lang]) translations[lang] = {};
      Object.assign(translations[lang], moreLangs[lang]);
    }
    // Also extend fr and en with any missing new keys
    const frKeys = {
      nav_blog: 'Blog',
      nav_quote: 'Calculateur de devis',
      page_title_home: 'Imperial Building Group — Construction & rénovation haut de gamme à Goma, RDC',
      page_title_services: 'Nos services — Imperial Building Group',
      page_title_gallery: 'Galerie - Imperial Building Group',
      page_title_contact: 'Contact - Imperial Building Group',
      page_title_careers: 'Postuler - Imperial Building Group',
      page_title_quote: 'Calculateur de devis — Imperial Building Group',
      page_title_booking: 'Prise de rendez-vous — Imperial Building Group',
      nav_booking: 'Rendez-vous',
    };
    const enKeys = {
      nav_blog: 'Blog',
      nav_quote: 'Quote calculator',
      page_title_home: 'Imperial Building Group — High-end construction & renovation in Goma, DRC',
      page_title_services: 'Our services — Imperial Building Group',
      page_title_gallery: 'Gallery - Imperial Building Group',
      page_title_contact: 'Contact - Imperial Building Group',
      page_title_careers: 'Apply - Imperial Building Group',
      page_title_quote: 'Quote calculator — Imperial Building Group',
    };
    Object.assign(translations.fr, frKeys);
    Object.assign(translations.en, enKeys);
  }
  extendTranslations();

  // ---- i18n functions ----
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

  // ---- Language UI ----
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

  // ---- Navigation Toggle ----
  navToggle?.addEventListener('click', () => {
    siteNav?.classList.toggle('open');
  });

  // Close nav on link click
  document.querySelectorAll('.site-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      if (siteNav?.classList.contains('open')) {
        siteNav.classList.remove('open');
      }
    });
  });

  // ---- Theme ----
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

  // ---- Contact Form ----
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message?.value?.trim() || '';
    const subjectSelect = form.querySelector('[name="subject"]');
    const subject = subjectSelect?.value || 'Message';

    if (!name || !email || !message || message.length < 10) {
      if (formStatus) formStatus.textContent = translations[currentLang]?.form_error || translations.fr.form_error;
      return;
    }

    const mailBody = `Nom: ${name}%0D%0AEmail: ${email}%0D%0ASujet: ${subject}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
    const mailto = `mailto:imperialbuilding20@gmail.com?subject=${encodeURIComponent('Contact: ' + subject + ' - ' + name)}&body=${mailBody}`;
    window.location.href = mailto;

    if (formStatus) formStatus.textContent = translations[currentLang]?.form_success || translations.fr.form_success;
    setTimeout(() => {
      if (formStatus) formStatus.textContent = '';
    }, 6000);
  });

  if (formStatus) {
    formStatus.setAttribute('role', 'status');
    formStatus.setAttribute('aria-live', 'polite');
  }

  // ---- Careers Form ----
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
      body += `%0D%0A%0D%0ACV: ${encodeURIComponent(fileName)}%0D%0A(ATTENTION: veuillez joindre le fichier CV manuellement)`;
    }

    const mailto = `mailto:imperialbuilding20@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailto;
    if (careersStatus) careersStatus.textContent = translations[currentLang]?.form_success || translations.fr.form_success;
    setTimeout(() => {
      if (careersStatus) careersStatus.textContent = '';
    }, 6000);
  });

  // ---- Real-time Weather ----
  (async function initWeather() {
    const container = document.getElementById('weather-bg');
    const infoEl = document.getElementById('weather-info');
    if (!container) return;

    const LAT = -1.6741;
    const LON = 29.2235;

    async function fetchWeather() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=weather_code,precipitation,rain,snowfall,temperature_2m&timezone=auto`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Weather API error');
        const data = await res.json();
        return data.current;
      } catch (e) {
        console.warn('Weather fetch failed:', e);
        return null;
      }
    }

    function getWeatherType(code, rain, snowfall) {
      if (snowfall > 0 || (code >= 22 && code <= 27) || code === 15 || code === 16) return 'snow';
      if (rain > 0 || [51,53,55,61,63,65,80,81,82].includes(code)) return 'rain';
      if (code <= 3) return 'sun';
      return 'cloud';
    }

    function getWeatherLabel(code) {
      const labels = {
        0: 'Ciel dégagé', 1: 'Principalement dégagé', 2: 'Partiellement nuageux', 3: 'Nuageux',
        45: 'Brouillard', 48: 'Brouillard givrant',
        51: 'Bruine légère', 53: 'Bruine modérée', 55: 'Bruine dense',
        61: 'Pluie faible', 63: 'Pluie modérée', 65: 'Pluie forte',
        71: 'Neige faible', 73: 'Neige modérée', 75: 'Neige forte',
        80: 'Averses faibles', 81: 'Averses modérées', 82: 'Averses fortes',
        95: 'Orage',
      };
      return labels[code] || 'Météo variée';
    }

    function clearParticles() {
      container.querySelectorAll('.weather-particle').forEach(el => el.remove());
    }

    function spawnParticles(type, count) {
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'weather-particle ' + type;
        el.style.left = Math.random() * 100 + '%';
        el.style.animationDuration = (Math.random() * 3 + 2) + 's';
        el.style.animationDelay = (Math.random() * 5) + 's';
        if (type === 'cloud') {
          el.style.top = (Math.random() * 50) + '%';
          el.style.animationDuration = (Math.random() * 8 + 6) + 's';
        }
        container.appendChild(el);
      }
    }

    function spawnSun() {
      const el = document.createElement('div');
      el.className = 'weather-particle sun';
      el.style.top = '10%';
      el.style.left = '70%';
      container.appendChild(el);
    }

    function spawnClouds(count) {
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'weather-particle cloud';
        el.style.top = (Math.random() * 40 + 5) + '%';
        el.style.left = '-80px';
        el.style.animationDuration = (Math.random() * 10 + 10) + 's';
        el.style.animationDelay = (Math.random() * 8) + 's';
        container.appendChild(el);
      }
    }

    function updateWeather(data) {
      clearParticles();
      if (!data) {
        if (infoEl) infoEl.textContent = '🌤️ Météo non disponible';
        spawnClouds(2);
        return;
      }
      const type = getWeatherType(data.weather_code, data.rain || 0, data.snowfall || 0);
      const label = getWeatherLabel(data.weather_code);
      const temp = data.temperature_2m !== undefined ? ` ${Math.round(data.temperature_2m)}°C` : '';
      if (infoEl) infoEl.textContent = `🌡️${temp} · ${label}`;
      switch (type) {
        case 'rain': spawnParticles('rain', 80); spawnClouds(5); break;
        case 'snow': spawnParticles('snow', 60); spawnClouds(4); break;
        case 'sun': spawnSun(); spawnClouds(2); break;
        default: spawnClouds(8); break;
      }
    }

    const data = await fetchWeather();
    updateWeather(data);
    setInterval(async () => {
      const newData = await fetchWeather();
      updateWeather(newData);
    }, 15 * 60 * 1000);
  })();

  // ---- Snowflakes ----
  (function initSnowflakes() {
    const container = document.getElementById('snowflakes-container');
    if (!container) return;
    const SYMBOLS = ['❄', '❅', '❆', '✦'];
    for (let i = 0; i < 50; i++) {
      const el = document.createElement('span');
      el.className = 'snowflake';
      el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      el.style.left = Math.random() * 100 + '%';
      el.style.fontSize = (Math.random() * 1.2 + 0.6) + 'rem';
      el.style.opacity = Math.random() * 0.5 + 0.3;
      el.style.animationDuration = (Math.random() * 6 + 5) + 's';
      el.style.animationDelay = (Math.random() * 10) + 's';
      container.appendChild(el);
    }
  })();

  // ==========================================================
  // NEW FEATURES
  // ==========================================================

  // ---- Counter Animation ----
  function initCounters() {
    const counters = document.querySelectorAll('.counter-value');
    if (!counters.length) return;

    function animateCounter(el) {
      const target = parseInt(el.dataset.target, 10);
      if (isNaN(target)) return;
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
        const eased = progress * (2 - progress);
        const current = Math.floor(eased * target);
        el.textContent = current.toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toLocaleString();
          if (el.dataset.target === '98') el.textContent = '98%';
          if (el.dataset.target === '5') el.textContent = '5+';
          if (el.dataset.target === '10') el.textContent = '10+';
          if (el.dataset.target === '50') el.textContent = '50+';
          if (el.dataset.target === '150') el.textContent = '150+';
        }
      }
      requestAnimationFrame(update);
    }

    // Use Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          animateCounter(counter);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
  }

  // ---- Testimonials ----
  function initTestimonials() {
    const carousel = document.getElementById('testimonial-carousel');
    if (!carousel) return;

    const testimonials = [
      {
        initials: 'JM',
        name: 'Jean Mwamba',
        role: 'Client résidentiel, Goma',
        text: 'Imperial Building Group a réalisé la rénovation complète de ma villa. Travail soigné, délais respectés, équipe professionnelle. Je recommande vivement !',
        stars: 5,
      },
      {
        initials: 'AL',
        name: 'Alice Lumbu',
        role: 'Promotrice immobilière',
        text: 'Nous collaborons avec Imperial Building Group depuis 3 ans pour nos projets de construction. Un partenaire fiable et compétent.',
        stars: 5,
      },
      {
        initials: 'PK',
        name: 'Pierre Kabongo',
        role: 'Gérant de société, Bukavu',
        text: 'Très satisfait de l\'aménagement de nos bureaux. Design moderne, finitions parfaites et excellent rapport qualité-prix.',
        stars: 4,
      },
      {
        initials: 'GN',
        name: 'Grace Nsimire',
        role: 'Propriétaire, Goma',
        text: 'Merci à toute l\'équipe pour la construction de notre maison. Un rêve devenu réalité grâce à leur expertise et leur écoute.',
        stars: 5,
      },
      {
        initials: 'DM',
        name: 'David Muteba',
        role: 'Architecte partenaire',
        text: 'Imperial Building Group est un excellent partenaire technique. Leur sérieux et leur professionnalisme font la différence sur le terrain.',
        stars: 5,
      },
    ];

    testimonials.forEach(t => {
      const card = document.createElement('div');
      card.className = 'testimonial-card';
      let starsHtml = '';
      for (let i = 0; i < 5; i++) {
        starsHtml += i < t.stars ? '★' : '☆';
      }
      card.innerHTML = `
        <div class="testimonial-stars">${starsHtml}</div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${t.initials}</div>
          <div>
            <div class="testimonial-name">${t.name}</div>
            <div class="testimonial-role">${t.role}</div>
          </div>
        </div>
      `;
      carousel.appendChild(card);
    });
  }

  // ---- FAQ Accordion ----
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        if (!item) return;
        const isActive = item.classList.contains('active');
        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // ---- Gallery Lightbox ----
  let lightboxIndex = 0;
  let lightboxItems = [];

  function initLightbox() {
    const overlay = document.getElementById('lightbox');
    if (!overlay) return;

    const img = document.getElementById('lightbox-image');
    const caption = document.getElementById('lightbox-caption');
    const close = document.getElementById('lightbox-close');
    const prev = document.getElementById('lightbox-prev');
    const next = document.getElementById('lightbox-next');

    function updateLightbox() {
      if (!lightboxItems.length) return;
      const item = lightboxItems[lightboxIndex];
      img.src = item.img;
      img.alt = item.caption;
      caption.textContent = item.caption;
    }

    function openLightbox(index) {
      lightboxIndex = index;
      updateLightbox();
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Collect gallery items
    document.querySelectorAll('.gallery-item').forEach((el, i) => {
      const imgEl = el.querySelector('img');
      const capEl = el.querySelector('.gallery-caption');
      if (!imgEl) return;
      lightboxItems.push({
        img: imgEl.src,
        caption: capEl ? capEl.textContent : '',
      });
      el.addEventListener('click', () => openLightbox(i));
      el.style.cursor = 'pointer';
    });

    close?.addEventListener('click', closeLightbox);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) closeLightbox();
    });

    prev?.addEventListener('click', (e) => {
      e.stopPropagation();
      lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
      updateLightbox();
    });

    next?.addEventListener('click', (e) => {
      e.stopPropagation();
      lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
      updateLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') { lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length; updateLightbox(); }
      if (e.key === 'ArrowRight') { lightboxIndex = (lightboxIndex + 1) % lightboxItems.length; updateLightbox(); }
    });
  }

  // ---- Gallery Filters ----
  function initGalleryFilters() {
    const filters = document.querySelectorAll('.gallery-filter');
    if (!filters.length) return;

    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.gallery-item').forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ---- Service Modal ----
  function initServiceModal() {
    const modal = document.getElementById('service-modal');
    if (!modal) return;

    const title = document.getElementById('service-modal-title');
    const desc = document.getElementById('service-modal-description');
    const details = document.getElementById('service-modal-details');
    const close = document.getElementById('service-modal-close');
    const back = document.getElementById('service-modal-back');

    const serviceDetails = {
      conception: {
        title: 'Étude & conception',
        desc: 'Plans personnalisés et suivi d\'étude architecturale.',
        detail: 'Notre bureau d\'études réalise des plans sur mesure, des études de faisabilité et des suivis architecturaux complets. Nous utilisons les logiciels les plus récents (Autocad, Revit, Archicad) pour concevoir des bâtiments alliant esthétique et fonctionnalité. Du concept initial au permis de construire, nous vous accompagnons à chaque étape.',
      },
      renovation: {
        title: 'Rénovation intelligente',
        desc: 'Remise à neuf, optimisation d\'espace.',
        detail: 'Nous transformons vos espaces avec une approche intelligente : réaménagement intérieur, rénovation complète, ravalement de façade, isolation thermique et acoustique. Chaque projet est unique et bénéficie d\'une attention particulière aux finitions.',
      },
      gestion: {
        title: 'Gestion de chantier',
        desc: 'Coordination complète des travaux.',
        detail: 'Notre équipe de chefs de projet coordonne l\'ensemble des corps de métier : maçons, électriciens, plombiers, peintres, menuisiers. Nous assurons le respect des délais, du budget et des normes de qualité. Un compte-rendu hebdomadaire vous est transmis.',
      },
      formation: {
        title: 'Formation BTP & Logiciels',
        desc: 'Formations professionnelles en construction.',
        detail: 'Nous proposons des formations pratiques en maçonnerie, électricité, plomberie, soudure, carrelage, ainsi que des formations sur logiciels techniques (Autocad, Excel BTP). Sessions en présentiel à Goma ou en ligne. Certificat de formation délivré.',
      },
      materiaux: {
        title: 'Vente Matériaux',
        desc: 'Matériaux de construction de qualité.',
        detail: 'Distributeur agréé de matériaux de construction : ciment, fer à béton, sable, gravier, briques, tuiles, carreaux, peinture, plomberie, électricité. Nous proposons des prix compétitifs et une livraison rapide sur vos chantiers.',
      },
      pierre: {
        title: 'Fabrication & pose des pierres plates',
        desc: 'Pierre sur mesure pour façades et dallages.',
        detail: 'Notre atelier de fabrication produit des pierres plates de qualité supérieure pour façades, parements, dallages et margelles. Pose professionnelle par nos équipes expérimentées. Finitions soignées garanties.',
      },
      garnissage: {
        title: 'Garnissage & remblaiement',
        desc: 'Travaux de fondation et nivellement.',
        detail: 'Nous réalisons tous travaux de garnissage, remblaiement, nivellement et préparation de terrain pour vos fondations. Utilisation d\'engins modernes et respect des normes géotechniques.',
      },
      jardinage: {
        title: 'Jardinage & aménagement paysager',
        desc: 'Création et entretien d\'espaces verts.',
        detail: 'Conception et réalisation de jardins, plantations, engazonnement, systèmes d\'irrigation automatique, éclairage paysager, clôtures et terrasses. Nous transformons vos extérieurs en véritables espaces de vie.',
      },
      peinture: {
        title: 'Peinture bâtiment',
        desc: 'Peinture intérieure et extérieure.',
        detail: 'Travaux de peinture intérieure et extérieure avec des produits de qualité professionnelle. Enduits, crépis, peintures décoratives, traitements anti-humidité et hydrofuges. Finitions lisses ou texturées selon vos goûts.',
      },
      logistique: {
        title: 'Approvisionnement & logistique',
        desc: 'Gestion des matériaux et livraisons.',
        detail: 'Service complet d\'approvisionnement et logistique pour vos chantiers : commande des matériaux, suivi des livraisons, stockage et distribution sur site. Optimisation des coûts et des délais.',
      },
    };

    document.querySelectorAll('.service-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('[data-service]');
        if (!card) return;
        const service = card.dataset.service;
        const info = serviceDetails[service];
        if (!info) return;
        title.textContent = info.title;
        desc.textContent = info.desc;
        details.textContent = info.detail;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    close?.addEventListener('click', closeModal);
    back?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  // ---- Scroll Animations ----
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll, .stagger-children');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
  }

  // ---- Newsletter ----
  function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    const status = document.getElementById('newsletter-status');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('[name="newsletter-email"]')?.value?.trim();
      if (!email) return;
      if (status) {
        status.textContent = translations[currentLang]?.newsletter_success || translations.fr.newsletter_success;
      }
      form.reset();
      setTimeout(() => {
        if (status) status.textContent = '';
      }, 5000);
    });
  }

  // ---- Cookie Consent ----
  function initCookieConsent() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    if (localStorage.getItem('cookie-consent')) return;

    setTimeout(() => {
      banner.classList.add('visible');
    }, 500);

    document.getElementById('cookie-accept')?.addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'accepted');
      banner.classList.remove('visible');
    });

    document.getElementById('cookie-decline')?.addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'declined');
      banner.classList.remove('visible');
    });
  }

  // ---- Scroll to Top ----
  function initScrollToTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Booking Form (Rendez-vous) ----
  function initBooking() {
    const bookingForm = document.getElementById('booking-form');
    const bookingStatus = document.getElementById('booking-status');
    if (!bookingForm) return;

    // Set min date to today
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fm = bookingForm;
      const name = (fm.querySelector('[name="name"]')?.value || '').trim();
      const email = (fm.querySelector('[name="email"]')?.value || '').trim();
      const phone = (fm.querySelector('[name="phone"]')?.value || '').trim();
      const location = (fm.querySelector('[name="location"]')?.value || '').trim();
      const type = (fm.querySelector('[name="type"]')?.value || '').trim();
      const date = (fm.querySelector('[name="date"]')?.value || '').trim();
      const time = (fm.querySelector('[name="time"]')?.value || '').trim();
      const projectType = (fm.querySelector('[name="project-type"]')?.value || '').trim();
      const message = (fm.querySelector('[name="message"]')?.value || '').trim();

      if (!name || !email || !phone || !location || !type || !date || !time) {
        if (bookingStatus) {
          bookingStatus.textContent = translations[currentLang]?.booking_error || translations.fr.booking_error;
          bookingStatus.className = 'booking-form-status error';
        }
        return;
      }

      // Build email body
      const typeLabels = {
        'site-visit': translations[currentLang]?.booking_type_site || 'Visite de chantier',
        'quote': translations[currentLang]?.booking_type_quote || 'Demande de devis',
        'showroom': translations[currentLang]?.booking_type_showroom || 'Visite showroom',
        'meeting': translations[currentLang]?.booking_type_meeting || 'Réunion de projet',
      };

      let body = `=== NOUVELLE DEMANDE DE RENDEZ-VOUS ===%0D%0A%0D%0A`;
      body += `Nom: ${name}%0D%0A`;
      body += `Email: ${email}%0D%0A`;
      body += `Téléphone: ${phone}%0D%0A`;
      body += `Localisation: ${location}%0D%0A`;
      body += `Type: ${typeLabels[type] || type}%0D%0A`;
      body += `Date: ${date}%0D%0A`;
      body += `Créneau: ${time}%0D%0A`;
      if (projectType) body += `Type de projet: ${projectType}%0D%0A`;
      if (message) body += `%0D%0AMessage: ${encodeURIComponent(message)}%0D%0A`;

      const subject = `Rendez-vous: ${name} - ${typeLabels[type] || type} - ${date}`;
      const mailto = `mailto:imperialbuilding20@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href = mailto;

      if (bookingStatus) {
        bookingStatus.textContent = translations[currentLang]?.booking_success || translations.fr.booking_success;
        bookingStatus.className = 'booking-form-status success';
      }
      setTimeout(() => {
        if (bookingStatus) {
          bookingStatus.textContent = '';
          bookingStatus.className = 'booking-form-status';
        }
      }, 8000);
    });

    if (bookingStatus) {
      bookingStatus.setAttribute('role', 'status');
      bookingStatus.setAttribute('aria-live', 'polite');
    }
  }

  // ---- PWA Service Worker Registration ----
  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(err => {
        console.warn('SW registration failed:', err);
      });
    }
  }

  // ---- Initialize Everything ----
  function init() {
    initCounters();
    initTestimonials();
    initFAQ();
    initLightbox();
    initGalleryFilters();
    initServiceModal();
    initScrollAnimations();
    initNewsletter();
    initCookieConsent();
    initScrollToTop();
    initBooking();
    registerSW();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();