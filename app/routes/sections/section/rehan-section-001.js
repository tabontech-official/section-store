export const code = `


<section id="wishlist-star-section-{{ section.id }}"></section>

<script>
document.addEventListener("DOMContentLoaded", function () {
  var isEmbedEnabled = document.querySelector('meta[name="wishlist-app-enabled"]');

  if (isEmbedEnabled) {
    console.log("App Embed Enabled - Section content injected");

    const sectionEl = document.getElementById("wishlist-star-section-{{ section.id }}");
    sectionEl.innerHTML = \`



    

{%- liquid
  assign block_count = section.blocks.size
  assign enable_slider = section.settings.enable_slider
  assign must_use_slider = false
  if enable_slider and block_count > 4
    assign must_use_slider = true
  endif
-%}

<section class="btb btb-{{ section.id }} color-{{ section.settings.color_scheme }}" data-section-id="{{ section.id }}">
  <div class="btb__container page-width">

    {%- if section.settings.main_heading != blank -%}
      <h2 class="btb__heading h1">{{ section.settings.main_heading }}</h2>
    {%- endif -%}

    {%- if section.settings.subheading != blank -%}
      <p class="btb__subheading">{{ section.settings.subheading }}</p>
    {%- endif -%}

    {%- if must_use_slider -%}
      <div class="btb__slider-wrap">
        <button class="btb__nav btb__nav--prev" aria-label="Previous" type="button">{% render 'icon-caret' %}</button>
        <div class="btb__track"
             role="region"
             aria-label="{{ section.settings.main_heading | default: 'Behind the brand' }}"
             style="--gap: {{ section.settings.card_gap }}px; --radius-arch: {{ section.settings.arch_radius }}px; --img-aspect: {{ section.settings.image_aspect }};">
          {%- for block in section.blocks -%}
            <article class="btb-card snap" {{ block.shopify_attributes }}>
              <div class="btb-card__media">
                {%- if block.settings.image != blank -%}
                  {%- assign sizes = 'min(340px, 80vw)' -%}
                  <img
                    class="btb-card__img"
                    srcset="
                      {{ block.settings.image | image_url: width: 360 }} 360w,
                      {{ block.settings.image | image_url: width: 540 }} 540w,
                      {{ block.settings.image | image_url: width: 720 }} 720w,
                      {{ block.settings.image | image_url: width: 900 }} 900w"
                    sizes="{{ sizes }}"
                    src="{{ block.settings.image | image_url: width: 720 }}"
                    alt="{{ block.settings.image.alt | escape }}"
                    loading="lazy" decoding="async">
                {%- else -%}
                  {{ 'image' | placeholder_svg_tag: 'btb-card__img btb-card__img--placeholder' }}
                {%- endif -%}
              </div>
              <div class="btb-card__content">
                {%- if block.settings.title != blank -%}
                  <h3 class="btb-card__title">{{ block.settings.title }}</h3>
                {%- endif -%}
                {%- if block.settings.caption != blank -%}
                  <p class="btb-card__caption">{{ block.settings.caption }}</p>
                {%- endif -%}
                {%- if block.settings.button_label != blank and block.settings.button_link != blank -%}
                  <a class="btb-card__btn button"
                     href="{{ block.settings.button_link }}"
                     {% if block.settings.open_new_tab %}target="_blank" rel="noopener"{% endif %}>
                    {{ block.settings.button_label }}
                  </a>
                {%- endif -%}
              </div>
            </article>
          {%- endfor -%}
        </div>
        <button class="btb__nav btb__nav--next" aria-label="Next" type="button">{% render 'icon-caret' %}</button>
      </div>
    {%- else -%}
      <div class="btb__grid"
           style="--cols-desktop: {{ section.settings.columns_desktop }}; --cols-tablet: {{ section.settings.columns_tablet }}; --cols-mobile: {{ section.settings.columns_mobile }}; --gap: {{ section.settings.card_gap }}px; --radius-arch: {{ section.settings.arch_radius }}px; --img-aspect: {{ section.settings.image_aspect }};">
        {%- for block in section.blocks -%}
          <article class="btb-card" {{ block.shopify_attributes }}>
            <div class="btb-card__media">
              {%- if block.settings.image != blank -%}
                {%- assign sizes = '(min-width: 1200px) calc((100vw - 2rem) / var(--cols-desktop)), (min-width: 750px) calc((100vw - 2rem) / var(--cols-tablet)), calc((100vw - 2rem) / var(--cols-mobile))' -%}
                <img
                  class="btb-card__img"
                  srcset="
                    {{ block.settings.image | image_url: width: 360 }} 360w,
                    {{ block.settings.image | image_url: width: 540 }} 540w,
                    {{ block.settings.image | image_url: width: 720 }} 720w,
                    {{ block.settings.image | image_url: width: 900 }} 900w,
                    {{ block.settings.image | image_url: width: 1080 }} 1080w"
                  sizes="{{ sizes }}"
                  src="{{ block.settings.image | image_url: width: 900 }}"
                  alt="{{ block.settings.image.alt | escape }}"
                  loading="lazy" decoding="async">
              {%- else -%}
                {{ 'image' | placeholder_svg_tag: 'btb-card__img btb-card__img--placeholder' }}
              {%- endif -%}
            </div>
            <div class="btb-card__content">
              {%- if block.settings.title != blank -%}
                <h3 class="btb-card__title">{{ block.settings.title }}</h3>
              {%- endif -%}
              {%- if block.settings.caption != blank -%}
                <p class="btb-card__caption">{{ block.settings.caption }}</p>
              {%- endif -%}
              {%- if block.settings.button_label != blank and block.settings.button_link != blank -%}
                <a class="btb-card__btn button"
                   href="{{ block.settings.button_link }}"
                   {% if block.settings.open_new_tab %}target="_blank" rel="noopener"{% endif %}>
                  {{ block.settings.button_label }}
                </a>
              {%- endif -%}
            </div>
          </article>
        {%- endfor -%}
      </div>
    {%- endif -%}
  </div>

  <style>
    /* ====== Scoped styles ====== */
    .btb-{{ section.id }}{
      --text-align: {{ section.settings.text_align }};
    }
    .btb-{{ section.id }} .btb__container{
      padding-top: {{ section.settings.padding_top }}px;
      padding-bottom: {{ section.settings.padding_bottom }}px;
    }
    .btb-{{ section.id }} .btb__heading{
      text-align: var(--text-align);
      margin: 0 0 .5rem;
    }
    .btb-{{ section.id }} .btb__subheading{
      text-align: var(--text-align);
      opacity: .85;
      max-width: 62ch;
      margin: 0 auto 2.2rem;
      line-height: 1.6;
    }

    /* Grid layout */
    .btb-{{ section.id }} .btb__grid{
      display: grid;
      gap: var(--gap);
      grid-template-columns: repeat(var(--cols-mobile), minmax(0,1fr));
    }
    @media (min-width: 750px){
      .btb-{{ section.id }} .btb__grid{ grid-template-columns: repeat(var(--cols-tablet), minmax(0,1fr)); }
    }
    @media (min-width: 1200px){
      .btb-{{ section.id }} .btb__grid{ grid-template-columns: repeat(var(--cols-desktop), minmax(0,1fr)); }
    }

    /* Slider layout */
    .btb-{{ section.id }} .btb__slider-wrap{
      position: relative;
      padding: 0 36px; /* space for arrows */
    }
    .btb-{{ section.id }} .btb__track{
      display: flex;
      gap: var(--gap);
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 6px;
    }
    .btb-{{ section.id }} .btb__track::-webkit-scrollbar{ height: 8px; }
    .btb-{{ section.id }} .btb__track::-webkit-scrollbar-thumb{ background: rgba(0,0,0,.15); border-radius: 99px; }

    .btb-{{ section.id }} .snap{ scroll-snap-align: start; flex: 0 0 min(340px, 80vw); }

    .btb-{{ section.id }} .btb__nav{
      position: absolute; top: 40%;
      transform: translateY(-50%);
      width: 32px; height: 32px; border-radius: 50%;
      display: grid; place-items: center;
      background: rgba(0,0,0,.05); border: 1px solid rgba(0,0,0,.1);
      cursor: pointer;
    }
    .btb-{{ section.id }} .btb__nav--prev{ left: 0; rotate: 180deg; }
    .btb-{{ section.id }} .btb__nav--next{ right: 0; }
    .btb-{{ section.id }} .btb__nav[disabled]{ opacity: .35; pointer-events: none; }

    /* Card + arched image */
    .btb-{{ section.id }} .btb-card{
      display: flex; flex-direction: column; align-items: center; text-align: center;
      opacity: 0; transform: translateY(10px); transition: .5s ease;
    }
    .btb-{{ section.id }} .btb-card.is-in{ opacity: 1; transform: none; }

    .btb-{{ section.id }} .btb-card__media{
      width: 100%;
      position: relative;
      overflow: hidden;
      border-top-left-radius: var(--radius-arch);
      border-top-right-radius: var(--radius-arch);
      border-bottom-left-radius: calc(var(--radius-arch) / 3);
      border-bottom-right-radius: calc(var(--radius-arch) / 3);
      aspect-ratio: var(--img-aspect);
      background: rgba(0,0,0,.04);
    }
    .btb-{{ section.id }} .btb-card__img{
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block;
    }
    .btb-{{ section.id }} .btb-card__content{ padding: 14px 8px 2px; max-width: 46ch; }
    .btb-{{ section.id }} .btb-card__title{ margin: 14px 0 8px; font-size: clamp(18px, 2.1vw, 22px); font-weight: 600; }
    .btb-{{ section.id }} .btb-card__caption{ margin: 0 0 14px; font-size: 14px; line-height: 1.6; opacity: .9; }
    .btb-{{ section.id }} .btb-card__btn{ margin-top: 4px; }

    /* Basic .button fallback */
    .btb-{{ section.id }} .button{
      display: inline-block; padding: 10px 16px;
      border: 1px solid rgba(0,0,0,.12); border-radius: 999px; text-decoration: none; font-size: 14px; line-height: 1;
    }
  </style>

  <script>
    (function(){
      const root = document.querySelector('.btb-{{ section.id }}');
      if(!root) return;

      // Fade-in on view
      const cards = root.querySelectorAll('.btb-card');
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('is-in'); });
      }, {threshold: .15});
      cards.forEach(c => io.observe(c));

      // Slider logic (only if slider exists)
      const track = root.querySelector('.btb__track');
      if(!track) return;

      const prev = root.querySelector('.btb__nav--prev');
      const next = root.querySelector('.btb__nav--next');
      const step = () => {
        // scroll by one card width + gap
        const card = track.querySelector('.btb-card');
        if(!card) return 300;
        const style = getComputedStyle(track);
        const gap = parseFloat(style.columnGap || style.gap) || 24;
        return card.getBoundingClientRect().width + gap;
      }

      function updateDisabled(){
        const maxScroll = track.scrollWidth - track.clientWidth - 2;
        prev.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft >= maxScroll;
      }
      updateDisabled();

      prev.addEventListener('click', ()=>{ track.scrollBy({left: -step(), behavior: 'smooth'}); });
      next.addEventListener('click', ()=>{ track.scrollBy({left: step(), behavior: 'smooth'}); });
      track.addEventListener('scroll', ()=> updateDisabled(), {passive:true});

      // Autoplay
      {% if section.settings.autoplay %}
      let autoplayTimer = null;
      function startAutoplay(){
        stopAutoplay();
        autoplayTimer = setInterval(()=>{
          const maxScroll = track.scrollWidth - track.clientWidth - 2;
          if(track.scrollLeft >= maxScroll){ track.scrollTo({left: 0, behavior: 'smooth'}); }
          else { track.scrollBy({left: step(), behavior: 'smooth'}); }
        }, {{ section.settings.autoplay_interval | times: 1000 }});
      }
      function stopAutoplay(){ if(autoplayTimer) clearInterval(autoplayTimer); }
      startAutoplay();
      // pause on hover
      root.addEventListener('mouseenter', stopAutoplay);
      root.addEventListener('mouseleave', startAutoplay);
      {% endif %}
    })();
    alert('test1234');
  </script>
</section>












    \`;

  } else {
    console.log("App Embed Disabled - Content skipped");
  }
});
</script>






{% schema %}
{
  "name": "Behind the Brand",
  "tag": "section",
  "class": "section",
  "settings": [
    { "type": "text", "id": "main_heading", "label": "Main heading", "default": "About Us" },
    { "type": "text", "id": "subheading", "label": "Subheading", "default": "Behind the brand" },

    {
      "type": "select",
      "id": "text_align",
      "label": "Heading alignment",
      "options": [
        { "value": "left", "label": "Left" },
        { "value": "center", "label": "Center" },
        { "value": "right", "label": "Right" }
      ],
      "default": "center"
    },
    {
      "type": "select",
      "id": "color_scheme",
      "label": "Color scheme",
      "default": "background-1",
      "options": [
        { "value": "background-1", "label": "Background 1" },
        { "value": "background-2", "label": "Background 2" },
        { "value": "inverse", "label": "Inverse" }
      ]
    },

    /* All range settings now have >= 3 steps */
    { "type": "range", "id": "columns_desktop", "min": 2, "max": 4, "step": 1, "label": "Columns on desktop", "default": 3 },
    { "type": "range", "id": "columns_tablet", "min": 1, "max": 3, "step": 1, "label": "Columns on tablet", "default": 2 },
    { "type": "range", "id": "columns_mobile", "min": 1, "max": 3, "step": 1, "label": "Columns on mobile", "default": 1 },

    { "type": "range", "id": "card_gap", "min": 6, "max": 48, "step": 6, "label": "Card gap (px)", "default": 24 },

    { "type": "range", "id": "arch_radius", "min": 120, "max": 480, "step": 60, "label": "Top arch radius (px)", "default": 300 },

    {
      "type": "select",
      "id": "image_aspect",
      "label": "Image aspect ratio",
      "options": [
        { "value": "3 / 4", "label": "3:4 (portrait)" },
        { "value": "2 / 3", "label": "2:3 (tall portrait)" },
        { "value": "4 / 5", "label": "4:5" },
        { "value": "1 / 1", "label": "1:1 (square)" }
      ],
      "default": "3 / 4"
    },

    { "type": "range", "id": "padding_top", "min": 0, "max": 120, "step": 20, "label": "Padding top (px)", "default": 40 },
    { "type": "range", "id": "padding_bottom", "min": 0, "max": 120, "step": 20, "label": "Padding bottom (px)", "default": 40 },

    { "type": "checkbox", "id": "enable_slider", "label": "Enable slider when more than 4 blocks", "default": true },
    { "type": "checkbox", "id": "autoplay", "label": "Autoplay (slider only)", "default": true },
    { "type": "range", "id": "autoplay_interval", "min": 3, "max": 12, "step": 1, "label": "Autoplay interval (seconds)", "default": 5 }
  ],
  "blocks": [
    {
      "type": "person",
      "name": "Brand member",
      "limit": 12,
      "settings": [
        { "type": "image_picker", "id": "image", "label": "Image" },
        { "type": "text", "id": "title", "label": "Title / Name", "default": "Member name" },
        { "type": "text", "id": "caption", "label": "Caption", "default": "Short role/description" },
        { "type": "text", "id": "button_label", "label": "Button label", "default": "Learn more" },
        { "type": "url", "id": "button_link", "label": "Button link" },
        { "type": "checkbox", "id": "open_new_tab", "label": "Open link in new tab", "default": false }
      ]
    }
  ],
  "presets": [
    {
      "name": "Behind the Brand",
      "blocks": [
        { "type": "person" },
        { "type": "person" },
        { "type": "person" }
      ]
    }
  ]
}
{% endschema %}







`;
