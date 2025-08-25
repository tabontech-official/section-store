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
                {% if block.settings.sold_out %}
                  <span class="btb-card__badge btb-card__badge--soldout">Sold out</span>
                {% elsif block.settings.on_sale %}
                  <span class="btb-card__badge btb-card__badge--sale">Sale</span>
                {% endif %}
              </div>
              <div class="btb-card__content">
                {% if block.settings.title != blank %}
                  <h3 class="btb-card__title">{{ block.settings.title }}</h3>
                {% endif %}
                {% if block.settings.price != blank %}
                  <p class="btb-card__price">{{ block.settings.price }}</p>
                {% endif %}
                {% if block.settings.compare_at_price != blank %}
                  <p class="btb-card__compare"><s>{{ block.settings.compare_at_price }}</s></p>
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
              {% if block.settings.sold_out %}
                <span class="btb-card__badge btb-card__badge--soldout">Sold out</span>
              {% elsif block.settings.on_sale %}
                <span class="btb-card__badge btb-card__badge--sale">Sale</span>
              {% endif %}
            </div>
            <div class="btb-card__content">
              {% if block.settings.title != blank %}
                <h3 class="btb-card__title">{{ block.settings.title }}</h3>
              {% endif %}
              {% if block.settings.price != blank %}
                <p class="btb-card__price">{{ block.settings.price }}</p>
              {% endif %}
              {% if block.settings.compare_at_price != blank %}
                <p class="btb-card__compare"><s>{{ block.settings.compare_at_price }}</s></p>
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
  .btb-{{ section.id }} .btb-card__badge { position:absolute; top:8px; left:8px; padding:2px 8px; font-size:12px; border-radius:4px; background:#111; color:#fff; }
  .btb-{{ section.id }} .btb-card__badge--sale { background:#2563eb; }
  .btb-{{ section.id }} .btb-card__badge--soldout { background:#000; }
  .btb-{{ section.id }} .btb-card__price { font-weight:600; }
  .btb-{{ section.id }} .btb-card__compare { color:#888; font-size:14px; }
</style>

<script>
document.addEventListener("DOMContentLoaded", function(){
  const embed = document.querySelector('meta[name="wishlist-app-enabled"]');
  const root = document.querySelector("#wishlist-star-section-{{ section.id }}");
    if(!embed && root){ root.style.display = "none"; return; }

  if(root){
    const cards = root.querySelectorAll(".btb-card");
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("is-in"); });
    },{threshold:0.2});
    cards.forEach(c=>io.observe(c));

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
    }
  }
});
</script>

{% schema %}
{
  "name": "Backpack 101",
"settings": [
  { "type": "text", "id": "main_heading", "label": "Main heading", "default": "Backpacks" },
  { "type": "text", "id": "subheading", "label": "Subheading", "default": "Our featured products" },
  { "type": "range", "id": "columns_desktop", "min": 2, "max": 4, "step": 1, "label": "Columns on desktop", "default": 3 },
  { "type": "range", "id": "columns_tablet", "min": 1, "max": 3, "step": 1, "label": "Columns on tablet", "default": 2 },
  { "type": "range", "id": "columns_mobile", "min": 1, "max": 3, "step": 1, "label": "Columns on mobile", "default": 1 },
  { "type": "checkbox", "id": "enable_slider", "label": "Enable slider when more than 4 blocks", "default": false }
],

  "blocks": [
    {
      "type": "product",
      "name": "Product Card",
      "settings": [
        { "type": "image_picker", "id": "image", "label": "Product Image" },
        { "type": "text", "id": "title", "label": "Product Title", "default": "Backpack name" },
        { "type": "text", "id": "price", "label": "Price", "default": "$98.00 USD" },
        { "type": "text", "id": "compare_at_price", "label": "Compare at Price" },
        { "type": "checkbox", "id": "on_sale", "label": "Show Sale Badge", "default": false },
        { "type": "checkbox", "id": "sold_out", "label": "Show Sold Out Badge", "default": false },
        { "type": "text", "id": "button_label", "label": "Button label", "default": "View Product" },
        { "type": "url", "id": "button_link", "label": "Product link" },
        { "type": "checkbox", "id": "open_new_tab", "label": "Open link in new tab", "default": false }
      ]
    }
  ],
  "presets": [
    { "name": "Backpack 101", "blocks": [ { "type": "product" }, { "type": "product" }, { "type": "product" } ] }
  ]
}
{% endschema %}
`;
