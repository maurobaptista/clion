document.querySelector('.search-bar button').addEventListener('click', function() {
    const query = document.querySelector('.search-bar input').value;
    if (query) {
        alert('Searching for: ' + query);
        // Aqui você pode adicionar lógica para redirecionar ou fazer uma busca real
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Funções para os dropdowns de idioma e moeda
    setupDropdown('language-dropdown');
    setupDropdown('currency-dropdown');
    setupDropdown('category-dropdown');
    setupSlider();
    setupCartCounter();
    setupTranslation();
    
    // Verificar se existe um idioma salvo no localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        // Selecionar o idioma salvo
        const langLink = document.querySelector(`#language-dropdown .dropdown-content a[data-lang="${savedLanguage}"]`);
        if (langLink) {
            const languageText = langLink.textContent.trim();
            const flagCode = getFlagCode(savedLanguage);
            
            // Atualizar o texto do dropdown com bandeira
            const langToggle = document.querySelector('#language-dropdown span');
            if (langToggle) {
                langToggle.innerHTML = `<span class="flag-icon flag-icon-${flagCode}"></span> ${languageText.substring(0, 3)} <i class="fas fa-chevron-down"></i>`;
            }
            
            // Traduzir o site para o idioma salvo
            translateSite(savedLanguage);
        }
    }

    // Função para configurar os comportamentos dos dropdowns
    function setupDropdown(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        if (!dropdown) return;

        const dropdownToggle = dropdown.querySelector('span');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        // Adiciona o evento de clique para mostrar/esconder o dropdown
        dropdownToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Fecha todos os outros dropdowns abertos
            document.querySelectorAll('.dropdown-content').forEach(content => {
                if (content !== dropdownContent) {
                    content.classList.remove('show');
                    
                    // Retira a classe active dos outros spans
                    const parentDropdown = content.closest('.dropdown');
                    if (parentDropdown) {
                        const parentToggle = parentDropdown.querySelector('span');
                        if (parentToggle) {
                            parentToggle.classList.remove('active');
                        }
                    }
                }
            });

            // Toggle para o dropdown atual
            dropdownContent.classList.toggle('show');
            dropdownToggle.classList.toggle('active');
            
            // Altera a direção do ícone de seta
            const arrow = dropdownToggle.querySelector('.fa-chevron-down');
            if (arrow) {
                arrow.classList.toggle('fa-chevron-down');
                arrow.classList.toggle('fa-chevron-up');
            }
        });

        // Eventos para os links dentro do dropdown
        const dropdownLinks = dropdownContent.querySelectorAll('a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Para o dropdown de idioma
                if (dropdownId === 'language-dropdown') {
                    const language = this.getAttribute('data-lang');
                    const languageText = this.textContent.trim();
                    
                    // Atualizar o texto do dropdown com bandeira
                    const flagCode = getFlagCode(language);
                    dropdownToggle.innerHTML = `<span class="flag-icon flag-icon-${flagCode}"></span> ${languageText.substring(0, 3)} <i class="fas fa-chevron-down"></i>`;
                    
                    // Adicionar marcação de selecionado (check)
                    dropdownLinks.forEach(l => {
                        const langCode = l.getAttribute('data-lang');
                        const flagCodeInner = getFlagCode(langCode);
                        l.innerHTML = `<span class="flag-icon flag-icon-${flagCodeInner}"></span> ${l.textContent.trim()}`;
                    });
                    
                    this.innerHTML = `<span class="flag-icon flag-icon-${flagCode}"></span> ${languageText} <i class="fas fa-check" style="color: #FF6900;"></i>`;
                    
                    // Traduzir o site
                    translateSite(language);
                }
                
                // Para o dropdown de moeda
                else if (dropdownId === 'currency-dropdown') {
                    const currency = this.getAttribute('data-currency');
                    
                    // Atualizar o texto do dropdown
                    dropdownToggle.innerHTML = currency + ' <i class="fas fa-chevron-down"></i>';
                    
                    // Adicionar marcação de selecionado (check)
                    dropdownLinks.forEach(l => l.innerHTML = l.textContent.trim());
                    this.innerHTML = `${this.textContent.trim()} <i class="fas fa-check" style="color: #FF6900;"></i>`;
                }
                
                // Para o dropdown de categoria
                else if (dropdownId === 'category-dropdown') {
                    const category = this.getAttribute('data-category');
                    // Atualizar o texto do dropdown e fechar o dropdown
                    dropdownToggle.innerHTML = this.textContent + ' <i class="fas fa-chevron-down"></i>';
                }
                
                // Fechar o dropdown após clicar
                dropdownContent.classList.remove('show');
                dropdownToggle.classList.remove('active');
                
                // Restaurar o ícone de seta para baixo
                const arrow = dropdownToggle.querySelector('.fa-chevron-up');
                if (arrow) {
                    arrow.classList.remove('fa-chevron-up');
                    arrow.classList.add('fa-chevron-down');
                }
            });
        });
    }

    // Função para obter o código da bandeira baseado no código do idioma
    function getFlagCode(lang) {
        const flagMap = {
            'en': 'us', // Inglês -> EUA
            'pt': 'br', // Português -> Brasil
            'es': 'es', // Espanhol -> Espanha
            'fr': 'fr'  // Francês -> França
        };
        return flagMap[lang] || lang;
    }

    // Função para traduzir o conteúdo do site
    function translateSite(language) {
        // Dicionário de traduções completas
        const translations = {
            'en': {
                // Cabeçalho e navegação
                'welcomeText': 'Welcome to Clicon online eCommerce store.',
                'followUs': 'Follow us:',
                'allCategory': 'All Category',
                'trackOrder': 'Track Order',
                'compare': 'Compare',
                'customerSupport': 'Customer Support',
                'needHelp': 'Need Help',
                'shopNow': 'SHOP NOW',
                'searchPlaceholder': 'Search for anything...',
                
                // Hero Section
                'bestPlace': 'THE BEST PLACE TO PLAY',
                'xboxConsole': 'Xbox Console',
                'xboxDescription': 'Save up to 50% on select Xbox consoles & get 3 months of PC Game Pass.',
                'nextGenGaming': 'NEXT-GEN GAMING',
                'ps5': 'PlayStation 5',
                'ps5Description': 'Experience lightning-fast loading with an ultra-high speed SSD and immersive gaming.',
                'playAnywhere': 'PLAY ANYWHERE',
                'nintendoSwitch': 'Nintendo Switch',
                'switchDescription': 'Get the gaming system that lets you play the games you want, wherever you are.',
                
                // Promoções
                'blackFriday': 'Black Friday',
                'upTo': 'Up to',
                'off': 'OFF',
                'summerSales': 'SUMMER SALES',
                'newGoogle': 'New Google',
                'pixel6Pro': 'Pixel 6 Pro',
                'discountLabel': '29% OFF',
                'xiaomi': 'Xiaomi',
                'flipbudsPro': 'FlipBuds Pro',
                'usd': 'USD',
                
                // Categorias
                'electronics': 'Electronics',
                'computers': 'Computers',
                'smartphones': 'Smartphones',
                'audio': 'Audio',
                'gaming': 'Gaming'
            },
            'pt': {
                // Cabeçalho e navegação
                'welcomeText': 'Bem-vindo à loja online Clicon.',
                'followUs': 'Siga-nos:',
                'allCategory': 'Todas as Categorias',
                'trackOrder': 'Rastrear Pedido',
                'compare': 'Comparar',
                'customerSupport': 'Suporte ao Cliente',
                'needHelp': 'Precisa de Ajuda',
                'shopNow': 'COMPRAR AGORA',
                'searchPlaceholder': 'Pesquisar por qualquer coisa...',
                
                // Hero Section
                'bestPlace': 'O MELHOR LUGAR PARA JOGAR',
                'xboxConsole': 'Console Xbox',
                'xboxDescription': 'Economize até 50% em consoles Xbox selecionados e ganhe 3 meses de PC Game Pass.',
                'nextGenGaming': 'JOGOS DE NOVA GERAÇÃO',
                'ps5': 'PlayStation 5',
                'ps5Description': 'Experimente carregamento ultra-rápido com SSD de alta velocidade e jogos imersivos.',
                'playAnywhere': 'JOGUE EM QUALQUER LUGAR',
                'nintendoSwitch': 'Nintendo Switch',
                'switchDescription': 'Obtenha o sistema de jogos que permite jogar os jogos que você quer, onde quiser.',
                
                // Promoções
                'blackFriday': 'Black Friday',
                'upTo': 'Até',
                'off': 'OFF',
                'summerSales': 'PROMOÇÕES DE VERÃO',
                'newGoogle': 'Novo Google',
                'pixel6Pro': 'Pixel 6 Pro',
                'discountLabel': '29% OFF',
                'xiaomi': 'Xiaomi',
                'flipbudsPro': 'FlipBuds Pro',
                'usd': 'USD',
                
                // Categorias
                'electronics': 'Eletrônicos',
                'computers': 'Computadores',
                'smartphones': 'Smartphones',
                'audio': 'Áudio',
                'gaming': 'Jogos'
            },
            'es': {
                // Cabeçalho e navegação
                'welcomeText': 'Bienvenido a la tienda online Clicon.',
                'followUs': 'Síguenos:',
                'allCategory': 'Todas las Categorías',
                'trackOrder': 'Seguir Pedido',
                'compare': 'Comparar',
                'customerSupport': 'Atención al Cliente',
                'needHelp': 'Necesita Ayuda',
                'shopNow': 'COMPRAR AHORA',
                'searchPlaceholder': 'Buscar cualquier cosa...',
                
                // Hero Section
                'bestPlace': 'EL MEJOR LUGAR PARA JUGAR',
                'xboxConsole': 'Consola Xbox',
                'xboxDescription': 'Ahorra hasta un 50% en consolas Xbox seleccionadas y obtén 3 meses de PC Game Pass.',
                'nextGenGaming': 'JUEGOS DE NUEVA GENERACIÓN',
                'ps5': 'PlayStation 5',
                'ps5Description': 'Experimenta cargas ultrarrápidas con un SSD de alta velocidad y juegos inmersivos.',
                'playAnywhere': 'JUEGA DONDE QUIERAS',
                'nintendoSwitch': 'Nintendo Switch',
                'switchDescription': 'Consigue el sistema de juego que te permite jugar a los juegos que quieras, donde quieras.',
                
                // Promoções
                'blackFriday': 'Black Friday',
                'upTo': 'Hasta',
                'off': 'DESC',
                'summerSales': 'VENTAS DE VERANO',
                'newGoogle': 'Nuevo Google',
                'pixel6Pro': 'Pixel 6 Pro',
                'discountLabel': '29% DESC',
                'xiaomi': 'Xiaomi',
                'flipbudsPro': 'FlipBuds Pro',
                'usd': 'USD',
                
                // Categorias
                'electronics': 'Electrónica',
                'computers': 'Ordenadores',
                'smartphones': 'Teléfonos Inteligentes',
                'audio': 'Audio',
                'gaming': 'Videojuegos'
            },
            'fr': {
                // Cabeçalho e navegação
                'welcomeText': 'Bienvenue sur la boutique en ligne Clicon.',
                'followUs': 'Suivez-nous:',
                'allCategory': 'Toutes les Catégories',
                'trackOrder': 'Suivre Commande',
                'compare': 'Comparer',
                'customerSupport': 'Service Client',
                'needHelp': 'Besoin d\'Aide',
                'shopNow': 'ACHETER MAINTENANT',
                'searchPlaceholder': 'Rechercher quelque chose...',
                
                // Hero Section
                'bestPlace': 'LE MEILLEUR ENDROIT POUR JOUER',
                'xboxConsole': 'Console Xbox',
                'xboxDescription': 'Économisez jusqu\'à 50% sur certaines consoles Xbox et obtenez 3 mois de PC Game Pass.',
                'nextGenGaming': 'JEUX NOUVELLE GÉNÉRATION',
                'ps5': 'PlayStation 5',
                'ps5Description': 'Découvrez un chargement ultra-rapide avec un SSD haute vitesse et des jeux immersifs.',
                'playAnywhere': 'JOUEZ PARTOUT',
                'nintendoSwitch': 'Nintendo Switch',
                'switchDescription': 'Obtenez le système de jeu qui vous permet de jouer aux jeux que vous voulez, où que vous soyez.',
                
                // Promoções
                'blackFriday': 'Black Friday',
                'upTo': 'Jusqu\'à',
                'off': 'REMISE',
                'summerSales': 'SOLDES D\'ÉTÉ',
                'newGoogle': 'Nouveau Google',
                'pixel6Pro': 'Pixel 6 Pro',
                'discountLabel': '29% REMISE',
                'xiaomi': 'Xiaomi',
                'flipbudsPro': 'FlipBuds Pro',
                'usd': 'USD',
                
                // Categorias
                'electronics': 'Électronique',
                'computers': 'Ordinateurs',
                'smartphones': 'Smartphones',
                'audio': 'Audio',
                'gaming': 'Jeux Vidéo'
            }
        };
        
        // Verificar se o idioma existe no dicionário
        if (!translations[language]) return;
        
        // Aplicar traduções
        const trans = translations[language];
        
        // Salvar o idioma atual no localStorage para persistência
        localStorage.setItem('selectedLanguage', language);
        
        // ===== TRADUÇÕES DO CABEÇALHO E NAVEGAÇÃO =====
        
        // Texto de boas-vindas
        const welcomeText = document.querySelector('.top-bar .text');
        if (welcomeText) welcomeText.textContent = trans.welcomeText;
        
        // Texto "Follow us"
        const followUs = document.querySelector('.social-icons');
        if (followUs && followUs.childNodes[0].nodeType === 3) {
            followUs.childNodes[0].nodeValue = trans.followUs + ' ';
        }
        
     
        
        // Placeholder da pesquisa
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.placeholder = trans.searchPlaceholder;
        }
        
        // ===== TRADUÇÕES DAS PROMOÇÕES E BANNERS =====
        
        // Black Friday Banner
        const blackFridayText = document.querySelector('.content h3 .preto');
        if (blackFridayText) blackFridayText.textContent = trans.blackFriday;
        
        // Up to text
        const upToText = document.querySelector('.content .text-one .pequeno');
        if (upToText) upToText.textContent = trans.upTo;
        
        // OFF text
        const offText = document.querySelector('.content .text-one .off');
        if (offText) offText.textContent = trans.off;
        
        // Shop Now button in header banner
        const shopNowHeader = document.querySelector('.content .btn');
        if (shopNowHeader) {
            shopNowHeader.innerHTML = `${trans.shopNow} <i class="fas fa-arrow-right"></i>`;
        }
        
        // ===== TRADUÇÕES DA HERO SECTION =====
        
        // Subtítulo do Hero
        const heroSubtitle = document.querySelector('.main-feature .subtitle');
        if (heroSubtitle) {
            heroSubtitle.textContent = trans.bestPlace;
        }
        
        // Botões "SHOP NOW" na seção hero
        const shopNowBtns = document.querySelectorAll('.shop-now-btn');
        shopNowBtns.forEach(btn => {
            if (btn.tagName === 'BUTTON') {
                btn.innerHTML = `${trans.shopNow} <i class="fas fa-arrow-right"></i>`;
            }
        });
        
        // Título e descrição do Xbox
        const heroTitle = document.querySelector('.main-feature .title');
        if (heroTitle && heroTitle.textContent.includes('Xbox')) {
            heroTitle.textContent = trans.xboxConsole;
        }
        
        const heroDescription = document.querySelector('.main-feature .description');
        if (heroDescription && heroDescription.textContent.includes('Xbox')) {
            heroDescription.textContent = trans.xboxDescription;
        }
        
        // Summer Sales
        const summerSales = document.querySelector('.feature-label');
        if (summerSales) {
            summerSales.textContent = trans.summerSales;
        }
        
        // Google Pixel Promo
        const newGoogle = document.querySelector('.pixel-promo .feature-title');
        if (newGoogle) {
            newGoogle.innerHTML = `${trans.newGoogle} <br> ${trans.pixel6Pro}`;
        }
        
        // Desconto na promo do Pixel
        const discountLabel = document.querySelector('.discount-label');
        if (discountLabel) {
            discountLabel.textContent = trans.discountLabel;
        }
        
        // Xiaomi FlipBuds Promo
        const xiaomiTitle = document.querySelector('.flipbuds-promo .feature-title');
        if (xiaomiTitle) {
            xiaomiTitle.innerHTML = `${trans.xiaomi} <br> ${trans.flipbudsPro}`;
        }
        
        // Preço USD na promo FlipBuds
        const priceUSD = document.querySelector('.feature-price span');
        if (priceUSD && priceUSD.textContent.includes('USD')) {
            priceUSD.textContent = priceUSD.textContent.replace('USD', trans.usd);
        }
        
        // ===== TRADUÇÕES DAS CATEGORIAS =====
        
        // Links de categorias no dropdown
        const categoryLinks = document.querySelectorAll('.category-dropdown .dropdown-content a');
        categoryLinks.forEach(link => {
            const category = link.getAttribute('data-category');
            if (category && trans[category]) {
                link.textContent = trans[category];
            }
        });
        
        // ===== TRADUÇÕES DO SLIDER =====
        
        // Atualizamos os slides para usar os textos traduzidos
        if (window.slides) {
            window.slides = [
                {
                    image: 'img/xbox.png', 
                    title: trans.xboxConsole, 
                    subtitle: trans.bestPlace,
                    description: trans.xboxDescription
                },
                {
                    image: 'img/ps5-png.png', 
                    title: trans.ps5, 
                    subtitle: trans.nextGenGaming,
                    description: trans.ps5Description
                },
                {
                    image: 'img/nintendo-2.png', 
                    title: trans.nintendoSwitch, 
                    subtitle: trans.playAnywhere,
                    description: trans.switchDescription
                }
            ];
            
            // Se tiver um currentSlide global definido, atualizamos o slide atual
            if (typeof window.currentSlide !== 'undefined') {
                updateSlide(window.currentSlide);
            }
        }
    }

    // Adicionar CSS para as bandeiras
    function setupTranslation() {
        // Adicionar o CSS para as bandeiras se não existir
        if (!document.getElementById('flag-icons-css')) {
            const flagIconsLink = document.createElement('link');
            flagIconsLink.id = 'flag-icons-css';
            flagIconsLink.rel = 'stylesheet';
            flagIconsLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.6.6/css/flag-icons.min.css';
            document.head.appendChild(flagIconsLink);
        }
        
        // Adicionar bandeiras aos idiomas no dropdown
        const langLinks = document.querySelectorAll('#language-dropdown .dropdown-content a');
        langLinks.forEach(link => {
            const lang = link.getAttribute('data-lang');
            const flagCode = getFlagCode(lang);
            link.innerHTML = `<span class="flag-icon flag-icon-${flagCode}"></span> ${link.textContent}`;
        });
        
        // Inicializar com bandeira do inglês no toggle
        const langToggle = document.querySelector('#language-dropdown span');
        if (langToggle) {
            langToggle.innerHTML = `<span class="flag-icon flag-icon-us"></span> Eng <i class="fas fa-chevron-down"></i>`;
        }
    }

    // Fechar os dropdowns quando clicar fora deles
    document.addEventListener('click', function(e) {
        document.querySelectorAll('.dropdown-content').forEach(content => {
            content.classList.remove('show');
            
            // Retira a classe active dos spans
            const parentDropdown = content.closest('.dropdown');
            if (parentDropdown) {
                const parentToggle = parentDropdown.querySelector('span');
                if (parentToggle) {
                    parentToggle.classList.remove('active');
                    
                    // Restaurar ícone de seta para baixo
                    const arrow = parentToggle.querySelector('.fa-chevron-up');
                    if (arrow) {
                        arrow.classList.remove('fa-chevron-up');
                        arrow.classList.add('fa-chevron-down');
                    }
                }
            }
        });
    });

    // Configurar o slider da seção hero
    function setupSlider() {
        const dots = document.querySelectorAll('.slider-dots .dot');
        const heroImage = document.getElementById('hero-image');
        const heroTitle = document.querySelector('.main-feature .title');
        const heroSubtitle = document.querySelector('.main-feature .subtitle');
        const heroDescription = document.querySelector('.main-feature .description');
        
        // Array de imagens e textos para o slider
        window.slides = [
            {
                image: 'img/xbox.png', 
                title: 'Xbox Console', 
                subtitle: 'THE BEST PLACE TO PLAY',
                description: 'Save up to 50% on select Xbox consoles & get 3 months of PC Game Pass.'
            },
            {
                image: 'img/play5.png', 
                title: 'PlayStation 5', 
                subtitle: 'NEXT-GEN GAMING',
                description: 'Experience lightning-fast loading with an ultra-high speed SSD and immersive gaming.'
            },
            {
                image: 'img/nintendo.png', 
                title: 'Nintendo Switch', 
                subtitle: 'PLAY ANYWHERE',
                description: 'Get the gaming system that lets you play the games you want, wherever you are.'
            }
        ];
        
        window.currentSlide = 0;
        
        // Adicionar event listener para cada dot
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Remover a classe active de todos os dots
                dots.forEach(d => d.classList.remove('active'));
                
                // Adicionar a classe active ao dot clicado
                dot.classList.add('active');
                
                // Atualizar a imagem e os textos
                window.currentSlide = index;
                updateSlide(window.currentSlide);
            });
        });
        
        // Função para atualizar o slide
        window.updateSlide = function(index) {
            heroImage.src = window.slides[index].image;
            heroTitle.textContent = window.slides[index].title;
            heroSubtitle.textContent = window.slides[index].subtitle;
            heroDescription.textContent = window.slides[index].description;
        };
        
        // Configurar slider automático
        setInterval(() => {
            window.currentSlide = (window.currentSlide + 1) % window.slides.length;
            
            // Atualizar dots
            dots.forEach(d => d.classList.remove('active'));
            dots[window.currentSlide].classList.add('active');
            
            // Atualizar conteúdo
            window.updateSlide(window.currentSlide);
        }, 5000);
    }

    // Configurar contador do carrinho
    function setupCartCounter() {
        const cartCount = document.getElementById('cart-count');
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        
        let count = 0;
        
        // Adicionar event listener para todos os botões "Add to Cart"
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                count++;
                cartCount.textContent = count;
                
                // Animação de adicionado ao carrinho
                cartCount.classList.add('added');
                setTimeout(() => {
                    cartCount.classList.remove('added');
                }, 500);
            });
        });
        
        // Adicionar funcionalidade aos botões "SHOP NOW" para adicionar ao carrinho também
        const shopNowButtons = document.querySelectorAll('.shop-now-btn');
        shopNowButtons.forEach(button => {
            button.addEventListener('click', function() {
                count++;
                cartCount.textContent = count;
                
                // Animação de adicionado ao carrinho
                cartCount.classList.add('added');
                setTimeout(() => {
                    cartCount.classList.remove('added');
                }, 500);
            });
        });
    }
});

