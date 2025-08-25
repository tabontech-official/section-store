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
      if section.settings.enable_slider and block_count > 6
        assign must_use_slider = true
      endif
    %}

    {% if must_use_slider %}
      <div class="btb__slider-wrap">
        <button class="btb__nav btb__nav--prev" type="button">{% render 'icon-caret' %}</button>
        <div class="btb__track">
          {% for block in section.blocks %}
            <article class="btb-card snap" {{ block.shopify_attributes }}>
              <div class="btb-card__circle">
                {% if block.settings.image != blank %}
                  <img class="btb-card__img"
                       src="{{ block.settings.image | image_url: width: 400 }}"
                       alt="{{ block.settings.image.alt | escape }}"
                       loading="lazy" decoding="async">
                {% else %}
                  {{ 'image' | placeholder_svg_tag: 'btb-card__img btb-card__img--placeholder' }}
                {% endif %}
                {% if block.settings.top_badge != blank %}
                  <span class="btb-card__badge--top">{{ block.settings.top_badge }}</span>
                {% endif %}
                {% if block.settings.bottom_badge != blank %}
                  <span class="btb-card__badge--bottom">{{ block.settings.bottom_badge }}</span>
                {% endif %}
              </div>
              {% if block.settings.title != blank %}
                <h3 class="btb-card__title">{{ block.settings.title }}</h3>
              {% endif %}
            </article>
          {% endfor %}
        </div>
        <button class="btb__nav btb__nav--next" type="button">{% render 'icon-caret' %}</button>
      </div>
    {% else %}
      <div class="btb__grid">
        {% for block in section.blocks %}
          <article class="btb-card" {{ block.shopify_attributes }}>
            <div class="btb-card__circle">
              {% if block.settings.image != blank %}
                <img class="btb-card__img"
                     src="{{ block.settings.image | image_url: width: 400 }}"
                     alt="{{ block.settings.image.alt | escape }}"
                     loading="lazy" decoding="async">
              {% else %}
                {{ 'image' | placeholder_svg_tag: 'btb-card__img btb-card__img--placeholder' }}
              {% endif %}
              {% if block.settings.top_badge != blank %}
                <span class="btb-card__badge--top">{{ block.settings.top_badge }}</span>
              {% endif %}
              {% if block.settings.bottom_badge != blank %}
                <span class="btb-card__badge--bottom">{{ block.settings.bottom_badge }}</span>
              {% endif %}
            </div>
            {% if block.settings.title != blank %}
              <h3 class="btb-card__title">{{ block.settings.title }}</h3>
            {% endif %}
          </article>
        {% endfor %}
      </div>
    {% endif %}
  </div>
</section>

<style>
  .btb-{{ section.id }} .btb__grid,
  .btb-{{ section.id }} .btb__track {
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(120px,1fr));
    gap:24px;
    text-align:center;
  }
  .btb-{{ section.id }} .btb-card__circle {
    position:relative;
    width:140px;
    height:140px;
    margin:0 auto;
    border-radius:50%;
    border:4px solid #ccc;
    overflow:hidden;
  }
  .btb-{{ section.id }} .btb-card__img {
    width:100%;
    height:100%;
    object-fit:cover;
    border-radius:50%;
  }
  .btb-{{ section.id }} .btb-card__badge--top {
    position:absolute;
    top:-14px; left:50%;
    transform:translateX(-50%);
    background:#d4af37;
    color:#fff;
    font-size:12px;
    padding:2px 8px;
    border-radius:4px;
    white-space:nowrap;
  }
  .btb-{{ section.id }} .btb-card__badge--bottom {
    position:absolute;
    bottom:-18px; left:50%;
    transform:translateX(-50%);
    background:#4ade80;
    color:#111;
    font-size:12px;
    padding:2px 8px;
    border-radius:4px;
    white-space:nowrap;
  }
  .btb-{{ section.id }} .btb-card__title {
    margin-top:32px;
    font-size:14px;
    font-weight:500;
  }
</style>

<script>
document.addEventListener("DOMContentLoaded", function(){
const embed = document.querySelector('meta[name="wishlist-app-enabled"]');
  const root = document.querySelector("#wishlist-star-section-{{ section.id }}");

  if(!embed && root){ root.style.display = "none"; return; }
  
  if(root){
    const track = root.querySelector(".btb__track");
    const prev = root.querySelector(".btb__nav--prev");
    const next = root.querySelector(".btb__nav--next");
    if(track && prev && next){
      function step(){ 
        const card = track.querySelector(".btb-card"); 
        if(!card) return 200; 
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
  "name": "Circle Category Banners",
  "settings": [
    { "type": "text", "id": "main_heading", "label": "Main heading", "default": "Shop by Category" },
    { "type": "text", "id": "subheading", "label": "Subheading", "default": "Explore top picks" },
    { "type": "checkbox", "id": "enable_slider", "label": "Enable slider if more than 6 items", "default": true }
  ],
  "blocks": [
    {
      "type": "circle",
      "name": "Circle Banner 103",
      "settings": [
        { "type": "image_picker", "id": "image", "label": "Circle Image" },
        { "type": "text", "id": "title", "label": "Title", "default": "Category Name" },
        { "type": "text", "id": "top_badge", "label": "Top Badge Text" },
        { "type": "text", "id": "bottom_badge", "label": "Bottom Badge Text" }
      ]
    }
  ],
  "presets": [
    { "name": "Circle Banner 103", "blocks": [ { "type": "circle" }, { "type": "circle" }, { "type": "circle" } ] }
  ]
}
{% endschema %}
`;
