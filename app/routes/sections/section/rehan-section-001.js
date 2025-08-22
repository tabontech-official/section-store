export const code = `
<section id="wishlist-star-section-{{ section.id }}"></section>

<script>
document.addEventListener("DOMContentLoaded", function () {
  var isEmbedEnabled = document.querySelector('meta[name="wishlist-app-enabled"]');

  if (isEmbedEnabled) {
    console.log("App Embed Enabled - Section content injected");

    const sectionEl = document.getElementById("wishlist-star-section-{{ section.id }}");
    sectionEl.innerHTML = \`
     <div style="padding:20px; background:#f0f0f0; margin:20px;">
        <h2 style="color:#111;">Wishlist Feature Active </h2>
      </div>
    \`;

  } else {
    console.log("App Embed Disabled - Content skipped");
  }
});
</script>

{% schema %}
{
  "name": "Wishlist 2 Section",
  "settings": [],
  "presets": [
    { "name": "Wishlist 2 Section" }
  ]
}
{% endschema %}

`;
