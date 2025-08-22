// section/new-arrival-2.js
export const code = `
<link href="https://unpkg.com/@pqina/flip/dist/flip.min.css" rel="stylesheet">

<div class="section-{{ section.id }} counter-{{ section.id }}" style="background-color:{{ section.settings.background_color }}; background-image: {{ section.settings.background_gradient }};">
  <div class="section-{{ section.id }}-settings">
    {% if section.settings.heading != blank %}
      <h2 class="counter-heading-{{ section.id }}">{{ section.settings.heading }}</h2>
    {% endif %}

    <div class="tick counter-tick-{{ section.id }}" data-did-init="handleTickInit">
      <div data-repeat="true" data-layout="horizontal fit" data-transform="upper -> split -> delay(random, 100, 150)">
        <span data-view="flip" data-transform="ascii -> arrive -> round -> char(^[A-Za-z]*$)" class="tick-char"></span>
      </div>
    </div>

    <div class="preview-counter-{{ section.id }}">
      <div class="preview-counter-char-{{ section.id }}">C</div>
      <div class="preview-counter-char-{{ section.id }}">O</div>
      <div class="preview-counter-char-{{ section.id }}">U</div>
      <div class="preview-counter-char-{{ section.id }}">N</div>
      <div class="preview-counter-char-{{ section.id }}">T</div>
      <div class="preview-counter-char-{{ section.id }}">E</div>
      <div class="preview-counter-char-{{ section.id }}">R</div>
    </div>

    {% if section.settings.text != blank %}
      <p class="counter-text-{{ section.id }}">{{ section.settings.text }}</p>
    {% endif %}

    {% if section.settings.button != blank %}
      <a href="{{ section.settings.button_url }}" class="counter-btn-{{ section.id }}">{{ section.settings.button }}</a>
    {% endif %}
  </div>
</div>

<script src="https://unpkg.com/@pqina/flip/dist/flip.min.js"></script>
`;


//...........Section javascript code.........................///
export const newArrival1Javascript = `
<script>
  function handleTickInit(tick) {
    var rotation = [
      {% for block in section.blocks %}
        {% assign text_length = block.settings.text | size %}
        {% assign count = global_max | minus: text_length %}
        '{{ block.settings.text }}{% for i in (1..count) %} {% endfor %}'{% unless forloop.last %},{% endunless %}
      {% endfor %}
    ];

    var index = 0;
    Tick.helper.interval(function(){
      tick.value = rotation[index];
      index = index < rotation.length - 1 ? index + 1 : 0;
    }, {{ section.settings.counter_delay | times: 1000 }});
  }

  function initCounter() {
    document.querySelector('.preview-counter-{{ section.id }}').classList.add('hide-preview');
    handleTickInit(document.querySelector('.counter-tick-{{ section.id }}'));  
  }

  document.addEventListener('DOMContentLoaded', initCounter);

  if (Shopify.designMode) {
    document.addEventListener('shopify:section:unload', initCounter);
    document.addEventListener('shopify:section:load', initCounter);
  }
</script>
`;


