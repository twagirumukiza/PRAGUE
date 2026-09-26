/* ================================================================
   PRAGUE — JAVASCRIPT (V4)
   Organisation rapide :
   1. En-tête fixe (hauteur dynamique)
   2. Menu mobile
   3. Thème clair/sombre
   4. Taille du texte
   5. Langues (FR / EN / ES) — traduction complète du site
   6. Timeline / navigation
   7. Carte Leaflet + itinéraire (7 étapes)
   8. Galeries plein écran (vignettes, carrousel, zoom, pincer, double-clic)
   9. FAQ rétractable
   ================================================================ */

(() => {
  const body = document.body;

  // ===== 1. EN-TÊTE FIXE : calcule sa hauteur réelle =====
  const headerEl = document.querySelector('.header');
  function syncHeaderHeight() {
    if (headerEl) {
      document.documentElement.style.setProperty('--header-h', headerEl.offsetHeight + 'px');
    }
  }
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight);
  window.addEventListener('load', syncHeaderHeight);

  // ===== 2. MENU MOBILE =====
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');

  burger?.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  // ===== 3. THÈME =====
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const savedTheme = localStorage.getItem('prague-theme') || 'light';
  body.classList.toggle('theme-light', savedTheme === 'light');

  function refreshThemeIcon() {
    if (themeIcon) themeIcon.textContent = body.classList.contains('theme-light') ? '☀' : '☾';
  }
  refreshThemeIcon();

  themeToggle?.addEventListener('click', () => {
    body.classList.toggle('theme-light');
    localStorage.setItem('prague-theme', body.classList.contains('theme-light') ? 'light' : 'dark');
    refreshThemeIcon();
  });

  // ===== 4. TAILLE DU TEXTE =====
  let fontSize = Number(localStorage.getItem('prague-font-size') || 16);
  const applyFont = () => {
    fontSize = Math.max(14, Math.min(20, fontSize));
    document.documentElement.style.setProperty('--font-base', fontSize + 'px');
    localStorage.setItem('prague-font-size', fontSize);
  };
  applyFont();

  document.getElementById('font-minus')?.addEventListener('click', () => { fontSize--; applyFont(); });
  document.getElementById('font-plus')?.addEventListener('click', () => { fontSize++; applyFont(); });

  // ===== 5. LANGUES (FR / EN / ES) =====
  const translations = {
    fr: {
      "nav.home": "Accueil", "nav.map": "Carte", "nav.itinerary": "Itinéraire",
      "nav.stories": "Récits", "nav.faq": "FAQ", "nav.about": "À propos",
      "mobile.map": "Carte interactive", "mobile.itinerary": "Itinéraire",
      "mobile.stagesTitle": "Étapes du voyage",
      "label.01": "Vieille Ville", "label.02": "Horloge astronomique",
      "label.03": "Pont Charles", "label.04": "Golem &amp; Josefov",
      "label.05": "Château de Prague", "label.06": "Cimetière juif",
      "label.07": "Prague en mouvement",
      "hero.subtitle": "CARNET DE VOYAGE · PRAGUE",
      "hero.title": "Un week-end<br>à Prague",
      "hero.desc": "Des pavés de la Vieille Ville au Château, en passant par le Pont Charles, Josefov et la légende du Golem — sans oublier ce qui se passe sous les pavés.",
      "hero.cta": "Explorer la carte",
      "map.title": "Carte interactive",
      "map.desc": "Cliquez sur un lieu pour accéder directement au récit correspondant.",
      "map.meta.count": "● 7 lieux", "map.meta.itinerary": "→ itinéraire photo", "map.meta.interactive": "⌁ carte interactive",
      "map.hint": "Cliquez sur un point • zoom + / − • glissez pour vous déplacer",
      "map.panel.kicker": "PRAGUE · WEEK-END", "map.panel.title": "Les 7 étapes",
      "itinerary.title": "Le week-end en un coup d’œil",
      "itinerary.stat.etapes": "étapes", "itinerary.stat.photos": "photos", "itinerary.stat.ville": "ville",
      "timeline.01.desc": "Pavés, façades pastel et Maison municipale.",
      "timeline.02.desc": "L’Orloj et la tour de l’ancien Hôtel de Ville.",
      "timeline.03.desc": "Charles IV, le Calvaire et les statues baroques.",
      "timeline.04.desc": "La grande légende de Prague et le quartier juif.",
      "timeline.05.desc": "Porte Matthias, cathédrale Saint-Guy et panorama.",
      "timeline.06.desc": "Le cimetière juif et la mémoire du quartier.",
      "timeline.07.desc": "Sous les pavés : le métro et son escalator.",
      "stories.title": "Récits du voyage",
      "story.01.title": "Les rues de la Vieille Ville",
      "story.01.p1": "Dès les premiers pas, Prague vous avale. Pavés irréguliers, façades pastel, enseignes en fer forgé… On se croirait dans un décor de film.",
      "story.01.img1": "La Maison municipale (Obecní dům)<br>Ce joyau Art nouveau sur Náměstí Republiky marque l’entrée dans la Vieille Ville, juste à côté de la Tour poudrière.",
      "story.01.img2": "La Tour poudrière (Prašná brána)<br>L’une des treize anciennes portes de la ville, ancien dépôt de poudre à canon, qui ouvre le passage vers la Vieille Ville.",
      "story.01.img3": "Rue Celetná<br>L’une des plus anciennes rues de Prague, sur l’axe royal qui relie la Tour poudrière à la Place de la Vieille Ville.",
      "story.01.img4": "Façades de la Place de la Vieille Ville<br>Chaque maison a son style et sa couleur : un patchwork architectural accumulé sur plusieurs siècles.",
      "story.01.img5": "Place de la Vieille Ville (Staroměstské náměstí)<br>Au centre, le monument à Jan Hus, réformateur religieux tchèque brûlé en 1415, veille sur la place depuis 1915.",
      "story.01.img6": "Maison à sgraffites, à deux pas de l’Hôtel de Ville<br>Ce type de façade grattée en motifs géométriques est une signature du centre historique ; l’identification précise de cette maison reste à confirmer.",
      "story.01.p2": "C’est ici que le voyage commence vraiment. Le bruit des valises sur les pavés, les conversations en dix langues, l’odeur du trdelník…",
      "story.01.note.label": "Anecdote :",
      "story.01.note.text": "le monument à Jan Hus fut inauguré le 6 juillet 1915, jour exact du 500ᵉ anniversaire de son exécution sur le bûcher — un symbole fort en pleine Première Guerre mondiale, quand le nationalisme tchèque cherchait ses figures.",
      "story.01.tip": "Conseil : venez tôt le matin pour photographier la Maison municipale et la Tour poudrière sans la foule — la lumière rasante sublime les détails Art nouveau.",
      "story.01.gallery.invite": "La Vieille Ville ne s’arrête pas à ces trois arrêts : ruelles cachées, façades peintes et détails oubliés attendent dans l’album complet.",
      "story.01.gallery.title": "Voir les photos de la Vieille Ville", "story.01.gallery.count": "6 photos",
      "story.02.title": "L’Horloge astronomique",
      "story.02.p1": "La Place de la Vieille Ville est le théâtre permanent de Prague. Au pied de la tour de l’ancien Hôtel de Ville, l’Orloj continue de fasciner les foules chaque heure.",
      "story.02.img1": "La tour de l’ancien Hôtel de Ville<br>Vue depuis la Place de la Vieille Ville, avec l’horloge astronomique encastrée dans sa façade sud.",
      "story.02.img2": "Au pied de l’Orloj<br>Chaque heure pile, la foule s’arrête pour voir défiler les apôtres aux fenêtres de l’horloge.",
      "story.02.img3": "La tour, en contre-plongée<br>171 marches mènent à la galerie panoramique, tout en haut.",
      "story.02.img4": "Le cadran astronomique<br>Installé en 1410, c’est la plus ancienne horloge astronomique encore en fonctionnement au monde.",
      "story.02.note.label": "Anecdote :",
      "story.02.note.text": "La légende raconte que le maître horloger Hanuš fut aveuglé pour qu’il ne puisse jamais reproduire une horloge aussi parfaite ailleurs.",
      "story.02.tip": "Arrivez 10 minutes avant l’heure pile pour voir les apôtres défiler, et prenez du recul : de près, on ne voit que la foule.",
      "story.02.gallery.invite": "Envie de voir le mécanisme sous tous les angles, jusqu’en haut de la tour ? L’album complet de l’Horloge astronomique vous attend.",
      "story.02.gallery.title": "Voir les photos de l’Horloge", "story.02.gallery.count": "4 photos",
      "story.03.title": "Le Pont Charles et ses alentours",
      "story.03.p1": "Traverser le Pont Charles, c’est marcher sur 650 ans d’histoire. Construit sous Charles IV à partir de 1357, il relie la Vieille Ville à Malá Strana au-dessus de la Vltava.",
      "story.03.img1": "La tour du Pont Charles côté Vieille Ville<br>Considérée comme l’une des plus belles tours-portes gothiques civiles d’Europe, elle marque l’entrée du pont.",
      "story.03.img2": "Charles IV devant le Pont Charles<br>La statue néogothique de Charles IV, sur Křižovnické náměstí, à quelques mètres seulement de l’entrée du pont qui porte son nom.",
      "story.03.img3": "Le Calvaire du Pont Charles<br>Le célèbre crucifix du Pont Charles, entouré de son inscription hébraïque ajoutée en 1696, encadré par les statues de la Vierge et de saint Jean.",
      "story.03.img4": "Sur le pont, au-dessus de la Vltava<br>Trente statues et groupes sculptés jalonnent le parcours, entre ciel et rivière.",
      "story.03.img5": "Musiciens sur le Pont Charles<br>Un petit groupe de jazz installé face à la Vltava — la bande-son improvisée de toutes les traversées.",
      "story.03.img6": "Le chevalier Bruncvík<br>Cette statue veille sur la rive, épée levée : elle représente le héros légendaire tchèque Bruncvík et son épée magique, cachée dit-on sous le pont.",
      "story.03.img7": "Deux des statues du pont<br>Parmi les trente statues baroques qui bordent le parcours, chacune raconte sa propre légende ou son propre saint patron.",
      "story.03.img8": "Un groupe sculpté du pont<br>La Vltava et les collines de Prague en toile de fond, derrière l’une des nombreuses compositions baroques du parcours.",
      "story.03.img9": "Le pont vu d’en haut<br>Une perspective plongeante qui révèle toute la longueur du pont et le flot ininterrompu de visiteurs qui le traversent.",
      "story.03.img10": "Prague et ses ponts<br>Le Pont Charles n’est que l’un des nombreux ponts qui enjambent la Vltava au fil de la ville.",
      "story.03.img11": "Les tours du pont, de nuit<br>Côté Malá Strana, les deux tours gothiques prennent une allure différente une fois la nuit tombée et le pont déserté.",
      "story.03.img12": "Silhouettes sous le ciel changeant<br>Le temps de Prague varie vite, et les statues du pont prennent une allure différente à chaque éclaircie.",
      "story.03.img13": "En arrière-plan, le dôme de Malá Strana<br>Les statues du pont se détachent devant les coupoles et les toits du quartier de Malá Strana.",
      "story.03.img14": "Un groupe d’anges sculptés<br>Encore une des nombreuses compositions religieuses qui font du pont une véritable galerie de sculpture baroque à ciel ouvert.",
      "story.03.img15": "Le pont dans son ensemble<br>Vu depuis la rive, le Pont Charles déploie toute son architecture de pierre au-dessus de la Vltava.",
      "story.03.img16": "Les arches du pont<br>Seize arches de pierre soutiennent le tablier du pont depuis plus de six siècles.",
      "story.03.note.label": "Histoire des statues :",
      "story.03.note.text": "Les 30 statues et groupes sculptés du pont, pour la plupart baroques, forment une véritable galerie en plein air.",
      "story.03.tip": "Venez au lever du soleil : le pont est presque vide, et la lumière sur les tours est incomparable.",
      "story.03.gallery.invite": "Trente statues, autant d’histoires : le reste de la galerie du Pont Charles vous emmène statue par statue, jusqu’aux rives de la Vltava.",
      "story.03.gallery.title": "Voir les photos du Pont Charles", "story.03.gallery.count": "16 photos",
      "story.04.title": "Le Golem &amp; le quartier de Josefov",
      "story.04.p1": "Créé au XVIe siècle par le Rabbi Loew pour protéger la communauté juive, le Golem — cette créature d’argile — reste la légende la plus célèbre de Prague.",
      "story.04.img1": "La Synagogue Vieille-Nouvelle (Staronová synagoga)<br>La plus ancienne synagogue active d’Europe encore en fonctionnement. La légende veut que le Golem repose encore dans son grenier.",
      "story.04.img2": "La statue du Golem<br>Silhouette encapuchonnée et sans visage, dressée dans les rues de Josefov en hommage à la légende.",
      "story.04.img3": "Dans les rues de Josefov<br>Le quartier juif historique, entre synagogues, maisons bourgeoises et souvenirs de la légende.",
      "story.04.img4": "Souvenir du Golem<br>Une petite figurine en terre cuite, glaise trapue et visage à peine esquissé — la version de poche de la légende, telle qu’on la trouve dans les échoppes de Josefov.",
      "story.04.p2": "Le Rabbi plaçait un shem — un parchemin sacré — dans la bouche du Golem pour lui donner vie, puis le retirait pour l’endormir. Certains disent qu’il repose encore là-haut, sous le toit de la Vieille-Nouvelle Synagogue.",
      "story.04.note.label": "Anecdote :",
      "story.04.note.text": "la légende a connu un regain de popularité après la parution du roman « Le Golem » de Gustav Meyrink en 1915, qui l’a durablement ancrée dans l’imaginaire pragois.",
      "story.04.tip": "Conseil : la Synagogue Vieille-Nouvelle ne se visite qu’avec un billet combiné du quartier juif — réservez tôt le matin pour éviter les groupes.",
      "story.04.gallery.invite": "La légende continue dans les ruelles de Josefov : direction l’album complet du Golem et du quartier juif.",
      "story.04.gallery.title": "Voir les photos du Golem &amp; Josefov", "story.04.gallery.count": "4 photos",
      "story.05.title": "Le Château &amp; la cathédrale Saint-Guy",
      "story.05.p1": "Monter vers le Château est un rite de passage. La Voie Royale traverse Malá Strana avant d’atteindre le plus grand complexe de château ancien au monde.",
      "story.05.img1": "La Porte Matthias (Matyášova brána)<br>Premier grand portail baroque de l’histoire d’Europe centrale, il marque l’entrée officielle du complexe du Château.",
      "story.05.img2": "Cathédrale Saint-Guy — la façade<br>Commencée en 1344, achevée seulement en 1929 : près de six siècles de chantier gothique.",
      "story.05.img3": "La nef de la cathédrale Saint-Guy<br>Une immense nef gothique, tombeau des rois et reines de Bohême.",
      "story.05.img4": "Un vitrail de la cathédrale<br>La lumière traverse les vitraux colorés et projette ses couleurs sur les pierres claires.",
      "story.05.img5": "Vue depuis les hauteurs du Château<br>Les toits rouges de Prague à perte de vue, avec la Vltava qui serpente en contrebas.",
      "story.05.img6": "Première apparition de la cathédrale<br>Depuis l’une des cours du complexe, une arche cadre soudain les flèches de Saint-Guy — l’un des passages les plus photographiés du Château.",
      "story.05.img7": "Dentelle de pierre<br>Un gros plan sur les flèches et pinacles gothiques, sculptés avec une précision presque obsessionnelle.",
      "story.05.img8": "La cathédrale sous un ciel changeant<br>À Prague, la météo peut basculer en quelques minutes — de quoi transformer complètement l’ambiance d’une même façade.",
      "story.05.img9": "La troisième cour<br>Un obélisque de granit, érigé en 1928 en mémoire des soldats tchécoslovaques de la Première Guerre mondiale, se dresse face à la cathédrale.",
      "story.05.img10": "Malá Strana vue d’en haut<br>Les toits rouges du « Petit Côté » et le dôme vert de l’église Saint-Nicolas, avec Prague qui s’étend à l’horizon.",
      "story.05.img11": "Une colonne mariale, tours du Château en fond<br>Ce type de monument commémoratif, fréquent en Europe centrale, se retrouve un peu partout dans le paysage urbain de Prague.",
      "story.05.img12": "Le Palais archiépiscopal<br>Sur la place du Château, cette façade rococo blanche tranche avec la pierre sombre de la cathédrale qui se dresse juste derrière.",
      "story.05.img13": "Le Château, vu depuis la Vltava<br>Depuis les quais, la silhouette du Château domine toute la rive, avec ses flèches qui percent la ligne des toits.",
      "story.05.note.label": "Jardins et points de vue :",
      "story.05.note.text": "les hauteurs du Château et Hradčany offrent plusieurs perspectives sur les toits de Prague et la Vltava.",
      "story.05.tip": "Conseil : la cathédrale est accessible gratuitement depuis le narthex, mais il faut un billet du complexe du Château pour accéder à la nef et grimper à la tour sud.",
      "story.05.gallery.invite": "Cours intérieures, flèches gothiques, intérieur et panoramas : la suite de la visite du Château tient dans l’album complet.",
      "story.05.gallery.title": "Voir les photos du Château", "story.05.gallery.count": "13 photos",
      "story.06.title": "Le cimetière juif — Josefov",
      "story.06.p1": "J’y suis allé. La plupart des photos de ce lieu ont disparu ; il n’en reste heureusement que deux, mais elles suffisent à retrouver l’atmosphère. Plus de 12 000 pierres tombales, certaines du XVe siècle, empilées les unes sur les autres faute de place. Tombe du Rabbi Loew, figure centrale de la légende du Golem.",
      "story.06.img1": "Les pierres serrées les unes contre les autres<br>Faute de place, les tombes ont été empilées sur plusieurs niveaux au fil des siècles — jusqu’à douze couches par endroits.",
      "story.06.img2": "Une autre partie du cimetière, en automne<br>Les feuilles mortes et la pente du terrain donnent à ce coin du cimetière une atmosphère plus sauvage encore.",
      "story.06.note.label": "Anecdote :",
      "story.06.note.text": "certaines tombes portent des symboles gravés indiquant le nom ou le métier du défunt — mains jointes pour un Cohen, cruche pour un Lévite, ciseaux pour un tailleur.",
      "story.06.tip": "Couverture pour les épaules demandée. Respectez le silence du lieu.",
      "story.06.gallery.invite": "Ces deux photos n’en disent qu’une partie : le reste se découvre dans l’album du cimetière.",
      "story.06.gallery.title": "Voir les photos du cimetière", "story.06.gallery.count": "2 photos",
      "story.07.p1": "Prague, ce n’est pas seulement des monuments : c’est aussi l’expérience du voyage elle-même. Sous les pavés de la Vieille Ville, le métro pragois offre une autre façon de découvrir la ville.",
      "story.07.img1": "Sous les rues de Prague<br>Descente dans le métro pragois, à la station Staroměstská : un long escalator incurvé, très profond, à l’architecture caractéristique.",
      "story.07.img2": "Une rame vers Depo Hostivař<br>Ce terminus de la ligne A, ouvert en 2006, a été installé dans un ancien dépôt : les derniers mètres de la ligne y sont aériens. La rame elle-même, un modèle 81-71M, est une version modernisée d’un matériel soviétique retiré du service en 2009.",
      "story.07.img3": "Station Muzeum, ligne A<br>Point de jonction des lignes A et C sous la place Venceslas, reconnaissable à son revêtement d’aluminium ocre et rouille. Le terminus « Nemocnice Motol » affiché ici marque l’extrémité ouest de la ligne A, ouverte en 2015.",
      "story.07.img4": "Couloir de la ligne B<br>Le plan affiché ici montre le trajet complet de la ligne B, de Zličín à Černý Most — la plus longue des trois lignes, ouverte en 1985 puis étendue à son tracé actuel en 1998.",
      "story.07.img5": "Un couloir aux tons verts<br>Ce revêtement d’aluminium à alvéoles vertes évoque la station Malostranská, sur la ligne A — un vert que certains associent aux jardins royaux voisins, sans certitude absolue.",
      "story.07.img6": "La signalétique de Muzeum<br>Ici, la station est identifiable avec certitude : le rouge de la ligne C et le vert de la ligne A se croisent sous la place Venceslas.",
      "story.07.img7": "Aluminium à hémisphères<br>Signature esthétique des stations de la ligne A construites entre 1973 et 1978 : chaque station affiche sa propre couleur, reconnaissable d’un simple coup d’œil depuis la rame.",
      "story.07.img8": "Un escalator sans fin<br>Station non identifiée avec certitude, mais bien pragoise : les affiches en tchèque le confirment. Les stations profondes du réseau sont réputées pour leurs escalators interminables, certains dépassant 80 mètres.",
      "story.07.p2": "Ce détour par le métro rappelle que le charme de Prague ne se limite pas à ses monuments : il se niche aussi dans ces instants plus ordinaires du voyage.",
      "story.07.note.label": "Anecdote :",
      "story.07.note.text": "avec ses 53 mètres de profondeur, la station Náměstí Míru détient le record du métro pragois — construite assez profond pour servir, si besoin, d’abri antiatomique.",
      "story.07.tip": "Conseil : un simple ticket de 30 ou 90 minutes suffit à combiner métro, tram et bus dans toute la ville — inutile d’acheter un billet par trajet.",
      "story.07.gallery.invite": "Rames, stations et escalators sans fin : le reste de l’histoire se trouve dans l’album Prague en mouvement.",
      "story.07.gallery.title": "Voir les photos", "story.07.gallery.count": "8 photos",
      "faq.title": "FAQ — Voyager à Prague",
      "faq.q1": "Quelle monnaie utiliser ?", "faq.a1": "La couronne tchèque (CZK). Les euros sont rarement acceptés ou proposés à un mauvais taux. Une carte Visa/Mastercard sans frais et un peu de cash sont pratiques.",
      "faq.q2": "Prague est-elle sûre ?", "faq.a2": "La ville est globalement très sûre. Comme dans toute zone touristique, attention aux pickpockets et aux taxis non officiels.",
      "faq.q3": "Y a-t-il du racisme ou de la xénophobie ?", "faq.a3": "Le récit d’origine mentionne des expériences rapportées par certains voyageurs noirs, arabes ou asiatiques : regards insistants, refus d’entrée dans certains bars ou contrôles plus fréquents. Ce n’est pas systématique.",
      "faq.q4": "Les bars : lesquels éviter / lesquels aimer ?", "faq.a4": "Le récit conseille d’éviter les bars ultra-touristiques autour de la Place de la Vieille Ville et de regarder plutôt du côté des beer gardens de Letná ou Riegrovy sady, ainsi que Vinohrady et Žižkov.",
      "faq.q5": "Quel aéroport et comment rejoindre le centre ?", "faq.a5": "Aéroport Václav Havel (PRG). Le récit indique le bus 119 puis le métro Nádraží Veleslavín, pour environ 40–60 minutes.",
      "faq.q6": "Quel budget ?", "faq.a6": "Le récit indique un budget moyen de 60–100 € par jour, avec bière locale autour de 1,5–3 €, repas 8–15 € et attractions 10–20 €.",
      "faq.q7": "Transports et commodités ?", "faq.a7": "Excellent réseau métro/tram/bus. Eau du robinet potable, Wi-Fi largement disponible et toilettes publiques souvent payantes.",
      "faq.q8": "Meilleure période pour visiter ?", "faq.a8": "Le récit recommande avril–juin et septembre–octobre. L’hiver est associé aux marchés de Noël, tandis que juillet–août correspond à la haute saison.",
      "about.title": "Pour un week-end parfait",
      "about.sat": "<strong>Samedi :</strong> Vieille Ville → Horloge → Pont Charles → Malá Strana → Château au coucher du soleil.",
      "about.sun": "<strong>Dimanche :</strong> Lever de soleil sur le pont → Quartier juif → métro et dernière balade → départ.",
      "about.signature": "Prague ne se visite pas. Elle se ressent.",
      "about.credit": "Un carnet de voyage par twagirumukiza.",
      "footer.note": "© 2026 twagirumukiza — Photos personnelles. Toute reproduction interdite sans autorisation.",
      "gv.hint": "← → naviguer · molette ou pincer pour zoomer · double-clic · Échap pour fermer",
      "gv.zoomOut": "Zoom arrière", "gv.zoomIn": "Zoom avant", "gv.fit": "Ajuster", "gv.close": "Fermer",
      "a11y.fontMinus": "Diminuer", "a11y.fontPlus": "Augmenter", "a11y.theme": "Thème", "a11y.menu": "Menu"
    },
    en: {
      "nav.home": "Home", "nav.map": "Map", "nav.itinerary": "Itinerary",
      "nav.stories": "Stories", "nav.faq": "FAQ", "nav.about": "About",
      "mobile.map": "Interactive map", "mobile.itinerary": "Itinerary",
      "mobile.stagesTitle": "Trip stages",
      "label.01": "Old Town", "label.02": "Astronomical Clock",
      "label.03": "Charles Bridge", "label.04": "Golem &amp; Josefov",
      "label.05": "Prague Castle", "label.06": "Jewish Cemetery",
      "label.07": "Prague on the move",
      "hero.subtitle": "TRAVEL JOURNAL · PRAGUE",
      "hero.title": "A weekend<br>in Prague",
      "hero.desc": "From the cobblestones of the Old Town to the Castle, by way of Charles Bridge, Josefov and the legend of the Golem — without forgetting what happens beneath the cobblestones.",
      "hero.cta": "Explore the map",
      "map.title": "Interactive map",
      "map.desc": "Click a place to jump straight to its story.",
      "map.meta.count": "● 7 places", "map.meta.itinerary": "→ photo itinerary", "map.meta.interactive": "⌁ interactive map",
      "map.hint": "Click a point • zoom +/− • drag to move around",
      "map.panel.kicker": "PRAGUE · WEEKEND", "map.panel.title": "The 7 stages",
      "itinerary.title": "The weekend at a glance",
      "itinerary.stat.etapes": "stages", "itinerary.stat.photos": "photos", "itinerary.stat.ville": "city",
      "timeline.01.desc": "Cobblestones, pastel façades and the Municipal House.",
      "timeline.02.desc": "The Orloj and the tower of the old Town Hall.",
      "timeline.03.desc": "Charles IV, the Calvary and the baroque statues.",
      "timeline.04.desc": "Prague’s great legend and the Jewish quarter.",
      "timeline.05.desc": "Matthias Gate, St Vitus Cathedral and the view.",
      "timeline.06.desc": "The Jewish cemetery and the quarter’s memory.",
      "timeline.07.desc": "Beneath the cobblestones: the metro and its escalator.",
      "stories.title": "Stories from the trip",
      "story.01.title": "The streets of the Old Town",
      "story.01.p1": "From the very first steps, Prague swallows you whole. Uneven cobblestones, pastel façades, wrought-iron signs… it feels like a film set.",
      "story.01.img1": "The Municipal House (Obecní dům)<br>This Art Nouveau jewel on Náměstí Republiky marks the entrance to the Old Town, right next to the Powder Tower.",
      "story.01.img2": "The Powder Tower (Prašná brána)<br>One of the city’s thirteen former gates, once a gunpowder store, opening the way into the Old Town.",
      "story.01.img3": "Celetná Street<br>One of Prague’s oldest streets, on the royal route linking the Powder Tower to the Old Town Square.",
      "story.01.img4": "Façades of the Old Town Square<br>Every house has its own style and colour: an architectural patchwork built up over centuries.",
      "story.01.img5": "Old Town Square (Staroměstské náměstí)<br>At its centre, the monument to Jan Hus, the Czech religious reformer burned at the stake in 1415, has watched over the square since 1915.",
      "story.01.img6": "Sgraffito house, steps from the Town Hall<br>This scratched geometric-pattern façade is a signature of the historic centre; the exact identity of this house is still to be confirmed.",
      "story.01.p2": "This is where the trip truly begins. The rattle of suitcases on cobblestones, conversations in ten languages, the smell of trdelník…",
      "story.01.note.label": "Fun fact:",
      "story.01.note.text": "the Jan Hus monument was unveiled on 6 July 1915, the exact 500th anniversary of his execution at the stake — a powerful symbol in the midst of the First World War, as Czech nationalism sought out its figures.",
      "story.01.tip": "Tip: come early in the morning to photograph the Municipal House and the Powder Tower without the crowds — the low light brings out the Art Nouveau detail beautifully.",
      "story.01.gallery.invite": "The Old Town doesn’t stop at these three stops: hidden alleys, painted façades and overlooked details are waiting in the full album.",
      "story.01.gallery.title": "See the Old Town photos", "story.01.gallery.count": "6 photos",
      "story.02.title": "The Astronomical Clock",
      "story.02.p1": "The Old Town Square is Prague’s permanent stage. At the foot of the old Town Hall tower, the Orloj still draws crowds every hour.",
      "story.02.img1": "The old Town Hall tower<br>Seen from the Old Town Square, with the astronomical clock set into its south façade.",
      "story.02.img2": "At the foot of the Orloj<br>On the hour, every hour, the crowd stops to watch the apostles parade past the clock’s windows.",
      "story.02.img3": "The tower, from below<br>171 steps lead up to the panoramic gallery at the top.",
      "story.02.img4": "The astronomical dial<br>Installed in 1410, it is the oldest astronomical clock still working anywhere in the world.",
      "story.02.note.label": "Fun fact:",
      "story.02.note.text": "Legend has it that master clockmaker Hanuš was blinded so he could never build such a perfect clock anywhere else.",
      "story.02.tip": "Arrive 10 minutes before the hour to watch the apostles parade, and stand well back — up close, all you see is the crowd.",
      "story.02.gallery.invite": "Want to see the mechanism from every angle, all the way up the tower? The full Astronomical Clock album is waiting.",
      "story.02.gallery.title": "See the Clock photos", "story.02.gallery.count": "4 photos",
      "story.03.title": "Charles Bridge and its surroundings",
      "story.03.p1": "Crossing Charles Bridge means walking over 650 years of history. Built under Charles IV from 1357, it links the Old Town to Malá Strana above the Vltava.",
      "story.03.img1": "The Old Town Bridge Tower<br>Considered one of Europe’s finest civil Gothic gate towers, it marks the entrance to the bridge.",
      "story.03.img2": "Charles IV in front of Charles Bridge<br>The neo-Gothic statue of Charles IV, on Křižovnické náměstí, just metres from the entrance to the bridge that bears his name.",
      "story.03.img3": "The Calvary of Charles Bridge<br>The famous crucifix of Charles Bridge, surrounded by its Hebrew inscription added in 1696, flanked by the statues of the Virgin and St John.",
      "story.03.img4": "On the bridge, above the Vltava<br>Thirty statues and sculpted groups line the way, between sky and river.",
      "story.03.img5": "Musicians on Charles Bridge<br>A small jazz band set up facing the Vltava — the improvised soundtrack to every crossing.",
      "story.03.img6": "The Bruncvík Knight<br>This statue keeps watch over the riverbank, sword raised: it depicts the legendary Czech hero Bruncvík and his magic sword, said to be hidden beneath the bridge.",
      "story.03.img7": "Two of the bridge’s statues<br>Among the thirty baroque statues lining the crossing, each tells its own legend or honours its own patron saint.",
      "story.03.img8": "A sculpted group on the bridge<br>The Vltava and Prague’s hills form the backdrop behind one of the many baroque compositions along the way.",
      "story.03.img9": "The bridge from above<br>A bird’s-eye view revealing the bridge’s full length and the steady stream of visitors crossing it.",
      "story.03.img10": "Prague and its bridges<br>Charles Bridge is just one of the many bridges spanning the Vltava as it winds through the city.",
      "story.03.img11": "The bridge towers, at night<br>On the Malá Strana side, the two Gothic towers take on a different character once night falls and the bridge empties out.",
      "story.03.img12": "Silhouettes under a shifting sky<br>Prague’s weather changes fast, giving the bridge’s statues a different mood with every break in the clouds.",
      "story.03.img13": "The dome of Malá Strana in the background<br>The bridge’s statues stand out against the domes and rooftops of the Malá Strana district.",
      "story.03.img14": "A sculpted group of angels<br>Another of the many religious compositions that turn the bridge into a genuine open-air baroque sculpture gallery.",
      "story.03.img15": "The bridge as a whole<br>Seen from the riverbank, Charles Bridge unfolds its full stone architecture above the Vltava.",
      "story.03.img16": "The bridge’s arches<br>Sixteen stone arches have supported the bridge’s deck for more than six centuries.",
      "story.03.note.label": "About the statues:",
      "story.03.note.text": "The bridge’s 30 statues and sculpted groups, mostly baroque, form a genuine open-air gallery.",
      "story.03.tip": "Come at sunrise: the bridge is almost empty, and the light on the towers is incomparable.",
      "story.03.gallery.invite": "Thirty statues, thirty stories: the rest of the Charles Bridge gallery takes you statue by statue, all the way to the banks of the Vltava.",
      "story.03.gallery.title": "See the Charles Bridge photos", "story.03.gallery.count": "16 photos",
      "story.04.title": "The Golem &amp; the Josefov quarter",
      "story.04.p1": "Created in the 16th century by Rabbi Loew to protect the Jewish community, the Golem — this creature of clay — remains Prague’s most famous legend.",
      "story.04.img1": "The Old-New Synagogue (Staronová synagoga)<br>Europe’s oldest still-active synagogue. Legend has it the Golem still rests in its attic.",
      "story.04.img2": "The Golem statue<br>A hooded, faceless silhouette standing in the streets of Josefov in tribute to the legend.",
      "story.04.img3": "In the streets of Josefov<br>The historic Jewish quarter, amid synagogues, bourgeois houses and reminders of the legend.",
      "story.04.img4": "A Golem souvenir<br>A small terracotta figurine, stout clay with a barely sketched face — the pocket-sized version of the legend, as found in the shops of Josefov.",
      "story.04.p2": "The Rabbi would place a shem — a sacred parchment — in the Golem’s mouth to bring it to life, then remove it to put it to sleep. Some say it still rests up there, beneath the roof of the Old-New Synagogue.",
      "story.04.note.label": "Fun fact:",
      "story.04.note.text": "the legend saw a surge in popularity after the publication of Gustav Meyrink’s novel ‘The Golem’ in 1915, which cemented it firmly in Prague’s imagination.",
      "story.04.tip": "Tip: the Old-New Synagogue can only be visited with a combined Jewish Quarter ticket — book for early morning to avoid the tour groups.",
      "story.04.gallery.invite": "The legend continues through the alleys of Josefov: head to the full Golem & Josefov album.",
      "story.04.gallery.title": "See the Golem &amp; Josefov photos", "story.04.gallery.count": "4 photos",
      "story.05.title": "The Castle &amp; St Vitus Cathedral",
      "story.05.p1": "Climbing up to the Castle is a rite of passage. The Royal Route crosses Malá Strana before reaching the largest ancient castle complex in the world.",
      "story.05.img1": "Matthias Gate (Matyášova brána)<br>Central Europe’s first great baroque portal, marking the official entrance to the Castle complex.",
      "story.05.img2": "St Vitus Cathedral — the façade<br>Begun in 1344, finished only in 1929: nearly six centuries of Gothic building work.",
      "story.05.img3": "The nave of St Vitus Cathedral<br>A vast Gothic nave, resting place of the kings and queens of Bohemia.",
      "story.05.img4": "A stained-glass window in the cathedral<br>Light passes through the coloured glass and casts its hues across the pale stone.",
      "story.05.img5": "The view from the Castle heights<br>Prague’s red rooftops as far as the eye can see, with the Vltava winding below.",
      "story.05.img6": "First glimpse of the cathedral<br>From one of the complex’s courtyards, an archway suddenly frames St Vitus’s spires — one of the Castle’s most photographed views.",
      "story.05.img7": "Stone lace<br>A close-up on the Gothic spires and pinnacles, carved with almost obsessive precision.",
      "story.05.img8": "The cathedral under a dramatic sky<br>Prague’s weather can flip in minutes — enough to completely transform the mood of the same façade.",
      "story.05.img9": "The Third Courtyard<br>A granite obelisk, erected in 1928 in memory of Czechoslovak soldiers of the First World War, stands facing the cathedral.",
      "story.05.img10": "Malá Strana from above<br>The red rooftops of the ‘Lesser Town’ and the green dome of St Nicholas Church, with Prague stretching to the horizon.",
      "story.05.img11": "A Marian column, Castle towers behind<br>This kind of memorial monument, common across Central Europe, appears throughout Prague’s urban landscape.",
      "story.05.img12": "The Archbishop’s Palace<br>On Castle Square, this white rococo façade contrasts with the dark stone of the cathedral rising just behind it.",
      "story.05.img13": "The Castle, seen from the Vltava<br>From the embankments, the Castle’s silhouette dominates the riverbank, its spires piercing the skyline.",
      "story.05.note.label": "Gardens and viewpoints:",
      "story.05.note.text": "the Castle heights and Hradčany offer several viewpoints over Prague’s rooftops and the Vltava.",
      "story.05.tip": "Tip: the cathedral is free to enter from the narthex, but you need a Castle complex ticket to reach the nave and climb the south tower.",
      "story.05.gallery.invite": "Courtyards, Gothic spires, the interior and the panoramas: the rest of the Castle visit is in the full album.",
      "story.05.gallery.title": "See the Castle photos", "story.05.gallery.count": "13 photos",
      "story.06.title": "The Jewish Cemetery — Josefov",
      "story.06.p1": "I went there. Most of the photos from this place are gone; luckily two remain, but they’re enough to capture the atmosphere. Over 12,000 gravestones, some dating from the 15th century, stacked on top of one another for lack of space. The grave of Rabbi Loew, the central figure of the Golem legend.",
      "story.06.img1": "Stones packed tightly together<br>For lack of space, graves were stacked in several layers over the centuries — up to twelve layers in places.",
      "story.06.img2": "Another part of the cemetery, in autumn<br>The fallen leaves and sloping ground give this corner of the cemetery an even wilder atmosphere.",
      "story.06.note.label": "Fun fact:",
      "story.06.note.text": "some gravestones bear carved symbols indicating the deceased’s name or trade — joined hands for a Cohen, a jug for a Levite, scissors for a tailor.",
      "story.06.tip": "Shoulder covering required. Please respect the silence of the place.",
      "story.06.gallery.invite": "These two photos only tell part of it: the rest is in the cemetery album.",
      "story.06.gallery.title": "See the cemetery photos", "story.06.gallery.count": "2 photos",
      "story.07.p1": "Prague isn’t just monuments: it’s also the travel experience itself. Beneath the cobblestones of the Old Town, the Prague metro offers another way to discover the city.",
      "story.07.img1": "Beneath the streets of Prague<br>Descending into the Prague metro at Staroměstská station: a long, deep, curved escalator with distinctive architecture.",
      "story.07.img2": "A train to Depo Hostivař<br>This Line A terminus, opened in 2006, was built inside a former depot: the line’s final metres run above ground here. The train itself, an 81-71M model, is a modernised version of Soviet-built rolling stock retired from service in 2009.",
      "story.07.img3": "Muzeum station, Line A<br>The junction of lines A and C beneath Wenceslas Square, recognisable by its ochre and rust aluminium cladding. The ‘Nemocnice Motol’ terminus shown here marks the western end of Line A, opened in 2015.",
      "story.07.img4": "Line B corridor<br>The map shown here traces the full route of Line B, from Zličín to Černý Most — the longest of the three lines, opened in 1985 and extended to its current route in 1998.",
      "story.07.img5": "A corridor in shades of green<br>This green honeycomb aluminium cladding evokes Malostranská station, on Line A — a green some associate with the nearby royal gardens, though without certainty.",
      "story.07.img6": "Muzeum’s signage<br>Here the station can be identified with certainty: the red of Line C and the green of Line A cross beneath Wenceslas Square.",
      "story.07.img7": "Hemisphere aluminium panels<br>The signature look of Line A stations built between 1973 and 1978: each station has its own colour, recognisable at a glance from the train window.",
      "story.07.img8": "An endless escalator<br>The station can’t be identified with certainty, but it’s unmistakably Prague — the Czech-language posters confirm it. The network’s deep stations are known for their endless escalators, some over 80 metres long.",
      "story.07.p2": "This detour through the metro is a reminder that Prague’s charm isn’t limited to its monuments: it also lives in these more ordinary travel moments.",
      "story.07.note.label": "Fun fact:",
      "story.07.note.text": "at 53 metres deep, Náměstí Míru station holds the record for Prague’s metro — built deep enough to double as a nuclear shelter if needed.",
      "story.07.tip": "Tip: a single 30- or 90-minute ticket covers metro, tram and bus across the whole city — no need to buy one per ride.",
      "story.07.gallery.invite": "Trains, stations and endless escalators: the rest of the story is in the Prague on the move album.",
      "story.07.gallery.title": "See the photos", "story.07.gallery.count": "8 photos",
      "faq.title": "FAQ — Travelling to Prague",
      "faq.q1": "What currency should I use?", "faq.a1": "The Czech koruna (CZK). Euros are rarely accepted, or only at a poor rate. A fee-free Visa/Mastercard plus a little cash works well.",
      "faq.q2": "Is Prague safe?", "faq.a2": "The city is overall very safe. As in any tourist area, watch out for pickpockets and unofficial taxis.",
      "faq.q3": "Is there racism or xenophobia?", "faq.a3": "The original account mentions experiences reported by some Black, Arab or Asian travellers: insistent stares, being turned away from certain bars, or more frequent checks. It isn’t systematic.",
      "faq.q4": "Bars: which to avoid / which to enjoy?", "faq.a4": "The account advises avoiding the ultra-touristy bars around the Old Town Square, and looking instead at the beer gardens of Letná or Riegrovy sady, as well as Vinohrady and Žižkov.",
      "faq.q5": "Which airport, and how to reach downtown?", "faq.a5": "Václav Havel Airport (PRG). The account suggests bus 119 then the metro from Nádraží Veleslavín, roughly 40–60 minutes.",
      "faq.q6": "What budget?", "faq.a6": "The account suggests an average budget of €60–100 per day, with local beer around €1.5–3, meals €8–15 and attractions €10–20.",
      "faq.q7": "Transport and amenities?", "faq.a7": "Excellent metro/tram/bus network. Tap water is safe to drink, Wi-Fi is widely available, and public toilets are often paid.",
      "faq.q8": "Best time to visit?", "faq.a8": "The account recommends April–June and September–October. Winter is associated with the Christmas markets, while July–August is high season.",
      "about.title": "For a perfect weekend",
      "about.sat": "<strong>Saturday:</strong> Old Town → Astronomical Clock → Charles Bridge → Malá Strana → Castle at sunset.",
      "about.sun": "<strong>Sunday:</strong> Sunrise on the bridge → Jewish quarter → metro and one last stroll → departure.",
      "about.signature": "Prague isn’t visited. It’s felt.",
      "about.credit": "A travel journal by twagirumukiza.",
      "footer.note": "© 2026 twagirumukiza — Personal photos. All reproduction prohibited without permission.",
      "gv.hint": "← → navigate · scroll or pinch to zoom · double-click · Esc to close",
      "gv.zoomOut": "Zoom out", "gv.zoomIn": "Zoom in", "gv.fit": "Fit to screen", "gv.close": "Close",
      "a11y.fontMinus": "Decrease", "a11y.fontPlus": "Increase", "a11y.theme": "Theme", "a11y.menu": "Menu"
    },
    es: {
      "nav.home": "Inicio", "nav.map": "Mapa", "nav.itinerary": "Itinerario",
      "nav.stories": "Relatos", "nav.faq": "FAQ", "nav.about": "Acerca de",
      "mobile.map": "Mapa interactivo", "mobile.itinerary": "Itinerario",
      "mobile.stagesTitle": "Etapas del viaje",
      "label.01": "Ciudad Vieja", "label.02": "Reloj astronómico",
      "label.03": "Puente de Carlos", "label.04": "Golem y Josefov",
      "label.05": "Castillo de Praga", "label.06": "Cementerio judío",
      "label.07": "Praga en movimiento",
      "hero.subtitle": "DIARIO DE VIAJE · PRAGA",
      "hero.title": "Un fin de semana<br>en Praga",
      "hero.desc": "De los adoquines de la Ciudad Vieja al Castillo, pasando por el Puente de Carlos, Josefov y la leyenda del Golem — sin olvidar lo que ocurre bajo los adoquines.",
      "hero.cta": "Explorar el mapa",
      "map.title": "Mapa interactivo",
      "map.desc": "Haz clic en un lugar para ir directamente al relato correspondiente.",
      "map.meta.count": "● 7 lugares", "map.meta.itinerary": "→ itinerario fotográfico", "map.meta.interactive": "⌁ mapa interactivo",
      "map.hint": "Haz clic en un punto • zoom +/− • arrastra para desplazarte",
      "map.panel.kicker": "PRAGA · FIN DE SEMANA", "map.panel.title": "Las 7 etapas",
      "itinerary.title": "El fin de semana de un vistazo",
      "itinerary.stat.etapes": "etapas", "itinerary.stat.photos": "fotos", "itinerary.stat.ville": "ciudad",
      "timeline.01.desc": "Adoquines, fachadas pastel y la Casa Municipal.",
      "timeline.02.desc": "El Orloj y la torre del antiguo Ayuntamiento.",
      "timeline.03.desc": "Carlos IV, el Calvario y las estatuas barrocas.",
      "timeline.04.desc": "La gran leyenda de Praga y el barrio judío.",
      "timeline.05.desc": "Puerta de Matías, catedral de San Vito y panorama.",
      "timeline.06.desc": "El cementerio judío y la memoria del barrio.",
      "timeline.07.desc": "Bajo los adoquines: el metro y su escalera mecánica.",
      "stories.title": "Relatos del viaje",
      "story.01.title": "Las calles de la Ciudad Vieja",
      "story.01.p1": "Desde los primeros pasos, Praga te envuelve. Adoquines irregulares, fachadas pastel, letreros de hierro forjado… parece el decorado de una película.",
      "story.01.img1": "La Casa Municipal (Obecní dům)<br>Esta joya del Art Nouveau en Náměstí Republiky marca la entrada a la Ciudad Vieja, justo al lado de la Torre de la Pólvora.",
      "story.01.img2": "La Torre de la Pólvora (Prašná brána)<br>Una de las trece antiguas puertas de la ciudad, antiguo depósito de pólvora, que abre el paso a la Ciudad Vieja.",
      "story.01.img3": "Calle Celetná<br>Una de las calles más antiguas de Praga, en el eje real que une la Torre de la Pólvora con la Plaza de la Ciudad Vieja.",
      "story.01.img4": "Fachadas de la Plaza de la Ciudad Vieja<br>Cada casa tiene su propio estilo y color: un mosaico arquitectónico acumulado durante siglos.",
      "story.01.img5": "Plaza de la Ciudad Vieja (Staroměstské náměstí)<br>En el centro, el monumento a Jan Hus, reformador religioso checo quemado en la hoguera en 1415, vigila la plaza desde 1915.",
      "story.01.img6": "Casa de esgrafiados, a pasos del Ayuntamiento<br>Este tipo de fachada rayada con motivos geométricos es una seña de identidad del centro histórico; la identificación exacta de esta casa aún está por confirmar.",
      "story.01.p2": "Aquí es donde el viaje realmente comienza. El ruido de las maletas sobre los adoquines, conversaciones en diez idiomas, el olor a trdelník…",
      "story.01.note.label": "Anécdota:",
      "story.01.note.text": "el monumento a Jan Hus se inauguró el 6 de julio de 1915, justo en el 500.º aniversario de su ejecución en la hoguera — un símbolo potente en plena Primera Guerra Mundial, cuando el nacionalismo checo buscaba sus figuras.",
      "story.01.tip": "Consejo: ven temprano por la mañana para fotografiar la Casa Municipal y la Torre de la Pólvora sin multitudes — la luz rasante realza el detalle Art Nouveau.",
      "story.01.gallery.invite": "La Ciudad Vieja no termina en estas tres paradas: callejones ocultos, fachadas pintadas y detalles olvidados esperan en el álbum completo.",
      "story.01.gallery.title": "Ver las fotos de la Ciudad Vieja", "story.01.gallery.count": "6 fotos",
      "story.02.title": "El Reloj Astronómico",
      "story.02.p1": "La Plaza de la Ciudad Vieja es el escenario permanente de Praga. Al pie de la torre del antiguo Ayuntamiento, el Orloj sigue fascinando a las multitudes cada hora.",
      "story.02.img1": "La torre del antiguo Ayuntamiento<br>Vista desde la Plaza de la Ciudad Vieja, con el reloj astronómico incrustado en su fachada sur.",
      "story.02.img2": "Al pie del Orloj<br>Cada hora en punto, la multitud se detiene para ver desfilar a los apóstoles por las ventanas del reloj.",
      "story.02.img3": "La torre, en contrapicado<br>171 escalones conducen a la galería panorámica, en lo más alto.",
      "story.02.img4": "La esfera astronómica<br>Instalada en 1410, es el reloj astronómico en funcionamiento más antiguo del mundo.",
      "story.02.note.label": "Anécdota:",
      "story.02.note.text": "Cuenta la leyenda que el maestro relojero Hanuš fue cegado para que nunca pudiera construir un reloj tan perfecto en ningún otro lugar.",
      "story.02.tip": "Llega 10 minutos antes de la hora en punto para ver desfilar a los apóstoles, y retrocede: de cerca solo se ve a la multitud.",
      "story.02.gallery.invite": "¿Quieres ver el mecanismo desde todos los ángulos, hasta lo alto de la torre? El álbum completo del Reloj Astronómico te espera.",
      "story.02.gallery.title": "Ver las fotos del Reloj", "story.02.gallery.count": "4 fotos",
      "story.03.title": "El Puente de Carlos y sus alrededores",
      "story.03.p1": "Cruzar el Puente de Carlos es caminar sobre 650 años de historia. Construido bajo Carlos IV a partir de 1357, une la Ciudad Vieja con Malá Strana sobre el Vltava.",
      "story.03.img1": "La torre del Puente de Carlos, lado Ciudad Vieja<br>Considerada una de las más bellas torres-puerta góticas civiles de Europa, marca la entrada al puente.",
      "story.03.img2": "Carlos IV frente al Puente de Carlos<br>La estatua neogótica de Carlos IV, en Křižovnické náměstí, a solo unos metros de la entrada del puente que lleva su nombre.",
      "story.03.img3": "El Calvario del Puente de Carlos<br>El célebre crucifijo del Puente de Carlos, rodeado de su inscripción hebrea añadida en 1696, flanqueado por las estatuas de la Virgen y san Juan.",
      "story.03.img4": "En el puente, sobre el Vltava<br>Treinta estatuas y grupos escultóricos jalonan el recorrido, entre el cielo y el río.",
      "story.03.img5": "Músicos en el Puente de Carlos<br>Un pequeño grupo de jazz instalado frente al Vltava — la banda sonora improvisada de cada travesía.",
      "story.03.img6": "El caballero Bruncvík<br>Esta estatua vigila la orilla, espada en alto: representa al héroe legendario checo Bruncvík y su espada mágica, dicen que escondida bajo el puente.",
      "story.03.img7": "Dos de las estatuas del puente<br>Entre las treinta estatuas barrocas que bordean el recorrido, cada una cuenta su propia leyenda o representa a su propio santo patrón.",
      "story.03.img8": "Un grupo escultórico del puente<br>El Vltava y las colinas de Praga de fondo, tras una de las numerosas composiciones barrocas del recorrido.",
      "story.03.img9": "El puente visto desde arriba<br>Una perspectiva cenital que revela toda la longitud del puente y el flujo constante de visitantes que lo cruzan.",
      "story.03.img10": "Praga y sus puentes<br>El Puente de Carlos es solo uno de los numerosos puentes que cruzan el Vltava a su paso por la ciudad.",
      "story.03.img11": "Las torres del puente, de noche<br>Del lado de Malá Strana, las dos torres góticas adquieren un aspecto distinto cuando cae la noche y el puente se vacía.",
      "story.03.img12": "Siluetas bajo un cielo cambiante<br>El clima de Praga cambia rápido, y las estatuas del puente adquieren un aspecto distinto con cada claro entre las nubes.",
      "story.03.img13": "Al fondo, la cúpula de Malá Strana<br>Las estatuas del puente se recortan frente a las cúpulas y los tejados del barrio de Malá Strana.",
      "story.03.img14": "Un grupo de ángeles esculpidos<br>Otra de las numerosas composiciones religiosas que convierten el puente en una auténtica galería de escultura barroca al aire libre.",
      "story.03.img15": "El puente en su conjunto<br>Visto desde la orilla, el Puente de Carlos despliega toda su arquitectura de piedra sobre el Vltava.",
      "story.03.img16": "Los arcos del puente<br>Dieciséis arcos de piedra sostienen el tablero del puente desde hace más de seis siglos.",
      "story.03.note.label": "Sobre las estatuas:",
      "story.03.note.text": "Las 30 estatuas y grupos escultóricos del puente, en su mayoría barrocos, forman una auténtica galería al aire libre.",
      "story.03.tip": "Ven al amanecer: el puente está casi vacío y la luz sobre las torres es incomparable.",
      "story.03.gallery.invite": "Treinta estatuas, treinta historias: el resto de la galería del Puente de Carlos te lleva estatua por estatua, hasta las orillas del Vltava.",
      "story.03.gallery.title": "Ver las fotos del Puente de Carlos", "story.03.gallery.count": "16 fotos",
      "story.04.title": "El Golem y el barrio de Josefov",
      "story.04.p1": "Creado en el siglo XVI por el rabino Loew para proteger a la comunidad judía, el Golem —esa criatura de arcilla— sigue siendo la leyenda más famosa de Praga.",
      "story.04.img1": "La Sinagoga Vieja-Nueva (Staronová synagoga)<br>La sinagoga activa más antigua de Europa. Cuenta la leyenda que el Golem todavía descansa en su desván.",
      "story.04.img2": "La estatua del Golem<br>Silueta encapuchada y sin rostro, erguida en las calles de Josefov en homenaje a la leyenda.",
      "story.04.img3": "Por las calles de Josefov<br>El barrio judío histórico, entre sinagogas, casas burguesas y recuerdos de la leyenda.",
      "story.04.img4": "Recuerdo del Golem<br>Una pequeña figurita de terracota, arcilla rechoncha y rostro apenas esbozado — la versión de bolsillo de la leyenda, tal como se encuentra en las tiendas de Josefov.",
      "story.04.p2": "El rabino colocaba un shem —un pergamino sagrado— en la boca del Golem para darle vida, y luego lo retiraba para dormirlo. Algunos dicen que todavía descansa allá arriba, bajo el tejado de la Sinagoga Vieja-Nueva.",
      "story.04.note.label": "Anécdota:",
      "story.04.note.text": "la leyenda vivió un renovado auge tras la publicación de la novela «El Golem» de Gustav Meyrink en 1915, que la arraigó firmemente en el imaginario praguense.",
      "story.04.tip": "Consejo: la Sinagoga Vieja-Nueva solo se visita con una entrada combinada del barrio judío — resérvala a primera hora para evitar los grupos.",
      "story.04.gallery.invite": "La leyenda continúa por las callejuelas de Josefov: dirígete al álbum completo del Golem y el barrio judío.",
      "story.04.gallery.title": "Ver las fotos del Golem y Josefov", "story.04.gallery.count": "4 fotos",
      "story.05.title": "El Castillo y la catedral de San Vito",
      "story.05.p1": "Subir hacia el Castillo es un rito de paso. La Vía Real atraviesa Malá Strana antes de llegar al complejo de castillo antiguo más grande del mundo.",
      "story.05.img1": "La Puerta de Matías (Matyášova brána)<br>Primer gran portal barroco de la historia de Europa Central, marca la entrada oficial al complejo del Castillo.",
      "story.05.img2": "Catedral de San Vito — la fachada<br>Iniciada en 1344, terminada solo en 1929: casi seis siglos de obras góticas.",
      "story.05.img3": "La nave de la catedral de San Vito<br>Una inmensa nave gótica, sepultura de los reyes y reinas de Bohemia.",
      "story.05.img4": "Una vidriera de la catedral<br>La luz atraviesa los vitrales de colores y proyecta sus tonos sobre la piedra clara.",
      "story.05.img5": "Vista desde las alturas del Castillo<br>Los tejados rojos de Praga hasta donde alcanza la vista, con el Vltava serpenteando abajo.",
      "story.05.img6": "Primera aparición de la catedral<br>Desde uno de los patios del complejo, un arco enmarca de pronto las agujas de San Vito — una de las vistas más fotografiadas del Castillo.",
      "story.05.img7": "Encaje de piedra<br>Un primer plano de las agujas y pináculos góticos, esculpidos con una precisión casi obsesiva.",
      "story.05.img8": "La catedral bajo un cielo dramático<br>El clima de Praga puede cambiar en minutos, lo suficiente para transformar por completo el ambiente de una misma fachada.",
      "story.05.img9": "El tercer patio<br>Un obelisco de granito, erigido en 1928 en memoria de los soldados checoslovacos de la Primera Guerra Mundial, se alza frente a la catedral.",
      "story.05.img10": "Malá Strana desde arriba<br>Los tejados rojos del «Barrio Pequeño» y la cúpula verde de la iglesia de San Nicolás, con Praga extendiéndose hasta el horizonte.",
      "story.05.img11": "Una columna mariana, con las torres del Castillo al fondo<br>Este tipo de monumento conmemorativo, frecuente en Europa Central, aparece por toda la trama urbana de Praga.",
      "story.05.img12": "El Palacio Arzobispal<br>En la plaza del Castillo, esta fachada rococó blanca contrasta con la piedra oscura de la catedral que se alza justo detrás.",
      "story.05.img13": "El Castillo, visto desde el Vltava<br>Desde los muelles, la silueta del Castillo domina toda la orilla, con sus agujas perforando el perfil de los tejados.",
      "story.05.note.label": "Jardines y miradores:",
      "story.05.note.text": "las alturas del Castillo y Hradčany ofrecen varias perspectivas sobre los tejados de Praga y el Vltava.",
      "story.05.tip": "Consejo: la catedral se puede visitar gratis desde el nártex, pero se necesita una entrada del complejo del Castillo para acceder a la nave y subir a la torre sur.",
      "story.05.gallery.invite": "Patios interiores, agujas góticas, el interior y los panoramas: el resto de la visita al Castillo está en el álbum completo.",
      "story.05.gallery.title": "Ver las fotos del Castillo", "story.05.gallery.count": "13 fotos",
      "story.06.title": "El cementerio judío — Josefov",
      "story.06.p1": "Estuve allí. La mayoría de las fotos de este lugar se han perdido; afortunadamente quedan dos, pero bastan para recuperar el ambiente. Más de 12.000 lápidas, algunas del siglo XV, apiladas unas sobre otras por falta de espacio. La tumba del rabino Loew, figura central de la leyenda del Golem.",
      "story.06.img1": "Las piedras apretadas unas contra otras<br>Por falta de espacio, las tumbas se apilaron en varios niveles a lo largo de los siglos — hasta doce capas en algunos puntos.",
      "story.06.img2": "Otra parte del cementerio, en otoño<br>Las hojas caídas y la pendiente del terreno dan a este rincón del cementerio una atmósfera aún más salvaje.",
      "story.06.note.label": "Anécdota:",
      "story.06.note.text": "algunas lápidas llevan símbolos grabados que indican el nombre o el oficio del difunto — manos juntas para un Cohen, una jarra para un Levita, tijeras para un sastre.",
      "story.06.tip": "Se requiere cubrirse los hombros. Respeta el silencio del lugar.",
      "story.06.gallery.invite": "Estas dos fotos solo cuentan una parte: el resto se descubre en el álbum del cementerio.",
      "story.06.gallery.title": "Ver las fotos del cementerio", "story.06.gallery.count": "2 fotos",
      "story.07.p1": "Praga no son solo monumentos: también es la experiencia misma del viaje. Bajo los adoquines de la Ciudad Vieja, el metro praguense ofrece otra forma de descubrir la ciudad.",
      "story.07.img1": "Bajo las calles de Praga<br>Descenso al metro praguense, en la estación Staroměstská: una larga escalera mecánica curva, muy profunda, de arquitectura característica.",
      "story.07.img2": "Un tren hacia Depo Hostivař<br>Esta terminal de la línea A, inaugurada en 2006, se instaló en un antiguo depósito: los últimos metros de la línea son aquí elevados. El propio tren, un modelo 81-71M, es una versión modernizada de material soviético retirado del servicio en 2009.",
      "story.07.img3": "Estación Muzeum, línea A<br>El punto de conexión de las líneas A y C bajo la plaza de Wenceslao, reconocible por su revestimiento de aluminio ocre y óxido. La terminal «Nemocnice Motol» que aparece aquí marca el extremo occidental de la línea A, inaugurada en 2015.",
      "story.07.img4": "Pasillo de la línea B<br>El plano que se muestra aquí traza el recorrido completo de la línea B, de Zličín a Černý Most — la más larga de las tres líneas, inaugurada en 1985 y ampliada a su trazado actual en 1998.",
      "story.07.img5": "Un pasillo en tonos verdes<br>Este revestimiento de aluminio con paneles verdes evoca la estación de Malostranská, en la línea A — un verde que algunos asocian con los jardines reales cercanos, sin certeza absoluta.",
      "story.07.img6": "La señalización de Muzeum<br>Aquí la estación se identifica con certeza: el rojo de la línea C y el verde de la línea A se cruzan bajo la plaza de Wenceslao.",
      "story.07.img7": "Aluminio con paneles semiesféricos<br>El sello estético de las estaciones de la línea A construidas entre 1973 y 1978: cada estación luce su propio color, reconocible de un vistazo desde el tren.",
      "story.07.img8": "Una escalera mecánica interminable<br>La estación no se puede identificar con certeza, pero es inconfundiblemente praguense: los carteles en checo lo confirman. Las estaciones profundas de la red son conocidas por sus interminables escaleras mecánicas, algunas de más de 80 metros.",
      "story.07.p2": "Este desvío por el metro recuerda que el encanto de Praga no se limita a sus monumentos: también se esconde en esos instantes más ordinarios del viaje.",
      "story.07.note.label": "Anécdota:",
      "story.07.note.text": "con 53 metros de profundidad, la estación Náměstí Míru ostenta el récord del metro praguense — construida lo bastante profunda como para servir, si hiciera falta, de refugio antiatómico.",
      "story.07.tip": "Consejo: un simple billete de 30 o 90 minutos permite combinar metro, tranvía y autobús por toda la ciudad — no hace falta comprar uno por trayecto.",
      "story.07.gallery.invite": "Trenes, estaciones y escaleras mecánicas interminables: el resto de la historia está en el álbum Praga en movimiento.",
      "story.07.gallery.title": "Ver las fotos", "story.07.gallery.count": "8 fotos",
      "faq.title": "FAQ — Viajar a Praga",
      "faq.q1": "¿Qué moneda usar?", "faq.a1": "La corona checa (CZK). Los euros rara vez se aceptan, o se ofrecen a un tipo de cambio desfavorable. Una tarjeta Visa/Mastercard sin comisiones y algo de efectivo son prácticos.",
      "faq.q2": "¿Es segura Praga?", "faq.a2": "La ciudad es, en general, muy segura. Como en cualquier zona turística, cuidado con los carteristas y los taxis no oficiales.",
      "faq.q3": "¿Hay racismo o xenofobia?", "faq.a3": "El relato original menciona experiencias reportadas por algunos viajeros negros, árabes o asiáticos: miradas insistentes, negativas de entrada en algunos bares o controles más frecuentes. No es sistemático.",
      "faq.q4": "Bares: ¿cuáles evitar y cuáles disfrutar?", "faq.a4": "El relato aconseja evitar los bares ultra-turísticos alrededor de la Plaza de la Ciudad Vieja y mirar más bien hacia los jardines de cerveza de Letná o Riegrovy sady, así como Vinohrady y Žižkov.",
      "faq.q5": "¿Qué aeropuerto y cómo llegar al centro?", "faq.a5": "Aeropuerto Václav Havel (PRG). El relato indica el autobús 119 y luego el metro en Nádraží Veleslavín, unos 40–60 minutos.",
      "faq.q6": "¿Qué presupuesto?", "faq.a6": "El relato indica un presupuesto medio de 60–100 € al día, con cerveza local alrededor de 1,5–3 €, comidas 8–15 € y atracciones 10–20 €.",
      "faq.q7": "¿Transporte y comodidades?", "faq.a7": "Excelente red de metro/tranvía/autobús. El agua del grifo es potable, el Wi-Fi está ampliamente disponible y los baños públicos suelen ser de pago.",
      "faq.q8": "¿Mejor época para visitar?", "faq.a8": "El relato recomienda abril–junio y septiembre–octubre. El invierno se asocia con los mercados navideños, mientras que julio–agosto corresponde a la temporada alta.",
      "about.title": "Para un fin de semana perfecto",
      "about.sat": "<strong>Sábado:</strong> Ciudad Vieja → Reloj Astronómico → Puente de Carlos → Malá Strana → Castillo al atardecer.",
      "about.sun": "<strong>Domingo:</strong> Amanecer en el puente → Barrio judío → metro y último paseo → salida.",
      "about.signature": "Praga no se visita. Se siente.",
      "about.credit": "Un diario de viaje de twagirumukiza.",
      "footer.note": "© 2026 twagirumukiza — Fotos personales. Prohibida su reproducción sin autorización.",
      "gv.hint": "← → navegar · rueda o pellizco para hacer zoom · doble clic · Esc para cerrar",
      "gv.zoomOut": "Alejar", "gv.zoomIn": "Acercar", "gv.fit": "Ajustar", "gv.close": "Cerrar",
      "a11y.fontMinus": "Reducir", "a11y.fontPlus": "Aumentar", "a11y.theme": "Tema", "a11y.menu": "Menú"
    }
  };

  function applyLanguage(lang) {
    if (!translations[lang]) lang = 'fr';
    const dict = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (dict[key] !== undefined) {
        el.setAttribute('aria-label', dict[key]);
        if (el.hasAttribute('title')) el.setAttribute('title', dict[key]);
      }
    });

    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    localStorage.setItem('prague-lang', lang);
    updateGvHint();
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });

  // Applique la langue mémorisée (ou le français par défaut) dès le chargement
  applyLanguage(localStorage.getItem('prague-lang') || 'fr');

  // ===== 6. TIMELINE =====
  document.querySelectorAll('.timeline-item[data-target]').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelector(item.dataset.target)?.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // ===== 7. CARTE INTERACTIVE — 7 ÉTAPES =====
  // Isolée dans un try/catch : si Leaflet ou la tuile OSM échoue à charger,
  // le reste du script (galeries, FAQ...) continue de fonctionner normalement.
  try {
    const map = L.map('leaflet-map', {
      center: [50.0885, 14.4160],
      zoom: 14,
      scrollWheelZoom: true,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const places = [
      { lat:50.0865, lng:14.4278, title:'01 · Vieille Ville', anchor:'#vieille-ville' },
      { lat:50.0870, lng:14.4207, title:'02 · Horloge astronomique', anchor:'#horloge' },
      { lat:50.0865, lng:14.4114, title:'03 · Pont Charles', anchor:'#pont' },
      { lat:50.0904, lng:14.4174, title:'04 · Golem / Josefov', anchor:'#golem' },
      { lat:50.0909, lng:14.4006, title:'05 · Château de Prague', anchor:'#chateau' },
      { lat:50.0902, lng:14.4170, title:'06 · Cimetière juif', anchor:'#cimetiere' },
      { lat:50.0885, lng:14.4173, title:'07 · Prague en mouvement', anchor:'#mouvement' }
    ];

    const route = places.map(p => [p.lat,p.lng]);
    L.polyline(route, {className:'prague-route-line'}).addTo(map);

    let activePlace = -1;
    const markers = [];

    function activatePlace(i, scroll = true) {
      activePlace = i;
      document.querySelectorAll('.route-list button').forEach((b,n) => b.classList.toggle('active', n === i));
      markers.forEach((m,n) => {
        const el = m.getElement();
        if (el) el.classList.toggle('active', n === i);
      });
      if (scroll) {
        document.querySelector(places[i].anchor)?.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }

    places.forEach((p, i) => {
      const icon = L.divIcon({
        className:'prague-marker',
        html:`<span><b>${String(i+1).padStart(2,'0')}</b></span>`,
        iconSize:[34,34],
        iconAnchor:[17,17]
      });

      const marker = L.marker([p.lat,p.lng], {icon})
        .addTo(map)
        .bindPopup(`<strong>${p.title}</strong><br><a href="${p.anchor}">→</a>`)
        .on('click', () => activatePlace(i));

      markers.push(marker);
    });

    document.querySelectorAll('.route-list button').forEach((btn,i) => {
      btn.addEventListener('click', () => {
        activatePlace(i);
        map.flyTo([places[i].lat,places[i].lng], 16, {duration:.8});
        markers[i].openPopup();
      });
    });
  } catch (err) {
    console.error('Carte interactive : erreur d’initialisation', err);
  }

  // ===== 8. GALERIES PLEIN ÉCRAN =====
  const galleries = {
    'vieille-ville': [
      'prague-images/vieille-ville-01-maison-municipale.jpg',
      'prague-images/vieille-ville-02-tour-poudriere.jpg',
      'prague-images/vieille-ville-03-rue-celetna.jpg',
      'prague-images/vieille-ville-04-facades.jpg',
      'prague-images/vieille-ville-05-place-jan-hus.jpg',
      'prague-images/vieille-ville-06-maison-sgraffites.jpg'
    ],
    'horloge': [
      'prague-images/horloge-04-cadran-orloj.jpg',
      'prague-images/horloge-01-tour-hotel-ville.jpg',
      'prague-images/horloge-02-devant-horloge.jpg',
      'prague-images/horloge-03-tour-rapprochee.jpg'
    ],
    'pont': [
      'prague-images/pont-03-calvaire-crucifix.jpg',
      'prague-images/pont-01-tour-vieille-ville.jpg',
      'prague-images/pont-02-statue-charles-iv.jpg',
      'prague-images/pont-04-vue-vltava.jpg',
      'prague-images/pont-05-musiciens.jpg',
      'prague-images/pont-06-statue-chevalier-bruncvik.jpg',
      'prague-images/pont-07-statues-saintes-ciel-bleu.jpg',
      'prague-images/pont-08-groupe-statues-vert.jpg',
      'prague-images/pont-09-vue-aerienne-pont.jpg',
      'prague-images/pont-10-panorama-vltava-ponts.jpg',
      'prague-images/pont-11-tour-mala-strana-nuit.jpg',
      'prague-images/pont-12-statues-ciel-nuageux.jpg',
      'prague-images/pont-13-statues-dome-mala-strana.jpg',
      'prague-images/pont-14-groupe-statues-anges.jpg',
      'prague-images/pont-15-vue-large-vltava.jpg',
      'prague-images/pont-16-arches-pont-vltava.jpg'
    ],
    'golem': [
      'prague-images/golem-02-statue-golem.jpg',
      'prague-images/golem-04-figurine.jpg',
      'prague-images/golem-01-synagogue-vieille-nouvelle.jpg',
      'prague-images/golem-03-rue-josefov.jpg'
    ],
    'chateau': [
      'prague-images/chateau-02-cathedrale-facade.jpg',
      'prague-images/chateau-01-porte-matthias.jpg',
      'prague-images/chateau-03-cathedrale-interieur.jpg',
      'prague-images/chateau-04-vitrail.jpg',
      'prague-images/chateau-05-vue-panoramique.jpg',
      'prague-images/chateau-06-arche-cour.jpg',
      'prague-images/chateau-07-fleche-detail.jpg',
      'prague-images/chateau-08-facade-ciel.jpg',
      'prague-images/chateau-09-obelisque-cour.jpg',
      'prague-images/chateau-10-toits-mala-strana.jpg',
      'prague-images/chateau-11-colonne-mariale.jpg',
      'prague-images/chateau-12-palais-archeveque.jpg',
      'prague-images/chateau-13-silhouette-vltava.jpg'
    ],
    'cimetiere': [
      'prague-images/cimetiere-01-pierres-ete.jpg',
      'prague-images/cimetiere-02-colline-automne.jpg'
    ],
    'mouvement': [
      'prague-images/mouvement-01-metro-staromestska.jpg',
      'prague-images/mouvement-02-rame-depo-hostivar.jpg',
      'prague-images/mouvement-03-muzeum-rame-motol.jpg',
      'prague-images/mouvement-04-couloir-ligne-b.jpg',
      'prague-images/mouvement-05-passage-plan-dpp.jpg',
      'prague-images/mouvement-06-signaletique-muzeum.jpg',
      'prague-images/mouvement-07-mur-alu-hemispheres.jpg',
      'prague-images/mouvement-08-escalator-argentique.jpg'
    ]
  };

  const viewer = document.getElementById('gallery-viewer');
  const stage = document.getElementById('gv-stage');
  const img = document.getElementById('gv-img');
  const indexEl = document.getElementById('gv-index');
  const totalEl = document.getElementById('gv-total');
  const thumbsEl = document.getElementById('gv-thumbs');
  const zoomLevelEl = document.getElementById('gv-zoom-level');
  const gvHintEl = document.querySelector('.gv-hint');
  let current = [];
  let index = 0;
  let zoom = 1;
  let panX = 0, panY = 0;

  function toThumb(src) {
    return src.replace('prague-images/', 'prague-images/thumbs/');
  }

  function updateGvHint() {
    // Ré-applique la traduction du texte d'aide si la visionneuse est déjà ouverte
    if (!gvHintEl) return;
    const lang = localStorage.getItem('prague-lang') || 'fr';
    const dict = translations[lang] || translations.fr;
    if (dict['gv.hint']) gvHintEl.innerHTML = dict['gv.hint'];
  }

  function applyTransform() {
    img.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
    if (zoomLevelEl) zoomLevelEl.textContent = '×' + zoom.toFixed(1);
  }

  function fitImage() {
    zoom = 1;
    panX = 0; panY = 0;
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.width = 'auto';
    img.style.height = 'auto';
    applyTransform();
  }

  function setZoom(z) {
    zoom = Math.max(1, Math.min(4, z));
    if (zoom > 1) {
      img.style.maxWidth = 'none';
      img.style.maxHeight = 'none';
    } else {
      panX = 0; panY = 0;
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100%';
    }
    applyTransform();
  }

  function renderThumbs() {
    if (!thumbsEl) return;
    thumbsEl.innerHTML = '';
    if (current.length < 2) { thumbsEl.hidden = true; return; }
    thumbsEl.hidden = false;
    current.forEach((src, i) => {
      const b = document.createElement('button');
      b.className = 'gv-thumb' + (i === index ? ' active' : '');
      b.setAttribute('aria-label', `${i+1}`);
      const t = document.createElement('img');
      t.src = toThumb(src);
      t.alt = '';
      t.loading = 'lazy';
      b.appendChild(t);
      b.addEventListener('click', () => { index = i; render(); });
      thumbsEl.appendChild(b);
    });
  }

  function render() {
    if (!current.length) return;
    img.src = current[index];
    indexEl.textContent = index + 1;
    totalEl.textContent = current.length;
    fitImage();
    renderThumbs();
    const activeThumb = thumbsEl?.querySelector('.gv-thumb.active');
    activeThumb?.scrollIntoView({behavior:'smooth', block:'nearest', inline:'center'});
  }

  function openGallery(key) {
    current = galleries[key] || [];
    index = 0;
    if (!current.length) return;
    viewer.classList.add('open');
    viewer.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    updateGvHint();
    render();
  }

  function closeGallery() {
    viewer.classList.remove('open');
    viewer.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-gallery]').forEach(btn => {
    btn.addEventListener('click', () => openGallery(btn.dataset.gallery));
  });

  document.getElementById('gv-close')?.addEventListener('click', closeGallery);
  document.getElementById('gv-plus')?.addEventListener('click', () => setZoom(zoom + .5));
  document.getElementById('gv-minus')?.addEventListener('click', () => setZoom(zoom - .5));
  document.getElementById('gv-fit')?.addEventListener('click', fitImage);

  // Double-clic : bascule zoom ×1 / ×2.2, centré sur le point cliqué
  stage?.addEventListener('dblclick', (e) => {
    if (zoom > 1) {
      fitImage();
    } else {
      setZoom(2.2);
    }
  });

  document.addEventListener('keydown', e => {
    if (!viewer.classList.contains('open')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') { index = (index + 1) % current.length; render(); }
    if (e.key === 'ArrowLeft') { index = (index - 1 + current.length) % current.length; render(); }
  });

  // Molette : zoomer/dézoomer sur la photo en cours
  stage?.addEventListener('wheel', (e) => {
    if (!viewer.classList.contains('open')) return;
    e.preventDefault();
    setZoom(zoom + (e.deltaY < 0 ? .3 : -.3));
  }, {passive:false});

  // Swipe mobile (navigation) + pincer pour zoomer (deux doigts)
  let sx = 0;
  let pinchStartDist = 0;
  let pinchStartZoom = 1;

  function touchDist(t) {
    const dx = t[0].clientX - t[1].clientX;
    const dy = t[0].clientY - t[1].clientY;
    return Math.hypot(dx, dy);
  }

  stage?.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
      pinchStartDist = touchDist(e.touches);
      pinchStartZoom = zoom;
    } else if (e.touches.length === 1) {
      sx = e.touches[0].clientX;
    }
  }, {passive:true});

  stage?.addEventListener('touchmove', e => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dist = touchDist(e.touches);
      if (pinchStartDist > 0) {
        setZoom(pinchStartZoom * (dist / pinchStartDist));
      }
    }
  }, {passive:false});

  stage?.addEventListener('touchend', e => {
    if (e.changedTouches.length === 1 && zoom <= 1 && current.length) {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) >= 45) {
        index = dx < 0 ? (index + 1) % current.length : (index - 1 + current.length) % current.length;
        render();
      }
    }
    pinchStartDist = 0;
  }, {passive:true});

  // ===== 9. FAQ RÉTRACTABLE =====
  const faqToggle = document.getElementById('faq-toggle');
  const faqGrid = document.getElementById('faq-grid');

  faqToggle?.addEventListener('click', () => {
    const isOpen = faqToggle.getAttribute('aria-expanded') === 'true';
    faqToggle.setAttribute('aria-expanded', String(!isOpen));
    if (isOpen) {
      faqGrid.setAttribute('hidden', '');
    } else {
      faqGrid.removeAttribute('hidden');
    }
    faqToggle.classList.toggle('open', !isOpen);
  });
})();
