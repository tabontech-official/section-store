export const code = `
<section id="wishlist-star-section-{{ section.id }}"
  class="btb btb-{{ section.id }} color-{{ section.settings.color_scheme }}"
  data-section-id="{{ section.id }}">
  <div class="btb__container page-width" style="text-align:center;">

    {% if section.settings.main_heading != blank %}
      <h2 class="btb__heading h1">{{ section.settings.main_heading }}</h2>
    {% endif %}

    {% if section.settings.subheading != blank %}
      <p class="btb__subheading">{{ section.settings.subheading }}</p>
    {% endif %}

    <div class="btb-counter">
      {% assign chars = section.settings.counter_text | split: '' %}
      {% for char in chars %}
        <div class="flip-tile">
          <span class="flip-top">{{ char }}</span>
          <span class="flip-bottom">{{ char }}</span>
        </div>
      {% endfor %}
    </div>

    {% if section.settings.description != blank %}
      <p class="btb__desc">{{ section.settings.description }}</p>
    {% endif %}

    {% if section.settings.button_label != blank and section.settings.button_link != blank %}
      <a class="btb__btn button" href="{{ section.settings.button_link }}">
        {{ section.settings.button_label }}
      </a>
    {% endif %}
  </div>
</section>

<style>
  .btb-{{ section.id }} { background:#f9f9f9; padding:60px 20px; }
  .btb-{{ section.id }} .btb-counter {
    display:flex;
    justify-content:center;
    gap:10px;
    margin:20px 0;
  }
  .btb-{{ section.id }} .flip-tile {
    position:relative;
    width:60px; height:80px;
    background:#222;
    color:#fff;
    font-size:36px;
    font-weight:bold;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:8px;
    box-shadow:0 4px 8px rgba(0,0,0,.2);
    perspective:1000px;
  }
  .btb-{{ section.id }} .flip-top,
  .btb-{{ section.id }} .flip-bottom {
    position:absolute;
    width:100%; height:50%;
    left:0;
    backface-visibility:hidden;
    display:flex; align-items:center; justify-content:center;
    font-size:36px;
  }
  .btb-{{ section.id }} .flip-top {
    top:0;
    border-bottom:2px solid #000;
  }
  .btb-{{ section.id }} .flip-bottom {
    bottom:0;
    border-top:2px solid #000;
  }
  .btb-{{ section.id }} .btb__desc {
    max-width:600px;
    margin:10px auto 20px;
    color:#444;
  }
  .btb-{{ section.id }} .btb__btn {
    padding:12px 28px;
    border-radius:25px;
    background:#000;
    color:#fff;
    text-decoration:none;
    transition:.3s;
  }
  .btb-{{ section.id }} .btb__btn:hover { background:#333; }
</style>

<script>
document.addEventListener("DOMContentLoaded", function(){
const embed = document.querySelector('meta[name="wishlist-app-enabled"]');
  const root = document.querySelector("#wishlist-star-section-{{ section.id }}");

  if(!embed && root){ root.style.display = "none"; return; }
  
  if(root){
    const tiles = root.querySelectorAll(".flip-tile");
    tiles.forEach((tile, i)=>{
      setInterval(()=>{
        tile.classList.add("flip");
        setTimeout(()=>tile.classList.remove("flip"),600);
      }, 3000 + i*200);
    });
  }
});
</script>

{% schema %}
{
  "name": "Flip Counter 105",
  "settings": [
    { "type": "text", "id": "main_heading", "label": "Main heading", "default": "Counter" },
    { "type": "text", "id": "subheading", "label": "Subheading", "default": "Get ready..." },
    { "type": "text", "id": "counter_text", "label": "Counter Text", "default": "50% OFF" },
    { "type": "text", "id": "description", "label": "Description", "default": "Gear up for the busiest season of the year with the flip-flap centerpiece." },
    { "type": "text", "id": "button_label", "label": "Button Label", "default": "Shop now" },
    { "type": "url", "id": "button_link", "label": "Button Link" }
  ],
  "presets": [
    { "name": "Flip Counter 105" }
  ]
}
{% endschema %}
`;