//..........................section css code .............................//
export const newArrival1Css = `
<style>
  .section-{{ section.id }} {
    border-top: solid {{ section.settings.border_color }} {{ section.settings.border_thickness }}px;
    border-bottom: solid {{ section.settings.border_color }} {{ section.settings.border_thickness }}px;
    margin-top: {{ section.settings.margin_top }}px;
    margin-bottom: {{ section.settings.margin_bottom }}px;
  }

  .section-{{ section.id }}-settings {
    max-width: {{ section.settings.content_width }}rem;
    margin: 0 auto;
    padding: {{ section.settings.padding_top }}px {{ section.settings.padding_horizontal }}rem {{ section.settings.padding_bottom }}px;
  }

  .counter-heading-{{ section.id }} {
    font-size: {{ section.settings.heading_size_mobile }}px;
    color: {{ section.settings.heading_color }};
    text-align: {{ section.settings.heading_align }};
  }

  .counter-text-{{ section.id }} {
    margin-top: {{ section.settings.text_mt }}px;
    font-size: {{ section.settings.text_size_mobile }}px;
    color: {{ section.settings.text_color }};
    text-align: {{ section.settings.text_align }};
  }

  .counter-btn-{{ section.id }} {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: {{ section.settings.button_mt }}px;
    font-size: {{ section.settings.button_size_mobile }}px;
    color: {{ section.settings.button_color }};
    padding: {{ section.settings.button_padding_vertical }}px {{ section.settings.button_padding_horizontal }}px;
    border-radius: {{ section.settings.button_radius }}px;
    border: {{ section.settings.button_border_thickness }}px solid {{ section.settings.button_border_color }};
    background-color: {{ section.settings.button_bg_color }};
    transition: all 0.25s ease;
  }

  .counter-btn-{{ section.id }}:hover {
    color: {{ section.settings.button_hover_color }};
    border-color: {{ section.settings.button_border_hover_color }};
    background-color: {{ section.settings.button_bg_hover_color }};
  }

  .counter-tick-{{ section.id }} .tick-flip-panel {
    background-color: {{ section.settings.card_bg_color }};
    color: {{ section.settings.card_text_color }};
  }

  .preview-counter-{{ section.id }} {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
  }

  .preview-counter-char-{{ section.id }} {
    background-color: {{ section.settings.card_bg_color }};
    color: {{ section.settings.card_text_color }};
    border-radius: {{ section.settings.counter_card_radius_mobile }}px !important;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
`;

// ..............section schema ........................///