// Contador regressivo
const countdownElement = document.getElementById("countdown-timer");
const ps5PriceElement = document.getElementById("ps5-price");
const originalPrice = "$442.12";
const newPrice = "$600.23";

// Data futura simulada (por exemplo, 16 dias a partir de agora)
const deadline = new Date();
deadline.setDate(deadline.getDate() + 16);

timer = setInterval(() => {
  const now = new Date().getTime();
  const distance = deadline - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.textContent = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;

  if (distance < 0) {
    clearInterval(timer);
    countdownElement.textContent = "Expired";
    ps5PriceElement.textContent = newPrice;
    ps5PriceElement.style.color = "red";
  }
}, 1000);

  
const productGrid = document.getElementById('productGrid');
const toggleButton = document.getElementById('toggleButton');

const originalProducts = `
     <div class="product-grid">
        <!-- Xbox mais largo -->
            <div class="product wide">
              <div class="badge discount">32% OFF</div>
              <div class="badge hot">HOT</div>
              <div class="image">
                <img src="img/play5.png" alt="PS5" />
              </div>
              <div class="details">
                <div class="stars">★★★★★ <span>(52,677)</span></div>
                <div class="name">Xbox Series S - 512GB SSD Console with Wireless Controller - EU Version</div>
                <div class="price"><span class="old">$865.99</span> <span class="new">$442.12</span></div>
                <div class="desc">Games built using the Xbox Series X|S development kit showcase unparalleled load times, visuals.</div>
                <div class="actions">
                  <button class="wishlist">♡</button>
                      <button class="add-to-cart"> <img src="img/shopping-cart.png" alt="">ADD TO CARD</button>
                    <button class="wishlist"><i class="fa-sold fa-eye"></i></button>
                </div>
              </div>
            </div>
            <!-- Restantes produtos -->
            <div class="product sold">
              <div class="we-product">
                  <div class="badge sold-out">SOLD OUT</div>
                  <div class="image"><img src="img/drone.png" alt="Drone" /></div>
                  <div class="details">
                    <div class="name">Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...</div>
                    <div class="price">$2,300</div>
                  </div>
              </div>
            </div>
            <div class="product sold">
                <div class="we-product">
                  <div class="image"><img src="img/Image (5).png" alt="Smartphone" /></div>
                  <div class="details">
                    <div class="name">Simple Mobile 4G LTE Prepaid Smartphone</div>
                    <div class="price">$220</div>
                  </div>
                </div>
            </div>
            <div class="product sold">
                <div class="we-product">
                  <div class="badge discount">19% OFF</div>
                  <div class="image"><img src="img/comando-xbox.png" alt="TV Gamepad" /></div>
                  <div class="details">
                    <div class="name">4K UHD LED Smart TV with Chromecast Built-in</div>
                    <div class="price"><span class="old">$865</span> <span class="new">$1,50</span></div>
                  </div>
                </div>
            </div>
                
                   <br>
                   
                <div class="product sold">
            
                <div class="we-product">
                  <div class="image"><img src="img/phone.png" alt="phone" /></div>
                  <div class="details">
                    <div class="name">Dell Optiplex 7000x7480 All-in-One Computer Monitor</div>
                    <div class="price">$299</div>
                  </div>
                </div>
                </div>
            <div class="product sold">
                <div class="we-product">
                  <div class="image"><img src="img/drone-phone.png" alt="Toy Drone" /></div>
                  <div class="details">
                    <div class="name">Portable Wshing Machine, 11lbs capacity Model 18NMF1AM</div>
                    <div class="price"><span class="old">$865.99</span> <span class="new">$70</span></div>
                  </div>
                </div>
            </div>
            <div class="product sold">
                <div class="we-product">
                  <div class="badge hot">HOT</div>
                  <div class="image"><img src="img/monitor.png" alt="Monitor" /></div>
                  <div class="details">
                    <div class="name">2-Barrel Carburetor Carb 2100 Engine Increase Horsepower</div>
                    <div class="price">$160</div>
                  </div>
                </div>
            </div>
        </div>
`;

