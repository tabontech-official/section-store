export const code = `
<section id="wishlist-star-section-{{ section.id }}"
  class="btb btb-{{ section.id }} color-{{ section.settings.color_scheme }}"
  data-section-id="{{ section.id }}">
  <div class="btb__container page-width">

    {% if section.settings.main_heading != blank %}
      <h2 class="btb__heading h1" style="text-align:center;">{{ section.settings.main_heading }}</h2>
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
                  <a href="{{ block.settings.link }}">
                    <img class="btb-card__img"
                         src="{{ block.settings.image | image_url: width: 720 }}"
                         alt="{{ block.settings.image.alt | escape }}"
                         loading="lazy" decoding="async">
                  </a>
                {% else %}
                  {{ 'image' | placeholder_svg_tag: 'btb-card__img btb-card__img--placeholder' }}
                {% endif %}
              </div>
              {% if block.settings.title != blank %}
                <a class="btb-card__button {% if block.settings.highlight %}highlight{% endif %}"
                   href="{{ block.settings.link }}">
                  {{ block.settings.title }}
                </a>
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
            <div class="btb-card__media">
              {% if block.settings.image != blank %}
                <a href="{{ block.settings.link }}">
                  <img class="btb-card__img"
                       src="{{ block.settings.image | image_url: width: 900 }}"
                       alt="{{ block.settings.image.alt | escape }}"
                       loading="lazy" decoding="async">
                </a>
              {% else %}
                {{ 'image' | placeholder_svg_tag: 'btb-card__img btb-card__img--placeholder' }}
              {% endif %}
            </div>
            {% if block.settings.title != blank %}
              <a class="btb-card__button {% if block.settings.highlight %}highlight{% endif %}"
                 href="{{ block.settings.link }}">
                {{ block.settings.title }}
              </a>
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
    grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
    gap:24px;
    text-align:center;
  }
  .btb-{{ section.id }} .btb-card__media img {
    border-radius:8px;
    width:100%;
    height:320px;
    object-fit:cover;
  }
  .btb-{{ section.id }} .btb-card__button {
    display:inline-block;
    margin-top:12px;
    padding:8px 16px;
    border-radius:20px;
    border:1px solid #000;
    font-size:14px;
    font-weight:500;
    background:#fff;
    color:#111;
    text-decoration:none;
    transition:all .3s ease;
  }
  .btb-{{ section.id }} .btb-card__button:hover {
    background:#111; color:#fff;
  }
  .btb-{{ section.id }} .btb-card__button.highlight {
    background:#a7f3d0;
    border:none;
    color:#111;
    font-weight:600;
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
  "name": "Collection Image 104",
  "settings": [
    { "type": "text", "id": "main_heading", "label": "Main heading", "default": "Collections" },
    { "type": "checkbox", "id": "enable_slider", "label": "Enable slider if more than 4 items", "default": false }
  ],
  "blocks": [
    {
      "type": "collection_card",
      "name": "Collection Card",
      "settings": [
        { "type": "image_picker", "id": "image", "label": "Image" },
        { "type": "text", "id": "title", "label": "Collection Title", "default": "New Arrivals" },
        { "type": "url", "id": "link", "label": "Collection Link" },
        { "type": "checkbox", "id": "highlight", "label": "Highlight this button", "default": false }
      ]
    }
  ],
  "presets": [
    { "name": "Collection Grid 104", "blocks": [ { "type": "collection_card" }, { "type": "collection_card" }, { "type": "collection_card" } ] }
  ]
}
{% endschema %}
`;