export const newArrival1Schema=`

 {% schema %}
  {
    "name": "test counter 7678",
    "settings": [
      {
        "type": "header",
        "content": "Heading"
      },
      {
        "type": "text",
        "id": "heading",
        "label": "Heading",
        "default": "Our best seller"
      },
      {
        "type": "checkbox",
        "id": "heading_custom",
        "label": "Use Custom Font",
        "default": false
      },
      {
        "type": "font_picker",
        "id": "heading_font",
        "label": "Heading Font Family",
        "default": "josefin_sans_n4"
      },
      {
        "type": "range",
        "id": "heading_size",
        "min": 0,
        "max": 72,
        "step": 2,
        "unit": "px",
        "label": "Heading Size",
        "default": 48
      },
      {
        "type": "range",
        "id": "heading_size_mobile",
        "min": 0,
        "max": 72,
        "step": 2,
        "unit": "px",
        "label": "Heading Size - Mobile",
        "default": 32
      },
      {
        "type": "range",
        "id": "heading_height",
        "min": 50,
        "max": 200,
        "step": 10,
        "unit": "%",
        "label": "Heading Line Height",
        "default": 130
      },
      {
        "type": "select",
        "id": "heading_align",
        "label": "Heading Text Align",
        "default": "center",
        "options": [
          {
            "label": "Left",
            "value": "left"
          },
          {
            "label": "Center",
            "value": "center"
          },
          {
            "label": "Right",
            "value": "right"
          }
        ]
      },
      {
        "type": "header",
        "content": "Counter Settings"
      },
      {
        "type": "range",
        "id": "counter_mt",
        "min": 0,
        "max": 100,
        "step": 4,
        "unit": "px",
        "label": "Counter Margin top",
        "default": 32
      },
      {
        "type": "range",
        "id": "counter_delay",
        "min": 1,
        "max": 10,
        "step": 0.1,
        "unit": "s",
        "label": "Counter Delay Before Change",
        "default": 3.5
      },
      {
        "type": "range",
        "id": "counter_card_radius",
        "min": 0,
        "max": 50,
        "step": 2,
        "unit": "px",
        "label": "Counter Card Border Radius",
        "default": 16
      },
      {
        "type": "range",
        "id": "counter_card_radius_mobile",
        "min": 0,
        "max": 50,
        "step": 2,
        "unit": "px",
        "label": "Counter Card Border Radius - Mobile",
        "default": 10
      },
      {
        "type": "checkbox",
        "id": "counter_custom",
        "label": "Use Custom Font",
        "default": true
      },
      {
        "type": "font_picker",
        "id": "counter_font",
        "label": "Counter Font Family",
        "default": "montserrat_n8"
      },
      {
        "type": "header",
        "content": "Text"
      },
      {
        "type": "text",
        "id": "text",
        "label": "Text",
        "default": "Gear up for the busiest season of the year with the flip-flap, put-your-business-on-the-map centerpiece."
      },
      {
        "type": "checkbox",
        "id": "text_custom",
        "label": "Use Custom Font",
        "default": false
      },
      {
        "type": "font_picker",
        "id": "text_font",
        "label": "Text Font Family",
        "default": "josefin_sans_n4"
      },
      {
        "type": "range",
        "id": "text_size",
        "min": 0,
        "max": 72,
        "step": 2,
        "unit": "px",
        "label": "Text Size",
        "default": 22
      },
      {
        "type": "range",
        "id": "text_size_mobile",
        "min": 0,
        "max": 72,
        "step": 2,
        "unit": "px",
        "label": "Text Size - Mobile",
        "default": 20
      },
      {
        "type": "range",
        "id": "text_height",
        "min": 50,
        "max": 200,
        "step": 10,
        "unit": "%",
        "label": "Text Line Height",
        "default": 130
      },
      {
        "type": "select",
        "id": "text_align",
        "label": "Text Align",
        "default": "center",
        "options": [
          {
            "label": "Left",
            "value": "left"
          },
          {
            "label": "Center",
            "value": "center"
          },
          {
            "label": "Right",
            "value": "right"
          }
        ]
      },
      {
        "type": "range",
        "id": "text_mt",
        "min": 0,
        "max": 100,
        "step": 4,
        "unit": "px",
        "label": "Text Margin top",
        "default": 32
      },
      {
        "type": "header",
        "content": "Button"
      },
      {
        "type": "text",
        "id": "button",
        "label": "Button",
        "default": "Shop now"
      },
      {
        "type": "url",
        "id": "button_url",
        "label": "Button URL"
      },
      {
        "type": "checkbox",
        "id": "button_custom",
        "label": "Use Custom Font",
        "default": false
      },
      {
        "type": "font_picker",
        "id": "button_font",
        "label": "Button Font Family",
        "default": "josefin_sans_n4"
      },
      {
        "type": "range",
        "id": "button_size",
        "min": 0,
        "max": 72,
        "step": 2,
        "unit": "px",
        "label": "Button Size",
        "default": 20
      },
      {
        "type": "range",
        "id": "button_size_mobile",
        "min": 0,
        "max": 72,
        "step": 2,
        "unit": "px",
        "label": "Button Size - Mobile",
        "default": 18
      },
      {
        "type": "range",
        "id": "button_height",
        "min": 50,
        "max": 200,
        "step": 10,
        "unit": "%",
        "label": "Button Line Height",
        "default": 130
      },
      {
        "type": "select",
        "id": "button_align",
        "label": "Button Text Align",
        "default": "center",
        "options": [
          {
            "label": "Left",
            "value": "left"
          },
          {
            "label": "Center",
            "value": "center"
          },
          {
            "label": "Right",
            "value": "right"
          }
        ]
      },
      {
        "type": "range",
        "id": "button_mt",
        "min": 0,
        "max": 100,
        "step": 4,
        "unit": "px",
        "label": "Button Margin Top",
        "default": 16
      },
      {
        "type": "range",
        "id": "button_padding_vertical",
        "min": 0,
        "max": 100,
        "step": 4,
        "unit": "px",
        "label": "Button Padding Vertical",
        "default": 16
      },
      {
         "type": "range",
         "id": "button_padding_horizontal",
         "min": 0,
         "max": 100,
         "step": 4,
         "unit": "px",
         "label": "Button Padding Horizontal",
         "default": 40
      },
      {
         "type": "range",
         "id": "button_radius",
         "min": 0,
         "max": 100,
         "step": 2,
         "unit": "px",
         "label": "Button Border Radius",
         "default": 100
      },
      {
         "type": "range",
         "id": "button_border_thickness",
         "min": 0,
         "max": 10,
         "step": 1,
         "unit": "px",
         "label": "Button Border Thickness",
         "default": 0
      },
      {
        "type": "header",
        "content": "Section Colors"
      },
      {
        "type": "color",
        "label": "Heading Color",
        "id": "heading_color",
        "default": "#000000"
      },
      {
        "type": "color",
        "label": "Card Background Color",
        "id": "card_bg_color",
        "default": "#333232"
      },
      {
        "type": "color",
        "label": "Card Text Color",
        "id": "card_text_color",
        "default": "#FFFFFF"
      },
      {
        "type": "color",
        "label": "Text Color",
        "id": "text_color",
        "default": "#000000"
      },
      {
        "type": "color",
        "label": "Button Color",
        "id": "button_color",
        "default": "#FFFFFF"
      },
      {
        "type": "color",
        "label": "Button Hover Color",
        "id": "button_hover_color",
        "default": "#FFFFFF"
      },
      {
        "type": "color",
        "label": "Button Background Color",
        "id": "button_bg_color",
        "default": "#000000"
      },
      {
        "type": "color",
        "label": "Button Background Hover Color",
        "id": "button_bg_hover_color",
        "default": "#000000"
      },
      {
        "type": "color",
        "label": "Button Border Color",
        "id": "button_border_color",
        "default": "#000000"
      },
      {
        "type": "color",
        "label": "Button Border Hover Color",
        "id": "button_border_hover_color",
        "default": "#000000"
      },
      {
        "type": "color",
        "label": "Section background",
        "id": "background_color",
        "default": "#4BFE85"
      },
      {
        "type": "color_background",
        "id": "background_gradient",
        "label": "Section background gradient"
      },
      {
        "type": "color",
        "label": "Border",
        "id": "border_color",
        "default": "#000000"
      },
      {
        "type": "header",
        "content": "Section margin (outside)"
      },
      {
        "type": "range",
        "id": "margin_top",
        "min": 0,
        "max": 100,
        "step": 4,
        "unit": "px",
        "label": "Margin top",
        "default": 0
      },
      {
        "type": "range",
        "id": "margin_bottom",
        "min": 0,
        "max": 100,
        "step": 4,
        "unit": "px",
        "label": "Margin bottom",
        "default": 0
      },
      {
        "type": "header",
        "content": "Section padding (inside)"
      },
      {
        "type": "range",
        "id": "padding_top",
        "min": 0,
        "max": 100,
        "step": 4,
        "unit": "px",
        "label": "Padding top",
        "default": 100
      },
      {
         "type": "range",
         "id": "padding_bottom",
         "min": 0,
         "max": 100,
         "step": 4,
         "unit": "px",
         "label": "Padding bottom",
         "default": 100
      },
      {
        "type": "range",
        "id": "padding_horizontal",
        "min": 0,
        "max": 30,
        "step": 1,
        "unit": "rem",
        "label": "Padding sides",
        "default": 5
      },
      {
        "type": "range",
        "id": "padding_horizontal_mobile",
        "min": 0,
        "max": 15,
        "step": 0.5,
        "unit": "rem",
        "label": "Padding sides mobile",
        "default": 1.5
      },
      {
        "type": "header",
        "content": "Section Settings"
      },
      {
        "type": "checkbox",
        "id": "full_width",
        "label": "Full Width",
        "default": true
      },
      {
        "type": "range",
        "id": "content_width",
        "min": 0,
        "max": 400,
        "step": 10,
        "unit": "rem",
        "label": "Section content width",
        "default": 120
      },
      {
        "type": "range",
        "id": "border_thickness",
        "min": 0,
        "max": 50,
        "step": 1,
        "unit": "px",
        "label": "Border thickness",
        "default": 0
      }
    ],
    "blocks": [
      {
        "type": "word",
        "name": "Word",
        "settings": [
          {
            "type": "text",
            "label": "Word For Counter",
            "id": "text"
          }
        ]
      }
    ],
    "presets": [
      {
        "name": "test counter 7678",
        "blocks": [
          {
            "type": "word",
            "settings": {
              "text": "Counter"
            }
          },
          {
            "type": "word",
            "settings": {
              "text": "Is Back"
            }
          },
          {
            "type": "word",
            "settings": {
              "text": "Shopify"
            }
          }
        ]
      }
    ]
  }
{% endschema %}
`