// section/new-arrival-1.js
export const code = `
{% render 'new-arrival-2-css' %}
<section class="new-arrival-1">
  <h2>New Arrival 2</h2>
  <p>This is a sample section</p>
</section>
{% render 'new-arrival-2-js' %}

{% schema %}
{
  "name": "New Arrival 2",
  "settings": [],
  "presets": [{ "name": "New Arrival 2" }]
}
{% endschema %}
`;

export const newArrival1Javascript = `
<script>
  console.log(" New Arrival 2 JS loaded");
</script>
`;

export const newArrival1Css = `
<style>
  .new-arrival-1 { padding: 20px; background: #fafafa; text-align: center; }
  .new-arrival-1 h2 { color: #111; font-size: 24px; }
</style>
`;