const newProducts = `
      <div class="product-grid">
        <!-- Xbox mais largo -->
            <div class="product wide">
              <div class="badge discount">32% OFF</div>
              <div class="badge hot">HOT</div>
              <div class="image">
                <img src="img/Image 6.png" alt="iMac" /> 
              </div>
              <div class="details">
                <div class="stars">★★★★★ <span>(52,677)</span></div>
                <div class="name">Xbox Series S - 512GB SSD Console with Wireless Controller - EU Version</div>
                <div class="price"><span class="old">$865.99</span> <span class="new">$442.12</span></div>
                <div class="desc">Games built using the Xbox Series X|S development kit showcase unparalleled load times, visuals.</div>
                <div class="actions">
                  <button class="wishlist">♡</button>
                  <button class="add-to-cart">ADD TO CARD</button>
                </div>
              </div>
            </div>
            <!-- Restantes produtos -->
            <div class="product sold">
              <div class="we-product">
                  <div class="badge sold-out">SOLD OUT</div>
                   <div class="image"><img src="img/Image (31).png" alt="iMac" /></div>
                  <div class="details">
                    <div class="name">Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...</div>
                    <div class="price">$2,300</div>
                  </div>
              </div>
            </div>
            <div class="product sold">
                <div class="we-product">
                   <div class="image"><img src="img/Image (28).png" alt="iMac" /></div>
                  <div class="details">
                    <div class="name">Simple Mobile 4G LTE Prepaid Smartphone</div>
                    <div class="price">$220</div>
                  </div>
                </div>
            </div>
            <div class="product sold">
                <div class="we-product">
                  <div class="badge discount">19% OFF</div>
                   <div class="image"><img src="img/Image (27).png" alt="iMac" /></div>
                  <div class="details">
                    <div class="name">4K UHD LED Smart TV with Chromecast Built-in</div>
                    <div class="price"><span class="old">$865</span> <span class="new">$1,50</span></div>
                  </div>
                </div>
            </div>
                
                   <br>
                   
                <div class="product sold">
            
                <div class="we-product">
                   <div class="image"><img src="img/Image (13).png" alt="iMac" /></div>
                  <div class="details">
                    <div class="name">Dell Optiplex 7000x7480 All-in-One Computer Monitor</div>
                    <div class="price">$299</div>
                  </div>
                </div>
                </div>
            <div class="product sold">
                <div class="we-product">
                   <div class="image"><img src="img/Image (12).png" alt="iMac" /></div>
                  <div class="details">
                    <div class="name">Portable Wshing Machine, 11lbs capacity Model 18NMF1AM</div>
                    <div class="price"><span class="old">$865.99</span> <span class="new">$70</span></div>
                  </div>
                </div>
            </div>
            <div class="product sold">
                <div class="we-product">
                  <div class="badge hot">HOT</div>
                  <div class="image"><img src="img/Image (30).png" alt="iMac" /></div>
                  <div class="details">
                    <div class="name">2-Barrel Carburetor Carb 2100 Engine Increase Horsepower</div>
                    <div class="price">$160</div>
                  </div>
                </div>
            </div>
        </div>
`;

