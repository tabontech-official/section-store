// export const code = `
// <section id="wishlist-star-section-{{ section.id }}"></section>

// <script>
// document.addEventListener("DOMContentLoaded", function () {
//   var isEmbedEnabled = document.querySelector('meta[name="wishlist-app-enabled"]');

//   if (isEmbedEnabled) {
//     console.log("App Embed Enabled - Section content injected");

//     const sectionEl = document.getElementById("wishlist-star-section-{{ section.id }}");
//     sectionEl.innerHTML = \`
//      <div style="padding:20px; background:#f0f0f0; margin:20px;">
//         <h2 style="color:#111;">Wishlist Feature Active </h2>
//       </div>
//     \`;

//   } else {
//     console.log("App Embed Disabled - Content skipped");
//   }
// });
// </script>

// {% schema %}
// {
//   "name": "sami testing 123",
//   "settings": [],
//   "presets": [
//     { "name": "sami testing 123" }
//   ]
// }
// {% endschema %}

// `;

export const code = `


<section id="wishlist-star-section-{{ section.id }}"
  class="btb btb-{{ section.id }} color-{{ section.settings.color_scheme }}"
  data-section-id="{{ section.id }}">
  <div class="btb__container page-width">

    {% if section.settings.main_heading != blank %}
      <h2 class="btb__heading h1">{{ section.settings.main_heading }}</h2>
    {% endif %}

    {% if section.settings.subheading != blank %}
      <p class="btb__subheading">{{ section.settings.subheading }}</p>
    {% endif %}

    {% liquid
      assign block_count = section.blocks.size
      assign must_use_slider = false
      if section.settings.enable_slider and block_count > 4
        assign must_use_slider = true
      endif
    %}

    {% if must_use_slider %}
      <div class="btb__slider-wrap">
        <button class="btb__nav btb__nav--prev" type="button">{% render 'icon-caret' %}</button>
        <div class="btb__track">
          {% for block in section.blocks %}
            <article class="btb-card snap" {{ block.shopify_attributes }}>
              <div class="btb-card__media">
                {% if block.settings.image != blank %}
                  <img class="btb-card__img"
                       src="{{ block.settings.image | image_url: width: 720 }}"
                       alt="{{ block.settings.image.alt | escape }}"
                       loading="lazy" decoding="async">
                {% else %}
                  {{ 'image' | placeholder_svg_tag: 'btb-card__img btb-card__img--placeholder' }}
                {% endif %}
              </div>
              <div class="btb-card__content">
                {% if block.settings.title != blank %}
                  <h3 class="btb-card__title">{{ block.settings.title }}</h3>
                {% endif %}
                {% if block.settings.caption != blank %}
                  <p class="btb-card__caption">{{ block.settings.caption }}</p>
                {% endif %}
                {% if block.settings.button_label != blank and block.settings.button_link != blank %}
                  <a class="btb-card__btn button"
                     href="{{ block.settings.button_link }}"
                     {% if block.settings.open_new_tab %}target="_blank"{% endif %}>
                    {{ block.settings.button_label }}
                  </a>
                {% endif %}
              </div>
            </article>
          {% endfor %}
        </div>
        <button class="btb__nav btb__nav--next" type="button">{% render 'icon-caret' %}</button>
      </div>
    {% else %}
      <div class="btb__grid">
        {% for block in section.blocks %}
          <article class="btb-card" {{ block.shopify_attributes }}>
            <div class="btb-card__media">
              {% if block.settings.image != blank %}
                <img class="btb-card__img"
                     src="{{ block.settings.image | image_url: width: 900 }}"
                     alt="{{ block.settings.image.alt | escape }}"
                     loading="lazy" decoding="async">
              {% else %}
                {{ 'image' | placeholder_svg_tag: 'btb-card__img btb-card__img--placeholder' }}
              {% endif %}
            </div>
            <div class="btb-card__content">
              {% if block.settings.title != blank %}
                <h3 class="btb-card__title">{{ block.settings.title }}</h3>
              {% endif %}
              {% if block.settings.caption != blank %}
                <p class="btb-card__caption">{{ block.settings.caption }}</p>
              {% endif %}
              {% if block.settings.button_label != blank and block.settings.button_link != blank %}
                <a class="btb-card__btn button"
                   href="{{ block.settings.button_link }}"
                   {% if block.settings.open_new_tab %}target="_blank"{% endif %}>
                  {{ block.settings.button_label }}
                </a>
              {% endif %}
            </div>
          </article>
        {% endfor %}
      </div>
    {% endif %}
  </div>
</section>

<style>
  .btb-{{ section.id }} .btb-card { opacity:0; transform:translateY(10px); transition:.5s ease; }
  .btb-{{ section.id }} .btb-card.is-in { opacity:1; transform:none; }
</style>


<script>
document.addEventListener("DOMContentLoaded", function(){
  const embed = document.querySelector('meta[name="wishlist-app-enabled"]');
  const root = document.querySelector("#wishlist-star-section-{{ section.id }}");

  if(!embed && root){ root.style.display = "none"; return; }

  if(root){
    // Fade-in
    const cards = root.querySelectorAll(".btb-card");
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("is-in"); });
    },{threshold:0.2});
    cards.forEach(c=>io.observe(c));

    // Slider nav (only if exists)
    const track = root.querySelector(".btb__track");
    const prev = root.querySelector(".btb__nav--prev");
    const next = root.querySelector(".btb__nav--next");
    if(track && prev && next){
      function step(){ 
        const card = track.querySelector(".btb-card"); 
        if(!card) return 300; 
        const gap = parseFloat(getComputedStyle(track).gap)||24; 
        return card.getBoundingClientRect().width+gap; 
      }
      function update(){ 
        const maxScroll = track.scrollWidth-track.clientWidth-2; 
        prev.disabled = track.scrollLeft<=2; 
        next.disabled = track.scrollLeft>=maxScroll; 
      }
      prev.addEventListener("click",()=>track.scrollBy({left:-step(),behavior:"smooth"}));
      next.addEventListener("click",()=>track.scrollBy({left:step(),behavior:"smooth"}));
      track.addEventListener("scroll",update,{passive:true});
      update();

      {% if section.settings.autoplay %}
      let timer=null;
      function start(){ stop(); timer=setInterval(()=>{
        const maxScroll=track.scrollWidth-track.clientWidth-2;
        if(track.scrollLeft>=maxScroll) track.scrollTo({left:0,behavior:"smooth"});
        else track.scrollBy({left:step(),behavior:"smooth"});
      }, {{ section.settings.autoplay_interval | times:1000 }});}
      function stop(){ if(timer) clearInterval(timer); }
      start(); root.addEventListener("mouseenter",stop); root.addEventListener("mouseleave",start);
      {% endif %}
    }
  }
});
</script>

{% schema %}
{
  "name": "Behind the Brand 2",
  "settings": [
    { "type": "text", "id": "main_heading", "label": "Main heading", "default": "About Us" },
    { "type": "text", "id": "subheading", "label": "Subheading", "default": "Behind the brand" },
    { "type": "range", "id": "columns_desktop", "min": 2, "max": 4, "step": 1, "label": "Columns on desktop", "default": 3 },
    { "type": "range", "id": "columns_tablet", "min": 1, "max": 3, "step": 1, "label": "Columns on tablet", "default": 2 },
    { "type": "range", "id": "columns_mobile", "min": 1, "max": 3, "step": 1, "label": "Columns on mobile", "default": 1 },
    { "type": "range", "id": "card_gap", "min": 6, "max": 48, "step": 6, "label": "Card gap (px)", "default": 24 },
    { "type": "range", "id": "arch_radius", "min": 120, "max": 480, "step": 60, "label": "Top arch radius (px)", "default": 300 },
    { "type": "select", "id": "image_aspect", "label": "Image aspect ratio", "options": [
        { "value": "3 / 4", "label": "3:4" },
        { "value": "2 / 3", "label": "2:3" },
        { "value": "4 / 5", "label": "4:5" },
        { "value": "1 / 1", "label": "1:1" }
      ], "default": "3 / 4"
    },
    { "type": "checkbox", "id": "enable_slider", "label": "Enable slider when more than 4 blocks", "default": true },
    { "type": "checkbox", "id": "autoplay", "label": "Autoplay (slider only)", "default": true },
    { "type": "range", "id": "autoplay_interval", "min": 3, "max": 12, "step": 1, "label": "Autoplay interval (seconds)", "default": 5 }
  ],
  "blocks": [
    {
      "type": "person",
      "name": "Brand member",
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
    { "name": "Behind the Brand 2", "blocks": [ { "type": "person" }, { "type": "person" }, { "type": "person" } ] }
  ]
}
{% endschema %}

`;

