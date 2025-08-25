export const code = `
<section id="wishlist-star-section-{{ section.id }}"
  class="btb btb-{{ section.id }} color-{{ section.settings.color_scheme }}"
  data-section-id="{{ section.id }}">
  <div class="btb__container page-width">

    <div class="btb__layout">
      {% if section.settings.bg_image != blank %}
        <div class="btb__bg">
          <img src="{{ section.settings.bg_image | image_url: width: 1600 }}"
               alt="{{ section.settings.bg_image.alt | escape }}"
               loading="lazy" decoding="async">
        </div>
      {% endif %}

      <div class="btb__content">
        {% if section.settings.main_heading != blank %}
          <h2 class="btb__heading h1">{{ section.settings.main_heading }}</h2>
        {% endif %}

        {% liquid
          assign collection = collections[section.settings.collection]
          assign block_count = collection.products.size
          assign must_use_slider = false
          if section.settings.enable_slider and block_count > 3
            assign must_use_slider = true
          endif
        %}

        {% if collection != blank and collection.products.size > 0 %}
          {% if must_use_slider %}
            <div class="btb__slider-wrap">
              <button class="btb__nav btb__nav--prev" type="button">{% render 'icon-caret' %}</button>
              <div class="btb__track">
                {% for product in collection.products limit: section.settings.products_to_show %}
                  <article class="btb-card snap">
                    <div class="btb-card__media">
                      <a href="{{ product.url }}">
                        {{ product.featured_image | image_url: width: 600 | image_tag: class: 'btb-card__img', loading: 'lazy', decoding: 'async' }}
                      </a>
                    </div>
                    <div class="btb-card__content">
                      <h3 class="btb-card__title"><a href="{{ product.url }}">{{ product.title }}</a></h3>
                      <div class="btb-card__prices">
                        <span class="price">{{ product.price | money }}</span>
                        {% if product.compare_at_price > product.price %}
                          <span class="compare"><s>{{ product.compare_at_price | money }}</s></span>
                        {% endif %}
                      </div>
                      <a class="btb-card__btn button" href="{{ product.url }}">View</a>
                    </div>
                  </article>
                {% endfor %}
              </div>
              <button class="btb__nav btb__nav--next" type="button">{% render 'icon-caret' %}</button>
            </div>
          {% else %}
            <div class="btb__grid">
              {% for product in collection.products limit: section.settings.products_to_show %}
                <article class="btb-card">
                  <div class="btb-card__media">
                    <a href="{{ product.url }}">
                      {{ product.featured_image | image_url: width: 600 | image_tag: class: 'btb-card__img', loading: 'lazy', decoding: 'async' }}
                    </a>
                  </div>
                  <div class="btb-card__content">
                    <h3 class="btb-card__title"><a href="{{ product.url }}">{{ product.title }}</a></h3>
                    <div class="btb-card__prices">
                      <span class="price">{{ product.price | money }}</span>
                      {% if product.compare_at_price > product.price %}
                        <span class="compare"><s>{{ product.compare_at_price | money }}</s></span>
                      {% endif %}
                    </div>
                    <a class="btb-card__btn button" href="{{ product.url }}">View</a>
                  </div>
                </article>
              {% endfor %}
            </div>
          {% endif %}
        {% else %}
          <p>No products found.</p>
        {% endif %}
      </div>
    </div>
  </div>
</section>

<style>
  .btb-{{ section.id }} .btb__layout { display:flex; gap:2rem; align-items:center; }
  .btb-{{ section.id }} .btb__bg { flex:1; }
  .btb-{{ section.id }} .btb__bg img { width:100%; height:100%; object-fit:cover; border-radius:8px; }
  .btb-{{ section.id }} .btb__content { flex:1; background:#fff; padding:2rem; border-radius:8px; }
  .btb-{{ section.id }} .btb__grid, 
  .btb-{{ section.id }} .btb__track { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:1.5rem; }
  .btb-{{ section.id }} .btb-card { text-align:left; }
  .btb-{{ section.id }} .btb-card__media img { border-radius:4px; }
  .btb-{{ section.id }} .btb-card__title { margin:.5rem 0; font-weight:600; }
  .btb-{{ section.id }} .btb-card__prices { font-size:14px; margin-bottom:.5rem; }
  .btb-{{ section.id }} .btb-card__prices .compare { color:#888; margin-left:.5rem; }
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
  "name": "Featured Section 102",
  "settings": [
    { "type": "text", "id": "main_heading", "label": "Main heading", "default": "Featured collection" },
    { "type": "collection", "id": "collection", "label": "Collection" },
    { "type": "image_picker", "id": "bg_image", "label": "Background image" },
    { "type": "range", "id": "products_to_show", "min": 3, "max": 12, "step": 1, "label": "Products to show", "default": 3 },
    { "type": "checkbox", "id": "enable_slider", "label": "Enable slider if more than 3 products", "default": true }
  ],
  "presets": [
    { "name": "Featured Section 102", "category": "Collection" }
  ]
}
{% endschema %}
`;