let showingOriginal = true;

function toggleProducts() {
  productGrid.innerHTML = showingOriginal ? newProducts : originalProducts;
  showingOriginal = !showingOriginal;
}

toggleButton.addEventListener('click', toggleProducts);

// Inicializa com os produtos originais
productGrid.innerHTML = originalProducts;


document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("toggleButton");
    const productGrid = document.getElementById("productGrid");

    button.addEventListener("click", function (e) {
        e.preventDefault();
        productGrid.scrollIntoView({ behavior: "smooth" });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('categoryToggle');
    const content = document.getElementById('categoryContent');
    const dropdown = document.getElementById('categoryDropdown');

    toggle.addEventListener('click', () => {
        content.style.display = (content.style.display === 'block') ? 'none' : 'block';
    });

    window.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            content.style.display = 'none';
        }
    });
});
  document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggle-products");
    const mainProducts = document.getElementById("main-products");
    const altProducts = document.getElementById("alt-products");

    let showingAlt = false;

    toggleButton.addEventListener("click", function (e) {
      e.preventDefault();

      if (showingAlt) {
        // Voltar para os produtos principais
        mainProducts.style.display = "block";
        altProducts.style.display = "none";
        toggleButton.innerHTML = 'Browse All Product <i class="fas fa-arrow-right"></i>';
      } else {
        // Mostrar produtos alternativos
        mainProducts.style.display = "none";
        altProducts.style.display = "block";
        toggleButton.innerHTML = 'Back to Featured <i class="fas fa-arrow-left"></i>';
      }

      showingAlt = !showingAlt;
    });
  });



  document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
      const content = dropdown.querySelector(".dropdown-content");

      dropdown.addEventListener("click", function (e) {
        e.stopPropagation();

        // Fecha todos os outros dropdowns
        document.querySelectorAll(".dropdown-content").forEach(el => {
          if (el !== content) {
            el.style.display = "none";
          }
        });

        // Alternar visibilidade do menu clicado
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    });

    // Fecha os dropdowns ao clicar fora
    document.addEventListener("click", function () {
      document.querySelectorAll(".dropdown-content").forEach(el => {
        el.style.display = "none";
      });
    });
  });
  